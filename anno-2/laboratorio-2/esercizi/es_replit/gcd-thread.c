/*Testo esecizio : 
sercizio sul calcolo di gcd mediante tecnica produttori/consumatori
Scrivere un programma gcdT che invocato dalla linea di comando scrivendo

    gcdT infile numt

calcola il massimo comun divisore delle coppie di valori in infile utilizzando numt thread ausiliari secondo il seguente procedimento.

I thread ausiliari svolgono il ruolo di produttori e devono leggere coppie di interi dal file di testo infile assicurandosi che ogni coppia di infile venga letta da un unico thread.

I thread ausiliari devono passare le coppie al thread principale utilizzando il meccanismo produttore/consumatore mediante un buffer la cui dimensione deve essere una costante definita con #define. Il thread principale svolge il ruolo di unico consumatore; legge le coppie dal buffer e per ogni coppia calcola il massimo comun divisore con la funzione gcd che trovate nel sorgente C.

Il thread principale deve salvare i valori dei massimo comun divisore in un array di int e quando tutti i produttori hanno terminato deve ordinare questo array (con qsort) e stampare su stdout i valori ordinati (uno per riga). Ogni altro messaggio del programma deve essere inviato su stderr.

Si noti che non si sa in anticipo quanti gcd saranno calcolati quindi l'array dei gcd deve essere gestito in maniera dinamica (cioè usando realloc che spero non abbiate dimenticato).

Esperimenti
Il programma richiede come input un file di coppie. Salvate l'output in un file utilizzando la ridirezione. Per fare test significativi (almeno 100 coppie) potete usare il programma coppie.py che genera un file con un numero assegnato di coppie e produce anche un file con estensione .gcd contenente quello che dovrebbe essere l'output finale del programma (i gcd ordinati in maniera crescente). I file 100coppie e 100coppie.gcd sono un esempio di file di input e corrispondente output.

Suggerimenti
fa parte dell'esercizio scrivere il makefile che ottiene l'eseguibile compilando separatamente xerrori.c e gcdtT.c

Utilizzare un mutex per assicurarsi che i produttori leggano dal file in maniera esclusiva

Ogni dato passato da produttori a consumatore consiste di due interi che devono essere processati insieme. Se il buffer consiste in un array di interi è necessaria un modifica allo schema che abbiamo sempre usato, altrimenti come buffer potete usare un array di struct, dove ogni signola struct contiene la coppia di interi

Anche in questo caso abbiamo il problema della terminazione: i produttori prima di terminare devono in qualche modo segnalare al consumatore che non ci sono altri dati.

L'esercizio ha solo scopo didattico: non è da considerare una soluzione sensata per il problema.

*/

/*Osservazioni : 
la soluzione sfrutta fgets per scrorrere un file linea per linea,
permettendo così di contare il numero di linee (corrispondente al numero di coppie).
Ciò permetterebbe di non usare la realloc, creando direttamente resArray di dimensione coupleQuantity,
tuttavia il numero di coppie (couplesQuantity) è invece unicamente sfruttato per la divisione equa delle linee
da leggere per ogni thread produttore.
Ciò per garantire che ogni produttore legga linee (coppie) diverse dagli altri 
e per far sì che ogni produttore legga la stessa quantità di linee.
Soluzioni alternative a ciò ridurrebbero le prestazioni; alcune idee : 
•quantità fissa di linee per ogni produttore => potrebbe portare a non leggere l'intero file.
•usare un counter condiviso tra i produttori per contare il numero di linee lette => peggiora le prestazioni e necessiterebbe l'implemento di un ulteriore controllo sulla fine del file con relativa comunicazione a tutti i produttori (che dovrebbero terminare...un modo sarebbe tramite una variabile booleana condivisa).
*/
#include "xerrori.h"
#define Nome "free_slots"
#define Nome2 "data_items"

// macro per indicare la posizione corrente
#define QUI __LINE__, __FILE__

// dimensione buffer produttori-consumatori
#define Buf_size 20

