/*
Studente -

Si scriva una classe Studente, destinata a rappresentare uno studente. 
Ogni studente ha obbligatoriamente un numero di matricola (intero) e un nome (stringa); può avere opzionalmente altri
attributi a vostro piacere: per esempio, corso di laurea, anno, corso (A/B/C), nazionalità, ecc.

Ogni studente ha anche una #carriera, inizialmente vuota; la #carriera è una lista di esami superati, ciascuno
dei quali rappresentato da un oggetto con campi 
{materia: stringa, cfu: numero, voto: numero, lode: booleano}.

La classe dovrà implementare almeno:
● un costruttore che consenta di creare nuovi studenti, specificando tutti gli attributi obbligatori, e di
volta in volta alcuni (anche nessuno o tutti) degli attributi opzionali, in qualunque combinazione;

● un metodo passato(esame) che aggiunge l’esame alla #carriera dello studente

● un metodo media() che restituisce il calcolo della media (pesata per cfu, con 30 e lode che conta
come 32) */


class Studente {
    #carriera = []
    constructor(num_m,name, corso_laurea = 'nessuno', anno = 0) {
        
        if(num_m){
            if(Number.isInteger(num_m))this.numero_matricola = num_m;
            else throw new Error("È necessario inserire un numero di matricola che sia un numero intero")
        }
        else throw new Error("Numero di matricola necessario")    
        
        if(name){
            if(typeof name === "string")this.nome = name;
            else throw new Error("Il nome deve essere una stringa")
        }
        else throw new Error("Nome necessario")
        this.anno = anno;
        this.corso_laurea = corso_laurea; 
        
    }

    passato(esame){
        this.#carriera.push(esame);
    }
    
    /* La media ponderata è data dal rapporto tra la
     somma di ogni prodotto (voto * CFU) di ogni esame diviso la 
     somma di tutti i CFU attribuiti agli esami. Nel computo della media non devono essere considerati 
     le lodi e gli esami senza voto (convalide). */

    media(){
        let sum = 0
        let tot_cfu = 0
        for(let esame of this.#carriera){
            if(esame.lode){
                sum = sum + 32 * esame.cfu
            } 
            else sum = sum + esame.voto * esame.cfu
            tot_cfu += esame.cfu
              
        }
        return sum / tot_cfu
    }

    libretto(){
        console.log(this.#carriera);
    }

}

class Esame{
    constructor (materia, cfu, voto, lode){
      this.materia = materia;
      this.cfu = cfu;
      this.voto = voto;
      this.lode = lode;
    }
}
  
  
try{
  var pippo = new Studente(1, 'Alessio');
  //var pippo = new Studente(3,'Francesco');
  //var pippo = new Studente();
  //var pippo = new Studente('0001','Pluto');
  
  var esame1 = new Esame('analisi I', 6, 25, false);
  var esame2 = new Esame('fisica I', 3, 30, false);
  pippo.passato(esame1);
  pippo.passato(esame2);
  pippo.libretto();
  console.log(pippo.media());
}
  
catch (e){
    console.log(e.message);
}
  

  