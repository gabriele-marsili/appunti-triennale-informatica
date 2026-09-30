#include "xerrori.h"
#define QUI __LINE__, __FILE__
#define SIGRTMAX 64
#define SIGRTMIN 2
// esempio di invio di segnali real-time e di
// invio di una informazione insieme al segnale.
// l'informazione (un int) è memorizzata in una union

// Per leggere l'informazione la sigwait è rimpiazzata da sigwaitinfo
// è possibile leggere l'informazione del segnale anche usando il campo
// sa_sigaction quando si chiama sigaction()

// thread nullafacente
void *tbody(void *v)
{
  while (true)
  {
    pause();
    printf("====== Thread :%d svegliato\n", gettid());
  }
  return NULL;
}

// thread che effettua la gestione di tutti i segnali
// usa sigwaitinfo per leggere l'informazione associata ai segnali
void *tgestore(void *v)
{
  sigset_t mask; //creo mascera
  sigfillset(&mask); //assegno tutti i segnali alla maschera
  int s; // var in cui andrà il val ottenuto dal segnale 
  siginfo_t sinfo; //struct con info del segnale (segnale arrivato, chi ha mandato il segnale, valore messo nel segnale)
  while (true) {
    int e = sigwaitinfo(&mask, &sinfo); // thread si mette in attesa dei segnali con la maschera
    if (e < 0)
      perror("Errore sigwaitinfo");
    s = sinfo.si_signo; // in s metto il numero del segnale che arriva (in sinfo.si_signo)
    printf("Thread %d ricevuto segnale %d da %d", gettid(), s, sinfo.si_pid); // sinfo.si_pid = pid di chi ha inviato il segnale
    printf(" con valore %d\n", sinfo.si_value.sival_int); // sinfo.si_value.sival_int = valore ricevuto con il segnale
    // OSS : si_value è una union -> si_value.sival_int per leggerne il valore intero 
    if (s == SIGUSR2)
    {
      // manda a se stesso un misto di segnali real-time e standard
      // possibilemente con valore associato al segnale
      union sigval v; // union inviata al gestore di segnali

      v.sival_int = 1; // invio l'intero 1 insieme al segnale (valore intero associato alla union)
      e = pthread_sigqueue(pthread_self(), SIGINT, v); // -> invio al thread che gestisce la coda dei segnali un segnale da se stesso con valore della union (v)
      
      // primo arg = thread a cui mandare segnale, seconod arg = valore segnale, terzo arg = info del segnale (union)
      if (e != 0)
        xperror(e, "errore pthread_sigqueue");

      v.sival_int++; // invio l'intero 2 (incremento val union)
      e = pthread_sigqueue(pthread_self(), SIGRTMAX, v);
      if (e != 0)
        xperror(e, "errore pthread_sigqueue");

      v.sival_int++; // invio 3, 4, etc etc
      e = pthread_sigqueue(pthread_self(), SIGRTMIN, v);
      if (e != 0)
        xperror(e, "errore pthread_sigqueue");

      v.sival_int++;
      // nota: raise(SIGINT) equivalente a pthread_kill(pthread_self(),SIGINT);
      e = raise(SIGRTMIN); // questo segnale NON ha un valore associato
      if (e != 0)
        perror("errore raise"); // raise salva errore in errno

      v.sival_int++; // questo segnale viene perso perché secondo SIGINT
      e = pthread_sigqueue(pthread_self(), SIGINT, v);
      if (e != 0)
        xperror(e, "errore pthread_sigqueue");

      v.sival_int++;
      e = pthread_sigqueue(pthread_self(), SIGRTMAX, v);
      if (e != 0)
        xperror(e, "errore pthread_sigqueue");

      v.sival_int++; // questa volta mando il segnale al processo con sigqueue()
      e = sigqueue(getpid(), SIGRTMIN + 1, v);
      if (e != 0)
        perror("errore sigqueue"); // sigqueue salva errore in errno

      v.sival_int++;
      e = pthread_sigqueue(pthread_self(), SIGUSR1, v);
      if (e != 0)
        xperror(e, "errore pthread_sigqueue");
    
      // OSS i precedenti segnali vanno in stato 'pending' e verranno 
      // gestiti quando il thread gestore fa nuovamente il while s

      // OSS i segnali RT non si perdono e vengono gestiti dando priorità a quelli con num più basso
      // OSS i segnali normali hanno precedenza su quelli RT
    }
  }
  return NULL;
}

int main(void)
{
  // blocco i segnali tranne SIGQUIT
  sigset_t mask;
  sigfillset(&mask);                       // insieme di tutti i segnali
  sigdelset(&mask, SIGQUIT);               // elimino sigquit dall'insieme
  pthread_sigmask(SIG_BLOCK, &mask, NULL); // blocco tutto tranne sigquit

  // creo nuovi thread che ereditano i settaggi dei segnali
  pthread_t t[3];
  xpthread_create(&t[0], NULL, tbody, NULL, QUI); // thread nullafacenti
  xpthread_create(&t[1], NULL, tbody, NULL, QUI);
  xpthread_create(&t[2], NULL, tgestore, NULL, QUI); // thread gestore segnali

  while (true)
  {
    sleep(40);
    puts("Main svegliato");
  }
  return 0;
}
