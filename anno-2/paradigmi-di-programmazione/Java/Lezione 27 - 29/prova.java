public class prova {
    public static void main(String[] args) {
        test t = new test2();
        System.out.println(t.metodo("Hello"," world!"));        
        // System.out.println(t.metodo2()); => errore a tempo di compilazione perché il tipo apparente di t è test

    }   
}


//compilazione con :
/*
1) cd nomeCartella in cui sono i file 
2) javac .\test.java
=> ottengo file test.class 
3) javac .\prova.java
=> ottengo file prova.class
4) java nomeClasseConMain (java prova)
=> apre java virtual machine ed esegue 

-> javap per ottenere il bytecode in formato testuale 
*/