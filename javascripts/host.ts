/*
 * @Author: Antoine YANG 
 * @Date: 2019-08-08 15:15:09 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2019-08-19 01:12:24
 */

/// <reference path="./visf.ts" />
declare function getCloud(year: string, limit: number): void;

// 全局变量
{
    var YEAR: number = 2009;
    var WORDLIMIT: number = 20;
    var data_province = {};
    var data_topics = [];
    var max_province: number = 0;
    var columnSet: Array<any> = [];
    var axis: Visf.Axis.Axis2d = null;
    var axis2: Visf.Axis.Axis2d = null;
    var axis3: Visf.Axis.Axis2d = null;
    var cube: Visf.Struct.Cube = null;
    var Province: Array<string> = [
        "黑龙江", "吉林", "新疆", "辽宁", "内蒙古", "北京", "天津", "河北", "宁夏", "山东", "山西", "青海", "甘肃", "陕西", "河南", "江苏",
        "西藏", "上海", "安徽", "湖北", "四川", "重庆", "浙江", "江西", "湖南", "贵州", "福建", "台湾", "云南", "广东", "广西", "海南",
        "海外", "其他", "香港", "澳门"
    ];
}

// 文件路径
{
    // 词频路径
    const URL_frequency: string = "../../dataWenchuan/";
    // 本地数据
    const URL_data: string = "../data/";
}

// 用户交互
{
    // 被改变的属性
    enum Param {
        year
    }

    $("#yearlist a").on("click", function () {
        let year: number = parseInt($(this).text());
        let changed: Array<Param> = [];
        if (year != YEAR){
            $("#selectedyear").html(year.toString());
            $("#selectedyear").append('<span class="caret" style="margin-left: 20px;"></span>');
            YEAR = year;
            changed.push(Param.year);
        }
        redraw(changed);
    });

    function redraw(changed) {
        if (changed.length == 0)
            return;
        for (let i = 0; i < changed.length; i++) {
            if (changed[i] == Param.year) {
                // 重绘地图
                drawColumn(YEAR);
                // 重绘词云
                getCloud(YEAR.toString(), WORDLIMIT);
            }
        }
    }
}

// 地图
(function loadChinaMap() {
    $('#map').append('<img src="../data/map.png">');
    $('#map img').attr('width', '735px');
    $('#map').append('<svg></svg>');
    $('#map svg').attr('id', 'map_svg').attr('xmlns', 'http://www.w3.org/2000/svg')
        .css('position', 'relative').css('top', '-498px').attr('height', '498px').attr('width', '734px');

    let board = $('#map_svg');

    columnSet = [{x: 475, y: 145, name: "黑龙江", data: null},
                {x: 460, y: 175, name: "吉林", data: null},
                {x: 130, y: 200, name: "新疆", data: null},
                {x: 440, y: 205, name: "辽宁", data: null},
                {x: 350, y: 210, name: "内蒙古", data: null},
                {x: 390, y: 222, name: "北京", data: null},
                {x: 400, y: 230, name: "天津", data: null},
                {x: 375, y: 250, name: "河北", data: null},
                {x: 300, y: 260, name: "宁夏", data: null},
                {x: 410, y: 265, name: "山东", data: null},
                {x: 356, y: 268, name: "山西", data: null},
                {x: 210, y: 285, name: "青海", data: null},
                {x: 285, y: 294, name: "甘肃", data: null},
                {x: 326, y: 300, name: "陕西", data: null},
                {x: 372, y: 300, name: "河南", data: null},
                {x: 430, y: 310, name: "江苏", data: null},
                {x: 120, y: 320, name: "西藏", data: null},
                {x: 450, y: 320, name: "上海", data: null},
                {x: 408, y: 325, name: "安徽", data: null},
                {x: 366, y: 330, name: "湖北", data: null},
                {x: 270, y: 342, name: "四川", data: null},
                {x: 312, y: 344, name: "重庆", data: null},
                {x: 435, y: 350, name: "浙江", data: null},
                {x: 400, y: 375, name: "江西", data: null},
                {x: 360, y: 380, name: "湖南", data: null},
                {x: 310, y: 385, name: "贵州", data: null},
                {x: 420, y: 390, name: "福建", data: null},
                {x: 455, y: 410, name: "台湾", data: null},
                {x: 255, y: 414, name: "云南", data: null},
                {x: 385, y: 418, name: "广东", data: null},
                {x: 330, y: 420, name: "广西", data: null},
                {x: 342, y: 470, name: "海南", data: null},
                {x: 562, y: 332, name: "海外", data: null},
                {x: 650, y: 332, name: "其他", data: null}];

    let sheme: Visf.Color.Color = new Visf.Color.Artists.Monet.Monet_bright();
    
    columnSet.forEach(e => {
        let rect: HTMLElement = jQuery.parseXML(`<rect class="map_rect"\
            style="fill: ${sheme.at(0)}; stroke: ${sheme.getOutstand()}; stroke-width: 1px; fill-opacity: 0.7;" \
            xmlns="http://www.w3.org/2000/svg" x="${e.x}" width="16" height="1" y="${e.y}" _y="${e.y}"\
            id="clm${e.name}"></rect>`).documentElement;

        board.append(rect);

        let text: HTMLElement = jQuery.parseXML(`<text class="map_value" style="fill: ${sheme.at(1)};" \
            xmlns="http://www.w3.org/2000/svg" x="${e.x + 8}" dx="0" y="${e.y - 4}" _y="${e.y - 4}"\
            id="txt${e.name}">没有数据</text>`).documentElement;

        board.append(text);

        let legend: HTMLElement = jQuery.parseXML(`<text class="map_legend" style="fill: ${sheme.at(1)};" \
            xmlns="http://www.w3.org/2000/svg" x="${e.x + 8}" dx="${e.name.toString().length * -6}" y="${e.y - 22}" _y="${e.y - 22}"\
            id="lgd${e.name}">${e.name}</text>`).documentElement;

        board.append(legend);

        let datalist: Array<Array<Number>> = [];
        for (let i: number = 2009; i < 2020; i++) {
            datalist.push([i, 0]);
        }
        e.data = datalist;
    });

    $.getJSON("../rank.json", (data) => {
        data_province = data;
        for (const p in data_province) {
            data_province[p].forEach(d => {
                for (let i: number = 0; i < columnSet.length; i++) {
                    if (d[0] == columnSet[i].name) {
                        columnSet[i].data[parseInt(p) - 2009][1] = d[1];
                    }
                }
                if (d[1] > max_province)
                    max_province = d[1];
            });
        }
        drawColumn(YEAR);
        drawPolyline();
    });

    $.getJSON("../data/topic.json", (data) => {
        data_topics = data;
        drawTopic();
    })
})()

