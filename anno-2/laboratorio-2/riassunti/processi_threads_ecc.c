/*SYSTEM CALL (lezione 27)
->chaimate di sistema (kernel mode)
-> corrispondenza 1-1 system call kernel e sys call c
-> man (2) 'nome systemcall' per manuale (2 => sezione manuale)

> files:
•open
-> int fd = open("nomefile.txt", O_WRONLY | O_CREAT | O_TRUNC, 0666);
    permessi scritti in maniera ottale -> 0666 (0 = ottale, 6 = scrittura e lettura sia per utente che gruppo che altri)
    i permessi finali sono una combinazione (and) tra quelli dati da 0666 e la umask dell'utente
    la umask racchiude i permessi dell'utente (gruppo e altri)
    wopen restituisce un intero relativo al file descritor


•read (man 2 read)
->  ssize_t e = read(fd,&x,sizeof(int));
    primo arg = dove scrivo (file descriptor) (valore intero)
    secondo arg = riferimento a var di cui scrivo il valore
    terzo arg = dim da scrivere (num bytes)


•write
-> write(fd, &i, sizeof(int)); // identifica il file con il file descrictor (int)
    primo arg = dove scrivo (file descriptor) (valore intero)
    secondo arg = riferimento a var di cui scrivo il valore
    terzo arg = dim da scrivere (num bytes)
    per dire quanti byte scrivere basta dimensione singolo elemento
    mi ritorna il numero di byte scritti

>memory:
•brk
•sbrk
-> prendono un numero di byte e alzano la cima dell'heap di tale quantità di byte
-> restituisce un puntatore alla zona di memoria

>esecuzione file
•uso execl (funzione di sistema) (prende num arbitrario di args, come ultimo arg devo passare NULL)
    -> man execl per manuale
    -> primo arg = nome programma da eseguire
    -> secondo arg = argv[0] nel programma eseguito
    esempio (esecuzione lettore.py a cui viene passato arg[1] come argomento):
    if (execl("lettore.py", "lettore.py", argv[1], (char *)NULL) == -1)
            xtermina("execl fallita", __LINE__, __FILE__);
*/

/*FORK (e processi) (lezione 27)
-> divisione dei processi (padre - figlio)
pid_t p = fork(); // sdoppia il processo corrente in un p padre ed un p figlio
oppure
pid_t pid = xfork(__LINE__,__FILE__); // fork del processo padre sfruttando file per gestione errori
p == 0 => figlio
p == 1 => padre
getpid() ritorna process id del processo corrente
getppid() ritorna process id del padre del processo corrente
waitpid(salvapid[i],NULL,0)<0 // waitpid-> attendo che processo con pid salvapid[i] finisca

*/

