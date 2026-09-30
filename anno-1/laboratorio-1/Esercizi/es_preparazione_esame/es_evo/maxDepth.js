/*
Si scriva una funzione JS maxDepth(T), dove T è un albero binario 
come descritto a lezione (oggetti con chiavi val e sx e dx). 
La funzione deve restituire la massima profondità dell'albero T: la lunghezza del cammino 
più lungo tra tutti quelli dalla radice alle sue foglie (la radice ha profondità zero).
*/

function maxDepth(T){  
    let dx_depth = 0;
    let sx_depth = 0
    if(T.dx){
        dx_depth = 1 + maxDepth(T.dx)
    }
    if(T.sx){
        sx_depth = 1 + maxDepth(T.sx)
    }
    return Math.max(sx_depth,dx_depth)
}