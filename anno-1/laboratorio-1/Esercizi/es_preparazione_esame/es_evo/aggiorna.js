/*
Sia un ordine un oggetto avente le seguenti chiavi: numero_ordine (intero), 
giorno (intero), mese (intero), anno(intero), prezzo (numerico).

Definire una funzione aggiorna che prende in input un array di ordini e modifica in-place ogni ordine aggiornando 
il relativo campo numero_ordine (intero) nel seguente modo:



- l'ordine con la data (giorno, mese, anno) più vecchia avrà il campo numero_ordine = 1,

- il successivo ordine (in ordine temporale) avrà il campo numero_ordine = 2 e così via...

- l'ordine più recente ha il campo numero_ordine = n, dove n è il numero di ordini presenti nell'array in input.



Si noti che se due o più ordini hanno la stessa data allora il campo numero_ordine è aggiornato rispettando 
l'ordinamento del campo numero_ordine dei dati in input (si noti nell'esempio i primi due ordini alla data 7/12/2022).

Attenzione, l'ordine dell'array di input non deve essere modificato, 
solamente il campo numero_ordine dev'essere aggiornato secondo le specifiche.
*/

function aggiorna(arr_ordini){

    function find_n_ordine(ordine,array){
        let n_ordne = 1
        for(let o of array){
            //per ogni ordine precedente ad "ordine" aumento n_ordine
            if(o != ordine){
                let k = true
                if(o.anno < ordine.anno && k){
                    n_ordne++
                    k = false;
                }
                else if(o.anno == ordine.anno && o.mese < ordine.mese && k){
                    n_ordne++
                    k = false;
                }
                else if(o.anno == ordine.anno && o.mese == ordine.mese && o.giorno < ordine.giorno && k){
                    n_ordne++ 
                    k=false;                   
                }
                else if(o.anno == ordine.anno && o.mese == ordine.mese && o.giorno == ordine.giorno && k){
                    if(o.numero_ordine < ordine.numero_ordine){
                        n_ordne++ 
                    }
                }
            }
        }
        return n_ordne
    }

    for(let order of arr_ordini){
        order.numero_ordine = find_n_ordine(order, arr_ordini)
    }
    return arr_ordini
}

let a_ordini = [{numero_ordine: 2, giorno: 7, mese: 12, anno: 2022, prezzo: 1.20},

    {numero_ordine: 1, giorno: 7, mese: 12, anno: 2022, prezzo: 2.00},
    
    {numero_ordine: 1, giorno: 8, mese: 12, anno: 2022, prezzo: 10.05},
    
    {numero_ordine: 1, giorno: 4, mese: 12, anno: 2022, prezzo: 4.40}]



let res = [{numero_ordine: 3, giorno: 7, mese: 12, anno: 2022, prezzo: 1.20},

    {numero_ordine: 2, giorno: 7, mese: 12, anno: 2022, prezzo: 2.00},
    
    {numero_ordine: 4, giorno: 8, mese: 12, anno: 2022, prezzo: 10.05},
    
    {numero_ordine: 1, giorno: 4, mese: 12, anno: 2022, prezzo: 4.40}]
console.log(aggiorna(a_ordini))


/*soluzione:
function dateSort(o1, o2) {
    let date1: Date = new Date(o1.anno, o1.mese - 1, o1.giorno);    //i mesi sono indicizzati partendo da 0 (es. gennaio = 0)
    let date2: Date = new Date(o2.anno, o2.mese - 1, o2.giorno);    //quindi, se in input mi viene dato gennaio = 1, per far si che l'oggetto Date salvi il mese giusto, devo sottrarre 1

    if((date2.valueOf() - date1.valueOf()) == 0) {
        return o1.numero_ordine - o2.numero_ordine
    }
    return date1.valueOf() - date2.valueOf()
}

function aggiorna(array) {
    //inizializzazione
    let supp = []       
    for(let el of array)
        supp.push(el)
    
    //ordinando l'array di supporto
    supp.sort(dateSort);        //in modo da avere in posizione 0 la data più vecchia

    let counter = 1;
    for(let ord of supp) {
        ord.numero_ordine = counter;
        counter++
    }
}
*/