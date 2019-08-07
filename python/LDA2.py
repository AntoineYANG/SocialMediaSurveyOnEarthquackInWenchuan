from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation

df = []
with open("../../dataWenchuan/set2018.dat", encoding='utf-8') as file:
    # 文本集
    origin = file.readline().split('/')
    df = [origin[piece] for piece in range(0, len(origin), 1)]

    # 创建词袋矩阵作为 LDA 的输入
    count = CountVectorizer(    # stop_words='chinese',   # 使用内置的停用词库
                            max_df=.02,          # 单词最大文档频率
                                # max_features=5000   # 最常出现的5000个单词
                            )
    X = count.fit_transform(df)

    # 评估器
    n_topics = 8
    lda = LatentDirichletAllocation(n_components=n_topics,
                                    random_state=123,
                                    max_iter=20,
                                    learning_method='batch')
    X_topics = lda.fit_transform(X)

    # 显示主题
    n_top_words = 10
    feature_names = count.get_feature_names()
    i = 0
    for topic_idx, topic in enumerate(lda.components_):
        print("\n\tTopic %d:" % (topic_idx + 1))
        print("\t\t_hot words: ",  ", ".join([feature_names[i] for i in topic.argsort()[:-n_top_words - 1:-1]]))
        theme = X_topics[:, i].argsort()[::-1]
        print("\t\t_cases:")
        for iter_idx, tweet_idx in enumerate(theme[:3]):
            print('\t          {}. '.format(iter_idx + 1),
                  "/".join([df[n] for n in range(tweet_idx - 5, tweet_idx + 16)]), '...')
            pass
        i += 1
        pass
    pass

