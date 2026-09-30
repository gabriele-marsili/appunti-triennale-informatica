/*Si consideri una struttura dati ad albero binario,
i cui nodi sono oggetti con quattro proprietà:
sx e dx, che riferiscono rispettivamente al figlio sinistro e al figlio destro del nodo stesso;
val e conta, due valori interi. 

Le proprietà sx e dx sono opzionali.*/

/*

nodo / radice = {
    sx : 
}
*/

let Qa = {

    val: 2,

    conta: -Infinity, 

    sx: 
    
        {
            val: 4, 
            conta: -Infinity, 
            sx: 
                {
                    val: 6, 
                    conta: -Infinity
                }, 
            dx: 
                {
                    val: 6,
                    conta: -Infinity,
                    dx:
                        {
                            val: 8, 
                            conta: -Infinity
                        }
                }
        },
        

    dx:
        {
            val: 7,
            conta: -Infinity,
            sx:
                {
                    val: 8, 
                    conta: -Infinity
                }
        }
}; 



interface Nodo_G{
    val: number;
    conta: number;
    dx ? : Nodo_G;
    sx ? : Nodo_G
}



function contaAlbero(T:Nodo_G):Nodo_G{
    
    
    if (T.dx === undefined){
        T.conta = 0;
    }

    else{ // => T.dx != undefined
        T.dx  = contaAlbero(T.dx);  
        let sotto_albero_dx = T.dx;
        
        
        
        if(sotto_albero_dx.sx != undefined) {
            sotto_albero_dx.sx = contaAlbero(sotto_albero_dx.sx);  
            T.conta = T.dx.conta + 1 +  sotto_albero_dx.sx.conta + 1
        }
        else T.conta = T.dx.conta + 1 ;


        
    }

    if(T.sx != undefined) T.sx = contaAlbero(T.sx);

    return T
}

console.log(contaAlbero(Qa))


/*CONTA SOTTO:


interface Nodo_G{
    val: number;
    sotto: number;
    dx?: Nodo_G | null
    sx?: Nodo_G | null


}

function contaSotto(T:Nodo_G):number{
    
    if(T.dx != undefined){      
        T.sotto = T.sotto + contaSotto(T.dx)
    }
    
    if(T.sx != undefined){
        
        T.sotto = T.sotto + contaSotto(T.sx)
    }
    
    T.sotto = T.sotto + 1 // => radice inclusa 
    return T.sotto
}



*/


/*CONTA ALBERO SX 
interface Nodo_G{
    val: number;
    conta: number;
    dx ? : Nodo_G;
    sx ? : Nodo_G
}

function ContaNodi(T:Nodo_G):number{
    let res : number=0;
    
    if(T.dx != undefined) res = res + ContaNodi(T.dx)
    if(T.sx != undefined) res = res + ContaNodi(T.sx)
    res = res +1 

    return res 
}

function contaAlbero(T:Nodo_G):Nodo_G{
    
    
    if (T.sx === undefined){
        T.conta = 0;
    }

    else{ // => T.sx != undefined
        T.sx  = contaAlbero(T.sx);  
        let sotto_albero_sx = T.sx;
        
        T.conta = ContaNodi(sotto_albero_sx)
               

        
    }

    if(T.dx != undefined) T.dx = contaAlbero(T.dx);

    return T
}

 */