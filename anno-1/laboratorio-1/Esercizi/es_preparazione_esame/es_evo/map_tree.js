/*
Si scriva una funzione map_tree(tree, sx_fun, dx_fun) 
che, dato un albero binario e due funzioni sx_fun e dx_fun, 
restituisca un altro albero senza alterare l'originale. 

Nell'albero risultante, il valore di ciascun figlio di sinistra è sostituito 
con il risultato dell’applicazione di sx_fun; rispettivamente, 
i figli di destra sono sostituiti dall’applicazione di dx_fun. 

Se sx_fun o dx_fun sono undefined, il valore del nodo non viene alterato. 

Si assuma che alla radice si applichi la funzione sx_fun.

Notazione.

Come visto a lezione, un albero binario è codificato come un oggetto JavaScript con 
proprietà val, sx, e dx, dove sx e dx sono rispettivamente il ramo di sinistra e di destra. 

L’albero segnala l’assenza di un figlio con il valore null nella rispettiva proprietà.
*/
function map_tree(tree, sx_fun, dx_fun){
    // Defaults to identify function
    if (sx_fun === undefined) {
        sx_fun = (x) => x;
    }
    if (dx_fun === undefined) {
        dx_fun = (x) => x;
    }

    function apply_fun(node, branch) {
        // Check if node exists
        if (node == null){
            return null;
        }

        // Compute new value
        let new_val = null;
        if (branch == 'left') {
            new_val = sx_fun(node.val);
        } else {
            new_val = dx_fun(node.val);
        }

        // Return new tree
        return {
            val: new_val,
            sx: apply_fun(node.sx, 'left'),
            dx: apply_fun(node.dx, 'right')                
        }
    }

    return apply_fun(tree, 'left')

}