// 地图上的柱形图
function drawColumn(year: number) {
    $('#map_svg .map_value').text('没有数据');
    data_province[year.toString()].forEach(prvc => {
        $(`#clm${prvc[0]}`)
            .attr('height', `${2 + prvc[1] / max_province * 180}px`)
            .attr('y', function () {
                return parseInt($(this).attr('_y')) - parseFloat($(this).attr('height'));
            });
        $(`#txt${prvc[0]}`)
            .attr('y', function () {
                return parseInt($(this).attr('_y')) - parseFloat($(`#clm${prvc[0]}`).attr('height'));
            })
            .attr('dx', function () {
                return -8 * prvc[1].toString().length / 2;
            })
            .text(prvc[1]);
        $(`#lgd${prvc[0]}`)
            .attr('y', function () {
                return parseInt($(this).attr('_y')) - parseFloat($(`#clm${prvc[0]}`).attr('height'));
            });
    });
}

// 时变统计
function drawPolyline() {
    $('#polyline').append('<svg></svg>');
    $('#polyline svg').attr('id', 'poly_svg').attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('height', '274px').attr('width', '500px');
    axis = new Visf.Axis.Axis2d($('#poly_svg'), new Visf.Color.Artists.Matisse.Matisse_dark());
    axis.xScale('ordinal', [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019])
        .domain_y(0, max_province * 1.2).set('margin', '0');
    axis.note(11, 'x');
    axis.note(8, 'y');
    for (let i: number = 0; i < columnSet.length; i++) {
        let list: Array<any> = columnSet[i].data;
        axis.path(list).css('stroke-width', '2px').css('opacity', 0.5);
        axis.join('circle', list);
    }
}

