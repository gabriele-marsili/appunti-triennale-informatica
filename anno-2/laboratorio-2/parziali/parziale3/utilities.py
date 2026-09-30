#!/usr/bin/env python3
"""Comandi per la gestione dei tempi

time.localtime()  # converte secondi da epoch in un oggetto struct_time 
time.asctime()    # converte un oggetto struct_time in ascii
time.mktime()     # inverso di time.localtime() struct_time -> secondi da epoch
"""

"""Comandi per la gestione di file e directory

os.getcwd()       # restituisce directory corrente
os.chdir(path)    # cambia directory
os.listdir(path)  # elenca file (restituisce lista di stringhe)
os.access(path)   # verifica i permessi (os.access(nomecompleto, os.R_OK | os.X_OK))

os.path.getsize(path)  # dimensione file
os.path.basename(path) # nome del file 

os.path.exists(path)   # vero se il file/directory esiste  
os.path.isfile(path)   # vero se regular file
os.path.isdir(path)    # vero se directory
os.path.islink(path)   # vero se symbolic link

os.path.join(nome_dir,nome_file) # combina nome dir e file
os.path.abspath(path)  # restituisce path assoluto
os.path.realpath(path) # restituisce nome canonico eliminando link simbolici
os.path.getmtime(path) # istante ultima modifica in secs da epoch

os.mkdir(dest) #crea cartella con path dest 

Lista completa dei comandi su:
  https://docs.python.org/3/library/time.html
  https://docs.python.org/3/library/os.html
  https://docs.python.org/3/library/os.path.html
"""


import os
import os.path
import sys
import time
import subprocess


# classe per memorizzare le informazioni di un file
class FileSystemEntity:
    def __init__(self,path):
        self.path = path
        self.mtime = os.path.getmtime(path)
        self.size = os.path.getsize(path)
        self.name = os.path.basename(path)
        self.info = self.getInfo()
        
        
    
    def precedente_a(self,limite):
        """Restituisce true se il tempo di modifica
        è precedente a limite espresso in secondi da Epoch"""
        return self.mtime < limite
    
    def getInfo(self):
        try:
            res = subprocess.run(['file', self.path],
                                capture_output=True,
                                encoding="utf-8")
            info = res.stdout.strip()
            info = info.split(":")[1].strip()

            return info
        except Exception as e:
            print(f"Subprocess error: {e}")
            sys.exit(1)
    
    def getIniziale(self):
        """ritorna l'iniziale minuscola del nome del file"""
        return self.name[0].lower()
    
    def __lt__(self,other): # -> sfruttato nel confronto delle istance della classe con > o < 
        "confronta dimensioni e a parità di dimensione il nome"
        if self.size < other.size:
            return True
        if self.size > other.size:
            return False
        return self.path < other.path
        
    def __eq__(self,other): # -> sfruttato nel confronto delle istance della classe con == 
        if not isinstance(other, FileSystemEntity):
            raise Exception(f'{other} is not istance of FileSystemEntity')

        return self.path == other.path and self.size == other.size and self.mtime == other.mtime and self.info == other.info

    def __str__(self): # -> stampa del file quando faccio print di un'istanza della classe 
        t = time.asctime(time.localtime(self.mtime))
        return f"{self.path}\n size:{self.size}  modificato:{t}\n"

    def __hash__(self): #calcola hash di un oggetto, utile per dizionari e set
        """metodo necessario per usare le istanze della classe in set 
        e come chiavi di dict"""
        # print(f"Hash invocato da {self}")
        return hash((self.path,self.size))
        

def main(nomedir):
  """Lancia ricerca ricorsiva su nomedir dopo aver fatto i controlli"""
  
  #controlli
  if not os.path.exists(nomedir):
    print("Il nome che mi hai passato non esiste")
    sys.exit(1)
    
  if not os.path.isdir(nomedir):
    print("Il nome che mi hai passato esiste, ma non è una directory")
    sys.exit(1)
    
  if not os.access(nomedir, os.R_OK | os.X_OK):
    print("directory non accessibile")
    sys.exit(1)

  #nomeabs = os.path.abspath(nomedir)



# invoca main 
if __name__ == '__main__':
    if len(sys.argv) == 3:
        main(sys.argv[1])
    else:
        print("Uso:", sys.argv[0], "nome_directory numero_giorni")