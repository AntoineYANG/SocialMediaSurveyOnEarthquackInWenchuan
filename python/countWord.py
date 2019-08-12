# encoding=utf-8

now = 0

words = []
words_count = {}

table = {}
topics = []

# fout = open("../../dataWenchuan/result2018.dat", 'w', encoding='utf-8')

for y in range(2009, 2020):
    words = []
    words_count = {}
    with open("../../dataWenchuan/topic" + str(y) + ".dat", encoding='utf-8') as file:
        # try:
        #     while True:
        #         str = file.readline()
        #         call = str.split(",")
        #         for each in call:
        #             if each.isspace() or each == "[" or each == "]":
        #                 continue
        #             # print(each)
        #             if each not in words:
        #                 words.append(each)
        #                 words_count[each] = 1
        #                 pass
        #             else:
        #                 words_count[each] += 1
        #                 pass
        #             pass
        #         for each in words_count:
        #             # if words_count[each] < 1800:
        #             #     continue
        #             # fout.write('text: "{}", freq: {};\n'.format(each, words_count[each]))
        #             now += 1
        #             # print('{},{}\t\t\t{}\n'.format(each, words_count[each], now/len(words)))
        #             print('{' + 'text: "{}", freq: {}'.format(each, words_count[each]) + '},')
        #             if now >= len(words):
        #                 # fout.close()
        #                 exit()
        #             pass
        #         pass
        #     pass
        # finally:
        #     # fout.close()
        #     pass
        # pass
        all_t = [x.replace("\n", "") for x in file.readlines() if not len(x) == 0]
        for each in all_t:
            if each not in words:
                words.append(each)
                words_count[each] = 1
                pass
            else:
                words_count[each] += 1
                pass
            pass

        # print("\n{}:\t{}".format(y, len(words_count)))
        for plc in words_count:
            if words_count[plc] < len(words_count) / 12 or words_count[plc] < 10:
                continue
            # print("[{}, {}]".format(plc, words_count[plc]))
            if plc not in topics:
                topics.append(plc)
                table[plc] = [[0, 0] for i in range(2009, 2020)]
                pass
            table[plc][y - 2009] = [words_count[plc], int(words_count[plc] * 10000 / len(words_count)) / 100]
            pass
        pass
    pass

for t in topics:
    print("{\"topic\":" + "\"{}\", \"data\":[".format(t), end='')
    for i in range(0, 11):
        print("[{},{}]".format(table[t][i][0], table[t][i][1]), end=',')
        pass
    print("]},")
    pass

