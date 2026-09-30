/*
Introduzione ai puntatori.

Compiti:
24 ottobre 
24 novembre 


Puntatori in tutti i linguaggi, in c sono utilizzabili direttamente dall'utente.

*/


#define _GNU_SOURCE // => uso estensioni GNU
#include <stdio.h>  // => scanf print etc ... (metodi ?)
#include <stdlib.h> // =>gestisce i booleani
#include <stdbool.h> // 
#include <assert.h> // => permette l'uso della funzione assert
#include <string.h> // funzioni di confronto / copia / etc

/*programma che legge un intero n e crea un arr dinamico che contiene i numeri primi <= n*/

//inefficiente! 
bool primo(int k){ // funzione che, dato un intero k, mi restituisce un valore di verità (booleano) numerico (0 = False / 1 True)
    for(int i=2; i<k; i++){ // scorre da 2 al numero inserito 
        if(k%i==0) { // controlla se k è divisibile per i dando resto 0 (=> se i è divisore intero di k)
            return false; // => se trovo un divisore => k non è un numero primo (è divisibile per un numero != da 1 e da se stesso)
        }
    }
    //il for schippa i casi base (K = 0,/1,/2 )
    return true; // k è primo (N.B: i numeri 0,1,2 son primi, non ho per questo necessità di fare il for controllandoli)
}

//primo fatto automaticamente 
bool primo_better(int k){ // funzione che, dato un intero k, mi restituisce un valore di verità (booleano) numerico (0 = False / 1 True)
    if(k%2==0){
        return k==2;
    }
    
    for(int i=3; i<k; i+=2){ // scorre da 2 al numero inserito 
        if(k%i==0) { // controlla se k è divisibile per i dando resto 0 (=> se i è divisore intero di k)
            return false; // => se trovo un divisore => k non è un numero primo (è divisibile per un numero != da 1 e da se stesso)
        }
        
    }
    //il for schippa i casi base (K = 0,/1,/2 )
    return true; // k è primo (N.B: i numeri 0,1,2 son primi, non ho per questo necessità di fare il for controllandoli)
}


bool isPrime(int k){
    // se k è pari e diverso da 2 allora non è primo
    if(k%2 == 0 && k!=2)return false;
    for(int i=3; i*i<=k;i+=2){
        // se k è dispari e non è primo allora esiste un divisore <= swrt(k) che è dispari, quindi posso controllare solo i divisori di ... e fermarmi a sqrt(k)
        if(k%i==0) return false;
    }
    return true;
}

