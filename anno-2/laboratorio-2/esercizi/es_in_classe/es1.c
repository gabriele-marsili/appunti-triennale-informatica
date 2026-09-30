#define _GNU_SOURCE   // avverte che usiamo le estensioni GNU 
#include <stdio.h>    // permette di usare scanf printf etc ...
#include <stdlib.h>   // conversioni stringa/numero exit() etc ...
#include <stdbool.h>  // gestisce tipo bool (per variabili booleane)
#include <assert.h>   // permette di usare la funzione assert
#include <string.h>   // funzioni di confronto/copia/etc di stringhe
#include <errno.h>    // necessaria per usare errno
#include <ctype.h> // toupper 

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

int main(int argc, char *argv[]){
    if(argc < 3){
        termina("Inserirsci almeno 2 argomenti oltre al nome del programma nella linea di comando");
    }
    //int MyLen = argc - 2; // => numero parametri dopo nome file
    //char stringArr[MyLen] = {};


    char *file = argv[1]; // => in var file ho puntatore 
    //apro file (in scrittura):
    FILE *f = fopen(file,"wt");
    
    if(f == NULL) termina("apertura file fallita");

    for(int i=2; i<argc; i++){ // scorro i parametri che sono stringhe
        char *currentStr = argv[i];
        int l = strlen(currentStr);
        fprintf(f,"%s ", currentStr);
       
        
       
       
        for(int j=0; j<l; j++){
            

            int carattere = toupper((unsigned char)currentStr[j]);
            fprintf(f,"%c", carattere);            


            //char *carattere = &currentStr[j];
            //fprintf(f,"%s", c);    
            
            //char maiusc_C = toupper(carattere);
            //fprintf(f,"%s", maiusc_C);            
        }
        fprintf(f,"%s", "\n");

        

    }

    //chiudo file e termina: 
    if(fclose(f)==EOF){
        termina("Errore chiusura file f");
        return 0;
    }
    return 1;
}