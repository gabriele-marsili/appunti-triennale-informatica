/*
Si crei una classe Time che contiene un Set di oggetti, ognuno avente una proprietà TimeMap (usare Set)
Per far ciò usare un'interfaccia TimeInterface , da definire, in cui vi è una chiave TimeMap il cui valore è una Mappa di elementi di tipo Time (valori) associati alla corrispettiva
data (tipo stringa) in formato es: "19 Mar 2021" (la data di tipo stringa corrisponde alla chiave a cui viene associato il valore).
Il tipo TimeType, da definire, è un tipo dato da un array 3 numeri (giorno, mese, anno) (mesi da 0 a 11)

la classe Time ha un construttore che prende una funzione che, dato un elemento di tipo TimeType, aumenta di 
un giorno la data 
corrispondente creata tramite l'array (restituisce un elemento di tipo Date).

Nota bene: gli elementi generici vengono allocati nel Set.

la classe deve avere un metodo add() (sfruttare set.add) che, dato un elemento di tipo TimeType, 
crea la data corrispondente e 
-se la data non è creabile lancia un'eccezione in base all'error: (utilizzare gerarchia classi per classi di errori!)
•tooLarge day / month  
•tooSmallData day / month  
-se la data è già presente in un elemento del set lancia un'eccezione : DataAlreadyPresent
-altrimenti crea un oggetto (che rispetti TimeInterface), ed inserisce l'elemento passato come argomento come 
valore di TimeMap.Tale oggetto viene aggiunto al set.

-la classe deve avere un metodo "increaseDays" che, sfruttando la funzione passata al costruttore, incrementi tutti 
i giorni pari/dispari presenti in ogni mappa del set (increaseDays prende come argomento la stringa "pari" o la stringa "dispari")
=> se increaseDays ha un parametro non accettato lanciare l'eccezione "InvalidParameter" (da definire)

-infine la classe deve avere un generatore che restituisca uno ad uno le date corrispondenti agli oggetti 
di tipo TimeType presenti in ogni mappa del set 
*/
class InvalidParameter extends Error{}
class DataAlreadyPresent extends Error{}
class WrongDate extends Error{}
class TooSmallDate extends WrongDate{}
class TooLargeDate extends WrongDate{}

class TooLargeDay extends TooLargeDate{}
class TooLargeMonth extends TooLargeDate{}

class TooSmallDay extends TooSmallDate{}
class TooSmallMonth extends TooSmallDate{}

type TimeType = [number,number,number] // (giorno, mese, anno) (mesi da 0 a 11)
type TimeFuncition = (arg : TimeType) => Date

interface TimeInterface{
    TimeMap : Map<string,TimeType>
}

class Time{
    public timeFunction : TimeFuncition
    public SetInsiemi : Set<TimeInterface>  // => ogni set è di tipo T -> il tipo T estende l'interfaccia TimeInterface
    constructor(f : TimeFuncition) {
        this.timeFunction = f
        this.SetInsiemi  = new Set<TimeInterface>() 
    }

    public find_date(date : string) : boolean{
        if(this.SetInsiemi.size != 0){
            let generatore_Set = this.SetInsiemi.values()
            let res = generatore_Set.next()
            
            while(!(res.done)){
                let value = res.value // => value è oggetto di tipo T che estende TimeInterface (ha TimeMap)
                let current_map : Map<string,TimeType> = value.TimeMap
                if(current_map.has(date)) return true
                res = generatore_Set.next()
            }
            return false
        }else return false
           
    }

    public add_el(t : TimeType) : void{
        let day = t[0]
        let month = t[1]
        let year = t[2]
        
        if(day <= 0) throw new TooSmallDay("TooSmallDay")
        if(day > 31) throw new TooLargeDay("TooLargeDay")
        if(month < 0) throw new TooSmallMonth("TooSmallMonth")
        if(month > 11) throw new TooLargeMonth("TooLargeMonth")
        let data : Date = new Date(year, month, day)
        let data_s : string = (data.toUTCString().split(","))[1] // => 19 Mar 2021 00:00:00 GMT
        //console.log("data_s = ",data_s)
        let s_ar : string[] = data_s.split(" ")
        //console.log("s_ar = ",s_ar)

        data_s = s_ar[1]+" "+s_ar[2]+" "+s_ar[3]
        //console.log("data_s buona = ",data_s)
        if(this.find_date(data_s)){
            throw new DataAlreadyPresent("DataAlreadyPresent")
        }
       else{ // => add element to this.SetInsiemi
            let mappaTempo :  Map<string,TimeType> = new Map<string, TimeType>()
            mappaTempo.set(data_s,t) // - aggiunge k→v a M
            let obj : TimeInterface = {
                TimeMap : mappaTempo
            } 
            this.SetInsiemi.add(obj)
       }
    }

