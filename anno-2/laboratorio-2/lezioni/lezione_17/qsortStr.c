/* *********************************************************
 * Esempio di uso di qsort per ordinare stringhe prese da lista di comando
 * ********************************************************* */
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa/numero rand() abs() exit() etc ...
#include <stdbool.h> // gestisce tipo bool (per variabili booleane)
#include <assert.h>  // permette di usare la funzione assert
#include <errno.h>   // richiesto per usare errno
#include <string.h> 

// stampa un messaggio di errore e termina
void termina(const char *messaggio);



int confrontaSTR(char **str1, char **str2) // str sono puntatori a puntatori a stringhe 
{   
    strcmp(*str1, *str2); // => passo i puntatori a stringhe prendendoli da str1 e str2 
}

int main(int argc, char *argv[])
{
    if (argc <= 2)
    { // input sulla linea di comando non corretto
        printf("Uso: %s str1 str2 str3 ... strk \n", argv[0]);
        return 1;
    }

    // ho già arr di stringhe : da argv[1] ad argv[length argv - 1]
    char **a = &argv[1]; // a = array a puntatore della stringa che è in argv[1]
                         // la lunghezza di a è ovviamente argc -1
    int n = argc - 1;    // Numero argomenti linea di comando

    // stampo array
    for (int i = 0; i < n; i++)
        printf("%s ", a[i]);
    puts(""); // a capo

    // eseguo il sorting degli interi con qsort()
    // come spiegato a lezione per l'ultimo argomento ci vuole il casting
    // qsort(a,n,sizeof(int), (__compar_fn_t) &confrontapd);
    //qsort(a, n, sizeof(char *), (__compar_fn_t) &strcmp); // -> così NON va bene: 
    qsort(a, n, sizeof(char *), &confrontaSTR); //

    // stampo array
    puts("--- qsort eseguito ---");
    for (int i = 0; i < n; i++)
        printf("%s ", a[i]);
    puts(""); // a capo

    
    // a questo punto sarebbe un errore scrivere a[0]
    return 0;
}

// stampa su stderr il  messaggio che gli passo
// se errno!=0 stampa anche il messaggio d'errore associato
// a errno. dopo queste stampe termina il programma
void termina(const char *messaggio)
{
    if (errno == 0)
        fprintf(stderr, "%s\n", messaggio);
    else
        perror(messaggio);
    exit(1);
}