/*
Scrivere un programma che legga da input 
 interi, inserendoli in un array.

Il programma deve invertire l'array senza utilizzare un array di appoggio, ossia scambiare il contenuto della prima e dell'ultima cella, della seconda e della penultima, ecc.



La prima riga dell'input è il valore 
. Seguono 
 interi, uno per riga.



Il programma stampa in output gli elementi dell'array invertito, uno per riga.
*/

#define _GNU_SOURCE // avverte che usiamo le estensioni GNU
#include <assert.h> // permette di usare la funzione assert
#include <errno.h>
#include <stdbool.h> // gestisce tipo bool (variabili booleane)
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa/numero exit() etc ...
#include <string.h>  // confronto/copia/etc di stringhe


int main(int argc, char *argv[]){
    if (argc < 2) {
        return 0;
    }
    
    int *a ;
    
    // assumo che argv di 1 sia != da 0 e sia convertibile 
    int n = atoi(argv[1]); //argc-1;
    a = malloc(sizeof(int)*n);

    //inserisco i numeri in a 
    for(int i = 2; i<argc; i++){
        int num = atoi(argv[i]);
        //assumo che ogni elem nell'input sia convertibile in numero, altrimenti avrei -> if(num == 0 && argv[i] =! "0") => terminazione 
        a[i-2] = num;
    }    

    //rialloco elementi di a:    
    int index_ultimo = n-1;
    int n_mezzi ;
    if(n%2 == 0) n_mezzi = n/2 ;
    else n_mezzi = (n-1)/2 ;

    for(int i = 0; i<n_mezzi; i++){
        
        int val_appoggio = a[i];
        a[i] = a[index_ultimo]; // > primo scambio 
        a[index_ultimo] = val_appoggio; // > secondo scambio 
        
        index_ultimo -= 1; // decremento l'indice dell'ultimo el ancora da scambiare 

    }

    //stampo 
    for(int i = 0; i<n; i++){
        printf("%d\n",a[i]);
    }

    //free(a);
    return *a;

}