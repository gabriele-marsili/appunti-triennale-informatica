#define _GNU_SOURCE   // avverte che usiamo le estensioni GNU 
#include <stdio.h>    // permette di usare scanf printf etc ...
#include <stdlib.h>   // conversioni stringa/numero exit() etc ...
#include <stdbool.h>  // gestisce tipo bool (per variabili booleane)
#include <assert.h>   // permette di usare la funzione assert
#include <string.h>   // funzioni di confronto/copia/etc di stringhe
#include <errno.h>    // necessaria per usare errno

// le istruzioni qui sopra leggono i prototipi di alcune funzioni di libreria


// Scopo del programma:
//  mostrare la struttura dell'array argv contenente i parametri
//    passati sulla linea di comando
//  mostrare la differenza fra copiare un puntatore e copiare
//    il contenuto dell'array (funzione strdup)


// stampa un messaggio d'errore e termina il programma
void termina(char *messaggio)
{
  puts(messaggio);
  exit(1);
}


int main(int argc, char *argv[])
{
  
  // stampo gli elementi di argv[] come stringhe
  for(int i=0;i<argc;i++)
    printf("argv[%d]: %p  %s \n", i, argv[i], argv[i]); // => i caratteri normali vengono stampati così come sono
    // => i caratteri preceduti da % sono i parametri in più passati a printf
    // %p = stampa il puntatore (argv[i] visto come puntatore )
    // %s = stampa la stringa (argv[i] visto come stringa )
  puts("---- fine ----");
  
  //return 1;
  
  // questo crea variabile primo che punta alla stessa stringa di argv[0]
  // char *primo = argv[0];

  
  // come creare una stringa indipendente:
  
  // 1. metodo "manuale": non usare : 
  // alloco la memoria
  // char *primo = malloc(strlen(argv[0])+1); //=> +1 per allocare lo 0 in fondo
  // copio il contenuto (un carattere alla volta)
  // for(int i=0;i<strlen(argv[0])+1;i++)
  //  primo[i] = argv[0][i];
    
  // 2. metodo "automatico": uso strdup() che fa tutto lei  
  char *primo = strdup(argv[0]);  //=> primo è indipendente (cambiando un carattere di primo non modifico più argv[0])
  // strdup alloca della memoria che alla fine devo de-allocare con la free 
  
  // modifico carattere primo[1]
  primo[1] = 'X';  // fondamentale singolo apice ' invece di "    
  
  // stampo stringa primo e ristampo le stringhe di argv[]
  printf("primo: %p  %s \n", primo, primo);
  for(int i=0;i<argc;i++)
    printf("argv[%d]: %p  %s \n", i, argv[i], argv[i]);
  puts("---- fine ----");
   
  // dealloco la memoria usata da primo
  free(primo);
  // Nota: gli argv[i] non vanno dellocati perchè non sono
  //       stati creati con malloc() 
  return 0;
}





//----------------------------------------------------------------

// Scopo del programma:
//  mostrare come si crea un file di testo 
/*prende un intero n, calcola i primi da 1 a n, li inserisce in un file di testo*/
// nel comando : nome eseguibile, numero , nome file da creare

// dato k restituisco true se è primo, false altrimenti
bool it_s_primo(int k)
{
  assert(k>0);
  if(k%2==0)
    return k==2; // se k è pari allora è primo se e solo se k==2

  // mi occupo ora del caso k dispari
  assert(k%2!=0);
  for(int i=3; i<k; i+=2 ) {
    if(k%i==0) return false; // ho scoperto che il numero non è primo
    if(i*i>k) break;
  }
  return true;
}


// stampa un messaggio d'errore e termina il programma
void termina_2(char *messaggio)
{
  // oltre al mio messaggio stampa il messaggio
  // associato alla variabile globale errno 
  // utilizzando la funzione di libreria perror()
  perror(messaggio);
  // in c l'ultimo esito dell'ultima chiamata di sistema viene inserito in una variabile di sistema (errno) che di default ha valore 0
  // se il valore di errno è != 0 allora posso stampare l'ultimo val. di tale variabile tramite perror
  exit(1);
}


