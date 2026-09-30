public class ContoFlessibile implements BankAccount, DepositAccount { // implementa 2 interfacce
    private double saldo = 0;

    //metodi comuni
    public double getSaldo() {
        return saldo;
    };

    public void versa(double somma) {
        if (saldo > 0)
            saldo += somma;
    };

    //metodi BankAccount : 
    public boolean preleva(double somma){
        if(saldo >= somma){
            saldo -= somma;
            return true;
        }else{
            return false;
        }
    }

    //metodi DepositAccount :
    public boolean isOpen(){return true;} // conto che non chiude mai

    public double riscatta(){
        double res = saldo;
        saldo = 0;
        return res;
    } 

}
