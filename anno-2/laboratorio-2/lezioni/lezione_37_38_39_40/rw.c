#include "xerrori.h"
#define QUI __LINE__, __FILE__
// #define FAIR 42 -> sfrutto il makefile per far ciò

// Possibile soluzione al problema lettori/scrittori
// Questa soluzione è unfair per gli scrittori che
// potrebbero essere messi in attesa indefinita
// se continuano ad arrivare lettori

typedef struct
{
  int readers; // number of readers 
  int wpending; // numero di scrittori in attesa 
  bool writing; // indica se c'è un thread (scrittore) che sta scrivendo
  pthread_cond_t cond;   // condition variable
  pthread_mutex_t mutex; // mutex associato alla condition variable
#ifdef FAIR
  pthread_mutex_t in_attesa; // se locked qualcuno è in attesa sulla condition variable
  // il thread che va in attesa prende il precedente mutex e blocca gli altri threads
  // divenendo il primo quando sbloccato
#endif
} rw;

// inizializza rw, né scrittori né lettori (mette readers e wpending a 0, writing a false ed inizializza cv)
void rw_init(rw *z)
{
  z->readers = 0;
  z->wpending = 0;
  z->writing = false;
  xpthread_cond_init(&z->cond, NULL, QUI);
#ifdef FAIR
  xpthread_mutex_init(&z->in_attesa, NULL, QUI); // inizializza mutex nella versione fair 
#endif
}

// inizio uso da parte di un reader
void read_lock(rw *z)
{
  fprintf(stderr, "%2d read request\n", gettid() % 100);
#ifdef FAIR
  pthread_mutex_lock(&z->in_attesa); // lock sul mutex nella versione fair 
#endif

  pthread_mutex_lock(&z->mutex); // lock sul mutex 
  while (z->writing == true || z->wpending > 0) // attesa anche nel caso in cui uno scrittore sia in attesa (-> più equo, meno concorrenza / parallelismo)
    pthread_cond_wait(&z->cond, &z->mutex);     // attende fine scrittura
  z->readers++; // incremento dei readers 
#ifdef FAIR
  pthread_mutex_unlock(&z->in_attesa); // (eventuale) unlock sul mutex per la versione fair 
#endif

  pthread_mutex_unlock(&z->mutex); // unlock sulla mutex 

}

// fine uso da parte di un reader
void read_unlock(rw *z)
{
  fprintf(stderr, "%2d read completed\n", gettid() % 100);
  pthread_mutex_lock(&z->mutex);
  // assert su readers > 0 & sul fatto che non ci sia nessun writer attivo 
  assert(z->readers > 0); // ci deve essere almeno un reader (me stesso)
  assert(!z->writing);    // non ci devono essere writer
  z->readers--;           // decremento dei readers 
  if (z->readers == 0) // se non ci son più readers 
    pthread_cond_signal(&z->cond); // da segnalare ad un solo writer (uso della signal, non broadcast)
  pthread_mutex_unlock(&z->mutex); // unlock del mutex 
}

// inizio uso da parte di writer
void write_lock(rw *z)
{
  fprintf(stderr, "%2d write request\n", gettid() % 100);
#ifdef FAIR
  pthread_mutex_lock(&z->in_attesa); // eventuale lock su mutex per versione fair 
#endif
  pthread_mutex_lock(&z->mutex); // lock su mutex 
  z->wpending += 1; // incremento i writers in attesa 
  while (z->writing || z->readers > 0)  // finché qualcuno sta scrivendo o c'è almeno 1 lettore 
    // attende fine scrittura o lettura
    pthread_cond_wait(&z->cond, &z->mutex); // attesa sulla cv rilasciando il mutex 
  z->writing = true; // cambio writing (globale) a true dato che sto scrivendo
  z->wpending -= 1; // decremento il counter degli scrittori in attesa 
#ifdef FAIR
  pthread_mutex_unlock(&z->in_attesa); // unlock su eventuale mutex per versione fair 
#endif
  pthread_mutex_unlock(&z->mutex); // unlock sulla mutex 
}

// fine uso da parte di un writer
void write_unlock(rw *z)
{
  fprintf(stderr, "%2d write completed\n", gettid() % 100);
  pthread_mutex_lock(&z->mutex); // lock sulla mutex
  assert(z->writing); // assert che qualcuno stia scrivendo 
  z->writing = false; // cambio stato (scrittore non sta più scrivendo)
  // segnala a tutti quelli in attesa
  pthread_cond_broadcast(&z->cond); // broadcast per threads in attesa sulla cv
  pthread_mutex_unlock(&z->mutex); // unlock mutex 
}

void *lettore(void *arg) // lettore a cui passo rw (fa read lock e poi read unlock dopo 1s )
{
  rw *z = (rw *)arg;
  read_lock(z);
  sleep(1);
  read_unlock(z);
  return NULL;
}

void *scrittore(void *arg)// scrittore a cui passo rw (fa write lock e poi write unlock dopo 1s )
{
  rw *z = (rw *)arg;
  write_lock(z);
  sleep(1);
  write_unlock(z);
  return NULL;
}

int main(int argc, char *argv[])
{
  rw z;
  rw_init(&z); // inizializzo rw
  // thread che usano la rw
  pthread_t t[20]; // creo arr di 20 threads 
  int i = 0;
  //inizializzo i threads in modo molto intelligente senza for ma incrementando cmq i
  //giusto perché mettere una condizione su i per fare robe equilibrate era difficile :) 
  /*ciò che segue sarebbe : 
  for(int i = 0; i < 20; i++){
    if(i==2 || i == 9){
      xpthread_create(&t[i++], NULL, &scrittore, &z, QUI);
    }else{
      xpthread_create(&t[i++], NULL, &lettore, &z, QUI);
    }
  }
  */
  xpthread_create(&t[i++], NULL, &lettore, &z, QUI);
  xpthread_create(&t[i++], NULL, &lettore, &z, QUI);
  xpthread_create(&t[i++], NULL, &scrittore, &z, QUI);
  xpthread_create(&t[i++], NULL, &lettore, &z, QUI);
  xpthread_create(&t[i++], NULL, &lettore, &z, QUI);
  xpthread_create(&t[i++], NULL, &lettore, &z, QUI);
  xpthread_create(&t[i++], NULL, &lettore, &z, QUI);
  xpthread_create(&t[i++], NULL, &lettore, &z, QUI);
  xpthread_create(&t[i++], NULL, &lettore, &z, QUI);
  xpthread_create(&t[i++], NULL, &scrittore, &z, QUI);
  xpthread_create(&t[i++], NULL, &lettore, &z, QUI);
  xpthread_create(&t[i++], NULL, &lettore, &z, QUI);
  xpthread_create(&t[i++], NULL, &lettore, &z, QUI);
  xpthread_create(&t[i++], NULL, &lettore, &z, QUI);
  
  // attendo tutti i thread altrimenti terminano tutti
  for (int j = 0; j < i; j++)
    xpthread_join(t[j], NULL, QUI);

  assert(z.wpending == 0);
  assert(!z.writing);
  assert(z.readers == 0);
  return 0;
}