/*
Scrivere un programma che accetti in input due array di interi distinti e restituisca in output il numero di elementi che occorrono in entrambi gli array. Si assuma che la lunghezza di ogni array sia fornita prima dell'immissione degli elementi, come prima riga.



Si assuma che gli array vengano inseriti ordinati in maniera strettamente crescente. Cercare la soluzione di efficienza ottima per questo specifico problema.



L'input è formato da:



- dimensione del primo array;

- lista dei valori (distinti) del primo array;

- dimensione del secondo array;

- lista dei valori (distinti) del secondo array.





L'unica riga dell'output contiene il numero di elementi in comune tra il primo e il secondo array.


*/
/*
Scrivere un programma che accetti in input due array di interi distinti e
restituisca in output il numero di elementi che occorrono in entrambi gli array.
Si assuma che la lunghezza di ogni array sia fornita prima dell'immissione degli
elementi, come prima riga.



Si assuma che gli array vengano inseriti ordinati in maniera strettamente
crescente. Cercare la soluzione di efficienza ottima per questo specifico
problema.



L'input è formato da:



- dimensione del primo array;

- lista dei valori (distinti) del primo array;

- dimensione del secondo array;

- lista dei valori (distinti) del secondo array.





L'unica riga dell'output contiene il numero di elementi in comune tra il primo e
il secondo array.


*/

#define _GNU_SOURCE // avverte che usiamo le estensioni GNU
#include <assert.h> // permette di usare la funzione assert
#include <errno.h>
#include <stdbool.h> // gestisce tipo bool (variabili booleane)
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa/numero exit() etc ...
#include <string.h>  // confronto/copia/etc di stringhe

int main(int argc, char *argv[]) {
  int dimArr1 = atoi(argv[1]);
  printf("dimArr1 = %d\n", dimArr1);

  int *lista_valori_arr1;
  lista_valori_arr1 = malloc(sizeof(int) * dimArr1);
  for (int i = 2; i <= (dimArr1 + 1); i++) {
    lista_valori_arr1[i - 1] = atoi(argv[i]);
    printf("inserisco in a1 = %d\n", atoi(argv[i]));
  }

  
  int dimArr2 = atoi(argv[dimArr1 + 2]);
  printf("dimArr2 = %d\n", dimArr2);

  int *lista_valori_arr2;
  lista_valori_arr2 = malloc(sizeof(int) * dimArr2);
  for (int i = (dimArr1 + 3); i < argc; i++) {
    int j = i - (dimArr1 + 3);
    lista_valori_arr2[j] = atoi(argv[i]);
    printf("inserisco in a2 = %d\n", atoi(argv[i]));
  }

  int counterEl = 0;
  // int maxArr1 = lista_valori_arr1[dimArr1-1];
  int s = dimArr2 - 1;
  printf("s = %d\n", s);

  int maxArr2 = lista_valori_arr2[s];
  printf("maxArr2 = %d\n", maxArr2);

  for (int i = 0; i < dimArr1; i++) {
    if (lista_valori_arr1[i] > maxArr2) {
      printf("counterEl = %d\n", counterEl);

      return counterEl;
    }

    int j = 0;
    while (lista_valori_arr2[j] <= lista_valori_arr1[i] && j < dimArr2) {
      if (lista_valori_arr2[j] == lista_valori_arr1[i]) {
        counterEl = counterEl + 1;
      }
      j = j + 1;
      printf("j = %d\n", j);
    }
  }
  free(lista_valori_arr1);
  free(lista_valori_arr2);

  printf("counterEl = %d\n", counterEl);

  return counterEl;
}
/*
Esempio di Input:
./main 5 1 2 5 10 12 4 1 10 15 20


5 (numero di elementi)

1

2

5

10

12

4 (numero di elementi)

1

10

15

20



Esempio di Output:

2
*/