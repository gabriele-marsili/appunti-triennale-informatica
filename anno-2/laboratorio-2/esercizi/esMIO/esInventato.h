#ifndef ESINVENTATO_H
#define ESINVENTATO_H

typedef struct coppiaBinList {
  char *binary;
  int number;
  struct coppiaBinList *next;
} coppiaBinList;

coppiaBinList *coppiaBinList_crea(char *s, int num);
void coppiaBinList_distruggi(coppiaBinList *a);
void coppiaBinList_stampa(coppiaBinList *a, FILE *f);
void lista_coppiaBinList_stampa(coppiaBinList *lis, FILE *f);
void lista_coppiaBinList_distruggi(coppiaBinList *lis);
coppiaBinList *lista_coppiaBinList_inserisci_ordinato_ricorsivo(coppiaBinList *testa, coppiaBinList *c);

#endif
