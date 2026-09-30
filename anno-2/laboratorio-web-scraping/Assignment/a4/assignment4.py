import pandas as pd 
import os 
import os.path
"""
•considerare il Data Set dei giocatori di basket
•indicare due modi diversi per impostare l'indice del DataSet al nome del giocatore
•calcolare il numero di giocatori per ogni Team
•chi sono i 5 giocatori più pagati?
•chi è il giocatore più vecchio dei New York Knicks (i New York Jets non esistono nel dataset NBA)
"""
#assumo che nba.csv sia nella stessa directory di questo file 
DATASET_PATH =  os.path.join(os.path.dirname(__file__), 'nba.csv')

#NBA_dataSet = pd.read_csv(DATASET_PATH, index_col='Name') # modo 1 
NBA_dataSet = pd.read_csv(DATASET_PATH).set_index('Name') # modo 2



def getNumberOfPlayers(dataSet = NBA_dataSet, playerDict = {}):
    for team in dataSet["Team"]:
        if team not in playerDict:
            playerDict[team] = 1
        else :
            playerDict[team] += 1
        
    return playerDict

def getNumberOfPlayersV2(dataSet = NBA_dataSet):
    return dataSet['Team'].value_counts()
    

def getHighestPayedPlayers(quantity = 5, dataSet = NBA_dataSet):
    ammounts = []
    playersDict = {}
    
    salarySeries = pd.Series(dataSet['Salary'])
    salarySeries = pd.Series(salarySeries.values)    
    
    for _ in range(quantity):        
        maxAmmount = salarySeries.max()
        ammounts.append(maxAmmount)
        
        salarySeries = [x for x in salarySeries if x < maxAmmount]
        salarySeries = pd.Series(salarySeries)
        
    for ammount in ammounts:
        players = dataSet.loc[dataSet['Salary'] == ammount]            
        players_names = (players.index).tolist()
        
        for name in players_names:    
            playersDict[name] = ammount
            if len(playersDict) == quantity : 
                 return pd.Series(playersDict)
        
        if len(playersDict) == quantity : 
                return pd.Series(playersDict)

def getHighestPayedPlayersV2(quantity = 5, dataSet = NBA_dataSet):
    return dataSet.nlargest(quantity, 'Salary')['Salary']
            
            
def getOldestPlayer(team = "New York Knicks",dataSet = NBA_dataSet):
        team_players = dataSet.loc[dataSet['Team'] == team].copy()
        team_players['Birthday'] = pd.to_datetime(team_players['Birthday'])  # Conversione in Datetime
        
        birthdaySeries = pd.Series(team_players['Birthday'])
        birthdaySeries = pd.Series(birthdaySeries.values)
        
        oldestDate = birthdaySeries.min()
        
        return team_players.loc[team_players['Birthday'] == oldestDate]
        
def getOldestPlayerV2(team="New York Knicks", dataSet=NBA_dataSet):    
    team_players = dataSet.loc[dataSet['Team'] == team].copy()
        
    team_players['Birthday'] = pd.to_datetime(team_players['Birthday'], errors='coerce') # conversione in formato sdatetime 

    # Trova l'indice della data di nascita minima
    oldest_index = team_players['Birthday'].idxmin()

    # Restituisci il giocatore più vecchio
    return team_players.loc[oldest_index]

        
#print(f"\n\nNBA dataset:\n\n {NBA_dataSet}\n\n")
#playerForTeamDict = getNumberOfPlayersV2()
#playerForTeamSeries = pd.Series(playerForTeamDict)
#print(f"\nPlayer quantity for team:\n{playerForTeamSeries}")
print(f"\nPlayer quantity for team:\n{getNumberOfPlayersV2()}")
print(f"\nFive highest paid players:\n{getHighestPayedPlayersV2()}")
print(f"\nOldest player of New York Knicks:\n{getOldestPlayerV2()}")

