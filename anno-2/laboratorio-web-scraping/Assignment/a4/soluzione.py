import warnings
import pandas as pd
import os 
import os.path

warnings.filterwarnings('ignore')
DATASET_PATH =  os.path.join(os.path.dirname(__file__), 'nba.csv')


pd.read_csv(DATASET_PATH, parse_dates = ["Birthday"])

#2 modi per impostare l'indice del DataFrame con il nome del giocatore 
nba = pd.read_csv(
             DATASET_PATH, index_col = "Name", parse_dates = ["Birthday"]
        )
nba.head()
#nba=nba.setIndex("Name")

#numero di giocatori per ogni team:
nba.Team.value_counts()
# = nba["Team"].value_counts()

#5 giocatori più pagati :
nba.sort_values("Salary", ascending = False).head()

#giocatore più vecchio new york knicks : 
nba = nba.reset_index().set_index(keys = "Team")
nba.head()
nba_nyk=nba.loc["New York Knicks"].head()
nba_nyk
nba_nyk.loc["New York Knicks"].sort_values("Birthday").head(1)
