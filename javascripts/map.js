//插件把 定义了多个国内的瓦片图层，我们只需要通过提供的方法访问到相应的图层即可
//从插件代码可以看出 需要传入 providerName.mapName.mapType 从插件代码中查找所需要的值
var test = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
    maxZoom: 8,
    minZoom: 4
});

//此处可以定义多个图层，并可以再页面中进行选择
var baseLayers = {
    "测试地图": test
}

var map = L.map("map", {
    center: [36.37, 105.28],
    zoom: 4,
    layers: [test],
    zoomControl: false
});

L.control.layers(baseLayers, null).addTo(map);

L.control.zoom({
    zoomInTitle: '放大',
    zoomOutTitle: '缩小'
}).addTo(map);


const sw = {
    Y2009: 1.5,
    Y2010: 0.8,
    Y2011: 0.7,
    Y2012: 0.7,
    Y2013: 0.7,
    Y2014: 0.7,
    Y2015: 0.7,
    Y2016: 0.7,
    Y2017: 0.7,
    Y2018: 0.7,
    Y2019: 1.3
};

function updateMap(year, y) {
    $('.leaflet-zoom-animated g').html("");
    year.forEach(d => {
        drawPath(d);
    });
    $('.leaflet-zoom-animated path').css('stroke-width', sw['Y' + y]);
}

// lng, lat, height, width
const proj = {
    黑龙江: [46.6144, 128.3815, 2.2, 2],
    吉林: [43.4892, 126.4789, 1.4, 1.7],
    新疆: [41.6870, 86.6861, 3.1, 5.4],
    辽宁: [41.1204, 122.0808, 1.3, 1.9],
    内蒙古: [41.2062, 111.8349, 1, 5.7],
    北京: [39.9815, 116.0224, 0.4, 0.3],
    天津: [39.2115, 117.3351, 0.3, 0.3],
    河北: [39.3444, 115.9045, 2.1, 1.6],
    宁夏: [37.2842, 106.1248, 0.9, 0.6],
    山东: [36.0840, 117.8245, 1.3, 1.8],
    山西: [37.5954, 112.1404, 2.0, 1.4],
    青海: [35.6804, 95.2082, 3.1, 5.5],
    甘肃: [37.8640, 100.4805, 2.2, 6.2],
    陕西: [37.2504, 109.0014, 1.8, 1.3],
    河南: [34.3605, 113.2404, 2.0, 2.2],
    江苏: [32.9871, 119.5666, 1.7, 1.0],
    西藏: [32.1355, 91.1621, 2.8, 4.2],
    上海: [31.4751, 121.3804, 0.5, 0.6],
    安徽: [31.9504, 117.0048, 1.7, 1.2],
    湖北: [31.1605, 112.1548, 1.4, 4.3],
    四川: [30.3952, 103.2082, 3.1, 4.6],
    重庆: [29.7745, 107.8482, 1.5, 2.2],
    浙江: [29.3280, 119.8680, 1.5, 1.4],
    江西: [27.4515, 115.4856, 2.3, 1.8],
    湖南: [27.7514, 111.8607, 2.3, 1.7],
    贵州: [26.3340, 106.8482, 1.8, 2.7],
    福建: [25.8846, 118.0045, 1.4, 1.2],
    台湾: [23.4065, 120.9456, 1.1, 0.5],
    云南: [25.3277, 102.2608, 1.9, 2.2],
    广东: [24.0162, 113.9245, 1.6, 2.4],
    广西: [23.9945, 109.2514, 1.1, 2.1],
    海南: [19.1210, 109.6412, 0.6, 0.7],
    香港: [22.7220, 114.3542, 0.4, 0.3],
    澳门: [22.1251, 113.1050, 0.3, 0.3]
};

function drawPath(data) {
    if (proj[data[0]] === null || proj[data[0]] === void 0)
        return;
    let lng = proj[data[0]][0];
    let lat = proj[data[0]][1];
    let height = proj[data[0]][2];
    let width = proj[data[0]][3];
    let box = [];
    for (let i = 0; i < data[1]; i++) {
        box.push([lng + gaussrand() * height, lat + gaussrand() * width]);
        if (box.length == 1e3) {
            paint(box)
            // setTimeout(paint(box), 200);
            box = [];
        }
    }
    paint(box)
    // setTimeout(paint(box), 200);
}

function paint(data) {
    data.forEach(d => {
        L.circle([d[0], d[1]], 10, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.1
        }).addTo(map);
    });
}

function zf(ran = Math.random()) {
    return ran;
}

var V1, V2, S;
var phase = 0;
function gaussrand() { 
    var X; 
    if (phase == 0) { 
        do {
            let U1 = Math.random(); 
            let U2 = Math.random(); 
            V1 = 2 * U1 - 1; 
            V2 = 2 * U2 - 1; 
            S = V1 * V1 + V2 * V2; 
        } while (S >= 1 || S == 0); 
        X = V1 * Math.sqrt(-2 * Math.log(S) / S); 
    } else
        X = V2 * Math.sqrt(-2 * Math.log(S) / S); 
    phase = 1 - phase;
    // console.log(X);
    return X / 3;
}