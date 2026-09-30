from concurrent.futures import ThreadPoolExecutor
from multiprocessing import Process, Queue
import math
import time

def executeWithThreads(functionToApply, threadsQuantity, datasArray, processId = None, processResQueue = None, functionToApplyArgs = None ):
    """
    @param functionToApply : funzione che viene applicata ad ogni dato in datasArray
    @param threadsQuantity : massimo numero di threads 
    @param datasArray : array ai cui dati viene applicata la funzione 
    @param processId [optional] : id univoco del processo (utilizzarlo se executeWithThreads viene chiamata da più processi)
    @param processResQueue [optional] : queue del processo (utilizzarla se executeWithThreads viene chiamata da più processi)
    @functionToApplyArgs [optional] : argomenti di functionToApply
    """
    #print(f'functionToApplyArgs = {functionToApplyArgs}')
    print("\nexecuteWithThreads started")
    startD = time.time()
    chunk_size = max(math.ceil(len(datasArray) / threadsQuantity),1)
    
    results = [None] * threadsQuantity
        
    def process_data(index):
        start = index * chunk_size
        if(start > len(datasArray)-1):
            return []
       
        end = min(start + chunk_size, len(datasArray)) 
        
        try :
            datasToProcess = datasArray[start:end]
        except Exception as e:
            print(e)
            datasToProcess = datasArray.iloc[start:end]
                
        if(functionToApplyArgs is not None):
            return [functionToApply(data, *functionToApplyArgs) for data in datasToProcess]

            
        else:
            return [functionToApply(data) for data in datasToProcess]

            
    
    # Avvia i thread per l'elaborazione delle parti dei dati
    with ThreadPoolExecutor(max_workers=threadsQuantity) as executor:
        futures = {executor.submit(process_data, i): i for i in range(threadsQuantity)}
        
        # Attendi il completamento di tutti i thread
        for future in futures:
            index = futures[future]
            results[index] = future.result()
    
    # Unisci i risultati in un unico array ordinato
    sorted_results = [result for sublist in results for result in sublist]
    if(processResQueue is not None and processId is not None):
        processResQueue.put((processId, sorted_results))
        return
    
    endD = time.time()
    
    print(f"execute with threads ended in {endD-startD} seconds")
    return sorted_results

def distributeWork(numProcess, numThread, work, datasArray, *workArgs):
    """
    @param numProcess: numero di processi da utilizzare (può essere 0)
    @param numThread: numero di threads da utilizzare (> 0)
    @param work : funzione (da eseguire) i cui primi tre parametri sono :
        - numThread (numero di thr)
        - res_queue ed identificatore (i) del processo (se numProcess > 0)
        - niente se numProcess == 0
    @param datasArray : array di dati (suddiviso in processi e/o threds) su cui viene applicato work 
    @param workArgs  : tutti gli (altri) argomenti di work, messi come una tupla (dovranno opportunamente essere ripresi e gestiti in work)
    @return : array con i risultati da ogni thred
    
    la funzione :
    •se numProcess > 0 crea numProcess processi, ogni processo con numThread threads
    •se numProcess == 0 crea numThread threds
    
    ad ogni threads viene fatta eseguire la funzione work con i relativi argomenti
    sull'ammontare di dati per singolo thread.
    
    viene atteso il risultato e ritornato un array contenente i risultati ottenuti dai threads   
    
    
    """
    #print(f"workArgs = {workArgs}")
    if numProcess > 0:
        res_queue = Queue()
        processes = []
        chunk_size = max(math.ceil(len(datasArray) / numProcess), 1)

        for i in range(numProcess):
            start = i * chunk_size
            end = min(start + chunk_size, len(datasArray))
            try : 
                datasForProcess_i = datasArray[start:end]
            except Exception as e:
                print(e)
                datasForProcess_i = datasArray.iloc[start:end]
                
            p = Process(target = executeWithThreads, args = (work, numThread, datasForProcess_i, i, res_queue, workArgs))
            processes.append(p)
            
        # Avvia i processi
        for p in processes:
            p.start()
        
        process_results = [] #array di tuple (id, risultato) dei processi dove ogni risultato è un array di risultati (valori) (ordinati in base ad ordinamento iniziale) dei threads 
        for p in processes:
            p.join()  # Attende che il processo p completi
            process_results.append(res_queue.get())  # Ottiene il risultato dalla coda
            #res_queue[last] = (id, arrRes_ByThread)
            print(f'got res {process_results[len(process_results)-1]}')
        
        finalResults = []        
        lastID = 0
        for pID, res in process_results: #mantengo ordine : 
            # res (risultato processo i-esimo) = array con risultati dai threads del processo i
            if(pID < lastID or pID == 0):
                finalResults = res + finalResults
            else:
                finalResults = finalResults + res 
                
            lastID = pID
        
        return finalResults    
                

    else: # uso solo i threads :
        return executeWithThreads(work,numThread,datasArray, functionToApplyArgs = workArgs)
        