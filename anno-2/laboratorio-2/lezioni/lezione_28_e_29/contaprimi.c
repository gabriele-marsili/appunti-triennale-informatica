#include "xerrori.h"

// programma per il conteggio di numero dei primi in un
// intervallo usando piu' processi ausiliari
// e una pipe per comunicare i conteggi parziali 
// al processo genitore

// man 7 pipe per il manuale.

// restituisce true/false a seconda che n sia primo o composto
bool primo(int n)
{
  if(n<2) return false;
  if(n%2==0) {
    if(n==2)  return true;
    else return false; }
  for (int i=3; i*i<=n; i += 2) 
      if(n%i==0) return false;
  return true;
}

// conta i primi in [a,b)
int contap(int a, int b)
{
  int tot = 0;
  for(int i=a;i<b;i++)
    if(primo(i)) tot++;
  return tot;  
}


// conta quanti sono i primi tra argv[1] (compreso) e argv[2] (escluso)
int main(int argc, char *argv[]) {
  if(argc!=4) {
    printf("Uso:\n\t%s n1 n2 p\n",argv[0]);
    exit(1);
  }
  int n0 = atoi(argv[1]); // inizio intervallo
  int n1 = atoi(argv[2]); // fine intervallo 
  int p = atoi(argv[3]); // quantità di processi usati
  assert(n0>0 && n1>=n0 && p>0);
  
  // creo una pipe di comunicazione dai figli al genitore
  int up[2]; // la chiamo up perchè la uso da figli a genitore
  //up è un array di 2 interi -> primo intero sarà canale di lettura, il secondo il canale di scrittura 
  xpipe(up,__LINE__,__FILE__); //creazione della pipe sfruttando il file di per la gestione degli errori (a cui passo linea e file)
  //OSS : la pipe va creata prima delle fork
  /*meccanismo pipe (lettura-scrittura):
    up[0] = canale lettura -> usato (solitamente) dal padre per leggere ciò che scrivono i figli
    up[1] = canale scrittura -> usato (solitamente) dai figli per scrivere ciò che verrà letto dal padre
    l'up crea un descriptor file in cui posso scrivere / leggere (ovviamente non sono file veri e propri, sono a liv di sistema -> non posso usare fprintf ecc, devo usare le system call : read e write)
  */
  
  // generazione dei p processi child
  for(int i=0;i<p;i++) {
    pid_t pid = xfork(__LINE__,__FILE__); // fork del processo padre sfruttando file per gestione errori
    
    if(pid==0) {// figlio
      xclose(up[0],__LINE__,__FILE__); // chiudo subito il canale di lettura del figlio (che non uso)
      
      // figlio calcola l'intervallo che deve analizzare       
      int n = (n1-n0)/p;  // quanti numeri verifica ogni figlio + o - 
      int start = n0 + n*i; // inizio range figlio i
      int end = (i==p-1) ? n1 : n0 + n*(i+1);  
      int tot = contap(start,end); //quantità primi nell'intervallo
      printf("Figlio %d: cercato tra %d e %d, trovati %d primi\n",i,start,end,tot);
      ssize_t e = write(up[1],&tot,sizeof(int));
      //scrittura della pipe -> sfrutto la system call write, gli passo up[1], l'indirizzo di tot, sizeof(int) -> dimensione di quello che voglio scrivere
      if(e!=sizeof(int)) termina("Errore scrittura pipe");
      xclose(up[1],__LINE__,__FILE__); //chiudo canale scrittura per questo figlio
      exit(0); //termino il processo figlio (essenziale per non avere loop infiniti d'attesa)
    }  
  }

  // qui arriva solo il genitore 
  int tot=0; // inizializzo a 0 il counter per i primi trovati dai figli 
  xclose(up[1],__LINE__,__FILE__); // chiudo il canale di scrittura per il padre (non usato)
  //viene fatto poiché alrimenti ho deadlock : il padre attende la scrittura del padre che non scrive mai.

  // leggo fino a quando tutti non hanno chiuso up[1] (finché esiste almeno 1 canale di scrittura aperto)
  /*meccanismo lettura pipe : 
    il padre legge finché viene restituito un valore dalla read
    se ci sono valori essi vengono letti subito
    se non ci sono valori allora :
    1) le read attende che venga scrito qualcosa poiché esiste almeno 1 canale di scrittura aperto relativo alla pipe in questione
    2) la read ritorna 0 poiché tutti i canali di scrittura sono chiusi 
        -> la read termina
  */
  while(true) {
    int x;
    ssize_t e = read(up[0],&x,sizeof(int));
    //leggo dalla pipe sfruttando la system call read a cui passo up[0], indirizzo di x su cui verrà salvato il ris di ciò che viene letto, sizeof(int) -> dimensione di quello che voglio leggere
    if(e==0) break; // -> read conclusa (OSS : il controllo viene fatto su var e, NON su x)
    printf("Genitore: letto il valore %d dalla pipe\n",x);
    tot += x;
  }
  xclose(up[0],__LINE__,__FILE__); //chiudo il canale di lettura del padre
  printf("Numero primi p tali che  %d <= p < %d è: %d\n",n0,n1,tot);
  return 0;
}



/*OSS
questo meccanismo di pipe funziona unicamente tra processi padre-figli nello STESSO AMBIENTE 
esistono pipe con il nome che possono comunicare tra ambienti diversi (es: file c e file .py)
(named pipe)
*/