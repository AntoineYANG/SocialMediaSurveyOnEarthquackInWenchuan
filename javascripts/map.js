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


var mydata = [];

$.getJSON("../python/data/2009.json", data09 => {
    mydata.push(data09.data);
    $.getJSON("../python/data/2010.json", data10 => {
        mydata.push(data10.data);
        $.getJSON("../python/data/2011.json", data11 => {
            mydata.push(data11);
            $.getJSON("../python/data/2012.json", data12 => {
                mydata.push(data12);
                $.getJSON("../python/data/2013.json", data13 => {
                    mydata.push(data13);
                    $.getJSON("../python/data/2014.json", data14 => {
                        mydata.push(data14);
                        $.getJSON("../python/data/2015.json", data15 => {
                            mydata.push(data15);
                            $.getJSON("../python/data/2016.json", data16 => {
                                mydata.push(data16);
                                $.getJSON("../python/data/2017.json", data17 => {
                                    mydata.push(data17);
                                    $.getJSON("../python/data/2018.json", data18 => {
                                        mydata.push(data18);
                                        $.getJSON("../python/data/2019.json", data19 => {
                                            mydata.push(data19);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

function updateMap(year) {
    $('.leaflet-zoom-animated g').html("");
    if (mydata[year - 2009] === void 0 || mydata[year - 2009].length == 0) {
        return;
    }
    mydata[year - 2009].forEach(d => {
        drawPath(d);
    });
    $('.leaflet-zoom-animated path').css('stroke-width', 1);
}

function drawPath(data) {
    let lng = data[1];
    let lat = data[2];
    let height = 0.30;
    let width = 0.36;
    paint([lng + gaussrand() * height + 0.035, lat + gaussrand() * width + 0.025], data[0]);
}

function paint(d, text) {
    L.circle([d[0], d[1]], 10, {
        color: Math.random() >= 0.6 ? 'red' : Math.random() >= 0.6 ? 'yellow' : 'green',
        fillColor: '#f03',
        fillOpacity: 0.1
    }).addTo(map).bindPopup(text);
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
    return /*X >= 2 || X <= -2 ? gaussrand() :*/ X;
}