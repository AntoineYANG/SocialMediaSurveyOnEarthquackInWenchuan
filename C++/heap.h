#include<iostream>
#include<vector>
using namespace std;

/* Node */
template <typename T>
	class Node {
		private:
			T Key;
			int value;
		public:
			Node(T key, int value);
			T key();
			void key(T newKey);
			int val();
			void val(int newVal);
	};

template <typename T>
	Node<T>::Node(T key, int value) {
		this->Key = key;
		this->value = value;
	}
template <typename T>
	T Node<T>::key() {
		return Key;
	}
template <typename T>
	void Node<T>::key(T newKey) {
		this->Key = newKey;
	}
template <typename T>
	int Node<T>::val() {
		return this->value;
	}
template <typename T>
	void Node<T>::val(int newVal) {
		this->value = newVal;
	}


/* Heap */
template < typename T >
	class Heap {
		private:
			int maxSize;
			int size;
			void chart(int index);
			void tree(int index);
			void trickleDown(int index);
			void trickleUp(int index);
		public:
			std::vector< Node <T> > heapArray;
			Heap(int volume);
			void clear();
			void displayArray();
			void displayChart();
			void displayTree();
			bool empty();
			int getMaxSize();
			int getSize();
			void insert(Node<T> node);
			bool isFull();
			Node<T> pop_out();
	};
template < typename T >
	Heap<T>::Heap(int volume) {
		heapArray.clear();
		for (int i = 0; i < volume; i++) {
			heapArray.push_back(*(new Node<T>("", 0)));
		}
		maxSize = volume;
		size = 0;
	}
template < typename T >
	void Heap<T>::clear() {
		for (int i = 0; i < size; i++)
			heapArray[i] = 0x0;
		size = 0;
	}
template < typename T >
	void Heap<T>::displayArray() {
		if (empty()) {
			cout << "[]" << endl;
			return;
		}
		cout << "[";
		for (int i = 0; i < size - 1; i++)
			cout << "{key:\"" << heapArray[i].key() << "\",value:" << heapArray[i].val() << "}, ";
		cout << "{key:\"" << heapArray[size - 1].key() << "\",value:" << heapArray[size - 1].val() << "}]" << endl;
	}
template < typename T >
	void Heap<T>::chart(int index) {
		cout << "{key:\"" << heapArray[index].key() << "\",value:" << heapArray[index].val() << "}";
		int child = 2 * index + 1;
		if (child < size) {
			cout << "---";
			chart(child);
		} else
			cout << endl;
		if (++child < size) {
			int parents = 0;
			int me = child;
			while ((me - 1) / 2 >= 0) {
				me = (me - 1) / 2;
				parents++;
				if (me == 0)
					break;
			}
			for (int i = 0; i < parents - 1; i++)
				cout << "     ";
			cout << " ^---";
			chart(child);
		}
	}
template < typename T >
	void Heap<T>::displayChart() {
		if (size == 0) {
			cout << "(empty heap)" << endl;
			return;
		}
		if (size == 1) {
			cout << "{key:\"" << heapArray[0].key() << "\",value:" << heapArray[0].val() << "}" << endl;
			return;
		}
		chart(0);
	}
template < typename T >
	void Heap<T>::tree(int index) {
		if (index >= size)
			return;
		cout << "{key:\"" << heapArray[index].key() << "\",value:" << heapArray[index].val() << "}";
		if (index * 2 + 1 < size) {
			cout << " < ";
			tree(index * 2 + 1);
			if (index * 2 + 2 < size) {
				cout << " , ";
				tree(index * 2 + 2);
			}
			cout << " > ";
		}
	}
template < typename T >
	void Heap<T>::displayTree() {
		cout << "[";
		tree(0);
		cout << "]" << endl;
	}
template < typename T >
	bool Heap<T>::empty() {
		return size == 0;
	}
template < typename T >
	int Heap<T>::getMaxSize() {
		return maxSize;
	}
template < typename T >
	int Heap<T>::getSize() {
		return size;
	}
template < typename T >
	void Heap<T>::insert(Node<T> node) {
		if (isFull()) {
			int minIndex = size - 1;
			int min = heapArray[minIndex].val();
			for (int i = 0; i < size; i++) {
				if (heapArray[i].val() < min) {
					min = heapArray[i].val();
					minIndex = i;
				}
			}
			if (min > node.val())
				return;
			else {
				heapArray[minIndex].key(node.key());
				heapArray[minIndex].val(node.val());
				trickleUp(minIndex);
				return;
			}
		}
		heapArray[size].key(node.key());
		heapArray[size].val(node.val());
		if (size > 0)
			trickleUp(size);
		size++;
	}
template < typename T >
	bool Heap<T>::isFull() {
		return size == maxSize;
	}
template < typename T >
	void Heap<T>::trickleUp(int index) {
		int parent = (index - 1) / 2;
		Node<T> temp = heapArray[index];
		while (index > 0 && heapArray[index].val() > heapArray[parent].val()) {
			heapArray[index] = heapArray[parent];
			heapArray[parent] = temp;
			index = parent;
			parent = (parent - 1) / 2;
			temp = heapArray[index];
		}
	}
template < typename T >
	void Heap<T>::trickleDown(int index) {
		int child = index * 2 + 2;
		if (child < size)
			if (heapArray[child].val() > heapArray[index].val()) {
				Node<T> temp = heapArray[index];
				heapArray[index] = heapArray[child];
				heapArray[child] = temp;
				trickleDown(child);
			}
		if (--child < size)
			if (heapArray[child].val() > heapArray[index].val()) {
				Node<T> temp = heapArray[index];
				heapArray[index] = heapArray[child];
				heapArray[child] = temp;
				trickleDown(child);
			}
	}
template < typename T >
	Node<T> Heap<T>::pop_out() {
		try {
			if (empty())
				throw "!!!No any elements in the heap";
			Node<T> top = heapArray[0];
			heapArray[0] = heapArray[size - 1];
			size--;
			trickleDown(0);
			return top;
		} catch (const char * msg) {
			cerr << msg << endl;
			Node<T> voidNode;
			return voidNode;
		}
	}
