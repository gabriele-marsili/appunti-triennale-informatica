interface albero {
    sx ? : albero,
    dx ?: albero,
    val : number,
    conta : number

}

function contaAlbero(T:albero):void{
    
    function visit(T:albero):number{
        let s_dX : number = 0
        let s_sX : number = 0
        if(T.dx) s_dX = visit(T.dx)
        if(T.sx) s_sX = visit(T.sx)

        return 1 +s_dX + s_sX
    }
   
    if(T.sx) {
        contaAlbero (T.sx)
        
    }

    if(T.dx){
        contaAlbero (T.dx)
        T.conta = visit(T.dx)
    } 
    else T.conta = 0 // => albero non ha nodi nel sottoalbero dx (può averne nel sinistro)

}

/*solizione:
interface nodo {
    sx?: nodo;
    dx?: nodo;
    conta: number
};

function contaAlbero(T: nodo|undefined): number {
    if (T==undefined) return 0;
    let contaSX: number = contaAlbero(T.sx);
    let contaDX: number = contaAlbero(T.dx);
    T.conta = contaSX;
    return 1 + contaSX + contaDX;
}*/