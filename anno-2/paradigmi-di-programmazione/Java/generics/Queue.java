package generics;

public class Queue<T> {
    private T[] elements;
    private int size;
    private int front;
    private int rear;

    // Costruttore
    public Queue(int size) {
        elements = (T[]) new Object[size];
        this.size = 0;
       
    }

    // Metodo che restituisce true se la coda è piena
    public boolean isFull() {
        return size == elements.length;
    }

    // Metodo che restituisce true se la coda è vuota
    public boolean isEmpty() {
        return size == 0;
    }

    // Metodo per inserire un elemento nella coda
    public void enqueue(T element) {
        if (!isFull()) {
            rear = (rear + 1) % elements.length;
            elements[rear] = element;
            size++;
        } else {
            System.out.println("La coda è piena. Impossibile aggiungere elementi.");
        }
    }

    // Metodo per rimuovere e restituire l'ultimo elemento della coda
    public T dequeue() {
        if (!isEmpty()) {
            T removedElement = elements[front];
            front = (front + 1) % elements.length;
            size--;
            return removedElement;
        } else {
            System.out.println("La coda è vuota. Impossibile rimuovere elementi.");
            return null; // Puoi scegliere di restituire un valore speciale o sollevare un'eccezione in caso di coda vuota
        }
    }
}
