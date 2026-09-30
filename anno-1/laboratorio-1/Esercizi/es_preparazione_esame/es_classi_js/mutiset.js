/*
Aggiungete alla classe Math un metodo rational(x) che, ricevuto come argomento
un numero x (non necessariamente un intero!), restituisca un array con due
elementi interi che diano, rispettivamente, il numeratore e il denominatore di una
rappresentazione razionale (semplificata) di x.
Esempi (dopo aver aggiunto il metodo)
Math.rational(4.5) → [9,2]
Math.rational(-3) → [-3,1]
*/

Math.rational = (x) => {
    // 2,42 => 242 (*100) -->  242/100 : semplifico => 141/50

    //4.5 => 45 (*10) --> 45 / 10 --> semplifico per 5 => 9 / 2 

    //console.log([...String(x)])
    if(!([...String(x)].includes("."))) return [x,1] // => x  numero intero 
    else{ // => x non è un numero intero 
        let c = 1;
        while([...String(x)].includes(".")){
            x *= 10 // => elimino , da x
            c *= 10 // counter 
            //console.log(x,c)
        }

        // semplifico per 2
        while(c % 2 === 0 && x % 2 === 0){
            c /= 2
            x /= 2
            //console.log(x,c)

        }

        // semplifico per 5
        while(c % 5 === 0 && x % 5 === 0){
            c /= 5
            x /= 5
            //console.log(x,c)

        }

        // semplifico per c 
        while(c % c === 0 && x % c === 0){
            c /= c
            x /= c
            //console.log(x,c)

        }

        return [x,c]

    }
    

}

/*soluzione prof:
Math.rational = function (x) {

  numeratore = x;
  denominatore = 1;
  var res = [];

  while (! Number.isInteger(numeratore)){ // verifico che il numeratore sia ancora un decimale
   numeratore += numeratore; // aumento il numeratore
   denominatore++; // incremento il denominatoretore
  }

  res[0] = numeratore;
  res[1] = denominatore;

  return res;



} */

//console.log(Math.rational(4.5)) //→ [9,2]
//console.log(Math.rational(-3)) //→ [-3,1]
//console.log(Math.rational(2.42)) // -> [121, 50]

/*
Si scriva una classe MultiSet che implementi un multiinsieme (ovvero, un insieme che può
contenere più volte lo stesso elemento).
La classe deve implementare i seguenti metodi:
● add(e) - inserisce l’elemento e nel multiinsieme
● remove(e) - rimuove un elemento e dal multiinsieme; lancia un’eccezione
NoSuchElementException se e non è presente nel multiinsieme
● size() - restituisce il numero di elementi contenuti nel multiinsieme (si implementi come
una proprietà di sola lettura)
● union(S) - restituisce un nuovo multiinsieme contenente l’unione del multiinsieme con
l’altro multiinsieme S (si usi il metodo add)
● diff(S) - restituisce un nuovo multiinsieme contenente la differenza fra il multiinsieme e
l’altro multiinsieme S (si usi il metodo remove)
 */

class NoSuchElementException extends Error {}
class MultiSet {
    constructor() {
        this.multinsieme = {}; 
    }

    add(e){
        if(e in this.multinsieme){
            this.multinsieme.e +=  1 // incremento la quantità dell'elemento nell'insieme (nell'insieme un elemento puà esserci più di una volta)
        }
        else{
            this.multinsieme.e = 1 // inserisco per la prima volta l'elemento nell'insieme 
        }
    }

    remove(e){
        if(!(e in this.multinsieme)) throw new NoSuchElementException("Element not present in multinsieme")
        else{
            if(this.multinsieme.e === 1) delete this.multinsieme.e 
            else this.multinsieme.e -= 1 
        }
    }

    get size(){
        let c = 0 ;
        for(let element of this.multinsieme){
            c += this.multinsieme.element
        }
        return c;
    }

    union(S){
        let res = new MultiSet()
        for(let element of this.multinsieme){
            res.add(element)
        }

        for(let element of S){
            res.add(element)
        }
        return res;
    }

    diff(S){
        let res = new MultiSet()
        //aggiungo gli elementi di this.multiseme a res
        for(let element of this.multinsieme){
            res.add(element);
        }

        //tolgo da res gli elementi di S
        for(let element of S){
            if(element in res) res.remove(element)
        }
        
        return res;
    }
}

/*soluzione prof: 
class NoSuchElementException extends Error {
  ;
}

class MultiSet {
  constructor() {
    this.multiinsieme = [];
  }

  //static n_elem = 0;

  add(e) {
    this.multiinsieme.push(e);
  }

  remove(e) {
    if (!this.multiinsieme.includes(e))
      throw new NoSuchElementException(`elemento ${e} non presente nel multiinsieme.`);

    // se ho più occorrenze di e elimino la prima scorrendo in ordine crescente dall'indice 0
    this.multiinsieme.splice(this.multiinsieme.indexOf(e), 1);
  }

  get size() {
    return this.multiinsieme.length;
  }

  union(S) {
    let m = new MultiSet();
    m.multiinsieme = new Array([...this.multiinsieme])
    for (let i in S.multiinsieme)
      m.add(S.multiinsieme[i]);

    return m;
  }

  diff(S) {
    let a = [...this.multiinsieme]
    let b = [...S.multiinsieme];
    let res = [];

    for (let i in a) {
      if (b.includes(a[i]))
        b.remove(a[i]);
        //b.splice(b.indexOf(a[i], 1)); // levo una occorrenza dell'elem a[i]
      else
        res.push(a[i]);
    }
    return res;
  }
}

var m1 = new MultiSet();
m1.add('a'); 
m1.add('a');
m1.add('e');
m1.add('f');

// m1 aaef

m1.size // uso del getter

//m1.remove('a');
//m1.remove('f');
//m1.remove('f'); // errore elmento f non presente

// nuovo multiset

var m2 = new MultiSet(); */