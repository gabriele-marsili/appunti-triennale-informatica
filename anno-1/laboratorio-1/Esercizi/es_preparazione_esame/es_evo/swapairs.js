/*
Si scriva una funzione JavaScript swapairs(a) che, ricevuto un array a con elementi qualunque, 
lo modifichi in modo che tutti gli elementi di a 
che sono a loro volta array di esattamente due elementi, 
siano modificati in modo da avere gli elementi scambiati. 
Tutti gli altri elementi non devono essere modificati.
*/

function swapairs(a){
    for(let i=0; i<a.length; i++){        
        if(a[i] instanceof Array && a[i].length === 2) {
            
            [a[i][0] , a[i][1]] = [a[i][1], a[i][0]]
            
            //let temp = a[i][0];
            //a[i][0] = a[i][1];
            //a[i][1] = temp;
        }
    }
    return a
}


let arr = [1,2,["el1","el2"],3,[["el1",1],["el2",2]],4,[1,2,3],[{val : 1},{val : 2}]]
console.log(swapairs(arr));