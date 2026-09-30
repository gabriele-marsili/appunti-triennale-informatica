/*ES.1 
Si scriva un generatore chain_diff che prende in input una funzione f (da numeri a numeri) e moltiplicatore k (numero).
Se k <= 0, chain_diff lancia un'eccezione di tipo RangeError.
Altrimenti, genera una successione di numeri definita dalla relazione $a_i = f((i-1) \cdot k) - f(i \cdot k)$ con $a_0 = - f(0)$.

Nota: Si preferiscono soluzioni che evitano di ricalcolare valori della funzione precedentemente calcolati.

Esempio:
Dati $f(x) = x^2$ e k = 2:
$i = 0 \implies - f(0) = 0$
$i = 1 \implies f(0) - f(2) = -4$
$i = 2 \implies f(2) - f(4) = -12$
... */

class RangeError extends Error {};

function* chain_diff(f, k) {
    if (k <= 0) throw new RangeError("k value must be greater than 0 ")
    let i = 0;
    let prev_res = 0
    while (true) {

        let res = f(i)
        yield prev_res - res;
        prev_res = res
        i += k
    }

}





/*ES 2  
Si definisca una classe Stadio per rappresentare i posti a sedere di uno stadio,
 suddivisi per settore casa e settore ospiti.
Al costruttore della classe vengono forniti n e m che sono rispettivamente il numero totale
 dei posti del settore ospiti e del settore casa.
 
La classe deve fornire i seguenti metodi:
prenota_posto(s,i): prenota l'i-esimo posto nel settore s e restituisce true se il posto è disponibile, false altrimenti; 

posti_occupati(s): restituisce il numero di posti occupati del settore s;

is_empty(): restituisce true se lo stadio è vuoto (non ci sono posti occupati in nessun settore), false altrimenti;

svuota_stadio(): svuota tutti i posti di entrambi i settori dello stadio.
Se la stringa s non corrisponde a "ospiti" o "casa", lanciare l'eccezione 
SectorError con il messaggio "Settore non esistente" in ogni metodo della classe.

sansiro = new Stadio(3, 5)
sansiro.posti_occupati("casa") -> 0
sansiro.posti_occupati("ospiti") -> 0
sansiro.prenota_posto("casa", 1) -> true
sansiro.prenota_posto("casa", 1) -> false
sansiro.is_empty() -> false
sansiro.posti_occupati("casa") -> 1
sansiro.svuota_stadio()
sansiro.posti_occupati("casa") -> 0 */

class SectorError extends Error {}

class Stadio {

    constructor(n, m) {
        this.num_posti_ospiti = n;
        this.num_posti_casa = m;
        this.posti_occupati_ospiti = [];
        this.posti_occupati_casa = [];
    }

    prenota_posto(s, i) {
        if (s == "casa") {
            if (this.posti_occupati_casa.indexOf(i) != -1) return false; // posto già occupato
            else {
                this.posti_occupati_casa.push(i);
                return true;
            }
        } else if (s == "ospiti") {
            if (this.posti_occupati_ospiti.indexOf(i) != -1) return false; // posto già occupato
            else {
                this.posti_occupati_ospiti.push(i);
                return true;
            }
        } else throw new SectorError("Settore non esistente")
    }

    posti_occupati(s) {
        if (s == "casa") {
            return this.posti_occupati_casa.length
        } else if (s == "ospiti") {
            return this.posti_occupati_ospiti.length
        } else throw new SectorError("Settore non esistente")
    }

    is_empty() {
        if (this.posti_occupati_casa.length == 0 && this.osti_occupati_ospiti.length == 0) return true;
        else return false;
    }

    svuota_stadio() {
        this.posti_occupati_casa = []
        this.posti_occupati_ospiti = []
    }


}
/*
sansiro = new Stadio(3, 5)
console.log(sansiro.posti_occupati("casa")) // -> 0
console.log(sansiro.posti_occupati("ospiti")) //-> 0
console.log(sansiro.prenota_posto("casa", 1)) //-> true
console.log(sansiro.prenota_posto("casa", 1)) //-> false
console.log(sansiro.is_empty()) //-> false
console.log(sansiro.posti_occupati("casa")) // -> 1
sansiro.svuota_stadio()
console.log(sansiro.posti_occupati("casa")) //-> 0 
*/

