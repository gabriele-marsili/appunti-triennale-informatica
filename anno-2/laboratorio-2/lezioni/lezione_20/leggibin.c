/*Lezione 20 (21/11/23)
Lettura da file binari in C
Esercizi assembler
*/

#define _GNU_SOURCE   // avverte che usiamo le estensioni GNU 
#include <stdio.h>    // permette di usare scanf printf etc ...
#include <stdlib.h>   // conversioni stringa/numero exit() etc ...
#include <stdbool.h>  // gestisce tipo bool (per variabili booleane)
#include <assert.h>   // permette di usare la funzione assert
#include <string.h>   // funzioni di confronto/copia/etc di stringhe
#include <errno.h>    // richiesto per usare errno

// Scopo del programma:
//  mostrare come calcolare la dimensione di un file
//  e come si legge da un file binario 


static void termina(const char *messaggio);


int main(int argc, char *argv[])
{
  // verifica siano stati forniti esattamente 2 parametri 
  if(argc!=2) {
    printf("Uso: %s nome_file\n",argv[0]);
    return 1;
  }
  char *nome_file = argv[1];//nome del file da cui leggo i val binari 
  
  // apro il file in lettura
  FILE *f = fopen(nome_file,"rb"); // rb indica che leggo i binari 
  if(f==NULL) termina("Apertura file fallita"); // check su apertura avvenuta correttamente 

  // leggo tutti gli interi del file e li metto in un array

  // determino la dimensione del file -> dalla dim del file posso ricavare la quantità di numeri
  // per farlo mi metto alla fine del file 
  int e = fseek(f, 0, SEEK_END); // mette il puntatore di lettura alla fine del file 
  //seek end mi mette alla fine, il secondo parametro di fseek corrisponde all'offset (in questo caso è giustamente = 0)
  if(e!=0) termina("Errore fseek"); // check su operazione avvenuta con successo 
  // chiedo in che posizione del file sono (=> trovo la lunghezza del file poiché son alla fine del file)
  long lungfile = ftell(f); // ftell ritorna la posizione corrente del file in byte 
  if(lungfile<0) termina("Errore ftell"); // check operazione 
  if(lungfile%4!=0) termina("Il file non contiene int32"); // la lunghezza del file deve essere un multiplo di 4 se contiene int a 32 bit (altrimenti ritorno err con termina)
  // numero di interi nel file
  int n = lungfile/4; // ogni intero = 4 byte (num interi = num tot byte / 4)
  if(n==0) termina("file vuoto");
  
  // alloca array dove mettere gli interi
  int *a = malloc(n*sizeof(*a)); // dim = n * sizeof(*a)
  if(a==NULL) termina("errore malloc");
  rewind(f); // "riavvolgo" il file pointer ad inizio file per poter leggere il file 
  
  // leggo tutti gli interi nell'array a[]
  size_t m = fread(a,sizeof(int),n,f); // leggo dal file f n oggetti dalla che metto in a 
  // es singola variabile : size_t val = (&num, 4,1,f) -> legge 4 byte e mette contenuto in num
  if(n!=m) termina("errore fread");
  
  // chiudi il file
  if(fclose(f)==EOF)
    termina("Errore chiusura file");; 
  
  // stampiamo gli interi letti
  for(int i=0;i<n;i++)
    printf("%8d", a[i]);
  puts("");
  free(a);
  
  return 0;
}


// stampa su stderr il  messaggio che gli passo
// se errno!=0 stampa anche il messaggio d'errore associato 
// a errno. dopo queste stampe termina il programma
static void termina(const char *messaggio)
{
  if(errno==0) 
     fprintf(stderr,"%s\n",messaggio);
  else 
    perror(messaggio);
  exit(1);
}