/*PIPE (lezione 28-29)
=>pipe da terminale :
•usabili per files diversi
•sono file, rimangono attivi finché non vengono chiusi
•ha diritti di lettura, scrittura (definiti per utente, gruppo)
•mkfifo nomePipe per creare la pipe da terminale.
•man mkfifo per manuale (pag 7)

->comunicazione tra processi mediante due estremità
int up[2]; (up perchè la uso da figli a genitore)
=> up è un array di 2 interi -> primo intero sarà canale di lettura, il secondo il canale di scrittura
xpipe(up,__LINE__,__FILE__); //creazione della pipe sfruttando il file di per la gestione degli errori (a cui passo linea e file)
//OSS : la pipe va creata prima delle fork
->meccanismo pipe (lettura-scrittura):
up[0] = canale lettura -> usato (solitamente) dal padre per leggere ciò che scrivono i figli
up[1] = canale scrittura -> usato (solitamente) dai figli per scrivere ciò che verrà letto dal padre
l'up crea un descriptor file in cui posso scrivere / leggere (ovviamente non sono file veri e propri, sono a liv di sistema -> non posso usare fprintf ecc, devo usare le system call : read e write)

xclose(up[0],__LINE__,__FILE__); // chiusura canale lettura per il processo corrente (best practice : chiudere subito canali non usati)
xclose(up[1],__LINE__,__FILE__); // chiudo il canale di scrittura per il processo corrente

OSS : deadlock nel caso in cui ho processo che attende la scrittura di se stesso ed esso non scrive mai
// leggo fino a quando tutti non hanno chiuso up[1] (finché esiste almeno 1 canale di scrittura aperto)
meccanismo lettura pipe (processo padre - figli):
    il padre legge finché viene restituito un valore dalla read
    se ci sono valori essi vengono letti subito
    se non ci sono valori allora :
    1) le read attende che venga scrito qualcosa poiché esiste almeno 1 canale di scrittura aperto relativo alla pipe in questione
    2) la read ritorna 0 poiché tutti i canali di scrittura sono chiusi
        -> la read termina

OSS
questo meccanismo di pipe funziona unicamente tra processi padre-figli nello STESSO AMBIENTE
esistono pipe con il nome che possono comunicare tra ambienti diversi (es: file c e file .py)
(named pipe)

OSS:
    se metto prima la scrittura del padre e poi la lettura dei figli
    allora pieno la pipe e ho deadlock. (arrivo a non poter più scrivere poiché pipe è piena, ma non ho ancora avviato la lettura dei figli)
    ->Devo prima avviare la lettura dei figli e poi la scrittura del padre
    (ciò avviene perché quando la pipe è piena e voglio scriverci il processo che scrive, in questo caso il padre, attende che venga letta/svuotata la pipe)


*/

/*NAMED PIPE (lezione 30)

•int mkfifo(const char *)
-> restituito 0 se ok, -1 se problema (info in errno)
•una volta creata la pipe con nome essa va aperta in lettura / scrittura
-> apertura tramite la chiamata di sistema open

Differenza d'uso rispetto alle pipe senza nome:
quando creo la pipe senza nome vengono create automaticamente le estremità di scrittura e lettura
per le pipe con il nome le estrermità di scittura e lettura non vengono aperte contemporaneamente
    ->quando un processo apre una pipe con il nome tale processo viene bloccato finché un altro processo
    non apre la stessa pipe nella modalità inversa (scrittura-lettura e viceversa)
        =>evita che venga scritto se nessuno legge e viceversa


pagine man :
man mkfifo (shell)
man 3 mkfifo
man 7 fifo
man 7 pipe

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

*/

/*SHARED MEMORY (lezione 31)
->porzione (blocchi - array) di memoria condivisa tra più processi
normalmente processi diversi hanno proprie variabili
e non si influenzano reciprocamente
è tuttavia possibile creare zone di memoria condivise in cui vi sono
variabili i cui valori sono condivisi tra i processi
-> controlli su scrittura / ricezione delle variabili (mutex)
-> coordinazione dei processi
-> gestione memoria condivisa (semafori)

---  procedura condivisione memoria:  ------
shm_open() -> crea file di memoria condivisa con dim = 0
(file perché son oggetti globali a cui tutti i file possono accedere)
-> file creato in RAM (il SO usa questa porzione della RAM come fosse disco)

ftruncate() -> quantità di byte della memoria condivisa
(specifico quanta memoria mi serve)
-> non posso ingrandire la quantità di memoria usata

nmap() -> mappo la memoria ceata in un array che si riferisce ai byte di memoria condivisa
(se faccio fork l'array è condiviso tra i processi)

munmap() -> libero la memoria condivisa precedentemente

shm_unlink() -> cancello file di memoria condivisa e la memoria utilizzata torna disponibile
->in realtà fa solo prenotazione della cancellazione : il sistema cancella la memoria condivisa
solo quando tutti i processi che usano quella memoria condivisa non la usano più (-> close() )
(la cancellazione effettiva avviene solo quando tutti i processi che usano la memoria condivisa vengono chiusi)
(se non uso shm_unlink() allora l'array continua a consumare RAM inutilmente)

close() -> chiudo l'oggetto in memoria condivisa


->(solitamente) si usa #define Nome '/nomeFile' per definire il nome della mem condivisa
    -> #define Nome "/prova" //file di nome prova nella directory
// ---- creazione array memoria condivisa
  int shm_size = n*sizeof(int); //dimensione della mem condivisa
  int fd = xshm_open(Nome,O_RDWR | O_CREAT, 0660,__LINE__,__FILE__); //creazione del file descriptor -> scrittura e lettura | creazione, permessi
  ->shm_open restituisce file descriptor (di dim 0) che salvo in fd
  xftruncate(fd, shm_size, __LINE__,__FILE__); //assegnazione della dimensione (shm_size)
  int *a = simple_mmap(shm_size,fd, __LINE__,__FILE__); //mappo fd con dim shm_size nell'array a
  close(fd); // dopo mmap e' possibile chiudere il file descriptor (se non ci vengono eseguite altre operazioni sopra)

  xshm_unlink(Nome,__LINE__, __FILE__);  //prenota la cancellazione della mem quando non è più attiva in alcun processo

// unmap memoria condivisa
  xmunmap(a,shm_size,__LINE__, __FILE__);


*/

