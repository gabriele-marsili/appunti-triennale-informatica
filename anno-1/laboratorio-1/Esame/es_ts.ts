
class Studente{
    public nome: string; 
    public matricola: number;
    constructor(n : string, m : number) {
        this.nome = n;
        this.matricola = m;
    }
}

class Esame{
    public nome : string; 
    public prof : string; 
    public CFU : number; 
    constructor(n : string, p : string, c : number) {
        this.nome = n;
        this.prof = p;
        this.CFU = c;
    }
}

type Esito = [Esame, number];
type Libretto = Esito[];


function sostieni_esame(student : Studente, esame : Esame) : number{
    let LS : number = student.nome.length
    let LE: number = esame.nome.length

    return ((LS+LE)%12)+18

}

function compila_libretto(student : Studente, esami : Esame[]):Libretto{
    let libretto : Libretto = []
    for(let esame of esami){
        libretto.push([esame,sostieni_esame(student,esame)])
    }
    return libretto
}

function media_pesata(lib : Libretto):number | undefined{
    //media = esame * cfu esame / numero esami
    if(lib.length == 0){
        return undefined
    }
    else{
        let sum = 0
        let sum_cfu = 0
        for(let esito of lib){ //esito = [Esame, number]
            sum += esito[1] * esito[0].CFU
            sum_cfu += esito[0].CFU
        }
        return Math.floor(sum / sum_cfu)
    }
}