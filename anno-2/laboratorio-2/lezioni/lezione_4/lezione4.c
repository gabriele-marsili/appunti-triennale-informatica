#define _GNU_SOURCE // => uso estensioni GNU
#include <stdio.h>  // => scanf print etc ... (metodi ?)
#include <stdlib.h> // =>gestisce i booleani
#include <stdbool.h> // 
#include <assert.h> // => permette l'uso della funzione assert
#include <string.h> // funzioni di confronto / copia / etc

/*
se nel programma ho più funzioni devo lasciare la funzione main (la prima eseguita)
in fondo al programma.
Se il programma vede la chiamata di funzione per la prima volta senza averla vista prima 
il p. suppone un num. di parametri n e che restituisca un intero (viene dichiarata implicitamente con questo comportamento).
=> ciò porta il programma ad eseguire una funzione in modo diverso da come sarebbe 
(il funzionamento della f. è quello che il programma li da' di default : stampare un numero).
=>viene mostrato un warning.

=> per non avere questi warning / errori in programmi complessi è necessario mettere il PROTOTIPO delle funzioni ad inizio programma:

void termina(char *msg); // prototipo:

l'uso di alcune funzioni - es mallock - senza dichiarare il prototipo è dovuto a #include <stdio.h>:
in tal file ci sono dichiarati anche i prototipi di determinate funzioni.

manc +nomefunzione da' info (compresi prototipi) sulla funzione
(es: manc malloc)


*/


// da compilare con:
//  gcc -std=c11 -Wall -O -g -o elenco_primi_fun elenco_primi_fun.c

void termina(char *msg); // prototipo



// Scopo del programma:
//  mostrare come si dichiarano e utilizzano le funzioni che 
//  hanno degli array come parametri di input e/o output


// dato k restituisco true se è primo, false altrimenti
bool primo(int k){
  if(k%2==0)
    return k==2;
  // era uguale scrivere
  //   if(k==2) return true;  
  //   else return false;
  // ma scrivere return k==2 è più breve e (per me) più chiaro  

  // mi occupo del caso k dispari
  for(int i=3; i<k; i+=2 ) {
    if(k%i==0) return false; // ho scoperto che il numero non è primo
    if(i*i>k) break;
  }
  return true;
}


void termina(char *msg){ // termina il programa con il messaggio passato come argomento 
    // uso asterisco per prenere il valore di msg (ciò perché in msg ho solo il puntatore)
    puts(msg);
    exit(1); // devo per forza scrivere exit se voglio terminare il programma (altrimenti - con return - il la funzione ritornerebbe il risultato alla funzione chiamante)
}

// prende intero n, returna arr di primi <= n
int *elenco_primi(int n, int *p){ // *p corrisponde al valore interno alla cella di memoria il cui numero è in p
    printf("valore di p: %ld\n", (long)p); // long e %ld mi serve a stampare e trasformare *p in un intero a 64 bit
    printf("valore a cui punta  p: %d\n", *p);
    
    //crea arr dinamico inizialmente di 10 elementi
    int *a; // dichiaro che a sarà usata come array 
    int size = 10; //dimensione attuale dell'arr (data arbitrariamente)
    int messi = 0; // nuumero di elementi attualmente inseriti nell'array
    a = malloc(size*sizeof(int)); // array di dimensione variabile

    if(a == NULL){ // controllo
        termina("Malloc fallita"); // richiamo la funzione che fa terminare il programma passandoci il messaggio da stampare come argomento
    }
    
    //riempio arr:
    for(int i=2; i<=n; i++){


        if(primo(i)){
            // se l'intero i è primo lo inserisco
            // nella tabella dei primi
            // ma prima verifico che ci sia spazio
            if(messi == size){
                size = 2*size;// se la tabella è piena raddoppio la dimensione
                a = realloc(a,size*sizeof(int));
                if(a == NULL) termina("realloc failed");

            }
            // inserisco il numero primo i dentro a[] es incremento counter "messi"

            a[messi] = i;
            messi+=1;
        }
    }
    // tabella completata
    // riduco array alla dimensione minima
    a=realloc(a,messi*sizeof(int));
    if(a == NULL) termina("realloc failed");
    *p = messi; //va a scrivere in quati la dimensione dell'array
    return a;
}



//stampa arr che inizia in b e contiene k elementi
void stampa_array_int(int b[], int k)
{
  // stampa contenuto array, usando 8 caratteri per intero 
  for(int i=0;i<k;i++) {     
    printf("%8d",b[i]);                    
  }
  printf("\nNumero di elementi: %d\n", k);
}


int main(int argc, char*argv[]){
    int n;
    printf("inserisci un numero");
    int e = scanf("%d",&n);
    if(e!=1){// => se e != 1 utente ha messo più / meno di 1 elemento 
        // {} blocco, ; vengono usari per separare i comandi, l'identazione del codice non viene vista nell'esecuzione
        termina("Valore non trovato"); // stampa (output) all'utente        
    }
    if(n<=0){
        termina("Numero di elementi non valido");        
    }
    if (n<2) termina("non ci sono numeri primi"); // (0 non viene contato come n primo)
    
    // i primi verranno messi nell'array a[] che
    // avra' `quanti` elementi
    int *a; // dichiaro che a sarà usata come array 
    int quanti = 1234321; // valore random che sarà sovrascrtto (potevo benissimo evitare di scriverlo)
    printf("Indirizzo di quanti: %ld\n", (long) &quanti);
    //usando il puntatore
    // elenco_primi scrive in quanti la dimensione dell'array
    a = elenco_primi(n, &quanti); // &quanti passa l'indirizzo di memoria di quanti, in cui viene messo il valore relativo alla quantità di el. di a 

    //stampo elementi di a[]:
    stampa_array_int(a, quanti);

    
    free(a); // libero la memoria
    return 0;
}



/* concetto di main file
se scrivo make nella riga di comando viene eseguito il makefile:


# definizione del compilatore e dei flag di compilazione
# che vengono usate dalle regole implicite
CC=gcc // => il mio compilatore è il programma gcc
CFLAGS=-std=c11 -Wall -O -g // elenco dei flag di compilazione inserito in una variabile 
LDLIBS=-lm // specifico la libreria che viene usata al momento in cui viene creato l'eseguibile

# elenco degli eseguibili da creare
all: somma sommad primi elenco_primi_fun // => elenco di tutti gli eseguibili che voglio creare 

*/


// pdf sulle stringhe e caratteri : https://github.com/Laboratorio2B/2324-Lab2B/blob/main/01introC/ArgcArgv.pdf 