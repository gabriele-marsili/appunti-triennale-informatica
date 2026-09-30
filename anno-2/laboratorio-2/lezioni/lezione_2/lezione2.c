#define _GNU_SOURCE // => uso estensioni GNU
#include <stdio.h>  // => scanf print etc ... (metodi ?)
#include <stdlib.h> // =>gestisce i booleani
#include <assert.h> // => permette l'uso della funzione assert
#include <string.h> // funzioni di confronto / copia / etc

//int n ;
//n= 1;
//int a[n]; // => crea la variabile a indicando che è un array di tipo intero avente dimensione n 
//(anche per questo n deve essere un valore intero > 0)
//questa è una definizione statica : l'array ha una determinata dimensione e tale dimensione rimane fissata
// questa definizione di array va usata il meno possibile 
// questa definizione di array usa 4byte * n
// questa var viene memorizzata nelo stack (che contiene tutte le variabili di tutte le procedure attive)
//=> lo stack ha dimensione limitata -> se l'array ha dimensione n elevata ho problemi 
//=> la dimensione dell'array non deve esser scelta dall'utente (o, in tal caso, sarebbero opportuni alcuni controlli)

//gli array è bene che abbiano dimensione dinamica! (array dinamici)
//=> la dfferenza: gli array statici vengono creari nello stack (non posso crearli grandi)
//gli array dinamici vengono messi nella heap (non nello stack) e possono avere dimensione grande 

/*
./ nomeFile => esegue sempre il file poiché viene specificata la directory 
*/


int main(int argc, char*argv[]){  // => parametri = argomento in output, argomenti in input 
  
    
    int n; // => definisco variabile di tipo intero n (interi del c non sono standard: hanno dimensione fissata - tipicamente a 32 bit, possono contenere val da -2^31 a +2^31)

    printf("Inserisci il numero degli elementi : "); //=> messaggio in output che spiega all'utente cosa fare
    
    int e = scanf("%d", &n); 
   

    if(e!=1){// => se e != 1 utente ha messo più / meno di 1 elemento 
        // {} blocco, ; vengono usari per separare i comandi, l'identazione del codice non viene vista nell'esecuzione
        puts("Valore non trovato"); // stampa (output) all'utente
        exit(1); // => termina il programma 
    }
    if(n<=0){ // => controlla che utente inserisca un numero positivo di elementi 
        printf("Numero di elementi non valido, deve esser positivo "); // stampa (output) all'utente
        exit(1);

    }

    //crea un arr DINAMICO e riempio:
    int *a; // dichiaro che a sarà usata come array: *indica che sarà un array con puntatore intero
    a = malloc(n*sizeof(int)); // chiede un blocco di memora al sistema e, se disponibile, lo assegna e restituisce la posizione che tale blocco ha nella ram
    //=> ora ho effettivamente un arr di n elementi -> in a ho il valore corrispondente alla zona di memoria ottenuta
    // sizeof ci passo un tipo e lui mi restituisce la quantità di byte che la mia macchina utilizza per rappresentare tale tipo (un intero in questo caso)

    if(a==NULL){ // => ciò controlla che il sistema abbia effettivamente potuto assegnare il blocco di memoria richiesto
        // se a == NULL > array non è stato creato: la mia richiesta non è andata a buon fine
        puts("Malloc fallita");
        exit(3);
    } // è una best practice controllare che l'array sia (o meglio non sia) NULL

    //l'utilizzo dell'array statico e dinamico è quasi sempre uguale:
    // ci accedo con a[inex] ecc...

    

    for(int i=0; i<n; i++){ // come in js 
        printf("Inserisci l'elemento di posto %d", i);
        //printf("Inserisci il %d", (i+1), "^ elemento"); // => 1^, 2^ ... elemento
        e = scanf("%d", &a[i]); // => mette in a[i] (nella posizione i esima dell'array a) il valore inserito dall'utente
        // in e viene messo il nuovo valore corrispondente al numero di elementi inseriti dall'utente (che deve essere 1)
        
        if(e!=1){// => se e != 1 utente ha messo più / meno di 1 elemento     
            puts("Valore non trovato"); // stampa (output) all'utente
            exit(1); // => termina il programma 
        }
        

    }

    //calcola e stampa la somma:
    int somma = 0; // inizializzo una var intera di nome somma con valore 0 
    for(int i = 0; i < n; i++){
        somma += a[i];
    }
    printf("Somma = %d", somma);

    //è una best practice restituire la memoria al sistema quando finisco di usare l'array
    free(a); // => faccio tornare al sistema la memoria che avevo chiesto per la creazione di a
    //da ora non devo più usare gli elementi di a ( a[0], a[1], a[2], a[3]... )
    
    //printf("Posizione che non dovrei usare: %d\n", a[0]);
    
    //nella variabile a ho ancora il valore della posizione di memoria ottenuta precedentemente, ma è un valore che il programma ora usa / può usare per fare altro 



    return main_2();

}


