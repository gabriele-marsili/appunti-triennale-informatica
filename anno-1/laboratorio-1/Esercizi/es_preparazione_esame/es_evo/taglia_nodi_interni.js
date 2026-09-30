/*
Dato un albero k-ario T, definire una funzione ricorsiva taglia_nodi_interni che, 
preso in input un intero positivo m, modifica T in-place, rimuovendo tutti i nodi interni 
(e i rispettivi sottalberi) che hanno meno di m figli.

Notazione
Si codifichi l'albero k-ario T come visto a lezione, perciò un albero è rappresentato da un oggetto così formato {val: , figli:[...]}
Si noti inoltre che l'albero vuoto è codificato con il valore null.
*/

function taglia_nodi_interni(T,m){
    
    if(T != null && T.figli){
        
        for(let i = 0; i < T.figli.length; i++){                
            let f = T.figli[i];
            
            if( f!= null && f.figli ){
                if(f.figli.length < m && f.figli.length != 0){
                    T.figli.splice(i,1);
                    i--
                }                
            }    

            if(f != null) {
                taglia_nodi_interni(f,m)       
            }
            else{
                T.figli.splice(i,1);
                i--
            }

        }                
    }
}