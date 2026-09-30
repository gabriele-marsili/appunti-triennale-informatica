#include "xerrori.h"

// conteggio dei primi con piu' processi utilizzando
// una SINGOLA VARIABILE CONDIVISA il cui accesso è
// regolato dal semaforo Nome

// un secondo semaforo Nome2 è utilizzato per permettere
// al processo padre di stabilire quando tutti i processi 
// ausiliari hanno terminato il calcolo dei primi 

// NOTA: questo programma ha solo interesse didattico:
// dal punto di vista delle prestazionei è una pessima idea 
// utilizzare una sola variabile condivisa a cui i processi 
// accedono continuamente. 

// Inoltre in questo caso i processi figli non fanno altre 
// operazioni dopo il calcolo dei primi quindi il meccanismo 
// della wait nel processo padre si potrebbe utilizzare

// La soluzione in contaprimi_shm.c è quindi preferibile

/*Semafori (=> op. atomiche) : 
= var intere incrementabili / decrementabili in modo atomico 
->risolve il problema dei conflitti relativo a processi parallelli che 
operano su una stessa zona di memoria 
->l'incremento posso sempre farlo 
->il decremento non posso farlo se ho val = 0 nel semaforo.
  > il semaforo è vincolato ad avere valori >= 0
  > se il sem è 0 e viene decrementato il processo che ha chiamato il decremento attende che un altro processo 
    incrementi il semaforo, solo dopo decrementa il valore (in realtà passa dalla coda pronti relativa alla var del semaforo all'esecuzione 
    lasciando invariato il valore del semaforo - sempre a 0)
  
->operazioni prendono il nome di : 
  > incremento = POST (SEM_POST) -> V
  > decremento = WAIT (SEM_WAIT) -> P 

->non è possibile vedere il valore di un semaforo in un certo momento.

->esistono 2 tipi di semafori : con e senza nome 
  > con nome -> solitamente usati per le pipe 
  > senza nome -> solitamente usati per i thread

-> nella creazione di un semaforo devo settare il valore iniziale.
*/


// nomi della shared memory e dei semafori
// ai nomi dei semafori viene automaticamente
// aggiunto il prefisso .sem
#define Nome "/contaprimi" //uso questo nome sia per la mem condivisa che per il primo semaforo (a cui viene aggiunto .sem)
#define Nome2 "/contaprimi2"


//Prototipi
bool primo(int n);

int main(int argc,char *argv[])
{
  if(argc!=3) {
    fprintf(stderr,"Uso\n\t%s m num_processi\n", argv[0]);
    exit(1);
  }
  // conversione input
  int m= atoi(argv[1]);
  if(m<1) termina("limite primi non valido");
  int p= atoi(argv[2]);
  if(p<=0) termina("numero di processi non valido");

  // ---- creazione array memoria condivisa
  int shm_size = sizeof(int); // uso solo 4 byte di memoria condivisa (a[0]-> uso una sola posizione in cui ho quantità primi contata)
  int fd = xshm_open(Nome, O_RDWR | O_CREAT, 0660,__LINE__,__FILE__);  //creazione zona di memoria condivisa
  xftruncate(fd, shm_size, __LINE__,__FILE__); //assegnazione della memoria (dim) alla porzione di memoria condivisa
  int *a = simple_mmap(shm_size,fd, __LINE__,__FILE__); //mappaggio della mem condivisa nell'array a 
  close(fd); // dopo mmap e' possibile chiudere il file descriptor
  xshm_unlink(Nome,__LINE__, __FILE__); // distrugge shm (zona memoria condivisa) quando finito
  
  // ---- creo il semaforo
  sem_t *sem_a0 = xsem_open(Nome,O_CREAT|O_EXCL,0666,1,
                   __LINE__, __FILE__); // 1 = val iniziale del semaforo 

  xsem_unlink(Nome,__LINE__, __FILE__); // distrugge sem quando finito  
  // ---- creo il secondo semaforo
  sem_t *sem_finito = xsem_open(Nome2,O_CREAT|O_EXCL,0666,0,
                   __LINE__, __FILE__); // 0 val iniziale del semaforo 
  
  // xsem_unlink(Nome2,__LINE__, __FILE__); // distrugge sem quando finito

  /*nella creazione di un semaforo richiedo che non ci sia un semaforo già esistente
  ciò perché, altrimenti, il semaforo prenderebbe il valore di quello già esistente
  ignorando il valore dell'inizializzazione*/

  a[0] = 0; //inizializzo a[0] a 0 (quantità primi contata)
  
  // creazione processi figlio
  for(int i=0; i<p; i++) {
    pid_t pid= xfork(__LINE__, __FILE__);
    if(pid==0) { //processo figlio
      int n = m/p;  // quanti numeri verifica ogni figlio + o - 
      int start = n*i; // inizio range figlio i
      int end = (i==p-1) ? m : n*(i+1);
      for(int j=start;j<end;j++)
        if(primo(j)) {
          //meccanismo mutex (rendo esclusivo ad un solo processo il pezzo di codice tra wait e post): 
          // => a viene acceduto solo da un processo alla volta.
          // OSS : ciò è possibile perché ho inizializzato il semaforo a 1
          // valore semaforo = 1 => semaforo disponibile per essere acquisito
          // valore semaforo = 0 => semaforo NON disponibile per essere acquisito (già in uso da un processo)

          
          xsem_wait(sem_a0,__LINE__, __FILE__);// aspetta che il semaforo sia 1 e lo porta a 0 (decrementa valore)
          a[0] += 1; //incrementa di 1 il counter dei numeri primi trovati 
          xsem_post(sem_a0,__LINE__, __FILE__);   // riporta il semaforo a 1 (nuovamente disponibile) (incremente valore)
        }
      fprintf(stderr,"Il processo %d ha terminato il conto\n",i);
      
      // unmap memoria condivisa perchè ho finito di usarla
      xmunmap(a,shm_size,__LINE__, __FILE__);
      
      // segnala al processo padre che questo processo ha finito 
      xsem_post(sem_finito,__LINE__, __FILE__); // incrementa di 1 il valore del semaforo sem_finito (inizialmente a 0)
      
      sleep(3600); // dormo per un'ora
      exit(0);
    }
  }
  
  // codice processo padre
  // aspetta che abbiano finito tutti i figli: 
  for(int i=0; i<p; i++) 
    xsem_wait(sem_finito,__LINE__, __FILE__); // decrementa il val di sem_finito, se è 0 attende che un figlio lo incrementi di 1 per poi decrementarlo nuovamente     
    
  // calcola e restituisce il risultato 
  printf("Numero primi tra 1 e %d (escluso): %d\n",m,a[0]);
  
  // unmap memoria condivisa e termina
  xmunmap(a,shm_size,__LINE__, __FILE__);
  return 0;
}



// restituisce true/false a seconda che n sia primo o composto
bool primo(int n)
{
  if(n<2) return false;
  if(n%2==0) {
    if(n==2)  return true;
    else return false; }
  for (int i=3; i*i<=n; i += 2) 
      if(n%i==0) return false;
  return true;
}