// 主题统计
function drawTopic() {
    $('#topiccount').append('<svg></svg>');
    $('#topiccount svg').attr('id', 'topic_svg').attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('height', '475px').attr('width', '500px');
    axis2 = new Visf.Axis.Axis2d($('#topic_svg'), new Visf.Color.Artists.Matisse.Matisse_dark());
    axis2.xScale('ordinal', [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]);
    axis2.yScale('log').domain_y(0, 100).set('margin', '0');
    axis2.note(11, 'x');
    axis2.note(5, 'y');
    let sum: Array<number> = [];
    for (let y = 2009; y < 2020; y++) {
        sum.push(0);
    }
    for (let i: number = 0; i < data_topics.length; i++) {
        for (let d: number = 0; d < 11; d++) {
            sum[d] += data_topics[i]["data"][d][0];
        }
    }
    for (let i: number = 0; i < data_topics.length; i++) {
        let list: Array< Array<number> > = [];
        for (let d: number = 0; d < 11; d++) {
            // if (data_topics[i]["data"][d][0] > 0)
                list.push([2009 + d, data_topics[i]["data"][d][0] * 100 / sum[d]]);
        }
        let path: JQuery<HTMLElement> = axis2.path(list).css('stroke-width', '2px').css('opacity', 0.3).attr('id', `path${i}`)
            .hover(() => {
                path.css('opacity', 1.0).css('stroke-width', '5px');
                $(`.${path.attr('id')}`).css('visibility', 'visible');
            })
            .mouseout(() => {
                path.css('opacity', 0.3).css('stroke-width', '2px');
                $(`.${path.attr('id')}`).css('visibility', 'hidden');
            });
        let color: string = path.css('stroke');
        let rect: JQuery<HTMLElement> = axis2.join('rect', list);
        rect.css('visibility', 'hidden').attr('class', `path${i}`)
            .css('stroke', (new Visf.Color.Artists.Matisse.Matisse_dark()).getOutstand()).css('fill', color);
        let max: number = list[0][1];
        let idx: number = 0;
        for (let s: number = 1; s < list.length; s++) {
            if (list[s][1] > max) {
                max = list[s][1];
                idx = s;
            }
        }
        let text: JQuery<HTMLElement> = axis2.addtext(data_topics[i]["topic"], 2009 + idx, list[idx][1]);
        text.attr('class', `path${i}`)
            .attr('text-anchor', 'end')
            .attr('dx', '-6px')
            .css('fill', color)
            .css('visibility', 'hidden');
    }

    $('#cube').append('<svg></svg>');
    $('#cube svg').attr('id', 'cube_svg').attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('height', '274px').attr('width', '735px');
    axis3 = new Visf.Axis.Axis2d($('#cube_svg'), new Visf.Color.Artists.Matisse.Matisse_dark());
    axis3.domain_x(2009, 2020);
    axis3.domain_y(0, 100).set('margin', '0');
    axis3.note(11, 'x');
    axis3.note(5, 'y');
    let _l: Array<object> = [];
    data_topics.forEach(t => {
        for (let i: number = 0; i < t['data'].length; i++) {
            let m: object = {value: t['topic']};
            m['time'] = 2009 + i;
            m['topic'] = t['data'][i][0] * 100 / sum[i];
            m['location'] = parseInt((Math.random() * 36).toString());
            _l.push(m);
        }
    });
    cube = new Visf.Struct.Cube(['location-o', 'time-o', 'topic-l']).add(_l);
    cube.project('location', 'topic').displayOn(axis3);
}

// 直方图 - 时间
function play_time() {
    axis2.clear();
    axis2.yScale('linear').domain_x(2009, 2020).xScale('linear');
    axis2.note(12, 'x');
    let all: number = 0;
    let list: Array< Array<number> > = [];
    let max: number = 0;
    [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019].forEach(year => {
        let sum: number = 0;
        data_province[year.toString()].forEach(prov => {
            sum += prov[1];
        });
        list.push([year, sum]);
        all += sum;
        if (sum > max)
            max = sum;
    });
    axis2.domain_y(0, parseInt((max / all * 10).toString()) / 10 + 0.1).note((parseInt((max / all * 10).toString()) / 10 + 0.1) / 0.1, 'y');
    list.forEach(e => {
        axis2.column([e[0], e[1] / all]).attr('width', 38).attr('transform', 'translate(0, 0)').css('stroke', 'none');
        axis2.addtext(e[1].toString(), e[0], e[1] / all).attr('dy', '-8');
    });
}

// 直方图 - 地区
function play_region() {
    axis2.clear();
    axis2.yScale('linear').domain_x(0, 36).xScale('linear');
    let all: number = 0;
    let list: Array< Array<number> > = [];
    let max: number = 0;
    for (let i: number = 0; i < 36; i++) {
        list.push([i, 0]);
    }
    [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019].forEach(year => {
        data_province[year.toString()].forEach(prov => {
            let idx: number = 0;
            for (; idx < 36; idx++) {
                if (Province[idx] == prov[0]) {
                    list[idx][1] += prov[1];
                    all += prov[1];
                    break;
                }
            }
        });
    });
    list.forEach(d => {
        if (d[1] > max)
            max = d[1];
    });
    axis2.domain_y(0, parseInt((max / all * 100).toString()) / 100 + 0.01)
        .note((parseInt((max / all * 100).toString()) / 100 + 0.01) / 0.01, 'y');
    axis2.note(36, 'x').text(function (i) {
        return Province[i];
    })
    .attr('font-size', '9.5')
    .attr('text-anchor', 'start')
    .attr('rotate', '90')
    .css('writing-mode', 'tb')
    .css('letter-spacing', '5px')
    .attr('transform', 'translate(10, -8)');
    list.forEach(e => {
        axis2.column([e[0], e[1] / all]).attr('width', 11.4).attr('transform', 'translate(0, 0)').css('stroke', 'none');
    });
    list.forEach(e => {
        axis2.addtext(e[1].toString(), e[0], e[1] / all).attr('dy', '-6').attr('font-size', '10');
    });
}