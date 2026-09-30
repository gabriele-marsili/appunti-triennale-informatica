#define _GNU_SOURCE  // avverte che usiamo le estensioni GNU
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa exit() etc ...
#include <stdbool.h> // gestisce tipo bool
#include <assert.h>  // permette di usare la funzione ass
#include <string.h>  // funzioni per stringhe
#include <errno.h>   // richiesto per usare errno

void termina(const char *messaggio);

#include "esInventato.h"

// "elimina" gli spazi in testa a una stringa
// restituisce un puntatore alla prima posizione
// che non è uno spazio
char *elimina_spazi_testa(char s[])
{
    int i = 0;
    while (s[i] == ' ')
        i++;
    assert(s[i] != ' ');
    return &s[i];
}

// main che legge le linee e le spezza al ;
// poi inserisce le stringhe in una lista ordinata
int main(int argc, char *argv[])
{

    if (argc != 3)
    {
        printf("Uso: %s nomefile\n", argv[0]);
        exit(1);
    }
    //char *filenameScrittura = argv[2]; //salvo nome file scrittura 
    FILE *f = fopen(argv[1], "rb"); // apro file binario in lettura
    if (f == NULL)
        termina("Errore apertura file");

    int e = fseek(f, 0, SEEK_END); // mette il puntatore di lettura alla fine del file
    if (e != 0)
        termina("Errore fseek"); // check su operazione avvenuta con successo
    long lungfile = ftell(f);    // ftell ritorna la posizione corrente del file in byte
    if (lungfile < 0)
        termina("Errore ftell"); // check operazione
    if (lungfile % 4 != 0)
        termina("Il file non contiene int32"); // la lunghezza del file deve essere un multiplo di 4 se contiene int a 32 bit (altrimenti ritorno err con termina)

    int n = lungfile / 4; // ogni intero = 4 byte (num interi = num tot byte / 4)
    if (n == 0)
        termina("file vuoto");

    // alloca array dove mettere gli interi
    int *a = malloc(n * sizeof(*a)); // dim = n * sizeof(*a)
    if (a == NULL)
        termina("errore malloc");
    rewind(f); // "riavvolgo" il file pointer ad inizio file per poter leggere il file

    size_t m = fread(a, sizeof(int), n, f); // leggo dal file f n oggetti dalla che metto in a
                                            // => m = dimensione di a  ( = ad n )
    if (n != m)
        termina("errore fread");

    // costruzione lista stringhe leggendo dal file
    // ogni linea del file puo' contenere piu' stringhe
    // le stringhe posso contentenere degli spazi
    coppiaBinList *lista = NULL; // lista vuota
    // ciclo di lettura dal file f
    char *buffer = NULL; // usate da getline()
    size_t dim = 0;
    int index = 0;
    while (true)
    {
        // leggi linea dal file
        ssize_t e = getline(&buffer, &dim, f);
        if (e < 0)
        {                 // assumiamo sia finito il file
            free(buffer); // dealloco il buffer usate per contenere le linee
            break;
        }
        // fprintf(stderr,"n=%zd, buffer=%s",n,buffer);
        // esegue il parsing di buffer
        char *s = strtok(buffer, ";\n");
        while (s != NULL)
        {
            s = elimina_spazi_testa(s);
            if (s[0] != '\0')
            {
                int num = a[index]; // ripreno il binario convertito in numero dall'array a precedentemente creato 
                coppiaBinList *c = coppiaBinList_crea(s, num);
                // aggiungo l'elemento alla lista mantenendo ordine
                lista = lista_coppiaBinList_inserisci_ordinato_ricorsivo(lista, c);
            }
            s = strtok(NULL, ";\n");
        }
        // ho messo tutte le stringhe date da strtok
    } // end while del getline
    
    
    fclose(f); // chiudo file di lettura

    lista_coppiaBinList_stampa(lista, stdout);
    lista_coppiaBinList_distruggi(lista);
    
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