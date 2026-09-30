"""
IMDB è un sito web di proprietà di Amazon.com che gestisce informazioni su:
film
attori
registi
personale di produzione
programmi televisivi
videogiochi.

Considerare la lista di episodi di Game of Thrones, che possono essere reperiti in https://www.imdb.com/title/tt0944947/episodes/
per ogni episodio viene riportata
-una descrizione,
-la valutazione media
gli episodi sono distribuiti su più pagine, per cui serve un processo di crawling

produrre dei grafici che riportino statistiche legate agli episodi,
ad esempio un bar plot che riporti il rating medio di ogni episodio

"""

import requests
import matplotlib.pyplot as plt
from bs4 import BeautifulSoup as bs
import pandas as pd 
 

def getEpisodes(url):    
    """returns a list of raw episodes (soup elements) by the url"""
    session = requests.Session()    
    session.headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'}
    response = session.get(url)    
    ##print(f"\nresponse:\n{response}\n{response.text}")
    html_content = response.text
    soup = bs(html_content,'html.parser')
    
    notParsedEpisodeList = soup.find_all(class_='sc-282bae8e-1 dSEzwa episode-item-wrapper')
    return notParsedEpisodeList

def parseAndGetDatas(rawEpisodeList):
    """return parsed episode list by a raw episode list (soup element)"""
    
    parsedEpisodeList = []
    
    for rawEpisode in rawEpisodeList:
        ##print(f"\nraw episode:\n{rawEpisode}")
        title = rawEpisode.find(class_ = 'ipc-title__text').text   
        #print(f"\ntitle:\n{title}")
        
        season = title[1]
        #print(f"\nseason:\n{season}")
        
        episodeNumber = title[4]
        #print(f"\nepisodeNumber:\n{episodeNumber}")
        if(episodeNumber == '0'):
            continue #skip S1 pilot episode 
        
        rating_element = rawEpisode.find(class_='sc-e2dbc1a3-0 ajrIH sc-282bae8e-3 bXuGWE')
        ##print(f"\nrating_element:\n{rating_element}")

        rating_value = rating_element.find(class_='ipc-rating-star ipc-rating-star--base ipc-rating-star--imdb ratingGroup--imdb-rating')
        ##print(f"\nrating_value element :\n{rating_value}")
        
        rating_value = rating_value.get_text(strip=True).split()[0]
        rating_value = rating_value.split('/')[0]
        #rating_value = rawEpisode.find(class_ = 'ipc-icon ipc-icon--star-inline').text
        #print(f"\nrating_value:\n{rating_value}")
        
        rating_str = str(rating_value)+ "/10"
        #print(f"\nrating_str:\n{rating_str}")
        
        
        rating_quantity = rawEpisode.find(class_ = 'ipc-rating-star--voteCount').text
        rating_quantity = rating_quantity.replace("(", "").replace(")", "").strip()
        #print(f"\nrating_quantity:\n{rating_quantity}")
        
        date = rawEpisode.find(class_ = 'sc-f2169d65-10 iZXnmI').text
        #print(f"\ndate:\n{date}")
        
        
        description = rawEpisode.find(class_ = 'ipc-html-content-inner-div').text
            
        ep_datas = {
            'Title' : title,
            'Season number' : season,
            'Episode number' : episodeNumber,
            'Rating value' : rating_value,
            'Rating' : rating_str,
            'Rating quantity' : rating_quantity,
            'Date' : date,
            'Description' : description
        }
        #print(f"\nep datas:\n{ep_datas}")
        parsedEpisodeList.append(ep_datas)
        
    return parsedEpisodeList
        

def createHistogram(dataframe, parameter, bins=10):    
    dataframe_sorted = dataframe.sort_values(by=parameter, ascending=True)
    
    plt.figure(figsize=(10, 6))
    plt.hist(dataframe_sorted[parameter], bins=bins, edgecolor='black')
    plt.xlabel(parameter)
    plt.ylabel('Frequency')
    plt.title(f'Histogram of {parameter} for Game of Thrones Episodes')
    plt.grid(True)
    plt.tight_layout()
    plt.show()


def main():
    
    episodeDict = dict() 
    fullEpisodeList = []
    print("Loading episode list...")
    for i in range(1, 9): # seasons (1-8)
        print(f"Obtaing raw datas of season {i}")
        
        if(i == 1):
            url = 'https://www.imdb.com/title/tt0944947/episodes/'
        else:
            url = f"https://www.imdb.com/title/tt0944947/episodes/?season={i}"
        
        raw_episodes = getEpisodes(url)
        ##print(f"\nRAW episodes:\n{raw_episodes}\n")
        
        print(f"Obtaing parsed datas of season {i}")        
        parsed_episodes = parseAndGetDatas(raw_episodes)
        
        episodeDict[f"season {i}"] = {
            'parsed episodes': parsed_episodes,
            'dataframe' : pd.DataFrame(parsed_episodes)
        }
        ##print(f"\nParsed episodes:\n{parsed_episodes}\n")
        
        fullEpisodeList = fullEpisodeList + parsed_episodes
    
    allEpisodesDataFrame = pd.DataFrame(fullEpisodeList)
    ##print(f"\nAll episode df:\n{allEpisodesDataFrame}\n")
        
    print("Creating charts...")

    createHistogram(allEpisodesDataFrame, 'Rating value')    



if __name__ == "__main__":
    main()
