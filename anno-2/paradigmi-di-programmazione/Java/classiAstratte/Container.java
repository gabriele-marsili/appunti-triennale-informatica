package classiAstratte;

/**
 * JavaDoc: javadoc Container.java -> crea documentazione html
 * Container è una classe che per istanziare array di sfere
 * @istanzia un array con 3 sfere 
 * @param sf1 @param sf2 @param sf3 3 sfere 
 * @eval restituisce la sfera avente max volume  (nelle sfere colorate viene contata l'intensity per il calcolo)
 * @return container delle sfere tramite getContainer 
 * @inserisce una sfera tramite insertSfera 
 * @param s = sfera da inserire 
 */

public class Container {
    private Sfera[] Sfera_container;

    //REQUIRES : 3 sfere 
    //EFFECTS : istanzia array Sfera_container con 3 sfere
    public Container(Sfera sf1, Sfera sf2, Sfera sf3) {
        this.Sfera_container = new Sfera[] { sf1, sf2, sf3 };
    }

    //REQUIRES : 
    //EFFECTS : ritorna sfera con volume max in Sfera_container
    public Sfera Eval() {
        // assumo che ci sia almeno 1 elemento in Sfera_container poiché
        // nuovo oggetto container viene inizializzato con 3 sfere
        double max;
        int finalIndex = 0;
        if (Sfera_container[0] instanceof SferaColorata) {
            max = ((SferaColorata) Sfera_container[0]).getIntensity() * Sfera_container[0].volume();
        } else {
            max = Sfera_container[0].volume();
        }
        //System.out.println("max iniziale:\n"+max); 
        

        for (int i = 1; i < Sfera_container.length; i++) {
            Sfera s = Sfera_container[i];
            //System.out.println("i = "+i);                
                           
            double valuation;
            if (s instanceof SferaColorata) {
                SferaColorata s_c = (SferaColorata) s;
                valuation = s_c.getIntensity() * s_c.volume();
                //System.out.println("s_c color:\n"+s_c.getColor()); 
            } else {
                valuation = s.volume();
            }
            //System.out.println("valuation:\n"+valuation);                
            if (valuation > max) {
                max = valuation;
                finalIndex = i;
                //System.out.println("Max:\n"+max);                
                //System.out.println("finalIndex:\n"+finalIndex);


            }
        }
        //System.out.println("final finalIndex:\n"+finalIndex);

        return Sfera_container[finalIndex];
    
    }

    //REQUIRES : 
    //EFFECTS : ritorna Sfera_container
    public Sfera[] getContainer(){
        return Sfera_container;
    }

    //REQUIRES : sfera s  
    //EFFECTS : aggiunge la sfera a Sfera_container, ritorna true 
    public boolean insertSfera(Sfera s){
        // Creazione di un nuovo array con una dimensione maggiore
        Sfera[] nuovoArray = new Sfera[Sfera_container.length + 1];

        // Copia degli elementi esistenti nel nuovo array
        for (int i = 0; i < Sfera_container.length; i++) {
            nuovoArray[i] = Sfera_container[i];
        }
        // Aggiunta della nuova sfera
        nuovoArray[Sfera_container.length] = s;

        Sfera_container = nuovoArray;
        return true;
    }

}
