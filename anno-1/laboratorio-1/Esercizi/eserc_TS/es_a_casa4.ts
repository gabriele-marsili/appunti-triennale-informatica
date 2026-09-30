class WrongTypeError_1 extends Error {}


class Discarica_1<T>{
    private cestini : Map<string, T[]>;
    private quantity: object;

    constructor() {
        this.cestini = new Map<string,T[]>() // => mappa -> oggetto le cui chiavi sono stringhe indicizzanti il tipo - i valori sono array i cui elementi son del tipo indicato nella chiave        
        this.quantity = {}
    }

    public butta(v:T):void{
        //let type_v = typeof v;
        
        if(this.cestini.has(typeof v)){
            //console.log("typeof v in cestini => ",this.cestini.get(typeof v) )
            //let arr = 
            this.cestini.get(typeof v)?.push(v)
            //console.log("new cestino con v-> ",typeof v," => ",this.cestini.get(typeof v) )

            //arr.push()

            //this.cestini[(typeof v)].push(v);
            this.quantity[(typeof v)] =+ 1 
        }
        else{
            this.cestini.set(typeof v, [v])

            //let arr: T[] = []            
            //arr.push(v)            
            //this.cestini.get(typeof v)?.push(v)

            //this.cestini.set(typeof v, arr)
            //console.log("nuovo cestino con v-> ",typeof v," => ",this.cestini.get(typeof v) )


            //this.cestini[(typeof v)].push(v);
            //this.quantity[(typeof v)] =+ 1 
            
        }
                 
    }

    public svuota(t:string):[]{
        if(!(this.cestini.has(t))) throw new WrongTypeError_1("wrong type")
        else{            
            let arr = this.cestini[t];
            delete this.cestini[t]; // => remove propriety 
            return arr;
        }
    }   

   public quanti(t:string):number{
    if(!(this.cestini.has(t))) throw new WrongTypeError_1("wrong type")
        else return this.quantity[t]        
   }

   public classi():Set<object>{
        let object_set = new Set<object>();
        //console.log("new object set = ", object_set)
        if(!(this.cestini.has("object"))) {
            //console.log("object not in cestini:\n",this.cestini)
            return object_set
        }
        else{
            let arr : object[] | undefined | T[]= this.cestini.get("object")
            if(Array.isArray(arr)){
                for(let i = 0; i < arr.length; i++){
                    let obj = arr[i];
                    if(typeof obj === "object" && obj !== null){
                        object_set.add(obj.constructor)
                    
                        //console.log("new -add- object set = ", object_set)
                    }                                
                }   
            }
            //else //console.log('this.cestini["object"] not an array:\n',)
            return object_set
        }
   }

}



/*SOLUZIONE PROF 
// Nota: questa versione accetta stringhe e controlla la validità a runtime
// Una versione che dichiarasse un tipo ValidTypeNames="string"|"number" ecc.
// sarebbe ragionevole, ma non consentirebbe di lanciare l'eccezione come richiesto dal testo.


class WrongTypeError extends Error {}

class Discarica {
    private cestini:{[tipo:string]:any[]}={}
    private contatori:{[tipo:string]:number}={}

    private valid(t:string):boolean {
        return /string|number|boolean|undefined|object|function/.test(t)
    }

    public butta(v:any):void {
        if (!(typeof v in this.cestini)) {
            this.cestini[typeof v]=[]
            this.contatori[typeof v]=0
        }
        this.cestini[typeof v].push(v)
        this.contatori[typeof v]++
    }

    public svuota(t:string): any[] {
        if (!this.valid(t))
            throw new WrongTypeError(`Invalid type name ${t}`)
        if (t in this.cestini) {
            let r=this.cestini[t]
            this.cestini[t]=[]
            return r
        } else {
            return []
        }
    }

    public quanti(t:string):number {
        if (!this.valid(t))
            throw new WrongTypeError(`Invalid type name ${t}`)
        if (t in this.contatori)
            return this.contatori[t]
        else
            return 0
    }

    public classi():Set<Function> {
        let s=new Set<Function>()
        let o=this.cestini["object"]||[]
        o.forEach(e=>s.add(e.constructor))
        return s
    }
}

*/