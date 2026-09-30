#!/usr/bin/env python3

# email istituzionale:
# <email>
import sys
import os
import os.path
import subprocess


# classe per memorizzare le informazioni di un file
class FileSystemEntity:

  def __init__(self, path):
    self.path = path
    self.name = os.path.basename(path)
    self.linesQuantity = self.getLines()

  def getLines(self):
    try:
      res = subprocess.run(['wc', self.path],
                           capture_output=True,
                           encoding="utf-8")
      lines = res.stdout.strip().split(' ')
      lines = lines[0]
      intLines = int(lines)
      return intLines
    except Exception as e:
      print(f"Subprocess error: {e}")
      sys.exit(1)


def main(nomedir):
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

  evaluate(nomedir)


def evaluate(nomedir):
  dirList = []
  for file in os.listdir(nomedir):
    complete_path = os.path.join(nomedir, file)
    if os.path.isdir(complete_path):
      dirList.append(file)

  dirList = sorted(dirList)

  for dir in dirList:
    complete_DIRpath = os.path.join(nomedir, dir)
    dirName = os.path.basename(complete_DIRpath)
    lineesQuantity = sorgenti(complete_DIRpath)
    print(f"{dirName} {lineesQuantity}")


def sorgenti(nomedir, dirExplored=set()):
  tot = 0
  for file in sorted(os.listdir(nomedir)):
    complete_path = os.path.join(nomedir, file)

    if os.path.islink(complete_path):  # link simbolico => skip
      continue

    if os.path.isfile(complete_path):  # file
      fileName = os.path.basename(complete_path)
      fileExt = os.path.splitext(fileName)[1]

      if fileExt == ".c" or fileExt == ".h":
        my_file = FileSystemEntity(complete_path)
        tot += my_file.linesQuantity

      continue

    if os.path.isdir(complete_path):  # directory
      if not os.access(complete_path,
                       os.R_OK | os.X_OK):  # directory non accessibile
        continue

      nomereal = os.path.realpath(complete_path)
      if nomereal in dirExplored:  #evita loop (non strettamente necessario skippando prima i link simbolici)
        continue

      dirExplored.add(nomereal)

      totSubDirectory = sorgenti(complete_path, dirExplored)
      tot += totSubDirectory

  return tot


# invoca main
if __name__ == "__main__":
  if len(sys.argv) == 2:
    main(sys.argv[1])
  else:
    print("Uso:", sys.argv[0], "nomedir")
    exit(1)
