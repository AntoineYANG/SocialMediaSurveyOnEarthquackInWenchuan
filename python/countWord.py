# encoding=utf-8

now = 0

words = []
words_count = {}

fout = open("../../dataWenchuan/result2018.dat", 'w', encoding='utf-8')

with open("../../dataWenchuan/set2018.dat", encoding='utf-8') as file:
    try:
        while True:
            str = file.readline()
            call = str.split(",")
            for each in call:
                if each.isspace() or each == "[" or each == "]":
                    continue
                # print(each)
                if each not in words:
                    words.append(each)
                    words_count[each] = 1
                    pass
                else:
                    words_count[each] += 1
                    pass
                pass
            for each in words_count:
                if words_count[each] < 1800:
                    continue
                # fout.write('text: "{}", freq: {};\n'.format(each, words_count[each]))
                now += 1
                # print('{},{}\t\t\t{}\n'.format(each, words_count[each], now/len(words)))
                print('{' + 'text: "{}", freq: {}'.format(each, words_count[each]) + '},')
                if now >= len(words):
                    fout.close()
                    exit()
                pass
            pass
        pass
    finally:
        fout.close()
        pass
    pass
