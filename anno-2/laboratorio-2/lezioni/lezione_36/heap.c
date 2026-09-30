#include "xerrori.h"
// abbreviamo la chiamata alle funzioni x...
#define QUI __LINE__,__FILE__


// gestione di heap mediante condition variable
// per fare si che le stampe riflettano l'effettivo ordine
// delle operazioni queste sono effettuate quando il 
// mutex è sempre bloccato 

// struct che tiene traccia della memoria disponibile e 
// contiene le variabili cond/mutex per regolarne l'utilizzo
typedef struct {
  pthread_cond_t  *cv; // condition variable
  pthread_mutex_t *mu; // mutex
  int MB;       // memoria attualmente disponibile
} heap;

// simula allocazione con spazio limitato
void richiedi(heap *h, int n) {
  xpthread_mutex_lock(h->mu,QUI); // permette di eseguire le seguenti op in modo atomico (mutua esclusione)
  fprintf(stderr,"%2d Richiesti: %3d\n", gettid()%100, n);
  while(n>h->MB) { // condizione attesa della cv
    fprintf(stderr,"%2d Negati: %3d\n", gettid()%100, n);
    xpthread_cond_wait(h->cv,h->mu,QUI); //attesa del thread sulla condition variable (cv)
    // la cond wait va esguita con il mutex locked
    // la cond wait rilascia il mutex locked (mu in questo caso) => permette il controllo anche agli altri threads
    // quando il thread sulla cv viene sbloccato tale thread riprende il mutex (mu) per rifare il controllo del while
  }
  h->MB -= n;
  fprintf(stderr,"%2d Assegnati: %3d. Rimanenti: %4d\n\n", gettid()%100,
          n,h->MB);
  xpthread_mutex_unlock(h->mu,QUI);
}

// deallocazione
void libera(heap *h, int n) {
  xpthread_mutex_lock(h->mu,QUI);
  h->MB += n;
  xpthread_cond_broadcast(h->cv,QUI); // 'sveglia' TUTTI i threads in attesa sulla cv
  // i threads appena svegliati si bloccano su mutex mu
  fprintf(stderr,"%2d Restituiti: %3d. Rimanenti: %4d\n\n", gettid()%100,
          n,h->MB);
  xpthread_mutex_unlock(h->mu,QUI); // mutex mu libero => i threads precedentemente in attesa procedono in modo atomico ad eseguire il controllo 
}


// codice thread tipo 1, chiede 10,20,...,50
void *tipo1(void *v) {
  heap *h = (heap *) v;
  for(int i=1;i<=5;i++) {
    int m = 10*i;
    richiedi(h,m);
    sleep(1);
    libera(h,m);
  }
  return NULL;
}

// codice thread tipo 2, chiede 15,25,...,55
void *tipo2(void *v) {
  heap *h = (heap *) v;
  for(int i=1;i<=5;i++) {
    int m = 10*i+5;
    richiedi(h,m);
    sleep(1);
    libera(h,m);
  }
  return NULL;
}


int main(int argc, char *argv[])
{
  // controlla numero argomenti
  if(argc!=3) {
      printf("Uso: %s mem numT\n",argv[0]);
      return 1;
  }
  int mem = atoi(argv[1]);
  int nt = atoi(argv[2]); // num threads 
  assert(nt>1);

  // inizializza heap 
  pthread_cond_t c = PTHREAD_COND_INITIALIZER;
  pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;
  heap h;
  h.cv = &c; 
  h.mu = &m;
  h.MB = mem;
  
  // esegue i thread
  pthread_t t[nt];
  // esegue un thread tipo1
  xpthread_create(&t[0],NULL,&tipo1,&h,QUI);
  for(int i=1;i<nt;i++)
    // esegue nt-1 thread di tipo 2
    xpthread_create(&t[i],NULL,&tipo2,&h,QUI);

  // attende terminazione thread e termina
  for(int i=0;i<nt;i++)
    xpthread_join(t[i],NULL,QUI);
    
  xpthread_cond_destroy(&c,QUI);
  xpthread_mutex_destroy(&m,QUI);
  
  fprintf(stderr,"Terminato con memoria: %d\n",h.MB);
  return 0;
}