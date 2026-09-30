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

int **allocaMatrice(int r, int c) { 
    int **risultato;
    risultato = (int **) malloc((r) * sizeof(int *));
    if (risultato == NULL) {
        printf("Memoria esaurita\n");
        exit(1); 
    }
    for (int i = 0; i < r; i++) {
        risultato[i] = (int *) malloc(c * sizeof(int));
        if (risultato[i] == NULL) {
            printf("Memoria esaurita\n");
            exit(1); 
        }
    }
    return risultato; 
}


int **leggiMatriceDyn(int *r, int *c) { 
    int **risultato;
    *r = readInt(); 
    *c = readInt();
    risultato = allocaMatrice(*r, *c);
    for (int i = 0; i < *r; i++)
        for (int j = 0; j < *c; j++)
            risultato[i][j] = readInt(); 
            
    return risultato;
}

int **invertiColonne(int r, int c, int **m) {
    int **res = allocaMatrice(r, c);
    for (int i = 0; i < r; i++) { 
        res[i][0] = m[i][c - 1];
        res[i][c - 1] = m[i][0];
        for (int j = 1; j < c - 1; j++) {
            res[i][j] = m[i][j]; 
        }
    }
    return res; 
}

void printMatrixDyn(int r, int c, int **m) { int i, j;
    for (i = 0; i < r; i++) { for (j = 0; j < c; j++)
        printf("%d ", m[i][j]); printf("\n");
    }
}

void freeMatrix(int **m, int r){
    for (int i = 0; i<r; i++) {
        free(m[i]);
    }
    free(m);

}

int main(){
    int r, c ;
    int **m = leggiMatriceDyn(&r,&c);
    int **res = invertiColonne(r,c, m);
    printMatrixDyn(r,c,res);
    freeMatrix(m,r);
    freeMatrix(res,r);
    return 0 ;
}
