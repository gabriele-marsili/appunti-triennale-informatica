#define _GNU_SOURCE   // avverte che usiamo le estensioni GNU 
#include <stdio.h>    // permette di usare scanf printf etc ...
#include <stdlib.h>   // conversioni stringa/numero exit() etc ...
#include <stdbool.h>  // gestisce tipo bool
#include <assert.h>   // permette di usare la funzione assert
#include <string.h>   // funzioni per stringhe
#include <errno.h>    // rischiesto per usare errno
//programma che crea dei file 


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


int main(int argc, char*argv[]){
    int  a = 1;
    char *nome;
    puts("inserisci il nome e il numero dei file:");
    int e = scanf("%ms %d",&nome,&a);
    if(e!=2)  termina("Error scanf");


    //genera i nomi e scrive i file : 
    for(int i=0; i<a; i++){
        char *s = NULL;
        e = asprintf(&s, "%s.%d",nome,i);
        // in s vengono concatenate stringhe nome e val num. i
        // => ho nome.0 nome.1 nome.2 ...   

        
        if(e<0)termina("Error asprintf");
        FILE *f = fopen(s, "wt");
        if(f==NULL)termina("Error apertura file");
        fprintf(f, "%d\n",i);
        if(fclose(f)!=0) termina("Error chiusura file");

        free(s); // de aloco strg allocata da asprintf

    }
    free(nome); 

}