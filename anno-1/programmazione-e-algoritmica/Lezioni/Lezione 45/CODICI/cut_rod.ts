/*
=> Input : n  = lunghezza della corda, p[i,n] => p[i] valore della corda lunga i 
=> Output : massimo ricavo dalla vendita di pezzi della corda ottenuti tagliando una corda lunga n e ai prezzi scritti in p[i]
*/

function cut_rod(p:number[],n:number):number{
    let arr_n : number[] = [] ;
    for(let i = 0; i<=n;i ++){
      arr_n.push(0);  
    }
    
    for(let j=1; j<=n ; j++){ // => arr di n 0
        let q: number = -Infinity;
        for(let i=1; i<= j; i++) { 
            q = Math.max(q, p[i-1] + arr_n[j-i])    
        }
        arr_n[j] = q;
    }
    console.log(arr_n)
    return arr_n[n];

}

console.log(cut_rod([2,10,45,9],4))