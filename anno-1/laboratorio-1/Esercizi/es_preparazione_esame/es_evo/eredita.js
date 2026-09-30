/*
Si consideri un albero k-ario, in cui i nodi hanno la struttura 
{val: n, figli: [ t1, ..., tk ]}, come visto a lezione. Si vuole distribuire l’eredità di 
ogni nodo intermedio ai suoi figli in questo modo: il valore n di un nodo viene distribuito 
in parti uguali ai figli, ciascuno dei quali riceve dunque n/k. La quota ereditata viene sommata 
al valore di n di ciascun erede, e se l’erede non è una foglia, il risultato viene ulteriormente diviso ai figli, e così via.

Si scriva una funzione eredita(t) che, ricevuto come argomento un albero t nel formato descritto sopra, restituisca 
il valore totale (n proprio più quota ereditata) del nodo foglia con valore massimo.

*/


function eredita(t){
    let res = t.val
    let f_key = true
    if(t.figli){
        for(let f of t.figli){
            f.val += Math.round(t.val / t.figli.length)
            if(f.figli){
                res = Math.max(res, eredita(f))
            }
            else{ // => f = foglia
                if(f_key){
                    res = f.val
                    f_key = false
                }
                res = Math.max(res,f.val)
            }
        }
    }

    return res

}

var t={val: 16, figli: [{val: 4},{val: 2, figli: [{val: 8},{val: 2}]}]}

console.log(eredita(t) )//→ 13

console.log(eredita({val: 5})) //→ 5