/*
 * Esempio paradigma produttore consumatori
 * in cui abbiamo più di un produttore e 
 * più di consumatore
 * 
 * I produttori leggono gli interi dai file e li scrivono 
 * nel buffer (unico) , i consumatori calcolano il numero di 
 * divisori di ogni intero
 * 
 * */
#include "xerrori.h"


#define QUI __LINE__,__FILE__
#define Buf_size 10


// funzione (inefficiente) per contare il numero di divisori 
int divisori(int n)
{
  assert(n>0);
  int d = 0;
  for (int i=1; i<=n; i ++)
      if(n%i==0) d++;
  return d;
}

// struct contenente i parametri di input 
// per i thread consumatori 
typedef struct {
  int *buffer; 
  int *pcindex;
  pthread_mutex_t *pmutex_buf;
  pthread_mutex_t *pmutex_file;
  sem_t *sem_free_slots;
  sem_t *sem_data_items;
  FILE *outfile;  // viene passato già aperto e viene chiuso dal thread principale (altrimenti ho errore)
} dati_consumatori;

// struct contenente i parametri di input 
// per i thread produttori
typedef struct {
  int *buffer; 
  int *ppindex;
  pthread_mutex_t *pmutex_buf;
  sem_t *sem_free_slots;
  sem_t *sem_data_items;
  char *nomefile;  
} dati_produttori;



// funzione eseguita dai thread consumer
void *cbody(void *arg)
{  
  dati_consumatori *a = (dati_consumatori *)arg; 

  puts("consumatore partito");
  int n;
  do {
    xsem_wait(a->sem_data_items,__LINE__,__FILE__);
    xpthread_mutex_lock(a->pmutex_buf,QUI);
    n = a->buffer[*(a->pcindex) % Buf_size];
    *(a->pcindex) +=1;
    xpthread_mutex_unlock(a->pmutex_buf,QUI);
    xsem_post(a->sem_free_slots,__LINE__,__FILE__);
    if(n==-1)break;
    int div = divisori(n);
    xpthread_mutex_lock(a->pmutex_file,QUI);
    fprintf(a->outfile,"%d %d\n",n,div);
    xpthread_mutex_unlock(a->pmutex_file,QUI);
  } while(n!= -1);
  puts("Consumatore sta per finire");
  pthread_exit(NULL); 
}     

// funzione eseguita dai thread producer
void *pbody(void *arg)
{  
  dati_produttori *a = (dati_produttori *)arg; 

  puts("produttore partito");
  // apre il file e termina se non riesce
  FILE *f = fopen(a->nomefile,"rt");
  if(f==NULL) {
    fprintf(stderr,"Apertura file %s fallita\n",a->nomefile);
    pthread_exit(NULL); //pthread_exit e non exit altrimenti terminerebbe l'intero programma.
  }
  int n;
  do {
    int e = fscanf(f,"%d",&n);
    if(e!=1) break;
    xsem_wait(a->sem_free_slots,QUI);
    xpthread_mutex_lock(a->pmutex_buf,QUI);
    a->buffer[*(a->ppindex) % Buf_size] = n;
    *(a->ppindex) +=1;
    xpthread_mutex_unlock(a->pmutex_buf,QUI);
    xsem_post(a->sem_data_items,QUI);
  } while(true);
  puts("produttore sta per finire");
  pthread_exit(NULL); 
}     

// main: da completare
int main(int argc, char *argv[])
{
  // leggi input
  if(argc<4) {
    printf("Uso\n\t%s file1 [file2 ...] outfile numt\n", argv[0]);
    exit(1);
  }
  // numero di thread prod e consumatori
  int tp = argc-3; // 1 produttore per ogni files
  int tc = atoi(argv[argc-1]);
  assert(tp>0);
  assert(tc>0);
  FILE* outfile = fopen(argv[argc-2],"wt");
  if(outfile==NULL)
    xtermina("impossibile aprire outfile",QUI);

  // buffer produttori-consumatori
  int buffer[Buf_size];
  int pindex=0, cindex=0;
  pthread_mutex_t mupbuf = PTHREAD_MUTEX_INITIALIZER;
  pthread_mutex_t mucbuf = PTHREAD_MUTEX_INITIALIZER;
  pthread_mutex_t mucfile = PTHREAD_MUTEX_INITIALIZER;
  sem_t sem_free_slots, sem_data_items;
  xsem_init(&sem_free_slots,0,Buf_size,__LINE__,__FILE__);
  xsem_init(&sem_data_items,0,0,__LINE__,__FILE__);

  // dati per i thread
  dati_produttori ap[tp];
  dati_consumatori ac[tc];
  pthread_t prod[tp];       // id thread produttori
  pthread_t cons[tc];       // id thread consumatori 


  // Da completare:

  // creo tutti i produttori
  for(int i = 0; i<tp; i++){
    assert(i+1 < argv-2);
    ap[i].buffer = buffer;
    ap[i].ppindex = &pindex;
    ap[i].pmutex_buf = &mupbuf;
    ap[i].sem_free_slots = &sem_free_slots;
    ap[i].sem_data_items = &sem_data_items;
    ap[i].nomefile = argv[i+1];
    xpthread_create(&ap[i],NULL,&pbody,ap+i,__LINE__,__FILE__); // oss : a+i = a[i] (aritmetica puntatori)
  }
  
  // creo tutti i consumatori
  for(int i = 0; i<tc; i++){    
    ac[i].buffer = buffer;
    ac[i].pcindex = &cindex;
    ac[i].pmutex_buf = &mucbuf;
    ac[i].pmutex_file = &mucfile;
    ac[i].sem_free_slots = &sem_free_slots;
    ac[i].sem_data_items = &sem_data_items;
    ac[i].outfile = &outfile;
    xpthread_create(&ac[i],NULL,&cbody,ac+i,__LINE__,__FILE__); // oss : a+i = a[i] (aritmetica puntatori)
  }

  // attendo i produttori
  for(int i=0;i<tp;i++) {
    xpthread_join(prod[i],NULL,__LINE__, __FILE__);    
  }

  // comunico ai consumatori che possono terminare (metto val speciale per terminazione consumatori -> -1)
  for(int i=0;i<tc;i++) {
    xsem_wait(&sem_free_slots,__LINE__,__FILE__);
    buffer[pindex++ % Buf_size]= -1;// -1 = val terminazione per i consumatori
    xsem_post(&sem_data_items,__LINE__,__FILE__);
  }

  // attendo i consumatori 
  for(int i=0;i<ac;i++) {
    xpthread_join(cons[i],NULL,__LINE__, __FILE__);
  }

  // deallocazione, saluti, etc....
  xsem_destroy(&sem_data_items,__LINE__,__FILE__);
  xsem_destroy(&sem_free_slots,__LINE__,__FILE__);
  xpthread_mutex_destroy(&mupbuf,__LINE__,__FILE__);
  xpthread_mutex_destroy(&mucbuf,__LINE__,__FILE__);
  xpthread_mutex_destroy(&mucfile,__LINE__,__FILE__);
  
  
  printf("Resoults in %s",argv[argc-2]);
  return 0;

}

