#define _GNU_SOURCE // avverte che usiamo le estensioni GNU
#include <assert.h> // permette di usare la funzione assert
#include <errno.h>
#include <stdbool.h> // gestisce tipo bool (variabili booleane)
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa/numero exit() etc ...
#include <string.h>  // confronto/copia/etc di stringhe

typedef struct {
  int primo;
  int secondo;
  int terzo;
} tripla;

// stampa un messaggio d'errore e termina il programma
void termina(char *messaggio) {
  if (errno != 0)
    perror(messaggio);
  else
    fprintf(stderr, "%s\n", messaggio);
  exit(1);
}

int ordinaTriple(const void *a, const void *b) {
  // riprendo puntatori a triple :
  tripla *pt1 = (tripla *)a;
  tripla *pt2 = (tripla *)b;

  tripla t1 = *pt1; // tripla 1
  tripla t2 = *pt2; // tripla 2

  int sum1 = t1.primo + t1.secondo + t1.terzo; // somma tripla 1
  int sum2 = t2.primo + t2.secondo + t2.terzo; // somma tripla 2

  if (sum1 > sum2) {
    return 1;
  } else if (sum1 < sum2) {
    return -1;
  } else { // => somma uguale
    if (t1.primo > t2.primo) {
      return 1;
    } else if (t1.primo < t2.primo) {
      return -1;
    } else { // => prima componente uguale
      if (t1.secondo > t2.secondo) {
        return 1;
      } else if (t1.secondo < t2.secondo) {
        return -1;
      } else { // => seconda componente uguale
        if (t1.terzo > t2.terzo) {
          return 1;
        } else if (t1.terzo < t2.terzo) {
          return -1;
        } else { //=> terza componente uguale => triple uguali
          return 0;
        }
      }
    }
  }
}

int main(int argc, char *argv[]) {

  if (argc != 3)
    termina("Uso: main infile outfile");
  FILE *f = fopen(argv[1], "r");
  assert(f != NULL); // controllo file
  if (f == NULL)
    termina("Errore apertura file");

  int size = 10; // dimensione attuale dell'array
  int messi = 0; // numero di elementi attualmente nell'array di triple
  tripla *a =
      malloc(size * sizeof(tripla)); // alloco a (arr di puntatori a tripla)
  if (a == NULL)
    termina("Memoria insufficiente");

  // ciclo di lettura dal file f
  char *buffer = NULL;
  size_t n = 0;
  while (true) {
    // leggi linea dal file
    ssize_t e = getline(&buffer, &n, f);
    if (e < 0) {
      free(buffer); // dealloco il buffer usato per contenere le linee
      break;
    }

    // parsing:
    char *s = strtok(buffer, " \n");
    int c = 0;
    tripla t;
    while (s != NULL && c < 3) {
      if (s[0] != '\0') {
        printf("s = %s\n", s);
        c++;
        switch (c) {
        case 1:
          t.primo = atoi(s);
          break;
        case 2:
          t.secondo = atoi(s);
          break;
          // Additional cases as needed
        case 3:
          t.terzo = atoi(s);
          break;
        default:
          termina("Errore nella lettura delle triple");
        }
      }
      s = strtok(NULL, ";\n");
    }
    //=> t è la tripla appena creata
    // inserimento in array :
    if (messi == size) {
      // ingrandisco l'array
      size = size * 2;
      a = realloc(a, size * sizeof(tripla *));
      if (a == NULL)
        termina("realloc fallita");
    }
    assert(messi < size);
    a[messi] = t; // -> inserisco la tripla
    messi += 1;
  }

  fclose(f); // chiudo file di lettura

  qsort(a, messi, sizeof(tripla), &ordinaTriple);
  // -> a ordinato

  FILE *fout = fopen(argv[2], "w");
  assert(fout != NULL); // controllo file
  if (fout == NULL)
    termina("Errore apertura file");

  for (int i = 0; i < messi; i++) {
    tripla t = a[i];
    for (int j = 0; j < 3; j++) {
      switch (j + 1) {
      case 1:
        fprintf(fout, "%d ", t.primo);
        break;
      case 2:
        fprintf(fout, "%d ", t.secondo);
        break;
      case 3:
        fprintf(fout, "%d", t.terzo);
        break;
      default:
        termina("Errore nella scrittura delle triple");
      }
    }
    fprintf(fout, "\n");
  }
  fclose(fout);
  free(a); // de alloco a
  return 0;
}