/*
File con valori binari, (letto in leggiBin)
creazione di struct con valori numerici e binari
Lista di struct coppie ordinata in modo :
prima tutti i pari in modo crescente,
poi dispari in modo decrescente.
Scrittura di matrici ordinate in base alle liste
*/

#define _GNU_SOURCE  // avverte che usiamo le estensioni GNU
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa exit() etc ...
#include <stdbool.h> // gestisce tipo bool
#include <assert.h>  // permette di usare la funzione ass
#include <string.h>  // funzioni per stringhe
#include <errno.h>   // richiesto per usare errno

#include "esInventato.h"

coppiaBinList *coppiaBinList_crea(char *bin, int num)
{
    coppiaBinList *binList = malloc(sizeof(*binList));
    binList->binary = strdup(bin);
    binList->next = NULL;
    return binList;
}

void coppiaBinList_distruggi(coppiaBinList *a)
{
    free(a->binary);
    free(a);
}

void coppiaBinList_stampa(coppiaBinList *a, FILE *f)
{
    fprintf(f, "%d %-20s\n", a->number, a->binary);
}

void lista_coppiaBinList_stampa(coppiaBinList *lis, FILE *f)
{
    while (lis != NULL)
    {
        coppiaBinList_stampa(lis, f);
        lis = lis->next;
    }
}

void lista_coppiaBinList_distruggi(coppiaBinList *lis)
{
    if (lis != NULL)
    {
        lista_coppiaBinList_distruggi(lis->next);
        coppiaBinList_distruggi(lis);
    }
}

// inserimento di elemento coppiaBinList mantenendo ordine :
coppiaBinList *lista_coppiaBinList_inserisci_ordinato_ricorsivo(coppiaBinList *testa, coppiaBinList *c)
{
    assert(c != NULL); //=>  coppia da inserire != NULL
    if (testa == NULL)
    {                   // se la lista è vuota (ovvero la testa è null)
        c->next = NULL; // allora il next del primo elemento non esiste, ovvero è null
        return c;       // ritorno la lista, ovvero c (unico elemento)
    }

    //divido casi pari / dispari  : 
    int num = c->number; // prendo numero dell'elemento che sto inserendo
    if(num % 2 == 0){ // caso pari -> inserisco con ordine crescente prima del primo dispari
        if(c->number < testa->number){ // inserisco prima della testa 
            c->next = testa; // -> c diviene il primo elemento e il suo succesivo diviene la precedente testa
            return c; // ritorno c (la nuova testa)
        }else{ // => c->number >= testa.number
            coppiaBinList *currentNext = testa->next;
            if(currentNext->number % 2 == 0){ // controllo di non oltrepassare i numeri dispari 
                testa->next = lista_coppiaBinList_inserisci_ordinato_ricorsivo(testa->next, c);
                return testa;
            }else{ // il prossimo è dispari, quindi devo inserire c corrente dopo la testa corrente (in modo che sia l'ultimo dei pari)
                c->next = currentNext; // collego ultimo pari (ovvero c) a primo dei dispari 
                testa->next = c; // collego c a quello che prima era l'ultimo dei pari 
                return testa;
            }   
            
        }
    }else{// caso dispari -> inserisco con ordine decrescente dopo l'ultimo pari
        while(testa->number % 2 == 0){ // scorro fino ad avere come testa il primo dei dispari 
            testa = testa->next;
        }
        //inserisco con ordine decrescente 
        if(c->number > testa->number){
            c->next = testa;
            return c;
        }else{ // => c->number <= testa->number
            testa->next = lista_coppiaBinList_inserisci_ordinato_ricorsivo(testa->next, c);
            return testa;
        }
    }

}