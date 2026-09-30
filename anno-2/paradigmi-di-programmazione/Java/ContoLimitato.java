public class ContoLimitato implements BankAccount{
    private double saldo;
    private int mov; // numero limitato di operazioni 

    // costruttore
    public ContoLimitato(double saldoIniziale, int movimenti) {
        saldo = saldoIniziale;
        mov = movimenti;
    }

    // metodi :
    public double getSaldo() {
        return saldo;
    }

    public int getMov(){
        return mov;
    }

    public void versa(double somma) {
        saldo += somma;
        System.out.println("versati : " + somma + " euro");
    }

    public boolean preleva(double somma) {
        if (saldo >= somma && mov > 0) {
            saldo -= somma;
            mov --;
            System.out.println("prelevati : " + somma + " euro");            
            return true;
        } else {
            return false;
        }


    }

}
