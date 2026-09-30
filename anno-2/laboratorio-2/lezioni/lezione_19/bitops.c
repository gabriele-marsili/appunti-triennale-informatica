#define _GNU_SOURCE   // avverte che usiamo le estensioni GNU 
#include <stdio.h>    // permette di usare scanf printf etc ...
#include <stdlib.h>   // conversioni stringa/numero exit() etc ...
#include <stdbool.h>  // gestisce tipo bool (per variabili booleane)
#include <assert.h>   // permette di usare la funzione assert
#include <string.h>   // funzioni di confronto/copia/etc di stringhe
#include <errno.h>    // richiesto per usare errno

// Scopo del programma:
//  mostrare le operazioni sui bit in C

static void termina(const char *messaggio);


#if 0
&& ||   And e Or logici

a=2 
b=9 
a && b -> true


-----
& | ^ bitwise   operazioni tra i bit degli interi 

a = 00000011 
b = 00001001

a&b -> 00000001 
a|b -> 00001011
a^b => 00001010

esiste anche il ~ (not bitwise) -> inverto i bit
~a = 11111100


<< shift sin
>> shift dex

b = 00001001

c = b<<3 -> 01001000 (ho aggiunto 3 zeri in fondo -> shiftato a sx di 3)
c>>2 -> 00010010

In C lo shift destro può essere aritmetico o logico
il comportamento è implementation dependent
d = 110000....1
d>>2
  possiamo ottenere 00110000.... -> 2 zeri in cima 
  ma anche          1111000000 -> 2 zeri in fondo
e = 001000....1 (il bit più significavo è 0)
e>>2 ottengo sempre 00001000... -> 2 zeri in cima
#endif;


// converte il primo intero passato sulla linea di comando in binario
// e il secondo da binario a decimale 
int main(int argc, char *argv[])
{
  // verifica siano stati fornito un parametro 
  if(argc!=3) {
    printf("Uso: %s intero stringa01\n",argv[0]);
    return 1;
  }
  int n = atoi(argv[1]); // numero intero da convertire in binario

  for(int i=31;i>=0;i--) { // 32 bit (da 31 a 0) -> da quello più significativo a quello meno sign.
    int mask = 1<<i; // viene creata una maschera in cui l bit 1 è spostato verso sinistra di i posizioni. Inizialmente i è 31, quindi la maschera sarà 10000000000000000000000000000000
    char c = ( (n&mask) !=0  ) ? '1' : '0'; // bitwise AND tra il numero n e la maschera. Se il risultato è diverso da zero, significa che il bit corrispondente in n è 1, altrimenti è 0. Il risultato ('1' o '0') viene quindi memorizzato nella variabile c.
    printf("%c",c); // stampo c 
  }
  puts("");
  /* => 
  Quindi, l'idea di base qui è utilizzare una maschera per isolare ciascun bit nel numero intero n e determinare se quel bit è 1 o 0. 
  Il risultato di ogni bit viene stampato, e alla fine otteniamo la rappresentazione binaria completa del numero.
  */
  
  // convertiamo argv[2] in intero
  // argv[2] = 100011
  n = 0; // numero finale inzializzato a 0
  if(strlen(argv[2])>31) // -> numero in binario ha più di 32 bit 
    termina("Stringa in input troppo lunga");
  for(int i=0;i<strlen(argv[2]);i++) { // scorro la stringa corrispondente al numero binario 
    if(argv[2][i]=='1') { // se l'i-esimo bit è 1 :
      int mask = 1 << ( strlen(argv[2])-i-1  ); //  Crea una maschera con il bit 1 spostato a sinistra di (strlen(argv[2]) - i - 1) posizioni. Questo significa che la maschera rappresenta il bit corrente nella sua posizione corretta.
      n = n | mask; // Applica l'operazione OR tra il numero corrente (n) e la maschera, impostando così il bit corrispondente di n a 1.
    }
    else if(argv[2][i]!='0') // Se argv[2][i] non è né '0' né '1', il programma termina con un messaggio di errore, poiché la stringa binaria dovrebbe contenere solo '0' e '1'.
      termina("Carattere non valido in argv[2]");
  }
  printf("Valore convertito: %d\n",n);
  /* la conversione avviene considerando ogni bit nella stringa binaria, calcolando la posizione corretta di ciascun bit e aggiornando il numero intero di conseguenza mediante operazioni bitwise.*/
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