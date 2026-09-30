package classiAstratte;

public class Sfera extends Solido{
    //variabili di istanza oltre a quelle ereditate da Solido (pesoSpecifico)
    private double raggio;

    //costruttore 
    public Sfera (double raggio, double ps){
        super(ps);//chiama il costruttore di Solido
        this.raggio = raggio; // sfrutto this per eliminare ambiguità
    }

    //implemento metodi astratti di Solido:
    public double volume(){
        return 4/3 * Math.PI * Math.pow(raggio, 3);
    }

    public double superficie(){
        return 4 * Math.PI * raggio * raggio;
    }

    //peso() è definito nella superclasse (Solido)
}
