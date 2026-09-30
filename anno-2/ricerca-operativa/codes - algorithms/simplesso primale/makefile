CC = gcc
CFLAGS = -Wall

main: main.o calcolatore.o operazioni_con_base.o
	$(CC) $(CFLAGS) -o main main.o calcolatore.o operazioni_con_base.o

main.o: main.c calcolatore.h operazioni_con_base.h
	$(CC) $(CFLAGS) -c main.c

calcolatore.o: calcolatore.c calcolatore.h
	$(CC) $(CFLAGS) -c calcolatore.c

operazioni_con_base.o: operazioni_con_base.c operazioni_con_base.h
	$(CC) $(CFLAGS) -c operazioni_con_base.c

clean:
	rm -f *.o main