/*SEMAFORI (e relativo meccanismo di mutua esclusione) (lezione 32-33)
= var intere incrementabili / decrementabili in modo atomico
->risolve il problema dei conflitti relativo a processi parallelli (/thread concorrenti) che
operano su una stessa zona di memoria
->l'incremento posso sempre farlo
->il decremento non posso farlo se ho val = 0 nel semaforo.
  > il semaforo è vincolato ad avere valori >= 0
  > se il sem è 0 e viene decrementato il processo che ha chiamato il decremento attende che un altro processo
    incrementi il semaforo, solo dopo decrementa il valore (in realtà passa dalla coda pronti relativa alla var del semaforo all'esecuzione
    lasciando invariato il valore del semaforo - sempre a 0)

!!->operazioni prendono il nome di :
  > incremento = POST (SEM_POST) -> V
  > decremento = WAIT (SEM_WAIT) -> P

->non è possibile vedere il valore di un semaforo in un certo momento.

->esistono 2 tipi di semafori : con e senza nome
  > con nome -> solitamente usati per le pipe
  > senza nome -> solitamente usati per i thread

-> nella creazione di un semaforo devo settare il valore iniziale.

solitamente viene usato (serve per riconoscere un semaforo tra più processi)
#define Nome "/nomeSem"
per definire il nome del semaforo (ai nomi dei semafori viene automaticamente aggiunto il prefisso .sem)

  // ---- creazione di un semaforo
  sem_t *sem_a0 = xsem_open(Nome,O_CREAT|O_EXCL,0666,1,
                   __LINE__, __FILE__); // 1 = val iniziale del semaforo

  xsem_unlink(Nome,__LINE__, __FILE__); // distrugge sem quando finito

OSS :
nella creazione di un semaforo richiedo che non ci sia un semaforo già esistente
ciò perché, altrimenti, il semaforo prenderebbe il valore di quello già esistente
ignorando il valore dell'inizializzazione

//meccanismo mutex (rendo esclusivo ad un solo processo il pezzo di codice tra wait e post):
// => a viene acceduto solo da un processo (/thread) alla volta.
// OSS : ciò è possibile perché ho inizializzato il semaforo a 1
// valore semaforo = 1 => semaforo disponibile per essere acquisito
// valore semaforo = 0 => semaforo NON disponibile per essere acquisito (già in uso da un processo)


xsem_wait(sem_a0,__LINE__, __FILE__);// aspetta che il semaforo sia 1 e lo porta a 0 (decrementa valore)
...operazioni svolte in modo atomico (senza possibile interruzione da parte di altri processi / threads)
xsem_post(sem_a0,__LINE__, __FILE__);   // riporta il semaforo a 1 (nuovamente disponibile) (incremente valore)


•Semafori sfruttabili anche per sincronizzazione di più processi (sem condivisi tra i processi)
=> necessito un sem per sincronizzazione inizio ed uno per sincronizzazione fine
-> ho n processi
-> passo il semaforo ad ogni proceso
-> in ogni processo metto sem a 1
  --> // ---- apro i semafori nell'i-esimo processo (non richiedo accesso esclusivo poiché mi aspetto che il semaforo sia già esistente)
  //secondo arg = 0 => se semaforo non è già esistente non lo crea, anzi da' errore
  sem_t *sem1 = xsem_open(Sommasem,0,0666,1,__LINE__, __FILE__); // mutua esclusione
  sem_t *sem2 = xsem_open(Sommasem2,0,0666,0,__LINE__, __FILE__);// inizio
  sem_t *sem3 = xsem_open(Sommasem3,0,0666,0,__LINE__, __FILE__);// fine

  // segnalo al processo principale che ho
  // fatto l'accesso a shm a sem
  xsem_post(sem2,__LINE__, __FILE__);

-> nel processo main :
  // attende inizio dei processi ausiliari
  // quando sono sicuro che i processi ausiliari hanno
  // aperto shm e semafori procedo a prenotare la cancellazione
  // attendo che i figli abbiano fatto sem_post su semI (il che mi indica che il figlio i-esimo ha iniziato -> fatto accesso alla mem condivisa)
  for(int i=0;i<aux;i++)
    xsem_wait(semI,__LINE__, __FILE__);

-> procedo con l'unlink dei semafori nel main process
  (main process : )
  // attendo che i processi figli siano terminati
  // attendo che ogni processo esegua una sem_post (su sem3 = semF)
  // su semF per indicare che ha concluso il calcolo
  for(int i=0;i<aux;i++)
    xsem_wait(semF,__LINE__, __FILE__);

->segnalazione della chiusura (processo figlio / non main process)
  // segnalo la terminazione con una post
  xsem_post(sem3,__LINE__, __FILE__); //una sola post poiché ogni file ha la propria
  // -> post => incremento val sem3 (il padre controlla e decrementa ogni semaforo con ciclo for per controllare che i processi figli abbiano finito)

  // chiude i semafori (non processo main)
  xsem_close(sem1,__LINE__, __FILE__);
  xsem_close(sem2,__LINE__, __FILE__);
  xsem_close(sem3,__LINE__, __FILE__);

*/

