#define _GNU_SOURCE // avverte che usiamo le estensioni GNU
#include <assert.h> // permette di usare la funzione assert
#include <errno.h>
#include <stdbool.h> // gestisce tipo bool (variabili booleane)
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa/numero exit() etc ...
#include <string.h>  // confronto/copia/etc di stringhe

typedef struct intero
{
    long valore;
    struct intero *next;
} intero;

// prototipi
intero *fibonacci(int n);
intero *reverse(intero *lis);
void termina(const char *messaggio);

// stampa un messaggio d'errore e termina il programma
void termina(const char *messaggio)
{
    if (errno != 0)
        perror(messaggio);
    else
        fprintf(stderr, "%s\n", messaggio);
    exit(1);
}

// solite funzioni per creazione, distruzione, stampa della lista
intero *crea_int(int n)
{
    intero *num = malloc(sizeof(*num));
    num->valore = n;
    num->next = NULL;
    return num;
}

void distruggi_int(intero *a) { free(a); }

void lista_stampa(intero *a, FILE *f) { fprintf(f, "%ld ", a->valore); }

void distruggi_int_list(intero *lis)
{
    while (lis != NULL)
    {
        intero *next = lis->next;
        distruggi_int(lis);
        lis = next;
    }
}

intero *fibonacci(int n)
{ // n > 1 alla prima chiamata

    // ogni numero è la somma dei due precedenti
    int LastNum1 = 0;
    int LastNum2 = 0;

    intero *lisRest = crea_int(1); // coda
    intero *CurrentNum = crea_int(1);

    for (int i = 1; i < n; i++)
    {
        if (i == 1)
        {
            CurrentNum = crea_int(1);
            CurrentNum->next = lisRest;
            LastNum1 = i;
            LastNum2 = i;
        }
        else
        { // da 2 in poi
            lisRest = CurrentNum;
            CurrentNum = crea_int(LastNum1 + LastNum2);
            CurrentNum->next = lisRest;
            LastNum2 = LastNum1;
            LastNum1 = CurrentNum->valore;
        }
    }
    return CurrentNum;
}

intero *reverse(intero *lis)
{
    intero *lisReverse = NULL;
    while (lis != NULL)
    {
        intero *tmp = lis->next;
        lis->next = lisReverse;
        lisReverse = lis;
        lis = tmp;
    }

    return lisReverse;
}

int main(int argc, char *argv[])
{

    if (argc != 2)
        termina("Uso: main <intero maggiore di 1>");
    int n = atoi(argv[1]);
    assert(n > 1);
    intero *lis = fibonacci(n);
    assert(lis != NULL);
    lis = reverse(lis);
    assert(lis != NULL);

    intero *p = lis;
    while (p != NULL)
    {
        printf("%ld ", p->valore); // %ld indica che si vuole stampare un long
        p = p->next;
    }
    puts(""); // serve per andare a capo

    distruggi_int_list(lis);

    return 0;
}
