#include "xerrori.h"

/*shared memory : 
man 7 shm_overview
->blocchi memoria condivisi ('array' condivisi)

normalmente processi diversi hanno proprie variabili 
e non si influenzano reciprocamente 
è tuttavia possibile creare zone di memoria condivise in cui vi sono 
variabili i cui valori sono condivisi tra i processi 
-> controlli su scrittura / ricezione delle variabili (mutex)
-> coordinazione dei processi 
-> gestione memoria condivisa (semafori)
*/

/*procedura condivisione memoria:
shm_open() -> crea file di memoria condivisa con dim = 0
(file perché son oggetti globali a cui tutti i file possono accedere)
-> file creato in RAM (il SO usa questa porzione della RAM come fosse disco)

ftruncate() -> quantità di byte della memoria condivisa 
(specifico quanta memoria mi serve)
-> non posso ingrandire la quantità di memoria usata

nmap() -> mappo la memoria ceata in un array che si riferisce ai byte di memoria condivisa
(se faccio fork l'array è condiviso tra i processi)

munmap() -> libero la memoria condivisa precedentemente 

shm_unlink() -> cancello file di memoria condivisa e la memoria utilizzata torna disponibile 
->in realtà fa solo prenotazione della cancellazione : il sistema cancella la memoria condivisa
solo quando tutti i processi che usano quella memoria condivisa non la usano più (-> close() )
(la cancellazione effettiva avviene solo quando tutti i processi che usano la memoria condivisa vengono chiusi)
(se non uso shm_unlink() allora l'array continua a consumare RAM inutilmente)

close() -> chiudo l'oggetto in memoria condivisa

*/

//gli oggetti di memoria condivisa stan in /dev/shm

// semplice creazione di un array in memoria condivisa

// nome della shared memory 
#define Nome "/prova" //file di nome prova nella directory

//Prototipi
bool primo(int n);

int main(int argc,char *argv[])
{
  if(argc!=2) {
    fprintf(stderr,"Uso\n\t%s dim_array\n", argv[0]);
    exit(1);
  }
  // conversione input per ottenere dimensione array
  int n= atoi(argv[1]);
  if(n<1) termina("limite non valido");

  // ---- creazione array memoria condivisa
  int shm_size = n*sizeof(int); // dim byte arr di n interi = n * dim intero
  int fd = xshm_open(Nome,O_RDWR | O_CREAT, 0660,__LINE__,__FILE__); //scrittura e lettura | creazione, permessi
  //shm_open restituisce file descriptor (di dim 0) che salvo in fd
  xftruncate(fd, shm_size, __LINE__,__FILE__); // assegno dimensione shm_size a fd
  int *a = simple_mmap(shm_size,fd, __LINE__,__FILE__); //mappo fd con dim shm_size nell'array a
  //uso simple_mmap -> una personale nmap
  
  close(fd); // dopo mmap e' possibile chiudere il file descriptor (non ci svolgo altre operazioni in questo script)
  
  // scommentare per prenotare la cancellazione dell'oggetto nella shared memory 
  xshm_unlink(Nome,__LINE__, __FILE__); // distrugge shm quando finito (prenota cancellazione)
  
  // riempio array
  for(int i=0; i<n; i++) {
    a[i] = i;
  }
  
  // unmap memoria condivisa e termina
  xmunmap(a,shm_size,__LINE__, __FILE__);
  // se ho commentato xshm_unlink() l'oggetto /dev/sham/prova
  // rimane nel filesystem (e occupa il relativo spazio fino al prossimo boot)
  return 0;
}
