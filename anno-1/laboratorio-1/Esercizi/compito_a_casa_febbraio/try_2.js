function pronostico(partite) {
    var arr_res = []
    var arr_alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "z"];
    var arr_alfabeto_M = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "Z"];


    for (let i = 0; i < partite.length; i++) {
        partite[i].probVincita = partite[i].totalePartite == 0 ? 0 : Math.round(100 * (partite[i].vittorieCasa / partite[i].totalePartite)) / 100

        arr_res.push(partite[i])



        for (let j = 0; j < arr_res.length; j++) {
            let key_scambio = "close"
            if (arr_res[i].probVincita > arr_res[j].probVincita) {
                //scambio 
                let appoggio = arr_res[j]
                arr_res[j] = arr_res[i]
                arr_res[i] = appoggio
                key_scambio = "open"

            } else if ((arr_res[i].probVincita == arr_res[j].probVincita) && (arr_res[i].squadraCasa != arr_res[j].squadraCasa)) { // probabilità uguale e nomi diversi 



                let arr_nome_1 = [...String(arr_res[i].squadraCasa)]
                let arr_nome_2 = [...String(arr_res[j].squadraCasa)]
                let k = 0

                do {
                    var index_1 = arr_alfabeto.indexOf(arr_nome_1[k]) == -1 ? arr_alfabeto_M.indexOf(arr_nome_1[k]) : arr_alfabeto.indexOf(arr_nome_1[k])
                    var index_2 = arr_alfabeto.indexOf(arr_nome_2[k]) == -1 ? arr_alfabeto_M.indexOf(arr_nome_2[k]) : arr_alfabeto.indexOf(arr_nome_2[k])

                    if (index_1 < index_2) {
                        //scambio 
                        let appoggio = arr_res[j]
                        arr_res[j] = arr_res[i]
                        arr_res[i] = appoggio
                        key_scambio = "open"


                    }
                    k = k + 1

                } while ((index_1 == index_2) && (k < arr_nome_1.length)) // se due nomi squadre iniziano con stesse lettere continua finché non trova lettere diverse
            }

            if (key_scambio != "close") j = j - 1
        }
    }

    return arr_res

}


var partite = [{ "squadraCasa": "Carrara", "squadraOspite": "Massa", "vittorieCasa": 0, "totalePartite": 0 }, { "squadraCasa": "Siena", "squadraOspite": "Massa", "vittorieCasa": 0, "totalePartite": 0 }, { "squadraCasa": "Montepulciano", "squadraOspite": "Carrara", "vittorieCasa": 0, "totalePartite": 0 }]


console.log(pronostico(partite))


/*
AssertionError [ERR_ASSERTION]: Expected values to be loosely deep-equal: expected value 


[{"squadraCasa":"Carrara","squadraOspite":"Massa","vittorieCasa":0,"totalePartite":0,"probVincita":0},
{"squadraCasa":"Montepulciano","squadraOspite":"Carrara","vittorieCasa":0,"totalePartite":0,"probVincita":0},
{"squadraCasa":"Siena","squadraOspite":"Massa","vittorieCasa":0,"totalePartite":0,"probVincita":0}], 

but got 
[{"squadraCasa":"Carrara","squadraOspite":"Massa","vittorieCasa":0,"totalePartite":0,"probVincita":0},
{"squadraCasa":"Siena","squadraOspite":"Massa","vittorieCasa":0,"totalePartite":0,"probVincita":0},
{"squadraCasa":"Montepulciano","squadraOspite":"Carrara","vittorieCasa":0,"totalePartite":0,"probVincita":0}]
*/