// 全局变量
{
    var YEAR: number = 2009;
    var WORDLIMIT = 20;
}

// 文件路径
{
    // 词频路径
    const URL_frequency: string = "../../dataWenchuan/";
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
                // 重绘词云
                getCloud(YEAR.toString(), WORDLIMIT);
            }
        }
    }
}