typedef struct
{
    int primo;
    int secondo;
} CoppiaNumeri;

// struct contenente i parametri  di ogni thread
typedef struct
{
    int start;
    int end;
    char *nome_file;
    CoppiaNumeri *buffer;    // puntatore al buffer
    int *pcindex;            // puntatore all'indice per scrittura buffer (condiviso tra tutti i produttori)
    sem_t *sem_free_slots;   // puntatore al semaforo free_slots
    sem_t *sem_data_items;   // puntatore al semaforo data_items
    pthread_mutex_t *pmutex; // puntatore al mutex condiviso per accesso al buffer
} dati;

// calcola gcd di due interi >= 0 non entrambi nulli
int gcd(int a, int b)
{
    assert(a >= 0 && b >= 0);
    assert(a != 0 || b != 0);
    if (b == 0)
        return a;
    return gcd(b, a % b);
}

// body threads ausiliari (produttori)
void *tbody(void *arg)
{

    dati *a = (dati *)arg; // riprendo i dati e li metto in a
    int start = a->start;
    int end = a->end;
    CoppiaNumeri *buffer = a->buffer;
    pthread_mutex_t *m = a->pmutex;
    CoppiaNumeri coppia;
    CoppiaNumeri terminate_condition;
    terminate_condition.primo = -1;
    terminate_condition.secondo = -1;

    FILE *f = fopen(a->nome_file, "rt");
    if (f == NULL)
    {
        fprintf(stderr, "Apertura file %s fallita\n", a->nome_file);
        xsem_wait(a->sem_free_slots, __LINE__, __FILE__);
        xpthread_mutex_lock(m, QUI);
        buffer[(*a->pcindex) % Buf_size] = terminate_condition; // mette terminate_condition nel buffer => notifica thread i termina
        (*a->pcindex)++;
        xpthread_mutex_unlock(m, QUI);
        xsem_post(a->sem_data_items, __LINE__, __FILE__);

        pthread_exit(NULL);
    }

    char line[100];
    int lineNumber = 0;
    while (fgets(line, sizeof(line), f))
    { // legge il file riga per riga
        lineNumber++;
        
        // Controlla se il numero di riga è compreso tra start ed end
        if (lineNumber >= start && lineNumber <= end)
        {
            int num1, num2;
            if (sscanf(line, "%d %d", &num1, &num2) != 2)
            {
                fprintf(stderr, "Errore con una coppia di numeri in infile = %d e %d", num1, num2);
            }
            coppia.primo = num1;
            coppia.secondo = num2;
       
            xsem_wait(a->sem_free_slots, __LINE__, __FILE__); // attende che valore sem_free_slots > 0 (che ci sia almeno uno slot libero nel buffer)
            xpthread_mutex_lock(m, QUI);
            buffer[(*a->pcindex) % Buf_size] = coppia; 
            (*a->pcindex)++;
            xpthread_mutex_unlock(m, QUI);
            xsem_post(a->sem_data_items, __LINE__, __FILE__); // incrementa sem_data_items  (=> consumatore può leggere)
        }

        if (lineNumber > end)
            break;
    }

    xsem_wait(a->sem_free_slots, __LINE__, __FILE__); // attende che valore sem_free_slots > 0 (che ci sia almeno uno slot libero nel buffer)
    xpthread_mutex_lock(m, QUI);
    buffer[(*a->pcindex) % Buf_size] = terminate_condition; // mette terminate_condition nel buffer => notifica thread i termina
    (*a->pcindex)++;
    xpthread_mutex_unlock(m, QUI);
    xsem_post(a->sem_data_items, __LINE__, __FILE__); // incrementa sem_data_items  (=> consumatore può leggere)

    pthread_exit(NULL);
}

//conta e restituisce le linee di un file
int contaLinee(FILE *file)
{
    int count = 0;
    char line[100];

    while (fgets(line, sizeof(line), file))
    {
        count++;
    }

    return count;
}

// per qsort
int compare(const void *a, const void *b)
{
    return (*(int *)a - *(int *)b);
}