/*THREADS (+ mutex + struct per la condivisione delle var ai threads) (lezione 32-33)
I threads necessitano di :
•struct per gli argomenti
•una funzione da eseguire
•meccanismi di mutua esclusione / sincronizzazione

typedef struct {
  int start;            // intervallo dove cercare i primo
  int end;              // parametri di input
  int somma_parziale;   // parametro di output
  pthread_mutex_t *pmutex; // mutex (puntatore) condiviso (passo il riferimento al mutex per quello)
} dati;

//corpo di un thread (la funzione che il thread esegue quando viene avviato)
OSS : viene usato * (puntatore)
void *tbody(void *v) {
  dati *d = (dati *) v; // riprendo i dati dalla struct
  int primi = 0;
  // cerco i primi nell'intervallo assegnato
  for(int j=d->start;j<d->end;j++)
      if(primo(j)) {
        primi++;
        xpthread_mutex_lock(d->pmutex,QUI); // lock sulla mutex
        d->tabella[*(d->pmessi)] = j;
        *(d->pmessi) += 1;
        xpthread_mutex_unlock(d->pmutex,QUI); // unlock sulla mutex
      }
  fprintf(stderr, "Il thread che partiva da %d ha terminato\n", d->start);
  d->somma_parziale = primi;
  pthread_exit(NULL);
}

•creazione e definizione del mutex
pthread_mutex_t nomeMutex;
xpthread_mutex_init(&nomeMutex,NULL,QUI);

•creazione dei threads:
  pthread_t t[p];   // array di dimensione p per indentificatori di thread
  dati d[p];        // array di p struct che passerò ai p thread

•inizializzazione dei threads
 for(int i=0; i<p; i++) { // scorro arr dei threads
    d[i].start = num_start; // assegno parametro start al thread i
    d[i].end = num_end; // assegno parametro end al thread i
    d[i].pmutex = &nomeMutex; // assegno parametro mutex al thread i
    xpthread_create(&t[i], NULL, &tbody, &d[i],__LINE__, __FILE__);
    // creo il thread passando il riferimento, il rif al body, il rif alla struct
  }

•sincronizzazione dei threads (attesa della terminazione)
  for(int i=0;i<p;i++) {
    xpthread_join(t[i],NULL,__LINE__, __FILE__);
  }

•distruzione del mutex :
xpthread_mutex_destroy(&nomeMutex,QUI);

*/

