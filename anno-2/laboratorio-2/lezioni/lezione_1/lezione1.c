/*
Docente : Giovanni Mazzini 
occorre avere una macchina con Linux. (documentazione del corso)
macchina del corso accessibile e su cui verrà fatto l'esame 

•moodle (annunci, quiz, materiale) https://elearning.di.unipi.it/course/view.php?id=319 
•git hub https://github.com/Laboratorio2B/2324-Lab2B

*/


#define _GNU_SOURCE // => uso estensioni GNU
#include <stdio.h> // => scanf print etc ... (metodi ?)
#include <stdlib.h> // =>gestisce i booleani
#include <assert.h> // => permette l'uso della funzione assert
#include <string.h> // funzioni di confronto / copia / etc 

/*
scopo: legge intero n da tastiera, crea array di n interi N chiedendoli all'utente, 
calcola la somma di tali interi e la stampa

compilatore: warning => rimane eseguibile ma c'è qualcosa che non va => va risolto 

se viene trovato un errore questo deve esser risolto in fase di compilazione, all'esecuzione non
*/

// da compilare con: (nel terminale linux)
// gcc -std=c11 -Wall -O -g -o somma (nome file) somma.c 
/*
std = standard 
-Wall => fa separare e notare i warning (cose sbagliate) (essenziale)
-O (o grande) => controlla liv di ottimizzazione => velocizza il codice (-0 non ottimizzato -O1 / -O2 / -O3 velocità di ottimizzazione)
O grande aumenta anche il numero di warning 
-g => operazioni di debugging 
-o (piccolo) + nome file da generare (nome file eseguibile può essere qualsiasi, può avere qualsiasi estensione) 
=> crea file eseguibile con il nome scelto una volta che viene compilato il file in c
-nomeFile.c => nome file da compilare 
i nomi dei file sono totalmente arbitrari (anziché somma.c posso chiamarlo anche file.jpg => NON devono per forza essere .c,)
=> al compilatore basta il contenuto del file sia in c (l'estensione del file è superflua)


*/

// => deve essere sempre presente una funzione main, è quella da cui parte tutto il programma
int main(int argc, char*argv[]){  // => parametri = argomento in output, argomenti in input 
    //l'eseguibile parte lanciando la funzione main 
    // c'è sempre solo 1 parametro in output
    
    int n; // => definisco variabile di tipo intero n (interi del c non sono standard: hanno dimensione fissata - tipicamente a 32 bit, possono contenere val da -2^31 a +2^31)
    // sulle macchine più vecchie la dim delle variabili intere è 16, sulle più nuove anche 64
    // la dim quindi è variabile e dipende dalla macchina (va gestita tale limitazione)

    // variabile : zona di memoria (in questo caso 4 byte) con contenuto (in questo caso intero)
    // in questo caso la var n non ha valore, quindi li viene attribuito un valore random ad ogni esecuzione (=> non si deve usare così)
    //la var n viene utilizzata per il numero degli elementi (dimensione) che saranno nell'array

    printf("Inserisci il numero degli elementi : "); //=> messaggio in output che spiega all'utente cosa fare
    
    int e = scanf("%d", &n); // vedremo la & più avanti (spoiler : viene usata per passare l'indirizzo di memoria della var n allo scanf, così che possa metteci dentro il valore)
    //int e = scanf("%d %d", &n, &m); => 2 val interi da utente che vengono messi uno in n l'altro in m 
    // => il simbolo %d spiega alla funzione che noi vogliamo leggere una variabile di tipo intero => scanf capisce che ciò che viene scrito dall'utente debba essere un numero intero 
    // => da qui in poi la var n ha il valore inserito da utente 
    // nella variabile e viene inserito il val numerico corrispondente numero di elementi inseriti => 1 se utente ha scritto un solo numero / != 1 se l'utente ha inserito un num di oggetti diversi da 1 

    // scanf non ha verifiche su ciò che inserisce l'utente 

    //controlli della lettura:

    /* l'if può non avere il blocco indicato con {}, in tal caso il primo comando che segue l'if corrisponde a quello interno al suo blocco
    if(e!=1)        
        puts("Valore non trovato"); // => viene visto come interno all'if 
        exit(1); // viene eseguito sempre 
    */

    if(e!=1){// => se e != 1 utente ha messo più / meno di 1 elemento 
        // {} blocco, ; vengono usari per separare i comandi, l'identazione del codice non viene vista nell'esecuzione
        puts("Valore non trovato"); // stampa (output) all'utente
        exit(1); // => termina il programma 
    }
    if(n<=0){ // => controlla che utente inserisca un numero positivo di elementi 
        printf("Numero di elementi non valido, deve esser positivo "); // stampa (output) all'utente
        exit(1);

    }

    //crea e riempi l'arr:
    int a[n]; // => crea la variabile a indicando che è un array di tipo intero avente dimensione n (anche per questo n deve essere un valore intero > 0)
    //questa definizione di array va usata il meno possibile => lezione 2 per uso corretto
    //questa definizione di array usa 4byte * n 
    //questa var viene memorizzata nelo stack (che contiene tutte le variabili di tutte le procedure attive) 
    //=> lo stack ha dimensione limitata 
    //=> la dimensione dell'array non deve esser scelta dall'utente (o, in tal caso, sarebbero opportuni alcuni controlli)

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
    return 0;

    

}


/*
comandi utili: (chiedibili all'orale)
-ls pone focus su directory  o file (è un alias di -ls --color=auto)
-ll fa vedere i permessi relativi ad un file (-w => scrittura, -r => lettura, => -x esecuzione) 
i permessi vengono ripetuti 3 volte: permessi diversi a seconda dell'utente che interagisce: 
•prima terna = proprietario 
•seconda terna = gruppo utenti 
•terza terna = tutti gli altri utenti della macchina 

(file verdi = eseguibili, hanno permesso -x)

. o ../ indica le directory 

*/
