class VeicoloError extends Error{}
class Veicolo {
    #targa;
    #colore;
    #n_ruote;
    constructor(t,c,n){        
        this.check(t,n,c)                    
    } 

    check(t,n,c){
        let args = [t,n,c]
        for(let i = 0; i < args.length; i++){
            let el = args[i];
            if(typeof el === "string"){
                let control = new RegExp("[a-z]+")
                if(el.length === 7 && control.test(el)){
                    this.#targa = el
                    args.splice(i,1)
                    i--
                    
                }
                else if(control.test(el)){   
                    this.#colore = el
                    args.splice(i,1)
                    i--
                }
                else if(this.#targa != undefined && this.#targa != null){
                    throw new VeicoloError("Il colore deve essere una sequenza alfabetica!")
                }
                else{
                    this.#targa = undefined
                    throw new VeicoloError("La targa deve essere una sequenza alfanumerica di 7 caratteri!")
                }
                
            }
            else if(typeof el === "number" && el > 0 && !(String(el).includes("."))){
                this.#n_ruote = el
                args.splice(i,1)
                i--
            }
            else {
                throw new VeicoloError("errore")
            }
        }
        if(args.length > 0 || this.#targa === undefined || this.#n_ruote === undefined || this.#colore === undefined){
            throw new VeicoloError("non tutte le info corrette")
        }
        else return true

    }

    get targa(){
        return this.#targa
    }
    set targa(t){
        if(this.check(t,this.#colore,this.#n_ruote)){
            this.#targa = t
        }
    }

    get colore(){
        return this.#colore
    }
    set colore(c){
        if(this.check(this.#targa,c,this.#n_ruote)){
            this.#colore = c
        }
    }

    get n_ruote(){
        return this.#n_ruote
    }
    set n_ruote(n){
        if(this.check(this.#targa,this.#colore,n)){
            this.#n_ruote = n
        }
    }
    
    toString(){
        return this.#targa  + String(this.#n_ruote) + this.#colore
    }

}


class Autobus extends Veicolo{
    #targa;
    #colore;
    #n_porte;
    constructor(t,c,num_porte){        
        super(t,4,c)
        this.n_ruote = 4;        
        this.check_values(t,4,c)
        this.check_porte(num_porte)        
    }

    check_values(t,n,c){
        let args = [t,n,c]
        for(let i = 0; i < args.length; i++){
            let el = args[i];
            if(typeof el === "string"){
                let control = new RegExp("[a-z]+")
                if(el.length === 7 && control.test(el)){
                    this.#targa = el
                    args.splice(i,1)
                    i--
                    
                }
                else if(control.test(el)){   
                    this.#colore = el
                    args.splice(i,1)
                    i--
                }
                else if(this.#colore != undefined && this.#colore != null){
                    throw new VeicoloError("La targa deve essere una sequenza alfanumerica di 7 caratteri!")
                }
                else{
                    throw new VeicoloError("Il colore deve essere una sequenza alfabetica!")
                }
                
            }
            else if(typeof el === "number" && el > 0 && !(String(el).includes("."))){
                this.n_ruote = el
                args.splice(i,1)
                i--
            }
            else {
                throw new VeicoloError("errore")
            }
        }
        if(args.length > 0 || this.#targa === undefined || this.n_ruote === undefined || this.#colore === undefined){
            throw new VeicoloError("non tutte le info corrette")
        }
        else return true

    }

    check_porte(n_p){
        let msg = "" 
        if(typeof n_p != "number" || n_p <= 0 || String(n_p).includes(".")){
            msg = "Il n porte deve essere una numero intero > 0, ha tipo: " + typeof n_p + " ed è " + n_p
            throw new VeicoloError(msg)            
        }
        else{
            this.#n_porte = n_p
            return true
        }  

    }

    get n_porte(){
        return this.#n_porte
    }
    set n_porte(n){
        this.check_porte(n)                
    }

    toString(){
        return this.#targa + String(this.n_ruote) + this.#colore + String(this.#n_porte)
    }

}

var v = new Veicolo('af145nb', 2, 'rosso')
console.log(v.targa, 'af145nb')
console.log(v.n_ruote, 2)
console.log(v.colore, 'rosso')