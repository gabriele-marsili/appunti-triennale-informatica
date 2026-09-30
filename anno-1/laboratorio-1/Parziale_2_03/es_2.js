class InvalidMoney extends Error {}
class ExcessiveMoney extends Error {}
class InsufficientMoney extends Error {}

class ContoBancario {
    constructor(saldoIniziale, massimale) {
        this.saldo = this.check_s(saldoIniziale)
        this.massimale = this.check_s(massimale)
    }

    check_s(s) {
        if (s < 0) throw new InvalidMoney()
        else return s
    }

    deposito(valore) {
        if (valore < 0) throw new InvalidMoney()
        if (this.saldo + valore > this.massimale) throw new ExcessiveMoney()
        else {
            this.saldo = this.saldo + valore
            return this.saldo
        }

    }

    prelievo(valore) {
        if (valore < 0) throw new InvalidMoney()
        if (valore > this.saldo) throw new InsufficientMoney
        else {
            this.saldo = this.saldo - valore
            return this.saldo
        }

    }

}


function applica(conto, depositi, prelievi) {
    var saldo_Iniziale = conto.saldo

    try {
        var a = 0
        var b = 0

        for (let i = 0; i <= 2 * (depositi.length - 1); i++) {


            if (i % 2 == 0) {
                console.log("deposito " + depositi[a])
                    //if (depositi[a] < 0) throw new InvalidMoney
                conto.deposito(depositi[a])
                a++;
            } else {
                console.log("prelievo " + prelievi[b])

                //if (prelievi[b] < 0) throw new InvalidMoney
                conto.prelievo(prelievi[b])
                b++;
            }
        }

        return true


    } catch (e) {
        console.log(e)
        conto.saldo = saldo_Iniziale
        return false
    }


}


var conto = new ContoBancario(5, 10)
console.log(applica(conto, [2, 3], [2, 3]))