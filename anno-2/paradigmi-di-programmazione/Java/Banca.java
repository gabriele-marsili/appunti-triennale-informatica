public class Banca {
    public static void main(String[] args) {
        BankAccount conto1 = new ContoCorrente(1000);
        BankAccount conto2 = new ContoLimitato(200,10);
        // BankAccount tipo apparente (statico) -> compilazione
        // ContoCorrente /  ContoLimitato tipo effettivo (dinamico) -> run time

        if(conto1.getSaldo() >= 700){
            conto1.preleva(700);
            conto2.versa(700);
        }

        System.out.println("Saldo primo conto : "+conto1.getSaldo());
        System.out.println("Saldo secondo conto : "+conto2.getSaldo());


    }
}
