// scrivere qui l'email istituzionale
// <email>

#include "xerrori.h"
#include <limits.h>

#define BUFF_SIZE 20
// buffer = array di puntatori a interi
#define NUM_INTERI_PER_BLOCCO 20
#define DIMENSIONE_BLOCCO (NUM_INTERI_PER_BLOCCO * sizeof(int))

// macro per indicare la posizione corrente
#define QUI __LINE__, __FILE__

// struct contenente i parametri per i thread produttori
typedef struct {
  char *fileName;
  int **buffer; // puntatore al buffer
  int *pcindex; // puntatore all'indice per slot in cui leggere (unico per tutti
                // i threads!!!)
  sem_t *sem_free_slots;   // puntatore al semaforo free_slots
  sem_t *sem_data_items;   // puntatore al semaforo data_items
  pthread_mutex_t *pmutex; // puntatore al mutex condiviso per accesso al buffer

} dati;

// body threads ausiliari (produttori)
void *tbody(void *arg) {
  dati *a = (dati *)arg; // riprendo i dati e li metto in a
  int **buffer = a->buffer;
  pthread_mutex_t *m = a->pmutex;
  FILE *f = fopen(a->fileName, "rb"); // apertura file binario
  if (f == NULL) {
    fprintf(stderr, "Apertura file %s fallita\n", a->fileName);
    xsem_wait(a->sem_free_slots, __LINE__, __FILE__);
    xpthread_mutex_lock(m, QUI);
    buffer[(*a->pcindex) % BUFF_SIZE] =
        NULL; // mette NULL nel buffer => notifica thread i termina
    (*a->pcindex)++;
    xpthread_mutex_unlock(m, QUI);
    xsem_post(a->sem_data_items, __LINE__, __FILE__);
    pthread_exit(NULL);
  }

  //- ----------- lettura dal file:
  int e =
      fseek(f, 0, SEEK_END); // mette il puntatore di lettura alla fine del file
  if (e != 0) {
    fprintf(stderr, "Seek error\n");
    xsem_wait(a->sem_free_slots, __LINE__, __FILE__);
    xpthread_mutex_lock(m, QUI);
    buffer[(*a->pcindex) % BUFF_SIZE] =
        NULL; // mette NULL nel buffer => notifica thread i termina
    (*a->pcindex)++;
    xpthread_mutex_unlock(m, QUI);
    xsem_post(a->sem_data_items, __LINE__, __FILE__);
    pthread_exit(NULL);
  }
  long lungfile =
      ftell(f); // ftell ritorna la posizione corrente del file in byte
  if (lungfile < 0) {
    fprintf(stderr, "Ftell error\n");
    xsem_wait(a->sem_free_slots, __LINE__, __FILE__);
    xpthread_mutex_lock(m, QUI);
    buffer[(*a->pcindex) % BUFF_SIZE] =
        NULL; // mette NULL nel buffer => notifica thread i termina
    (*a->pcindex)++;
    xpthread_mutex_unlock(m, QUI);
    xsem_post(a->sem_data_items, __LINE__, __FILE__);
    pthread_exit(NULL);
  }

  if (lungfile % 4 != 0) {
    fprintf(stderr, "Content file error\n");
    xsem_wait(a->sem_free_slots, __LINE__, __FILE__);
    xpthread_mutex_lock(m, QUI);
    buffer[(*a->pcindex) % BUFF_SIZE] =
        NULL; // mette NULL nel buffer => notifica thread i termina
    (*a->pcindex)++;
    xpthread_mutex_unlock(m, QUI);
    xsem_post(a->sem_data_items, __LINE__, __FILE__);
    pthread_exit(NULL);
  }

  // numero di interi nel file
  int n = lungfile / 4; // ogni intero = 4 byte (num interi = num tot byte / 4)
  if (n == 0) {
    fprintf(stderr, "File %s vuoto\n", a->fileName);
    xsem_wait(a->sem_free_slots, __LINE__, __FILE__);
    xpthread_mutex_lock(m, QUI);
    buffer[(*a->pcindex) % BUFF_SIZE] =
        NULL; // mette NULL nel buffer => notifica thread i termina
    (*a->pcindex)++;
    xpthread_mutex_unlock(m, QUI);
    xsem_post(a->sem_data_items, __LINE__, __FILE__);
    pthread_exit(NULL);
  }

  rewind(f); // riporto il puntatore di lettura all'inizio del file

  int messi = 0;
  int size = 60;
  // alloca array dove mettere gli interi
  int *arr = malloc(size * sizeof(int)); // dim = size * sizeof(int)
  if (arr == NULL) {
    fprintf(stderr, "Malloc error\n");
    xsem_wait(a->sem_free_slots, __LINE__, __FILE__);
    xpthread_mutex_lock(m, QUI);
    buffer[(*a->pcindex) % BUFF_SIZE] =
        NULL; // mette NULL nel buffer => notifica thread i termina
    (*a->pcindex)++;
    xpthread_mutex_unlock(m, QUI);
    xsem_post(a->sem_data_items, __LINE__, __FILE__);
    pthread_exit(NULL);
  }

  while (messi < n) {    // -> non sono stati inseriti tutti gli interi del file
    if (messi == size) { // ingrandisco l'array
      size = size * 2;
      arr = realloc(arr, size * sizeof(int));
      if (arr == NULL) {
        fprintf(stderr, "Malloc error\n");
        xsem_wait(a->sem_free_slots, __LINE__, __FILE__);
        xpthread_mutex_lock(m, QUI);
        buffer[(*a->pcindex) % BUFF_SIZE] =
            NULL; // mette NULL nel buffer => notifica thread i termina
        (*a->pcindex)++;
        xpthread_mutex_unlock(m, QUI);
        xsem_post(a->sem_data_items, __LINE__, __FILE__);
        pthread_exit(NULL);
      }
    }

    size_t interiLetti =
        fread(arr, sizeof(int), NUM_INTERI_PER_BLOCCO,
              f);         // leggo dal file f 20 oggetti dalla che metto in arr
    messi += interiLetti; // incremento di messi

    if (interiLetti != 0) {

      if (interiLetti < NUM_INTERI_PER_BLOCCO) { // inseriti meno di 20 elementi
                                                 // => inserisco doppioni
        int difference = NUM_INTERI_PER_BLOCCO - interiLetti;
        int elToAdd = arr[(messi - 1)];
        for (int i = 0; i < difference; i++) {
          arr[messi] = elToAdd;
          messi++;
        }
      }

      int *blocco =
          malloc(20 * sizeof(int)); // array con i 20 elementi di questo ciclo
      for (int i = 0; i < 20; i++) {
        blocco[i] = arr[i + (messi - 20)];
      }

      // inserimento nel buffer del puntatore al blocco
      xsem_wait(a->sem_free_slots, __LINE__,
                __FILE__); // attende che valore sem_free_slots > 0 (che ci sia
                           // almeno uno slot libero nel buffer)
      xpthread_mutex_lock(m, QUI);
      buffer[(*a->pcindex) % BUFF_SIZE] = blocco; // mette blocco nel buffer =
      (*a->pcindex)++;
      xpthread_mutex_unlock(m, QUI);
      xsem_post(
          a->sem_data_items, __LINE__,
          __FILE__); // incrementa sem_data_items  (=> consumatore può leggere)
    }
  }
  // chiudi il file
  if (fclose(f) == EOF) {
    fprintf(stderr, "Error closing file %s\n", a->fileName);
    xsem_wait(a->sem_free_slots, __LINE__, __FILE__);
    xpthread_mutex_lock(m, QUI);
    buffer[(*a->pcindex) % BUFF_SIZE] =
        NULL; // mette NULL nel buffer => notifica thread i termina
    (*a->pcindex)++;
    xpthread_mutex_unlock(m, QUI);
    xsem_post(a->sem_data_items, __LINE__, __FILE__);
    pthread_exit(NULL);
  }

  free(arr);

  // notifico fine lavoro produttore
  xsem_wait(a->sem_free_slots, __LINE__,
            __FILE__); // attende che valore sem_free_slots > 0 (che ci sia
                       // almeno uno slot libero nel buffer)
  xpthread_mutex_lock(m, QUI);
  buffer[(*a->pcindex) % BUFF_SIZE] =
      NULL; // mette NULL nel buffer => segnale terminazione
  (*a->pcindex)++;
  xpthread_mutex_unlock(m, QUI);
  xsem_post(
      a->sem_data_items, __LINE__,
      __FILE__); // incrementa sem_data_items  (=> consumatore può leggere)

  // invio del segnale
  union sigval v; // union inviata al gestore di segnali

  v.sival_int = messi;
  e = sigqueue(getpid(), SIGRTMIN, v);
  if (e != 0)
    perror("errore sigqueue"); // sigqueue salva errore in errno

  pthread_exit(NULL);
}

