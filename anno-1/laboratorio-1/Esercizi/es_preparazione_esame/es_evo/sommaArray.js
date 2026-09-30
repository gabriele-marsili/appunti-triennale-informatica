//Si scriva una funzione ricorsiva sommaArray(a) che, dato come argomento un array di interi, restituisca la somma dei suoi elementi.

function sommaArray(a){
    if(a.length == 1)return a[0];
    else if(a.length == 0)return 0;
    else{
        let sum = a.shift();
        return sum + sommaArray(a);
    }
    
}

console.log(sommaArray([3,6,1,3])) //→ 13

console.log(sommaArray([46,-1,-45, 0,2 -4, 3,-1])) //→ 0