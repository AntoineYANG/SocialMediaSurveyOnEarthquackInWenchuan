import numpy as np
import pandas as pd
import matplotlib as mpl
import matplotlib.pyplot as plt
from sklearn import svm
import jieba
from gensim.models import word2vec
import gensim
import logging
import os
from sklearn.metrics import accuracy_score


def cut_txt(old_file):
    global cut_file     # 分词之后保存的文件名
    cut_file = old_file.replace('.txt', '_cut.txt')
    fi = {}
    try:
        fi = open(old_file, 'r', encoding='utf-8')
        pass
    except BaseException as e:  # 因BaseException是所有错误的基类，用它可以获得所有错误类型
        print(Exception, ":", e)    # 追踪错误详细信息
        pass
    text = fi.read()  # 获取文本内容
    new_text = jieba.cut(text, cut_all=False)  # 精确模式
    str_out = ' '.join(new_text).replace('，', '').replace('。', '').replace('？', '').replace('！', '')\
        .replace('“', '').replace('”', '').replace('：', '').replace('…', '').replace('（', '')\
        .replace('）', '').replace('—', '').replace('《', '').replace('》', '').replace('、', '')\
        .replace('‘', '').replace('’', '')     # 去掉标点符号
    fo = open(cut_file, 'w', encoding='utf-8')
    fo.write(str_out)
    return


def model_train(train_file_name, save_model_file):  # model_file_name为训练语料的路径,save_model为保存模型名
    # 模型训练，生成词向量
    logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)
    sentences = word2vec.Text8Corpus(train_file_name)  # 加载语料
    model = gensim.models.Word2Vec(sentences, size=200)  # 训练skip-gram模型; 默认window=5
    model.save(save_model_file)
    model.wv.save_word2vec_format("modelsaved.bin", binary=True)   # 以二进制类型保存模型以便重用
    return


def loadModel():
    cut_txt('C4-Literature05.txt')  # 须注意文件必须先另存为utf-8编码格式
    save_model_name = '复旦大学文本分类语料训练集.model'
    if not os.path.exists(save_model_name):     # 判断文件是否存在
        model_train(cut_file, save_model_name)
        pass
    else:
        print('训练模型已存在，自动跳过训练')  # 加载已训练好的模型
        model_1 = word2vec.Word2Vec.load(save_model_name)
        pass
    print('模型加载完成')
    return


def runSVM(training_dataset_path, testing_dataset_path,
        clf=svm.SVC(C=10, kernel='rbf', gamma=10)):
    training_dataset = pd.read_csv(training_dataset_path, header=None)
    x_train, y_train = training_dataset[[0, 1]], pd.Categorical(training_dataset[2]).codes
    x, y = x_train, y_train
    testing_dataset = pd.read_csv(testing_dataset_path, header=None)
    x_test, y_test = testing_dataset[[0, 1]], pd.Categorical(testing_dataset[2]).codes
    clf.fit(x_train, y_train.ravel())
    # 准确率
    # print(clf.score(x_train, y_train))  # 精度
    print('训练集准确率：', accuracy_score(y_train, clf.predict(x_train)))
    # print(clf.score(x_test, y_test))
    print('测试集准确率：', accuracy_score(y_test, clf.predict(x_test)))

    # decision_function
    # print(x_train[:5])
    # print('decision_function:\n', clf.decision_function(x_train))
    print('\n预测结果:')
    print(clf.predict(x_test))

    # 画图
    _min = x.min() - (x.max() - x.min()) * 0.1
    _max = x.max() + (x.max() - x.min()) * 0.1
    x1_min, x2_min = _min
    x1_max, x2_max = _max
    x1, x2 = np.mgrid[x1_min:x1_max:500j, x2_min:x2_max:500j]  # 生成网格采样点
    grid_test = np.stack((x1.flat, x2.flat), axis=1)  # 测试点
    grid_hat = clf.predict(grid_test)  # 预测分类值
    grid_hat = grid_hat.reshape(x1.shape)  # 使之与输入的形状相同

    mpl.rcParams['font.sans-serif'] = ['SimHei']
    mpl.rcParams['axes.unicode_minus'] = False

    feature_name_list = ['x', 'y']
    cm_light = mpl.colors.ListedColormap(['#A0FFA0', '#FFA0A0', '#A0A0FF'])
    cm_dark = mpl.colors.ListedColormap(['g', 'r', 'b'])
    plt.figure(facecolor='w')
    plt.pcolormesh(x1, x2, grid_hat, cmap=cm_light)
    plt.scatter(x[0], x[1], c=y, edgecolors='k', s=50, cmap=cm_dark)  # 样本
    plt.scatter(x_test[0], x_test[1], s=120, facecolors='none', zorder=10)  # 圈中测试集样本
    plt.xlabel(feature_name_list[0], fontsize=13)
    plt.ylabel(feature_name_list[1], fontsize=13)
    plt.xlim(x1_min, x1_max)
    plt.ylim(x2_min, x2_max)
    plt.title('特征分类结果', fontsize=16)
    plt.grid(b=True, ls=':')
    plt.tight_layout(pad=1.5)
    plt.show()
    return


if __name__ == "__main__":
    # loadModel()
    runSVM('traindata.txt', 'testdata.txt')
    pass
