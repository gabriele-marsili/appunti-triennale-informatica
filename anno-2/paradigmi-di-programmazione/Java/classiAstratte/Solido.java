package classiAstratte;

public abstract class Solido {
    //variabile istantza :
    private double pesoSpecifico ;
    //costruttore : 
    public Solido (double ps){
        pesoSpecifico = ps;
    }

    //metodo implementato : 
    public double peso (){
        return volume () * pesoSpecifico;
    }

    //metodi astratti:
    public abstract double volume ();
    public abstract double superficie ();
}
