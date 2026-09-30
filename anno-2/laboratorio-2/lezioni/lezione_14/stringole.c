//lezione 14 - 3/11/2023
#define _GNU_SOURCE   // avverte che usiamo le estensioni GNU 
#include <stdio.h>    // permette di usare scanf printf etc ...
#include <stdlib.h>   // conversioni stringa exit() etc ...
#include <stdbool.h>  // gestisce tipo bool
#include <assert.h>   // permette di usare la funzione ass
#include <string.h>   // funzioni per stringhe
#include <errno.h>    // richiesto per usare errno

void termina(const char *messaggio);

// definizione struct che rappresenta
// un elemento di una lista di stringhe
typedef struct stringola {
  char *str; // puntatore a stringa 
  struct stringola *next; // puntatore a prossimo elemento della lista (di tipo stringola)
} stringola; 


// solite funzioni per creazione, distruzione, stampa della lista
stringola *stringola_crea(char *s)
{
  stringola *a  = malloc(sizeof(*a));
  a->str = strdup(s); // creo una copia di s e l'assegno al nome
  a->next = NULL;
  return a;
}

void stringola_distruggi(stringola *a) // a = puntatore a var di tipo stringola  
{
  free(a->str); // dealloco la stringa nella variabile stringola 
  free(a); // dealloco a 
}

void stringola_stampa(stringola *a, FILE *f) { // puntatori a var stringola ed a file 
  fprintf(f,"%-20s\n",a->str); // stampo i primi 20 caratteri della stringa
}

void lista_stringola_stampa(stringola *lis, FILE *f) //passo una stringola e un file (puntatori)
{
  while(lis!=NULL) { // check che la stringola esista
    stringola_stampa(lis,f); // stampo la stringola corrente 
    lis = lis->next; // scorro alla successiva stringola 
  }
}

void lista_stringola_distruggi(stringola *lis)
{
  if(lis!=NULL) {
    lista_stringola_distruggi(lis->next);
    stringola_distruggi(lis);
  }
}

// input lis: lista di stringole può essere vuota 
// ma deve essere ordinata lessicograficamente
// c: stringola da inserire deve esistere c!=NULL
// outpu:t la nuova lista con c inserita matenendo l'ordine
stringola *lista_stringola_inserisci_lex(stringola *lis, stringola *c) 
{
  assert(c!=NULL);
  if(lis==NULL) { // se la lista è vuota  
    c->next = NULL; // non ho il successore di c
    return c; // ritorno c (ovvero la lista)
  }
  if(strcmp(c->str,lis->str)<0) { // comparo la stringa in c e quella in lista 
    // il nome in c è il più piccolo
    // diventa lui il primo elemento
    c->next = lis; //metto lis come successore di c (=> c diviene il primo elemento)
    return c; // ritorno c (ovvero l'head della lista)
  }
  else {
    // lis rimane il primo elemento, quindi restituisco lui
    // seguito dal resto della lista in cui la ricorsione
    // ha piazzato c al posto giusto
    lis->next = lista_stringola_inserisci_lex(lis->next,c);
    return lis;
  }
}


// "elimina" gli spazi in testa a una stringa
// restituisce un puntatore alla prima posizione
// che non è uno spazio
char *elimina_spazi_testa(char s[]) // s = stringa (arr caratteri)
{
  int i=0;
  while(s[i]==' ') // scorro finché il carattere corrente è lo spazio: ' '
    i++;
  assert(s[i]!=' '); // asseriso che s[i] sia != da ' '
  return &s[i]; // -> restituisco il puntatore alla prima posizione che è != da ' '
}


// main che legge le linee e le spezza al ;
// poi inserisce le stringhe in una lista ordinata
int main(int argc, char *argv[])
{

  if(argc!=2) {
    printf("Uso: %s nomefile\n",argv[0]);
    exit(1);
  } 
  FILE *f = fopen(argv[1],"r");
  if(f==NULL) termina("Errore apertura file");

  // costruzione lista stringhe leggendo dal file
  // ogni linea del file puo' contenere piu' stringhe
  // le stringhe posso contentenere degli spazi
  stringola *lista=NULL;  // lista vuota (con struct stringola)
  
  // ciclo di lettura dal file f
  char *buffer=NULL;    // usate da getline() ->
  size_t n=0; //-> lunghezza del testo
  while(true) {
    //leggi linea dal file
    size_t e = getline(&buffer,&n,f); // f = file, n = puntatore a variabile intera, buffer = puntatore a puntatore a carattere
    /*getline legge linea da file memorizzando l'indirizzo del testo nel primo parametro
    il buffer include l'andare a capo e legge fino a lì
    se buffer è null e n è 0 allora getline alloca un buffer (che poi va deallocato) anche se fallisce
    
    È possibile passare un buffer allocato, in tal caso se la memoria non è sufficiente 
    allora getline realloca il buffer e sistema n (azioni che hanno effetto su tutto il codice) 
    (nell'esempio il buffer auto-creato da getline viene reallocato automaticamente)*/

    // e = numero caratteri letti 
    // e = -1 in caso di errore  / fine file 
 
    if(e<0) { // assumiamo sia finito il file
      free(buffer);  // dealloco il buffer usate per contenere le linee 
      break;  
    }
    //fprintf(stderr,"n=%zd, buffer=%s",n,buffer); // => legge una riga alla volta e la stampa
    
    // esegue il parsing di buffer
    //input = stringa (che non è costante), delimitatore secondo cui voglio spezzare la stringa (costante)
    /*prima chiamata = passo la stringa che voglio che venga sistemata
    altre chiamate = passo NULL per continuare parsing sulla stringa 
    strok si ricorda l'ultima cosa che sta tockenizzando
    strok ritorna la prima parte (se ho ciao;bello ritorna ciao e poi bello)
    strok sfrutta le variabili statiche per mantenee in memoria la l'ultima stringa
    strok setta un puntatore sulla stringa per ricordarsi la posizione della stringa in cui è arrivato*/
    char *s = strtok(buffer,";\n"); //  -> processa la riga separando in base al punto e virgola
    while(s!=NULL) { // check sul return di strok (è null quando ha finito)
      s = elimina_spazi_testa(s); //-> elimino gli spazi (in s ho il puntatore al primo carattere != da ' ' di s)
      if(s[0]!='\0') { // controllo che s sia diverso dal carattere che mi identifica la fine della stringa
        stringola *c = stringola_crea(s); // creo la stringola avente s come stringa 
        // aggiungo la stringa alla lista (mantenendo ordine lessicografico)
        lista = lista_stringola_inserisci_lex(lista,c);
      }
      s = strtok(NULL,";\n"); // -> continuo il parsing sulla stringa corrente (ottengo l'iesimo pezzo)
    }

    // ho messo tutte le stringhe date da strtok
  } // end while del getline
  fclose(f);
  lista_stringola_stampa(lista,stdout); // stampo la lista 
  lista_stringola_distruggi(lista); // dealloco tutto
  return 0;
}




// stampa su stderr il  messaggio che gli passo
// se errno!=0 stampa anche il messaggio d'errore associato 
// a errno. dopo queste stampe termina il programma
void termina(const char *messaggio)
{
  if(errno==0) 
     fprintf(stderr,"%s\n",messaggio);
  else 
    perror(messaggio);
  exit(1);
}


