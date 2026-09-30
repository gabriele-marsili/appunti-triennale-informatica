/*

realizzare una funzione ricorsiva ordinato(a), con a
un array di numeri interi positivi. La funzione restituisce true se a
è ordinato in ordine strettamente crescente, e false altrimenti.
*/

function ordinato(a){
    if(a.length < 2) return true;
    else{ // => ha almeno 2 elementi
        if(a[0] >= a[1]){
            return false
        }
        else{
            a.shift()
            return ordinato(a)
        }
    }
}

console.log(ordinato([1,5,9,12,56,57,59])) // true 
console.log(ordinato([7])) // true 
console.log(ordinato([3,7,5,8,9,10])) // false 