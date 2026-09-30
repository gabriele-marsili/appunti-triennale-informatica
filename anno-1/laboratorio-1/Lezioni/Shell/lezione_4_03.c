// http://didawiki.di.unipi.it/doku.php/ --> slide 


/*


# Esercizio 1
echo "------------------ Esercizio 1 ------------------"
mkdir temp
cd temp
mkdir -p sorgente/destinazione
echo "contenuto" > sorgente/esempio.txt
cd sorgente
pwd
pwd >> esempio.txt

# Esercizio 2
echo "------------------ Esercizio 2 ------------------"
pwd
rm esempio.txt
echo -e "Pippo\nPluto\nCiccio\nGervasi\nBacciu" > Lista1.txt
echo -e "Sirbu\nPrencipe\nPsyduck\nMagikarp\nJigglypuff" > Lista2.txt
mv Lista1.txt destinazione
cp Lista2.txt destinazione

# Esercizio 3
echo "------------------ Esercizio 3 ------------------"
cd destinazione
pwd
ls -l
cat Lista1.txt
cat Lista2.txt
cat Lista1.txt Lista2.txt > amiconi.txt

# Esercizio 4
echo "------------------ Esercizio 4 ------------------"
cd ../..
pwd
mkdir num_utili
wget http://didawiki.di.unipi.it/lib/exe/fetch.php/informatica/prl/rubrica.zip
unzip rubrica.zip
mv rubrica.txt num_utili
# cat num_utili/rubrica.txt
# more num_utili/rubrica.txt

# Esercizio 5
echo "------------------ Esercizio 5 ------------------"
sort num_utili/rubrica.txt > num_utili/rubrica_sorted.txt
sed -i '/^$/d' num_utili/rubrica_sorted.txt
head -n 5 num_utili/rubrica_sorted.txt
head -n 5 num_utili/rubrica_sorted.txt > rubrica1.txt

# Esercizio 6
echo "------------------ Esercizio 6 ------------------"
pwd
# (for((i=1; ;i++)) do echo “[{i}] Fermami se ciriesci” ; sleep 1; done)
# chiudi processo CTRL-C
# stoppa processo CTRL-Z
# riattiva il processo con fg 1

# Esercizio 7
echo "------------------ Esercizio 7 ------------------"
pwd
gzip < rubrica1.txt > rubrica1.gz
file rubrica1.gz
ls -lh

# Esercizio 8 (a casa!)
echo "------------------ Esercizio 8 ------------------"
pwdecho Hello World
Files

*/