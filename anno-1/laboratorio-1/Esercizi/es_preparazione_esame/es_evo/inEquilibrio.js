/*
Diciamo che un nodo di un albero binario è in equilibrio se il suo valore è >= del valore del suo figlio sinistro (se esiste), ed è <= del valore del suo figlio destro (se esiste). Diciamo che un albero binario è in equilibrio se tutti i suoi nodi sono in equilibrio.

Si scriva una funzione inEquilibrio(t) che dato un albero binario (i cui nodi sono implementati come visto a lezione come oggetti con chiavi val, sx e dx) restituisca true se t è in equilibrio, e false altrimenti.

*/

function inEquilibrio(t){
    if(!t.dx && !t.sx) return true
    let s_res = true;
    let d_res = true;

    if(t.sx){
        if(t.val < t.sx.val) return false
        else s_res = inEquilibrio(t.sx)
    }

    if(t.dx){
        if(t.val > t.dx.val) return false
        else d_res = inEquilibrio(t.dx)
    }
    
    return d_res && s_res
}


console.log(inEquilibrio({val:7,sx:{val: 4, sx: {val: 3}, dx: {val:12, sx: {val: 4, dx:{val:8}, sx:{val: 2}}}}, dx:{val: 11, dx: {val: 18}, sx: {val:3, sx: {val: 2}}}})) //→ true

console.log(inEquilibrio({val:8,sx:{val: -4, sx: {val: 33}, dx: {val:13, sx: {val: 4, dx:{val:-3}, sx:{val: 81}}}}, dx:{val: 11, dx: {val: 3}, sx: {val:8, sx: {val: 63}}}})) // → false

console.log(inEquilibrio({val:8})) //→ true

console.log(inEquilibrio({val:8,sx:{val: 8},dx:{val:8}}) )//→ true

