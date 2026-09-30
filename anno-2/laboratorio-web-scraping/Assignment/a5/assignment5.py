import pandas as pd 
import os 
import os.path
import datetime
"""
netflix.csv data set: collezione di 6,000 titles disponibili nel Novembre 2019 su Netflix
4 colonne:
video’s title
director
data in cui Netflix h aggiunto il contenuto
categoria
colonne director e date_added contengono valori mancanti (ad esempio posizioni 0, 2, and 5836)

Trovare tutte le righe Fi con il titolo "Limitless".
Trovare tutte le righe con diretctor "Robert Rodriguez" e tipo "Movie".
Trovare tutte le righe com data "2019-07-31" o direttore "Robert Altman".
Trovare tutte le righe con direttore "Orson Welles", "Aditya Kripalani", o "Sam Raimi".
Trovare tutte le righe in cui la data è tra May 1, 2019 e June 1, 2019.
Drop tutte le righe con un valore NaN nella colonna director
Trovare i giorni in cui Netflix ha aggiunto solo un video al catalogo
"""

DATASET_PATH =  os.path.join(os.path.dirname(__file__), 'netflix.csv')
netflixDataSet = pd.read_csv(DATASET_PATH, parse_dates=['date_added'])

#Trovare tutte le righe Fi con il titolo "Limitless".
limitless = netflixDataSet[netflixDataSet["title"] == "Limitless"]
print(f"\nLimitless:\n{limitless}\n\n")

#Trovare tutte le righe con diretctor "Robert Rodriguez" e tipo "Movie".
movies_by_Robert_Rodriguez = netflixDataSet[(netflixDataSet["director"] == "Robert Rodriguez") & (netflixDataSet["type"] == "Movie")]
print(f"movies by Robert Rodriguez:\n{movies_by_Robert_Rodriguez}\n\n")


#Trovare tutte le righe con data "2019-07-31" o direttore "Robert Altman".
d_or_Robert_Altman = netflixDataSet[(netflixDataSet["director"] == "Robert Altman") | (netflixDataSet["date_added"] == "2019-07-31")]
print(f"data 2019-07-31 or by Robert Altman:\n{d_or_Robert_Altman}\n\n")



#Trovare tutte le righe con direttore "Orson Welles", "Aditya Kripalani", o "Sam Raimi".
directors = netflixDataSet[(netflixDataSet["director"] == "Orson Welles") | (netflixDataSet["director"] == "Aditya Kripalani") | (netflixDataSet["director"] == "Sam Raimi")]
print(f"Orson Welles, Aditya Kripalani, o Sam Raimi:\n{directors}\n\n")
#directors = ["Orson Welles", "Aditya Kripalani", "Sam Raimi"]
#target_directors = netflixDataSet["director"].isin(directors)



#Trovare tutte le righe in cui la data è tra May 1, 2019 e June 1, 2019.
d1 = datetime.datetime(2019, 5, 1)
d2 = datetime.datetime(2019, 6, 1)
dateFilter = netflixDataSet[(netflixDataSet["date_added"] >= d1) & (netflixDataSet["date_added"] <= d2)]
print(f"data è tra May 1, 2019 e June 1, 2019:\n{dateFilter}\n\n")
#may_movies = netflixDataSet["date_added"].between("2019-05-01", "2019-06-01")
#netflixDataSet[may_movies].head()



#Drop tutte le righe con un valore NaN nella colonna director
netflixDataSet_withoutNan = netflixDataSet.dropna(subset=['director'])

#Trovare i giorni in cui Netflix ha aggiunto solo un video al catalogo
oneVideoAdded = netflixDataSet['date_added'].value_counts() == 1
days_with_one_video = oneVideoAdded[oneVideoAdded].index
days_with_one_video = pd.Series(days_with_one_video)
print(f"giorni in cui Netflix ha aggiunto solo un video al catalogo:\n{days_with_one_video}\n\n")
#netflixDataSet.drop_duplicates(subset = ["date_added"], keep = False)