//ValGrind
/*
strumento che esegue il programma e va a controllare tutti gli utilizzi della memoria
accorgendosi quando utilizzo zone di memoria non mie / in modo errato

> comando: valgrind nomeFile

=> utile per dubug
mi dice posizione (riga errore), l'operazione (read / write), mi dice 
l'errore (es. che viene cercato un valore in un indirizzo di una zona di memoria che è stata liberata 
e mi dice in che riga essa è stata liberata)
Mi dice infine anche dove avevo allocato il blocco di memoria che ha un errore.

l'alternativa a ValGrind è usare il debug (scomodo in programma grande)

valGrind mi avvisa se (ad esempio in un for) vado ad accedere ad un indirizzo di memoria 
nell'array che non esiste
(> for int i = 0; i<=n; i++) con
n = dimensione di a (ovviamente non posso accedere ad a[n], poiché l'ultimo index è n-1)

valGrind mi avvisa se non svuoto memoria occupata che non uso più 
(es. se dimentico di fare la free di un array che non uso più)
*/

//esempio memoria statica / dinamica array:

/*
programma che legge un intero n e crea un arr dinamico che contiene i numeri primi <= n*/
int primo(int k){ // funzione che, dato un intero k, mi restituisce un valore di verità (booleano) numerico (0 = False / 1 True)
    for(int i=2; i<k; i++){ // scorre da 2 al numero inserito 
        if(k%i==0) { // controlla se k è divisibile per i dando resto 0 (=> se i è divisore intero di k)
            return 0; // => se trovo un divisore => k non è un numero primo (è divisibile per un numero != da 1 e da se stesso)
        }
    }
    //il for schippa i casi base (K = 0,/1,/2 )
    return 1; // k è primo (N.B: i numeri 0,1,2 son primi, non ho per questo necessità di fare il for controllandoli)
}

void termina(char msg){ // termina il programa con il messaggio passato come argomento 
    printf("%d", msg);
    exit(1);
    return;
}

int main_2(){
    int n;
    printf("inserisci un numero");
    int e = scanf("%d",&n);
    if(e!=1){// => se e != 1 utente ha messo più / meno di 1 elemento 
        // {} blocco, ; vengono usari per separare i comandi, l'identazione del codice non viene vista nell'esecuzione
        puts("Valore non trovato"); // stampa (output) all'utente
        exit(1); // => termina il programma 
    }
    if(n<=0){
        puts("Numero di elementi non valido");
        exit(2); // => termina il programma 
    }
    if (n<2) termina("non ci sono numeri primi"); // (0 non viene contato come n primo)

    int *a; 
    int size = 10; //dimensione attuale dell'arr (data arbitrariamente)
    int messi = 0; // nuumero di elementi attualmente inseriti nell'array
    a = malloc(size*sizeof(int)); // array di dimensione variabile

    if(a == NULL){ // controllo
        termina("Malloc fallita"); // richiamo la funzione che fa terminare il programma passandoci il messaggio da stampare come argomento
        //puts("Errore di memoria nella creazione dell'array");
        //exit(3); // => termina il programma 
    }
    

    for(int i=2; i<=n;i++){ // => ho già escluso C.B. di n < 2 (il minimo n che posso avere è quindi 2, in caso inserirò 1 nell'arr risultato)
        if(primo(i)){ // controllo che i sia un numero primo 
            // se l'inero i è primo lo aggiungo, ma prima verifico che ci sia spazio:
            if(messi == size){
                size = 2*size; // se la tabella è piena raddoppio la sua dimensione;
                a = realloc(a,size*sizeof(int)); // re alloca la memoria di a 
                if(a == NULL){ // ricontrollo a 
                    termina("Malloc fallita");                    
                }
            }
            a[messi] = i; // inserisco l'eelemento dopo tutti gli altri elementi già messi (messi-1 = indice dell'ultimo elemento inserito => messi = indidice del nuovo el da inserire)
            messi += 1; // incremento gli elementi attualmente inseriti nell'arr a 
        }
    }

    
    //stampo risultato e termino il programma
    printf("res:\n%d", a);
    free(a); // libero la memoria
    return 0;
}