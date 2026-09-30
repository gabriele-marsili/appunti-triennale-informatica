/*

Si scriva una funzione piaga(T) che, ricevuto un albero k-ario T come visto a lezione, 
lo modifichi eliminando tutti i "primogeniti", ovvero il primo dei figli di ciascun nodo 
(ed eventualmente il relativo sottoalbero). La funzione deve restituire il numero totale di nodi eliminati.

Per esempio, chiamando piaga(T) sull'albero sotto a sinistra, si vuole ottenere che 
T sia modificato come l'albero sotto a destra, e il valore di ritorno sia 5. Nella prima figura, 
i nodi "primogeniti" sono colorati in arancione, ma si noti che vengono eliminati anche altri nodi 
(i discendenti di primogeniti).

*/


function piaga(T){
    let c = 0
    if(T && T.figli){
        let del_p = true
        for(let i = 0; i<T.figli.length; i++){
            
            if(i === 0 && del_p){
                if(T.figli[i].figli){
                    c += T.figli[i].figli.length;
                }
                T.figli.splice(i,1)
                i--
                del_p = false     
                c++           
            }
            else{

                c += piaga(T.figli[i])
            }
        }        
    }

    return c 

}


var T={
    val: 1,
    figli: [
        {val: 2, figli: [{val: 3}, {val: 4}]},
        {val: 5},
        {val: 6, figli: [ {val: 7}]},
        {val: 8},
        {val: 9, figli: [{val: 10}, {val: 11}]}
    ]
}

console.log(piaga(T),5)
console.log(T.figli[2],{val: 8})
console.log(T.figli[3].val, 9)
console.log(T.figli[3].figli) // , [{val:11}]