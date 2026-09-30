#!/usr/bin/env python3

import sys
import os
import os.path
import time

class Miofile:

  def __init__(self, path):
    self.path = path
    self.mtime = os.path.getmtime(path)
    self.size = os.path.getsize(path)
    self.name = os.path.basename(path)

  def __eq__(self, other) -> bool:
    if not isinstance(other, Miofile):
      raise Exception(f'{other} is not istance of Miofile')

    return self.path == other.path and self.size == other.size and self.mtime == other.mtime

  def __str__(self):
    return f"name : {self.name}\nsize : {self.size}\nlast modified time : {time.asctime(time.localtime(self.mtime))}"

  def getIniziale(self):
    """ritorna l'iniziale minuscola del nome del file"""
    return self.name[0].lower()


def main(src, dest):
  if os.path.isdir(dest):
    print(f"directory {dest} already exist")
    sys.exit(1)

  os.mkdir(dest)
  createAlphabeticIndex(src, dest)


def createAlphabeticIndex(src,
                          dest,
                          usedLetters=[],
                          fileDictionary={},
                          explored=set()):
  #print(f"\n------\n\nusedLetters = {usedLetters}\n")
  for file in os.listdir(src):
    nomecompleto = os.path.join(src, file)
    #print(f"\nnomecompleto = {nomecompleto}")

    if os.path.islink(nomecompleto):  #skip se ho link simbolico
      continue

    if os.path.isfile(nomecompleto):  # file
      miofile = Miofile(nomecompleto)
      iniziale = miofile.getIniziale()  #(considero solo iniziali minuscole)
      #print(f"\niniziale FILE = {iniziale}")
      if (miofile.name
          in fileDictionary):  #nel name considero anche inziali maiuscole
        fileDictionary[miofile.name] += 1
        miofile.name = miofile.name + "." + str(fileDictionary[miofile.name])
      else:
        fileDictionary[miofile.name] = 0

      if iniziale not in usedLetters:
        usedLetters.append(
          iniziale)  # aggiungo la lettera alla lista delle lettere usate
        os.mkdir(os.path.join(
          dest, iniziale))  # creo sottodirectory per l'iniziale (minuscola)

      #ora sicuramente ho dest/iniziale in cui mettere il link per il file
      linkPath = os.path.join(dest, iniziale, miofile.name)
      os.link(nomecompleto, linkPath)  # creo link per il file
      #os.link(percorsoFileOriginale,percorsoLink)
      print(f"{os.path.abspath(nomecompleto)} {os.path.abspath(linkPath)}")

    if os.path.isdir(nomecompleto):  #sotto directory
      if not os.access(nomecompleto, os.R_OK | os.X_OK):
        #print(f"!! Directory {nomecompleto} non accessibile", file=sys.stderr)
        continue
      """#se volessi link anche per le cartelle 
      directoryName = os.path.basename(nomecompleto)
      iniziale = directoryName[0].lower()
      if iniziale not in usedLetters:
          usedLetters.append(iniziale)
          os.mkdir(os.path.join(dest,iniziale)) # creo sottodirectory per l'iniziale (minuscola)

      #ora sicuramente ho dest/iniziale in cui mettere il link per la direcotory
      os.link(nomecompleto,os.path.join(dest,iniziale,directoryName)) # creo link per la directory
      """
      nomereal = os.path.realpath(nomecompleto)
      if nomereal in explored:  #evita loop
        #print(f"!! Directory {nomereal} già esplorata", file=sys.stderr)
        continue

      explored.add(nomereal)

      # directory nuova e accessibile: esegui ricorsione.
      createAlphabeticIndex(nomecompleto, dest, usedLetters, fileDictionary,
                            explored)


if __name__ == "__main__":
  if len(sys.argv) == 3:
    main(sys.argv[1], sys.argv[2])
  else:
    print("Uso:", sys.argv[0], "src_dir dest_dir")
    exit(1)
