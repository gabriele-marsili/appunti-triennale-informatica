/*
Scrivere una funzione zeriuni che, dato un numero n (intero e positivo), restituisce un array di 0 ed 1 che rappresenta la sua codifica su 8 
bit.
Gli 0 ed 1 devono esser rappresentati come numeri, mettendo il più significativo nella posizione 0 dell'array restituito e il meno 
significativo nella posizione 7.

La funzione deve inoltre lanciare 2 eccezioni: NonIntegerError e OutOfRangeError definite come:
•NonIntegerError => quando n non è intero 
•OutOfRangeError => quando il numero n è al di fuori dei numeri rappresentabili con 8 bit (255)
*/

class NonIntegerError extends Error {};
class OutOfRangeError extends Error {};

function zeriuni(n) {
    if(n<0 || n > 255) {
        throw new OutOfRangeError("number out of range");
    }
    if(!(Number.isInteger(n))) throw new NonIntegerError("Not an integer number");

    let res = []
    for(let i = 0; i<8; i++){ //=>  8 bit 
        res.unshift(Math.floor(n%2))
        n /= 2;
    }
    return res;
}



function cacola_intero(arr){
    let res = 0
    for(let i=0; i<arr.length; i++){
        res += Math.pow(2,arr.length-i-1)*arr[i]
    }
    return res
}

console.log(zeriuni(254))
console.log(cacola_intero(zeriuni(254)))