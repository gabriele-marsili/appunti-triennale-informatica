"""
utilizzare le lista di superheroes per popolare un oggetto di tipo Series
utilizzare la tupla di strenght_levels per popolare un oggetto di tipo Series
creare una Series con i superheroes come index labels e strength_level come valore. Assegnare la Series alla variabile heroes
estrarre i primi due elementi e gli ultimi due elementi della Series heroes
determinare il numero di valori unici di heroes
calcolare la forza media, la massima e la minima di heroes
duplicare il livello di forza di ogni superhero
convertire la Series heroes in un dizionario Python
"""

import pandas as pd
superheroes =[ 
             "Batman",
             "Superman",
             "Spider.man",
             "Iron-Man",
             "Captain America",
             "Wonder Woman"
]
strenght_levels = (100, 120, 90, 95, 110, 120)

sHeroes_series = pd.Series(superheroes)
strenghtLvls_series = pd.Series(strenght_levels)
heroes = pd.Series(strenght_levels,superheroes)
print(sHeroes_series,strenghtLvls_series,heroes)
primi_2 = heroes.head(2)
ultimi_2 = heroes.tail(2)
print(primi_2,ultimi_2)
uniques = heroes.nunique()
print(uniques)
maxS = strenghtLvls_series.max()
minS = strenghtLvls_series.min()
mediumS = strenghtLvls_series.mean()
print(maxS,minS,mediumS)
heroes = heroes.apply(lambda x: 2 * x)
# anche banalrmente : heroes * 2
#print(heroes)
heroDict = dict(heroes)
print(heroDict)