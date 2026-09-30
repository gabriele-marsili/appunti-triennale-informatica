#define _GNU_SOURCE   // avverte che usiamo le estensioni GNU 
#include <stdio.h>    // permette di usare scanf printf etc ...
#include <stdlib.h>   // conversioni stringa/numero exit() etc ...
#include <stdbool.h>  // gestisce tipo bool
#include <assert.h>   // permette di usare la funzione assert
#include <string.h>   // funzioni per stringhe
#include <errno.h>    // rischiesto per usare errno



int readInt() { 
    int x;
    printf("Inserisci un numero intero");
    while (scanf("%d", &x) == 0) {
        printf("Errore in input, inserisci un intero valido\n"); scanf("%*[^\n]\n");
    }
    return x;
}


int *crea_somme(int array[], int dim){
    int sum = 0;
    int *resoult = malloc(sizeof(int)*dim);
    for(int i = 0; i < dim;i++){
        sum += array[i];                   
        resoult[i] = sum;
    }
    return resoult;

}

int main(int argc, char*argv[]){    
    int n  = readInt();     
    int *a ;            
    a = malloc(sizeof(int)*n);    
    for(int i = 0; i < n; i++){
        a[i] = readInt();        
    }
    int *res = crea_somme(a, n);

    for(int i = 0; i < n; i++){
        printf("%d\n", res[i]);
    }

    free(a);
    free(res);
    return 0 ;

}