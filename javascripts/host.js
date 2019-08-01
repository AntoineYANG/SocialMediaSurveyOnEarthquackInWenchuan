// 全局变量
{
    var YEAR = 2009;
    var WORDLIMIT = 20;
}
// 文件路径
{
    // 词频路径
    var URL_frequency = "../../dataWenchuan/";
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
                // 重绘词云
                getCloud(YEAR.toString(), WORDLIMIT);
            }
        }
    }
}
