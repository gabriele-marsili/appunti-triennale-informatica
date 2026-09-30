var new_array = [];

applicaF = (p, d) => {

    return c_a = (a) => {

        for (let i = 0; i < a.length; i++) {
            if (i % 2 == 0) { // => indice pari
                new_array.push(p(a[i]));
            } else { // => indice dispari
                new_array.push(d(a[i]));
            };
        };

        console.log("\nNew array finale = " + new_array);

        return new_array

    }

}

applicaF(p, d)([1, 2, 3, 4]) // => [2,1,4,3]