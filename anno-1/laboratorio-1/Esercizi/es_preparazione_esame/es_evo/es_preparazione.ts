/*Creare una classe "ArrayDiInsiemi" con un campo privato contenente un array di insiemi. 

La classe deve avere un metodo "OrdinaInsiemi" che restituisce l'array di insiemi ordinati 
(un insieme A viene posizionato prima di un insieme B se A è sottoinsieme di B), 
se due insiemi non sono compatibili lanciare una eccezione "InsiemiNonConfrontabili" da definire. 
Inoltre la classe ha anche un metodo generatore che restituisce uno ad uno gli insiemi dell'array quando invocato*/

class InsiemiNonConfrontabili extends Error{};
class InsiemeGiaPresente extends Error{};
class ArrayDiInsiemi{
    private arrInsiemi : object[] = [];
    constructor() {
        this.arrInsiemi = [];
    }

    public add_insieme(insieme : object):void{
        if(this.arrInsiemi.indexOf(insieme) != -1){
            throw new InsiemeGiaPresente("InsiemeGiaPresente error")
        }  
        else if (insieme === undefined){
            throw new Error("insieme is undefined")
        } 
        else{
            this.arrInsiemi.push(insieme)
        }
    }

     
    public OrdinaInsiemi():object{
        function check_sottoinsieme(a : object, b:object):boolean {
            // if due insiemi non compatibili => trow new InsiemiNonConfrontabili("errore")
            for(let propriety in a){ // scorro chiavi di a 
                if(!(propriety in b)){ // se in a c'è una chiave che non è in b allora a non è un sottoinsieme di b
                    return false;
                }
            }
           
            return true // => tutte le chiavi di a sono in b => a sottoinsieme di b
        }
    

        function get_sort_values(a:object, b:object):number{
            if(check_sottoinsieme(a,b)){
                return -1 // => a < b (a sottoinsieme di b)
            }
            else return 1 // => a > b (b sottoinsieme di a)
        }

        this.arrInsiemi.sort(get_sort_values)
        /*for(let i =0; i< this.arrInsiemi.length; i++){
            let j = i+1;
            while(scheck_sottoinsieme(this.arrInsiemi[i], this.arrInsiemi[j])){
                // => insieme in i+1 è sottoinsieme di insieme in i
                //scambio:
                let temp = this.arrInsiemi[i];
                this.arrInsiemi[i] = this.arrInsiemi[i+1]
                this.arrInsiemi[i+1] = temp;
                i--
            }
        }*/


        return this.arrInsiemi
    }

    public *take_insieme():IterableIterator<object> {
        for(let insieme of this.arrInsiemi) {
            yield insieme
        }
        return;
    }

}


var insieme_a = {
    1 : true,
    2 : true,
    3 : true,
    4 : true,
}

var insieme_b = {   
    2 : true,  
    4 : true,
}

var insieme_c = {    
    2 : true,
}

var insieme_d = {};

var insieme_e ={5:true}


var arr_insiemi = new ArrayDiInsiemi()
arr_insiemi.add_insieme(insieme_a)
arr_insiemi.add_insieme(insieme_b)
try{
    arr_insiemi.add_insieme(insieme_a)
}catch(e){
    console.log("error: " + e)
}

arr_insiemi.add_insieme(insieme_c)
arr_insiemi.add_insieme(insieme_d)
arr_insiemi.add_insieme(insieme_e)


console.log(arr_insiemi.OrdinaInsiemi())
let gen = arr_insiemi.take_insieme()

console.log(gen.next())
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())

