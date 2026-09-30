// ricorsione = fuzione che richiama un'altra funzione / se stessa (= algoritmo che espresso in termini di se stesso)

// occorre gestire bene i casi base (ed i casi estremi)

// => occorre che la ricosione vada a suddividere il problema iniziale in sotto-problemi più facilmente risolvibili (spesso di dimensione minore) --> emplificazione o suddivisione dell'insieme di dati e l'applicazione dello stesso algoritmo agli insiemi di dati semplificati.

/*Esempio

Si scriva una funzione ricorsiva check_array(arr) che dato un array a = [a0;a1...aN]
di interi positivi ai in Z+ restituisca true o false in base alla 
veridicità della seguente proprietà:



Sia c un array contenente la somma di cifre dell'array arr dalla coppia più esterna 
(c0 = a0+aN) a quella più interna (c k-1 = a k-1 + a k+1), dove k = n/2
è l'indice centrale dell'array approssimato per difetto. 

La funzione check_arr(arr) ritorna true se e solo se c1 è divisibile per c0, 
c2 è divisible per c1, e così via, fino a c k-1 divisible per c k-2.

Nota:
Tutti gli array con n<=3 avendo solo una coppia o nessuna, 
rispettano per definizione la proprietà
*/



var c = [];
var valore = true

// ricorsione diretta 

function check_array(arr) {
    console.log("arr = " + arr)

    if (arr.length < 3) valore = true;

    else {
        c.push(arr[0] + arr[arr.length - 1]) // aggiungo in c somma tra primo ed ultimo elemento
        console.log("new c = " + c)

        if (c.length > 1) {
            console.log("divido  " + c[c.length - 1] + " per " + c[c.length - 2])
            let res = c[c.length - 1] % c[c.length - 2]
            console.log("res = " + res)
            if (res !== 0) {

                valore = false; // => proprietà non soddisfatta 
            } else {
                arr.pop(); // elimino ultimo elemento
                arr.shift(); // elimino primo elemento
                check_array(arr)
            }
        } else {
            arr.pop(); // elimino ultimo elemento
            arr.shift(); // elimino primo elemento

            check_array(arr)
        }
    }


    return valore

}
var a = [1, 4, 8, 5, 3, 31, 4, 2, 2]
console.log(check_array(a))


// ricorsione mutua (una funzione ne richiama un'altra che a sua volta richiama la prima)

function _check_array(arr, prod) {

    if (arr.length <= 1)
        return true;

    if ((arr[0] + arr[arr.length - 1]) % prod != 0)
        return false

    return check_array(arr.slice(1, -1), arr[0] + arr[arr.length - 1]); // => ricorsione in coda
};

function check_array(arr) {
    return _check_array(arr, 1); // => ricorsione in coda 
}