/*
Si scriva una funzione differenzia(trash)
che, dato un array di oggetti con chiavi nome e categora
(entrambi con valore stringa), restituisca un oggetto con chiavi 
carta, multimateriale,indifferenziato
ciascuna avente come valore l'array contenente tutti gli oggetti dell'array trash
della relativa categoria. 
Se la categoria non coincide con una delle tre specificate, si aggiunga l'oggetto all'array indifferenziato.

Bonus: si risolva l'esercizio utilizzando lo switch.

*/

function differenzia(trash){
    let arr_carta = [];
    let arr_multimateriale = [];
    let arr_indifferenziato = [];
    for(let el of trash){
        switch(el.categoria){
            case "carta":
                arr_carta.push(el)
                break
            case "multimateriale":
                arr_multimateriale.push(el)
                break 
            default: // => indifferenziato  
                arr_indifferenziato.push(el)
                break
        }
    }


    return {
        carta : arr_carta,
        multimateriale : arr_multimateriale,
        indifferenziato : arr_indifferenziato,
    }
    
    
}