#define _GNU_SOURCE  // avverte che usiamo le estensioni GNU
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa/numero exit() etc ...
#include <stdbool.h> // gestisce tipo bool (per variabili booleane)
#include <assert.h>  // permette di usare la funzione assert
#include <string.h>  // funzioni di confronto/copia/etc di stringhe
#include <errno.h>   // richiesto per usare errno

// Scopo del programma:
//  mostrare come si crea un file binario
//  in questo esempio viene scritto un intero alla volta
//  ma se ho un array posso scriverlo con una singola fwrite
//  -> il programma crea un file binario contenente i primi numeri primi compresi tra 2 e un numero specificato dall'utente

static void termina(const char *messaggio);

// dato k restituisco true se è primo, false altrimenti
bool primo(int k)
{
  assert(k > 0);
  if (k % 2 == 0)
    return k == 2; // se k è pari allora è primo se e solo se k==2

  // mi occupo ora del caso k dispari
  assert(k % 2 != 0);
  for (int i = 3; i < k; i += 2)
  {
    if (k % i == 0)
      return false; // ho scoperto che il numero non è primo
    if (i * i > k)
      break;
  }
  return true;
}

int main(int argc, char *argv[])
{
  // verifica siano stati forniti esattamente 2 parametri
  if (argc != 3)
  {
    printf("Uso: %s N nome_file\n", argv[0]);
    return 1;
  }
  // converte il primo parametro in un intero
  int n = atoi(argv[1]);
  if (n <= 0)
    termina("Il parametro n deve essere positivo");
  // copia il puntatore nella variabile nome_file
  char *nome_file = argv[2];

  // apro il file in scrittura
  FILE *f = fopen(nome_file, "wb"); // wb = scrittura binaria.
  if (f == NULL)
    termina("Apertura file fallita");

  // cerca i primi da 2 a n e li scrive dentro il file
  for (int i = 2; i <= n; i++)
    if (primo(i))
    {
      // scrittora dell'intero i in formato binario
      int e = fwrite(&i, sizeof(i), 1, f); // scrittura nel file
      /*spiegazione fwrite : 
      &i: Questo è l'indirizzo della variabile i, che contiene il numero primo che si desidera scrivere nel file.

      sizeof(i): Restituisce la dimensione in byte dell'oggetto i (un intero nel tuo caso). Questo parametro indica a fwrite quanti byte copiare dal blocco di memoria specificato dall'indirizzo &i.

      1: Specifica il numero di elementi da scrivere. Nel tuo caso, stai scrivendo un singolo numero intero nel file.

      f: È il puntatore al file aperto in modalità di scrittura binaria (wb).

      La funzione fwrite scrive il blocco di dati specificato (nel tuo caso, un intero) nel file. Restituisce il numero di elementi scritti con successo, che dovrebbe essere uguale al terzo parametro (1 nel tuo caso) se la scrittura va a buon fine.

      Quindi, il codice verifica se la chiamata a fwrite ha restituito 1 (cioè, se è riuscita a scrivere esattamente un intero nel file). Se il numero di elementi scritti è diverso da 1, significa che si è verificato un errore durante la scrittura, e la funzione termina viene chiamata per stampare un messaggio di errore e terminare il programma.
      */
      if (e != 1)
        termina("Errore nella scrittura");
    }
  // se io avessi messo i primi in un array
  // a[0...k-1], li scrivevo in f con l'istruzione
  // fwrite(a,sizeof(*a),k,f);

  // chiudi il file e termina
  if (fclose(f) == EOF)
    termina("Errore chiusura file");
  ;

  return 0;
}

// stampa su stderr il  messaggio che gli passo
// se errno!=0 stampa anche il messaggio d'errore associato
// a errno. dopo queste stampe termina il programma
static void termina(const char *messaggio)
{
  if (errno == 0)
    fprintf(stderr, "%s\n", messaggio);
  else
    perror(messaggio);
  exit(1);
}