#define _GNU_SOURCE  // avverte che usiamo le estensioni GNU
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa/numero rand() abs() exit()
#include <stdbool.h> // gestisce tipo bool (per variabili booleane)
#include <assert.h>  // permette di usare la funzione assert
#include <string.h>  // prototipi delle funzioni per stringhe
#include <errno.h>

#include "calcolatore.h"

//crea una base ammissibile 


//controlla che una base sia ammissibile 
int controllaSottomatrice(double **matrice, int righe, int colonne, int *indici_righe) {
    int dimensione = righe;
    double **sottomatrice = malloc(dimensione * sizeof(double *));

    for (int i = 0; i < dimensione; i++) {
        sottomatrice[i] = malloc(colonne * sizeof(double));
        for (int j = 0; j < colonne; j++) {
            sottomatrice[i][j] = matrice[indici_righe[i]][j];
        }
    }

    // Calcola il determinante della sottomatrice
    double det = determinanteMatrice(sottomatrice, dimensione);

    // Libera la memoria allocata per la sottomatrice
    for (int i = 0; i < dimensione; i++) {
        free(sottomatrice[i]);
    }
    free(sottomatrice);

    // Controlla se il determinante è diverso da 0
    if (fabs(det) > 1e-10) {
        printf("Il determinante della sottomatrice è diverso da 0: %lf\n", det);
        return 1;  // Successo
    } else {
        printf("Il determinante della sottomatrice è 0.\n");
        return 0;  // Fallimento
    }
}

//controlla che una base sia degenere 