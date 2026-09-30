var recludi_punti_fissi = (f) => {


    function check_sottoinsieme(a, b) {
        for (let i in a) {
            if (!(i in b)) {
                return false //"a non è sottoinsieme di b!"
            }
        }
        return true //"a è sottoinsieme di b!"
    }

    //Funzione che controlla se due insiemi sono identici
    function check_uguale(a, b) {
        return check_sottoinsieme(a, b) && check_sottoinsieme(b, a)
    }


    return new_F = (A, n) => {
        var counter_punti_fissi = 0;
        var i = A.length - 1 // => scorro all'indietro A
            //console.log(A)
            //console.log(n)
            //console.log(counter_punti_fissi)
            //console.log(i)


        while (counter_punti_fissi < n && i >= 0) {

            let check_1 = f(A[i])
            let check_2 = A[i]
            console.log(check_1)
            console.log(check_2)
            console.log("-----")

            if (check_uguale(check_1, check_2)) { // => A[i] (insieme) è un punto fisso di f
                console.log("elimino ", A[i])

                A.splice(i, 1) // => elimino A[i] da A a.k.a elimino il punto fisso 
                console.log("new A = ", A)

                counter_punti_fissi++ // => incremento il counter dei punti fissi eliminati 
            }
            i-- // => decremento i 
        }

        return A


    }


}

function filtra_5(x) {
    let new_x = {}
    for (let v in x) {
        if (parseInt(v) < 5) new_x[v] = true
    }
    return new_x
}

console.log(recludi_punti_fissi(filtra_5)([
        { 2: true, 1: true },
        {},
        { 12: true, 2: true, 1: true },
        { 12: true, 1: true }
    ], 1))
    /*
    assert.deepEqual(, [
        { 2: true, 1: true },
        { 12: true, 2: true, 1: true },
        { 12: true, 1: true }
    ])
     


 Expected values to be loosely deep-equal:
 
 expected value 
 [{"1":true,"2":true},
  {"1":true,"2":true,"12":true}, 
  {"1":true,"12":true}], 
 
 
 but got 
 
 [{"1":true,"2":true},
  {},
  {"1":true,"2":true,"12":true},
  {"1":true,"12":true}]

  */