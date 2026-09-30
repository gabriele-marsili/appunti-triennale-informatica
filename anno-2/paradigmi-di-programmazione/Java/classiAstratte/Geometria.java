package classiAstratte;

public class Geometria {
    public static void main(String[] args) {

        Sfera s1 = new SferaColorata(3, 2, "red");
        Sfera s2 = new SferaColorata(3, 2, "blue");        
        Sfera s3 = new SferaColorata(3, 2, "-");        

        Container cont = new Container(s1, s2, s3);
        
        Sfera max_Sfera = cont.Eval();
        String msg = "volume : "+ max_Sfera.volume() + "\npeso specifico : "+ max_Sfera.peso();
        if(max_Sfera instanceof SferaColorata){
            msg += "\ncolore : "+ ((SferaColorata)max_Sfera).getColor();
        }

        System.out.println("Max Sfera datas:\n"+msg);


    }
}
