/*lettura dei numeri primi da un file di testo
il processo padre scrive i numeri su una pipe
i figli leggono e contano
su una nuova pipe i figli poi comunicano al padre i primi contati*/

#include "xerrori.h"

// restituisce true/false a seconda che n sia primo o composto
bool primo(int n)
{
    if (n < 2)
        return false;
    if (n % 2 == 0)
    {
        if (n == 2)
            return true;
        else
            return false;
    }
    for (int i = 3; i * i <= n; i += 2)
        if (n % i == 0)
            return false;
    return true;
}

// conta i primi in [a,b)
int contap(int a, int b)
{
    int tot = 0;
    for (int i = a; i < b; i++)
        if (primo(i))
            tot++;
    return tot;
}

// conta quanti sono i primi tra argv[1] (compreso) e argv[2] (escluso)
int main(int argc, char *argv[])
{
    if (argc != 3)
    {
        printf("Uso:\n\t%s nomefile p%d\n", argv[1], argv[2]);
        exit(1);
    }
    FILE *f = fopen(argv[1], "r");
    if (f == NULL)
    {
        termina('Error opening file in r');
    }

    int p = atoi(argv[2]); // quantità di processi usati
    assert(p > 0);

    // creo una pipe di comunicazione dai figli al genitore (figli scrivono quantità di primi contati che viene poi letta dal genitore)
    int up[2];                     // la chiamo up perchè la uso da figli --> a genitore
    xpipe(up, __LINE__, __FILE__); // creazione della pipe sfruttando il file di per la gestione degli errori (a cui passo linea e file)

    int down[2];                     // seconda pipe (da genitore --> a figli )
    xpipe(down, __LINE__, __FILE__); // creazione della seconda pipe (genitore scrive i numeri che verranno letti e controllati dai figli)

    /*OSS:
    se metto prima la scrittura del padre e poi la lettura dei figli
    allora pieno la pipe e ho deadlock. (arrivo a non poter più scrivere poiché pipe è piena, ma non ho ancora avviato la lettura dei figli)
    ->Devo prima avviare la lettura dei figli e poi la scrittura del padre
    (ciò avviene perché quando la pipe è piena e voglio scriverci il processo che scrive, in questo caso il padre, attende che venga letta/svuotata la pipe)
    */

    // generazione dei p processi figli su cui leggo i numeri scritti dal padre
    for (int i = 0; i < p; i++)
    {
        pid_t pid = xfork(__LINE__, __FILE__); // fork del processo padre sfruttando file x gestione errori

        if (pid == 0)
        {                                        // figlio
            xclose(down[1], __LINE__, __FILE__); // chiudo subito il canale di scrittura sulla pipe down del figlio (che non uso)
            xclose(up[0], __LINE__, __FILE__);   // chiudo subito il canale di lettura sulla pipe up del figlio (che non uso)

            int tot = 0; //counter per primi letti dal figlio i
            while (true)
            {
                int n;
                int e = read(down[0], &n, sizeof(int)); // read dalla pipe down
                if (e == 0) // controllo su read conclusa (se e == 0 la read è conclusa, ovvero non ho alcun processo che ha la pipe down aperta in lettura)
                    break;

                if (e != sizeof(int))
                    termina('error reading on down pipe');

                if (primo(n))
                    tot += n;
            }
            puts('Figlio ha finito di leggere da down');

            ssize_t e = write(up[1], &tot, sizeof(int));
            // scrittura della pipe -> sfrutto la system call write, gli passo up[1], l'indirizzo di tot, sizeof(int) -> dimensione di quello che voglio scrivere
            
            if (e != sizeof(tot))
                termina("Errore scrittura pipe");
            
            xclose(up[1], __LINE__, __FILE__); // chiudo canale scrittura per questo figlio
            exit(0);                           // termino il processo figlio (essenziale per non avere loop infiniti d'attesa)
        }
    }

    //-> qui ho solo processo genitore 

    //chiudo pipe che non uso:    
    xclose(up[1], __LINE__, __FILE__);   // chiudo il canale di scrittura su up per il padre (non usato)
    xclose(down[0], __LINE__, __FILE__); // chiudo il canale di lettura su down per il padre (non usato)
    // viene fatto poiché alrimenti ho deadlock : il padre attende la scrittura del padre che non scrive mai.

    while (true) // scrittura del padre
    {
        int x;
        int e = fscanf(f, "%d", &x); // leggo da file f e lo metto in x
        if (e != 1)
            break;                           // -> lettura finita
        e = write(down[1], &x, sizeof(int)); // scrivo nella pipe down il numero letto dal file f
        if (e != sizeof(int))
            termina('error in writing on down pipe');
    }
    fclose(f); // chiudo file di txt da cui leggevo
    xclose(down[1], __LINE__, __FILE__); // chiudo il canale di scrittura su down per il padre (non lo uso più)
    puts('Genitore ha finito di scrivere su down');
    
    int totale = 0; //counter dei primi trovati dai figli 

    while (true)
    { // lettura del padre:
        int x;
        ssize_t e = read(up[0], &x, sizeof(int));
        // leggo dalla pipe sfruttando la system call read a cui passo up[0], indirizzo di x su cui verrà salvato il ris di ciò che viene letto, sizeof(int) -> dimensione di quello che voglio leggere
        if (e == 0)
            break; // -> read conclusa (OSS : il controllo viene fatto su var e)

        totale += x;
    }
    xclose(up[0], __LINE__, __FILE__); // chiudo il canale di lettura del padre
    printf("Numero primi nel file %s : %d\n", argv[1], totale);
    return 0;
}
