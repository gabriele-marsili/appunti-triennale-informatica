function passa_Esame_2(p:number[],t:number[],V:number): number[] {
  
    //let true_res : number[] = [];
	
	
	let res: number[] = [];
    let valore_raggiunto : number = -Infinity
	let miglior_tempo_raggiuto : number = 0

	let s : number = 0;
    for(let i = 0; i<p.length; i++) {
		s = s + p[i]
	}
	if(s < V) throw new Error("sufficienza nono raggiungibile");


	for (let i = 0; i < p.length; i++) {
		if(valore_raggiunto < V){
			res.push(p[i]);
			valore_raggiunto = valore_raggiunto + p[i]
			miglior_tempo_raggiuto = miglior_tempo_raggiuto + t[i]
		}
		else{
			let current_p : number = p[i]
			for(let j = 0; j < res.length; j++){
				let current_v : number = valore_raggiunto - res[j] + current_p
				let current_index : number = p.indexOf[res[j]]
				let t_index : number = p.indexOf[current_p]
				let current_t : number = miglior_tempo_raggiuto - t[current_index] + t[t_index]

				if(current_t < miglior_tempo_raggiuto && current_v >= V){
					let temp : number = res[j]
					res.splice(j,1,current_p)
					j = j-1
					current_p = temp

					miglior_tempo_raggiuto = current_t
					valore_raggiunto = current_v

				}



			}
			res.length = res.length -1 
		}
		


	}

	/*
    let matrix : number[][][] = [] // => matrice in cui in ogni cella vi è un array che conterrà il miglior sottoinsieme di problemi possibili corrispondenti alla posizione di tale cella 
    for(let i = 0; i <= p.length; i++) {
        matrix.push([])
        for(let j = 0; j <= V; j++) {
            matrix[i].push([ ])
        }
    }
    console.log(matrix)



    for(let i = 1; i <= p.length; i++) { // => scorre elementi di P => p[i]
        
        for(let j = 1; j <= V; j++) {  // => scorre valori 1-6 (6 = V)
            matrix[i][j] = matrix[i-1][j] // val temporaneo 

            if(p[i] < j){ // valore p[i]
                let m:number = matrix[ i-1][j-p[i] ] + t[i]; //metto in m il valore  dato dalla somma
                
                if(m < matrix[i][j]) matrix[i][j] = m; // => cambio il valore dato nella matrice 
                if(i == p.length && j == V){
                    
                    true_res = [p[i-1]]
                    let sum : number = p[i]
                    
                    while(t[i-2] != matrix[i-1][j-p[i-1]] && j-p[i-1]> 0 && sum < V){
                        true_res.push(p[i-2])
                        sum = sum + p[i-2]
                        i = i-1
                        j = j-p[i-1]
                    }
                    if(sum < V) true_res.push(p[j-1])
                    
                }
            }
            else{
                if(i == p.length && j == V){
                    if(t[i-1]<= matrix[i][j]){
                        return [p[i-1]]
                    }
                    else{

                        let sum : number = 0
                    
                        while(t[i-2] != matrix[i-1][j-p[i-1]] && j-p[i-1]> 0 && sum < V){
                            true_res.push(p[i-2])
                            sum = sum + p[i-2]
                            i = i-1
                            j = j-p[i-1]
                        }
                        if(sum < V) true_res.push(p[j-1])

                    }
                }
            }

            /*
            
            if(p[i] >= j && t[i] < matrix[i][j])  {
                matrix[i][j] = t[i];
                res.push([p[j],t[j]]);
            }

            


            else if(p[i] < j && res.length > 0){
                for(let k = 0; k < res.length; k++) {
                    if(p[i] + res[k][0] >= j && t[i] + res[k][i] < matrix[i][j] && ((p[i] != res[k][0])||(t[i] != res[k][1]))){
                        matrix[i][j] = t[i] + res[k][i]
                        
                    }
                }
                
            }
           



        }
    }
    
    let minor_temp : number = matrix[p.length][V]

    for(let i = 0; i <t.length; i++) {
        if(t[i] == minor_temp) {
            if (p[i] >= V )return [p[i]]
            else {
                t.slice(i,1)
                p.slice(i,1)
                i = i-1
            }

        }

        if(t[i]>minor_temp) {
            t.slice(i,1)
            p.slice(i,1)
            i = i-1
        }

    }

    
    let value_sum = 0
    let index = 0
    let current_t = +Infinity
    while(value_sum < V){
        let current_V = p[index]

    }
    */

    return res

}

console.log(passa_Esame_2([1,4,3,2],[5,30,15,10],6)) // => 1,3,2
console.log(passa_Esame_2([1,4,3,2,2,6],[5,30,15,10,4,100],6)) // => 1,3,2
console.log(passa_Esame_2([1,4,3,6,2,6],[5,30,15,1,4,100],6)) // => 6 


