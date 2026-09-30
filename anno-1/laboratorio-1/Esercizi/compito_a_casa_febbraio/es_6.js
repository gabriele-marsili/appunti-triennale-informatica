function presente(concessionaria, auto) {

    //Funzione che controlla se due auto sono uguali
    function check_uguale(a, b) {
        //console.log("a e b :")
        //console.log(a)
        //console.log(b)
        //console.log("----")

        if ((a.Telaio == b.Telaio) && (a.Anno == b.Anno) && (a.Prezzo == b.Prezzo) && (a.Disponibile == b.Disponibile)) return true
        else return false

    }




    for (let i in concessionaria) {
        //console.log(concessionaria[i])
        //console.log(auto)
        if (check_uguale(concessionaria[i], auto)) { // controllo che l'auto data da concessionaria[i] sia == all'auto passata come parametro
            return true
        }

    }
    return false // => non ho trovato nemmeno 1 auto in concessionaria == all'auto passata come parametro
}



function disponibili(concessionaria) {
    let res = [];
    for (let i = 0; i < concessionaria.length; i++) {

        if (concessionaria[i].Disponibile) { // => auto disponibile
            res.push(concessionaria[i])
        }

    }
    return res
}


function filtra_per_anno(concessionaria, anno, operatore) {
    let res = [];
    if (operatore != "<" && operatore != ">" && operatore != "==") return undefined
    else {
        for (let i = 0; i < concessionaria.length; i++) {
            if (operatore == "<") {
                if (concessionaria[i].Anno < anno) {
                    res.push(concessionaria[i])
                }
            } else if (operatore == ">") {
                if (concessionaria[i].Anno > anno) {
                    res.push(concessionaria[i])
                }
            } else if (operatore == "==") {
                if (concessionaria[i].Anno == anno) {
                    res.push(concessionaria[i])
                }
            }

        }
        return res
    }
}



// Test Case 1
var macchina1 = { "Telaio": "12w34e", "Anno": 2009, "Prezzo": 17600, "Disponibile": false }
var macchina2 = { "Telaio": "46m87j", "Anno": 2019, "Prezzo": 9700, "Disponibile": true }
var macchina3 = { "Telaio": "32m12g", "Anno": 2020, "Prezzo": 26000, "Disponibile": true }
var macchina4 = { "Telaio": "09j76t", "Anno": 2022, "Prezzo": 76550, "Disponibile": true }
var macchina5 = { "Telaio": "45t67y", "Anno": 2021, "Prezzo": 12566, "Disponibile": false }
var concessionaria = [macchina1, macchina2, macchina3, macchina4]


//console.log(presente(concessionaria, macchina1), true)
//console.log(presente(concessionaria, macchina5), false) // => false but got true
//console.log(disponibili(concessionaria), [macchina2, macchina3, macchina4])
console.log(filtra_per_anno(concessionaria, 2010, "<"), [macchina1])


/*
AssertionError [ERR_ASSERTION]: Expected values to be loosely deep-equal: 
expected value false, 
but got true
*/