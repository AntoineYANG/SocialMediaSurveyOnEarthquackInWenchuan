# -*- coding:utf-8 -*-
from snownlp import SnowNLP
import json


def nlp(year, text, file):
    sentences = []
    senti_score = []

    complished = 0

    for i in text:
        a1 = SnowNLP(i[0])
        a2 = a1.sentiments
        sentences.append(i[0])  # 语序...
        senti_score.append(a2)
        print("{} - Sentencing {}%...".format(year, int(complished * 100000 / len(text)) / 1000))
        complished += 1
        pass

    file.write("[\n")

    for idx in range(0, len(senti_score)):
        file.write("[")
        file.write("\"{}\", {}, {}, {}".format(text[idx][0], text[idx][1], text[idx][2], senti_score[idx]))
        if idx < len(senti_score) - 1:
            file.write("],\n")
            pass
        else:
            file.write("]")
            pass
        print("{} - Writing in {}%...".format(year, int(idx * 100000 / len(senti_score)) / 1000))
        pass

    file.write("]\n")

    return


if __name__ == '__main__':
    for year in range(2009, 2011):
        with open("data/{}.json".format(year), mode="r", encoding='utf-8') as file:
            with open("data/score{}.json".format(year), mode="w", encoding='utf-8') as out:
                text = json.load(file)
                print(year, len(text['data']))
                formatset = text['data']
                nlp(year, formatset, out)
                pass
            pass
        pass
    for year in range(2011, 2020):
        with open("data/{}.json".format(year), mode="r", encoding='utf-8') as file:
            with open("data/score{}.json".format(year), mode="w", encoding='utf-8') as out:
                text = json.load(file)
                print(year, len(text))
                formatset = text
                nlp(year, formatset, out)
                pass
            pass
        pass
    pass

