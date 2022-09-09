// 流动柱状图
// 热力图
var phases_arr = []
for (var i = 0; i <= 360; i++) {
    phases_arr.push(i)
}
var bar_data_2 = []
last_x = 0
for (var i = 0; i < 20; i++) {
    if (i > 0) {
        last_x = last_x + Math.round(Math.random() * 10)
    }
    bar_data_2.push([last_x, Math.round(Math.random() * 360), Math.round(Math.random() * 50 + 100)])
}

var sin_data = []
for (var i = 0; i < 360; i++) {
    sin_data.push([0, i, 150 * Math.sin(i / 180 * Math.PI)])
}


var bar_option = {
    tooltip: {},
    // visualMap: {
    //     max: 20,
    //     inRange: {
    //         color: [
    //             '#313695',
    //             '#4575b4',
    //             '#74add1',
    //             '#abd9e9',
    //             '#e0f3f8',
    //             '#ffffbf',
    //             '#fee090',
    //             '#fdae61',
    //             '#f46d43',
    //             '#d73027',
    //             '#a50026'
    //         ]
    //     }
    // },
    xAxis3D: {
        name: '时间',
        type: 'category',
        nameTextStyle: {
            fontSize: 14
        },
        min: 'dataMin',
        max: 'dataMax',
        splitArea: {
            show: false
        }

    },
    yAxis3D: {
        name: '相位',
        type: 'value',
        data: phases_arr,
        nameTextStyle: {
            fontSize: 14
        },
        min: '0',
        max: '360',
        interval: 45
    },
    zAxis3D: {
        name: '峰值',
        type: 'value',
        nameTextStyle: {
            fontSize: 14
        },
        min: 0,
        max: 'dataMax',
    },
    grid3D: {
        boxWidth: 200,//x轴
        boxDepth: 150,//y轴
        boxHeight: 50,
        viewControl: {
            // projection: 'orthographic',
            distance: 300,
            // autoRotate: false,
            // rotateSensitivity: 0,
            // zoomSensitivity: 0,
        },
        light: {
            main: {
                intensity: 1.2,
                shadow: true
            },
            ambient: {
                intensity: 0.3
            }
        },
        axisPointer: {
            show: false
        }
    },
    series: [
        {
            type: 'bar3D',
            barSize: 3,
            data: bar_data_2.map(function (item) {
                return {
                    value: [item[0], item[1], item[2]]
                };
            }),
            itemStyle: {
                opacity: 0.6
            },
            label: {
                fontSize: 16,
                borderWidth: 1
            },
            shading: 'lambert',
            // emphasis: {
            //     label: {
            //         fontSize: 20,
            //         color: '#900'
            //     },
            //     itemStyle: {
            //         color: '#900'
            //     }
            // }
        },
        {
            type: 'line3D',
            data: sin_data.map(function (item) {
                return {
                    value: [0, item[1], item[2]]
                };
            }),
        },
    ]
};

var bar_echarts = echarts.init(document.getElementById('bar_chart'), null, {renderer: 'canvas'});
bar_echarts.setOption(bar_option);
// var bar_echarts = echarts.init(document.getElementById('bar_chart'), null, {renderer: 'canvas'});
