const color = d3.scale.category10();

const width = parseInt(d3.select("#word_cloud").style("width"));
const height = parseInt(d3.select("#word_cloud").style("height"));

d3.select("#word_cloud").append("svg")
    .style("width", "inherit")
    .style("height", "inherit")
    .attr("viewBox", () => {
        return "0 0 " + width + " " + height;
    })
    .attr("style", "border: 1px solid black")
    .attr("preserveAspectRatio", "xMaxYMax meet")
    .attr("class", "wordcloud")
    .append("g")
    .attr("id", "cloud_g")
    .attr("transform", "translate(" + (parseInt(d3.select("#word_cloud").style("width"))) / 2.2 +
        "," + parseInt(d3.select("#word_cloud").style("height")) / 2.2 + ")");

// 数据
{
    var frequency_list = {
        all: [{text: "地震", freq: 1001945},
            {text: "5.12", freq: 97661},
            {text: "雅安", freq: 89001},
            {text: "中国", freq: 82086},
            {text: "四川", freq: 79536},
            {text: "汶川", freq: 719963},
            {text: "生命", freq: 68040},
            {text: "捐款", freq: 66400},
            {text: "逝者", freq: 52625},
            {text: "灾区", freq: 50951},
            {text: "捐款", freq: 50155},
            {text: "记得", freq: 47872},
            {text: "坚强", freq: 47425},
            {text: "灾难", freq: 44946},
            {text: "周年", freq: 43944},
            {text: "愿", freq: 42651},
            {text: "希望", freq: 42226},
            {text: "加油", freq: 36486},
            {text: "救援", freq: 33789},
            {text: "安息", freq: 33536},
            {text: "国家", freq: 34843},
            {text: "孩子", freq: 33876},
            {text: "成都", freq: 32748},
            {text: "祝福", freq: 32454},
            {text: "爱", freq: 32124},
            {text: "日本", freq: 32080},
            {text: "新闻", freq: 30633},
            {text: "重建", freq: 29538},
            {text: "政府", freq: 28657},
            {text: "同胞", freq: 28108}],
        "2009": [{text: "地震", freq: 836},
            {text: "汶川", freq: 681},
            {text: "中国", freq: 71},
            {text: "四川", freq: 67},
            {text: "毕业", freq: 44},
            {text: "余震", freq: 43},
            {text: "那年", freq: 41},
            {text: "去年", freq: 39},
            {text: "成都", freq: 35},
            {text: "感觉", freq: 33},
            {text: "希望", freq: 33},
            {text: "震感", freq: 31},
            {text: "孩子", freq: 30},
            {text: "灾难", freq: 28},
            {text: "义丐", freq: 27},
            {text: "生命", freq: 26},
            {text: "记者", freq: 26},
            {text: "2009", freq: 26},
            {text: "新闻", freq: 25},
            {text: "非典", freq: 25},
            {text: "一年", freq: 24},
            {text: "2012", freq: 24},
            {text: "真的", freq: 23},
            {text: "生活", freq: 23},
            {text: "昨天", freq: 22},
            {text: "台湾", freq: 21},
            {text: "南方", freq: 20},
            {text: "灾区", freq: 20}],
        "2010": [{text: "地震", freq: 21618},
            {text: "汶川", freq: 14295},
            {text: "512", freq: 3246},
            {text: "中国", freq: 1943},
            {text: "捐款", freq: 1380},
            {text: "智利", freq: 1124},
            {text: "灾区", freq: 1119},
            {text: "海地", freq: 1066},
            {text: "四川", freq: 1062},
            {text: "灾难", freq: 945},
            {text: "希望", freq: 888},
            {text: "重建", freq: 723},
            {text: "时间", freq: 635},
            {text: "生命", freq: 628},
            {text: "2008", freq: 612},
            {text: "孩子", freq: 572},
            {text: "报道", freq: 536},
            {text: "新闻", freq: 526},
            {text: "真相", freq: 504},
            {text: "经历", freq: 459},
            {text: "生活", freq: 441},
            {text: "钱", freq: 440},
            {text: "感动", freq: 431},
            {text: "学校", freq: 420},
            {text: "地球", freq: 411}],
        "2011": [{text: "地震", freq: 94813},
            {text: "汶川", freq: 75940},
            {text: "日本", freq: 19609},
            {text: "5.12", freq: 15030},
            {text: "中国", freq: 13794},
            {text: "三周年", freq: 13736},
            {text: "三年", freq: 6813},
            {text: "你好", freq: 6265},
            {text: "捐款", freq: 5984},
            {text: "参与", freq: 5328},
            {text: "送祝福", freq: 5301},
            {text: "四川", freq: 5134},
            {text: "地址", freq: 5118},
            {text: "灾区", freq: 5102},
            {text: "灾难", freq: 4490},
            {text: "生命", freq: 4238},
            {text: "2008", freq: 3783},
            {text: "希望", freq: 3506},
            {text: "孩子", freq: 3497},
            {text: "国家", freq: 3359},
            {text: "重建", freq: 3270},
            {text: "祝福", freq: 3217},
            {text: "坚强", freq: 3084},
            {text: "纪念", freq: 2968},
            {text: "钱", freq: 2903},
            {text: "生活", freq: 2870},
            {text: "成都", freq: 2817},
            {text: "感动", freq: 2612},
            {text: "永远", freq: 2437},
            {text: "世界", freq: 2432}],
        "2012": [{text: "地震", freq: 113352},
            {text: "汶川", freq: 92956},
            {text: "5.12", freq: 22992},
            {text: "四周年", freq: 22308},
            {text: "四年", freq: 13342},
            {text: "中国", freq: 8341},
            {text: "捐款", freq: 7961},
            {text: "四川", freq: 7842},
            {text: "安息", freq: 7026},
            {text: "逝者", freq: 6623},
            {text: "愿", freq: 6214},
            {text: "重建", freq: 5196},
            {text: "生命", freq: 4755},
            {text: "纪念", freq: 4394},
            {text: "灾区", freq: 3964},
            {text: "希望", freq: 3924},
            {text: "坚强", freq: 3903},
            {text: "灾难", freq: 3663},
            {text: "纪念日", freq: 3644},
            {text: "灾后", freq: 3584},
            {text: "成都", freq: 3544},
            {text: "同胞", freq: 3543},
            {text: "孩子", freq: 3077},
            {text: "默哀", freq: 3049},
            {text: "爱心", freq: 3034},
            {text: "学校", freq: 2916},
            {text: "募捐箱", freq: 2867},
            {text: "爱", freq: 2665},
            {text: "遇难", freq: 2623},
            {text: "母亲", freq: 2620}],
        "2013": [{text: "地震", freq: 370819},
            {text: "汶川", freq: 224302},
            {text: "雅安", freq: 84501},
            {text: "捐款", freq: 35284},
            {text: "四川", freq: 33952},
            {text: "政府", freq: 23136},
            {text: "芦山", freq: 22667},
            {text: "512", freq: 21344},
            {text: "捐", freq: 20011},
            {text: "灾区", freq: 19387},
            {text: "中国", freq: 18750},
            {text: "生命", freq: 16454},
            {text: "母亲节", freq: 15621},
            {text: "五年", freq: 15349},
            {text: "五周年", freq: 14178},
            {text: "灾难", freq: 12877},
            {text: "唐山", freq: 12377},
            {text: "诺基亚", freq: 12354},
            {text: "救援", freq: 12202},
            {text: "国家", freq: 11888},
            {text: "希望", freq: 11839},
            {text: "2008", freq: 11601},
            {text: "重建", freq: 11593},
            {text: "成都", freq: 11337},
            {text: "余震", freq: 11133},
            {text: "加油", freq: 10692},
            {text: "母亲", freq: 10426},
            {text: "祈福", freq: 9755},
            {text: "坚强", freq: 9579},
            {text: "爱心", freq: 9122}],
        "2014": [{text: "地震", freq: 122689},
            {text: "汶川", freq: 91053},
            {text: "周年", freq: 13866},
            {text: "武汉", freq: 11508},
            {text: "雅安", freq: 11031},
            {text: "六周年", freq: 10917},
            {text: "2025", freq: 10766},
            {text: "芦山", freq: 9331},
            {text: "2008", freq: 8779},
            {text: "捐款", freq: 8365},
            {text: "5.12", freq: 8334},
            {text: "灾区", freq: 8217},
            {text: "汉源县", freq: 7993},
            {text: "云南", freq: 7833},
            {text: "四川", freq: 7392},
            {text: "援建", freq: 7021},
            {text: "中国", freq: 6705},
            {text: "成都", freq: 6374},
            {text: "捐赠", freq: 5755},
            {text: "孤儿", freq: 5348},
            {text: "打工", freq: 5227},
            {text: "日本", freq: 5190},
            {text: "暑期", freq: 5181},
            {text: "能量", freq: 5108},
            {text: "公益", freq: 5005},
            {text: "专家", freq: 4735},
            {text: "2014", freq: 4725},
            {text: "影响", freq: 4673},
            {text: "白血病", freq: 4408},
            {text: "南宁", freq: 4349}],
        "2015": [],
        "2016": [],
        "2017": [],
        "2018": [],
        "2019": [{text: "地震", freq: 2961},
            {text: "汶川", freq: 2405},
            {text: "乞讨", freq: 1118},
            {text: "贴膜", freq: 916},
            {text: "父亲", freq: 874},
            {text: "南阳", freq: 805},
            {text: "2008", freq: 680},
            {text: "孩子", freq: 662},
            {text: "朋友", freq: 558},
            {text: "母亲", freq: 518},
            {text: "隔离", freq: 518},
            {text: "灾区", freq: 466},
            {text: "河南", freq: 390},
            {text: "映秀", freq: 390},
            {text: "好人", freq: 388},
            {text: "捐给", freq: 379},
            {text: "吵架", freq: 377},
            {text: "残疾", freq: 376},
            {text: "白天", freq: 375},
            {text: "瘫痪", freq: 374},
            {text: "三轮车", freq: 372},
            {text: "永远", freq: 305},
            {text: "乌龟", freq: 301},
            {text: "妻子", freq: 297},
            {text: "世界", freq: 294},
            {text: "妈妈", freq: 288},
            {text: "时间", freq: 287},
            {text: "老师", freq: 276},
            {text: "人生", freq: 260},
            {text: "中国", freq: 255},
            {text: "十年", freq: 249},
            {text: "感动", freq: 248},
            {text: "中心", freq: 228},
            {text: "生活", freq: 225},
            {text: "微博", freq: 221},
            {text: "庆幸", freq: 213},
            {text: "四川", freq: 211},
            {text: "记得", freq: 203},
            {text: "发动", freq: 203}]
    }
}