int main(int argc, char *argv[]) {
  if (argc < 2)
    termina("Uso: minimax.out file1 file2 ... fileN");
  int threadsQuantity = argc - 1; // num di threads
  assert(threadsQuantity > 0);

  int max = INT_MAX;
  int min = INT_MIN;

  int pcindex = 0; // inizializzo index relativo alla posizione del buffer (per
                   // i produttori)
  int *buffer[BUFF_SIZE]; // inizializzo buffer

  pthread_t t[threadsQuantity]; // array di threadsQuantity threads
  dati a[threadsQuantity];      // array di dati per i threadsQuantity threads

  sem_t sem_free_slots, sem_data_items; // semafori dei threads
  xsem_init(&sem_free_slots, 0, BUFF_SIZE, __LINE__,
            __FILE__); // initialize sem free slots with buf_size
  xsem_init(&sem_data_items, 0, 0, __LINE__,
            __FILE__); // initialize sem data items with 0

  pthread_mutex_t mutex;
  xpthread_mutex_init(&mutex, NULL, QUI);

  // blocco i segnali tranne sigquit
  sigset_t mask;
  sigfillset(&mask);                       // insieme di tutti i segnali
  sigdelset(&mask, SIGQUIT);               // elimino sigquit dal'insieme
  pthread_sigmask(SIG_BLOCK, &mask, NULL); // blocco tutto tranne sigquit

  // creazione dei threads :
  for (int i = 0; i < threadsQuantity;
       i++) { // scorro i threads (e li inizializzo passando i dati)

    a[i].buffer = buffer;
    a[i].pcindex = &pcindex;
    a[i].sem_data_items = &sem_data_items;
    a[i].sem_free_slots = &sem_free_slots;
    a[i].fileName = argv[i + 1];
    a[i].pmutex = &mutex;
    xpthread_create(&t[i], NULL, &tbody, a + i, __LINE__,
                    __FILE__); // creazione del thread
  }

  int thread_completati = 0;
  int cindex = 0; // index di lettura del buffer per il main thread
  bool first = true;
  while (thread_completati < threadsQuantity) // lettura del main thread
  {
    xsem_wait(
        &sem_data_items, __LINE__,
        __FILE__); // attende che ci sia almeno uno slot scritto nel buffer
    xpthread_mutex_lock(&mutex,
                        QUI); // evita di leggere dati 'corrotti' (durante
                              // lettura non può esserci un thread che scrive)
    int *produttoreRes =
        buffer[cindex]; // riprende il numero dal buffer (prendo primo elemento)
    cindex = (cindex + 1) % BUFF_SIZE;
    xpthread_mutex_unlock(&mutex, QUI);
    xsem_post(&sem_free_slots, __LINE__,
              __FILE__); // cambia il numero di slot liberi nel buffer

    if (produttoreRes == NULL) { // => thread i terminato
      thread_completati += 1;
    } else { // cerco max e min e dealloco
      for (int i = 0; i < 20; i++) {
        int el = produttoreRes[i];
        if (first) {
          max = el;
          min = el;
          first = false;
        } else {
          if (el > max) {
            max = el;
          }
          if (el < min) {
            min = el;
          }
        }
      }

      // dealloco blocco
      free(produttoreRes);
    }
  }

  // tutti threads completati
  printf("%d %d\n", min, max);

  siginfo_t sinfo;
  // attesa dei segnali :
  int s_c = 0;
  int sum = 0;
  while (s_c < threadsQuantity) {
    int e = sigwaitinfo(&mask, &sinfo);
    if (e < 0)
      perror("Errore sigwaitinfo");
    sum += sinfo.si_value.sival_int;
    s_c += 1;
  }
  printf("%d\n", sum);

  // distruzione dei semafori e del mutex
  xsem_destroy(&sem_data_items, __LINE__, __FILE__);
  xsem_destroy(&sem_free_slots, __LINE__, __FILE__);
  xpthread_mutex_destroy(&mutex, __LINE__, __FILE__);

  return 0;
}