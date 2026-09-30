package generics;

public interface Collection<T,K> {
    boolean contains(T element);
    boolean containsWithKey(T element, K key);
    boolean remove(T element);
    boolean add(T element);
}
