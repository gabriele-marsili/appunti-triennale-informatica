/*

Scrivere una funzione isSorted2(a), con a un array di numeri. 
La funzione restituisce true se l'array è ordinato in senso strettamente crescente, e false altrimenti. 

Nello svolgimento dell’esercizio, non potete usare cicli (comandi for, while, do/while)
*/

function isSorted2(a){
    if(a.length <2)return true;
    else{
        if(a[a.length-1] <= a[a.length-2])return false;
        else{
            return isSorted2(a.slice(0, a.length-1))
        }
    }
}



console.log(isSorted2([-21,-2,0,4,6,210])) //→ true

console.log(isSorted2([2,6,8,8,9,21])) //-> false

console.log(isSorted2([2,6,8,9,10,-42])) //→ false