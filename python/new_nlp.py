import pandas as pd
import jieba
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import cross_val_score
from sklearn import metrics


def chinese_word_cut(text):
    return " ".join(jieba.cut(text))


if __name__ == '__main__':
    with open('training.json', encoding='utf-8') as file:
        data = pd.read_json(file)
        X = data[[0]][0].apply(chinese_word_cut)
        y = data[3]
        X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=1)
        vect = CountVectorizer(max_df=0.8, min_df=3, token_pattern=u'(?u)\\b[^\\d\\W]\\w+\\b')
        term_matrix = pd.DataFrame(vect.fit_transform(X_train).toarray(),
                                   columns=vect.get_feature_names())
        # print(term_matrix.head())
        nb = MultinomialNB()
        pipe = make_pipeline(vect, nb)
        cross_val_score(pipe, X_train, y_train, cv=5, scoring='accuracy').mean()
        pipe.fit(X_train, y_train)
        print(pipe.predict(X_test))
        y_pred = pipe.predict(X_test)
        print(metrics.accuracy_score(y_test, y_pred))
        print(metrics.confusion_matrix(y_test, y_pred))
        pass
    pass