/*PARADIGMA PRODUTTORI-CONSUMATORI (lezione 34-35)
->viene (spesso) usato un buffer per la condivisione di dati
->produttore scrive nel buffer / consumatore legge (calcola ecc)
->necessari:
•mutex per accesso al buffer (non strettamente necessario se ho lettori che possono leggere contemporaneamente)
•semaforo capacità buffer (indica se è pieno o meno)
•semaforo con num elementi nel buffer (=>indica se buffer è vuoto)
•indice/i relativo/i alla/e posizione/i in cui leggere e o scrivere nel buffer
•meccanismo di sincronizzazione (es: valore -1 nel buffer)


#define Buf_size 10
-> dimensione del buffer definita a priori


// struct contenente i parametri di input e output di ogni thread
typedef struct {
  int quanti;   // output
  long somma;   // output
  int *buffer; // puntatore al buffer
  int *pcindex; // puntatore all'indice per slot in cui leggere (unico per tutti i threads!!!)
  sem_t *sem_free_slots; //puntatore al semaforo free_slots
  sem_t *sem_data_items;  //puntatore al semaforo data_items
} dati;

// funzione eseguita dai thread consumer
void *tbody(void *arg)
{
  dati *a = (dati *)arg; // riprendo i dati e li metto in a
  a->quanti = 0; // inzializzo a 0 i dati di output
  a->somma = 0;
  int n;
  fprintf(stderr,"Consumatore %d partito\n",gettid()); // id relativo al processo (?)
  do {
    xsem_wait(a->sem_data_items,__LINE__,__FILE__); //attende che ci sia almeno uno slot scritto nel buffer
    n = a->buffer[*(a->pcindex) % Buf_size]; // riprende il numero dal buffer
    *(a->pcindex) +=1; //incrementa l'indice del buffer
    xsem_post(a->sem_free_slots,__LINE__,__FILE__); //cambia il numero di slot liberi nel buffer
    if(n>0 && primo(n)) {
      a->quanti++;
      a->somma += n;
    }
  } while(n!= -1);
  fprintf(stderr,"Consumatore %d sta per terminare\n",gettid());

}


nel main :
  int buffer[Buf_size]; -> definizione e inizializzazione buffer
  int pindex=0;
  // pthread_mutex_t mu = PTHREAD_MUTEX_INITIALIZER;

  pthread_t t[p]; // array di p threads
  dati a[p]; // array di dati per i p threads
  sem_t sem_free_slots, sem_data_items; // semafori dei threads
  xsem_init(&sem_free_slots,0,Buf_size,__LINE__,__FILE__); // initialize sem free slots with buf_size
  xsem_init(&sem_data_items,0,0,__LINE__,__FILE__); // initialize sem data items with 0

  ...for con inizializzazione dei threads passando i dati per la struct
    ...
  -> mutua esclusione per l'accesso al buffer :
  xsem_wait(&sem_free_slots,__LINE__,__FILE__); // attende che valore sem_free_slots > 0
  buffer[pindex++ % Buf_size]= n; // mette il numero n nel buffer in posizione pindex++ % Buf_size
  xsem_post(&sem_data_items,__LINE__,__FILE__); //mette sem_data_items a 1 (=> consumatore può leggere)

  ...
  // terminazione threads
  for(int i=0;i<p;i++) {
    xsem_wait(&sem_free_slots,__LINE__,__FILE__); // attende che valore sem_free_slots > 0
    buffer[pindex++ % Buf_size]= -1;  //mette a -1 il valore del buffer in posizione pindex++ % Buf_size
    xsem_post(&sem_data_items,__LINE__,__FILE__);//mette sem_data_items a 1 (=> consumatore può leggere)
  }

  // join dei thread e calcolo risultato
  for(int i=0;i<p;i++) {
    xpthread_join(t[i],NULL,__LINE__,__FILE__);
    tot_primi += a[i].quanti;
    tot_somma += a[i].somma;
  }
  xsem_destroy(&sem_data_items,__LINE__,__FILE__);
  xsem_destroy(&sem_free_slots,__LINE__,__FILE__);


•ulteriori esempi :
-> divisori.c (lezione 35,36) => paradigma con più produttori e più consumatori


*/

