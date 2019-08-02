import math
import numpy as np
import jieba
import jieba.posseg as psg
import functools
from gensim import corpora, models


def get_stopword_list():
    stop_word_path = './StopWords.txt'
    stopword_list = [sw.replace('\n', '') for sw in open(stop_word_path).readlines()]
    return stopword_list


def seg_to_list(sentence, pos=False):
    if not pos:  # 不进行词性标注的分词方法
        seg_list = jieba.cut(sentence)
    else:        # 进行词性标注的分词方法
        seg_list = psg.cut(sentence)
    return seg_list


def word_filter(seg_list, pos=False):
    stopword_list = get_stopword_list()
    filter_list = []
    for seg in seg_list:
        if not pos:
            word = seg
            flag = 'n'
        else:
            word = seg.word
            flag = seg.flag
        if not flag.startswith('n'):
            continue
        # 过滤高停用词表中的词，以及长度<2的词
        if word not in stopword_list and len(word) > 1:
            filter_list.append(word)
    return filter_list


def load_data(pos=False, corpus_path='../../dataWenchuan/word2009.dat'):
    doc_list = []
    for line in open(corpus_path, 'r', encoding='utf-8'):
        content = line.strip()
        seg_list = seg_to_list(content, pos)
        filter_list = word_filter(seg_list, pos)
        doc_list.append(filter_list)
    return doc_list


class TopicModel(object):
    def __init__(self, doc_list, keyword_num, model='LDA', num_topics=4):
        # 使用gensim的接口，将文本转换为向量化的表示
        self.dictionary = corpora.Dictionary(doc_list)
        # 使用BOW模型向量化
        corpus = [self.dictionary.doc2bow(doc) for doc in doc_list]
        # 对每个词，根据TF-IDF进行加权，得到加权后的向量表示
        self.tfidf_model = models.TfidfModel(corpus)
        self.corpus_tfidf = self.tfidf_model[corpus]
        self.keyword_num = keyword_num
        self.num_topics = num_topics
        self.model = self.train_lda()
        # 得到数据集的 主题-词分布
        word_dic = self.word_dictionary(doc_list)
        self.wordtopic_dic = self.get_wordtopic(word_dic)


def train_lda(self):
    lda = models.LdaModel(self.corpus_tfidf, num_topics=self.num_topics, id2word=self.dictionary)
    return lda


def get_wordtopic(self, word_dic):
    wordtopic_dic = {}
    for word in word_dic:
        single_list = [word]
        wordcorpus = self.tfidf_model[self.dictionary.doc2bow(single_list)]
        wordtopic = self.model[wordcorpus]
        wordtopic_dic[word] = wordtopic
    return wordtopic_dic


def get_simword(self, word_list):
    sentcorpus = self.tfidf_model[self.dictionary.doc2bow(word_list)]
    senttopic = self.model[sentcorpus]
    # 余弦相似度计算
    def calsim(l1, l2):
        a, b, c = 0.0, 0.0, 0.0
        for t1, t2 in zip(l1, l2):
            x1 = t1[1]
            x2 = t2[1]
            a += x1 * x1
            b += x1 * x1
            c += x2 * x2
        sim = a / math.sqrt(b * c) if not (b * c) == 0 else 0.0
        return sim
    sim_dic = {}
    for k, v in self.wordtopic_dic.items():
        if k not in word_list:
            continue
        sim = calsim(v, senttopic)
        sim_dic[k] = sim
    for k, v in sorted(sim_dic.items(), key=functools.cmp_to_key(cmp), reverse=True)[:self.keyword_num]:
        print(k + "/", end='')
    print()


# 词空间构建方法和向量化方法，在没有gensim接口时的一般处理方法
def word_dictionary(self, doc_list):
    dictionary = []
    for doc in doc_list:
        dictionary.extend(doc)
    dictionary = list(set(dictionary))
    return dictionary


def doc2bowvec(self, word_list):
    vec_list = [1 if word in word_list else 0 for word in self.dictionary]
    return vec_list


def topic_extract(wordlist, model, pos=False, keyword_num=10):
    doc_list = load_data(pos)
    topic_model = TopicModel(doc_list, keyword_num, model=model)
    topic_model.get_simword(wordlist)


if __name__ == '__main__':
    text = '6月19日,《2012年度“中国爱心城市”公益活动新闻发布会》在京举行。' + \
           '中华社会救助基金会理事长许嘉璐到会讲话。基金会高级顾问朱发忠,全国老龄' + \
           '办副主任朱勇,民政部社会救助司助理巡视员周萍,中华社会救助基金会副理事长耿志远,' + \
           '重庆市民政局巡视员谭明政。晋江市人大常委会主任陈健倩,以及10余个省、市、自治区民政局' + \
           '领导及四十多家媒体参加了发布会。中华社会救助基金会秘书长时正新介绍本年度“中国爱心城' + \
           '市”公益活动将以“爱心城市宣传、孤老关爱救助项目及第二届中国爱心城市大会”为主要内容,重庆市' + \
           '、呼和浩特市、长沙市、太原市、蚌埠市、南昌市、汕头市、沧州市、晋江市及遵化市将会积极参加' + \
           '这一公益活动。中国雅虎副总编张银生和凤凰网城市频道总监赵耀分别以各自媒体优势介绍了活动' + \
           '的宣传方案。会上,中华社会救助基金会与“第二届中国爱心城市大会”承办方晋江市签约,许嘉璐理' + \
           '事长接受晋江市参与“百万孤老关爱行动”向国家重点扶贫地区捐赠的价值400万元的款物。晋江市人大' + \
           '常委会主任陈健倩介绍了大会的筹备情况。'
    pos = False
    seg_list = seg_to_list(text, pos)
    filter_list = word_filter(seg_list, pos)
    print('LDA模型结果:')
    topic_extract(filter_list, 'LDA', pos)

