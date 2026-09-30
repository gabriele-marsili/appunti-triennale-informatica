/*

Si scriva una funzione JS contali(C) che, ricevuto come argomento una classe C, restituisca una classe C2 identica a C ma

con in più la capacità di contare quante istanze di oggetti della classe sono stati creati.

In particolare, C2 deve esporre una proprietà statica di sola lettura quanti, il cui valore sia il numero totale di 
istanze create fino a quel momento.*/

function contali(C){
    class C2 extends C{
        static #quanti = 0;
        constructor(...args) {
            super(...args);
            this.#increase();
        }

        #increase(){
            C2.#quanti++;
            //console.log(C2.#quanti);
        }

        static get quanti(){
            console.log(C2.#quanti);
            return C2.#quanti
        }

        static set quanti(v){
            console.log(C2.#quanti);

            C2.#quanti = C2.#quanti
        }
    }

    return C2

}

let Arr2 = contali(Array);
let Str2 = contali(String);
// primo "Array contato"
let aaa=new Arr2();
// creo e inizializzo un secondo "Array contato"
let bbb=new Arr2(4,7,21); 
bbb.push(42); // le istanze di A2 sono Array
// creo e inizializzo 1 "Stringa contata"
let ccc=new Str2("pippo"); 
console.log(ccc.length, 5); // le istanze di S2 sono String
console.log(Arr2.quanti, 2); //  2
console.log(Str2.quanti, 1); //  1
Arr2.quanti=0; // ignorato
console.log(Arr2.quanti, 2); //  ancora 2
console.log(aaa instanceof Array, true) //true


/*soluzione:
function contali(C) {
  var istanze=0
  return class {
    constructor(...args) {
      istanze++
      return new C(...args)
    }
    static get quanti() { return istanze}
  }
}
*/