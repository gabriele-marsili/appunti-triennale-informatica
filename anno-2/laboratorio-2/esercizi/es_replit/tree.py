#!/usr/bin/env python3
"""Comando esercizio : 
Scrivere uno script tree.py python che imita il comportamento del comando tree 
ma invece di usare i colori e caratteri grafici speciali,
visualizza per ogni file o directory l'output del comando file. 
Si veda il file facile.txt che contiene esattamente l'output 
che si deve ottenere quando lo script viene invocato sulla directory facile.

Si notino i seguenti punti:

l'indentazione dei nomi dei file deve essere proporzionale alla profondità nell'albero 
(dovete passare il parametro profondità alla procedura ricorsiva di visita)

la rappresentazione deve contenere solamente il nome del file, 
non il path assoluto o relativo

Si noti che all'interno di ogni directory i file solo considerati in ordine alfabetico; 
ad esempio in facile vengono considerati in ordine leggimi, leggimi2, nord, promo.svg e sud. 
Dentro la directory nord vengonon considerati in ordine dk, fi.c, e così via. 
Se il vostro script visualizza i file in ordine diverso, sta sbagliando...

per invocare il comando della shell file dovete importare il modulo subprocess 
e usare la funzione subprocess.run con l'opzione capture_output=True 
per catturare stdout come abbiamo visto a lezione

l'output del comando file ha il formato nome: informazioni potete usare il metodo split
della classe string per pttentere la parte successiva al :. 
In fondo all'output c'è anche un carattere \n 
che dovete eliminare prima della visualizzazione

I link simbolici devono essere visualizzati nell'albero ma se sono directory 
non devono essere seguite (vedere il link nord alla linea 16 del file facile.txt)

Consiglio di dare il comando python dentro la shell in modo da far partire 
l'interprete e potere testare i comandi (tipo subprocess.run, split, etc) 
dall'interprete invece che direttamente da dentro il programma.
"""
import sys
import os
import os.path
import subprocess


class FileSystemEntity:

  def __init__(self, path, depth):
    self.path = path
    self.depth = depth
    self.name = os.path.basename(path)
    self.info = self.getInfo()

  def __str__(self):
    space = " " * (self.depth * 2)
    return f"{space}{self.name}  -->  {self.info}"

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


def main(nomedir):
  if not os.path.isdir(nomedir):
    print(f"directory {nomedir} doesn't exist")
    sys.exit(1)
  if not os.access(nomedir, os.R_OK | os.X_OK):
    print(f"Directory {nomedir} not accessible", file=sys.stderr)
    sys.exit(1)

  myInitialDir = FileSystemEntity(nomedir, 0)
  print(myInitialDir)
  makeTree(nomedir)


def makeTree(nomedir, depth=1, dirExplored=set()):
  FileSystemEntityList = []
  for file in os.listdir(nomedir):
    FileSystemEntityList.append(file)

  FileSystemEntityList.sort()
  for file in FileSystemEntityList:

    complete_path = os.path.join(nomedir, file)

    if os.path.islink(complete_path):  # link simbolico
      symbolicFileLink = FileSystemEntity(complete_path, depth)
      print(symbolicFileLink)

      continue

    if os.path.isfile(complete_path):  # file
      my_file = FileSystemEntity(complete_path, depth)
      print(my_file)
      continue

    if os.path.isdir(complete_path):  # directory
      if not os.access(complete_path,
                       os.R_OK | os.X_OK):  # directory non accessibile
        continue

      nomereal = os.path.realpath(complete_path)
      if nomereal in dirExplored:  #evita loop
        continue

      dirExplored.add(nomereal)
      my_Dir = FileSystemEntity(complete_path, depth)
      print(f"{my_Dir}")
      makeTree(complete_path, depth + 1, dirExplored)


if __name__ == "__main__":
  if len(sys.argv) == 2:
    main(sys.argv[1])
  else:
    print("Uso:", sys.argv[0], "nomedir")
    exit(1)
