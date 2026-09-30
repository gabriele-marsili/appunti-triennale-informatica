/*Testo esercizio
A lezione abbiamo visto l'esempio del programma sommaprimi.c che prende in input sulla linea di comando dei nomi di file di testo contenenti interi e calcola e visualizza su stdout il numero complessivo di primi contenuti in tali file e la loro somma. Il programma sommaprimi.c risolve questo problema generando per ogni file passato sulla linea di comando un processo ausiliario che esegue il programma sommaprimi_aux.c. L'esercizio di oggi richiede di risolvere lo stesso problema con la stessa tecnica utilizzando thread ausiliari invece dei processi.

In altre parole, il programma main.c deve generare argc - 1 thread ausiliari e ad ogni thread deve asasegnare il nome di un file passato sulla riga di comando. Utilizzando le tecniche che abbiamo visto a lezione il thread pricipale deve anche passare due variabili numprimi e sommaprimi dove il thread iniziale memorizza il numero di primi trovati e la loro somma.

Il thread principale dovrà poi attendere la terminazione dei thread ausiliari e calcolare e visualizzare il risultato finale.

Utilizzare il programma sommaprimi.c e i file di interi NNinteri, per testare la correttezza del vostro programma (per sperimentare l'utilizzo di molti thread contemporaneamente notate che lo stesso file può comparire più volte sulla linea di comando).*/
#include "xerrori.h"
bool primo(int n); // prototipo

// struct che uso per passare argomenti ai thread
typedef struct {
  int numprimi;         // numero di primi del thread
  long long sommaprimi; // somma dei primi del thread
  char *fileName;       // nome del file in cui il thread legge i numeri
} threadsData;

// funzione passata a pthred_create (funzione eseguita da ogni thread)
void *tbody(void *v) {
  threadsData *d = (threadsData *)v;
  int num_primi = 0;
  long long somma_primi = 0;
  // cerco i primi nel file assegnato
  FILE *f = fopen(d->fileName, "r");
  if (f == NULL) {
    termina("Apertura file fallita");
  }

  // Leggere contenuto file
  while (true) {
    int num;
    int e = fscanf(f, "%d", &num);
    if (e == EOF) {
      break;
    }
    if (e != 1) {
      termina("Errore nel contenuto del file");
    }
    if (primo(num)) {      
      num_primi += 1;
      somma_primi = somma_primi + num;
    }
  }

  // chiudi il file
  if (fclose(f) == EOF)
    termina("Errore chiusura file");
  ;
  
  // salvo i valori nel thread
  d->sommaprimi = somma_primi;
  d->numprimi = num_primi;
  pthread_exit(NULL);
}

int main(int argc, char *argv[]) {

  if (argc < 2) {
    printf("Uso:\n\t%s file1 [file2 file3 ...] \n", argv[0]);
    exit(1);
  }
  int t_Quantity = argc - 1;

  // creazione thread ausiliari
  pthread_t t[t_Quantity]; // array di dimensione t_Quantity per indentificatori
                           // di thread
  threadsData d[t_Quantity]; // array di t_Quantity struct che passerò ai
                             // t_Quantity thread

  int numPrimiTrovati = 0;
  long long sommaPrimi = 0;

  for (int i = 0; i < t_Quantity; i++) { // scorro i threads
    d[i].numprimi = 0;
    d[i].sommaprimi = 0;
    d[i].fileName = argv[i + 1];
    xpthread_create(&t[i], NULL, &tbody, &d[i], __LINE__, __FILE__);
  }

  // attendo che i thread abbiano finito
  for (int i = 0; i < t_Quantity; i++) {
    xpthread_join(t[i], NULL, __LINE__, __FILE__);
    sommaPrimi += d[i].sommaprimi;
    numPrimiTrovati += d[i].numprimi;
  }

  // restituisce il risultato
  printf("\nQuantità numeri primi trovata: %d\nsomma: %lld\n", numPrimiTrovati,
         sommaPrimi);
  return 0;
}

// restituisce true/false a seconda che n sia primo o composto
bool primo(int n) {
  if (n < 2)
    return false;
  if (n % 2 == 0) {
    if (n == 2)
      return true;
    else
      return false;
  }
  for (int i = 3; i * i <= n; i += 2)
    if (n % i == 0)
      return false;
  return true;
}