//INSERTION SORT COME DA CORMEN
function insertionSort(a) { // O(n^2)
    for (j = 1; j < a.length; j++) {
        key = a[j];
        i = j - 1;
        while (i > -1 && a[i] > key) {
            a[i + 1] = a[i];
            i = i - 1;
        }
        a[i + 1] = key;
    }
}

//----------------------------------------------------------

//SELECTION SORT (quasi) COME A LEZIONE
function selectionSort(a) { // O(n^2)
    for (i = 0; i < a.length - 1; i++) {
        min = a[i];
        minIndex = i;
        for (j = i + 1; j < a.length; j++)
            if (a[j] < min) {
                min = a[j];
                minIndex = j;
            }
        temp = a[i];
        a[i] = a[minIndex];
        a[minIndex] = temp;
    }
}

//----------------------------------------------------------

//VERSIONE DEL MERGESORT PIU' UMANA RISPETTO AL CORMEN
function merge(a1, a2) { //  O(N)
    let result = [];
    let i = 0;
    let j = 0;

    while (i < a1.length && j < a2.length) {
        if (a1[i] > a2[j]) {
            result.push(a2[j]);
            j++;
        } else {
            result.push(a1[i]);
            i++;
        }
    }

    while (i < a1.length) {
        result.push(a1[i]);
        i++;
    }

    while (j < a2.length) {
        result.push(a2[j]);
        j++;
    }

    return result;
}

//a VIENE DISTRUTTO (splice)
function mergeSort(a) { // O(N logN)
    if (a.length <= 1) return a;
    let q = Math.ceil(a.length / 2);
    let L = mergeSort(a.splice(0, q));
    let R = mergeSort(a.splice(-q));
    return merge(L, R);
}

//----------------------------------------------------------

//VERSIONE DEL MERGESORT PIU' JS
function mergeJS(a1, a2) {
    let sorted = [];

    while (a1.length && a2.length) {
        if (a1[0] < a2[0]) sorted.push(a1.shift());
        else sorted.push(a2.shift());
    };

    return sorted.concat(a1.slice().concat(a2.slice()));
};

//a NON VIENE DISTRUTTO (slice)
function mergeSortJS(a) { //  O(N logN)
    if (a.length <= 1) return a;
    let q = Math.floor(a.length / 2);
    let L = mergeSortJS(a.slice(0, q));
    let R = mergeSortJS(a.slice(q));

    return mergeJS(L, R);
};

//----------------------------------------------------------

//VERSIONE DEL MERGESORT COME DA CORMEN
//p: indice iniziale di a, r: indice finale di a, q: indice di mezzo 
function mergeCormen(a, p, q, r) { //  O(N)
    n1 = q - p + 1;
    n2 = r - q;
    let L = [];
    let R = [];
    for (i = 0; i < n1; i++) {
        L[i] = a[p + i];
    }
    for (j = 0; j < n2; j++) {
        R[j] = a[q + j + 1];
    }
    L[n1] = Infinity;
    R[n2] = Infinity;
    i = 0;
    j = 0;
    for (k = p; k <= r; k++) {
        if (L[i] <= R[j]) {
            a[k] = L[i];
            i++;
        } else {
            a[k] = R[j];
            j++
        }
    }
    return a;
}

function mergeSortCormen0(a, p, r) { //  O(N logN)
    if (p < r) {
        let q = Math.floor((p + r) / 2);
        mergeSortCormen0(a, p, q);
        mergeSortCormen0(a, q + 1, r);
        mergeCormen(a, p, q, r);
    }
}

function mergeSortCormen(a) { //  O(N logN)
    mergeSortCormen0(a, 0, a.length - 1)
}

//----------------------------------------------------------

//QUICKSORT COME DA CORMEN
//p: indice iniziale di a, r: indice finale di a
function quickSortCormen0(a, p, r) { // O(N^2) caso pessimo  /  O(N logN) caso medio e ottimo
    if (p < r) {
        q = partitionCormen(a, p, r);
        quickSortCormen0(a, p, q - 1);
        quickSortCormen0(a, q + 1, r);
    }
}

function partitionCormen(a, p, r) {
    x = a[r];
    i = p - 1;
    for (j = p; j < r; j++) {
        if (a[j] <= x) {
            i = i + 1;
            temp = a[i];
            a[i] = a[j];
            a[j] = temp;
        }
    }
    temp = a[i + 1];
    a[i + 1] = a[r];
    a[r] = temp;
    return i + 1;
}

function quickSortCormen(a) {
    quickSortCormen0(a, 0, a.length - 1);
}

//----------------------------------------------------------

//RANDOMIZED QUICKSORT COME DA CORMEN
//p: indice iniziale di a, r: indice finale di a
function randomizedPartitionCormen(a, p, r) {
    i = Math.floor(Math.random() * (r - p + 1)) + p;
    temp = a[i];
    a[i] = a[r];
    a[r] = temp;
    return partitionCormen(a, p, r);
}

function randomizedQuickSortCormen0(a, p, r) { //  O(N logN)
    if (p < r) {
        q = randomizedPartitionCormen(a, p, r);
        randomizedQuickSortCormen0(a, p, q - 1);
        randomizedQuickSortCormen0(a, q + 1, r);
    }
}

function randomizedQuickSortCormen(a) {
    randomizedQuickSortCormen0(a, 0, a.length - 1)
}

//----------------------------------------------------------

//SORT NATIVO DEGLI ARRAY IN JAVASCRIPT
//  nota: la funzione di comparazione serve a fare i confronti
//        come numeri (12 > 3); senza farebbe un confronto
//        fra stringhe ("12" < "3")
// gli passiamo una funzione lambda che restiruisce 0 se due numeri sono uguali, maggiore di zero sel primo e' maggiore del secondo o minore di zero se il primo e' piu' piccolo del secondo
function nativeSort(a) { //  O(N logN)
    a.sort((a, b) => a - b);
}