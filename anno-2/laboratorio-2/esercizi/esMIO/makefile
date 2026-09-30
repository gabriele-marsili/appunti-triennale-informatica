CC=gcc
CFLAGS=-std=c11 -Wall -g -O
LDLIBS=-lm

# Lista degli eseguibili da creare
EXECS=leggiBin esInventatoMIO

# Target di default: tutti gli eseguibili
all: $(EXECS)


# Regola per compilare l'eseguibile leggiBin
leggiBin: leggiBin.c leggiBin.o
	$(CC) $(CFLAGS) $^ -o $@ $(LDLIBS)

# Pulisce i file oggetto e gli eseguibili
clean:
	rm -f *.o $(EXECS)
