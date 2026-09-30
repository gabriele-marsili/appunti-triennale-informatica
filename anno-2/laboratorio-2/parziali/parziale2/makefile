CC=gcc
CFLAGS=-std=c11 -Wall -g
LDLIBS=-lm



# elenco degli eseguibili da creare
EXECS=crediti

# primo target: gli eseguibili sono precondizioni
# quindi verranno tutti creati
all: $(EXECS) 

# creazione dell'eseguibile
crediti: main.o
	$(CC) $(CFLAGS) $^ -o $@ $(LDLIBS)

# compilazione del file main.c
main.o: main.c headersFile.h
	$(CC) $(CFLAGS) -c $<

# esempio di target che non corrisponde a una compilazione
# ma esegue la cancellazione dei file oggetto e degli eseguibili
clean: 
	rm -f *.o $(EXECS)