/*
Si scriva una funzione JavaScript deep(T) che, ricevuto un albero binario (non-vuoto) T 
rappresentato come visto a lezione, restituisca il valore del campo val del nodo più profondo (cioè, quello più lontano dalla radice). 
In caso di parità di profondità, la funzione deve restituire il valore del nodo più a sinistra.
*/


var deep = (T) => {    
    if(!T.dx && !T.sx) return T.val;  
    function profondità(T){
        if(T.p) T.p++
        else T.p = 0
        
        if(!T.dx && !T.sx) return T.p;
        let p_dx = 0
        let p_sx = 0

        if(T.dx){
            T.dx.p = T.p+1
            p_dx = profondità(T.dx)
        }

        if(T.sx){
            T.sx.p = T.p+1
            p_sx = profondità(T.sx)
        }

        if(p_sx >= p_dx) return p_sx
        else return p_dx
        // => return Math.max(p_sx,p_dx)

    }

    if(T.sx && T.dx){
        if(profondità(T.sx) >= profondità(T.dx)) return deep(T.sx)
        else return deep(T.dx)
    }

    if(T.sx) return deep(T.sx)
    else return deep(T.dx)    
    
}