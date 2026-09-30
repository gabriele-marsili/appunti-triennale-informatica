//funzioni ausiliarie per i calcoli 
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// Funzione per calcolare il determinante di una matrice 2x2
double determinanteMatrice2x2(double a, double b, double c, double d) {
    return a * d - b * c;
}

// Funzione per calcolare il determinante di una matrice 3x3
double determinanteMatrice3x3(double a, double b, double c, double d, double e, double f, double g, double h, double i) {
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}

// Funzione per calcolare il determinante di una matrice di dimensione generica
double determinanteMatrice(double **matrice, int dimensione) {
    if (dimensione == 2) {
        return determinanteMatrice2x2(matrice[0][0], matrice[0][1], matrice[1][0], matrice[1][1]);
    } else if (dimensione == 3) {
        return determinanteMatrice3x3(matrice[0][0], matrice[0][1], matrice[0][2],
                                      matrice[1][0], matrice[1][1], matrice[1][2],
                                      matrice[2][0], matrice[2][1], matrice[2][2]);
    } else {
        // Puoi implementare qui il calcolo del determinante per matrici di dimensione superiore a 3
        // Ad esempio, utilizzando la decomposizione di Gauss
        // Ma per scopi dimostrativi, mi limito a implementare il caso 2x2 e 3x3
        fprintf(stderr, "Calcolo del determinante per matrici di dimensione superiore a 3 non implementato.\n");
        exit(EXIT_FAILURE);
    }
}