int main_2(int argc, char *argv[])
{
  // verifica siano stati forniti esattamente 2 parametri 
  if(argc!=3) {
    printf("Uso: %s N nome_file\n",argv[0]); // => viene stampato il nome dell'eseguibile 
    return 1;
  }

  // converte il primo parametro in un intero
  int n = atoi(argv[1]); // intero passato in linea di comando (il numero n a cui vanno calcolati i primi)
  // atoi restituisce 0 se la conversione stringa-numero non è riuscita (es: se inserisco "ciao" in linea di comando)
  if(n<=0) termina_2("Il parametro n deve essere positivo");
  
  // copia il puntatore nella variabile nome_file
  char *nome_file = argv[2];
  
  // apro il file in scrittura
  FILE *f = fopen(nome_file,"wt"); // => w = file di scrittuea (se c'era contenuto viene perso / altrimeniti crea nuovo contenuto)
  // t => inserisco contenuto testuale nel file
  // in f va un puntatore al file (il valore nella cella di memoria corrispondente + una serie di informazioni necessarie per l'apertura del file)
  // controllo sull'apertura del file (se non avviene correttamente f prende valore null)
  if(f==NULL) termina_2("Apertura file fallita");

  // (se non inserisco il controllo il compilatore non lancia un'eccezione, avrò un errore solo quando eseguirò un'azione con il file in questione)
  
  // cerca i primi da 2 a n e li scrive dentro il file
  for(int i=2;i<=n;i++)
    if(it_s_primo(i)) {
      int e = fprintf(f,"%d\n",i); //scrive i nel file (stesso comportamento della printf, tranne che come primo parametro va passato il file in cui si vuole scrivere)
      // fprintf restituisce un valore intero <0 se ho uun errore nella scrittura => controllo:
      if(e<0) termina_2("Errore nella scrittura");
    }  

  // chiudi il file e termina 
  if(fclose(f)==EOF) // => chiamo fclose(f) direttamente nell'if e vedo se la chiusura è andata a buon fine 
    termina_2("Errore chiusura file");; 
   
  return 0;
}




//----------------------------------------------------------------
//LEGGI PIRMI : 


// le istruzioni qui sopra leggono i prototipi di alcune funzioni di libreria

// da compilare con:
//  gcc -std=c11 -Wall -O -g -o scrivi_primi scrivi_primi.c

// Scopo del programma:
//  mostrare come si legge da un file di testo 



// stampa un messaggio d'errore su stderr e termina il programma
void termina_3(char *messaggio)
{
  // se errno!=0 oltre al mio messaggio stampa il messaggio
  // associato alla variabile globale errno 
  // utilizzando la funzione di libreria perror()
  if(errno!=0) perror(messaggio);
  // altrimenti stampa solo il mio messaggio
  else fprintf(stderr,"%s\n", messaggio);
  exit(1);
}

// legge gli interi che sono nel file f
// e li salva in un array che viene restituito
// con return + passaggio per riferimento
int *leggi_file(FILE *f, int *num_elementi)
{
  assert(f!=NULL); // il file deve essere valido
  int size=10; // dimensione attuale dell'array
  int messi=0; // numero di elementi attulamente nell'array
  int *a = malloc(size*sizeof(int));
  if(a==NULL)
    termina("Memoria insufficiente");
    
  while(true) {
    int n;
    int e = fscanf(f,"%d",&n); // lettura di un singolo carattere alla volta
    if(e==EOF) break; // > stoppo il while se trovo un errore (prima o poi trovo questa situazione: quando arrivo in fondo al file / se ho err)
    if(e!=1) termina("Contenuto illegale nel file");
    // ho letto un intero dal file ed è stato messo in n
    if(messi==size) {
        // ingrandisco l'array
        size = size*2;
        a = realloc(a,size*sizeof(int));
        if(a==NULL)
          termina("realloc fallita");
    }
    assert(size>messi);
    a[messi] = n;
    messi += 1;
  }
  // ho messo tutti gli elementi che mi interessavano
  size = messi;
  a = realloc(a,size*sizeof(int));
  if(a==NULL)
    termina("realloc fallita");  
  // salvo il numero di elementi e restituisco l'array  
  *num_elementi = messi;
  return a;  
} 

// visualizza elementi array di un qualsiasi 
// array di int sul terminale
void stampa_array(int *a, int n)
{
  assert(a!=NULL);
  // stampo il contenuto dell'array
  for(int i=0;i<n;i++)
    fprintf(stdout,"%8d",a[i]); // stampo gli elementi in un campo di 8 caratteri
  fprintf(stdout,"\nIn totale l'array contiene %d interi\n",n);
  fprintf(stderr,"Ho finito!\n");
}


int main_3(int argc, char *argv[])
{
  // verifica siano stati forniti esattamente 2 parametri 
  if(argc!=2) {
    printf("Uso: %s nome_file\n",argv[0]);
    return 1;
  }
  // copia il puntatore nella variabile nome_file
  char *nome_file = argv[1];
  
  // apro il file in lettura 
  FILE *f = fopen(nome_file,"rt"); // aprtura file con r e t perché file di txt
  if(f==NULL) termina("Apertura file fallita");

  int n; // numero di elementi nell'array
  int *a = leggi_file(f,&n);

  // stampo gli elementi dell'array
  stampa_array(a,n);
  free(a);

  // chiudi il file e termina 
  if(fclose(f)==EOF)
    termina("Errore chiusura file");; 
   
  return 0;
}

