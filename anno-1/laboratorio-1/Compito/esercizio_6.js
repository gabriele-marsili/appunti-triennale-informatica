applicaF = (p, d) => { // => prende p e d definite da testcase
    var new_array = [];

    return calcola_array = (a) => {

        for (let i = 0; i < a.length; i++) {
            if (i % 2 == 0) { // => indice pari
                new_array.push(p(a[i]));
            } else { // => indice dispari
                new_array.push(d(a[i]));
            };
        };


        return new_array

    }

}

applicaF(p, d)([1, 2, 3, 4]) // => [2,1,4,3]