/*CONTITION VARIABLES (lezione 36)
-> variabili di condizione su cui uno o più threads possono esser messi in attesa passiva
-> broadcast risveglia tutti i thread sulla cv
-> signal risveglia 1 thread in attesa sulla cv

•regole utili :
> usare while per il check della cv (in modo che thread che si risveglia controlla nuovamente la condizione)
> porre cond_wait (attesa cv) tra mutex
> porre broadcast tra mutex


// struct che tiene traccia della memoria disponibile e
// contiene le variabili cond/mutex per regolarne l'utilizzo
typedef struct {
  pthread_cond_t  *cv; // condition variable
  pthread_mutex_t *mu; // mutex
  int MB;       // memoria attualmente disponibile
} heap;

    xpthread_cond_wait(h->cv,h->mu,QUI); //attesa del thread sulla condition variable (cv)
    // la cond wait va esguita con il mutex locked
    // la cond wait rilascia il mutex locked (mu in questo caso) => permette il controllo anche agli altri threads
    // quando il thread sulla cv viene sbloccato tale thread riprende il mutex (mu) per rifare il controllo del while


  xpthread_cond_broadcast(h->cv,QUI); // 'sveglia' TUTTI i threads in attesa sulla cv
  // i threads appena svegliati si bloccano su mutex mu



*/

/*SEM COME CV + MUTEX (lezione 37 -> zem.c)
OSS : sem blocca solo su valore = 0, cv ha condizione/i più complessa/e
OSS : semaforo creato come cv + MUTEX permette incrementi e decrementi maggiori di 1

// struttura rappresentante il semaforo
typedef struct {
  int tot;  // valore del semaforo, non deve mai diventare negativo
  pthread_cond_t cond;   // condition variable
  pthread_mutex_t mutex; // mutex associato alla condition variable
} zem;



// inzializza semaforo al valore q
// deve essere chiamata prima di up e down
void zem_init(zem *z, int q) // z = puntatore al semaforo zem, q = valore di inizializzazione
{
  assert(q>=0); // q deve esser positivo
  z->tot = q;
  xpthread_cond_init(&z->cond,NULL,QUI); // inizializzo cv z->cond
  xpthread_mutex_init(&z->mutex,NULL,QUI); // inizializzo mutex z->mutex
}

// analoga alla sem_wait (operazione P di Dijkstra)
void zem_down(zem *z, int q)// z = puntatore al semaforo zem, q = valore del decremento (può esser != da 1 )
{
  assert(q>0);
  pthread_mutex_lock(&z->mutex); // lock sulla mutex relativa allo zem
  while(z->tot-q<0) // check sulla condizione con while (z->tot - q < 0)
    pthread_cond_wait(&z->cond,&z->mutex); //wait sulla cv rilasciando il mutex

  //=> z->tot >= 0
  z->tot -= q; // decremento di z->tot di un ammontare q passato come parametro
  pthread_mutex_unlock(&z->mutex); // unlock della mutex
}

// analoga alla sem_post (operazione V di Dijkstra)
void zem_up(zem *z, int q) // z = puntatore al semaforo zem, q = valore dell'incremento (può esser != da 1 )
{
  assert(q>0);
  pthread_mutex_lock(&z->mutex); // lock sulla mutex
  z->tot+=q; // incremento di z->tot del valore q passato come parametro
  pthread_cond_broadcast(&z->cond); // broadcast per risvegliare tutti i threads in attesa sulla cv z->cond
  pthread_mutex_unlock(&z->mutex); // unlock sulla mutex
}

*/

