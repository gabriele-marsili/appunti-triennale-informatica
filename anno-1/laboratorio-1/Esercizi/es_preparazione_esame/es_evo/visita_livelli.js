/*
Si scriva una funzione visitaLivelli(t), 
con t un albero binario. La funzione deve stampare 
i nodi t per livelli. 
Quindi, la funzione deve stampare prima tutti i nodi a livello 0 (la radice), 
poi tutti quelli a livello 1 da sinistra a destra, e così via. Ad esempio, con l'albero:

1

- 3 4 5

La visita stamperà: 1, 3, 4, 5
*/

function visitaLivelli(t){
    let res = "";
    let a = [t];
    let tmp;
    while(a.length >0){
        tmp = a.shift();
        res += `, ${tmp.val}`;
        if(tmp.sx !== undefined)a.push(tmp.sx);
        if(tmp.dx !== undefined)a.push(tmp.dx);
    }
    return res + ".";
}