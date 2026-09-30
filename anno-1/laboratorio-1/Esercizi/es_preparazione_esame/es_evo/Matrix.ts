class SizeError extends Error{}
class Matrix<T>{
    public row : number;
    public col : number;
    public prodF : (a:T, b:T) => T
    private Matr : T[][]
    constructor(n_r : number, n_col : number, fun: (a:T, b:T) => T ){
        this.row = n_r
        this.col = n_col
        this.prodF = fun
        this.Matr = []
    }

    public init(e:T){
        for(let i = 0; i<= this.col; i++){
            this.Matr.push([])
            for(let j = 0; j<= this.row; j++){
                this.Matr[i].push(e)//[i][j] = e
            }
        }
    }

    public get_el(i:number, j:number):T{
        return this.Matr[i][j]
    }

    public set_el(i:number, j:number,v:T):void{
        this.Matr[i][j] = v
    }

    public hadam_product(B:Matrix<T>):Matrix<T>{
        console.log(this.Matr)
        console.log(B)
        
        if(this.col != B.col || this.row != B.col) throw new SizeError("SizeError")
        else{
            let C : Matrix<T> = new Matrix(this.row,this.col,this.prodF)
            let temp_v : T = this.prodF(this.get_el(0,0),B.get_el(0,0))
            C.init(temp_v)
            for(let i = 0; i<= this.col; i++){
                for(let j = 0; j<= this.row; j++){
                    let v : T = this.prodF(this.get_el(i,j),B.get_el(i,j))
                    C.set_el(i,j,v)
                }
            }
            return C
        }
    }
}


function list<T>(M:Matrix<T>):Array<T>{
    let res:Array<T>=[]
    for (let i=0;i<M.row;i++)
          for (let j=0;j<M.col;j++)
            res.push(M.get_el(i,j))
    return res
}
let M1=new Matrix<number>(2,2,(a,b)=>a-b)
let M2=new Matrix<number>(2,2,(a,b)=>b-a)
M1.init(1)
M2.init(2)
console.log(list(M1.hadam_product(M2)),[-1, -1, -1, -1])
console.log(list(M2.hadam_product(M1)),[-1, -1, -1, -1])