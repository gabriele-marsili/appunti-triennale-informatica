/*

•Input: A,B interi composti da n cifre binarie
•Output: il prodotto di A x B

Osservazione:  
• A x B = A/2 x 2*B -->  se A è pari
•A x B =  A/2 (parte inferiore) x 2*B + B -->  se A è dispari
*/

/*
Algoritmo1(A,B){
    P = 0;
    While (A<0) do
        {if (A dispari) then p = p + B;
        A = A div 2;
        B = B * 2;
        }
    Return p;
}*/
function alg_2(x: number, y: number) : number {
    let p = 0;
    while(x<0){
        if(x % 2 != 0) {
            p = p + y;
            x = x / 2;
            y = y * 2  
        }
    }

    return p
}

