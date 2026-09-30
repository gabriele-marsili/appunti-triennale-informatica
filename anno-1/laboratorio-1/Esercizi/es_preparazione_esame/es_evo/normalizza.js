/*
Si scriva una funzione normalizza(T) che, dato un albero k-ario non vuoto T come definito a lezione 
(oggetti con chiavi val e figli, dove figli è un array di nodi), in cui i nodi hanno valori di tipo stringa, 
lo modifica sostituendo ad ogni valore s, true se la lunghezza di s è minore o uguale di 3 e false altrimenti.
*/


var normalizza = (T) => {
    if(T.val.length <= 3){
        T.val = true;
    }
    else {
        T.val = false;
    }
    
    if(T.figli){
        for(let f of T.figli){
            normalizza(f);
        }
    }
    
}