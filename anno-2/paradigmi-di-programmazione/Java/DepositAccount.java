public interface DepositAccount {
    public double getSaldo();
    public boolean isOpen(); // dice se il conto è aperto 
    public void versa(double somma);
    public double riscatta(); // riscatta e chiude il conto 
     
}