    public increaseDays(p_o_d : string): void {
        let TempoF : TimeFuncition = this.timeFunction
        if(p_o_d != "pari" && p_o_d != "dispari") throw new InvalidParameter("InvalidParameter")


        if(this.SetInsiemi.size != 0){
            let generatore_Set = this.SetInsiemi.values()
            let res = generatore_Set.next()
            //console.log("res = ",res )
            while(!(res.done)){
                let value = res.value // => value è oggetto di tipo T che estende TimeInterface (ha TimeMap)
                let current_map : Map<string,TimeType> = value.TimeMap
                var change_d = (v : TimeType ,k : string ,M : Map<string,TimeType>) => {
                    let type : string = p_o_d;
                    
                    function cambia(v:TimeType):[TimeType,string]{
                        var myDate = TempoF(v)
                        //new Date(v[2],v[1],v[0]);
                        
                        myDate.setDate(myDate.getDate() + 1); //add a day to the date
                        let data_s : string = (myDate.toUTCString().split(","))[1] // => 19 Mar 2021 00:00:00 GMT
                        //console.log("data_s = ",data_s)
                        let s_ar : string[] = data_s.split(" ")
                        data_s = s_ar[1]+" "+s_ar[2]+" "+s_ar[3]
                        //console.log("data_s buona = ",data_s)
                        let val : TimeType = [myDate.getDay(),myDate.getMonth(),myDate.getFullYear()]
                        return [val,data_s]
                    }
                    
                    if((type === "pari" && v[0] % 2 === 0)||(type === "pari" && v[0] % 2 === 1)){
                        let res = cambia(v)
                        
                        v = res[0];
                        k = res[1];
                    }
                }   
                current_map.forEach(change_d)
                res = generatore_Set.next()
                //console.log("res 2 = ",res )

            }
        }
    }

    public* generatore():IterableIterator<Date>{
        if(this.SetInsiemi.size != 0){
            let generatore_Set = this.SetInsiemi.values()
            let res = generatore_Set.next()
            //console.log("res = ",res )

            
            while(!(res.done)){
                let value = res.value // => value è oggetto di tipo T che estende TimeInterface (ha TimeMap)
                //console.log("value = ",value )
                
                let current_map : Map<string,TimeType> = value.TimeMap
                let generatore_Map = current_map.entries()
                let map_res = generatore_Map.next()
                //console.log("map_res = ",map_res )
                yield new Date( map_res.value[0])

                /*while(!(map_res.done)){
                    //console.log("map_res.value[0] = ",map_res.value[0])
                    yield new Date( map_res.value[0])
                }*/
                res = generatore_Set.next()
                //console.log("res 2 = ",res )

            }
        }
        else return new Error("Empty set!")
    }

}

/*
-la classe deve avere un metodo "increaseDays" che, sfruttando la funzione passata al costruttore, incrementi tutti 
i giorni pari/dispari presenti in ogni mappa del set (increaseDays prende come argomento la stringa "pari" o la stringa "dispari")
=> se increaseDays ha un parametro non accettato lanciare l'eccezione "InvalidParameter" (da definire)

-infine la classe deve avere un generatore che restituisca uno ad uno le date corrisondenti agli oggetti 
di tipo TimeType presenti in ogni mappa del set 
*/


var funzioneTempo : TimeFuncition = (time_arr : TimeType) =>  {
    return new Date(time_arr[2],time_arr[1],time_arr[0]);
}

let TempoMistico = new Time(funzioneTempo)
try{
    TempoMistico.add_el([0,1,2])
}
catch(e){
    console.log(e.message)
}
try{
    TempoMistico.add_el([14,12,2022])
}
catch(e){
    console.log(e.message)
}

TempoMistico.add_el([1,11,2022])
TempoMistico.add_el([2,11,2022])
TempoMistico.add_el([3,11,2022])
TempoMistico.add_el([4,11,2022])
try{
    TempoMistico.increaseDays("ahahah")
}
catch(e){
    console.log(e.message)
}


TempoMistico.increaseDays("pari")
let gen = TempoMistico.generatore()
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())