// 词云
function getCloud(source, limit) {
    // 清空画板
    d3.select("#cloud_g")
        .selectAll("text")
        .remove();
    // 获得数据
    let data = [];
    for (let i = 0; i < frequency_list[source].length && i < limit; i++)
        data.push(frequency_list[source][i]);

    // 规划大小
    let max = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i].freq > max)
            max = data[i].freq;
    }
    for (let i = 0; i < data.length; i++) {
        data[i].size = 80 * Math.log(data[i].freq / max + 1) + 20;
    }

    d3.layout.cloud()
        .size([width, height])
        .words(data)
        .rotate(0)
        .fontSize(function (d) {
            return d.size;
        })
        .on("end", draw)
        .start();

    function draw(words) {
        let extent = [[data[0].x, data[0].x], [data[0].y, data[0].y]];
        for (let i = 1; i < data.length; i++) {
            if (data[i].x < extent[0][0])
                extent[0][0] = data[i].x;
            if (data[i].x > extent[0][1])
                extent[0][1] = data[i].x;
            if (data[i].y < extent[1][0])
                extent[1][0] = data[i].y;
            if (data[i].y > extent[1][1])
                extent[1][1] = data[i].y;
        }

        d3.select("#cloud_g")
            .selectAll("text")
            .data(words)
            .enter()
            .append("text")
            .style("font-size", function (d) {
                return d.size + "px";
            })
            .style("fill", function (d, i) {
                return color(i);
            })
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) {
                return d.text;
            });
    }
}

getCloud("2009", 20);