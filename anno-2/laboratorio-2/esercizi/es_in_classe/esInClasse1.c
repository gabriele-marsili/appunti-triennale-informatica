#define _GNU_SOURCE  // avverte che usiamo le estensioni GNU
#include <assert.h>  // permette di usare la funzione assert
#include <errno.h>   // necessaria per usare errno
#include <stdbool.h> // gestisce tipo bool (per variabili booleane)
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa/numero exit() etc ...
#include <string.h>  // funzioni di confronto/copia/etc di stringhe

// stampa un messaggio d'errore su stderr e termina il programma
void termina(char *messaggio) {
  if (errno != 0)
    perror(messaggio);

  else
    fprintf(stderr, "%s\n", messaggio);
  exit(1);
}

int *elabora(int a[], int n, int k, int *nuovon) {
  int *b;
  int size = 0;
  // printf("\nk in elab  = %d", k);

  if (k > 0) {
    size = n * k;
    b = malloc(size * sizeof(int));
    int last_i = 0;
    for (int i = 0; i < n; i++) {   // scorre a
      for (int j = 0; j < k; j++) { // inserisce k elementi
        b[last_i] = a[i];
        last_i++;
      }
    }

  }

  else if (k == 0) {
    size = n;
    b = malloc(size * sizeof(int));
    // b = calloc(size, sizeof(int));  // -> inizializza a 0 
    for (int i = 0; i < n; i++) {
      b[i] = 0;
    }
  }

  // k<0
  else {
    // printf("\nk è < di 0 ");
    size = n * k * -1;
    b = malloc(size * sizeof(int));
    int last_i = 0; // size - 1;
    // printf("\nlast i in elab  -k<0 = %d", last_i);

    int m = n - 1; // => indice ultimo elem di a

    for (int i = m; i >= 0; i--) { // => scorro a al contrario
      int ind = -1 * k;
      // printf("\nind = %d", ind);

      for (int j = 0; j < ind; j++) { // inserisco ind elementi con ind=-k (e k <0)
        b[last_i] = a[i];
        // printf("\ni = %d", i);

        // printf("\na[i] = %d", a[i]);
        last_i++;
      }
    }
  }

  // int *p = &b[0];
  *nuovon = size;
  return b;
}

// legge gli interi che sono nel file f
// e li salva in un array che viene restituito
// con return + passaggio per riferimento
int *leggi_file(FILE *f, int *num_elementi) {
  assert(f != NULL); // il file deve essere valido
  int size = 10;     // dimensione attuale dell'array
  int messi = 0;     // numero di elementi attulamente nell'array
  int *arr = malloc(size * sizeof(int));
  if (arr == NULL)
    termina("Memoria insufficiente");

  while (true) {
    int n;
    int e = fscanf(f, "%d", &n); // lettura di un singolo carattere alla volta
    if (e == EOF)
      break; // > stoppo il while se trovo un errore (prima o poi trovo questa
             // situazione: quando arrivo in fondo al file / se ho err)
    if (e != 1)
      termina("Contenuto illegale nel file");
    // ho letto un intero dal file ed è stato messo in n
    if (messi == size) {
      // ingrandisco l'array
      size = size * 2;
      arr = realloc(arr, size * sizeof(int));
      if (arr == NULL)
        termina("realloc fallita");
    }
    assert(size > messi);
    arr[messi] = n;
    messi += 1;
  }
  // ho messo tutti gli elementi che mi interessavano
  size = messi;
  arr = realloc(arr, size * sizeof(int));
  if (arr == NULL)
    termina("realloc fallita");
  // salvo il numero di elementi e restituisco l'array
  *num_elementi = messi;

  // chiudi il file e termina
  if (fclose(f) == EOF) { // => chiamo fclose(f) direttamente nell'if e vedo se
                          // la chiusura è andata a buon fine
    termina("Errore chiusura file");
    ;
  }

  return arr;
}

int main(int argc, char *argv[]) {
  char *name = argv[1]; // nome file
  // assert(name != NULL);

  // apro il file in lettura
  FILE *f = fopen(name, "rt"); // aprtura file con r e t perché file di txt
  if (f == NULL)
    termina("Apertura file fallita");

  int n;                          // numero di elementi nell'array
  int *array = leggi_file(f, &n); // legge interi del file di input in array a

  for (int i = 2; i < argc; i = i + 1) { // scorro gli interi i
    int interoI = atoi(argv[i]);
    // char *nomeK = argv[i + 1];
    int nuovaDim;
    int *res = elabora(array, n, interoI, &nuovaDim);
    for (int i = 0; i < nuovaDim; i++) { // > scorro arr risultato di elab
      fprintf(stdout, "%d ", res[i]);
    }
    fprintf(stdout, "\n");

    free(res);
  }

  // free(array);
  return 0;
}