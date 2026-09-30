// <email>
// <email>
// <email>

#define _GNU_SOURCE // avverte che usiamo le estensioni GNU
#include <assert.h> // permette di usare la funzione assert
#include <errno.h>
#include <stdbool.h> // gestisce tipo bool (variabili booleane)
#include <stdio.h>   // permette di usare scanf printf etc ...
#include <stdlib.h>  // conversioni stringa/numero exit() etc ...
#include <string.h>  // confronto/copia/etc di stringhe

#include "headersFile.h"

// stampa un messaggio d'errore e termina il programma
void termina(const char *messaggio) {
  if (errno != 0)
    perror(messaggio);
  else
    fprintf(stderr, "%s\n", messaggio);
  exit(1);
}

// ----- funzioni per le liste --------------------

studente *studente_crea(char *s, int crediti) {
  studente *a = malloc(sizeof(*a));
  a->nome = strdup(s); // creo una copia di s e l'assegno al nome
  a->next = NULL;
  a->crediti = crediti;
  return a;
}

void studente_distruggi(studente *a) {
  free(a->nome);
  free(a);
}

void studente_stampa(studente *a, FILE *f) {
  fprintf(f, "%s %d\n", a->nome, a->crediti);
}

void lista_studente_stampa(studente *lis, FILE *f) {
  while (lis != NULL) {
    studente_stampa(lis, f);
    lis = lis->next;
  }
}

void lista_studente_distruggi(studente *lis) {
  if (lis != NULL) {
    lista_studente_distruggi(lis->next);
    studente_distruggi(lis);
  }
}

studente *lista_studente_inserisci_ordinato(studente *testa, studente *s) {
  assert(s != NULL);   //=>  studente da inserire != NULL
  if (testa == NULL) { // se la lista è vuota (ovvero la testa è null)
    s->next =
        NULL; // allora il next del primo elemento non esiste, ovvero è null
    return s; // ritorno la lista, ovvero c (unico elemento)
  }

  // ordino in base ai crediti (crescente) :
  if (s->crediti < testa->crediti) {
    s->next = testa;
    return s;
  }

  if (s->crediti == testa->crediti) {
    // crediti = => ordino per nome
    if (strcmp(s->nome, testa->nome) < 0) {
      // il nome in s è il più piccolo
      // diventa lui il primo elemento
      s->next = testa;
      return s;
    } else {
      // testa rimane il primo elemento, quindi restituisco lui
      // seguito dal resto della lista in cui la ricorsione
      // ha piazzato c al posto giusto
      testa->next = lista_studente_inserisci_ordinato(testa->next, s);
      return testa;
    }
  }

  if (s->crediti > testa->crediti) {
    testa->next = lista_studente_inserisci_ordinato(testa->next, s);
    return testa;
  }
}

// ----- funzioni per lettura file e main --------------------

char *elimina_spazi_testa(char s[]) {
  int i = 0;
  while (s[i] == ' ')
    i++;
  assert(s[i] != ' ');
  return &s[i];
}

char *elimina_spazi_coda(char s[]) {
  int lunghezza = strlen(s);

  // Trova l'ultimo carattere non spazio nella stringa
  int ultimo_non_spazio = lunghezza - 1;
  while (ultimo_non_spazio >= 0 && s[ultimo_non_spazio] == ' ') {
    ultimo_non_spazio--;
  }

  // Ridimensiona la stringa eliminando gli spazi in coda
  s[ultimo_non_spazio + 1] = '\0';

  return s;
}

int main(int argc, char *argv[]) {

  if (argc != 2)
    termina("Uso: main infile");

  FILE *f = fopen(argv[1], "r"); // apro file in lettura
  if (f == NULL)
    termina("Errore apertura file");

  // costruzione lista studenti :
  studente *lista = NULL; // lista vuota
  char *buffer = NULL;
  size_t n = 0;

  while (true) {
    // leggi linea dal file
    ssize_t e = getline(&buffer, &n, f);
    if (e < 0) {
      free(buffer); // dealloco il buffer usate per contenere le linee
      break;
    }
    // fprintf(stderr,"n=%zd, buffer=%s",n,buffer);

    // esegue il parsing di buffer su carattere ","
    char *s = strtok(buffer, ",\n");
    while (s != NULL) {
      s = elimina_spazi_testa(s);
      s = elimina_spazi_coda(s);
      char *NomeStudente = s;
      NomeStudente = elimina_spazi_coda(NomeStudente);
      int totCrediti = 0;

      s = strtok(NULL, ",\n");
      while (s != NULL && s[0] != '\0') {
        s = elimina_spazi_coda(s);
        totCrediti += atoi(elimina_spazi_testa(s));
        s = strtok(NULL, ",\n");
      }
      studente *student = studente_crea(NomeStudente, totCrediti);
      lista = lista_studente_inserisci_ordinato(lista, student);
    }
    // ho messo tutte le stringhe date da strtok
  } // end while del getline
  fclose(f);

  lista_studente_stampa(lista, stdout);
  lista_studente_distruggi(lista);
  return 0;
}