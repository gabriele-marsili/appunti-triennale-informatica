/*
Si definisca in TS una classe Agenda il cui costruttore prende in input il numero massimo di eventi che possono essere memorizzati 
per giorno nell'agenda. 
Gli eventi sono gestiti tramite un array di tipo Evento.

Ogni (tipo) Evento è modellato come una tupla contenente un oggetto di tipo Data ed una stringa rappresentante la descrizione dell'evento.

A sua volta, (il tipo) Data è una tripla che codifica il giorno come un numero, il mese come una stringa, e l'anno come un un numero.



La classe Agenda dispone dei seguenti metodi:

aggiungi: il metodo permette di inserire un oggetto Evento all'interno dell'agenda. La funzione controlla il massimo numero di eventi 
giornalieri e lancia un'eccezione GiornoPienoError se questo fosse superato dall'aggiunta del nuovo evento.

lista_eventi: il metodo restituisce un array contenente tutti gli Eventi registrati nella Data passata come argomento.

libera: Dato un oggetto Data passato come argomento, il metodo elimina tutti gli eventi presenti nella giornata in input e 
restituisce il numero di eventi cancellati.


La soluzione deve essere scritta in TypeScript, tenendo conto della corretta dichiarazione dei tipi in ingresso ed in uscita dei metodi 
(e non usando any o unknown).
*/

type Data = [number, string, number] // day / month / year
type Evento = [Data,string] // ogg type Data + string (descrizione evento)

class GiornoPienoError extends Error {};

class Agenda{
    public eventi : Evento[]  = [];
    public num_max_eventi_per_giorno : number
    constructor(max_events: number) {
        this.num_max_eventi_per_giorno = max_events;
    }

    public aggiungi(e : Evento) : void{
        // controllo max num eventi per giorno:
        let e_date : Data = e[0]
        let c : number = 0; // counter 
        for(let element of this.eventi){
            if(element[0] === e_date) c++;            
        }   
        if(c+1 > this.num_max_eventi_per_giorno) {throw new GiornoPienoError("too many evets for this day!")}
        else this.eventi.push(e);

        
    }   

    public lista_eventi(d : Data) : Evento[] {
        let res : Evento[] = [];
        for(let element of this.eventi){
            let current_date = element[0]
            if(current_date[0] === d[0] && current_date[1] === d[1] && current_date[2] === d[2]) {
                res.push(element);            
            }
        }  
        return res;
    }
    public libera(d : Data):number {
        let c : number = 0; // counter 
        for(let element of this.eventi){
            let current_date = element[0]
            if(current_date[0] === d[0] && current_date[1] === d[1] && current_date[2] === d[2]) {
                c++;
                this.eventi.splice(this.eventi.indexOf(element,1));
            }
        }   
        return c;

    }
}


let oggi: Data = [29, 'Marzo', 2023];
let evento: Evento = [oggi, 'Scrivere Compito'];
let evento_2: Evento = [oggi, 'fare la spesa'];
let agenda = new Agenda(10);
agenda.aggiungi(evento);
agenda.aggiungi(evento_2);
console.log(agenda.lista_eventi(oggi));



/*soluzione:

class GiornoPienoError extends Error {};

type Data = [number, string, number];
type Evento = [Data, string];

function compara_date(d1: Data, d2: Data) {
    return d1[0] == d2[0] && d1[1] == d2[1] && d1[2] == d2[2];
}

class Agenda {
    eventi: Evento[];
    max_eventi: number;

    constructor(max_eventi: number) {
        this.eventi = [];
        this.max_eventi = max_eventi;
    }

    lista_eventi(data: Data): Evento[] {
        return this.eventi.filter(
            e => compara_date(e[0], data)
        )
    }

    aggiungi(evento: Evento): void {
        // Ottieni data
        let data = evento[0];
        // Conta eventi in data
        let n_eventi = this.lista_eventi(data).length;
        // Eventualmente aggiungi
        if (n_eventi < this.max_eventi) {
            this.eventi.push(evento);
        } else {
            throw new GiornoPienoError();
        }
    }

    libera(data: Data): number {
        let n_eventi = this.lista_eventi(data).length;
        this.eventi = this.eventi.filter(
            e => !compara_date(e[0], data)
        )
        return n_eventi;
    }
}
*/