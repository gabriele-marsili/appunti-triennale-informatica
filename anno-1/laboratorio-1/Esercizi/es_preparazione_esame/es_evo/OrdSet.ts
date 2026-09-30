/*
Si vuole implementare una classe TypeScript OrdSet che fornisca un insieme ordinato di elementi di tipo omogeneo.
Un insieme ordinato ha le consuete proprietà di un insieme, ma in più mantiene un ordine fra i suoi elementi. 
Nel nostro caso, l'ordinamento desiderato è implementato da una funzione cmp(a,b) che restituisce un qualunque 
numero minore di 0 se a<b
, esattamente 0 se a=b
, e un qualunque numero maggiore di 0 se a>b

Si noti che il concetto di "maggiore", "minore", "uguale" è definito dalla funzione cmp, non è necessariamente
 'ordinamento degli operatori <, >, >=, <=, ==, ===, !=, !== di TypeScript.



La classe deve implementare i seguenti metodi:

un costruttore, che prende come argomento la funzione cmp da usare per i confronti
un metodo add(e) che aggiunge l'elemento e all'insieme (se e è già presente, l'insieme non viene modificato)
un metodo remove(e) che rimuove l'elemento e dall'insieme (se e non è presente, l'insieme non viene modificato)
un metodo list() che restituisce un array contenente gli elementi dell'insieme, nell'ordine stabilito da cmp


Come sempre, si curi di definire i tipi nella maniera più precisa possibile.
*/

class OrdSet<T>{
    public insieme : T[] = []
    public cmp : (a:T,b:T) => number;
    
    constructor(cmp : (a:T,b:T) => number) {
        this.cmp = cmp
    }

    add(e:T) : void {
        if(!this.insieme.includes(e)){
            if(this.insieme.length === 0) {
                this.insieme.push(e)
            }
            else{
                for(let i = 0; i < this.insieme.length; i++){
                    if(this.cmp(e,this.insieme[i]) <= 0){
                        this.insieme.splice(i,0,e);
                        break;
                    }
                }
            }
            
        }
    }

    remove(e:T) : void {
        if(this.insieme.includes(e)){
            this.insieme.splice(this.insieme.indexOf(e), 1);
        }
    }

    list() : T[] {
        let res : T[] = [];
        for(let el of this.insieme){
            res.push(el);
        }
        res.sort(this.cmp);
        return res;
    }

}


/*soluzione:
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