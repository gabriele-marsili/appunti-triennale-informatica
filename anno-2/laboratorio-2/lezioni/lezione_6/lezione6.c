#define _GNU_SOURCE   // avverte che usiamo le estensioni GNU 
#include <stdio.h>    // permette di usare scanf printf etc ...
#include <stdlib.h>   // conversioni stringa/numero exit() etc ...
#include <stdbool.h>  // gestisce tipo bool (per variabili booleane)
#include <assert.h>   // permette di usare la funzione assert
#include <string.h>   // funzioni di confronto/copia/etc di stringhe
#include <errno.h>    // necessaria per usare errno


/*
FILES :
sequnza lineare di bit (potenzialmente infinito).
Hanno assiciaton un indicatore che dice dove si trova leggendo / scrivendo.

fopen("ciao","wt"); //file che apro in scrittura (se esiste già il vecchio contenuto viene eliminato)
-> ho una seq di bite vuota : []
printf(2) --> [2 \n ^ ]
^ corrisponde alla posizione del puntatore.
Comando rewind : 
-> sposta il puntatore dalla fine all'inizio del file.



*/

// Scopo del programma:
//  mostrare come si legge da un file di testo 


// stampa un messaggio d'errore su stderr e termina il programma
void termina(char *messaggio)
{
  // se errno!=0 oltre al mio messaggio stampa il messaggio
  // associato alla variabile globale errno 
  // utilizzando la funzione di libreria perror()
  if(errno!=0) perror(messaggio);
  // altrimenti stampa solo il mio messaggio
  else fprintf(stderr,"%s\n", messaggio);
  exit(1);
}

// legge gli interi che sono nel file f
// e li salva in un array che viene restituito
// con return + passaggio per riferimento
int *leggi_file(FILE *f, int *num_elementi)
{
  assert(f!=NULL); // il file deve essere valido ->  se il test è falso il programma si blocca (molto utile per trovare errori)
  int size=10; // dimensione attuale dell'array
  int messi=0; // numero di elementi attualmente nell'array
  int *a = malloc(size*sizeof(int));
  if(a==NULL)
    termina("Memoria insufficiente");
    
  while(true) {
    int n;
    int e = fscanf(f,"%d",&n); // booleano corrispondente all'esito della scanf (e == 0 => errore - meglio scrivere e!=1 | e ==1 se scanf andata a buon fine)
    if(e==EOF) break; // => lettura del file finita - siamo arrivati alla fine del file (=> termino il while)
    if(e!=1) termina("Contenuto illegale nel file"); // => non viene letto correttamente un intero (viene trovata una stringa non leggibile come un intero)
    // ho letto un intero dal file ed è stato messo in n
    if(messi==size) {
        // ingrandisco l'array
        size = size*2;
        a = realloc(a,size*sizeof(int));
        if(a==NULL)
          termina("realloc fallita");
    }
    assert(size>messi); // => lo spazio deve esser maggiore degli elementi messi (in base alle righe precedenti) -> in caso non fosse così ho errore nelle istruzioni del programa e viene triggerato l'assert 
    a[messi] = n;
    messi += 1;
  }
  // ho messo tutti gli elementi che mi interessavano
  size = messi;
  a = realloc(a,size*sizeof(int));
  if(a==NULL)
    termina("realloc fallita");  
  // salvo il numero di elementi e restituisco l'array  
  *num_elementi = messi;
  return a;  
} 

// visualizza elementi di un qualsiasi 
// array di int sul terminale
void stampa_array(int *a, int n) // > a è un puntatore intero, n il numero di elementi dell'array
{
  assert(a!=NULL); // check su a 
  // stampo il contenuto dell'array
  for(int i=0;i<n;i++)
    fprintf(stdout,"%8d",a[i]); // stampo gli elementi in un campo di 8 caratteri
  
  fprintf(stdout,"\nIn totale l'array contiene %d interi\n",n); // stdout = come stampa normale di printf (stampa di default)
  // stdout ci metto il vero output del programma 
  fprintf(stderr,"Ho finito!\n"); // => viene stampato solo in caso di errore 
  // stderr -> ci metto msg di erroe / debug 
}


int main(int argc, char *argv[])
{
  // verifica siano stati forniti esattamente 2 parametri 
  if(argc!=2) {
    printf("Uso: %s nome_file\n",argv[0]);
    return 1;
  }
  // copia il puntatore nella variabile nome_file
  char *nome_file = argv[1];
  
  // apro il file in lettura 
  FILE *f = fopen(nome_file,"rt");
  if(f==NULL) termina("Apertura file fallita");

  int n; // numero di elementi nell'array
  int *a = leggi_file(f,&n);

  // stampo gli elementi dell'array
  stampa_array(a,n);
  free(a);

  // chiudi il file e termina 
  if(fclose(f)==EOF)
    termina("Errore chiusura file");; 
   
  return 0;
}


/*
comando cat : mostra errori logici.

$ nome_file input > nome_file_dest
=> esegue il file con l'input e mette l'output in cima al file nome_file_dest

$ nome_file input >> nome_file_dest
=> esegue il file con l'input e mette l'output in fondo al file nome_file_dest

$ nome_file input 2> nome_file_dest
mette gli stderr nel file nome_file_dest e stampa il resto dell'output su terminale


posso utilizzare il contenuto di un file come input per l'esecuzione di un altro file (invece che leggere input da tastiera):
$ nome_file_che_eseguo < file_input 

*/

