function flattenTree(tree){
    let res = []
    for(k in tree){
        if(k == "val"){
            if (res.length == 0) res.push(tree[k])
            else{ // mettere val direttamente ordinato 
                for(let i = 0; i < res.length; i++){
                    if(tree[k] < res[i]) {
                        
                        res[i] = tree[k]; // scambio 
                        res.push(0) // aggiungo el in fondo che verrà eliminato 
                        for(let j = i+1; j < res.length; j++){
                            let appoggio = res[j-1]
                             
                            let appoggio_2 = res[j+1];
                            res[j] = appoggio 


                        }   
                        res.splice
                        
                    }
                }
            }
        }
    }

}



/*

{val: numero, sx: {sottoalber sn}, dx{sottoalbero dx} }

{} = null 

*/