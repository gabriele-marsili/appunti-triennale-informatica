/*COME PASSARE UNA FUNZIONE AD UN'ALTRA

*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

// funzioni somma e prodotto che prendono come 
// input due interi e restituiscono un intero
int somma(int a, int b) 
{
  return a+b;
}

int prod(int a, int b)
{
  return a*b;
}


// funzione che prende in input due interi e il puntatore di una funzione f
// e applica la funzione ai due interi x ed y 
int applica(int x, int y, int (*f)(int, int)) { // f è una puntatore di una funzione che prende come argomenti 2 interi e restituisce un intero 
  int z = f(x,y); 
  return z;
}


int main(int argc, char *argv[])
{
  int a,b;

  if (argc!=3) { 
    fprintf(stderr,"Uso:\n\t%s a b\n",argv[0]); exit(1);
  }
  a = atoi(argv[1]);
  b = atoi(argv[2]);
  printf("Somma: %d, Prodotto %d\n",
            applica(a,b,&somma), // passo indirizzo funzione somma 
            applica(a,b,&prod)); // passo indirizzo funzione prodotto 
  return 0;

}