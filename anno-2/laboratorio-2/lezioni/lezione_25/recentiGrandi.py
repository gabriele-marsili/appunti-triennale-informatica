#!/usr/bin/env python3

import os
import os.path
import sys
import time  

class Miofile:
    def __init__(self,path):
        self.path = path
        self.mtime = os.path.getmtime(path)
        self.size = os.path.getsize(path)

    def precedente_a(self,limite) -> bool:
        """true se tempo modifica precedente a limite espresso in secondi da Epoch"""
        self.mtime < limite

    def __lt__(self,other) -> bool:
        if not isinstance(other,Miofile):
            raise Exception(f'{other} is not istance of Miofile')
        
        if(self.size == other.size): 
            return self.path < other.path
        
        return self.size < other.size

    def __eq__(self, other) -> bool:
        if not isinstance(other,Miofile):
            raise Exception(f'{other} is not istance of Miofile')
        
        return self.path == other.path and self.size == other.size and self.mtime == other.mtime 

    def __str__(self):
        return f"name : {self.name}\nsize : {self.size}\nlast modified time : {time.asctime(time.localtime(self.mtime))}"


def main (nomedir,g) :
    """Lancia ricerca ricorsiva su nomedir"""
    if not os.path.exists(nomedir):
        print("Il nome che mi hai passato non esiste")
        sys.exit(1)
    if not os.path.isdir(nomedir):
        print("Il nome che mi hai passato esiste, ma non è una directory")
        sys.exit(1)
        
    nomeabs = os.path.abspath(nomedir)
    limite  = time.mktime(time.localtime()) - g*24*3600    
    elenco = cerca_recenti(nomeabs,limite,set())
    print("-"*20,end=f"\nci sono {len(elenco)} file ")
    elenco.sort(reverse=True)
    #elenco2 = sorted(elenco, reverse=True)
    for f in elenco:
        print(f,end="\n")
  

# funzione ricorsiva per cercare i file modificati dopo limite
def cerca_recenti(nome,datalimite,giaesplorati):
    """restituisce la lista dei file modificati dopo datalimite
    tra quelli nella directory nome e sue sottodirectory"""
    
    assert os.path.isdir(nome), "Argomento deve essere una directory"
    print(f"Begin: {nome}",file=sys.stderr)
	# inizializzo la lista di output inizialmente vuota
    recenti = []

    # ottiene il contenuto della directory 
    listafile = os.listdir(nome)
    for f in listafile:
        nomecompleto = os.path.join(nome,f)
		# verifica se il file è accessibile
        if not os.access(nomecompleto,os.F_OK):
            print("!! Broken link:", nomecompleto, file=sys.stderr)
            continue
		# distinguo tra file normali e directory
        if not os.path.isdir(nomecompleto):
            mioF = Miofile(nomecompleto)
            temposec = mioF.mtime
            if temposec >= datalimite:
                recenti.append(nomecompleto)
            
        else:	# nomecompleto è una directory possibile chiamata ricorsiva
            if not os.access(nomecompleto, os.R_OK | os.X_OK):
                print(f"!! Directory {nomecompleto} non accessibile",file=sys.stderr)
                continue
            nomereal = os.path.realpath(nomecompleto)
            if nomereal in giaesplorati:
                print(f"!! Directory {nomereal} già esplorata",file=sys.stderr)
                continue
            giaesplorati.add(nomereal)
			# directory nuova e accessibile: esegui ricorsione
            recenti_subdir = cerca_recenti(nomecompleto, datalimite, giaesplorati)
			# concateno al risultato
            recenti += recenti_subdir
	# ciclo for su i file di questa directory terminato			
    print(f"End: {nome}",file=sys.stderr)
    return recenti

# invoca main passando il nome di una directory e un numero di giorni
# (anche frazionario)
if __name__ == '__main__':
    if len(sys.argv) == 3:
        main(sys.argv[1], float(sys.argv[2]))
    else:
        print("Uso:", sys.argv[0], "nome_directory numero_giorni")