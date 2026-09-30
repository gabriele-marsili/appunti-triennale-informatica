/*
Si scriva una funzione rimuovi_dispari(t9 che, dato un albero k-ario 
(con la rappresentazione, vista a lezione, che utilizza un array per i figli di ogni nodo) contenente numeri interi t, 
modifica l'albero eliminando tutti i sottoalberi costituiti unicamente da nodi con etichette dispari. 
Si può assumere che la radice dell'albero non venga mai cancellata (ovvero non verrà mai testato il caso di un albero 
costituito da tutti nodi con etichetta dispari). 
Il codice iniziale fornito con l'esercizio include la funzione visita_albero(t)  
che serve per eseguire i test case (quindi inviatela insieme alla vostra soluzione)
*/

function visita_albero(t){
    if (t.figli == undefined) return [t.val]
    let res = [t.val]
    
    if(t.figli){
        for(let i = 0; i < t.figli.length; i++){
            res = res.concat(visita_albero(t.figli[i]))
        }
        
    }
   
    return res
}


function rimuovi_dispari(t){

    function check(arr){
        console.log(arr)
        for(let el of arr){
            if(el % 2 === 0)return true
        }
        return false
    }

    if(t.figli){
        for(let i =0; i < t.figli.length; i++){
            let el = t.figli[i]
            console.log("el = ",el)         
            if(!(el.figli)){ // => el = foglia
                if(el.val % 2 != 0){
                    console.log("el foglia => elimino (val) ",el.val)
                    t.figli.splice(t.figli.indexOf(el), 1);
                    i--
                }
            }
            else{ // el not foglia
                let ar_figli =visita_albero(el);
                ar_figli.shift()
                if(ar_figli.length === 0 && el.val % 2 != 0){ // teoricamente inutile 
                    console.log("el NON foglia => elimino (val) ",el.val)
                    t.figli.splice(t.figli.indexOf(el), 1);
                    i--
                }
                else{
                    if(!check(ar_figli) && el.val % 2 != 0){
                        console.log("el not foglia => elimino (val) ",el.val)

                        t.figli.splice(t.figli.indexOf(el), 1);
                        i--
                    }
                }
            }

            rimuovi_dispari(el)


            /*
            let ar_figli = visita_albero(el);
            console.log("el = ",el)
            ar_figli.shift()
            console.log("ar_figli = ",ar_figli)
            if(ar_figli.length > 0){
                if(!check(ar_figli)){
                    t.figli.splice(t.figli.indexOf(el), 1);
                }
            }
            else{ // foglia
                console.log("el (foglia) = ",el)

                if(el.val % 2 != 0){

                    console.log("el foglia => elimino (val) ",el.val)
                    t.figli.splice(t.figli.indexOf(el), 1);
                }
            }
            */
        }
    }
    else{
        if(t.val % 2 != 0){
            console.log("t foglia => elimino (val) ",t.val)            
            delete t;
        }
    }
}

let t = {val:12, 
        figli:[{
            val: 8, 
            figli: [{
                val: 4}, 
                {val: 14}, 
                {val: 2, 
                    figli:[{val:6}]
                }]
            },
            {val: 3, 
            figli: [{
                val: 10, 
                figli: [{
                    val: 6, 
                    figli: [{
                        val: 1}, 
                        {val: 5}, 
                        {val: 9, 
                            figli: [{
                            val:1}]
                        }] 
                },
                {val: 13},
                {val: 6, 
                figli: [{
                    val: 7, 
                    figli: [{
                        val: 1},
                        {val: 16}]
                    }]
                },
            ]}
            ]},
            {val: 14},
            {val: 2, 
            figli:[{val:6}]},
            {val: 8},
            {val: 1, figli: [{val: 1}
            ]}
        ]
    }; 

rimuovi_dispari(t); 
console.log(visita_albero(t))
console.log(String(visita_albero(t)) ==  String([12, 8, 4, 14, 2, 6, 3, 10, 6, 6, 7, 16, 14, 2, 6, 8 ]));


/*soluzione:
function visita_albero(t){ 
  if (t.figli == undefined) return [t.val]
  let arT = [t.val]
  for (let s of t.figli) 
    arT= arT.concat(visita_albero(s))
  return arT
}

function rimuovi_dispari(t){
  if (t.figli==undefined){
    return (t.val%2!=0)
  }
  let i =0
  let disp=true
  while (i < t.figli.length) {
    if(rimuovi_dispari(t.figli[i])) {
      t.figli.splice(i,1)
    }
    else {
      i++
      disp = false
    }
  }
  if (t.figli.length == 0) delete t.figli
  return (disp && t.val%2!=0)
}
*/