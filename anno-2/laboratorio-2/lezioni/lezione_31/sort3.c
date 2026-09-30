#include "xerrori.h"
#include <time.h>


/*prende come input un ogg di memoria condivisa ed il num di interi da ordinare
ordina li interi e termina*/


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
    fprintf(stderr,"Uso\n\t%s nome_shm num_interi\n", argv[0]);
    exit(1);
  }
  // conversione input
  int n= atoi(argv[2]);
  if(n<1) termina("dimensione non valida");

  // ---- apertura oggetto memoria condivisa
  int shm_size = n*sizeof(int); // un intero x processo
  int fd = xshm_open(argv[1],O_RDWR , 0660,__LINE__,__FILE__);
    //-> apro ogg (argv[1]) di memoria condivisa, se non trovato da' err

  //xftruncate(fd, shm_size, __LINE__,__FILE__); -> non devo ridimensionare l'ogg di mem condivisa 
  
  int *a = simple_mmap(shm_size,fd, __LINE__,__FILE__); //mappa ogg di mem condivisa in arr a
  close(fd); // dopo mmap e' possibile chiudere il file descriptor
  
  // non effettuo la cancellazione per poter esaminare l'array dalla linea di comando
  xshm_unlink(argv[1],__LINE__, __FILE__); 
  
  //ordina la sua metà
  qsort(a, argv[0], sizeof(int), cmp);


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