/*PARADIGMA LETTORI - SCRITTORI (lezione 37-38) (rw.c)
OSS : il makefile può esser sfruttato per definire variabili al posto di usare #define
OSS : sluzione unfair per gli scrittori (possono essere messi in starvation: attesa indefinita)
  -> priorità ai lettori (che scavalcano scrittori)

Per il paradigma viene sfruttata una struct con :
•num di lettori
•num di scrittori in attesa (wpending)
•var booleana che indica se c'è un thread (scrittore) che sta scrivendo
•una condition variable
•un mutex
•(eventuale) mutex per rendere fair il paradigma
  -> se locked c'è un thread in attesa sulla cv
  -> tale thread che va in attesa prende il precedente mutex (non rilasciato finché non si sveglia dall'attesa sulla cv)
  -> e blocca gli altri threads divenendo il primo


*/

/*SIGNALS (lezione 37 - 40)

•signal mask per thread -> segnali inviati al thread
•se ho 2(+) segnali uguali non gestiti essi si accumulano e vengon gestiti assieme
•sys call bloccano arrivo dei segnali (segnali non interrompono le sys call)
  -> ad eccezione della lettura di una pipe in caso non ci sia nulla da leggere
    => attesa sulla pipe e possibie arrivo dei segnali che interrompono la sys call

•arrivo di un segnale => interruzione del processo e handling del segnale (tramite specifica funzione / funzione di default)

•se un segnale viene mandato ad un processo che ha più thread
  -> segnale gestito da un thread a caso
  -> se il segnale è dovuto ad un errore (es divisione per 0) di un particolare thread allora viene (tipicamente) inviato a tale thread

•se un segnale viene mandato ad un preciso thread lo gestisce lui


Sigaction per dare collegare segnale a funzione che ne fa handling (anziché usare funzione di default)
-> handler = funzione invocata quando arriva un preciso segnale al thread / processo
-> handler ha prototipo fisso : restituisce void e prende come input (intero) il numero del segnale inviato
  -> la stessa funzione può esser usata per gestione segnali diversi
  -> l'handler necessita di var globali per interagire con il resto del programma

-> uso di struct sigaction per definire signal handler :
  struct sigaction sa;
  sa.sa_handler = &handler; // assegno l'handler (funzione) al segnale (controllo del tipo del segnale nell'handler).
  // setta sa.sa_mask che è la maschera di segnali da bloccare
  sigfillset(&sa.sa_mask); // durante l'esecuzione di handler(). Blocca tutti i segnali
  // sigdelset(&sa.sa_mask,SIGUSR1);  // -> Blocca tutti i segnali tranne SIGUSR1
  sigaction(SIGUSR1,&sa,NULL);  // handler (sa) per USR1
  sigaction(SIGUSR2,&sa,NULL);  // stesso handler (sa) per USR2
  // definisco variabile dove salvo il settaggio attuale per SIGINT
  struct sigaction old_signalHandler;
  sigaction(SIGINT,&sa,&old_signalHandler);   // stesso handler per Control-C
  // -> cambio azione relativa ad un certo segnale (in questoc caso ctrl C), in old_signalHandler salvo l'azione precedente.


OSS : se ho busy waiting su var globale devo definirla volatile per far sì che il suo valore possa cambiare globalmente nel check
  -> se non faccio così il compilatore (per ottimizzare) è come se prendesse while(true)

OSS : se ho un handling di un segnale in esecuzione ed arriva un nuovo segnale per tale handler
  -> la precedente handling viene interrotta +
  -> viene mandata in esecuzione l'handling del nuovo segnale
  -> può causare probelemi in alcuni contesti

Modi per mandare segnali:
1) promp comandi (nome segnale + pid processo, esempio : kill -usr2 239)
2) cmd / ctrl c (segnale sigint2)
3) da dento un programma con la funzione kill ( kill(getpid(),SIGUSR1); // manda SIGUSR1 a se stesso)

Evitare doppia esecuzione handler : 
-> setto maschera sa_mask in modo da accettare solo determinati segnali 
-> quando arriva uno ti quei segnali vengono bloccati gli altri 
=> evita che un nuovo segnale interrompa l'handling corrente e sovrapponga il suo 
  -> ho asynchronous safe function relativa all'handler, ma non al resto delle funzioni

OSS : 
> fork => figlio eredita segnali 
> exec => figlio NON eredita segnali 

Gestione maschere dei segnali :
sigset_t mask; // -> crea una maschera nella var mask 
pthread_sigmask -> cambia sigmask dei thread 
  
-> svariate operazioni su sigset_t 

•Sigwait e segnali con threads (segnaliT.c) : 
OSS : sigwait ha priorità su handler nei thread (se un thread usa sia un handler che sigwait i segnali li gestisce sigwait)
OSS : se il segnale è inviato al processo con kill(getpid()) la gestione viene fatta dal main thread
OSS : è possibile bloccare tutti i segnali nel main thread e lasciare la gestione ad un apposito thread

Sigwait prende il riferimento alla mask dei segnali e un riferimento a una var int per il tipo del segnale
int e = sigwait(&mask,&s);
if(e!=0) perror("Errore sigwait");


gettid() => funzione per ottenere il thread id (non sempre disponibile)
volatile sig_atomic_t nomeVar = valoreIntero (usato per var globali)
  -> sig_atomic_t => intero che garantisce operazioni atomiche anche in presenza di interrupt dovute ai segnali



*/

