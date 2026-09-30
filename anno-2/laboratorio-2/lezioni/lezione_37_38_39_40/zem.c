#include "xerrori.h"
#define QUI __LINE__,__FILE__


// Realizzazione di un semaforo usando mutex+condition variable

// il semaforo blocca solo sullo 0 mentre
// con una condition variable abbiamo visto che ci si può
// bloccare su condizioni più complesse, quindi è più generale 

// un semaforo si può realizzare con mutex + condition var
// come mostrato qui sotto. Notate che otteniamo un semaforo 
// che supporta incrementi diversi da +- 1


// struttura rappresentante il semaforo
typedef struct {
  int tot;  // valore del semaforo, non deve mai diventare negativo
  pthread_cond_t cond;   // condition variable
  pthread_mutex_t mutex; // mutex associato alla condition variable
} zem;


// inzializza semaforo al valore q
// deve essere chiamata prima di up e down
void zem_init(zem *z, int q) // z = puntatore al semaforo zem, q = valore di inizializzazione 
{
	assert(q>=0); // q deve esser positivo
  z->tot = q; 
  xpthread_cond_init(&z->cond,NULL,QUI); // inizializzo cv z->cond
  xpthread_mutex_init(&z->mutex,NULL,QUI); // inizializzo mutex z->mutex
}

// analoga alla sem_wait (operazione P di Dijkstra)
void zem_down(zem *z, int q)// z = puntatore al semaforo zem, q = valore del decremento (può esser != da 1 )
{
	assert(q>0);
  pthread_mutex_lock(&z->mutex); // lock sulla mutex relativa allo zem
  while(z->tot-q<0) // check sulla condizione con while (z->tot - q < 0)
    pthread_cond_wait(&z->cond,&z->mutex); //wait sulla cv rilasciando il mutex 
  
  //=> z->tot >= 0
  z->tot -= q; // decremento di z->tot di un ammontare q passato come parametro 
  pthread_mutex_unlock(&z->mutex); // unlock della mutex 
}

// analoga alla sem_post (operazione V di Dijkstra)
void zem_up(zem *z, int q) // z = puntatore al semaforo zem, q = valore dell'incremento (può esser != da 1 )
{
	assert(q>0);
  pthread_mutex_lock(&z->mutex); // lock sulla mutex 
  z->tot+=q; // incremento di z->tot del valore q passato come parametro 
  pthread_cond_broadcast(&z->cond); // broadcast per risvegliare tutti i threads in attesa sulla cv z->cond
  pthread_mutex_unlock(&z->mutex); // unlock sulla mutex
}