/* ES 3 

Si realizzi un sistema per la gestione dei dati relativi 
ad una collezione di veicoli.
Il sistema si compone delle seguenti classi:
Classe Veicolo per registrare un generico veicolo, possiede 
gli attributi: modello (stringa) e targa (stringa);
Classe Automobile per rappresentare un'automobile, possiede 
gli attributi: modello (stringa), targa (stringa);
Classe Motoveicolo per rappresentare un generico veicolo a 
due ruote, possiede gli attributi: modello (stringa), 
targa (stringa), e cilindrata (intero);

Classe Motociclo per rappresentare un motoveicolo ad alta 
cilindrata, possiede gli attributi: modello (stringa), 
targa (stringa), e cilindrata (intero);

Classe Ciclomotore per rappresentare un motoveicolo a bassa 
cilindrata, possiede gli attributi: modello (stringa), 
targa (stringa), e cilindrata (intero);

Ogni classe deve presentare un costruttore e controllare 
le seguenti proprietà:

L'attributo targa deve avere essattamente 7 caratteri per 
gli oggetti Automobile ed esattamente 4 caratteri per gli 
oggetti Motoveicolo, Motociclo e Ciclomotore;
L'attributo cilindrata deve essere maggiore di zero e minore 
o uguale di 50 per gli oggetti Ciclomotore e deve essere 
maggiore di 50 per gli oggetti Motociclo;

nel caso le condizioni non siano rispettate, il costruttore 
lancia rispettivamente una eccezione ErroreTarga o 
ErroreCilindrata.

Infine si scriva una funzione ricorsiva massimoCilindrata(veicoli)
che dato un array di oggetti di tipo Veicolo calcoli la cilindrata 
massima dei motoveicoli a due ruote nell'array veicoli, 
nel caso in cui non siano presenti la funzione restituisce undefined.

Nota: Si organizzino le classi/eccezioni in modo 
da sfruttare l'ereditarietà.

Esempio:
let c = new Ciclomotore("ciao", "r2d2", 40)
let m = new Motociclo("Desmosedici", "c3po", 1000)
let f = new Automobile("Ferrari Testarossa", "AA123BB")

massimoCilindrata([m, f, c]) -> 1000 */

class ErroreTarga extends Error {};
class ErroreCilindrata extends Error {};

class Veicolo {
    constructor(m, t) {
        this.modello = m;
        this.targa = t;
        console.log(this.targa);
    }
}
class Automobile extends Veicolo {
    constructor(m, t) {
        super(m, t); // => riprende gli attributi della classe genitore (Veicolo)
        if (this.targa.length != 7) throw new ErroreTarga("la targa di un'automobile deve avere esattamente 7 caratteri")


    }
}

class Motoveicolo extends Veicolo {
    constructor(m, t, c) {
        super(m, t)
        console.log(this.targa)
        if (!this.check_targa(this.targa)) throw new ErroreTarga("la targa di un Motoveicolo deve avere esattamente 7 caratteri")
        else {
            this.cilindtrata = c
        }
    }

    check_targa(t) {
        return t.length == 4
    }
}

class Motociclo extends Motoveicolo {
    constructor(m, t, c, check_targa) {
        super(m, t, c, check_targa)
        console.log(this.targa)
        if (!this.check_targa(this.targa)) throw new ErroreTarga("la targa di un Motociclo deve avere esattamente 7 caratteri")
        else if (this.cilindtrata <= 50) throw new ErroreCilindrata("la cilindrata deve essere > di 50")

    }
}

class Ciclomotore extends Motoveicolo {
    constructor(m, t, c, check_targa) {
        super(m, t, c, check_targa)
        if (!this.check_targa(this.targa)) throw new ErroreTarga("la targa di un Ciclomotore deve avere esattamente 7 caratteri")
        else if (this.cilindtrata <= 0 || this.cilindtrata > 50) throw new ErroreCilindrata("la cilindrata deve essere > di 0 e <= a 50")

    }
}

