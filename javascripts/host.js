/*
 * @Author: Antoine YANG
 * @Date: 2019-08-08 15:15:09
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2019-08-28 14:45:52
 */
/// <reference path="./visf.ts" />
// 全局变量
{
    var YEAR = 2009;
    var THEME = "热点话题";
    var PROJ = 'space_topic';
    var WORDLIMIT = 20;
    var data_province = {};
    var data_topics = [];
    var max_province = 0;
    var columnSet = [];
    var axis = null;
    var axis2 = null;
    var axis3 = null;
    var cube = null;
    var Province = [
        "黑龙江", "吉林", "新疆", "辽宁", "内蒙古", "北京", "天津", "河北", "宁夏", "山东", "山西", "青海", "甘肃", "陕西", "河南", "江苏",
        "西藏", "上海", "安徽", "湖北", "四川", "重庆", "浙江", "江西", "湖南", "贵州", "福建", "台湾", "云南", "广东", "广西", "海南",
        "海外", "其他", "香港", "澳门"
    ];
}
// 文件路径
{
    // 词频路径
    var URL_frequency = "../../dataWenchuan/";
    // 本地数据
    var URL_data = "../data/";
}
// 用户交互
{
    // 被改变的属性
    var Param = void 0;
    (function (Param) {
        Param[Param["year"] = 0] = "year";
        Param[Param["theme"] = 1] = "theme";
        Param[Param["proj"] = 2] = "proj";
    })(Param || (Param = {}));
    $("#yearlist a").on("click", function () {
        var year = parseInt($(this).text());
        var changed = [];
        if (year != YEAR) {
            $("#selectedyear").html(year.toString());
            $("#selectedyear").append('<span class="caret" style="margin-left: 20px;"></span>');
            YEAR = year;
            changed.push(Param.year);
        }
        redraw(changed);
    });
    $("#actlist a").on("click", function () {
        var theme = $(this).text();
        var changed = [];
        if (theme != THEME) {
            $("#selectedact").html(theme);
            THEME = theme;
            changed.push(Param.theme);
        }
        redraw(changed);
    });
    $('.proj').on('click', function () {
        var proj = $(this).val().toString();
        $('input.slice').val('');
        var changed = [];
        if (proj != PROJ) {
            PROJ = proj;
            changed.push(Param.proj);
        }
        redraw(changed);
    });
    $('input.slice').on('click', function () {
        $('input.slice').val('');
    });
    $('#slice').on('click', function () {
        $('.proj').prop('checked', false);
        var p = {};
        switch (false) {
            case $('input.slice').eq(0).val().toString() === "":
                p = { time: parseInt($('input.slice').eq(0).val().toString()) };
                break;
            case $('input.slice').eq(1).val().toString() === "":
                var idx = -1;
                for (var i = 0; i < Province.length; i++) {
                    if ($('input.slice').eq(1).val().toString() == Province[i]) {
                        idx = i;
                        break;
                    }
                }
                if (idx === -1) {
                    idx = parseInt($('input.slice').eq(1).val().toString());
                }
                p = { location: idx };
                break;
            case $('input.slice').eq(2).val().toString() === "":
                p = { topic: parseInt($('input.slice').eq(2).val().toString()) };
                break;
        }
        PROJ = "";
        cube_slice(p);
    });
    function redraw(changed) {
        if (changed.length === 0)
            return;
        for (var i = 0; i < changed.length; i++) {
            if (changed[i] === Param.year) {
                // 重绘地图
                // drawColumn(YEAR);
                updateMap(data_province[YEAR.toString()], YEAR);
                // 重绘词云
                getCloud(YEAR.toString(), WORDLIMIT);
            }
            else if (changed[i] === Param.theme) {
                switch (THEME) {
                    case "热点话题":
                        play_theme();
                        break;
                    case "时间分布":
                        play_time();
                        break;
                    case "地理分布":
                        play_region();
                        break;
                }
            }
            else if (changed[i] === Param.proj) {
                var c = PROJ.split('-');
                cube_proj(c[0], c[1]);
            }
        }
    }
}
// 地图
(function loadChinaMap() {
    // $('#map').append('<img src="../data/map.png">');
    // $('#map img').attr('width', '735px');
    // $('#map').append('<svg></svg>');
    // $('#map svg').attr('id', 'map_svg').attr('xmlns', 'http://www.w3.org/2000/svg')
    //     .css('position', 'relative').css('top', '-498px').attr('height', '498px').attr('width', '734px');
    // let board = $('#map_svg');
    columnSet = [{ x: 475, y: 145, name: "黑龙江", data: null },
        { x: 460, y: 175, name: "吉林", data: null },
        { x: 130, y: 200, name: "新疆", data: null },
        { x: 440, y: 205, name: "辽宁", data: null },
        { x: 350, y: 210, name: "内蒙古", data: null },
        { x: 390, y: 222, name: "北京", data: null },
        { x: 400, y: 230, name: "天津", data: null },
        { x: 375, y: 250, name: "河北", data: null },
        { x: 300, y: 260, name: "宁夏", data: null },
        { x: 410, y: 265, name: "山东", data: null },
        { x: 356, y: 268, name: "山西", data: null },
        { x: 210, y: 285, name: "青海", data: null },
        { x: 285, y: 294, name: "甘肃", data: null },
        { x: 326, y: 300, name: "陕西", data: null },
        { x: 372, y: 300, name: "河南", data: null },
        { x: 430, y: 310, name: "江苏", data: null },
        { x: 120, y: 320, name: "西藏", data: null },
        { x: 450, y: 320, name: "上海", data: null },
        { x: 408, y: 325, name: "安徽", data: null },
        { x: 366, y: 330, name: "湖北", data: null },
        { x: 270, y: 342, name: "四川", data: null },
        { x: 312, y: 344, name: "重庆", data: null },
        { x: 435, y: 350, name: "浙江", data: null },
        { x: 400, y: 375, name: "江西", data: null },
        { x: 360, y: 380, name: "湖南", data: null },
        { x: 310, y: 385, name: "贵州", data: null },
        { x: 420, y: 390, name: "福建", data: null },
        { x: 455, y: 410, name: "台湾", data: null },
        { x: 255, y: 414, name: "云南", data: null },
        { x: 385, y: 418, name: "广东", data: null },
        { x: 330, y: 420, name: "广西", data: null },
        { x: 342, y: 470, name: "海南", data: null },
        { x: 562, y: 332, name: "海外", data: null },
        { x: 650, y: 332, name: "其他", data: null }];
    var sheme = new Visf.Color.Artists.Monet.Monet_bright();
    columnSet.forEach(function (e) {
        // let rect: HTMLElement = jQuery.parseXML(`<rect class="map_rect"\
        //     style="fill: ${sheme.at(0)}; stroke: ${sheme.getOutstand()}; stroke-width: 1px; fill-opacity: 0.7;" \
        //     xmlns="http://www.w3.org/2000/svg" x="${e.x}" width="16" height="1" y="${e.y}" _y="${e.y}"\
        //     id="clm${e.name}"></rect>`).documentElement;
        // board.append(rect);
        // let text: HTMLElement = jQuery.parseXML(`<text class="map_value" style="fill: ${sheme.at(1)};" \
        //     xmlns="http://www.w3.org/2000/svg" x="${e.x + 8}" dx="0" y="${e.y - 4}" _y="${e.y - 4}"\
        //     id="txt${e.name}">没有数据</text>`).documentElement;
        // board.append(text);
        // let legend: HTMLElement = jQuery.parseXML(`<text class="map_legend" style="fill: ${sheme.at(1)};" \
        //     xmlns="http://www.w3.org/2000/svg" x="${e.x + 8}" dx="${e.name.toString().length * -6}" y="${e.y - 22}" _y="${e.y - 22}"\
        //     id="lgd${e.name}">${e.name}</text>`).documentElement;
        // board.append(legend);
        var datalist = [];
        for (var i = 2009; i < 2020; i++) {
            datalist.push([i, 0]);
        }
        e.data = datalist;
    });
    $.getJSON("../rank.json", function (data) {
        data_province = data;
        var _loop_1 = function (p) {
            data_province[p].forEach(function (d) {
                for (var i = 0; i < columnSet.length; i++) {
                    if (d[0] == columnSet[i].name) {
                        columnSet[i].data[parseInt(p) - 2009][1] = d[1];
                    }
                }
                if (d[1] > max_province)
                    max_province = d[1];
            });
        };
        for (var p in data_province) {
            _loop_1(p);
        }
        // drawColumn(YEAR);
        updateMap(data_province[YEAR.toString()], YEAR);
        drawPolyline();
    });
    $.getJSON("../data/topic.json", function (data) {
        data_topics = data;
        drawTopic();
    });
})();
// 地图上的柱形图
function drawColumn(year) {
    $('#map_svg .map_value').text('没有数据');
    data_province[year.toString()].forEach(function (prvc) {
        $("#clm" + prvc[0])
            .attr('height', 2 + prvc[1] / max_province * 180 + "px")
            .attr('y', function () {
            return parseInt($(this).attr('_y')) - parseFloat($(this).attr('height'));
        });
        $("#txt" + prvc[0])
            .attr('y', function () {
            return parseInt($(this).attr('_y')) - parseFloat($("#clm" + prvc[0]).attr('height'));
        })
            .attr('dx', function () {
            return -8 * prvc[1].toString().length / 2;
        })
            .text(prvc[1]);
        $("#lgd" + prvc[0])
            .attr('y', function () {
            return parseInt($(this).attr('_y')) - parseFloat($("#clm" + prvc[0]).attr('height'));
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
    for (var i = 0; i < columnSet.length; i++) {
        var list = columnSet[i].data;
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
    play_theme();
    var sum = [];
    for (var y = 2009; y < 2020; y++) {
        sum.push(0);
    }
    for (var i = 0; i < data_topics.length; i++) {
        for (var d = 0; d < 11; d++) {
            sum[d] += data_topics[i]["data"][d][0];
        }
    }
    $('#cube').append('<svg></svg>');
    $('#cube svg').attr('id', 'cube_svg').attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('height', '274px').attr('width', '735px');
    axis3 = new Visf.Axis.Axis2d($('#cube_svg'), new Visf.Color.Artists.Matisse.Matisse_dark());
    axis3.domain_x(2009, 2020);
    axis3.domain_y(0, 100).set('margin', '0');
    var _l = [];
    data_topics.forEach(function (t) {
        for (var i = 0; i < t['data'].length; i++) {
            var m = { value: t['topic'] };
            m['time'] = 2009 + i;
            m['topic'] = t['data'][i][0] * 100 / sum[i];
            m['location'] = parseInt((Math.random() * 36).toString());
            _l.push(m);
        }
    });
    cube = new Visf.Struct.Cube(['location-o', 'time-o', 'topic-l']).add(_l);
    $('.proj').eq(1).prop("checked", true).click();
    $('input.slice').val('');
}
// 折线图 - 话题
function play_theme() {
    axis2.xScale('ordinal', [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]);
    axis2.yScale('log').domain_y(0, 100).set('margin', '0');
    axis2.note(11, 'x');
    axis2.note(5, 'y');
    var sum = [];
    for (var y = 2009; y < 2020; y++) {
        sum.push(0);
    }
    for (var i = 0; i < data_topics.length; i++) {
        for (var d = 0; d < 11; d++) {
            sum[d] += data_topics[i]["data"][d][0];
        }
    }
    var _loop_2 = function (i) {
        var list = [];
        for (var d = 0; d < 11; d++) {
            // if (data_topics[i]["data"][d][0] > 0)
            list.push([2009 + d, data_topics[i]["data"][d][0] * 100 / sum[d]]);
        }
        var path = axis2.path(list).css('stroke-width', '2px').css('opacity', 0.3).attr('id', "path" + i)
            .hover(function () {
            path.css('opacity', 1.0).css('stroke-width', '5px');
            $("." + path.attr('id')).css('visibility', 'visible');
        })
            .mouseout(function () {
            path.css('opacity', 0.3).css('stroke-width', '2px');
            $("." + path.attr('id')).css('visibility', 'hidden');
        });
        var color = path.css('stroke');
        var rect = axis2.join('rect', list);
        rect.css('visibility', 'hidden').attr('class', "path" + i)
            .css('stroke', (new Visf.Color.Artists.Matisse.Matisse_dark()).getOutstand()).css('fill', color);
        var max = list[0][1];
        var idx = 0;
        for (var s = 1; s < list.length; s++) {
            if (list[s][1] > max) {
                max = list[s][1];
                idx = s;
            }
        }
        var text = axis2.addtext(data_topics[i]["topic"], 2009 + idx, list[idx][1]);
        text.attr('class', "path" + i)
            .attr('text-anchor', 'end')
            .attr('dx', '-6px')
            .css('fill', color)
            .css('visibility', 'hidden');
    };
    for (var i = 0; i < data_topics.length; i++) {
        _loop_2(i);
    }
}
// 直方图 - 时间
function play_time() {
    axis2.clear();
    axis2.handle('hard').yScale('linear').domain_x(2009, 2020).xScale('linear');
    axis2.note(12, 'x');
    var all = 0;
    var list = [];
    var max = 0;
    [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019].forEach(function (year) {
        var sum = 0;
        data_province[year.toString()].forEach(function (prov) {
            sum += prov[1];
        });
        list.push([year, sum]);
        all += sum;
        if (sum > max)
            max = sum;
    });
    axis2.domain_y(0, parseInt((max / all * 10).toString()) / 10 + 0.1).note((parseInt((max / all * 10).toString()) / 10 + 0.1) / 0.1, 'y');
    list.forEach(function (e) {
        axis2.column([e[0], e[1] / all]).attr('width', 38).attr('transform', 'translate(0, 0)').css('stroke', 'none');
        axis2.addtext(e[1].toString(), e[0], e[1] / all).attr('dy', '-8');
    });
}
// 直方图 - 地区
function play_region() {
    axis2.clear();
    axis2.yScale('linear').domain_x(0, 36).xScale('linear');
    var all = 0;
    var list = [];
    var max = 0;
    for (var i = 0; i < 36; i++) {
        list.push([i, 0]);
    }
    [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019].forEach(function (year) {
        data_province[year.toString()].forEach(function (prov) {
            var idx = 0;
            for (; idx < 36; idx++) {
                if (Province[idx] == prov[0]) {
                    list[idx][1] += prov[1];
                    all += prov[1];
                    break;
                }
            }
        });
    });
    list.forEach(function (d) {
        if (d[1] > max)
            max = d[1];
    });
    axis2.domain_y(0, parseInt((max / all * 100).toString()) / 100 + 0.01)
        .note((parseInt((max / all * 100).toString()) / 100 + 0.01) / 0.01, 'y');
    axis2.note(36, 'x')
        .text(function (i) {
        return Province[i];
    })
        .attr('font-size', '9.5')
        .attr('text-anchor', 'start')
        .attr('rotate', '90')
        .css('writing-mode', 'tb')
        .css('letter-spacing', '5px')
        .attr('transform', 'translate(10, -8)');
    list.forEach(function (e) {
        axis2.column([e[0], e[1] / all]).attr('width', 11.4).attr('transform', 'translate(0, 0)').css('stroke', 'none');
    });
    list.forEach(function (e) {
        axis2.addtext(e[1].toString(), e[0], e[1] / all).attr('dy', '-6').attr('font-size', '10');
    });
}
// cube 投影
function cube_proj(d1, d2) {
    axis3.clear();
    if (d1 === 'topic' || d2 === 'topic') {
        axis3.yScale('linear').domain_y(0, 100).note(10, 'y');
    }
    else {
        axis3.yScale('ordinal', [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]);
    }
    cube.project(d1, d2).displayOn(axis3);
    if (d1 === 'location' || d2 === 'location') {
        axis3.note(36, 'x')
            .text(function (i) {
            return Province[i];
        })
            .attr('font-size', '12')
            .attr('text-anchor', 'start')
            .attr('rotate', '90')
            .css('writing-mode', 'tb')
            .css('letter-spacing', '5px')
            .attr('transform', 'translate(5, -6)');
        if (d1 === 'time' && d2 === 'location' || d1 === 'location' && d2 === 'time') {
            axis3.note(11, 'y');
        }
    }
}
// cube 切片
function cube_slice(p) {
    axis3.clear();
    for (var key in p) {
        if (p.hasOwnProperty(key)) {
            switch (key.toString()) {
                case 'topic':
                    axis3.yScale('ordinal', [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]);
                    cube.slice(p).displayOn(axis3);
                    axis3.note(36, 'x')
                        .text(function (i) {
                        return Province[i];
                    })
                        .attr('font-size', '12')
                        .attr('text-anchor', 'start')
                        .attr('rotate', '90')
                        .css('writing-mode', 'tb')
                        .css('letter-spacing', '5px')
                        .attr('transform', 'translate(5, -6)');
                    axis3.note(11, 'y');
                    return;
                case 'location':
                    axis3.yScale('linear').domain_y(0, 100).note(10, 'y');
                    axis3.xScale('ordinal', [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]);
                    cube.slice(p).displayOn(axis3);
                    axis3.domain_y(0, 100).note(10, 'y');
                    axis3.note(11, 'x');
                    return;
                case 'time':
                    axis3.yScale('linear').domain_y(0, 100).note(10, 'y');
                    cube.slice(p).displayOn(axis3);
                    axis3.domain_y(0, 100).note(10, 'y');
                    axis3.note(36, 'x')
                        .text(function (i) {
                        return Province[i];
                    })
                        .attr('font-size', '12')
                        .attr('text-anchor', 'start')
                        .attr('rotate', '90')
                        .css('writing-mode', 'tb')
                        .css('letter-spacing', '5px')
                        .attr('transform', 'translate(5, -6)');
                    return;
            }
        }
    }
}
