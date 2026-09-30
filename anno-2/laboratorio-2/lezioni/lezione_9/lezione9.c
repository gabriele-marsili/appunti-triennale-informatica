//array di coppie
#define _GNU_SOURCE   // avverte che usiamo le estensioni GNU 
#include <stdio.h>    // permette di usare scanf printf etc ...
#include <stdlib.h>   // conversioni stringa exit() etc ...
#include <stdbool.h>  // gestisce tipo bool
#include <assert.h>   // permette di usare la funzione assert
#include <string.h>   // funzioni per stringhe
#include <errno.h>    // rischiesto per usare errno

// prototipi delle funzioni che appaiono dopo il main()
void termina(const char *messaggio);

// Scopo del programma:
// Mostrare come si definiscono e usano le struct


// keyword typedef: per definire sinonimi di tipi esistenti
// volendo posso scrivere ad esempio
typedef int intero;
typedef int *puntatore_a_int;
// nel resto del programma posso scrivere "intero" invece di "int"
// e "puntatore_a_int" invece di "int *"

intero num = 10 ; 
puntatore_a_int p;// es : p è una variabile puntatore (a intero)
p = &num; 

// uso combinato di struct (definisce nuovi tipi)
// e typdef (definisce un sinonimo)
// definisco la struct duetto
// dico che coppia è sinonimo di struct duetto
typedef struct duetto {
  int primo;
  int secondo;
  //char carattere; // 1 byte  
  //char *nome; // non ho necessità di dover inserire tutte variabili dello stesso tipo 
} coppia;
// -> creazione di uno nuovo tipo struct duetto 
// -> coppia = sininimo di struct duetto


//posso anche definire lo struct assegnandoli direttamente il sinonimo : 
typedef struct {
  int primo;
  int secondo;  
} coppia_diretta; 


// scambia le componenti: attenzione il passaggio avviene per valore 
struct duetto scambia(struct duetto d) // -> passaggio per VALORE 
{ // -> scambia riceve una COPIA dell'oggetto passato, non modifica l'ogg originale (su quello di partenza)
// => se voglio cambiare il valore dell'oggetto originale devo passare il puntator di tale oggetto -> dovrei inoltre avere qualcosa del tipo : struct duetto *d
  intero tmp = d.primo;
  d.primo = d.secondo;
  d.secondo = tmp;
  return d;
}

// => se voglio cambiare il valore dell'oggetto originale devo passare il puntator di tale oggetto :
void incrementa(coppia *a){ // -> passaggio per riferimento 
    (*a).primo += 1; // -> queste modifiche impattano sul chiamante 
    (*a).secondo += 1; // -> nel main avrò i valori dell'oggetto originale incrementati
}


// -> mi stampa la coppia nel file f 
void coppia_stampa(coppia a, FILE *f) {
  fprintf(f,"(%d,%d)\n",a.primo,a.secondo);
}

// solitamente per stampare la struct si passano i puntatori poiché copiare ogni valore della struct costa molto se la struct ha tanti campi
void pcoppia_stampa(const coppia *a, FILE *f) { // best practice (uso di const per chiarire che non cambio il valore della coppia passata)
  fprintf(f,"(%d,%d)\n",(*a).primo,(*a).secondo);
}
//*a. scrittura ambigua
// 1-> prendi ogg a, prendi a.primo e poi fai asterisco a ciò che punta a.primo 
// 2-> prendi a, applichi asterisco e poi ci applichi .primo (ciò che vogliamo noi)
// => dobbiamo usare le parentesi -> (*a)
// ciò perché . ed * sono operatori (come +, / ecc) 
// -> con . ed * il . ha la priorità (dato che vogliamo fare il contrario devo mettere le parentesi, come se facessi (1+2)*3 invece di 1+2*3 )

//convenzione : (*a).primo lo posso scrivere come a->primo
// (*a). = a->primo


int *puntatoreInt; // => tutte le volte che scrivo *puntatoreInt ottengo un intero 
// => tutte le volte che scrivo *a avrò una coppia (=> posso prendere le componenti .primo e .secondo)

int main(int argc, char *argv[])
{
  coppia *a; // dichiarazione di array di coppia = array in cui andranno solo variabili (obj) di tipo coppia

  if(argc <3 || argc%2==0) { // verifica che vengano passati un num n positivo pari di interi 
    printf("Uso: %s un numero positivo pari di interi\n",argv[0]);
    exit(1);
  }

  int n = (argc-1)/2;  // dimensione di a  == numero coppie = num parametri passati su linea comando (- il nome file) / 2 
  a = malloc(n*sizeof(coppia)); // -> allocazione memoria per a
  if(a==NULL) termina("allocazione fallita");

  for(int i=0;i<n;i++) { // inserisco le coppie in a dagli argv (parametri)    
    a[i].primo = atoi(argv[2*i+1]); //indici dispari iniziando da 1
    a[i].secondo = atoi(argv[2*i+2]);  // indici pari iniziando da 2
    incrementa(&a[i]); // -> passaggio per riferimento 
  }

  for(int i=0;i<n;i++) {// stampo 
    if(i%2==0) coppia_stampa(a[i], stdout);  
    else pcoppia_stampa(&a[i], stdout);  
  }
  free(a); // dealloco 
  return 0;
}


// stampa su stderr il messaggio che gli passo
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