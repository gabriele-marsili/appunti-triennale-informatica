/*
Un ospedale possiede dati genetici di pazienti, dove ogni paziente è rappresentato dal numero di mutazioni su un set di geni. Possiamo rappresentare il paziente come un oggetto dove le chiavi sono i geni e i valori il numero di mutazioni.

Per esempio paz1 = {"TP53":10, "BRC1":20, "RAS":0,"MAPK":3} rappresenta un paziente che presenta mutazioni su 4 geni.



Un pathway è un insieme di geni. Per esempio pat1 = {"TP53":1, "RAS":1, "BRC1":1} rappresenta un pathway con 3 geni.



Dato un paziente paz, si definisce il livello di mutazione di paz rispetto a un pathway pat come la media del numero di mutazioni di paz per ogni gene presente in pat. Se un gene presente in pat non esiste nei dati del paziente, si assume che quella mutazione abbia valore 0 per paz.

Per esempio, per il paz1 dell'esempio riportato sopra,il livello di mutazione rispetto a pat1 è 10, risultante dalla media tra 10 (valore di TP53), 0 (valore di RAS) e 20 (valore di BRC1).



Si scriva una funzione analisiPathway(pazienti, path) che prende due parametri: un array di pazienti e un pathway. La funzione restituisce un array con il livello di mutazione di quel pathway per ogni paziente presente nell'array (nell'array restituito, il valore in posizione i corrisponde al livello di mutazione per il paziente i).



Esempi:

analisiPathway([{"TP53":10, "BRC1":20, "RAS":0,"MAPK":3},{"TP53":12, "MAPK":3}, {"TP53":1, "RAS":1,"BRC1":7},{"RASK":1,"CLN":1,"MAPK":1}],{"TP53":1,"RAS":1,"BRC1":1}) → [10,4,3,0]



analisiPathway([{"TP53":10, "BRC1":20, "RAS": 60, "MAPK":3}, {"TP53":6}, {"TP53":3,"RAS":3,"BRC1":7}],{"TP53":1,"RAS":1,"BRC1":1}) → [30,2,4.333333333333333]



*/

function analisiPathway(pazienti, path){
    let res = [];
    for(let paz of pazienti){
        let sum = 0;
        let c = 0;
        for(let gene in path){
            if(gene in paz){
                sum += paz[gene]
            }
            c++
        }
        res.push(sum/c)
    }
    return res
}