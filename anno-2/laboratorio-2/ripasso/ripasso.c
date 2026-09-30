// array di coppie
#define _GNU_SOURCE  // avverte che usiamo le estensioni GNU
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa exit() etc ...
#include <stdbool.h> // gestisce tipo bool
#include <assert.h>  // permette di usare la funzione assert
#include <string.h>  // funzioni per stringhe
#include <errno.h>   // rischiesto per usare errno
// prototipi delle funzioni che appaiono dopo il main()
void termina(const char *messaggio);


//struct : lezione 9 : 

// creo struct e la nomino Studente
typedef struct MyStruct
{
    char name;
    int age;
    int NumeroMatricola;
    float media;
} Studente;

//posso anche farlo direttamente :
typedef struct
{
    char name;
    int age;
    int NumeroMatricola;
    float media;
} Quick_Studente;

// passaggio per VALORE
struct MyStruct valueIncrementaMedia(struct MyStruct s)
{ // s è una copia di una struct MyStruct
    // incrementaMedia ottiene una COPIA dell'oggetto passato => NON modifica l'originale
    s.media = s.media + 1;
    return s; // mi ritorna una COPIA dell'oggetto con la media incrementata
}

// passaggio per RIFERIMENTOA
void rifIncrementaMedia(Studente *s)
{                    // prende come parametro un puntatore ad un typedef Studente
    (*s).media += 1; // incrementa la media
    s->media += 0;   // uso sintassi s->media per accedere a proprietà "media"
    // le modifiche hanno impatto sull'oggetto s passato per riferimento
}

// solitamente per stampare la struct si passano i puntatori poiché copiare ogni valore della struct costa molto se la struct ha tanti campi
void stampa_studente(const Studente *s, FILE *f)
{ // best practice (uso di const per chiarire che non cambio il valore della coppia passata)
    fprintf(f, "(%s,%d)\n", (*s).name, (*s).NumeroMatricola);
    fprintf(f, "(%d,%d)\n", s->age, s->media);
    // (*s).name = s->name
}

int main(int argc, char *argv[])
{
    Studente *a; // array di studenti
    if (argc < 3 || argc % 2 == 0)
    { // verifica che vengano passati un num n positivo pari di interi
        printf("Uso: %s un numero positivo pari di interi\n", argv[0]);
        exit(1);
    }

    int n = (argc - 1) / 2;         // dimensione di a  == numero coppie = num parametri passati su linea comando (- il nome file)
    a = malloc(n * sizeof(Studente)); // -> allocazione memoria per a
    if (a == NULL)
        termina("allocazione fallita");


    //creo uno studente
    Studente myS;
    myS.name = "Mario";
    myS.NumeroMatricola = 123456;
    myS.age = 21;
    myS.media = 28.5;

    a[0] = myS; // metto lo studente in a[0]

    rifIncrementaMedia(&a[0]); // incremento la media tramite passaggio per riferimento 
    //-> passo puntatore 

    stampa_studente(&a[0], stdout); // stampo in stdout 
    
    free(a);
    return 0;

}

/*lezione 11 :  -> array di puntatori su struct, merge e mergesort 
-> array di puntatori a struct :

int dimensione = 10;
Quick_Studente **arrPuntatori = malloc(dimensione * sizeof(*arrPuntatori) );
uso : 
arrPuntatori[0]->name = "Mario"

in array_capitali.c ci sono le funzioni per:
•creazione 
•distruzione
•stampa / scrittura su file 
•lettura 
di struct 

-> mergesort ed ordinamento di struct (capitali) -> array_capitali.c 
•funzioni di confronto per mergesort 
•mergesort e mergse
•passaggio di funzione di confronto per riferimento
*/

/*lezione 12: -> liste con le struct 
•passaggio di una funzione ad un'altra (funzfunz.c) -> passaggio per riferimento : uso di &
•visualizzare, creare e distruggere LISTE > lista_capitali.c
-->campo next nelle struct per avere una lista 
-->gestione delle struct per le liste e relative funzioni (crea, distruggi, leggi)
-->gestione delle liste e relative funzioni (stampa lista, distruggi lista, )
*/


