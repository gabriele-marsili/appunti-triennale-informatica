#define _GNU_SOURCE   // avverte che usiamo le estensioni GNU 
#include <stdio.h>    // permette di usare scanf printf etc ...
#include <stdlib.h>   // conversioni stringa exit() etc ...
#include <stdbool.h>  // gestisce tipo bool
#include <assert.h>   // permette di usare la funzione ass
#include <string.h>   // funzioni per stringhe
#include <errno.h>    // rischiesto per usare errno

// Scopo del programma:
// Mostrare come si definiscono e usano i puntatori a struct
// in particolare gli array di puntatori a struct



// prototipi delle funzioni che appaiono dopo il main()
void termina(const char *messaggio);


// definizione struct che rappresenta
// una città con nome, e coordinate (24 bytes) 
typedef struct {
  char *nome; // strnga = array caratteri -> metto il puntatore al nome  (posso anche definire nome[20] -> in nome ci son 20 byte per il nome della città -> se ho più di 19 caratteri nel nome esso va troncato)
  double lat;  // latitudine 
  double lon; // longitudine 
} capitale;

// -> maggiorin info nelle slides 

#if 0
// Nota: questa parte di codice fino a #endif non viene compilata

// Avendo definito il tipo capitale, ecco due 
// possibili definizione di array di 100 capitali:
// statico (dimensione immutabile) (-> schifo)
capitale a[100];  // ogni a[i] = un capitae  = 24 byte
// dinamico
capitale *a = malloc(100*sizeof(*a)); //(->buono)
// dopo aver creato a[] in questo modo, posso modificare gli elementi: 
a[0].lat = 34;

// In questo esercizio invece di un array di oggetti di tipo capitale
// lavoreremo invece con un array di puntatori a capitale:
// versione statica
capitale *b[100]; // ogni b[i] = un puntatore = 8 byte
// versione dinamica
capitale **b = malloc(100*sizeof(*b));
// ogni b[i] però è solo un puntatore, non esiste lo spazio
// per i tre campi nome, lat, lon è necessario allocarlo:
b[0] = malloc(sizeof(capitale));
// Dato che b[0] è un puntatore, per settare la latitudine devo scrivere: 
(*b[0]).lat = 43;  // corretta, ma non si usa
// oppure:
b[0]->lat = 43;    // useremo questa;
#endif



// stampa sul file *f i campi della capitale a
void capitale_stampa(capitale *a, FILE *f) { // passo puntatori a ogg capitale ed a file 
  fprintf(f,"%20s (%f,%f)\n",a->nome,(*a).lat,a->lon); // stampo (uso entrambe le notazioni possibili, sia (*a).lat che a->lon)
} 

// crea oggetto capitale a partire dai sui campi (va usata solo questa per creare ogg capitale)
capitale *capitale_crea(char *s, double lat, double lon)
{
  assert(s!=NULL); // nome valido 
  assert(lat>= -90 && lat <= 90); // latitude valida 
  assert(lon>= -180 && lon <= 180); // longitude valida
  capitale *a = malloc(sizeof(*a)); // alloco l'oggetto capitale 
  if(a == NULL) termina("Malloc error : insufficient memory");
  a->nome = strdup(s);  // inizializzo il nome -> creo stringa con strdup
  /*STRDUP : 
  La funzione prende una stringa come argomento e restituisce un puntatore 
  a una nuova area di memoria allocata dinamicamente contenente la copia della stringa di origine. 
  È responsabilità del chiamante liberare la memoria allocata dinamicamente utilizzando la funzione free 
  quando la stringa duplicata non è più necessaria.
  */
  a->lat = lat; // inizializzo il latitudine 
  a->lon = lon; // inizializzo il logintudine 
  return a; // ritorno l'oggetto capitale 
}

// distrugge (dealloca) un oggetto capitale 
void capitale_distruggi(capitale *a) // -> deve esser corrispondente a ciò che alloco dentro la funzione che crea l'oggetto capitale 
{
  free(a->nome); // de alloca il nome (lo avevo allocato con strdup)
  free(a); // de alloca l'oggetto capitale 
}


// legge un oggetto capitale dal file f
// restituisce il puntatore all'oggetto letto
// oppure NULL se non riesce a leggere dal file
capitale *capitale_leggi(FILE *f)
{
  assert(f!=NULL);
  char *s;
  double lat, lon;
  int e = fscanf(f,"%ms %lf %lf",&s,&lat,&lon); // -> leggo dal file f
  // -> leggo una stringa con %ms e due double con %lf (associo il valore di ciò che trovo ai puntatori di s, lat e lon con operatore &)
  if(e!=3) // verifico che la lettura sia andata a buon fine (-> se leggo un numero di oggetti diverso da 3 ho problemi)
     return NULL; // -> ritorna NULL anche se il file termina 
  capitale *c = capitale_crea(s,lat,lon); // creo oggetto capirale con l'apposita funzione 
  free(s); // de alloco s che avevo allocato con fscanf 
  return c; // -> ritorna l'oggetto capirale 
}

