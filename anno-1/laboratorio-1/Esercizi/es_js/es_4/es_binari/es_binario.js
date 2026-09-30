//F che trasforma n da base 1 a base 2 : (funziona fino a base 10)
function transf(n, b1, b2) {
    let n1 = parseInt(n, b1); // => restituisce n in base b1    
    return n1.toString(b2); // => trasformo n1 (in base b1) nella stringa equivalente in base b2
};

//console.log(transf(42, 10, 2))


//Funzione che stampa la rappresentazione in complemento a 2 per un numero intero
var ris = []

function complemento_2(num) {

    let n_b10 = parseInt(num, 10); // => restituisce n in base base 10 
    n_b2 = n_b10.toString(2); // => trasformo num in base 2 (binario)
    //console.log(n_b2)

    //aggiungo 0  
    if (n_b2.length < 8) {
        for (let k = 0; k <= (8 - n_b2.length); k++) {
            ris.push(0) // => completa ris 
        }
    }


    for (let j = 0; j < n_b2.length; j++) {
        if (n_b2[j] == "1") ris.push(1)
        else ris.push(0)
    }
    console.log(ris)

    //inverto
    for (let i = 0; i < ris.length; i++) {
        if (ris[i] == 1) {
            ris[i] = 0
        } else {
            ris[i] = 1
        }
    }

    console.log(ris)

    // sommo 1
    if (ris[ris.length - 1] == 0) {
        ris[ris.length - 1] = 1
    } else {
        for (let i = ris.length - 1; i >= 0; i--) {
            if (ris[i] == 1) {
                ris[i] = 0
            } else {
                ris[i] = 1
                let c_2 = ""
                for (let y = 0; y < ris.length; y++) {
                    c_2 = c_2 + ris[y]
                }
                return c_2
            }
        }
    }

    let c_2 = ""
    for (let y = 0; y < ris.length; y++) {
        c_2 = c_2 + ris[y]
    }



    return c_2
}

function complemento_2_fatto_bene(num) {
    return ~num + 1
}


//console.log(complemento_2(6));

//Dati due interi a e b, rimuovere da a i bit settati a 1 in b 
var arr_indici = []
var new_A = []

function rim_a(a, b) {
    let na_b10 = parseInt(a, 10);
    na_a2 = na_b10.toString(2); // => trasformo num a in base 2 (binario)
    console.log(na_a2)


    let nb_b10 = parseInt(b, 10);
    nb_b2 = nb_b10.toString(2); // => trasformo num b in base 2 (binario)
    console.log(nb_b2)



    for (var j = 0; j < nb_b2.length; j++) {
        if (nb_b2[j] == 1) {
            arr_indici.push(j) // => riempe arr_indici con indice dei bit = 1 in b 
        }
    }
    console.log("arr indici = " + arr_indici)



    for (let num = 0; num < na_a2.length; num++) {

        if (!(arr_indici.includes(num))) {
            console.log("aggiungo na_a2[num] = " + na_a2[num] + " num = " + num)
            new_A.push(na_a2[num])
        }
    }
    console.log("new a = " + new_A)


    let ris_rim_a = ""
    for (let i = 0; i < new_A.length; i++) {
        ris_rim_a = ris_rim_a + new_A[i]
    }
    return ris_rim_a
}



//console.log(rim_a(22, 25))

//Contare i bit settati a 1 in un numero a
var c = 0

function count_bit_1(a) {
    let na_b10 = parseInt(a, 10);
    na_a2 = na_b10.toString(2); // => trasformo num a in base 2 (binario)
    console.log(na_a2)

    for (var j = 0; j < na_a2.length; j++) {
        if (na_a2[j] == 1) {
            c++ // => riempe arr_indici con indice dei bit = 1 in b 
        }
    }
    return c
}
//console.log(count_bit_1(42))

//Scambiare i valori di due variabili a e b utilizzando lo XOR
a = { v: 1 }
b = { v: 3 }

function scambia(a, b) { // => gli oggetti non si passano per copia => non viene creata una copia dell'array associato al paramtro a, ma viene passato direttamente l'array
    // passaggio di oggetti avviene per riferimento ! (altrimenti il passaggio avviene per valore) (le funzioni sono oggetti!)
    a.val = a.val ^ b.val
    a.v = a - v ^ b.v
    b.v = a - v ^ b.v
    b.v = a - v ^ b.v

}


//Programma che legge una bitmap 8×8 e restituisce un array di 8 interi a 8 bit che la codifica
//var b_map = { r1: 33333333, r2: 01414140, r3: 04141410, r4: 05555550, r5: 05555550, r6: 01414140, r7: 04141410, r8: 22222222 }
var arr_8_bit = []

var b_map_2 = "33333333\n01414140\n04141410\n05555550\n05555550\n01414140\n04141410\n22222222"

