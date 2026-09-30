#include "xerrori.h"

/*info sulle pipe :
=>pipe da terminale :
•usabili per files diversi
•sono file, rimangono attivi finché non vengono chiusi
•ha diritti di lettura, scrittura (definiti per utente, gruppo)
•mkfifo nomePipe per creare la pipe da terminale.
•man mkfifo per manuale (pag 7)

=> NAMED pipe in c:
•int mkfifo(const char *)
-> restituito 0 se ok, -1 se problema (info in errno)
•una volta creata la pipe con nome essa va aperta in lettura / scrittura
-> apertura tramite la chiamata di sistema open

Differenza d'uso rispetto alle pipe senza nome:
quando creo la pipe senza nome vengono create automaticamente le estremità di scrittura e lettura
per le pipe con il nome le estrermità di scittura e lettura non vengoo aperte contemporaneamente
    ->quando un processo apre una pipe con il nome tale processo viene bloccato finché un altro processo
    non apre la stessa pipe nella modalità inversa (scrittura-lettura e viceversa)
        =>evita che venga scritto se nessuno legge e viceversa


pagine man :
man mkfifo (shell)
man 3 mkfifo
man 7 fifo
man 7 pipe

*/

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Uso:\n\t%s nome_pipe\n", argv[0]);
        exit(1);
    }

    // crea la named pipe da usare per le comunicazioni
    int e = mkfifo(argv[1], 0666); // 0666 permessi read & write

    if (e == 0)
        puts("Named pipe creata");
    else if (errno == EEXIST) // caso in cui esista già la pipe con quell'errore
        // in questo caso errno divene EEXIST
        // utile per controllo se la pipe con il nome esiste già.
        puts("La named pipe esiste già; procedo...");
    else
        xtermina("Errore creazione named pipe", __LINE__, __FILE__);

    // faccio partire il lettore
    /*da un programma in c ne faccio partire un altro:
    1) devo fare fork con cui genero processo figlio
    2) sfrutto unicamente il processo figlio (-> if(xfork(__LINE__,__FILE__)==0) )
    3) uso execl (funzione di sistema) (prende num arbitrario di args, come ultimo arg devo passare NULL)
      -> man execl per manuale
      -> primo arg = nome programma da eseguire
      -> secondo arg = argv[0] nel programma eseguito

    ->il processo figlio si mette ad eseguire il file passato con execl
    */

    if (xfork(__LINE__, __FILE__) == 0)
    {   // -> processo figlio che chiama execl per avviare file lettore.out
        if (execl("lettore.out", "lettore.out", argv[1], (char *)NULL) == -1)//chiamata ad execl + controllo
            xtermina("execl fallita", __LINE__, __FILE__);
    }

    /*execl con lettore.py
    if (xfork(__LINE__, __FILE__) == 0)
    {
        if (execl("lettore.py", "lettore.py", argv[1], (char *)NULL) == -1)
            xtermina("execl fallita", __LINE__, __FILE__);
    }*/

    // -> ho solo processo genitore (processo figlio ha eseguito execl / ha avuto errore su execl ed è terminato)
    
    puts("Crea 2 processi scrittori ausiliari");
    int n = 2;
    for (int i = 0; i < n; i++)
    {
        pid_t p = xfork(__LINE__, __FILE__); // creazione dei processi ausiliari tramite fork

        if (p == 0)
        { // figlio
            // apre file descriptor associato alla named pipe (nome in argv[1])
            int fd = open(argv[1], O_WRONLY);
            //-> i figli aprono la named pipe in scrittura,
            // ma si bloccano finché non viene aperta la named pipe in lettura.

            if (fd < 0) // se il file non esiste termina con errore
                xtermina("Errore apertura named pipe", __LINE__, __FILE__);

            printf("Io figlio %d inizio a scrivere\n", getpid());
            // scrive interi sulla pipe per sempre (ciclo for infinito)
            for (int j = 0;; j++)
            {
                // il figlio-esimo scrive interi =i mod n
                int val = j * n + i;
                ssize_t e = write(fd, &val, sizeof(val)); // scrive nella named pipe sfruttando system call write.
                if (e != sizeof(val)) // la write ritorna la dim del valore scritto (sizeof(val))
                    xtermina("Errore scrittura pipe", __LINE__, __FILE__);
                if (j % 10000 == 0)
                    printf("%d (figlio di %d): scritti %d interi\n", getpid(), getppid(), j);
            }
            printf("Io figlio %d ho finito.\n", getpid());
            exit(0);
        }
    }
    // padre
    printf("Io %d ho finito.\n", getpid());
    return 0;
}
