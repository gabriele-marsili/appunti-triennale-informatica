#include "xerrori.h"

/*prende il nome di una pipe da usare e legge 
ciò che viene scritto nella pipe.
*/

int main(int argc, char *argv[])
{ 
  if(argc!=2) {
    printf("Uso:\n\t%s nome_pipe\n",argv[0]);
    exit(1);
  }
  // apre file descriptor associato alla named pipe (in argv[1] )
  // se il file non esiste termina con errore  
  int fd = open(argv[1],O_RDONLY); // apertura del file descriptor (named pipe) in LETTURA
  if(fd<0) termina("Errore apertura named pipe");
  puts("lettore.out inizia la lettura");
  while(true) {
    int val;
    ssize_t e = read(fd,&val,sizeof(val)); //lettura dalla named pipe (sfrutto system call 'read')
    if(e==0) break; //-> se non ci sono processi che mantengono l'estremità di scrittura aperta la read termina con val 0
    printf("%d\n",val);
  }
  xclose(fd,__LINE__,__FILE__); // chiudo file descriptor (named pipe) in lettura.
  printf("Lettura finita\n");
  return 0;
}