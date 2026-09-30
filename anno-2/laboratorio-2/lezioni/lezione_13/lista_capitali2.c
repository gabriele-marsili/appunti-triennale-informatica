/*
Lezione 13 (31/10/23)

Costruzione di liste con inserimento in testa, in coda e ordinato.
Funzione ricorsiva per l'inserimento da una lista
Cancellazione da una lista con e senza ricorsione

*/
#define _GNU_SOURCE  // avverte che usiamo le estensioni GNU
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa exit() etc ...
#include <stdbool.h> // gestisce tipo bool
#include <assert.h>  // permette di usare la funzione ass
#include <string.h>  // funzioni per stringhe
#include <errno.h>   // rischiesto per usare errno
#include <math.h>

// Scopo del programma:
// imparare a costruire, visualizzare e distruggere le liste in C

// prototipi delle funzioni che appaiono dopo il main()
void termina(const char *messaggio);

// definzione struct che rappresenta
// una città con nome, e coordinate
// + campo next per formare la LISTA
typedef struct capit
{
  char *nome;
  double lat;
  double lon;
  struct capit *next; // devo usare struct poiché ancora non posso usare capirale (definita a riga dopo)
} capitale;

void capitale_stampa(capitale *a, FILE *f)
{
  fprintf(f, "%20s (%f,%f)\n", a->nome, a->lat, a->lon);
}

capitale *capitale_crea(char *s, double lat, double lon)
{
  capitale *a = malloc(sizeof(*a));
  a->lat = lat;
  a->lon = lon;
  a->nome = strdup(s); // creo una copia di s e l'assegno al nome
  a->next = NULL;      // inizializzo a NULL (altrimenti potrei trovarci qualsiasi valore)
  return a;
}

void capitale_distruggi(capitale *a)
{
  free(a->nome);
  free(a);
}

// stampa tutti gli elementi della lista lis
void lista_capitale_stampa(capitale *lis, FILE *f) // lis = puntatore al primo elemento di una lista di capitali
{
  capitale *p = lis; // se ne puo' fare a meno (posso usare direttamente lis anziché inizializzare p)
  // non sappiamo quanti elementi ha la lista => uso while
  while (p != NULL)
  { // scorro finché ho elementi (finchè p != NULL)
    capitale_stampa(p, f);
    p = p->next; // -> scorre elementi della lista
    // -> p adesso punta al prossimo elemento
  }
  return;

  /*approccio alternativo -> ricorsione del:
  è possibile scorrere la lista con una funzione ricorsiva a cui viene passato
  un elemento della lista e che richiama se stessa passando il next (il successivo)
  -> caso base = elemento next = NULL (in tal caso la funzione termina)
  */
}

// distrugge tutti gli elementi della lista lis
void lista_capitale_distruggi(capitale *lis)
{
  while (lis != NULL)
  {
    capitale *tmp = lis->next; // necessario
    capitale_distruggi(lis);
    lis = tmp;
  }
  return;
}

/*cancella e dealloca dalla lista tutte
le capitali aventi latitudine > della latitudine passata per argomento
e restituisce quello che rimane della lista
*/
// versione ricorsiva
capitale *cancella_nordiche(capitale *testa, double latitudine_limite)
{
  // CB
  if (testa == NULL)
    return NULL; // ritorno la lista vuota

  assert(testa != NULL);
  // CR
  if (testa->lat > latitudine_limite)
  { // ==> devo togliere questo elemento (testa)
    capitale *temp = testa->next; // mi salvo il successore della testa in una variabile temporale
    capitale_distruggi(testa); // distruggo l'elemento da eliminare (testa)
    return cancella_nordiche(temp, latitudine_limite); // controllo anche il resto della lista
  }
  else
  { // => scorro con ricorsione e ritorno testa (che ho tenuto poiché modifico il next della testa corrente)
    testa->next = cancella_nordiche(testa->next, latitudine_limite); // metto il risultato della ricorsioe nel successivo della testa (elemento corrente)
    return testa;
  }
}

// versione NON ricorsiva 

// legge un oggetto capitale dal file f
// restituisce il puntatore all'oggetto letto
// oppure NULL se non riesce a leggere dal file
capitale *capitale_leggi(FILE *f)
{
  assert(f != NULL);
  char *s;
  double lat, lon;
  int e = fscanf(f, "%ms %lf %lf", &s, &lat, &lon); // > legge i valori per creare la capitale dal file
  if (e != 3)
    return NULL;
  capitale *c = capitale_crea(s, lat, lon);
  free(s); // dealloco la stringa usata per il nome
  return c;
}

// crea una lista con gli oggetti capitale letti da
// *f inserendoli ogni volta in testa alla lista
capitale *crea_lista_testa(FILE *f) // prende il puntatore al file precedentemente aperto
{
  // costruzione lista leggendo capitali dal file
  capitale *testa = NULL; // inizializza la testa della pila a NULL
  // capitale *coda=NULL;  // serve per l'inserimento in coda
  while (true)
  {
    capitale *b = capitale_leggi(f); // -> legge la capitale dal file
    if (b == NULL)
      break;
    // inserisco b in testa alla lista
    // b->next = testa;
    // testa = b;

    // inserisco mantenendo ordinamento di latitudine decrescente:
    //  la nuova testa mi è ritornata dalla funzione inserisci_lat
    testa = inserisci_lat(testa, b);
  }

  return testa;
}

