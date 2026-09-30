/*
 * Esempio semplice paradigma produttore consumatori
 * Il produttore legge interi da un file e i consumatori calcolano 
 * la somma dei primi
 * 
 * Usare il numeri.py per generare lunghi elenchi di interi positivi su cui testare il programma
 * 
 * Programma di esempio del paradigma 1 producer 1 consumer
 * i dati letti dal file vengono messi su un buffer in cui il producer scrive 
 * e i consumer leggono. In principio il buffer va bene di qualsiasi dimensione: 
 * piu' e' grande maggiore e' il lavoro pronto da svolgere nel caso
 * il produttore rimanga bloccato (ad esempio a leggere dal disco)
 * 
 * */
#include "xerrori.h"

#define Buf_size 10


// funzione per stabilire se n e' primo  
bool primo(int n)
{
  if(n<2) return false;
  if(n%2==0) return (n==2);
  for (int i=3; i*i<=n; i += 2)
      if(n%i==0) return false;
  return true;
}

// struct contenente i parametri di input e output di ogni thread 
typedef struct {
  int quanti;   // output
  long somma;   // output
  int *buffer; // puntatore al buffer
  int *pcindex; // puntatore all'indice per slot in cui leggere (unico per tutti i threads!!!)
  sem_t *sem_free_slots; //puntatore al semaforo free_slots
  sem_t *sem_data_items;  //puntatore al semaforo data_items
} dati;

// funzione eseguita dai thread consumer
void *tbody(void *arg)
{  
  dati *a = (dati *)arg; // riprendo i dati e li metto in a 
  a->quanti = 0; // inzializzo a 0 i dati di output   
  a->somma = 0;
  int n;
  fprintf(stderr,"Consumatore %d partito\n",gettid()); // id relativo al processo (?)
  do {
    xsem_wait(a->sem_data_items,__LINE__,__FILE__); //attende che ci sia almeno uno slot scritto nel buffer
    n = a->buffer[*(a->pcindex) % Buf_size]; // riprende il numero dal buffer
    *(a->pcindex) +=1; //incrementa l'indice del buffer
    xsem_post(a->sem_free_slots,__LINE__,__FILE__); //cambia il numero di slot liberi nel buffer
    if(n>0 && primo(n)) {
      a->quanti++;
      a->somma += n;
    }
  } while(n!= -1);
  fprintf(stderr,"Consumatore %d sta per terminare\n",gettid());
  
}     


int main(int argc, char *argv[])
{
  // leggi input
  if(argc!=2) {
    printf("Uso\n\t%s file\n", argv[0]);
    exit(1);
  }
  
  int p = 1; // numero di thread ausiliari 
  assert(p>0);
  int tot_primi = 0;
  long tot_somma = 0;
  int e,n,cindex=0; 

  // threads related
  int buffer[Buf_size];
  int pindex=0;
  // pthread_mutex_t mu = PTHREAD_MUTEX_INITIALIZER;
  
  pthread_t t[p]; // array di p threads
  dati a[p]; // array di dati per i p threads
  sem_t sem_free_slots, sem_data_items; // semafori dei threads
  xsem_init(&sem_free_slots,0,Buf_size,__LINE__,__FILE__); // initialize sem free slots with buf_size
  xsem_init(&sem_data_items,0,0,__LINE__,__FILE__); // initialize sem data items with 0
  
  for(int i=0;i<p;i++) { //scorro i threads (e li inizializzo passando i dati)
    // faccio partire il thread i
    a[i].buffer = buffer;
    a[i].pcindex = &cindex;
    a[i].sem_data_items = &sem_data_items;
    a[i].sem_free_slots = &sem_free_slots;
    xpthread_create(&t[i],NULL,tbody,a+i,__LINE__,__FILE__); //creazione del thread
  }
  fputs("Thread ausiliari creati\n",stderr);
  
  // leggi file 
  FILE *f = fopen(argv[1],"r");
  if(f==NULL) {perror("Errore apertura file"); return 1;}
  
  while(true) {
    e = fscanf(f,"%d", &n);
    if(e!=1) break; // se il valore e' letto correttamente e==1
    assert(n>0);    // i valori del file devono essere positivi
  
    xsem_wait(&sem_free_slots,__LINE__,__FILE__); // attende che valore sem_free_slots > 0
    buffer[pindex++ % Buf_size]= n; // mette il numero n nel buffer in posizione pindex++ % Buf_size
    xsem_post(&sem_data_items,__LINE__,__FILE__); //mette sem_data_items a 1 (=> consumatore può leggere)
  }
  
  fputs("Dati del file scritti nel buffer\n",stderr);
  if(fclose(f)!=0) xtermina("Errore chiusura input file",__LINE__,__FILE__);
  
  // terminazione threads
  for(int i=0;i<p;i++) {
    xsem_wait(&sem_free_slots,__LINE__,__FILE__); // attende che valore sem_free_slots > 0
    buffer[pindex++ % Buf_size]= -1;  //mette a -1 il valore del buffer in posizione pindex++ % Buf_size
    xsem_post(&sem_data_items,__LINE__,__FILE__);//mette sem_data_items a 1 (=> consumatore può leggere)
  }
  
  fputs("Valori di terminazione scritti nel buffer\n",stderr);
  // join dei thread e calcolo risultato
  for(int i=0;i<p;i++) {
    xpthread_join(t[i],NULL,__LINE__,__FILE__);
    tot_primi += a[i].quanti;
    tot_somma += a[i].somma;
  }
  xsem_destroy(&sem_data_items,__LINE__,__FILE__);
  xsem_destroy(&sem_free_slots,__LINE__,__FILE__);
  // pthread_mutex_destroy(&mu);
  printf("Trovati %d primi con somma %ld\n",tot_primi,tot_somma);
  return 0;
}
