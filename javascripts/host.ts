// 全局变量
{
    var YEAR: number = 2009;
}

// 文件路径
{
    // 词频路径
    const URL_frequency: string = "../../dataWenchuan/";
}

// 词云
function getCloud() {
    //获得数据
    var frequency_list = [
        ["地震", 100.1945],
        ["5.12", 97.661],
        ["雅安", 89.001],
        ["中国", 82.086],
        ["四川", 79.536],
        ["汶川", 71.9963],
        ["生命", 68.040],
        ["捐款", 66.400],
        ["逝者", 52.625],
        ["灾区", 50.951],
        ["捐款", 50.155],
        ["记得", 47.872],
        ["坚强", 47.425],
        ["灾难", 44.946],
        ["周年", 43.944],
        ["愿", 42.651],
        ["希望", 42.226],
        ["加油", 36.486],
        ["救援", 33.789],
        ["安息", 33.536]
    ]

    //设定一个线性非连贯比例尺来进行给不同大小的词赋颜色.
    var color = d3.scale.linear()
        .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
        .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

    d3.layout.cloud().size([800, 300])
        .words(frequency_list)
        .rotate(0)
        .fontSize(function (d) {
            return d.size;
        })
        .on("end", draw)
        .start();

    function draw(words) {
        d3.select("#word_cloud").append("svg") //根据id选择父对象插入svg
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", "0 0 900 400")
            .attr("style", "border: 1px solid black")
            .attr("preserveAspectRatio", "xMaxYMax meet")
            .attr("class", "wordcloud")
            .append("g")
            .attr("transform", "translate(400,200)")
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