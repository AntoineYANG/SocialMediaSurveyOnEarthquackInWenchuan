# encoding=utf-8

now = 0

words = []
words_count = {}

with open("../../dataWenchuan/worddata.json", encoding='utf-8') as file:
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
            fout = open("../../dataWenchuan/wordcount.json", 'w', encoding='utf-8')
            for each in words_count:
                fout.write('"["{}",{}],"'.format(each, words_count[each]))
                now += 1
                print(now/1000000)
                pass
            pass
        pass
    finally:
        pass
    pass
