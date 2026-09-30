/*



Procedure Permutazioni(P, k):
if k = n then Controllo(P)
else for i k to n do
scambia P[k] $ P[i];
Permutazioni(P, k + 1);
scambia P[k] $ P[i].


Controllo (A, V, C, n)
size = 0;
vol = 0;
for (i=1 to n) do
size += A[i];
vol += A[i] * V[i];
if (vol == C && size < min)
min = size; */

function Configurazioni(A:number[],k : number,V:number[],C:number):number | void {
    let MyMin = -Infinity
    console.log("k = ",k)
    console.log("A.length = ",A.length)
    if(k > A.length-1) return MyMin;
    else{
        for (let i = 0; i <= 1; i++){
            A[k] = i
            if(k == A.length) {                
                let res = Controllo(A,V,C,MyMin)
                if(res < MyMin) MyMin = res
            }
            else Configurazioni(A,k+1,V,C)                            
        }
    }
    
}


function Controllo(A,V,C,min):number{
    let size = 0;
    let vol = 0;
    for(let i = 0; i <A.length; i++){
        size = size + A[i]
        vol = A[i] * V[i]
        if(vol == C && size < min) min = size;
    }
    return min;
}

var Varr : number[] = [2,2,4,3,1]
var C_n : number = 7
console.log(Configurazioni(Varr,1,Varr,C_n))