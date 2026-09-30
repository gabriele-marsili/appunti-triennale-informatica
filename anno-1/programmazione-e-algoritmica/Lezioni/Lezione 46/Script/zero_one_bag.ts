/*
Zaino_0-1 (M,V[1…n],W[1…n],W){
	// crea matrice C : [n+1] x [W+1]
	For (j = 0 to W ) do C[0,j] = 0 // inizializzo la prima riga (con tutti 0)
	For (i = 0 to n ) do C[i,0] = 0 // inizializzo la prima colonna (con tutti 0)
	
	For (i = 1 to n do){ // scorro le righe 
		For (j= 1 to W do){ // => scorro le colonne
			C[i,j] = C[i-1,j] // => copio il valore sopra (val. temporaneo)
			If(j >= W[i]) then { // confronto peso 
				m = C[ i-1, j-w[i] ] + v[i]; //metto in m il valore  dato dalla somma
				If( m > C[i,j] then C[i,j] = m;  // se il valore è maggiore cambio C[i,j]
			}
		}
	}
	
	Return C[n,W] // => ritorno ultima casella in basso a dx

}
 */


function zero_one_bag(n:number, v:number[],w:number[],W : number): number{
    //n = numero righe
    //w.lenght = numero colonne
    // W = peso massimo che può avere lo zaino 

    // creo matrice C : [n+1] x [W+1]
    let c : number[][] = []
    for(let j = 0; j <= n; j++){
        c.push([]);
        for(let i = 0; i <= W; i++){
            c[j].push(0)
        }
    }

    console.log("c = ",c)

    for(let i = 1; i <= n; i++){
        for(let j = 1; j <= W; j++){
            c[i][j] = c[i-1][j] // => copio il valore sorpa (val temporaneo)
            if(j >= w[i]){ // -> confronto il peso
                let m : number = c[i-1][j-w[i]] + v[i] // => metto in m il valore dato dalla somma 
                console.log("m = ",m)
                console.log("c[i][j] = ",c[i][j])
                if(m > c[i][j]) c[i][j] = m// se il valore è maggiore cambio C[i,j]
            }
        }
    }

	return c[n][W] // => ritorno ultima casella in basso a dx
}

/*
esempio:
    V   W
A1  10  5
A2  5   4
A2  6   4 
*/
console.log(zero_one_bag(3,[10,5,6],[5,4,4],8))
