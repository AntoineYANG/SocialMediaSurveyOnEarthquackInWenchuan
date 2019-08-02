#include<iostream>
#include<sstream>
#include<fstream>
#include<vector>
using namespace std;

string syntax[] = {"??", "???", "??", "\"", "??", "??", "?", "??", "??", "??", "??", "??", "??", "??", "??", "??", "??", 
	"??", "?", "?", "??", "??", "??", "??", "??", "??"};

string filt(const string& str) {
	string str_new = str;
	for (int i = 0; i < 26; i++) {
		while (str_new.find(syntax[i])!=-1)
			str_new = str_new.replace(str_new.find(syntax[i]), str_new.find(syntax[i])+syntax[i].length(), "");
	}

	return str_new;
}

string getcomments(const string& str) {
	string str_new = str;
	int index = str.find("//");
	if (index!=-1)
		str_new = str_new.substr(0, index);
	index = str.find("O");
	if (index!=-1)
		str_new = str_new.substr(0, index);
	index = str.find("[??]");
	if (index!=-1)
		str_new = str_new.substr(0, index);
	return filt(str_new);
}

string getcontent(const string& str, string* list) try {
	string str_new = "";
	istringstream iss(str);
    int flag = 0;
	string temp = "";

    while (getline(iss, temp, ',')) {
        flag++;
		if (flag>20)
			return "";
		if (flag==5) {
			str_new = getcomments(temp);
			list[flag-1] = str_new;
		}
		else {
			list[flag-1] = temp;
		}
    }

	return str_new;
} catch (...) {
	return "";
}

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
		return "{\"id\":\"" + this->_id + "\",\"longid\":\"" + this->longid
			+ "\",\"ID\":\"" + this->ID + "\",\"NickNmae\":\"" + this->NickNmae
			+ "\",\"Content\":\"" + this->Content + "\",\"PubTime\":\"" + this->PubTime
			+ "\",\"Tools\":\"" + this->Tools + "\",\"Like\":\"" + this->Like
			+ "\",\"Comment\":\"" + this->Comment + "\",\"Transfer\":\"" + this->Transfer
			+ "\",\"PageLink\":\"" + this->PageLink + "\",\"Favorite\":\"" + this->Favorite
			+ "\",\"provincecode\":\"" + this->provincecode + "\",\"citycode\":\"" + this->citycode
			+ "\",\"province\":\"" + this->province + "\",\"city\":\"" + this->city
			+ "\",\"mediapiclist\":\"" + this->mediapiclist + "\",\"mediaarticle\":\"" + this->mediaarticle
			+ "\",\"mediamusic\":\"" + this->mediamusic + "\",\"mediavideo\":\"" + this->mediavideo + "\"}";
	}
	string content() {
		return this->Content;
	}
};

int main() {
	vector< vector<Tweet> > all;
    ifstream fin;
    fin.open("../../dataWenchuan/Tweets_wenchuan_512.csv");
    if (!fin.is_open()) {
		cerr << "Can't open this file. ";
		
		return -1;
	}
    string str;
	string year = "";
	int now = -1;

	while (!fin.eof()) {
		getline(fin, str);
		string list[20];
		str = getcontent(str, list);
		if (!str.empty() && str.length() >= 4) {
			cout << list[0] << " ";
			year = list[5].substr(0, 4);
			int flag = -1;
			for (vector< vector<Tweet> >::iterator it = all.begin(); it < all.end(); it++) {
				if ((*it)[0].sameYear(year)) {
					flag = it - all.begin();
					break;
				}
			}
			if (flag==-1) {
				vector<Tweet> first;
				first.push_back(*(new Tweet(list[0], list[1], list[2], list[3], list[4], list[5], list[6], list[7], list[8], list[9],
					list[10], list[11], list[12], list[13], list[14], list[15], list[16], list[17], list[18], list[19])));
				all.push_back(first);
			}
			else {
				all[flag].push_back(*(new Tweet(list[0], list[1], list[2], list[3], list[4], list[5], list[6], list[7], list[8], list[9],
					list[10], list[11], list[12], list[13], list[14], list[15], list[16], list[17], list[18], list[19])));
			}
		}
	}

    fin.close();

	now = -1;

	ofstream fout;
	fout.open("../../dataWenchuan/word2017.dat");
	// fout << "[";
	for (vector< vector<Tweet> >::iterator it = all.begin(); it < all.end(); it++) {
		if (((*it)[0].year()).compare("2017") != 0)
			continue;
		// fout << "{\"year\":\"" << (*it)[0].year() << "\",\"data\":[";
		// for (vector<Tweet>::iterator i = (*it).begin(); i < (*it).end(); i++) {
		// 	fout << (*i).print();
		// 	if (i != (*it).end() - 1)
		// 		fout << ",";
		// }
		// fout << "]";
		// if (it < all.end() - 1)
		// 	fout << "," << endl;
		// cout << ++now << endl;
		for (vector<Tweet>::iterator i = (*it).begin(); i < (*it).end(); i++) {
			fout << (*i).content();
			if (i != (*it).end() - 1)
				fout << endl;
		}
	}
	// fout << "]" << endl;
	fout.close();

    return 0;
}