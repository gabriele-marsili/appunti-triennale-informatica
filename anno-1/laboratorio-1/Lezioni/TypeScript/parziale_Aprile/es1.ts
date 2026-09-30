class LavaggioError extends Error {}

enum TipoLavaggio {
    Intensivo = 90, 
    Secco = 60, 
    Delicati = 30, 
}

enum TipoTessuto {
    Cotone = 1.1 , 
    Seta = 2 , 
    Sintetico = 0.9, 
    Lana = 1.75
}

type Lavaggio = [TipoTessuto,TipoLavaggio]

// seta e lana non possono essere lavate con Intensivo
// Sintetico non può essere lavato a Secco. 
function getTime(lavaggio: Lavaggio):number{
    let TypeLavaggio : TipoLavaggio = lavaggio[1]
    let tessuto: TipoTessuto = lavaggio[0]

    //console.log(TypeLavaggio,tessuto) // => numeri 
        
    let T_L: string = TipoLavaggio[TypeLavaggio]
    let Tess: string = TipoTessuto[tessuto]

    if((Tess == "Lana" && T_L == "Intensivo" )|| (Tess == "Seta" && T_L == "Intensivo") || (Tess == "Sintetico" && T_L == "Secco" )){
        throw LavaggioError
    }

    let tempo_lavaggio = TypeLavaggio * tessuto
    return tempo_lavaggio
}

function compareNumbers(a:number, b:number):number{
    return a-b
}

function processa(lavaggi: Lavaggio[]) : Lavaggio[]  {
    let temp_arr : number[] = []
    let arr_appoggio : Lavaggio[] = []
    
    for (let i = 0; i <lavaggi.length; i++) {
        let tempo_l : number = getTime(lavaggi[i])
        temp_arr.push(tempo_l)
        arr_appoggio.push(lavaggi[i])
         /*
        for (let j = 0; j < lavaggi.length; j++){
            let tempo_l_j : number = getTime(lavaggi[j])
            
            
            if(tempo_l <= tempo_l_j){
                lavaggi = lavaggi.splice(j,1,lavaggi[i])
                console.log(lavaggi)
                lavaggi = lavaggi.splice(i,1,lavaggi[j])
                console.log(lavaggi,"\n-----\n")

            }
            

        }
        */
        

    }
    temp_arr.sort(compareNumbers)
    console.log(temp_arr)
    console.log(arr_appoggio)
    for (let i = 0; i <arr_appoggio.length; i++) {
        //console.log(getTime(arr_appoggio[i]))
        let index: number = temp_arr.indexOf(getTime(arr_appoggio[i]));
        temp_arr[index] = +Infinity
        lavaggi.splice(index,1,arr_appoggio[i])

    }

    return lavaggi
}
