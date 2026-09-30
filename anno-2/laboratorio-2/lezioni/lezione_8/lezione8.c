#define _GNU_SOURCE   // avverte che usiamo le estensioni GNU 
#include <stdio.h>    // permette di usare scanf printf etc ...
#include <stdlib.h>   // conversioni stringa/numero exit() etc ...
#include <stdbool.h>  // gestisce tipo bool
#include <assert.h>   // permette di usare la funzione assert
#include <string.h>   // funzioni per stringhe
#include <errno.h>    // rischiesto per usare errno


// stampa un messaggio d'errore su stderr e termina il programma
void termina(char *messaggio)
{
  // se errno!=0 oltre al mio messaggio stampa il messaggio
  // associato alla variabile globale errno 
  // utilizzando la funzione di libreria perror()
  if(errno!=0) perror(messaggio);
  // altrimenti stampa solo il mio messaggio
  else fprintf(stderr,"%s\n", messaggio);
  exit(1);
}


int main(int argc, char*argv[]){
    int a = 1;
    char s[12]; // 12 è la dimensione (non indice)
    // btw meglio così -> char *s = malloc(sizeof(char)*12); 

    puts("inserisci un numero ed una stringa");
    int e = scanf("%d %11s",&a, s); // > passo a per riferimento utilizzando &
    // %11s => legge una stringa, ma non più di 11 caratteri (tutto ciò che scrivo rimane sempre dentro la variabile s)
    // => mi da' sicurezza 

    //il metodo migliore è lasciare che scanf decida la lunghezza della stringa 
    if(e!=2){
        termina("Error scanf");
    }

    /*
    scanf se legge 1ciao ye da' a = 1 e s = ciao, non considerando ye
    ->poiché uso scanf per inserire un numero e poi una stringa 
    scanf va avanti finché ha un numero, poi ciò che c'è oltre lo considera come stringa
    
    11 ciao ye
    => a = 11, s = ciao , ye viene ignorato 
    -> scanf decifra lo spazio come la fine della stringa!
    
    11 ciaociaociaociao
    => aborted 
    -> strnga troppo lunga (dichiarando s[12] ammetto al max 11 caratteri)
    -> se vado oltre alla zona di memoria lo scanf continua a scrivere, trascrivendo info importanti => il programma termina
    -> nello stack, tra le altre info, c'è l'indirizzo del chiamante a cui devo ritornare il risultato
    -> modificando lo stack potrebbe esser eseguito del codice > occorre controllare per evitare ciò    
    */

   //soluzione : 
    int b = 1;
    char str[12]; // = malloc(sizeof(char) *12);
    char *z=NULL; 
    puts("inserisci un numero e due stringhe");
    int res = scanf("%d %11s %ms", &b,str,&z); // => vengono messi i primi 11 caratteri in s e tutto il resto in z
    // devo fare una chiamata per riferimento per modificare il valore della variabile z
    if(res != 3)termina("error scanf");

    printf("a=%d, s=%s, z=%s\n",a,s,z);
    
    free(z); // => libero memoria allocata da scanf

}