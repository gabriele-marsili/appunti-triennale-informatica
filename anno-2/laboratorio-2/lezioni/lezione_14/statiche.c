//lezione 14 - 3/11/2023

/* *********************************************************
 * Esempio uso varabili statiche
 * ********************************************************* */
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa/numero rand() abs() exit() etc ...
#include <stdbool.h> // gestisce tipo bool (per variabili booleane)
#include <assert.h>  // permette di usare la funzione assert
#include <string.h>  // prototipi delle funzioni per la manipolazione delle stringhe

// esempio di funzione con variabile statica
int funz(int x)
{
    static int y = 3; // questa inizializzazione avviene solo alla prima esecuzione
    /*il valore in y viene salvato con il programma
    y non viene messa sullo stack, ma esiste sempre
    y ha valore = 3 solo alla prima chiamata, in ogni chiamata successiva y avrà valore dato dall'ultima chiamata fatta*/
    int z = x + y;
    y += 1; // il valore di y viene incrementato di uno ad ogni esecuzione della funzione
    return z;
}

int counter(){
    static int c = 0;
    return c;
}

// invoca funz() per ogni intero passato sulla linea di comando
int main(int argc, char *argv[])
{
    for (int i = 1; i < argc; i++)
    {
        int x = atoi(argv[i]);
        printf("%d\n", funz(x));
    }
    return 0;
}
