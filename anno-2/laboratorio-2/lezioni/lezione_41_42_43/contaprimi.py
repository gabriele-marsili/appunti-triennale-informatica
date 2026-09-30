#! /usr/bin/env python3
import sys
import threading
import logging
import time
import os
import argparse
import concurrent.futures

Description = "Esempio elementare di uso di thread in python"

"""OSS GIL : ( https://realpython.com/python-gli/ )
GIL = global interpreter lock -> python => un solo mutex 
threads cmq utili (es : assegnazione 1 thread per client) 

il singolo thread può fermarsi in attesa di un'informazione esterna 
  -> il mutex di tale thread viene rilasciato 
  -> viene mandato in esecuzione un altro thread 
  
•se il programma ha prevalentemente lavoro computazionale allora i threads non velocizzano il programma (in python)
  -> limitazione dei threads risolvibile sfruttando multi processo (necessaria comunicazione)
•se il programma ha prevalentemente lavoro I/O allora i threads migliorano il programma

(la logica dei threads e processi in python è la medesima, cambia poco a livello sintattico)

"""

# configurazione del logging
# il logger scrive su un file con nome uguale al nome del file eseguibile
logging.basicConfig(filename=os.path.basename(sys.argv[0])[:-3] + '.log',
                    level=logging.DEBUG, datefmt='%d/%m/%y %H:%M:%S',
                    format='%(asctime)s - %(levelname)s - %(message)s')

# classe usata per passare i dati ai thread e ricevere il risultato
class Dati:
  def __init__(self,a,b):
    self.a = a           # input del htread 
    self.b = b           # input del thread 
    self.risultato = -1  # output del thread


# corpo del thread
def tbody(dati): # (dati è un'istanza della classe Dati)
  logging.debug(f"Inizia esecuzione del thread che parte da {dati.a} e arriva a {dati.b}")
  dati.risultato = conta_primi(dati.a, dati.b)
  logging.debug(f"Termina esecuzione del thread che parte da {dati.a} e arriva a {dati.b}")
  return dati.risultato


def main(a,b):
  logging.debug("Inizia esecuzione del main")
  # crea 2 thread passando ad ognuno i suoi dati
  c = (a+b)//2
  d1 = Dati(a,c) #uso di una classe al posto della struct 
  d2 = Dati(c,b) 
  t1 = threading.Thread(target=tbody, args=(d1,)) # passo un'istanza della classe dati come argomento
  t2 = threading.Thread(target=tbody, args=(d2,)) # args è una tupla dove ci sono gli argomenti per la funzione passata come target (tbody in questo caso)
  #OSS : in Python le tuple con un singolo el van denotate come (el,) mettendo la , (altrimenti le parentesi vanno via e non si ha una tupla)
  
  # avvia i thread misurando il tempo di esecuzione
  start = time.time()
  t1.start() #starto i threads 
  t2.start()
  t1.join() #attesa che t1 termini 
  t2.join()
  end = time.time()
  print(f"Tra {a} e {b} ci sono {d1.risultato+d2.risultato} primi e ci ho messo {end-start:.2f} secondi")
  #oss : il risultato è nel campo risultato dell'istanza della classe Dati (d1 e d2)
  logging.info("Termina esecuzione del main")

 
def main_pool(a,b,p):
  logging.debug("Inizia esecuzione di main_pool")
  assert p>1, "Il numero di thread deve essere maggiore di 1"
  # crea l'intervallo per ognuno dei p thread
  dati = []
  for i in range(p):
    dati.append(Dati(a+(b-a)*i//p, a+(b-a)*(i+1)//p-1))
  # avvia i thread misurando il tempo di esecuzione 
  start = time.time() 
  # se nella riga seguente uso ProcessPoolExecutor invece di ThreadPoolExecutor
  # vengono lanciati processi invece che thread
  with concurrent.futures.ThreadPoolExecutor(max_workers=p) as executor: # with concurrent.futures.ProcessExecutor(max_workers=p) as executor: per usare i processi 
    # il return value di ogni singola chiamata a tbody viene messo in risultati
    risultati = executor.map(tbody, dati) #-> array di risultati dalla funzione tbody
  # il calcolo del tempo di esecuzione e' da fare fuori dal contesto del with
  # perché executor.map() termina prima che abbiano terminato tutti i thread
  end = time.time()
  tot = sum(risultati)
  print(f"Tra {a} e {b} ci sono {tot} primi e ci ho messo {end-start:.2f} secondi")
  logging.debug("Termina esecuzione di main_pool")
  return


# conta i primi in [a,b]
def conta_primi(a,b):
  tot = 0
  for i in range(a,b+1):
    if primo(i):
      tot += 1
  return tot



# dato un intero n>0 restituisce True se n e' primo
# False altrimenti
def primo(n):
    assert n>0, "L'input deve essere positivo"
    if n==1:
        return False
    if n==2:
        return True
    if n%2 == 0:
        return False
    assert n>=3 and n%2==1, "C'e' qualcosa che non funziona"
    for i in range(3,n//2,2):
        if n%i==0:
            return False
        if i*i > n:
            break    
    return True



# questo codice viene eseguito solo se il file è eseguito direttamente
# e non importato come modulo con import da un altro file
if __name__ == '__main__':
  # parsing della linea di comando vedere la guida
  #    https://docs.python.org/3/howto/argparse.html
  parser = argparse.ArgumentParser(description=Description, formatter_class=argparse.RawTextHelpFormatter)
  parser.add_argument('min', help='minimo', type = int)  
  parser.add_argument('max', help='massimo', type = int)   
  parser.add_argument('-p', help='Usa un pool di P thread', type = int, default=-1) 
  args = parser.parse_args()
  if args.p <0:
    main(args.min,args.max)
  else:
    main_pool(args.min,args.max,args.p)