function codifica_bitmap(bitmap) {
    console.log("bit map :\n" + bitmap)

    let arr_stringhe = bitmap.split("\n")
    console.log("arr_stringhe " + arr_stringhe)

    for (let i = 0; i < arr_stringhe.length; i++) {
        let arr_caratteri = arr_stringhe[i].split("")
        console.log("arr_caratteri " + arr_caratteri)
        let number = ""
        for (let j = 0; j < arr_caratteri.length; j++) {
            console.log("val da codificare = " + arr_caratteri[j])
            let val_b_16 = transf(parseInt(arr_caratteri[j]), 10, 16) //arr_caratteri[j].toString(b2)
            console.log("val base 16 = " + val_b_16)

            number = number + val_b_16

            //let new_val_b_2 = transf(val_b_10, 10, 2)
        }
        arr_8_bit.push(number)
    }
    return arr_8_bit
}

//console.log("bitmap cod = " + codifica_bitmap(b_map_2))


function converti_array(a___R__I, base) {
    let nuovo_array = []


    console.log(base)
    console.log(a___R__I)
    for (let i = 0; i <= a___R__I.length - 1; i++) {
        let res = transf(a___R__I[i], 10, base)
        nuovo_array.push(res)
    }
    return nuovo_array
}

//var array_i = [01010, 001]
//console.log("array da base 3 a nuova base = ", converti_array(array_i, 3))



// dato n in base 10 e una base b trasformo n in base b
var array_cifre = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"] // => max base = 16
function converti_n_a_base_b(numero_n, base_b) {
    if (base_b <= 10) {
        return transf(numero_n, 10, base_b)
    } else if (10 < base_b <= 16) {
        let resto
        let s = "-" + base_b

        while (numero_n > 0) {
            resto = numero_n % base_b
            console.log("resto = ", resto)

            console.log("array_cifre[resto] = ", array_cifre[resto])

            s = array_cifre[resto] + s
            console.log("s = ", s)

            numero_n = (numero_n - resto) / base_b
            console.log("nuovo numero_n = ", numero_n)


        }
        return s

    } else return "base inserita non valida"
}

console.log("converto 1657 a base 2 = ", converti_n_a_base_b(1657, 2))



/*

001111 base 2 = 15 base 10 

i = indice che parte da 0 (e si incrementa di 1)
n numero di i partendo da destra nel numero in base b  
l = lunghezza numero base b 


2^i*n + 2^(i+1)*(n+1)... fino ad l-1

=> 2^0*1 + 2^1*1 + 2^2*1 + 2^3*1 + 2^4*1 + 2^5*0 + 2^6*0

*/



//conversione da base 16 a base 2

// AF015301639 

// A = 16 
var arr_num = ["0", "1", "2", "4", "5", "6", "7", "8", "9"]

function s_contrario(string) {
    let s_res = ""
    for (let i = string.length - 1; i >= 0; i--) {
        s_res = s_res + string[i]
    }
    return s_res
}

function converti_num_da_B_a_B(num_base_1, vecchia_base, nuova_base) {
    let s = 0

    // converto in base 10
    if (nuova_base <= 10 && vecchia_base <= 10) {
        transf(num_base_1, vecchia_base, nuova_base)
    } else if (10 < nuova_base <= 16 || 10 < vecchia_base <= 16) {
        num_base_1 = s_contrario(num_base_1)
        for (i in num_base_1) {
            console.log("num_base_1[i] ", num_base_1[i])

            if (!(num_base_1[i] in arr_num)) {
                for (let j = 0; j < array_cifre.length; j++) {


                    if (num_base_1[i] == array_cifre[j]) {
                        console.log("array_cifre[j] ", array_cifre[j])

                        let base_elevata_alla_i = 1
                        if (i != 0) {
                            for (let k = 1; k <= i; k++) {
                                base_elevata_alla_i = base_elevata_alla_i * vecchia_base
                            }
                        }

                        console.log("base_elevata_alla_i = ", base_elevata_alla_i)
                        console.log("j = ", j)


                        s = s + j * base_elevata_alla_i // 16^3
                        console.log("s = ", s)

                    }
                }
            } else {

                let base_elevata_alla_i = 1
                if (i != 0) {
                    for (let k = 1; k <= i; k++) {
                        base_elevata_alla_i = base_elevata_alla_i * vecchia_base
                        console.log(base_elevata_alla_i)
                    }
                }
                console.log("base_elevata_alla_i (else) = ", base_elevata_alla_i)

                s = s + parseInt(num_base_1[i]) * base_elevata_alla_i
            }
        }

        console.log("num in base 10 = ", s, typeof(s))
        console.log("nuova_base = ", nuova_base)

        num_base_B2 = converti_n_a_base_b(s, nuova_base) // => converti da 10 a B

        return num_base_B2
    } else return "base non valida"

}

console.log("converto n da b1 a b2 = ", converti_num_da_B_a_B("01010010010", 2, 15))