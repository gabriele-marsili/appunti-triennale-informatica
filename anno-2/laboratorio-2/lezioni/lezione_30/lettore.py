#!/usr/bin/env python3
# legge i dati dalla pipe passata sulla linea di comando

import sys
import os
import struct


def main(nome):
  fd = os.open(nome,os.O_RDONLY) #apertura del file descriptor (named pipe) in lettura
  print(f"=={os.getpid()}== {nome} aperto in lettura",file=sys.stderr)
  tot = 0 #counter 
  while True:
    # legge fino a 4 byte mettendoli in un bytarray
    bs = os.read(fd,4) #letti byte e messi in un bytarray
    if len(bs)==0:    # non c'e' nessuno che scrive: termina
      break
    tot +=1
    # converte i 4 byte letti in un intero e lo stampa
    valore = struct.unpack("<i",bs)[0] 
    #<i = come interpretare i byte (i = intero)
    # bs = bytearray da cui prendo i bytes da convertire 
    print(f"=={os.getpid()}== {valore}")
  print(f"=={os.getpid()}== Letti {tot} interi",file=sys.stderr)
 
if __name__ == "__main__": 
    if len(sys.argv)!=2:
        print("Uso:\n\t %s nomepipe" % sys.argv[0])
    else:
      main(sys.argv[1])
 