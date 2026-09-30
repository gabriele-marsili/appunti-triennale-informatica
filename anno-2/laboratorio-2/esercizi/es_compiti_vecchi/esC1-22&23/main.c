/*TESTO:
Scrivere una funzione

int *elabora(int a[], int n, int k, int *nuovon)
che dato un array a[] di n elementi crea e restituisce un nuovo array il cui
contenuto dipende dal parametro k:

se k>0 il nuovo array deve contenere ogni elemento di a ripetuto k volte
consecutivamente; ad esempio se a=[1 0 8 2] e k=3 il nuovo array deve essere [1
1 1 0 0 0 8 8 8 2 2 2]

se k=0 il nuovo array deve avere la stessa lunghezza di a ma contenere soltanto
zeri; ad esempio se a=[1 0 8 2] e k=0 il nuovo array deve essere [0 0 0 0]

se k<0 il nuovo array deve contenere ogni elemento di a ripetuto k volte ma in
ordine inverso; ad esempio se a=[1 0 8 2] e k=-2 il nuovo array deve essere [2 2
8 8 0 0 1 1]

La funzione deve restituire il puntatore al primo elemento dell'array risultato
e memorizzare in *nuovon la sua lunghezza.

NOTA: dovete scrivere esattamente una funzione con questo nome e questi
parametri che fa esattamente queste cose. Non è accettato fare queste operazioni
in una funzione diversa o dentro il main.

Scrivere infine un programma C che legge dalla linea di comando il nome di un
file di input e una serie di coppie interoK nomeK ed esegue le seguenti
operazioni:

Legge gli interi memorizzati nel file di input in un array a[] (termina il
programma se non ce ne sono) Per ogni coppia interoK nomeK sulla linea di
comando invoca la funzione elabora passandogli l'array a[] e interoK e scrive
gli elementi dell'array restituito da elabora nel file nomeK Ad esempio, se il
programma viene invocato scrivendo

main infile  2 out1  0 auto2  -1 out3
e il file infile contiene gli interi

2
0
5
1
1
il programma deve generare un file out1 contenente

2
2
0
0
5
5
1
1
1
1
un file out2 contenente

0
0
0
0
0
e un file out3 contenente

1
1
5
0
2
Il programma deve chiudere tutti i file e deallocare tutta la memoria utilizzata
(usate valgrind per verificarlo)

Per la lettura e scrittura di array di interi è ammesso ultilizzare il codice
fatto a lezione (eventualmente opportunamente modificato).

La consegna del programma (un unico file main.c) deve essere fatta su moodle
*/

#define _GNU_SOURCE  // avverte che usiamo le estensioni GNU
#include <assert.h>  // permette di usare la funzione assert
#include <ctype.h>   // toupper
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
  printf("\nk in elabora = %d", k);

  if (k > 0) {
    size = n * k;
    b = malloc(size * sizeof(int));
    int last_i = 0;
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < k; j++) {
        b[last_i] = a[i];
        last_i++;
      }
    }

  }

  else if (k == 0) {
    size = n;
    b = malloc(size * sizeof(int));
    for (int i = 0; i < n; i++) {
      b[i] = 0;
    }
  }

  // k<0
  else {
    printf("\nk è < di 0 ");
    size = n * k * -1;
    b = malloc(size * sizeof(int));
    int last_i = 0; // size - 1;
    // printf("\nlast i in elabora -k<0 = %d", last_i);

    // for (int i = 0; i < size; i++) { // inserisco in b elementi fittizi:
    // b[i] = 0;
    //}
    printf("\nn = %d", n);
    int m = n - 1;

    for (int i = m; i >= 0; i--) { // => scorro a al contrario
      int ind = -1 * k;
      printf("\nind = %d", ind);

      for (int j = 0; j < ind; j++) {
        b[last_i] = a[i];
        printf("\ni = %d", i);

        printf("\na[i] = %d", a[i]);
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
  int *a = malloc(size * sizeof(int));
  if (a == NULL)
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
      a = realloc(a, size * sizeof(int));
      if (a == NULL)
        termina("realloc fallita");
    }
    assert(size > messi);
    a[messi] = n;
    messi += 1;
  }
  // ho messo tutti gli elementi che mi interessavano
  size = messi;
  a = realloc(a, size * sizeof(int));
  if (a == NULL)
    termina("realloc fallita");
  // salvo il numero di elementi e restituisco l'array
  *num_elementi = messi;

  // chiudi il file e termina
  if (fclose(f) == EOF) { // => chiamo fclose(f) direttamente nell'if e vedo se
                          // la chiusura è andata a buon fine
    termina("Errore chiusura file");
    ;
  }

  return a;
}

int main(int argc, char *argv[]) {
  char *name = argv[1]; // nome file
  // assert(name != NULL);

  // apro il file in lettura
  FILE *f = fopen(name, "rt"); // aprtura file con r e t perché file di txt
  if (f == NULL)
    termina("Apertura file fallita");

  int n; // numero di elementi nell'array
  int *a = leggi_file(f, &n);
  // assert(a[0] != NULL);

  for (int i = 2; i < argc; i = i + 2) { // scorro le coppie
    int interoK = atoi(argv[i]);
    char *nomeK = argv[i + 1];
    int nuovaDim;
    int *res = elabora(a, n, interoK, &nuovaDim);

    FILE *wf = fopen(nomeK, "wt");
    if (wf == NULL)
      termina("Apertura file fallita");
    for (int i = 0; i < nuovaDim; i++) { // > scorro arr risultato di elabora
      int e = fprintf(wf, "%d\n", res[i]);
      if (e < 0)
        termina("errore nella scrittura");
    }
    // chiudi il file e termina
    if (fclose(wf) == EOF) { // => chiamo fclose(f) direttamente nell'if e vedo
                             // se la chiusura è andata a buon fine
      termina("Errore chiusura file");
    }
    free(res);
  }

  free(a);
  return 0;
}