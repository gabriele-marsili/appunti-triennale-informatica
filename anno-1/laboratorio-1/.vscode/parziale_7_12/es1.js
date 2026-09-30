var ogg = { 12: true, 2: true, 1: true }

function filtra_5(x) {
    let new_x = {}
    for (let v in x) {
        if (parseInt(v) < 5) new_x[v] = true
    }
    return new_x
}


punto_fisso = (f) => {

    return valuta = (X) => {
        // deve restituire true se insieme X è punto fisso di f 

        let res = f(X)
        console.log(res)

        //let arr_check = []
        //arr_check.push(X = res)

        //console.log(arr_check)

        //if (undefined in arr_check) return false;
        //else return true;


        for (k in X) {
            if (!(k in res)) return false;
        }

        return true;



    }



}


console.log(punto_fisso(filtra_5)(ogg))

/*

function filtra_5(x) {
    let new_x = {}
    for (let v in x) {
        if (parseInt(v) < 5) new_x[v] = true
    }
    return new_x
}


let check = punto_fisso(filtra_5)


assert(
    check({12:true, 2:true, 1:true}) === false
)

*/