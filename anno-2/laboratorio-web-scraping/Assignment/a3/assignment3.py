import pandas as pd 
from pandas import Grouper
import os 
import os.path
from matplotlib import pyplot

#assumo che revolutionary_war.csv sia nella stessa directory di questo file 
DATASET_PATH =  os.path.join(os.path.dirname(__file__), 'revolutionary_war.csv')

dataFrame = pd.read_csv(DATASET_PATH)
dataFrame['Start Date'] = pd.to_datetime(dataFrame['Start Date'])  # Converti la colonna 'Start Date' in Datetime
dataFrame.set_index('Start Date', inplace=True)

# Ottieni il giorno della settimana per ogni data in BattleDates
days_of_week = dataFrame.index.day_name()

# Conta le occorrenze di ciascun giorno della settimana
battles_per_day = days_of_week.value_counts()

# Ordina gli indici in ordine cronologico
battles_per_day = battles_per_day.reindex(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])

# Visualizzazione: Istogramma
battles_per_day.plot(kind='bar', color='skyblue')
pyplot.xlabel('Giorno della Settimana')
pyplot.ylabel('Numero di Battaglie')
pyplot.title('Numero di Battaglie per Giorno della Settimana')
#pyplot.show()

# Visualizzazione: Grafico per anno
groups = dataFrame.groupby(Grouper(freq='Y'))
fig, axs = pyplot.subplots(nrows=10, ncols=1, sharex=True, figsize=(10, 11))
fig.subplots_adjust(hspace=0)

i = 0
for name, group in groups:
    group_days = group.index.day_name().value_counts().reindex(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    axs[i].bar(group_days.index, group_days.values, color='skyblue')
    axs[i].set(ylabel=name.year)
    i += 1

#pyplot.xlabel('Giorno della Settimana')
#pyplot.ylabel('Numero di Battaglie')
pyplot.suptitle('Andamento del Numero di Battaglie per Giorno della Settimana negli Anni')
pyplot.show()
