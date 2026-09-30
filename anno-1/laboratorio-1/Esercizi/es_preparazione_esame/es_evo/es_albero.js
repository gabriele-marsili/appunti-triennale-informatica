/*
Si scriva una funzione 
 che prende in input un albero k-ario 
. L'albero ha la rappresentazione vista a lezione, che utilizza:

un array per i figli di ogni nodo (chiave 
);
etichette di nodo numeriche (chiave 
).


La funzione modifica l'albero eliminando tutti i sottoalberi in cui la somma delle etichette dei nodi è negativa: i nodi tagliati non devono contribuire alla somma del sottoalbero padre. Ad esempio se un nodo 
 ha due sottoalberi figli entrambi con somma delle etichette negativa, allora la somma del sottoalbero radicato in 
 conterrà solo 
. La funzione deve modificare l'albero originale (NON una sua copia).



Si può assumere che la radice dell'albero non venga mai cancellata*/

/*
albero : 

tree {
    t.figli = [array di figli],
    t.val = valore 
}

*/

function taglia_rami(t) { // t = albero k-ario

    function calcola_somma_etichette(t) {
        let sum = t.val
        if (t.figli) { // => l'albero ha sottoalberi 


            for (let tree of t.figli) {

                sum = sum + tree.val // => aggiungo alla somma le etichette dei figli                 
                sum = sum + calcola_somma_etichette(tree) // => 0 se albero non ha figli 
            }
        }
        return sum
    }





    if (t.figli) {
        for (let i = 0; i < t.figli.length; i++) {
            let albero = t.figli[i]

            console.log(albero)
            if (albero.figli) taglia_rami(albero);



            let somma_etichette = calcola_somma_etichette(albero);
            console.log(somma_etichette)

            if (somma_etichette < 0) {
                console.log("ho eliminato ", albero.val)
                t.figli.splice(t.figli.indexOf(albero), 1)
                i--
            }


        }
    }
    //if (somma_etichette % 2 != 0) delete t.figli //t.figli = [];

}


tree = { val: 12, figli: [{ val: -1 }, { val: 10, figli: [{ val: -3 }, { val: -6 }] }, { val: 2, figli: [{ val: -3 }, { val: 1 }] }, { val: 0, figli: [{ val: 3, figli: [{ val: -1 }] }, { val: -3 }] }] };



function visita_albero(t) {
    if (!t.figli) return [t.val]
    let arT = [t.val]
    for (let s of t.figli)
        arT = arT.concat(visita_albero(s))
    return arT
}
console.log(visita_albero(tree))

console.log(taglia_rami(tree))
console.log(tree)
console.log(visita_albero(tree))

/*

let t = {
    val:12, 
    figli:
        [{val:-1},
        {val:10, 
            
        figli:
            [{val:-3},
            {val:-6}]},
            {val:2, 
            
            figli:[
                {val:-3},
            {val:1}]},
            {val:0, 
        
            figli:
                [
                {val:3, 
                figli:[
                    {val:-1}]},
                    {val:-3}]}]}; 


                taglia_rami(t); 
assert.deepEqual(visita_albero(t),[ 12, 10, 2, 1, 0, 3 ]);*/