/*
Si scriva in TS una funzione PotaAlberiT(T), che prende come parametro un albero binario T 

(i cui nodi sono implementati come visto a lezione come oggetti con chiavi val di tipo number, sx che contiene il nodo sinistro, 
e dx che contiene il nodo destro).

La funzione taglia i sottoalberi 'secchi'. 
Un sottoalbero è secco se il valore nella radice del sottoalbero è < 0. 
Il taglio avviene eliminando il nodo secco (si veda l'esempio).

La funzione non deve restituire nulla.



La soluzione deve essere scritta in TypeScript, definendo opportunamente i tipi, e non usando any o unknown.



Esempio:

t={ 
    val:20,    

    sx:{
        val:19, 
        sx:{val:8}, 
        dx:{
            val:7, 
            sx:{val:9} 
        } 
    },

    dx:{
        val:-3,
        sx:{val:-8},
        dx:{val:7}
    }
}

Dopo la chiamata a PotaAlberiT(t), t contiene 

{
    val:20, 
    sx:{
        val:19, 
        sx:{val:8}, 
        dx:{
            val:7, 
            sx:{val:9}
        }
    }
}, 

    
    
dove il nodo con valore -3 è stato rimosso.
*/

// 16 min 

interface Nodo{
    val: number;
    dx?: Nodo | null
    sx?: Nodo | null
}


function PotaAlberiT(T:Nodo):void{
    if(T.sx!==null && T.sx!==undefined){
        if(T.sx.val < 0) delete T.sx
        else PotaAlberiT(T.sx)
    }


    if(T.dx!==null && T.dx!==undefined){
        if(T.dx.val < 0) delete T.dx
        else PotaAlberiT(T.dx)
    }
}


var t: Nodo ={ 
    val:20,    

    sx:{
        val:19, 
        sx:{val:8}, 
        dx:{
            val:7, 
            sx:{val:9} 
        } 
    },

    dx:{
        val:-3,
        sx:{val:-8},
        dx:{val:7}
    }
} 
PotaAlberiT(t)

console.log(t)