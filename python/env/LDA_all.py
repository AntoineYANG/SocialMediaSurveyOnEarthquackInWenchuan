from gensim import corpora, models

if __name__ == "__main__":
    texts = []
    for i in range(2009, 2020):
        with open("../../../dataWenchuan/set" + str(i) + ".dat", encoding='utf-8') as file:
            origin = file.readline().split('/')
            df = [origin[piece] for piece in range(0, len(origin), (int)(len(origin)/99))]
            print(len(df))
            texts.append(df)
            pass
        pass

    # 构造词典
    dictionary = corpora.Dictionary(texts)
    # 基于词典，使【词】→【稀疏向量】，并将向量放入列表，形成【稀疏向量集】
    corpus = [dictionary.doc2bow(words) for words in texts]

    # LDA模型，num_topics设置主题的个数
    lda = models.ldamodel.LdaModel(corpus=corpus, id2word=dictionary, num_topics=10,
                                   decay=0.5, chunksize=200000)

    # LdaModel(num_terms=19, num_topics=2, decay=0.5, chunksize=2000)

    # 打印所有主题，每个主题显示 num_words 个词
    for topic in lda.print_topics(num_words=10):
        print(topic)
        pass

    year = 2009
    # 主题推断
    for e, values in enumerate(lda.inference(corpus)[0]):
        print(year)
        year += 1
        for ee, value in enumerate(values):
            print('\t主题%d推断值%.2f' % (ee, value))
    pass

