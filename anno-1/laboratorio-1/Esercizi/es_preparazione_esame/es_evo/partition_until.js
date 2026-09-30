/*
Si implementi una funzione partition_until(arr, depth), con arr un array di numeri interi (non vuoto) e 
depth un intero 
 0. La funzione, ricorsivamente, applica il paradigma “divide-et-impera” come segue:

se depth=0 o l’array arr contiene un solo elemento, restituisce un array contenente arr;
altrimenti, calcola ricorsivamente le partizioni di profondità depth+1 delle due metà di arr 
(calcolate rispetto all'elemento centrale, ovvero in indice arr.length/2 
approssimato all'intero superiore se la lunghezza è dispari).
*/

function partition_until(arr, depth){
    if(depth === 0 || arr.length === 1)return [arr];
    else{
        let left = [];
        let right = [];
        let center = Math.ceil(arr.length / 2)
        for (let i = 0; i < arr.length; i++){
            if (i < center) left.push(arr[i]);
            else right.push(arr[i]);
        }
       
   
        left = partition_until(left, depth - 1);
        right = partition_until(right, depth - 1);
        
        let result = left.concat(right)                         
        /*
        let result = [];
        
        for (let i=0; i < left.length; i++)
            if (left[i].length > 0) result.push(left[i])
        for (let i=0; i < right.length; i++)
            if (right.length > 0) result.push(right[i])
        */
    
        return result

    }
}

console.log(partition_until([1,2,3,4,-1,-2,-3,8,16],3))