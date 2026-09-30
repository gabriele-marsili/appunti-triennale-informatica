/*

Input: A di n elementi nell'insieme {0,1}, con almeno 2 elementi diversi
Output: A ordinato

=> contare numero di 0 presenti e successivamente mettere tutti 1 fino alla fine dell'array
-> Conto gli 0 (o gli 1) e scrivo A finale  (=> 2 scansioni lineari => θ(n) )
	
	
Ordina θ1 (A)
i=1 ; j = n;

While(i<j) do 
	{While(A[i] ==0) do i ++;
	While(A[j] == 1 ) do j++;
	If(i<j) then { swap ( A[j], A[i]);
			i++;
			J--;
			}
}
*/

function order_arr(A:number[]):number[] {
    let i:number = 1;
    let j:number = A.length
    console.log('hello world')

    while(i<<j){
        while(A[i] == 0) i++;
        while(A[j] == 1) j++;
        if(i<j){
            let temp : number =  A[j];
            A[j] = A[i];
            A[i]  = temp;

            i++;
            j--;
        }
    }

    return A;
}

let bynary_arr : number[] = [0,0,1,1,1,0,1,1,1,0,1,0,0,0];
console.log(order_arr(bynary_arr));