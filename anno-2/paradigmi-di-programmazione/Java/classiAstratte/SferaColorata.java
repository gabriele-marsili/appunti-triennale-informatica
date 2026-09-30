package classiAstratte;

public class SferaColorata extends Sfera {
    private String color;   
    private double intensity;

    //costruttore 
    public SferaColorata (double raggio, double ps, String c) {
        super(ps, raggio);
        color = c;
    }

    public double getIntensity(){        
        switch (color) {
            case "red":
                this.intensity =  0.1;  
                break;
            case "blue":
                this.intensity =  4.0;
                break;
            case "white":
                this.intensity =  1.2;
                break;
            case "yellow":
                this.intensity =  2.2;
                break;
            case "purple":
                this.intensity =  5.0; 
                break;             
            default:                                
                this.intensity = 1.0;  
                break;              
        }
        //System.out.println("this.intensity:\n"+this.intensity);                

        return this.intensity;
    }

    public String getColor(){
        return this.color;
    }


}

