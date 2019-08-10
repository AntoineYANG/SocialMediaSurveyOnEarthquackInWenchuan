/*
 * @Author: Antoine YANG
 * @Date: 2019-08-08 15:15:09
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2019-08-10 21:43:01
 */
/// <reference path="./visf.ts" />
// 全局变量
{
    var YEAR = 2009;
    var WORDLIMIT = 20;
    var data_province = {};
    var max_province = 0;
    var columnSet = [];
    var axis = null;
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
    function redraw(changed) {
        if (changed.length == 0)
            return;
        for (var i = 0; i < changed.length; i++) {
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
    var board = $('#map_svg');
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
        var rect = jQuery.parseXML("<rect class=\"map_rect\"            style=\"fill: " + sheme.at(0) + "; stroke: " + sheme.getOutstand() + "; stroke-width: 1px; fill-opacity: 0.7;\"             xmlns=\"http://www.w3.org/2000/svg\" x=\"" + e.x + "\" width=\"16\" height=\"1\" y=\"" + e.y + "\" _y=\"" + e.y + "\"            id=\"clm" + e.name + "\"></rect>").documentElement;
        board.append(rect);
        var text = jQuery.parseXML("<text class=\"map_value\" style=\"fill: " + sheme.at(1) + ";\"             xmlns=\"http://www.w3.org/2000/svg\" x=\"" + (e.x + 8) + "\" dx=\"0\" y=\"" + (e.y - 4) + "\" _y=\"" + (e.y - 4) + "\"            id=\"txt" + e.name + "\">\u6CA1\u6709\u6570\u636E</text>").documentElement;
        board.append(text);
        var legend = jQuery.parseXML("<text class=\"map_legend\" style=\"fill: " + sheme.at(1) + ";\"             xmlns=\"http://www.w3.org/2000/svg\" x=\"" + (e.x + 8) + "\" dx=\"" + e.name.toString().length * -6 + "\" y=\"" + (e.y - 22) + "\" _y=\"" + (e.y - 22) + "\"            id=\"lgd" + e.name + "\">" + e.name + "</text>").documentElement;
        board.append(legend);
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
        drawColumn(YEAR);
        drawPolyline();
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
        .attr('height', '475px').attr('width', '500px');
    axis = new Visf.Axis.Axis2d($('#poly_svg'), new Visf.Color.Artists.Monet.Monet_bright());
    axis.xScale('ordinal').among_x([2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019])
        .domain_y(0, max_province * 1.2).set('margin', '0');
    axis.note(11, 'x');
    axis.note(8, 'y');
    for (var i = 0; i < columnSet.length; i++) {
        var list = columnSet[i].data;
        axis.path(list).css('stroke-width', '2px').css('opacity', 0.5);
        axis.join('circle', list);
    }
}
