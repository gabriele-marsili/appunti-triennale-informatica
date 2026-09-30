#include "xerrori.h"
#include <time.h>


// funzione di partizionamento tipo quicksort 
int partition(int a[], int n);


// funzione di comparazione per qsort
int cmp(const void *a, const void *b)
{
  return *(int*)a - *(int*)b;
}


int main(int argc,char *argv[])
{
  if(argc!=3) {
    fprintf(stderr,"Uso\n\t%s dim_array nome_shm\n", argv[0]);
    exit(1);
  }
  // conversione input
  int n= atoi(argv[1]);
  if(n<=1) termina("dimensione non valida");

  // ---- creazione array memoria condivisa
  int shm_size = n*sizeof(int); // un intero x processo
  //uso argv[2] invece di Nome
  int fd = xshm_open(argv[2],O_RDWR | O_CREAT, 0660,__LINE__,__FILE__); // apro (creo) spazio memoria condivisa con dim = 0
  xftruncate(fd, shm_size, __LINE__,__FILE__); // assegno dimensione shm_size
  int *a = simple_mmap(shm_size,fd, __LINE__,__FILE__); // mappo memoria condivisa in un array
  close(fd); // dopo mmap e' possibile chiudere il file descriptor
  // non effettuo la cancellazione per poter esaminare l'array dalla linea di comando
  // xshm_unlink(argv[2],__LINE__, __FILE__); 

  // ---- inizializza array condiviso con interi random
  srand(1); // inizializza numeri casuali con lo stesso seed
  for(int i=0; i<n; i++) 
    a[i] = rand()%1000;
  puts("Attendo 20 secondi...");  
  sleep(20);

  // durante la pausa di 20 secondi 
  // posso vedere l'array da ordinare in /dev/shm/array
  // con od -An -td4 /dev/shm/array
  puts("riprendo con partition");
  
  // chiamo partition per fare il passo iniziale del quicksort   
  int m = partition(a,n); // m = quantità interi da ordinare

  puts("Fine partition. Attendo ancora 20 secondi...");  
  sleep(20);
  puts("Ora ordino le due metà separatamente");
  // ---- crea processo figlio  
  pid_t pid= xfork(__LINE__, __FILE__);
  if (pid == 0) {
    // processo figlio lancia programma che ordina la prima parte
    //l'altro proramma deve prendere nome mem condivisa ed ordinare gli ogg al suo interno.
    //devo passare il nome dell'ogg di mem condivisa con i dati e la quantità di dati
    char b[100];
    sprintf(b,"%d",m); // scrivo m dentro b[]
    execl('sort3.out','sort3.out',argv[2], b, (char*) NULL);
    //argv[2]=nome dell'ogg di mem condivisa
    //quantità di dati = m -> devo passarlo come stringa e non come intero
  }
  else
  { // processo padre    
    qsort(a+m, n-m, sizeof(int), cmp);
    // unmap memoria condivisa perchè ho finito di usarla
    xmunmap(a, shm_size, __LINE__, __FILE__);
  }
  // genitore aspetta che abbia finito il figlio:
  if(wait(NULL)<0)
    xtermina("Errore wait",__LINE__, __FILE__);


  // unmap memoria condivisa e termina
  xmunmap(a,shm_size,__LINE__, __FILE__);
  return 0;

  // non dimenticare di cancellare il file /dev/sham/array altrimenti
  // rimane ad occupare memoria fino al prossimo reboot 
}



// procedura di partizionamento di un array a[0..n-1]
// partiziona l'array in due parti in modo che gli elementi
// della prima parte sono <= degli elementi della seconda parte
// restituisce il numero di elementi nella prima parte
int partition(int a[], int n)
{
  assert(n>1);
  // scelgo pivot in posizione random 
  int k = random() % n;      // genero posizione random del pivot
  int pivot = a[k];          // elemento pivot
  a[k]=a[0];a[0]=pivot;      // scambia a[k]<->a[0] per mettere il pivot in a[0]

  // procedura di partizionamento
  // l'elemento pivot svolge anche la funzione di sentinella  
  int i= -1;      // puntatore oltre estremo sinistro
  int j = n;      //puntatore oltre estremo destro
  while(1) {
    while(a[--j]>pivot) 
      ; // esce se a[j]<=pivot
    while(a[++i]<pivot) 
      ; // esce se a[i]>=pivot
    if(i<j) {
      // scambia a[i] <-> a[j]
      int t=a[i]; a[i]=a[j]; a[j]=t;
    }
    else break; 
  }
  // la prima meta' e' a[0] .. a[j] quindi ha j+1 elementi   
  assert(j+1 >0);
  assert(j+1 < n);
  printf("Pivot: %d, dimensione prima partizione: %d\n",pivot,j+1);
  return j+1; 
}