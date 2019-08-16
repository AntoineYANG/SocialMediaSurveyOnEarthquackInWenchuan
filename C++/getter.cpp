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

string parseTime(const string& str) {
	int num = 0;
	string nstr = "";
	for (int i = 0; i < 4; i++) {
		num *= 10;
		num += (str[i] - '0');
	}
	num = (num - 2009) * 12;
	int m = 0;
	for (int i = 7; i < 9; i++) {
		m *= 10;
		// cout << str[i];
		m += (str[i] - '0');
	}
	num += m - 1;

	stringstream sstr;
	sstr << num;
	nstr = sstr.str();
	sstr.clear();
	
	return nstr;
}

bool getcontent(const string& str, string* list) try {
	string str_new = "";
	istringstream iss(str);
    int flag = 0;
	string temp = "";

    while (getline(iss, temp, ',')) {
        flag++;
		if (flag>20)
			return false;
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
	string getID() {
		return this->_id;
	}
};

class Tweet {
private:
	string _id;
	string longid;
	string ID;
	string NickNmae;
	string Content;
	string PubTime;
	string Tools;
	string Like;
	string Comment;
	string Transfer;
	string PageLink;
	string Favorite;
	string provincecode;
	string citycode;
	string province;
	string city;
	string mediapiclist;
	string mediaarticle;
	string mediamusic;
	string mediavideo;
public:
	Tweet(string _id, string longid, string ID, string NickNmae, string Content, string PubTime, string Tools, string Like, 
		string Comment, string Transfer, string PageLink, string Favorite, string provincecode, string citycode, string province,
		string city, string mediapiclist, string mediaarticle, string mediamusic, string mediavideo) {
		this->_id = _id;
		this->longid = longid;
		this->ID = ID;
		this->NickNmae = NickNmae;
		this->Content = Content;
		this->PubTime = PubTime;
		this->Tools = Tools;
		this->Like = Like;
		this->Comment = Comment;
		this->Transfer = Transfer;
		this->PageLink = PageLink;
		this->Favorite = Favorite;
		this->provincecode = provincecode;
		this->citycode = citycode;
		this->province = province;
		this->city = city;
		this->mediapiclist = mediapiclist;
		this->mediaarticle = mediaarticle;
		this->mediamusic = mediamusic;
		this->mediavideo = mediavideo;
	}
	bool sameYear(string comp) {
		return this->PubTime.substr(0,4).compare(comp)==0;
	}
	string year() {
		return this->PubTime.substr(0,4);
	}
	string print() {
		return this->Content + "," + parseTime(this->PubTime) + ",";
	}
	string getID() {
		return this->ID;
	}
};

ifstream fin, finfo;

void skip(int n ) try {
	string plc = "";
	for (int i = 1; i < n; i++)
		getline(fin, plc);
} catch (...) {
	return;
}

const int ALL = 1344512;
int now = 0;
const double DID = 79.2927;

int main() {
	vector< Info > table;
    fin.open("../../dataWenchuan/Tweets_wenchuan_512.csv");
	finfo.open("../../dataWenchuan/Information.csv");
    if (!fin.is_open() || !finfo.is_open()) {
		cerr << "Can't open this file. ";
		
		return -1;
	}
    string str;
	string year = "";
	int now = -1;
	
	while (!finfo.eof()) {
		getline(finfo, str);
		string list[7];
		if (!str.empty() && parse(str, list)) {
			table.push_back(*(new Info(list[0], list[1], list[2], list[3], list[4], list[5], list[6])));
		}
	}

    finfo.close();

	ofstream fout09, fout10, fout11, fout12, fout13, fout14, fout15, fout16, fout17, fout18, fout19;
	fout09.open("../data/read/read2009_p.dat");
	fout10.open("../data/read/read2010_p.dat");
	fout11.open("../data/read/read2011_p.dat");
	fout12.open("../data/read/read2012_p.dat");
	fout13.open("../data/read/read2013_p.dat");
	fout14.open("../data/read/read2014_p.dat");
	fout15.open("../data/read/read2015_p.dat");
	fout16.open("../data/read/read2016_p.dat");
	fout17.open("../data/read/read2017_p.dat");
	fout18.open("../data/read/read2018_p.dat");
	fout19.open("../data/read/read2019_p.dat");
	ofstream* ptr = 0x0;

	while (!fin.eof()) {
		getline(fin, str);
		string list[20];
		while (now <= ALL * DID) {
			now++;
			continue;
		}
		if (!getcontent(str, list))
			continue;
		if (!str.empty() && str.length() >= 4) {
			year = list[5].substr(0, 4);
			if (year.compare("2009")==0)
				ptr = &fout09;
			else if (year.compare("2010")==0)
				ptr = &fout10;
			else if (year.compare("2011")==0)
				ptr = &fout11;
			else if (year.compare("2012")==0)
				ptr = &fout12;
			else if (year.compare("2013")==0)
				ptr = &fout13;
			else if (year.compare("2014")==0)
				ptr = &fout14;
			else if (year.compare("2015")==0)
				ptr = &fout15;
			else if (year.compare("2016")==0)
				ptr = &fout16;
			else if (year.compare("2017")==0)
				ptr = &fout17;
			else if (year.compare("2018")==0)
				ptr = &fout18;
			else if (year.compare("2019")==0)
				ptr = &fout19;
			else
				continue;
			Tweet* tw = new Tweet(list[0], list[1], list[2], list[3], list[4], list[5], list[6], list[7], list[8], list[9],
				list[10], list[11], list[12], list[13], list[14], list[15], list[16], list[17], list[18], list[19]);
			string ID =  tw->getID();
			string city = "";
			for (vector<Info>::iterator s = table.begin(); s < table.end(); s++) {
				city = (*s).fix(ID);
				if (!city.empty() && city.compare("") != 0) {
					*ptr << tw->print() << city << endl;
					// cout << tw->print() << city << endl;
					break;
				}
			}
			delete tw;
			now++;
			if (now % 100 == 0)
				cout << now * 100.00000 / ALL << endl;
		}
	}
	fin.close();
	
	fout09.close();
	fout10.close();
	fout11.close();
	fout12.close();
	fout13.close();
	fout14.close();
	fout15.close();
	fout16.close();
	fout17.close();
	fout18.close();
	fout19.close();

    return 0;
}