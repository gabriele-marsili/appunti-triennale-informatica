#! /usr/bin/env python3
import sys
"""
Esercizio che costruisce una classifica dati i 
risultati di un insieme di partite scritte in un file
rappresentando le singole squadre come istanza
della classe Squadra il cui costruttore potrebbe
essere qualcosa come quello riportato qui sotto
(siete liberi di usare un'altra impostazione)
"""


class Squadra:
  arrSquadre = [] #variabile di classe in cui inserisco le squadre
    
  def __init__(self, nome):
    self.nome = nome  # nome della squadra
    self.punti = 0  # punteggio iniziale
    self.golf = self.gols = 0  # gol fatti e subiti
    self.differenza_reti = 0  # differenza reti iniziale
    Squadra.arrSquadre.append(self) 

  def __str__(self):
    return f"{self.nome:<12} {self.punti:>2}  {self.golf:>2}  {self.gols:>2}"

  def __lt__(self, other):
    if (self.punti == other.punti):
      return self.differenza_reti > other.differenza_reti

    return self.punti > other.punti

  @staticmethod
  def sorted():
    squadre = list(Squadra.arrSquadre)
    squadre.sort()
    return squadre
    
  


def crea_classifica(file):
  c = []  # crea classifica vuota
  namesAlreadyInserted = []
  for linea in file:
    # suddivido la stringa in corrispondenza degli spazi
    a = linea.split()
    if len(a) == 0:
      continue  # linea senza risultati
    if len(a) != 4:
      raise RuntimeError(f"Linea non corretta: {linea}")

    g1 = int(a[0])
    g2 = int(a[1])
    nameS1 = a[2]
    nameS2 = a[3]

    if g1 > g2:
      punti = [3, 0]
    elif g2 > g1:
      punti = [0, 3]
    else:
      punti = [1, 1]

    #chek su S1
    if nameS1 not in namesAlreadyInserted:  #s1 nuova squadra
      s1 = Squadra(nameS1)
      s1.golf = g1
      s1.gols = g2
      s1.punti = punti[0]
      c.append(s1)
      namesAlreadyInserted.append(nameS1)
    else:  #s1 già esistente nella classifica (aggiorno punti, goal subiti e goal fatti)
      s1 = c[namesAlreadyInserted.index(
          nameS1
      )]  #sfrutto corrispondenza di indici tra c e namesAlreadyInserted
      s1.punti += punti[0]
      s1.golf += g1
      s1.gols += g2

    #chek su S2
    if nameS2 not in namesAlreadyInserted:  #s2 nuova squadra
      s2 = Squadra(nameS2)
      s2.golf = g2
      s2.gols = g1
      s2.punti = punti[1]
      c.append(s2)
      namesAlreadyInserted.append(nameS2)
    else:  #s2 già esistente nella classifica (aggiorno punti, goal subiti e goal fatti)
      s2 = c[namesAlreadyInserted.index(
          nameS2
      )]  #sfrutto corrispondenza di indici tra c e namesAlreadyInserted
      s2.punti += punti[1]
      s2.golf += g2
      s2.gols += g1

  for squadra in c:  # aggiorno differenza reti per ogni squadra
    squadra.diiferenza_reti = squadra.golf - squadra.gols

  return c


def main(nomefile):
  with open(nomefile, "r") as f:
    crea_classifica(f)

  squadreOrdinate = Squadra.sorted()
  print(
      "-----------------------\nSquadra      Pu  GF  GS\n-----------------------\n"
  )
  for s in squadreOrdinate:
    print(s)
  
  return


if __name__ == "__main__":
  if len(sys.argv) == 2:  # numero argomenti in linea di comando
    main(sys.argv[1])  # sys.argv[1] = nome file da aprire in lettura
  else:
    print(f"Uso:\n\t{sys.argv[0]} nomefile")
    