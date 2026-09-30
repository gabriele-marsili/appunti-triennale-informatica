/*
Lezione 19 (17/11/23)

* Lettura e scrittura di file binari in C.  
Operatori bitwise `&`, `|`, `^`, `<<`, `>>`.
* Esercizi in assembler ARM*/


/*spiegazione codice strcmp.s : 
Lo script confronta due stringhe lessicograficamente. 

Verifica se uno dei puntatori alle stringhe è NULL. 
Se sì, restituisce un valore specifico come risultato dell'operazione di confronto e termina la funzione.

Altrimenti inizia un loop che attraversa i caratteri delle due stringhe contemporaneamente.

Confronta i caratteri correnti delle due stringhe:
se sono diversi, restituisce la differenza tra i valori ASCII dei due caratteri e termina la funzione.

Se il confronto arriva alla fine di una delle stringhe, verifica se l'altra stringa è giunta anch'essa alla fine. 
In caso affermativo, le due stringhe sono uguali, restituisce 0. 
In caso contrario, restituisce la differenza tra il valore ASCII del carattere corrente della prima stringa e il carattere nullo ('\0').

Incrementa l'indice dei caratteri correnti e ritorna al passo 2.

La funzione opera principalmente confrontando i caratteri delle due stringhe. 
Se trova un carattere diverso, restituisce la differenza tra i valori ASCII dei due caratteri. 
Se una delle stringhe termina, controlla se anche l'altra è terminata e agisce di conseguenza.

Alla fine, se le stringhe sono uguali, restituisce 0.


*/