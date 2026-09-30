#include "xerrori.h"
#define QUI __LINE__, __FILE__

// esempio base di gestione segnali con handler

// variabili globali utilizzate da main e dal signal handler
int tot_segnali = 0;
//volatile poiché altrimenti il while non fa effettivamente il check sulla var 
// -> while interpreta come while (true) a causa dell'ottimizzazione da parte del compilatore
volatile bool continua = true;

// funzione che viene invocata quando viene ricevuto
// un segnale USR1 USR2 o INT (Control-C)
void handler(int s) // s indica il tipo di segnale che arriva.
{                   // oss : devo usare var globali.
  tot_segnali++;
  if (s != SIGUSR1)
  {
    kill(getpid(), SIGUSR1); // manda SIGUSR1 a se stesso
    // OSS : kill invia un generico segnale (non necessariamente il segnale che distrugge un processo)
  }
  printf("Segnale %d ricevuto dal processo %d\n", s, getpid());
  if (s == SIGUSR2)
  {
    // forza uscita dal loop infinito del main() camiando valore var globale 'continua'
    continua = false;
  }
}

int main(int argc, char *argv[])
{
  // definisce signal handler
  struct sigaction sa;
  sa.sa_handler = &handler; // assegno l'handler al segnale (controllo del tipo del segnale nell'handler).
  // setta sa.sa_mask che è la maschera di segnali da bloccare
  sigfillset(&sa.sa_mask); // durante l'esecuzione di handler(). Blocca tutti i segnali
  // sigdelset(&sa.sa_mask,SIGUSR1);// -> machera per bloccare tutti i segnali tranne SIGUSR1
  sigaction(SIGUSR1, &sa, NULL); // handler per USR1
  sigaction(SIGUSR2, &sa, NULL); // stesso handler per USR2
  // definisco variabile dove salvo il settaggio attuale per SIGINT
  struct sigaction old_signalHandler;
  sigaction(SIGINT, &sa, &old_signalHandler); // stesso handler per Control-C
  // -> cambio azione relativa ad un certo segnale (in questoc caso ctrl C), in old_signalHandler salvo l'azione precedente.

  // visualizza il pid
  printf("Se vuoi mandarmi dei segnali il mio pid e': %d\n", getpid());

  // entra in orribile busy waiting attendendo i segnali
  continua = true;
  do
  { // loop apparentemente senza uscita
    ;
    // scommentare per evitare il busy waiting
    // sleep(1000);
    // puts("Mi sono svegliato");
  } while (continua);
  printf("Ricevuti: %d segnali\n", tot_segnali);
  // rimetti la vecchia gestione di SIGINT
  sigaction(SIGINT, &old_signalHandler, NULL);
  // ora SIGINT interrompe ll'esecuzione come per default
  puts("Vecchio SIGINT ripristinato");

  // rientro nel loop, per uscire serve un altro segnale usr2
  // oppure un SIGINT....
  continua = true;
  do
  { // loop apparentemente senza uscita
    ;
  } while (continua);
  printf("Ricevuti: %d segnali (secondo loop)\n", tot_segnali);
  return 0;
}
