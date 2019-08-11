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
	string getID() {
		return this->ID;
	}
	string topic() {
		string c = this->Content;
		int start = c.find('#');
		if (start == string::npos)
			return "";
		c = c.substr(start+1, c.length());
		int end = c.find('#');
		if (end == string::npos)
			return "";
		return c.substr(0, end);
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
		if (!getcontent(str, list))
			continue;
		if (str.find('#') == string::npos)
			continue;
		if (!str.empty() && str.length() >= 4) {
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

	ofstream fout09, fout10, fout11, fout12, fout13, fout14, fout15, fout16, fout17, fout18, fout19;
	fout09.open("../../dataWenchuan/topic2009.dat");
	fout10.open("../../dataWenchuan/topic2010.dat");
	fout11.open("../../dataWenchuan/topic2011.dat");
	fout12.open("../../dataWenchuan/topic2012.dat");
	fout13.open("../../dataWenchuan/topic2013.dat");
	fout14.open("../../dataWenchuan/topic2014.dat");
	fout15.open("../../dataWenchuan/topic2015.dat");
	fout16.open("../../dataWenchuan/topic2016.dat");
	fout17.open("../../dataWenchuan/topic2017.dat");
	fout18.open("../../dataWenchuan/topic2018.dat");
	fout19.open("../../dataWenchuan/topic2019.dat");
	for (vector< vector<Tweet> >::iterator it = all.begin(); it < all.end(); it++) {
		ofstream* ptr = 0x0;
		string year = ((*it)[0].year());
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
		for (vector<Tweet>::iterator i = (*it).begin(); i < (*it).end(); i++) {
			string ID =  (*i).getID();
			string topic = (*i).topic();
			if (topic.empty())
				continue;
			*ptr << topic << endl;
			cout << year << ": " << topic << endl;
		}
	}
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