//legge e restituisce un array di capitali *
capitale **capitale_leggi_file(FILE *f, int *num) // *f riferimento (puntatore) al file, *num (puntatore intero) -> numero di elementi che avrò nell'array
{
  assert(f!=NULL); // controllo file 
  int size=10; // dimensione attuale dell'array
  int messi=0; // numero di elementi attualmente nell'array
  capitale **a = malloc(size*sizeof(capitale *)); // alloco a (array di puntatori a obj capitale)
  if(a==NULL)
    termina("Memoria insufficiente");
    
  while(true) {
    capitale *b = capitale_leggi(f); 
    if(b==NULL) break; // => ho finito le capitali dal file di lettura -> mi stoppo 

    if(messi==size) {
        // ingrandisco l'array
        size = size*2;
        a = realloc(a,size*sizeof(capitale *));
        if(a==NULL)
          termina("realloc fallita");
    }
    assert(messi<size);
    a[messi] = b;
    messi += 1;
  }
  // ho messo tutti gli elementi che mi interessavano
  size = messi;
  a = realloc(a,size*sizeof(capitale *)); // realloc con size finale per non avere eccessi 
  if(a==NULL)
    termina("realloc fallita");
  
  // salvo il numero di elementi e restituisco l'array a (di puntatori a capitali)
  *num = messi;
  return a;  
}


// --------------------------------------------------------
// ordinamento di un array di puntaori a capitale

// confronto latitudini ordinando da nord a sud
int capitale_cmp_lat(capitale *a, capitale *b)
{
  if(a->lat > b->lat) return -1;
  else if(a->lat < b->lat) return 1;
  return 0;
}
// confronto latitudini ordinando da sud a nord 
int capitale_cmp_latsud(capitale *a, capitale *b)
{
  if(a->lat > b->lat) return 1;
  else if(a->lat < b->lat) return -1;
  return 0;
}
// confronto dei nomi
int capitale_cmp_nome(capitale *a, capitale *b)
{
  if(strcmp(a->nome,b->nome)<0) return -1;
  else if(strcmp(a->nome,b->nome)>0) return 1;
  return 0;// confronto latitudini da nord a sud
  // posso scrivere semplicemente 
  //   return strcmp(a->nome,b->nome);
}

// esegue il merge di due array di stringhe
void merge(capitale *a[], int na, capitale *c[], int nc, 
           capitale *b[], 
           int (*cmp)(capitale *,capitale *)) 
{
  assert(a!=NULL && c!=NULL && b !=NULL);// verifiche 
  int n = na+nc;  // lunghezza array risultato
  int ia,ib,ic;   // indici all'interno degli array
  ia=ic=ib=0;
  
  // eseguo merge riempiendo il vettore b
  for(ib=0;ib<n;ib++) {
    if(ia==na)
      b[ib] = c[ic++];
    else if(ic==nc)
      b[ib] = a[ia++];    
    //else if(  a[ia]->lat >  c[ic]->lat   )     // ordina per latitudine decrescente
    else if(  strcmp(a[ia]->nome,c[ic]->nome)<0 ) // ordina per nome
    //else if(cmp(a[ia],c[ic])<0)              // ordina secondo la funzione cmp()
      b[ib] = a[ia++];
    else 
      b[ib] = c[ic++];
  }
  // verifica tutti gli indici sono arrivati in fondo
  assert(ia==na);
  assert(ic==nc);
  assert(ib==n);
}


// ordina un array di puntatori a capitale con il mergesort
// cmp() è la funzione di confronto che definisce l'ordinamento
void mergesort(capitale *a[], int n, int (*cmp)(capitale *,capitale *)) // *a[] posso scriverlo come **a (-> a è un array di puntatori a ogg capitale)
{
  assert(a!=NULL);
  assert(n>0);
  
  // caso base
  if(n==1) return;
  
  int n1 = n/2;     // dimensione prima parte
  int n2 = n - n1;  // dimensione seconda parte
  
  mergesort(a,n1,cmp);
  mergesort(&a[n1],n2,cmp); // &a[n1] potevo scriverlo a+n1
  
  // ho le due metà ordinate devo fare il merge  
  capitale **b = malloc(n*sizeof(*b)); // *b indica cosa c'è denro b (dimensione dell'oggetto a cui punta b)
  if(b==NULL) termina("malloc fallita nel merge");
  
  merge(a,n1,&a[n1],n2,b,cmp);  // prendo le due metà ordinate e le copio 
  
  // copio il risultato da b[] ad a[]
  for(int i=0;i<n;i++)
    a[i] = b[i]; // copio i puntatori da b ad a 
  
  free(b);
}

// -------------------------------------------------------------


int main(int argc, char *argv[])
{

  if(argc!=2) {
    printf("Uso: %s nomefile\n",argv[0]);
    exit(1);
  }
  // legge i dati sulle capitali dal file 
  FILE *f = fopen(argv[1],"r"); // apro file in lettura 
  int n;
  capitale **a = capitale_leggi_file(f, &n); 
  // -> a = array di puntatori a ogg capitali di dimensione n 
  fclose(f);
  
  // ordino elenco capitali da sud a nord
  mergesort(a,n,&capitale_cmp_latsud);

  // stampa elenco capitali
  for(int i=0;i<n;i++)
    capitale_stampa(a[i], stdout);

  puts("-------------");

  // ordino elenco capitali da sud a nord
  mergesort(a,n,&capitale_cmp_nome);

  // stampa elenco capitali
  for(int i=0;i<n;i++)
    capitale_stampa(a[i], stdout);

  // dealloca le singole capitali e l'array
  for(int i=0;i<n;i++) // ciclo che prende ogni singola capitale e la de alloca con l'apposita funzione 
    capitale_distruggi(a[i]);
  free(a); // dealloco a 
  
  return 0;
}

// stampa su stderr il  messaggio che gli passo
// se errno!=0 stampa anche il messaggio d'errore associato 
// a errno. dopo queste stampe termina il programma
void termina(const char *messaggio)
{
  if(errno==0) fprintf(stderr,"%s\n",messaggio);
  else         perror(messaggio);
  exit(1);
}
 