/*

Si scriva una funzione contaCoppia(T,val1,val2) che dato un albero binario T (i cui nodi sono implementati 
come visto a lezione come oggetti con chiavi val, sx e dx) e due numeri val1 e val2, 
restituisca il numero di coppie di nodi fratelli tali che il fratello destro abbia val uguale a 
val1 e quello sinistro abbia val uguale a val2. Due nodi sono fratelli se sono figli dello stesso nodo padre. 
Si faccia attenzione a conteggiare le coppie che soddisfano la condizione, non il numero dei nodi 
(che sarebbe ovviamente il doppio rispetto al numero di coppie).

*/

function contaCoppia(T,val1,val2){
    let c = 0;
    if(T.sx && T.dx){
        
        if( T.sx.val === val2 && T.dx.val === val1){
            c++
        }
    }

    if(T.sx){
        c += contaCoppia(T.sx,val1,val2)
    }

    if(T.dx){
        c += contaCoppia(T.dx,val1,val2)
    }

    return c
}
console.log(contaCoppia({val:7,sx:{val: 4, sx: {val: 3}, dx: {val:12, sx: {val: 4, dx:{val:3}, sx:{val: 8}}}}, dx:{val: 11, dx: {val: 3}, sx: {val:8, sx: {val: 6}}}},12,3))//→ 1



console.log(contaCoppia({val:7,sx:{val: 4, sx: {val: 3}, dx: {val:12, sx: {val: 4, dx:{val:3}, sx:{val: 8}}}}, dx:{val: 11, dx: {val: 3}, sx: {val:8, sx: {val: 6}}}},3,8)) //→ 2



console.log(contaCoppia({val:7,sx:{val: 4, sx: {val: 3}, dx: {val:12, sx: {val: 4, dx:{val:3}, sx:{val: 8}}}}, dx:{val: 11, dx: {val: 3}, sx: {val:8, sx: {val: 6}}}},12,4)) //→ 0