int main(int argc, char *argv[])
{
    // controlla numero argomenti
    if (argc != 3)
    {
        printf("Uso: %s file numT\n", argv[0]);
        return 1;
    }

    int size = 10; // dimensione attuale dell'array
    int messi = 0; // numero di elementi attualmente nell'array
    int *resArray = malloc(size * sizeof(int));
    if (resArray == NULL)
        termina("Memoria insufficiente");

    int numT = atoi(argv[2]);
    assert(numT > 0);

    CoppiaNumeri buffer[Buf_size];
    int pcindex = 0; // inizializzo index relativo alla posizione del buffer (per i produttori)

    pthread_t t[numT]; // array di numT threads
    dati a[numT];      // array di dati per i numT threads

    sem_t sem_free_slots, sem_data_items;                        // semafori dei threads
    xsem_init(&sem_free_slots, 0, Buf_size, __LINE__, __FILE__); // initialize sem free slots with buf_size
    xsem_init(&sem_data_items, 0, 0, __LINE__, __FILE__);        // initialize sem data items with 0

    pthread_mutex_t mutex;
    xpthread_mutex_init(&mutex, NULL, QUI);

    // apertura file
    FILE *f = fopen(argv[1], "r");
    if (f == NULL)
    {
        termina("Errore apertura file");
        return 1;
    }

    int coupleQuantity = contaLinee(f);
    fclose(f); // chiusura file

    int n = coupleQuantity / numT;
    int cindex = 0; // index di lettura del buffer per il main thread 

    // creazione dei threads :
    for (int i = 0; i < numT; i++)
    { // scorro i threads (e li inizializzo passando i dati)

        a[i].start = n * i;
        a[i].end = (i == numT - 1) ? coupleQuantity : n * (i + 1);
        a[i].buffer = buffer;
        a[i].pcindex = &pcindex;
        a[i].sem_data_items = &sem_data_items;
        a[i].sem_free_slots = &sem_free_slots;
        a[i].nome_file = argv[1]; 
        a[i].pmutex = &mutex;
        xpthread_create(&t[i], NULL, &tbody, a + i, __LINE__, __FILE__); // creazione del thread
    }

    int thread_completati = 0; 
    while (thread_completati < numT) // lettura del main thread
    {
        xsem_wait(&sem_data_items, __LINE__, __FILE__); // attende che ci sia almeno uno slot scritto nel buffer
        xpthread_mutex_lock(&mutex, QUI); // evita di leggere dati 'corrotti' (durante lettura non può esserci un thread che scrive)
        CoppiaNumeri couple = buffer[cindex]; // riprende il numero dal buffer (prendo primo elemento)
        cindex = (cindex + 1) % Buf_size; 
        xpthread_mutex_unlock(&mutex, QUI);
        xsem_post(&sem_free_slots, __LINE__, __FILE__); // cambia il numero di slot liberi nel buffer
        int primo = couple.primo;
        int secondo = couple.secondo;

        if (primo == -1 && secondo == -1)
        { // => thread i terminato
            thread_completati += 1;
        }
        else
        { // -> main thread ha letto coppia di interi
            if (size == messi)
            {
                size = size * 2;
                resArray = realloc(resArray, size * sizeof(int));
                if (resArray == NULL)
                    termina("realloc fallita");
            }
            assert(size > messi);
            resArray[messi] = gcd(primo, secondo);
            messi += 1;
        }
    }

    //distruzione dei semafori e del mutex
    xsem_destroy(&sem_data_items, __LINE__, __FILE__);
    xsem_destroy(&sem_free_slots, __LINE__, __FILE__);
    xpthread_mutex_destroy(&mutex, __LINE__, __FILE__);

    qsort(resArray, messi, sizeof(int), compare); // ordinamento crscente di resArray
    for (int i = 0; i < messi; i++) //stampa
    {
        fprintf(stdout, "%d\n", resArray[i]);
    }

    free(resArray);

    return 0;
}