function calc_cilindrata(veicoli) {
    if (veicoli.length == 1) {
        if (veicoli[0] instanceof Motociclo) return veicoli[0].cilindtrata
    } else { // => ho almeno 2 elementi in veicoli
        if (!(veicoli[0] instanceof Motociclo)) {
            veicoli.shift()
            return massimoCilindrata(veicoli)
        } else if (!(veicoli[-1] instanceof Motociclo)) {
            veicoli.pop()
            return massimoCilindrata(veicoli)
        } else { // => ho almeno 2 elementi entrambi Motocicli
            //elimino il veicolo con la cilindrata minore :
            if (veicoli[0].cilindtrata >= veicoli[-1].cilindtrata) {
                veicoli.pop()
                massimoCilindrata(veicoli)
            } else {
                veicoli.shift()
                return massimoCilindrata(veicoli)
            }
        }
    }
}

function massimoCilindrata(veicoli) {
    if (veicoli.length == 0) return undefined
    return calc_cilindrata(veicoli)
}
let c = new Ciclomotore("ciao", "r2d2", 40)
let m = new Motociclo("Desmosedici", "c3po", 1000)
let f = new Automobile("Ferrari Testarossa", "AA123BB")

console.log(massimoCilindrata([m, f, c])) //-> 1000 

/*ES4

Creare una classe ContoBancario che implementi i seguenti metodi:
Costruttore(saldoIniziale, massimale); Inizializza l'oggetto settando l
e proprietà saldo e massimale. Se uno qualsiasi dei due valori è negativo 
lancia una eccezione con tipo InvalidMoney.
deposito(valore); incrementa il saldo del valore passato come argomento 
e ritorna il nuovo saldo. 
Se il valore è negativo lancia una eccezione con 
tipo InvalidMoney, se il valore supera il massimale lancia l'eccezione 
ExcessiveMoney e non aggiorna il saldo.

prelievo(valore); riduce il saldo del valore passato come argomento e 
ritorna il nuovo saldo. Se il valore è negativo lancia una eccezione con 
tipo InvalidMoney, se il valore è maggiore del saldo lancia l'eccezione 
InsufficientMoney e non aggiorna il saldo.

Successivamente, definire una funzione applica(conto, depositi, prelievi) 
che prenda come argomento un oggetto conto di tipo ContoBancario 
e due array di interi depositi e prelievi di lunghezza identica.
La funzione alterna sul conto corrente ogni deposito ed ogni prelievo 
e ritorna true se tutte le operazioni sono eseguibili sul conto bancario,
 altrimenti ritorna false.

Nel caso gli array contengano dei valori negativi, la funzione propaga 
l'eccezione InvalidMoney.

Il saldo del conto deve essere invariato se la funzione applica ritorna
 false o propaga un'eccezione.

Hint: Strutturare le eccezioni in maniera da non doverle gestire 
individualmente all'interno della funzione applica.

Esempio:
var conto = new ContoBancario(5, 10)
applica(conto, [3, 1], [6, 4]) -> false
var conto = new ContoBancario(5, 10)
applica(conto, [2, 2], [2, 3]) -> true */

class InvalidMoney extends Error {}
class ExcessiveMoney extends Error {}
class InsufficientMoney extends Error {}
class ContoBancario {
    constructor(s_I, mass) {
        if (mass < 0 || s_I < 0) throw new InvalidMoney("Negative number not allowed")
        this.saldo = s_I
        this.massimale = mass
    }


    deposito(valore) {
        if (valore < 0) throw new InvalidMoney("Negative value not allowed")
        else if (this.saldo + valore > this.massimale) throw new ExcessiveMoney("Over maximal")
        else {
            this.saldo += valore;
            return this.saldo;
        }
    }

    prelievo(valore) {
        if (valore < 0) throw new InvalidMoney("Negative value not allowed")
        else if (valore > this.saldo) throw new InsufficientMoney("InsufficientMoney")
        else {
            this.saldo -= valore;
            return this.saldo;
        }
    }

}

function applica(conto, depositi, prelievi) {
    let saldo_i = conto.saldo

    for (let i = 0; i < depositi.length; i++) {
        try {
            conto.deposito(depositi[i])
        } catch (err) {
            conto.saldo = saldo_i
            return false
        }

        try {
            conto.prelievo(prelievi[i])
        } catch (err) {
            conto.saldo = saldo_i
            return false
        }


    }
    return true

}

var conto = new ContoBancario(5, 10)
console.log(applica(conto, [3, 1], [6, 4])) //-> false
var conto = new ContoBancario(5, 10)
console.log(applica(conto, [2, 2], [2, 3])) //-> true */