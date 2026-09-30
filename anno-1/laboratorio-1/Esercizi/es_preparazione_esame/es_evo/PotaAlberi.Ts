/*
Si scriva in TS una funzione PotaAlberiT(T), che prende come parametro un albero binario T (i cui nodi sono implementati come visto a lezione come oggetti con chiavi val di tipo number, sx che contiene il nodo sinistro, e dx che contiene il nodo destro). La funzione taglia i sottoalberi 'secchi'. Un sottoalbero è secco se il valore nella radice del sottoalbero è < 0. Il taglio avviene eliminando il nodo secco (si veda l'esempio).

La funzione non deve restituire nulla.



La soluzione deve essere scritta in TypeScript, definendo opportunamente i tipi, e non usando any o unknown.



Esempio:

t={val:20, sx:{val:19, sx:{val:8}, dx:{val:7, sx:{val:9} } }, dx:{val:-3, sx:{val:-8},dx:{val:7}}}

Dopo la chiamata a PotaAlberiT(t), t contiene {val:20, sx:{val:19, sx:{val:8}, dx:{val:7, sx:{val:9} } }}, dove il nodo con valore -3 è stato rimosso.
*/

interface Tree{
    sx? : undefined | Tree;
    dx? : undefined | Tree;
    val : number | undefined;
}

function PotaAlberiT(T:Tree):void{
    if(T.val && T.val < 0){
        delete T.val
        delete T.sx
        delete T.dx
    }

    if(T.sx){
        if(T.sx.val && T.sx.val < 0){ //  => T.sx secco
            delete T.sx
        }
        else{
            PotaAlberiT(T.sx)
        }
    }

    if(T.dx){
        if(T.dx.val && T.dx.val < 0){ //  => T.dx secco
            delete T.dx
        }
        else{
            PotaAlberiT(T.dx)
        }
    }
    
}