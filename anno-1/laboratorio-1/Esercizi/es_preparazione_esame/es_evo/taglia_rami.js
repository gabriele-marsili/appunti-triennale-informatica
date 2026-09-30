/*
Si scriva una funzione taglia_rami(t)
 che prende in input un albero k-ario 
. L'albero ha la rappresentazione vista a lezione, che utilizza:

un array per i figli di ogni nodo (chiave t.figli);
etichette di nodo numeriche (chiave t.val).


La funzione modifica l'albero eliminando tutti i sottoalberi in cui la somma delle etichette dei nodi è negativa: i nodi tagliati 
non devono contribuire alla somma del sottoalbero padre. 
Ad esempio se un nodo ha due sottoalberi figli entrambi con somma delle etichette negativa, allora la somma del sottoalbero radicato in t
conterrà solo t.val. 

La funzione deve modificare l'albero originale (NON una sua copia).

Si può assumere che la radice dell'albero non venga mai cancellata
 */

function taglia_rami(t) {

    function get_sum(albero) {
        let sum = albero.val
        if (albero.figli) {
            for (let t of albero.figli) {
                sum = sum + t.val
                sum = sum + get_sum(t)
            }

        }
        return sum
    }

    if (t.figli) {
        for (let i = 0; i < t.figli.length; i++) {
            let tree = t.figli[i]
            if (tree.figli) taglia_rami(tree)

            if (get_sum(tree) < 0) {
                t.figli.splice(t.figli.indexOf(tree), 1);
                i--
            };

        }
    }

}

/*soluzione:
function taglia_rami(t){
  if (!t.figli){
    return (t.val)
  }
  let sum=t.val, fval, i=0
  while (i< t.figli.length){
    fval = taglia_rami(t.figli[i])
    if (fval < 0){
      t.figli.splice(i,1)
    } else {
      sum+=fval
      i++
    }
  }
  if (t.figli.length == 0) delete t.figli
  return sum
}
*/