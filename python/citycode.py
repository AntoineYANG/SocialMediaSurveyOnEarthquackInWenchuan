#!/usr/bin/env python3

code = {"安徽": 34,
        "北京": 11,
        "重庆": 50,
        "福建": 35,
        "甘肃": 62,
        "广东": 44,
        "广西": 45,
        "贵州": 52,
        "海南": 46,
        "河北": 13,
        "黑龙江": 23,
        "河南": 41,
        "湖北": 42,
        "湖南": 43,
        "内蒙古": 15,
        "江苏": 32,
        "江西": 36,
        "吉林": 22,
        "辽宁": 21,
        "宁夏": 64,
        "青海": 63,
        "山西": 14,
        "山东": 37,
        "上海": 31,
        "四川": 51,
        "天津": 12,
        "西藏": 54,
        "新疆": 65,
        "云南": 53,
        "浙江": 33,
        "陕西": 61,
        "台湾": 71,
        "香港": 81,
        "澳门": 82,
        "海外": 400,
        "其他": 100
        }

if __name__ == '__main__':
    for year in range(2009, 2020):
        content = []
        with open("../data/read/read{}.dat".format(year), mode='r', encoding='utf-8') as file:
            content = file.readlines()
            pass
        with open("../data/read/f{}.dat".format(year), mode='w', encoding='utf-8') as file:
            for line in content:
                parts = line.replace('\n', '').split(',')
                parts[2] = code[parts[2]]
                p = ",".join(parts)
                print(p)
                file.write(p)
                pass
            pass
        pass
    pass
