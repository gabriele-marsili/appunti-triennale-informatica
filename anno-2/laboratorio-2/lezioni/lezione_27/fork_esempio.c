#define _GNU_SOURCE  // avverte che usiamo le estensioni GNU
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa exit() etc ...
#include <stdbool.h> // gestisce tipo bool
#include <assert.h>  // permette di usare la funzione ass
#include <string.h>  // funzioni per stringhe
#include <errno.h>   // richiesto per usare errno
#include <sys/types.h>
#include <unistd.h>
#include <sys/stat.h>
#include <fcntl.h>

// primo esempio di generazione di un processo figlio mediante fork
//creazione di due processi (padre-figlio)
//p figlio scrive elementi nel file : 'file_figlio.txt' (con fopen e fwrite) e ritorna num elementi scritti
//p padre scrive elementi nel file : 'file_padre.txt' (con system call open e write + permessi) e ritorna num byte scritti


// mostra anche la differenza di prestazioni fra fwrite e write
// quando vengono effettuate numerose operazioni di scrittura
// di piccole quantità di byte (nel nostro esempio n interi vengono
// scritti uno alla volta)

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Uso: %s intero_positivo\n", argv[0]);
        exit(1);
    }
    int n = atoi(argv[1]);
    // fork crea un nuovo processo (è una system call)
    pid_t p = fork(); // sdoppia il processo corrente in un p padre ed un p figlio
    //i processi creati vanno in parallello (se multicore lo permette, altrimenti sono concorrenti)
    if (p == 0) // => figlio 
    {
        // codice eseguito dal processo figlio
        printf("Io sono %d figlio di %d\n", getpid(), getppid());
        FILE *f = fopen("file_figlio.txt", "w");
        // f open restituisce un puntatore.
        for (int i = 1; i < n; i++)
            fwrite(&i, sizeof(int), 1, f); // identifica il file tramite puntatore
        // per dire quanti byte devo scrivere : terzo arg = numero di elementi da scrivere, secondo arg = dimensione singolo elemento
        // mi ritorna il numero di elementi scritti
        fclose(f);
    }
    else if (p > 0) // => padre
    {
        // codice del processo padre
        printf("Io sono %d genitore di %d\n", getpid(), p);
        int fd = open("file_padre.txt", O_WRONLY | O_CREAT | O_TRUNC, 0666);
        // permessi scritti in maniera ottale -> 0666 (0 = ottale, 6 = scrittura e lettura sia per utente che gruppo che altri)
        // i permessi finali sono una combinazione (and) tra quelli dati da 0666 e la umask dell'utente
        // la umask racchiude i permessi dell'utente (gruppo e altri)
        // open restituisce un intero relativo al file descritor
        for (int i = 1; i < n; i++)
            // la scrittura con write non usa buffer
            // quindi per piccole scritture è più lenta
            write(fd, &i, sizeof(int)); // identifica il file con il file descrictor (int)
                                        // secondo arg = zona di memoria
        // per dire quanti byte scrivere basta dimensione singolo elemento
        //  mi ritorna il numero di byte scritti
        close(fd);
    }
    else
    {
        // codice eseguito dal processo padre in caso di errore
        printf("Errore nella fork\n");
        exit(1);
    }
    printf("Sono %d e termino\n", getpid());
    return 0;
}
