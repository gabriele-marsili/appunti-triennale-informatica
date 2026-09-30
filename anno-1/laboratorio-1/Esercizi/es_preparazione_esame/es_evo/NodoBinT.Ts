class AlberoInvalido extends Error{}


class NodoBinT<T> {
    val : T;
    label : string = "";
    chidren : NodoBinT<T>[] = [];

    constructor(valore:T,etichetta ? :string) {
        this.val = valore;
        if(etichetta) this.label = etichetta;
    }

    public add(...args : NodoBinT<T>[]) : void{
        
        for(let el of args){
            if(this.chidren.length +1 >= 3 ) throw new AlberoInvalido("Too many node!")
            else this.chidren.push(el)
        }
          
    }

    public visita(res : T[]):void{
        res.push(this.val)
        for(let i = this.chidren.length-1; i >= 0; i--){
            this.chidren[i].visita(res)
        }
    }

    public * visit(): Generator<T, T, T>{



        let index :number = 0
        let res : T[] = [];
        res.push(this.val)

        if(this.chidren.length != 0){
            for(let i = this.chidren.length-1; i >= 0; i--){
                this.chidren[i].visita(res)                
            }
        }

        while(index < res.length-1){
            yield res[index]
            index ++ 
        }

        return res[index]
        

    }

}

/*
soluzione: 


class AlberoInvalido extends Error {}

class NodoBinT<T> {
    val: T;
    label: string;
    children: NodoBinT<T>[];
    constructor(val: T,label: string="") {
        this.val=val;
        this.label=label;
        this.children=[];
    }

    add(...children: NodoBinT<T>[]): void {
        if (this.children.length+children.length >2)
            throw new AlberoInvalido("Not binary");
        else
            this.children.push(...children);
    }

    *visit(): IterableIterator<T> {
        yield this.val;
        for (var c of this.children) {
            for (var v of c.visit())
                yield v;
        }
        return;
    }
}
*/