void termina(char *msg){ // termina il programa con il messaggio passato come argomento 
    // uso asterisco per prenere il valore di msg (ciò perché in msg ho solo il puntatore)
    puts(msg);
    exit(1); // devo per forza scrivere exit se voglio terminare il programma (altrimenti - con return - il la funzione ritornerebbe il risultato alla funzione chiamante)
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

    int *a; // dichiaro che a sarà usata come array 
    // a in questo modo non è un array, ma un PUNTATORE INTERO!
    // => maggiori info nelle slide: https://elearning.di.unipi.it/pluginfile.php/57605/mod_resource/content/0/Lezione3.pdf
    /*inizialmente nel programma ci sono svariate variabili intere scritte in 4byte(spazio che occupano) (32bit)    
    vi è anche uno spazio ben preciso che ogni variabile occupa : ogni variabile ha uno spazio preciso nella memoria. (la propria allocazione)

    l'array viene creato tramite la malloc, ma prima di essa devo creare un puntatore a intero (a*)
    al suo interno non ho un valore, bensì una variabile puntatore contiene l'indirizzo di una cella di memoria (la posizione di una cella di memoria)
    tramite il puntatore posso quindi accedere nello specidico alla posizione di memoria.
    La malloc va quindi nella memoria generale, cerca uno spazio (400bytes) e lo assegna all'array.
    La malloc restituisce quindi il valore dell'indirizzo della memoria relativo all'array che sto creando,
    tale valore viene inserito nella variabile a (valore in a è un intero che corrisponde all'indirizzo di memoria).

    a occupa 8 byte (non 4 come le variabili intere).

    quando uso l'array:
    a[0] = 2 => il valore 2 viene inserito nella posizione di memoria corrispettiva alla posizione di inizio dell'array (il secondo viene inserito nella posizione di memoria al primo e così via)

    a[7] = 23 : 
    prendo la variabile di memoria corrispondente ad a (12.000 ad esempio)
    per mettere il val 23 il c fa : 12.000 + 7*sizeof(int) (dove sizeof(int) = 4 byte)
    => per questo motivo devo specificare che tipo di puntatore ho : 
    la sua dimensione è necessaria per cercare i singoli elementi dell'array

    se vado oltre la dimensione che la memoria ha riservato per l'array c me lo fa fare, 
    ma se vado oltre ho un problema io (programmatore).
    se faccio a[50] = 2 avrò 2 nella posizione di memoria = a 50*sizeof(int)+12.000 -> corrisponde ad una posizione di memoria che va oltre il mio array, ma mi è permesso farlo, tuttavia dovrò gestirlo
    
    •Realloc e free:
    -Realloc: viene cercato un blocco della dimensione passata alla realloc, che restituisce il valore della nuova zona di memoria di a.
    (nell'uso pratico non mi cambia nulla, devo solo esser sicuro che lo spazio di memoria dato all'array sia sufficiente e proporzionato all'uso che avrà l'array)
    con la realloc nel nuovo array viene copiato il vecchio fino alla dimensione nuova qualora la dimensione vecchia sia maggiore della nuova:
    se passo da un arr avente dimensione 100 e faccio la realloc passandogli 20 vedo solo i primi 20 elementi dei 100, i restanti vengono eliminati.
    Se faccio il contrario non ho problemi.
    (la realloc sta nei limiti del più piccolo dei 2 array - vecchio e nuovo)

    -Free: libera la memoria corrispondente ad a*
    a* contiene sempre la posizine di memoria, ma essa è stata liberata (eliminata).
    se ho a[3] = 25 e faccio free(a) poi non posso riaccedere ad a[i] con i qualsiasi.

    Ovviamente realloc e free hanno senso solo con array creati tramite malloc. (altrimenti ho errore)
    Ovviamente pt 2: con la malloc non inizializzo l'arr, è inutile leggerlo subito dopo averlo creato (ha valori casuali)
    
    
    Ricapitolando:
    malloc => crea array
    realloc => cambia le dimensioni arr
    free => distrugge arr
    => un arr è individuato dalla posizione in memoria del suo primo elemento
    dobbiamo noi non accedere mai a zone di memoria NON assegnate a noi.
    
    
    */


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




/*Puntatori - molteplici usi:

=> il termine puntatore viene utilizzato in generale per indicare una variabile al cui interno è contenuto un indirizzo di memoria.
tale indirizzo è tipicamente l'indirizzo di memoria di un'altra variabile (es, il primo elemento dell'array).

Vi sono altri modi per ottenere i puntatori:
notazione: tipo* (es. int* , long*, double*, char* ...)
=> double x contiene un valore con la virgola / double *p contiene l'indirizzo (valore intero della cella di memoria) ad una variabile double. (l'indirizzo occupa 8 bytes)

•Estrarre il valore:
se ho una variabile contenente il numero di un indirizzo di memoria (una cella) in cui vi è un valore
posso utilizzare l'operatore * per estrarre tale valore 
es:
int valore = *indirizzo_di_cella_di_memoria;

•Estrarre l'indirizzo:
per far ciò uso l'operatore &
se scrivo 
int variabile = 10 e poi scrivo variabile ho il valore 10, 
se scrivo &variabile ottengo (ad es) 10008, ovvero il valore corrispondente alla cella di memoria della variabile 
posso quindi fare:


int p = &x; => ciò mette in p l'indirizzo della variabile x (x ha valore mettiamo 25), in p ho valore (ad es) 10009 (corrisponde a cella di memoria di x)
quindi l'operatore & restituisce l'indirizzo di una qualsiasi variabile.

•A COSA SERVE L'INDIRIZZO:
-> si usa con l'operatore *, ovvero l'inverso dell'operatore & (dall'indirizzo di memoria ottengo il valore della variabile corrispondente a tale indirizzo di memoria)
metto in p l'indirizzo della variabile messi:
int *p = &messi
incremento n del valore della variabile a cui punta p (ovvero messi)
n += *p; -> incremento n del valore interno alla variabile messi (ripreso mediante *p) 
scrivo 7 nella variabile a cui punta p (ovvero messi)
*p = 7 (cambio il valore di messi tramite *p)
*/

/*USO DEI PUNTATORI: (a cosa servono realmente?)
i puntatori vengono principalmente utilizzati per aggirare il problema del c: 
i parametri delle funzioni vengono passati per valore e NON per indirizzo di memoria.

main(){
    ...
    int n = 7;
    fun(n);
    ...
}


int fun(int a){
    ...
    x = a*a; // in a ho il valore 7
    a += x*y+a;
    ...
} // => nulla di ciò che viene fatto dentro la funzione fun altera il valore di della var. n 
//(che ho in main e il cui valore viene passato come parametro)

es 2:

main(){
    ...
    int n = 7;
    zun(&n); => passo indirizzo di memoria di n 
    ...
}

int zun(int *p){ // => riprendo il valore corrispondente al indirizzo di memoria che ho passato come parametro chiamando zun
    ...
    *p = 5; // => cambio il valore di n
    ...
} //=> l'esecuzione di *p = 5 scrive il valore 5 nella variabile n (5 viene scritto nella variabile a cui punta p, ovvero n)
alla fine di zun in n avrò il valore 5.

int n 
int e = scanf("%d", &n); -> passo il puntatore di n 

int *var;
int e = scanf("%d", var); -> errore: var non punta a nulla

posso fare 
int n
int *m = &n (in m metto l'indirizzo di n)
int e = scanf("%d", m); -> passo il puntatore di n 
(ciò è lungo ed intile, la best practize è il primo esempio)


*/