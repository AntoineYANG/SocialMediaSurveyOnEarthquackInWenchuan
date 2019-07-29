#include<iostream>
#include<fstream>
#include"heap.h"
using namespace std;

int parseInt(string str) {
    int num = 0;
    for (int i = 0; i < str.length(); i++) {
        if (str[i] < '0' || str[i] > '9')
            break;
        num *= 10;
        num += (str[i] - '0');
    }

    return num;
}

int main() {
    Heap<string>* top = new Heap<string>(80);

	ifstream fin;
	fin.open("../../dataWenchuan/wordcount.dat");
	if (!fin.is_open()) {
		cerr << "Can't open this file. ";
		
		return -1;
	}
	string str;

	while (!fin.eof()) {
	 	getline(fin, str);
        string key = str.substr(0, str.find(','));
        cout << key << "-";
        int value = parseInt(str.substr(str.find(',')+1, str.length()));
        cout << value << endl;
        Node<string> n = *(new Node<string>(key, value));
        top->insert(n);
    	top->displayArray();
	}
	fin.close();

    ofstream fout;
    fout.open("../../dataWenchuan/top.json");
    for (int i = 0; i < 80; i++) {
        fout << "[\"" << top->heapArray[i].key() << "," << top->heapArray[i].val() << "]," << endl;
    }
    fout.close();

    return 0;
}
