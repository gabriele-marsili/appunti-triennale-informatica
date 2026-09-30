/*pseudo codice simplesso primale :

procedure Simplesso_Primale(A,b,c,B,x,y,stato){
    for(stato = "" ; ; ){ // invariante B primale ammissibile
        x = AB^(-1)bB;
        y = [yB, yN] = [cAb^(-1),0];

        if(yB >= 0){
            stato = "ottimo";
            break;
        }

        h = min { i in B : yi < 0};
        ξ = -Ab^(-1)*uB(h);

        if( AN*ξ<=0 ){
            stato = "Primale illimitato, duale vuoto";
            break;
        }

        λ = min {λi = (bi - Aix / Aiξ) : Ai*ξ > 0, i in N};
        k = min {i in N : λi = λ};
        B = B U {k} \ {h};

    }
}

*/
#define _GNU_SOURCE  // avverte che usiamo le estensioni GNU
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa/numero rand() abs() exit()
#include <stdbool.h> // gestisce tipo bool (per variabili booleane)
#include <assert.h>  // permette di usare la funzione assert
#include <string.h>  // prototipi delle funzioni per stringhe
#include <errno.h>

#include "calcolatore.h"
#include "operazioni_con_base.h"

// stampa un messaggio d'errore e termina il programma
void termina(char *messaggio)
{
    if (errno != 0)
        perror(messaggio);
    else
        fprintf(stderr, "%s\n", messaggio);
    exit(1);
}

int main(int argc, char argv[]) // sfrutta problema.txt
{
    int num_variabili, num_vincoli; // colonne - righe matrice A
    bool key_crea_base_ammissibile = false;
    char nameFile = "problema.txt";

    printf("uso problema txt\n\n");

    FILE *f = fopen("problema.txt", "r");
    assert(f != NULL); // controllo file
    if (f == NULL)
        termina("Errore apertura file");

    // Leggi i dati dal file
    fscanf(f, "Numero variabili (colonne) : %d", &num_variabili);
    fscanf(f, "Numero vincoli (righe) : %d", &num_vincoli);

    // Allocazione dinamica della matrice A
    double **matrice_A = malloc(num_vincoli * sizeof(double *));
    for (int i = 0; i < num_vincoli; i++) {
        matrice_A[i] = malloc(num_variabili * sizeof(double));
    }

    // Leggi i coefficienti della matrice A
    for (int i = 0; i < num_vincoli; i++) {
        for (int j = 0; j < num_variabili; j++) {
            fscanf(f, "%lf", &matrice_A[i][j]);
        }
    }

    // Allocazione dinamica del vettore b
    double *vettore_b = malloc(num_vincoli * sizeof(double));

    // Leggi i coefficienti del vettore b
    for (int i = 0; i < num_vincoli; i++) {
        fscanf(f, "%lf", &vettore_b[i]);
    }

    // Allocazione dinamica del vettore c
    double *vettore_c = malloc(num_variabili * sizeof(double));

    // Leggi i coefficienti del vettore c
    for (int i = 0; i < num_variabili; i++) {
        fscanf(f, "%lf", &vettore_c[i]);
    }

    // Alloca memoria per gli indici dei vincoli in base (facoltativi)
    int *indici_base = malloc(num_vincoli * sizeof(int));

    // Leggi gli indici dei vincoli in base
    //printf("indici dei vincoli in base (facoltativi, se -1 viene creata una base ammissibile di partenza):\n");
    for (int i = 0; i < num_vincoli; i++) {
        fscanf(f, "%d", &indici_base[i]);
        //printf("%d ", indici_base[i]);
        if(indici_base[i]< 0){
            printf("\nIndice negativo -> verrà creata una base ammissibile");
            key_crea_base_ammissibile = true;
            break;
        }
    }

    // Chiusura del file
    fclose(f);

    
    if(key_crea_base_ammissibile || !(controllo_base_ammissibile(matrice_A, indici_base)) ){
        indici_base = crea_base_ammissibile(matrice_A, num_variabili);
    }
    


    
    
    // Deallocazione della memoria
    for (int i = 0; i < num_vincoli; i++) {
        free(matrice_A[i]);
    }
    free(matrice_A);
    free(vettore_b);
    free(vettore_c);
    free(indici_base);


    return 0;
}
