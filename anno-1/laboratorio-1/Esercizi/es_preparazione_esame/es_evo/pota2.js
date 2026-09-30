/*
Si scriva una funzione pota2(t,k) che, 
dato un albero binario t costruito come visto a lezione con nodi 
{val:v, sx:ts, dx:td}, modifichi t rimuovendo tutti i nodi aventi v>k 
(e gli eventuali sottoalberi radicati in tali nodi), e restituisca il 
numero totale di nodi rimossi (inclusi quelli nei sottoalberi).
*/

function pota2(t,k){
    let num_nodi_rimossi = 0
    if(t == undefined) return 0
    
    function get_nodi(t){
        let c = 0;
        if(t.sx){
            c += 1 + get_nodi(t.sx);
        }
        if(t.dx){
            c += 1 + get_nodi(t.dx);
        }
        return c;
    }

    if(t.val > k){
        num_nodi_rimossi += 1 + get_nodi(t)
        t = {}
        return num_nodi_rimossi
    }
    if(t.sx){
        if(t.sx.val > k){
            num_nodi_rimossi += 1 + get_nodi(t.sx)
            delete t.sx
        }else{
            num_nodi_rimossi += pota2(t.sx,k)
        }
    }
    if(t.dx){
        if(t.dx.val > k){
            num_nodi_rimossi += 1 + get_nodi(t.dx)
            delete t.dx
        }else{
            num_nodi_rimossi += pota2(t.dx,k)
        }
    }
    return num_nodi_rimossi;
}

let T = {
    val:1,
    sx : {
        val : 8,
        sx: { val : 7},
        dx : {val : 1}
    },
    dx : {
        val : 3,
        sx: { val : 5}
    }
}

//console.log(pota2(T,4))
//console.log(pota2(T,7))
console.log(pota2(T,11))