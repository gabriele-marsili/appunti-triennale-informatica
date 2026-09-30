/*
Si definisca una classe Stadio per rappresentare i posti a sedere di uno stadio, suddivisi per settore casa e settore ospiti.

Al costruttore della classe vengono forniti n e m che sono rispettivamente il numero totale dei posti del settore ospiti e del settore casa.

 

La classe deve fornire i seguenti metodi:

prenota_posto(s,i): prenota l'i-esimo posto nel settore s e restituisce true se il posto è disponibile, false altrimenti; 
posti_occupati(s): restituisce il numero di posti occupati del settore s;
is_empty(): restituisce true se lo stadio è vuoto (non ci sono posti occupati in nessun settore), false altrimenti;
svuota_stadio(): svuota tutti i posti di entrambi i settori dello stadio.

Se la stringa s non corrisponde a "ospiti" o "casa", lanciare l'eccezione SectorError con il messaggio "Settore non esistente" in ogni 
metodo della classe.



sansiro = new Stadio(3, 5)
sansiro.posti_occupati("casa") -> 0
sansiro.posti_occupati("ospiti") -> 0 */
class SectorError extends Error {};

class Stadio {
    constructor(n,m) {
        this.capienza_ospiti = n
        this.posti_ospiti = []
        
        this.capienza_casa = m
        this.posti_casa = []
    }

    prenota_posto(s,i){
        if(s != "casa" && s != "ospiti") throw new SectorError("errore settore");

        switch(s){
            case "casa":
                if(this.posti_casa.includes(i) || i > this.capienza_casa) return false;
                else{
                    if(this.posti_casa.length +1 > this.capienza_casa) throw new Error("Capienza casa superata")
                    else{
                        this.posti_casa.push(i);
                        return true;                    
                    }
                }
            case "ospiti":
                if(this.posti_ospiti.includes(i) || i > this.capienza_ospiti) return false;
                else{
                    if(this.posti_ospiti.length +1 > this.capienza_ospiti) throw new Error("Capienza ospiti superata")
                    else{
                        this.posti_ospiti.push(i);
                        return true; 
                    }                                                           
                }
            default:
                throw new SectorError("errore settore");
        }
    }

    posti_occupati(s){
        if(s != "casa" && s != "ospiti") throw new SectorError("errore settore");
        switch(s){
            case "casa":
                return this.posti_casa.length;                    
                
            case "ospiti":
                return this.posti_ospiti.length;
            default:
                throw new SectorError("errore settore");
        }
    } //restituisce il numero di posti occupati del settore s;

    is_empty(){
        if(this.posti_casa.length === 0 && this.posti_ospiti.length === 0) return true;
        else return false;
    }// restituisce true se lo stadio è vuoto (non ci sono posti occupati in nessun settore), false altrimenti;

    svuota_stadio(){
        this.posti_casa = [];
        this.posti_ospiti = [];
    }// svuota tutti i posti di entrambi i settori dello stadio.



}

sansiro = new Stadio(3, 5)
console.log(sansiro.posti_occupati("casa") )//-> 0
console.log(sansiro.posti_occupati("ospiti")) //-> 0 