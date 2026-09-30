
/*
esercizio: 
leggere file da input terminale, creare file .pari e .dispari in base al nome del file sul terminale.
nella lettura del file mettere in .pari i numeri pari ed in .dispari i dispari.

*/

#define _GNU_SOURCE   // avverte che usiamo le estensioni GNU 
#include <stdio.h>    // permette di usare scanf printf etc ...
#include <stdlib.h>   // conversioni stringa/numero exit() etc ...
#include <stdbool.h>  // gestisce tipo bool (per variabili booleane)
#include <assert.h>   // permette di usare la funzione assert
#include <string.h>   // funzioni di confronto/copia/etc di stringhe
#include <errno.h>    // necessaria per usare errno


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



int main(int argc,char *argv[]){    
    //verifica che sia stato inserito nome file:
    if(argc != 2){
        printf("Uso: %snome_file\n",argv[0]);
        return 1;
    }   
    //copia puntatore alla var. nome_file
    char *nome_file = argv[1];

    //apro file in lettura:
    FILE *f = fopen(nome_file,"rt");
    if(f == NULL) termina("apertura file fallita");

    //creo il file con estensione .pari
    //devo crearmi la stringa : devo prima allocarmi una zona di memoria sufficientemente grande per la stringa:
    char * nomepari = malloc(strlen(nome_file) + 6); // perchè aggiungo .pari e lo 0 in fondo 
    if(nomepari == NULL) termina("allocazione fallita");   

    //devo copiare nella stringa nomepari il contenuto di 
    strcpy(nomepari, nome_file); // (destinazione, sorgente) -> copia il contenuto di nome_file nell'altra stringa (lo 0 compreso)
    //ora nome pari ha li stessi caratteri (lo 0 in fondo incluso) di nome_file 
    //devo aver allocato uno spazio sufficiente per nome pari prima di usare la strcpy
    strcat(nomepari,".pari"); // aggiungo il suffisso -> strcat per concatenare str

    FILE *fp = fopen(nomepari,"wt"); // apro il file in scrittura
    if(fp==NULL) termina("Apertura file pari fallita");
    free(nomepari);


    //creo il file con estensione .dispari
    //devo crearmi la stringa : devo prima allocarmi una zona di memoria sufficientemente grande per la stringa:
    char * nomedispari = malloc(strlen(nome_file) + 9); // perchè aggiungo .dispari e lo 0 in fondo 
    if(nomedispari == NULL) termina("allocazione fallita");   

    //devo copiare nella stringa nomepari il contenuto di 
    strcpy(nomedispari, nome_file); // (destinazione, sorgente) -> copia il contenuto di nome_file nell'altra stringa (lo 0 compreso)
    //ora nome pari ha li stessi caratteri (lo 0 in fondo incluso) di nome_file 
    //devo aver allocato uno spazio sufficiente per nome pari prima di usare la strcpy
    strcat(nomedispari,".dispari"); // aggiungo il suffisso

    FILE *fd = fopen(nomedispari,"wt"); // apro il file in scrittura
    if(fd==NULL) termina("Apertura file dispati fallita");
    free(nomedispari);

    while(true){
        int n ; 
        int e = fscanf(f,"%d",&n); // leggo dal primo file e metto i numeri che trovo via via in n 
        if(e==EOF) break;
        if(e!=1) termina("Contenuto illegale");
        if(n%2==0){
            fprintf(fp,"%d\n",n); // scrivo su file .pari
        }
        else{
            fprintf(fd,"%d\n",n); // scrivo su file .dispari
        }    
    }

    //chiudo file e termina: 
    if(fclose(fd)==EOF){
        termina("Errore chiusura file fd");
        return 0;
    }


    //chiudo file e termina: 
    if(fclose(fp)==EOF){
        termina("Errore chiusura file fd");
        return 0;
    }

    //chiudo file e termina: 
    if(fclose(f)==EOF){
        termina("Errore chiusura file");
        return 0;
    }


}   