// inserisce elemento "c" in lista "testa"
// mantenendo ordinamento per latitudine decrescente
//-> inserisce nuovo elemento mantenendo l'ordinamento
capitale *inserisci_lat(capitale *testa, capitale *c) // -> prende una lista già formata (o meglio prende il puntatore alla testa) e il nuovo elemento c
{
  // testa deve esser ordinato (può anche esser vuota)
  // c deve esser != da null (deve esistere )
  assert(c != NULL); // devo avere un oggetto da inserire

  // tratta il caso testa==NULL (lista vuota)
  if (testa == NULL)
  {
    c->next = NULL; // creo lista con solo c
    return c;       // e la restituisco
  }

  assert(testa != NULL); // caso lista non vuota
  // verifico se c va messo prima di tutti
  if (c->lat > testa->lat)
  {                  // latitudine della lista maggiore di quella della testa (sto ordinando per latitudine decrescente -> prima voglio latutidini più grandi via via minori)
    c->next = testa; // c va messa in testa, il suo successore è la precedente testa
    testa = c;       // -> la nuova testa è c
    return testa;    // ritorno la testa
  }

  // ora (qui) so che c deve essere inserito dopo il primo elemento (ho già fatto il confronto)
  // questo implica che il primo elemento rimane quello
  // a cui punta testa (quindi terminerò con return testa)
  capitale *p = testa; // (non essenziale, inizializzo p con una copia di testa (ovvero la lista) (p punta al primo elemento della lista, ovvero a testa))
  while (p->next != NULL)
  { // scorro finché ho un successivo (fino alla fine della lista)
    // controllo se c va inserito tra p e p->next
    assert(c->lat <= p->lat);
    if (c->lat > p->next->lat)
    {
      // inserire c tra p e p->next
      c->next = p->next; // il successore di c diviene il successore di p (metto p next dopo c)
      p->next = c;       // il successore di p diviene c (metto c dopo p)
      // capitale -> inserita posso terminare
      return testa; // ritorno al testa della lista
    }
    p = p->next; // considero il prossimo elemento della lista (scorro)
  }
  assert(p->next == NULL); // => sono arrivato alla fine della lista (=> devo inserire c in fondo)
  // c va inserita in fondo
  p->next = c;
  c->next = NULL; // ricontrollo e rimetto che dopo c non ci devono essere elementi (c è l'utlimo)
  return testa;   // ritorno la testa della lista

  /*approcio SBAGLIATO : while(p->lat > c->lat) p = p->necx
    in questo approccio ho 2 problemi :
    • una volta che trovo dove inserire c (ovvero quando c->lat > p->lat) non so inserirlo prima di p perché per inserire c prima di p devo sapere chi c'era prima di p (il predecessore di p deve puntare a c che a sua volta deve puntare a p => ovvero: predecessore_p->next = c e anche c->next = p, ma non ho il predecessore di p)
    • se non trovo dove inserire c (ovvero se lo devo inserire in fondo) allora il while può proseguire all'infinito (non ho mai che p->lat <= c->lat), ma ad una certa avrò p->next == NULL => p == NULL alla prossimo ciclo del while => errore
  */
}

// versione ricorsiva
capitale *inserisci_lat_RICORSIVA(capitale *testa, capitale *c)
{
  assert(c != NULL);
  if (testa == NULL)
  {                 // se la lista è vuota (ovvero la testa è null)
    c->next = NULL; // allora il next del primo elemento non esiste, ovvero è null
    return c;       // ritorno la lista, ovvero c (unico elemento)
  }

  // gestisco i due casi possibili : c inserito prima o dopo (ordinamento per latitudine decrescente)
  if (c->lat > testa->lat)
  { // latitudine di c è maggiore
    // => inserisco c prima di testa :
    c->next = testa; // -> c diviene il primo elemento e il suo succesivo diviene la precedente testa
    return c;        // ritorno c (la nuova testa)
  }

  if (c->lat <= testa->lat)
  { // latitudine di c è minore (o uguale)
    // => inserisco c dopo di testa :
    testa->next = inserisci_lat_RICORSIVA(testa->next, c);
    // => testa è in posizione corretta, quindi devo aggiornare il suo successivo (ovvero testa->next) (per questo ho testa->next = ... )
    // ciò che viene messo nel successivo di testa (in testa->next) è gestito con la ricorsione:
    // nella chiamata ricorsiva passo il successivo di testa (ovvero il resto della lista) e la capitale c che voglio inserire (e che non ho ancora inserito )
    // la ricorsione inserisce c al posto giusto e ritorna la sua posizione, che va nel successivo di next

    // la testa rimane tale ed è per questo che la ritorno
    return testa;
  }


}

int main(int argc, char *argv[])
{

  if (argc != 2)
  {
    printf("Uso: %s nomefile\n", argv[0]);
    exit(1);
  }
  FILE *f = fopen(argv[1], "r"); // apre file scritto in argv[1] in lettura
  if (f == NULL)
    termina("Errore apertura file");

  // costruzione lista leggendo capitali dal file
  capitale *testa = crea_lista_testa(f);
  puts("--- inizio lista ---");

  //cancello gli elementi con lat > di 50:
  testa = cancella_nordiche(testa,50.0);

  // stampa lista capitali appena creata
  lista_capitale_stampa(testa, stdout);
  puts("--- fine lista ---");

  if (fclose(f) == EOF)
    termina("Errore chiusura");

  // dealloca la memoria usata dalla lista
  lista_capitale_distruggi(testa);

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