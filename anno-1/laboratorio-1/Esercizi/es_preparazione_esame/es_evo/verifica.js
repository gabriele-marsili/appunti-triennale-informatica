/*

Si scriva una funzione verifica(T) che, dato un albero binario non vuoto T 
come definito a lezione (oggetti con chiavi val e sx e dx), 
restituisce true se il valore memorizzato in ogni nodo è maggiore stretto di quello memorizzato 
nei suoi due figli, e false altrimenti.

Esempi:

Se Q = {val: 9, sx: {val: 7, sx: {val: 6}, dx: {val: 6, dx:{val: 4}}}, dx: {val: 7, sx: {val: 6}}}, 
allora verifica(Q) restituisce true

Se Q = {val: 9, sx: {val: 7, sx: {val: 6}, dx: {val: 6, dx:{val: 14}}}, dx: {val: 9, sx: {val: 7}}}, 
allora verifica(Q) restituisce false
*/

function verifica(T){
    let v_s = true
    let v_d = true
    
    if(T.sx){
        verifica(T.sx)
        v_s = T.val > T.sx.val ? true : false
    }
    if(T.dx){
        verifica(T.dx)
        v_d = T.val > T.dx.val ? true : false         
    }

    return v_d && v_s
    
}

/*soluzione:
function verifica(T) {
    if (!T) return true;
    if ((T.sx && !(T.val > T.sx.val)) ||
        (T.dx && !(T.val > T.dx.val)))return false;
    return verifica(T.sx) && verifica(T.dx);
}
*/