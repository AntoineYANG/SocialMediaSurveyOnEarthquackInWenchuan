// 全局变量
{
    var YEAR = 2009;
    var WORDLIMIT = 20;
    var data_province = {};
    var max_province = 0;
    var columnSet = [];
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
    $('#map img').attr('height', '498px');
    $('#map').append('<svg></svg>');
    $('#map svg').attr('id', 'map_svg').attr('xmlns', 'http://www.w3.org/2000/svg')
        .css('position', 'relative').css('top', '-498px').attr('height', '498px').attr('width', '734px');
    var board = $('#map_svg');
    columnSet = [{ x: 475, y: 145, name: "黑龙江" },
        { x: 460, y: 175, name: "吉林" },
        { x: 130, y: 200, name: "新疆" },
        { x: 440, y: 205, name: "辽宁" },
        { x: 350, y: 210, name: "内蒙古" },
        { x: 390, y: 222, name: "北京" },
        { x: 400, y: 230, name: "天津" },
        { x: 375, y: 250, name: "河北" },
        { x: 300, y: 260, name: "宁夏" },
        { x: 410, y: 265, name: "山东" },
        { x: 356, y: 268, name: "山西" },
        { x: 210, y: 285, name: "青海" },
        { x: 285, y: 294, name: "甘肃" },
        { x: 326, y: 300, name: "陕西" },
        { x: 372, y: 300, name: "河南" },
        { x: 430, y: 310, name: "江苏" },
        { x: 120, y: 320, name: "西藏" },
        { x: 450, y: 320, name: "上海" },
        { x: 408, y: 325, name: "安徽" },
        { x: 366, y: 330, name: "湖北" },
        { x: 270, y: 342, name: "四川" },
        { x: 312, y: 344, name: "重庆" },
        { x: 435, y: 350, name: "浙江" },
        { x: 400, y: 375, name: "江西" },
        { x: 360, y: 380, name: "湖南" },
        { x: 310, y: 385, name: "贵州" },
        { x: 420, y: 390, name: "福建" },
        { x: 455, y: 410, name: "台湾" },
        { x: 255, y: 414, name: "云南" },
        { x: 385, y: 418, name: "广东" },
        { x: 330, y: 420, name: "广西" },
        { x: 342, y: 470, name: "海南" },
        { x: 562, y: 332, name: "海外" },
        { x: 650, y: 332, name: "其他" }];
    columnSet.forEach(function (e) {
        var rect = jQuery.parseXML("<rect             style=\"fill: lawngreen; stroke: black; stroke-width: 1px; fill-opacity: 0.7;\"             xmlns=\"http://www.w3.org/2000/svg\" x=\"" + e.x + "\" width=\"16\" height=\"1\" y=\"" + e.y + "\" _y=\"" + e.y + "\"            id=\"clm" + e.name + "\"></rect>").documentElement;
        board.append(rect);
        var text = jQuery.parseXML("<text style=\"fill: green;\"             xmlns=\"http://www.w3.org/2000/svg\" x=\"" + e.x + "\" y=\"" + (e.y - 4) + "\" _y=\"" + (e.y - 4) + "\"            id=\"txt" + e.name + "\">\u6CA1\u6709\u6570\u636E</text>").documentElement;
        board.append(text);
    });
    $.getJSON("../rank.json", function (data) {
        data_province = data;
        for (var p in data_province) {
            data_province[p].forEach(function (d) {
                if (d[1] > max_province)
                    max_province = d[1];
            });
        }
        drawColumn(YEAR);
    });
})();
// 地图上的柱形图
function drawColumn(year) {
    $('#map_svg text').text('没有数据');
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
            .text(prvc[1]);
    });
}
