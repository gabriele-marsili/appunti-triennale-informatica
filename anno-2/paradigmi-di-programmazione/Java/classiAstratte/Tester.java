package classiAstratte;

public class Tester {
    public static void main(String[] args) {

        Sfera s1 = new Sfera(10, 91);
        Sfera s2 = new Sfera(10, 91);
        Sfera s3 = new Sfera(11, 91);
        Sfera s4 = new SferaColorata(5, 91, "red");
        Sfera s5 = new SferaColorata(21, 1, "white");
        Sfera s6 = new SferaColorata(4, 11, "ambasciatore");
        Sfera s7 = new Sfera(14, 91);

        Container c = new Container(s1, s2, s3);
        boolean t1 = c.insertSfera(s4);
        if (t1)
            System.out.println("\nTest 1 [add s4] SUPERATO");
        else
            System.out.println("\nTest 1 [add s4] FALLITO");

        boolean t2 = c.insertSfera(s5);
        if (t2)
            System.out.println("\nTest 2 [add s5] SUPERATO");
        else
            System.out.println("\nTest 2 [add s5] FALLITO");

        boolean t3 = c.insertSfera(s6);
        if (t3)
            System.out.println("\nTest 3 [add s6] SUPERATO");
        else
            System.out.println("\nTest 3 [add s6] FALLITO");

        boolean t4 = c.insertSfera(s7);
        if (t4)
            System.out.println("\nTest 4 [add s7] SUPERATO");
        else
            System.out.println("\nTest 4 [add s7] FALLITO");

        Sfera max_Sfera = c.Eval();
        String msg = "volume : " + max_Sfera.volume() + "\npeso specifico : " + max_Sfera.peso();
        if (max_Sfera instanceof SferaColorata) {
            msg += "\ncolore : " + ((SferaColorata) max_Sfera).getColor();
        }

        System.out.println("\n\nMax Sfera datas:\n" + msg);

    }
}