/*Lezione 13: -> inserimento / cancellazione da liste 

•Costruzione di liste con inserimento in testa, in coda e ordinato.
•Funzione ricorsiva per l'inserimento da una lista
•Cancellazione da una lista con e senza ricorsione

->inserimento in testa / coda 
--> inserimento mantenendo un ordinamento 
(inserimento con approccio sia ricorsivo che non)

->eliminare solo alcuni elementi dalla lista (in base a condizione)
(solo versione ricorsiva)
*/

/*Lezione 14 -> variabili statiche, lettura file getLine, strok
Lettura da file con getline() (in stringole.c)
Parsing di stringhe mediante strtok() (in stringole.c)
Variabili statiche (in statiche.c)
Esercizio in aula su liste di interi (Fibolista)

->es fibolista in esercizi 

->lettura di un file con getline che sfrutta un buffer (puntatore a carattere)
->strtok per ottenere stringe dal file in base a carattere (ad esempio separa in base a ";" )
-->funzione elimina spazi in testa

*/

/*Lezione 15 : -> uso include file.h (header), makefile
•invertifile.c 
->leggere file ed inserendo str in testa a lista crea lista con ordine str corrispondenti a ordine da fondo a cima del file di lettura (testa lista = ultima str del file) e stamparlo in stdout
•listastrighe.c -> funzioni per la creazione e gestione di una lista di str che servono per listastringhe.h
•legginomi.c -> funzioni per la lettura delle stringhe da file f tramite getLine e strtok
•makefile ->
*/


/*Lezione 16 : -> qsort, funzioni di confronto, casting 
->aggiunti nuovi eseguibili nel makefile 
•qsort.c : funzione di confronto, casting,  
-> qsort di libreria 
*/


/*Lezione 17 : -> sorting di stringhe e di struct, puntatori a void, casting 
•esercizio ordina triple 
•nuovi eseguibili nel makefile
•qsortInt.c : aggiunto confronta_void avente tipi esatti per prototipo di qsort 
-> uso di puntatori a void e casting 
•qsortStr.c -> ordina stringhe tramite qsort e funzioni di confronto che sfruttano strcmp 

*/


/*Lezione 18 : -> es in assembly arm v7
•aggiornato il makefile con "matrice"
•matrice.c => matrice allocata staticamente e dinamicamente 
-> funzione per creazione di una matrice di interi con allocazione dinamica 
-> funzioni per stampare una matrice (statica / dinamica)
•primi.c => sfrutta funzione in primo.s per creare array di numeri primi da 0 ad n passato come argomento da terminale 
•primo.s => in armv7 -> calcola se n è primo o meno 
•strmp.c => confronta stringhe sfruttando funzione in strcmq.s (in armv7) per creare array
*/


/*Lezione 19 : -> file binari (lettura e scrittura) , operatori bitwise, esercizi in arm
•aggiornato makefile con nuovi eseguibili 
•bitops => mask, shift e conversioni : 
-> crea maschera, converte int in binario sfruttando shift 
-> converte da binario a intero 
•scrivi_primi_bin.c -> scrittura file binario 
->utilizzo fwrite
*/


/*Lezione 20 : -> lettura da file binario, calcolo della dim del file, fseek, ftell, rewind, fread
•leggibin.c => apre file binario e ne legge gli interi
-> fseek(f,0,SEEK_END) => mette il puntatore di lettura a fine file
-> ftell(f) => mi restituisce la posizione corrente del puntatore nel file in byte
-> numero di interi = lunghezza in byte / 4
-> uso di reqwind(f) per riportare il puntatore ad inizio file
-> uso di fread(a,sizeof(int),n,f) per leggere dal file f n oggetti che vengono messi in a 
*/




void termina(const char *messaggio)
{
  if(errno==0) 
     fprintf(stderr,"%s\n",messaggio);
  else 
    perror(messaggio);
  exit(1);
}