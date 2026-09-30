"""
Motivation problem

Imagine you have a collection of N wines placed next to each other on a shelf. 
For simplicity, let's number the wines from left to right as they are standing on the shelf with integers from 1 to N, respectively. 
The price of the i-th wine is pi (prices of different wines can be different).

Because the wines get better every year, supposing today is the year 1, on year y the price of the i-th wine will be y*pi, 
i.e. y-times the value that current year.

You want to sell all the wines you have, but you want to --> sell exactly one wine per year <--  starting on this year. 
One more constraint - --> on each year you are allowed to sell only either the leftmost or the rightmost wine on the shelf 
and you are not allowed to reorder the wines on the shelf <-- 
(i.e. they must stay in the same order as they are in the beginning).

You want to find out, what is the !maximum profit! you can get, if you sell the wines in optimal order.

So for example, if the prices of the wines are (in the order as they are placed on the shelf, from left to right): 
p1=1, p2=4, p3=2, p4=3
The optimal solution would be to sell the wines in the order p1, p4, p3, p2 for a total profit 1*1 + 3*2 + 2*3 + 4*4 = 29

soluion :
1
3
2
4


"""

#GREEDY SOLUTION => WRONG SOLUTION:
def sell_wine(wine_array : list[int]) :
    total_profit = 0
    year = 0
    while(len(wine_array)>0): 
        #print(F"wine_array = {wine_array}")
        
        current_v = min(wine_array[0], wine_array[len(wine_array)-1] )
        #print(F"p {year+1} = {current_v}")
        
        total_profit = total_profit + current_v * (year+1) 
        wine_array.pop(wine_array.index(current_v))
        
        year =year+1
        
        
    return total_profit
# => T(n) = O(n) 

p = sell_wine([1,4,2,3])
#print(F"Toral profit = {p}")




#STILL NOT CORRECT ALGORITHM :
#T(n) = O(n^2)
p = [1,4,2,3,] # read-only array of wine prices 
N = len(p)
 
# year represents the current year (starts with 1) 
# [be, en] represents the interval of the unsold wines on the shelf 
def profit(year, be, en):
 
  if(be > en):  # => there are no more wines on the shelf 
      return 0
  
  # try to sell the leftmost or the rightmost wine, recursively calculate the  
  # answer and return the better one 
  return max( 
    profit(year+1, be+1, en) + year * p[be], 
    profit(year+1, be, en-1) + year * p[en]); 


answer = profit(1, 0, N-1); # N is the total number of wines
print(F"Toral profit = {answer}")




#FINAL SOLUTION:

p_W = [2,3,5,1,4] # read-only array of wine prices 
N_L = len(p_W); # read-only number of wines in the beginning 

cache = []
for i in range(N_L):
    cache.append([])
    for j in range(N_L):
        cache[i].append(-1)
print(cache)


# all values initialized to -1 (or anything you choose) 
 
def profit_v2(be, en):
  if (be > en):
    return 0; 
 
  # these two lines save the day 
  if (cache[be][en] != -1) :
    return cache[be][en]; 
 
  year = N_L - (en-be+1) + 1; 
  
  # when calculating the new answer, don't forget to cache it 
  cache[be][en] = max( 
    profit_v2(be+1, en) + year * p_W[be], 
    profit_v2(be, en-1) + year * p_W[en]); 
  return cache[be][en]




answer_2 = profit_v2(0, N-1); # N is the total number of wines
print(F"Toral profit = {answer_2}")


random_a = ["scrivile", "non scriverle"]
import random

print(random_a[random.randint(0,1)])