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
  struct capit *next; // devo usare struct poiché ancora non posso usare capirale
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

// alternativa per scorrere una lista :
// approccio ricorsivo :
void lista_capitale_stampa_RICORSIVA(capitale *p, FILE *f)
{
  if (p != NULL)
  {
    capitale_stampa(p, f); // stampo 
    lista_capitale_stampa_RICORSIVA(p->next, f); // ricorsione sul prossimo elemento della lista (caso induttivo)
  }
  else
  { // CB (ho finito la lista)
    return;
  }
}

// distrugge tutti gli elementi della lista lis
void lista_capitale_distruggi(capitale *lis)
{
  while (lis != NULL)// se elemento non è nullo :
  {
    capitale *tmp = lis->next; // necessario -> devo avere riferimento al successivo per vedere se ho altri elementi (non posso prima distruggere un elemento e poi andare a vedere il suo campo next)
    capitale_distruggi(lis);
    lis = tmp;
  }
  return;
}

// alternativa con approccio ricorsivo
void lista_capitale_distruggi_RICORSIVA(capitale *lis)
{
  if (lis != NULL)
  {
    lista_capitale_distruggi_RICORSIVA(lis->next); // prima vado a distruggere gli ultimi elementi
    capitale_distruggi(lis);                       // poi via via torno indieto nello stack di chiamate distruggendo l'elemento corrente (che non ha successori)
  }
}

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
  free(s);
  return c;
}

int main(int argc, char *argv[])
{

  if (argc != 2)
  {
    printf("Uso: %s nomefile\n", argv[0]);
    exit(1);
  }
  FILE *f = fopen(argv[1], "r");
  if (f == NULL)
    termina("Errore apertura file");

  // costruzione lista leggendo capitali dal file
  capitale *testa = NULL;
  // capitale *coda=NULL;  // serve per l'inserimento in coda
  while (true)
  {
    capitale *b = capitale_leggi(f);
    if (b == NULL)
      break;
    // inserisco b in testa alla lista
    b->next = testa; // -> il nuovo arrivato (b) deve avere come successivo la precedente testa della lista (il precedente primo elemento)
    testa = b; // -> la nuova testa diviene b (ultimo elemento aggiunto)
  }
  if (fclose(f) == EOF)
    termina("Errore chiusura");

  // stampa lista capitali appena creata
  lista_capitale_stampa(testa, stdout);

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