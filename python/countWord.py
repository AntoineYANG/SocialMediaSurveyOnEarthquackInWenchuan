# encoding=utf-8

now = 0

words = []
words_count = {}

with open("../../dataWenchuan/set2019.dat", encoding='utf-8') as file:
    try:
        while True:
            str = file.readline()
            call = str.split(",")
            for each in call:
                each = each.replace("\"", "", 10)
                if each.isspace() or each == "[" or each == "]":
                    continue
                print(each)
                if each not in words:
                    words.append(each)
                    words_count[each] = 1
                    pass
                else:
                    words_count[each] += 1
                    pass
                pass
            fout = open("../../dataWenchuan/result2019.dat", 'w', encoding='utf-8')
            for each in words_count:
                if words_count[each] < 1000:
                    continue
                fout.write('{},{}\n'.format(each, words_count[each]))
                now += 1
                print('{},{}\t\t\t{}\n'.format(each, words_count[each], now/len(words)))
                pass
            pass
        pass
    finally:
        pass
    pass
