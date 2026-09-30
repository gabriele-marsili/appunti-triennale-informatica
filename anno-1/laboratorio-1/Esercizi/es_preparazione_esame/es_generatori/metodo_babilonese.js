//metodo babilonese => https://replit.com/@731AA2223LABIB/MetodoBabilonese-GABRIELEMARSILI
/*
li valore radice di 2 può esser approssimato con il metodo babilonese : 
partire da un qualunque valore a0 > 0 e poi calcolare approssimazioni successive della radice di 2 con la seguente successione:

a(n+1) = a(n)/2 + 1/a(n)

Si scriva il generatore babylon(n) che, partendo dal valore iniziale a(0) = n, restituisca ad ogni chiamata i termini della successione 
(la prima chiamata deve restituire il valore a1, la seconda a2 ecc...)

Testare con a0 = 1 per 4 valori successivi e calcolare l'errore rispetto al quinto valore e il val dato da Math.sqrt(2)
*/
function* babylon(n){ 
    while(true){
        let res = n/2 + 1/n;
        yield res;
        n = res;
    }
}

// a(0) = a(-1) / 2 + 1 / a(-1) = 1 => a(1) = 1/2 + 2/1 con 1 = a(0) = 5/2
// => a(2) = (5/2) / 2 + 1 / (5/2)



/*versione prof:
function* babylon(an) { // => dichiarazione funzione con * per denotare che + generatore 
    while (true) { // => ciclo infinito del generatore (si stoppa ad ogni "iterazione")
        yield an = an / 2 + 1 / an
    }
}
*/

var b = babylon(1)
for (var i = 1; i < 5; i++) {
    console.log(b.next())
}

var r = b.next()
console.log(r)
console.log(Math.abs(r.value-Math.sqrt(2)))
