/*
Si scriva una classe JavaScript di nome Eurovision che potrebbe far parte del sistema di gestione di un concorso canoro. 
In particolare, la classe deve mantenere un insieme di cantanti, da cui estrarre poi un ordine di esibizione per due serate (le semi-finali). 
Ignoriamo qui la necessità di svolgere anche una finale.



Eurovision deve implementare un metodo iscrivi(c) che iscrive al concorso un cantante c. Un cantante è un oggetto qualunque, 
ma può iscriversi solo se dispone di un metodo canta (non importano gli argomenti e il valore di ritorno). 
Il metodo iscrivi(c) deve controllare se c ha un metodo canta(); se sì, c viene aggiunto all'insieme degli iscritti; 
altrimenti viene lanciata un'eccezione di tipo NonCantaError (che dovrete definire nel vostro codice).



Eurovision deve poi implementare un metodo semifinale(n) che restituisce, un array di cantanti, ordinati in maniera casuale 
(quindi: non sempre gli stessi) tratti in maniera casuale (quindi: non sempre la stessa) dall'insieme dei cantanti iscritti. 
L'argomento n avrà come valore 1 (per la prima semi-finale) o 2 (per la seconda semi-finale). 
Tutti i cantanti iscritti devono esibirsi in esattamente una delle due semi-finali 
(non devono cantare due volte, né devono essere "dimenticati"). 
È possibile che semifinale(n) venga chiamato più volte, anche con lo stesso n; 
il risultato può (anzi: deve, statisticamente) cambiare ad ogni chiamata. È garantito che semifinale(2) 
verrà chiamato solo dopo aver chiamato almeno una volta semifinale(1).

I cantanti devono essere divisi in due semifinali approssimativamente uguali; se il numero di cantanti è dispari, 
la prima semi-finale avrà un cantante in più della seconda.

Se dopo aver chiamato semifinale(1) si iscrive un nuovo cantante, la semi-finale già organizzata viene annullata 
(in pratica: dovrà essere chiamato di nuovo semifinale(1) dopo il cambiamento dell'insieme dei cantanti).
*/

class NonCantaError extends Error{}
class Eurovision {
    constructor() {
        this.cantanti = [];
        this.cantanti_sf_1 = [];
        this.cantanti_sf_2 = [];
    }

    iscrivi(c){
        
        this.cantanti_sf_1 = [];
        this.cantanti_sf_2 = [];

        if(typeof c.canta === 'function'){
            //c.semiF = 0;
            this.cantanti.push(c);
            this.semifinale(1)
        }
        else throw new NonCantaError("non canta")
    }

    semifinale(n){

        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
        }

        //console.log("this.cantanti = ",this.cantanti)
        //console.log("this.cantanti_sf_1 = ",this.cantanti_sf_1)

        if(n === 1){
            this.cantanti_sf_1 = [];
        
        }else this.cantanti_sf_2 = [];
          
        let res = [];
        let plus = this.cantanti.length % 2 == 0 ? 0:1
        let m = n === 1 ? Math.floor(this.cantanti.length / 2)+plus : this.cantanti.length - this.cantanti_sf_1.length
        //console.log("m = ",m)
        for(let i=0; i<m; i++){
            //console.log(i)
            let r = getRandomIntInclusive(i, this.cantanti.length-1)
            console.log(this.cantanti[r])
            
            let ref
            let ref_2
            if(n==1) ref = this.cantanti_sf_2 
            if(n==2) ref = this.cantanti_sf_1

            if(n==1) ref_2 = this.cantanti_sf_1 
            if(n==2) ref_2 = this.cantanti_sf_2
            
            while((ref.indexOf(this.cantanti[r]) != -1) || ((ref_2.indexOf(this.cantanti[r]) != -1))){
                console.log("while:\nr = ",r)
                console.log("i = ",i)
                console.log("this.cantanti.length = ",this.cantanti.length)
                console.log("this.cantanti[r] = ",this.cantanti[r])
                
                r = getRandomIntInclusive(0, this.cantanti.length-1)
            }           

            //this.cantanti[r].semiF = n;
            res.push(this.cantanti[r])
            if(n === 1){
                this.cantanti_sf_1.push(this.cantanti[r])
            }else{
                this.cantanti_sf_2.push(this.cantanti[r])
            }

        }
        console.log("sf1 = ", this.cantanti_sf_1)
        console.log("sf2 = ", this.cantanti_sf_2)
        return res
    }


}