/*SIGNALS REAL TIME (lezione 40) (segnaliRT.c)
->segnali che, a differenza dei segnali normali, si accordano
  -> se invio 2 volte lo stesso RT signal esso viene eseguito due volte 
  -> priorità nella coda data da numero segnale in modo crescente (max priorità a num piccoli)

->usati per inviare anche dati sfruttando union
  -> union = simile a struct, contiene o un intero o un puntatore

->i thread che devono attendere i segnali :
  -> uso di sigwait_info anziché sigwait


*/

/*SIGNALS MT safety & asynchronous safe function (lezione 38 - 40)
•MT safety
se una funzione è MT safty allora è utilizzabile in ambiente che sfrutta multi thread
=> una funzione è MT safty se ha sempre gli stessi side effect quando chiamata da più threads contemporaneamente 
  -> il diverso interleaving tra threads non modifica i side effects della funzione.
  (solitamente con mutex si ha MT safty)

•asynchronous safe function :
funzione è safe se non ha side effects quando chiamata 2 volte a causa di segnali 
  >esempio su doppia chiamata handler 
  -> ho handler che viene chiamato prima volta (primo segnale) => prima gestione
  -> stesso handler richiamato => blocco prima gestione 
  -> avvio seconda gestione (gestione secondo segnale che è arrivato)

  >esempio su doppia chiamata read 
  -> main f che chiama read e read attende dati
  -> signal => gestione con handler 
  -> handler che chiama read -> doppia chiamata a read
  

-> il signal handler deve essere reentrant (rientrante)
  -> problemi relativi a rientrare in una funzione più volte 
  -> funzioni reentrant son safe se rimangono safe nonostante vengano eseguite più volte
    => ovvero vengono ri-eseguite quando la prima esecuzione non è ancora terminata

Consigli pratici : 
> evitare var globali statiche in programmi multi threads (in caso usare mutex per gestirle)
> scrivere signal handler brevi e semplici (e che sfruttino solo funzioni async signal safe)
> evitare che uno stesso handler venga chiamato simultaneamente 

_r functions : 
> funzioni rientranti (rispetto a thread o segnali)
> ben diverse da funzioni che finiscono con _r
> leggere manuale 

*/