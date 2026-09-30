/*
albero{
    dx : filgio dx; (opzionale)
    sx : filgio sx; (opzionale)
    grande : 
    val : numeber 

}
*/

interface tree {
    sx ? : tree;
    dx ? : tree;
    val : number;
    grande : number;
}

function contaMax(T:tree):number{
    
    let sx_max : number = -Infinity
    let dx_max : number = -Infinity

    if (T.sx){
        contaMax(T.sx)        
        sx_max = T.sx.grande
    }

    if(T.dx){
        contaMax(T.dx)        
        dx_max = T.dx.grande
    }

    T.grande = Math.max(T.val,sx_max,dx_max)
    

    return T.grande
}