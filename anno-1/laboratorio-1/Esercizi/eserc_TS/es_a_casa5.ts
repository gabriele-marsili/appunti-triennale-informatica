
/*
class WrongTypeError extends Error {}

class Discarica <T>{
    private cestini : Map<string, T[]>;
    private deleted_element : object[]
    private type_list : string[]

    constructor() {
        this.cestini = new Map<string, T[]>();
        this.deleted_element = []
        this.type_list = ["string", "boolean", "number", "object", "null", "undefined", "any", "unknown"];
    }

    public butta(v:T):void{
        if(this.cestini.has(typeof v)){
            this.cestini.get(typeof v)?.push(v)
        }
        else{
            this.cestini.set(typeof v, [v])
        }
    }

    public svuota(t:string):T[] | object[]{
        
        if(this.cestini.has(t) && this.type_list.includes(t)){
            let temp_arr : T[] | undefined = this.cestini.get(t) // => elementi da eliminare
            let previous_deleted_elements : T[] = []
            let status : string = "pending"
            for(let obj of this.deleted_element){
                if (obj[t] != undefined){
                    previous_deleted_elements = obj[t]
                    obj[t] = obj[t].concat(temp_arr) // concateno precedente arr con elementi eliminarti di tipo T con arr contenente nuovi elementi di tipo T eliminati
                    status = "done"
                }
            }   

            this.cestini.delete(t) // => elimino da mappa
            if(status != "done"){ // => prima volta che elimino questo tipo di elementi
                let del_elements  = {}                    
                del_elements[t] = temp_arr

                this.deleted_element.push(del_elements)
                return this.deleted_element[0][t]
            }

            return previous_deleted_elements;
            
            

        }
        else{
            throw new WrongTypeError("Invalid type!")
        }
    }

    public quanti(t:string):number {
        if(this.type_list.includes(t) == false) throw new WrongTypeError("Invalid type!")

        let n : number = 0;
        for (let obj of this.deleted_element){
            if (obj[t] != undefined) n = obj[t].length;
        }

        if(this.cestini.has(t)){
            //console.log(this.cestini[t])
            let arr_c = this.cestini.get(t)
            console.log(arr_c)
            
            if(arr_c!= undefined) n = n + arr_c.length;
        }
        return n;
        
    }

    public classi():Set<string>{
        let object_set = new Set<string>();

        if(this.cestini.has("object")){
            let obj_arr : T[] | undefined = this.cestini.get("object");
            if (obj_arr != undefined){
                for (let obj of obj_arr){
                    if (typeof obj == "object" && obj != null) object_set.add(obj.constructor.name)

                }
            }
        
        }

        return object_set
        

    }

}

SOLUZIONE PROF 
// Nota: questa versione accetta stringhe e controlla la validità a runtime
// Una versione che dichiarasse un tipo ValidTypeNames="string"|"number" ecc.
// sarebbe ragionevole, ma non consentirebbe di lanciare l'eccezione come richiesto dal testo.

*/
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

