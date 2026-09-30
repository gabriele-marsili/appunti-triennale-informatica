/*
Definire una funzione JS replace_filter(f,g), che prende in input una funzione f ed un predicato g, ovvero una funzione g 
che restituisce un valore booleano quando viene invocata. replace_filter(f,g) deve restituire una nuova funzione che, 
preso in input un array A, prima applica la funzione f su ogni elemento di A e memorizza il risultato in un nuovo array B, poi filtra 
B creando un nuovo array C che contiene tutti i valori di B per cui g è vero, infine la funzione deve restituire C.

ATTENZIONE: L'array A non dev'essere modificato; l'array C deve preservare l'ordine degli elementi in A; non si possono usare le funzioni 
map e filter di libreria.



Esempio:

replace_filter(x=>x+1, x=>x%2==0)([1, 2, 3]) = [2, 4]
*/

var replace_filter = (f,g) => {
    let new_f = (a) => {
        let ar_B = [];
        let ar_C = [];
        for(let el of a){
            ar_B.push( f(el));            
        }

        for(let el of ar_B){
            if(g(el))ar_C.push(el);
        }

        return ar_C;
    }

    return new_f
}