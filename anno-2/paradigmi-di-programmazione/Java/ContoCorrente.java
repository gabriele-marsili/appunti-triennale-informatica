public class ContoCorrente implements BankAccount{
    private double saldo;    
    private int numero; // numero del conto corrente 
    private static int numeroUltimoConto = 1000; // contatore (statico) : numero dell'ultimo conto creato 
    private static double tasso; // tasso di interesse condiviso tra i conti correnti (static)


    // costruttore
    public ContoCorrente(double saldoIniziale) {
        saldo = saldoIniziale;        
        numeroUltimoConto++;
        numero = numeroUltimoConto;
    }

    // metodi :
    public double getSaldo() {
        return saldo;
    }

    public int getNumero(){
        return numero;
    }

    public static double getTasso() { // metodo statico
        return tasso;
    }

    public void maturaInteressi(){ // calcola interessi
        saldo += saldo*tasso;
    }

    public void versa(double somma) {
        saldo += somma;
        System.out.println("versati : " + somma + " euro");
    }

    public boolean preleva(double somma) {
        if (saldo >= somma) {
            saldo -= somma;            
            System.out.println("prelevati : " + somma + " euro");            
            return true;
        } else {
            return false;
        }


    }

}
