class SizeError extends Error {}


class Matrix_<T> {
    private matrice : T[][]; // => matrice di tipo omogeneo (array di array tutti dello stesso tipo T)
    //prodF : (a:Matrix__<T>,b:Matrix__<T>) => Matrix__<T>
    prodF : (a:T,b:T) => T
    public row : number;
    public col : number;

    public constructor(r:number, c:number, prodF_a : (a:T,b:T) => T){
        this.matrice = [];
        this.row = r;
        this.col=  c;        
        this.prodF = prodF_a
    }


    //metodi:
    public init(e:T): void {
        for(let i=0; i<this.row; i++){
            this.matrice[i] = []
            for(let j=0; j<this.col; j++){
                this.matrice[i].push(e);
            }    
        }
        

        
    }

    public get_el(i:number, j:number):T{ 
        if(i >= this.row || j >= this.col) throw new Error("index out of range");
        
        return this.matrice[i][j];
    }

    public set(i:number, j:number,v:T):void{
        if(i >= this.row || j >= this.col) throw new Error("index out of range");

        this.matrice[i][j] = v;
    }

    public hadam_product(B:Matrix_<T>):Matrix_<T>{
        if(B.col != this.col || B.row != this.row) throw new SizeError("Size mismatch")
        
        let matice_d_appoggio  = new Matrix_<T>(this.row, this.col, this.prodF)
        matice_d_appoggio.init(this.matrice[0][0])


        for(let i=0; i<this.row; i++){            
            for(let j=0; j<this.col; j++){
                matice_d_appoggio.matrice[i][j] = this.prodF(this.matrice[i][j],B.matrice[i][j])
            }    
        } 


        
        
    

        return matice_d_appoggio
    }   

}


let Qg = 
    {
        val: 2, 
        grande: -Infinity, 
        sx: 
            {
                val: 4, 
                grande: -Infinity, 
                sx: 
                    {
                        val: 6, 
                        grande: -Infinity
                    }, 
                dx: {
                        val: 6, 
                        grande: -Infinity, 
                        dx:{
                            val: 8, 
                            grande: -Infinity
                            }
                    }
                }
        ,dx: 
            {
                val: 7, 
                grande: -Infinity, 
                sx: 
                    {
                        val: 8, 
                        grande: -Infinity
                    }
            }
    };



interface Nodo_es{
    val: number;
    grande: number;
    dx?: Nodo_es | null
    sx?: Nodo_es | null


}

function contaMax_1(T:Nodo_es):number {
    let val_dx : number = -Infinity;
    let val_sx : number = -Infinity;
    if(T.dx == undefined && T.sx == undefined) { // => foglia 
        T.grande = T.val;   
             
    }
    else{
        if(T.dx){
            val_dx  = contaMax_1(T.dx);
            if(T.dx.val > val_dx) val_dx = T.dx.val;
        }
        if(T.sx){
            val_sx = contaMax_1(T.sx);
            if(T.sx.val > val_sx) val_sx = T.sx.val;
        }

        if(val_dx > val_sx) T.grande = val_dx;
        else T.grande = val_sx;
    }
    //if(T.val < T.piccolo) T.piccolo = T.val // => controllo su radice 
    return T.grande;

}

/* SOLUZIONE PROF :
interface nodoMin {
    val: number
    sx?: nodoMin;
    dx?: nodoMin;
    piccolo: number
};

function contaMin(T: nodoMin|undefined): number {
    if (T==undefined) return Infinity;
    T.piccolo = Math.min(T.val, contaMin(T.sx), contaMin(T.dx));
    return T.piccolo;
}
*/