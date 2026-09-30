/*
Si scriva una funzione isHeap(t) che, dato un albero k-ario t costruito come visto a lezione con nodi
{val:v, figli: [t1, …, tn]}, restituisca true se l’albero soddisfa la proprietà di heap, ovvero il valore del padre è 
sempre maggiore del valore di ciascuno dei figli.

function isHeap(t){
    if(t.figli){
        for(let tree of t.figli){
            if(!isHeap(tree)) return false; // => un figlio non è un heap
            else{
                if(t.val <= tree.val) return false // => radice non è heap
            }
        }
        return true

    }else return true;
}
*/
function isHeap(t){
    if(!t.figli || t.figli.length === 0){ //  foglia
        return true
    }
    else if (t.figli && t.figli.length != 0){ // => albero ha figli     
        for(let f of t.figli){
            if(t.val <= f.val || !isHeap(f)){
                return false
            }
        }
        return true
    }
}

let tree_f = {
    val: 9, 
    figli: [
        {val: 8, figli: [{val : 7},{val : 1},{val : 1}]},
        {val: 3, figli: [{val : 5}]}
    ]
}

let tree_v = {
    val: 9, 
    figli: [
        {val: 8, figli: [{val : 7},{val : 1},{val : 1}]},
        {val: 6, figli: [{val : 5}]}
    ]
}
console.log(isHeap(tree_f)) // false 
console.log(isHeap(tree_v)) // true 