/*

Definire una funzione filter_replace(f,g), che prende in input una funzione f ed un predicato g, ovvero una funzione g che restituisce un valore booleano quando viene invocata. filter_replace(f,g) deve restituire una funzione che, preso in input un array A, prima filtra A creando un nuovo array B che contiene tutti i valori di A per cui g è vero, poi applica la funzione f su ogni elemento di B, memorizza il risultato in un nuovo array C e restituisce C.



ATTENZIONE: L'array A non dev'essere modificato; l'array C deve preservare l'ordine degli elementi in A; non si possono usare le funzioni map e filter di libreria.

*/



// filter_replace(x=>x+1, x=>x%2==0)([1, 2, 3]) = [3]

var filter_replace = (f, g) => {

    return filtra = (array_A) => {
        let arr_B = [];
        let arr_C = [];
        for (let i = 0; i < array_A.length; i++) {
            if (g(array_A[i])) { // se elemento è vero lo aggiungo ad arr B 
                arr_B.push(array_A[i])
            }
        }

        //applico f su ogni elemento di arr_B:
        for (let j = 0; j < arr_B.length; j++) {
            arr_C.push(f(arr_B[j]))
        }

        return arr_C
    }



}
console.log("f r  = ", filter_replace(x => x + 1, x => x % 2 == 0)([1, 2, 3])) // = [3]