#include<iostream>
#include<sstream>
#include<fstream>
#include<vector>
using namespace std;

bool parse(const string& str, string* list) try {
	string str_new = "";
	istringstream iss(str);
    int flag = 0;
	string temp = "";

    while (getline(iss, temp, ',')) {
        flag++;
		if (flag>7)
			break;
		else {
			list[flag-1] = temp;
		}
    }

	return true;
} catch (...) {
	return false;
}

class Info {
private:
	string _id;
	string NickName;
	string Gender;
	string Province;
	string City;
	string BriefIntroduction;
	string Birthday;
public:
	Info(string _id, string NickName, string Gender, string Province, string City, string BriefIntroduction, string Birthday) {
		this->_id = _id;
		this->NickName = NickName;
		this->Gender = Gender;
		this->Province = Province;
		this->City = City;
		this->BriefIntroduction = BriefIntroduction;
		this->Birthday = Birthday;
	}
	string fix(string id) {
		return id.compare(this->_id) == 0 ? this->Province : "";
	}
	string get() {
		return this->_id + ", " + this->Province;
	}
};

int main() {
	vector< Info > table;
    ifstream finfo;
	finfo.open("../../dataWenchuan/Information.csv");
    if (!finfo.is_open()) {
		cerr << "Can't open this file. ";
		
		return -1;
	}
    string str = "";
	
	getline(finfo, str);
	while (!finfo.eof()) {
		getline(finfo, str);
		string list[7];
		bool flag = parse(str, list);
		if (!str.empty() && flag) {
			table.push_back(*(new Info(list[0], list[1], list[2], list[3], list[4], list[5], list[6])));
		}
	}

    finfo.close();

	for (vector<Info>::iterator s = table.begin(); s < table.end(); s++) {
		cout << (*s).get() << endl;
	}

    return 0;
}