class OrdSet <T> {
    cmp_f : (a: T,b: T) => number
    insieme : T[] // => array di elementi omogenei = arr di elementi tutti dello stesso tipo (T)

    constructor(cmp : (a: T,b: T) => number){
        this.cmp_f  = cmp
        this.insieme = []
    }

    add(e:T): void {
        console.log("aggiungo = ",e)

        if(! this.insieme.includes(e)) { 
            this.insieme.push(e)
            this.insieme = this.list()
        } 

    }

    remove(e : T) : void {
        
        if(this.insieme.includes(e)) { // => elemento già presente in insieme 
            this.insieme.splice(this.insieme.indexOf(e),1) // rimuovo elemento da array (-> insiem)
        }

    }

    
    list() : T[] | []{
        this.insieme.sort(this.cmp_f)
        return this.insieme
        
        /*
        let arr :T[]  = [];
        
        for(let el of this.insieme){
            if(!arr.includes(el)) { // => true se arr non include l'elemento (se el non era già in arr)
                let l_arr : number = arr.length
                //console.log(l_arr)
                console.log("l_arr = ",l_arr)

                if (l_arr == 0){
                    arr.push(el);       
                    console.log("new arr (0) = ",arr)
                } 
                else{
                    for(let b of arr){
                        if(this.cmp_f(el,b) <= 0){
                            let indice:  number = arr.indexOf(b);
                            arr.splice(indice,0,el); 
                            console.log("new arr (1) = ",arr)
                            break;
                        }
                    }
                        
                    if (arr.length == l_arr) {
                        arr.push(el);     
                        console.log("new arr (2) = ",arr)
                    }

                }
            }                                    
        }
        
        return arr;
        */
    }
    
    

}



var s1_AAAA=new OrdSet<number>((a,b)=>a-b)
s1_AAAA.add(5)
s1_AAAA.add(3)
s1_AAAA.add(5)
console.log(s1_AAAA.list())


/*SOLUZIONI PROF:
type CmpFun<T> = (a:T,b:T)=>number

class OrdSet<T> {
    cmp:CmpFun<T>
    elements:T[]
    
    constructor(cmp:CmpFun<T>) {
        this.cmp=cmp
        this.elements=[]
    }

    add(e:T):void {
        if (this.elements.findIndex((f:T)=>this.cmp(e,f)==0)==-1)
            this.elements.push(e)
    }

    remove(e:T):void {
        var i:number
        if ((i=this.elements.findIndex((f:T)=>this.cmp(e,f)==0))>=0)
            this.elements.splice(i,1)
    }

    list():T[] {
        this.elements.sort(this.cmp)
        return this.elements
    }
}
*/