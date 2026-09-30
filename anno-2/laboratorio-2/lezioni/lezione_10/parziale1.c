// scrivere qui l'email istituzionale_
// <email>

#define _GNU_SOURCE // avverte che usiamo le estensioni GNU
#include <assert.h> // permette di usare la funzione assert
#include <errno.h>
#include <stdbool.h> // gestisce tipo bool (variabili booleane)
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa/numero exit() etc ...
#include <string.h>  // confronto/copia/etc di stringhe
/*DATI :
EMAIL : <email>
*/

// stampa un messaggio d'errore e termina il programma
void termina(char *messaggio) {
  if (errno != 0)
    perror(messaggio);
  else
    fprintf(stderr, "%s\n", messaggio);
  exit(1);
}

// fa la somma di tutti gli elementi dell'array passato come argomento
int sommaArr(int a[], int dimA) {
  int somma = 0;
  for (int i = 0; i < dimA; i++) {
    somma += a[i];
  }
  return somma;
}

int somme(int a[], int n, int range) {
  int s = 0;
  if (range == 0) {
    s = sommaArr(a, n);
  }
  if (range > 0) {
    if (range <= n) {
      for (int i = 0; i < range; i++) {
        s += a[i];
      }
    } else { // => range > n -> s = somma di tutti gli elementi di a
      s = sommaArr(a, n);
    }
  }
  if (range < 0) {
    if (-range <= n) {
      for (int i = 0; i < (-range); i++) {
        s += a[i];
      }
    } else { // => -range > n -> s = somma di tutti gli elementi di a
      s = sommaArr(a, n);
    }
  }

  return s;
}

// legge gli interi che sono nel file f
// e li salva in un array che viene restituito
// con return + passaggio per riferimento
int *leggi_file(FILE *f, int *num_elementi) {
  assert(f != NULL); // il file deve essere valido ->  se il test è falso il
                     // programma si blocca (molto utile per trovare errori)
  int size = 10;     // dimensione attuale dell'array
  int messi = 0;     // numero di elementi attualmente nell'array
  int *a = malloc(size * sizeof(int));
  if (a == NULL)
    termina("Memoria insufficiente");

  while (true) {
    int n;
    int e = fscanf(
        f, "%d",
        &n); // booleano corrispondente all'esito della scanf (e == 0 => errore
             // - meglio scrivere e!=1 | e ==1 se scanf andata a buon fine)
    if (e == EOF)
      break; // => lettura del file finita - siamo arrivati alla fine del file
             // (=> termino il while)
    if (e != 1)
      termina(
          "Contenuto illegale nel file"); // => non viene letto correttamente un
                                          // intero (viene trovata una stringa
                                          // non leggibile come un intero)
    // ho letto un intero dal file ed è stato messo in n
    if (messi == size) {
      // ingrandisco l'array
      size = size * 2;
      a = realloc(a, size * sizeof(int));
      if (a == NULL)
        termina("realloc fallita");
    }
    assert(size > messi); // => lo spazio deve esser maggiore degli elementi
                          // messi (in base alle righe precedenti) -> in caso
                          // non fosse così ho errore nelle istruzioni del
                          // programa e viene triggerato l'assert
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
  return a;
}

int main(int argc, char *argv[]) {
  if (argc <= 2) {
    termina("argc deve esser > 2 ");
  }

  char *nome_file = argv[1];
  assert(nome_file != NULL);

  FILE *f = fopen(nome_file, "rt"); // apertura file in lettura
  if (f == NULL)
    termina("Apertura file fallita");

  int n; // numero di elementi nell'array
  int *a = leggi_file(f, &n);

  int m = atoi(argv[2]); // iniziallizzo il max

  for (int i = 3; i < argc; i++) { // calcola max sugli altri valori
    int current_num = atoi(argv[i]);
    if (current_num > m)
      m = current_num;
  }

  int res = somme(a, n, m);
  fprintf(stdout, "%d", res);

  free(a); // dealloca a
  // chiudi il file e termina
  if (fclose(f) == EOF)
    termina("Errore chiusura file");
  ;

  return 0;
}