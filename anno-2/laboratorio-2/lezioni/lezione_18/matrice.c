//14/11/2023
/* *********************************************************
 * dimostrazione di uso degli array bidimensionali
 * sia statici che dinamici 
 * ********************************************************* */
#include <stdio.h>    // permette di usare scanf printf etc ...
#include <stdlib.h>   // conversioni stringa/numero rand() abs() exit()
#include <stdbool.h>  // gestisce tipo bool (per variabili booleane)
#include <assert.h>   // permette di usare la funzione assert
#include <string.h>   // prototipi delle funzioni per stringhe

// prototipi
void termina(const char *messaggio);
void stampa_matrice(int r, int c, int q[][c], FILE *f);
void stampa_matrice_dinamica(int r, int c, int **q, FILE *f);
int **crea_matrice_interi(int r, int c); 


int main(int argc, char *argv[])
{
  if(argc!=3) {
    fprintf(stderr,"Uso: %s righe colonne\n",argv[0]);
    exit(EXIT_FAILURE);
  }
  // legge il numero di righe e colonne dalla riga di comando 
  int righe = atoi(argv[1]);
  int colonne = atoi(argv[2]);
  if(righe<1 || colonne <1)
    termina("Righe e colonne devono essere positive");
  
  // matrice allocata staticamente
  int a[righe][colonne]; // allocata nello stack, che ha dimensione limitata (è molto sconsigliato l'uso delle matrici allocate staticamente, a meno che non si sappia a priori che han dimensione piccola)
  
  for(int i=0;i<righe;i++) // -> riempo la matrice 
    for(int j=0;j<colonne;j++)
      a[i][j] = 10*i+j; // sintassi corretta è con doppia parentesi quadra [][]
      
  // stampa contenuto della matrice 
  puts("Matrice allocata staticamente:\n");
  stampa_matrice(righe,colonne,a,stdout); // per passare una matrice in una funzione devo passare il numero delle righe e delle colonne, oltre che alla matrice (a)
  

  // ---- allocazione di una matrice dinamica
  /*a è vettore, a[0] è il primo elemento, ... 
  ogni elemento di a è un puntatore ad intero -> a[i] = puntatore ad intero
  => devo allocare a 
  -> la variabile a ha tipo : puntatore a puntatore ad intero
  => per creare la matrice devo avere la var a, devo allocare le componenti di a e poi ogni singola variabile (valore)*/
  int **b; // -> puntatore a puntatore ad intero
  b = crea_matrice_interi(righe,colonne);
  // riempio la matrice (come nella matrice statica : ciclo su righe, ciclo su colonne e riempo con b[i][j] = valore int)
  for(int i=0;i<righe;i++)
    for(int j=0;j<colonne;j++)
      b[i][j] = 20*i+j;
  puts("Matrice allocata dinamicamente:\n");
  stampa_matrice_dinamica(righe,colonne,b,stdout);

  // dealloco la matrice b creata dinamicamente 
  for(int i=0;i<righe;i++) 
    free(b[i]);
  free(b);  

  return 0;
}


// stampa i valori di una matrice rxc
// allocata come variabile statica 
void stampa_matrice(int r, int c, int q[][c], FILE *f) // -> la matrice non la posso prendere direttamente con q[][], devo usare q[][c] per specificare gli elementi
{ // -> quando alloco la matrice la inserisco in memoria, che è monodimensionale => i valori vengono inseriti riga per riga nella RAM 
// => devo passare la fine di una riga-> per farlo devo sapere la quantità delle colonne -> ovvero c 

  for(int i=0;i<r;i++) {
    for(int j=0;j<c;j++)
      fprintf(f,"%2d ",q[i][j]); // accedo alla matrice con q[i][j]
    fprintf(f,"\n");
  }
}


// stampa i valori di una matrice rxc allocata dinamicamente
// notiamo che il codice interno è identico, ma il prototipo 
// è differente, quindi non possiamo usare questa funzione per 
// stampare una matrice allocata staticamente
void stampa_matrice_dinamica(int r, int c, int **q, FILE *f) // la matrice in q ha tipo puntatore a puntatore intero 
{
  for(int i=0;i<r;i++) {
    for(int j=0;j<c;j++)
      fprintf(f,"%2d ",q[i][j]); // stampa (come matrice statica)
    fprintf(f,"\n");
  }
}


// alloca e restituisce una matrice dinamica
// dato il numero di righe e colonne
int **crea_matrice_interi(int r, int c)
{    
  int **b; // -> puntatore a puntatore ad intero 
  b = malloc(r*sizeof(*b)); // alloco un array un array di dim r i cui elementi sono puntatori ad interi 
  //b[i] = una riga = un array di puntatori ad interi 
  if(b==NULL) termina("Allocazione fallita");
  for(int i=0;i<r;i++) { // alloco le righe 
    b[i] = malloc(c*sizeof(int)); // alloco l'i-esima riga
    if(b[i]==NULL) termina("Allocazione riga fallita");
  }
  return b;

  /*esempio di b: 
  b[0] -> [0,1,3,4]
  b[1] -> [10, 11, 12 ,13]
  b[2] -> [20,21,22,24]
  */
}


// mostra il messaggio d'errore passato come parametro seguito
// dal messaggio associato all'ultimo errore di una funzione di libreria
// (mediante errno); dopo la stampa termina il programma  
void termina(const char *messaggio)
{
  perror(messaggio);
  exit(EXIT_FAILURE);
}