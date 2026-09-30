/*Si definisca in TS una classe Agenda il cui costruttore prende in input il numero massimo di eventi che possono essere memorizzati 
per giorno nell'agenda. 

Gli eventi sono gestiti tramite un array di tipo Evento.

Ogni (tipo) Evento è modellato come una tupla contenente un oggetto di tipo Data ed una stringa rappresentante la descrizione dell'evento.

A sua volta, (il tipo) Data è una tripla che codifica il giorno come un numero, il mese come una stringa, e l'anno come un un numero.



La classe Agenda dispone dei seguenti metodi:

aggiungi: il metodo permette di inserire un oggetto Evento all'interno dell'agenda. La funzione controlla il massimo numero di eventi 
giornalieri e lancia un'eccezione GiornoPienoError se questo fosse superato dall'aggiunta del nuovo evento.

lista_eventi: il metodo restituisce un array contenente tutti gli Eventi registrati nella Data passata come argomento.

libera: Dato un oggetto Data passato come argomento, il metodo elimina tutti gli eventi presenti nella giornata in input e restituisce il
 numero di eventi cancellati.


La soluzione deve essere scritta in TypeScript, tenendo conto della corretta dichiarazione dei tipi in ingresso ed in uscita dei metodi (e non usando any o unknown).

 */


// 20 - 25 min 
class GiornoPienoError extends Error{}

type Data = [number,string,number] // gg / mm / yy
type Evento = [Data,string] // data + descrizione evento 


class Agenda{
    eventi : Evento[];
    massimo_eventi_giornalieri : number;

    constructor(event_limit : number) {
        this.eventi = [];
        this.massimo_eventi_giornalieri = event_limit
    }

    public aggiungi(obj:Evento):void{
        if(this.eventi.length + 1 > this.massimo_eventi_giornalieri) throw new GiornoPienoError("Too many events for this day!");

        this.eventi.push(obj);

    }

    public lista_evento(date:Data):Evento[]{
        let res : Evento[] = [];
        for(let ogg of this.eventi){
            let current_event_date : Data = ogg[0];
            if(date[0] == current_event_date[0] && date[1] == current_event_date[1] && date[2] == current_event_date[2]){
                res.push(ogg);
            }
        }

        return res;
    }

    public libera(date:Data):number{
        let counter : number = 0;

        for(let i =0; i<this.eventi.length; i++){
            let current_event_date : Data = this.eventi[i][0];
            if(date[0] == current_event_date[0] && date[1] == current_event_date[1] && date[2] == current_event_date[2]){
                this.eventi.splice(i,1)
                counter ++
            }
        }

        return counter

    }
}