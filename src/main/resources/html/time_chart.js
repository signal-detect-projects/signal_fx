// 分时图相关

var time_echarts = echarts.init(document.getElementById('time_echarts'), null, {renderer: 'canvas'});


var data = [];
var data2 = []
var start_time = new Date()
start_time.setHours(8)
start_time.setMinutes(0)
var start_time2 = new Date(+start_time)
var last_v = 400
var last_v2 = 1000
var last_brushed_flag = false
for (var i = 0; i < 1000; i++) {
    data.push(randomData());
    data2.push(randomData2())
}
var selected_channel_index = 0;
time_chart_option = {
    animation: true,
    title: {
        text: '趋势图'
    },
    toolbox: {
        show: false,
    },
    // tooltip: {
    //     trigger: 'axis',
    //     formatter: function (params) {
    //         params = params[0];
    //         var date = new Date(params.name);
    //         return (
    //             date.Format("hh:mm") + "   " +
    //             params.value[1]
    //         );
    //     },
    // },
    brush: {
        xAxisIndex: "all",
        brushLink: "all",
        throttleType: "debounce", //开启选中延迟后调用回调延迟
        throttleDelay: 600, //选中延迟后调用回调延迟时
        brushStyle: {
            borderWidth: 1,
            color: 'rgba(120,140,180,0.3)',
            borderColor: 'rgba(0,0,0,.65)'
        },
    },
    grid: [
        {
            top: '10%',
            height: '20%',
            width: '100%'
        }, {
            top: '30%',
            height: '20%',
            width: '100%'
        }, {
            top: '50%',
            height: '20%',
            width: '100%'
        }, {
            top: '70%',
            height: '20%',
            width: '100%'
        }, {
            top: '10%',
            height: '80%',
            width: '100%'
        }
    ],
    xAxis: [
        {
            type: 'time',
            min: 'dataMin',
            show: false,
            gridIndex: 0
        }, {
            type: 'time',
            min: 'dataMin',
            show: false,
            gridIndex: 1
        }, {
            type: 'time',
            min: 'dataMin',
            show: false,
            gridIndex: 2
        }, {
            type: 'time',
            min: 'dataMin',
            show: true,
            gridIndex: 3
        }, {
            type: 'time',
            min: 'dataMin',
            show: false,
            gridIndex: 4
        },
    ],
    dataZoom: [
        {
            type: 'inside',
            xAxisIndex: "all",
        },
    ],
    yAxis: [
        {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false, // 不显示坐标轴上的文字
            },
            show: true,
            gridIndex: 0
        },
        {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false, // 不显示坐标轴上的文字
            },
            show: true,
            gridIndex: 1
        }, {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false, // 不显示坐标轴上的文字
            },
            show: true,
            gridIndex: 2
        }, {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false, // 不显示坐标轴上的文字
            },
            show: true,
            gridIndex: 3
        }, {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false, // 不显示坐标轴上的文字
            },
            show: true,
            gridIndex: 4
        },
    ],
    series: [
        {
            name: 'data1',
            type: 'line',
            showSymbol: false,
            data: data,
            xAxisIndex: 0,
            yAxisIndex: 0,
        }, {
            name: 'data2',
            type: 'line',
            showSymbol: false,
            data: data2,
            xAxisIndex: 3,
            yAxisIndex: 3,
            emphasis: {
                focus: 'series'
            }
        }, {
            name: 'data3',
            type: 'line',
            showSymbol: false,
            data: data2,
            xAxisIndex: 4,
            yAxisIndex: 4,
            lineStyle: {
                width: 0, //设置线宽为0
                color: 'rgba(0, 0, 0, 0)' // s设置线的颜色为透明
            },
        }
    ]
}
;
time_echarts.setOption(time_chart_option);
// 点击通道
time_echarts.getZr().on('click', param => {
    console.log("进入click")
    if (last_brushed_flag) {
        //关闭鼠标的 brush 状态
        // time_echarts.dispatchAction({
        //     type: 'takeGlobalCursor',
        // });
        last_brushed_flag = false
        return
    }
    var list = [param.offsetX, param.offsetY]
    var index = 0
    console.log('有效点击', param)
    // 判断点击的坐标在不在坐标系内
    while (!time_echarts.containPixel({gridIndex: index}, list) && index < 4) {
        index++
    }
    // 如果 index > 3, 说明点击的是空白区域
    if (index > 3) {
        console.log("点击空白")
        return
    }
    console.log("点击通道", index)
    // 点击相同通道，不处理
    if (index === selected_channel_index) {
        return;
    }
    selected_channel_index = index
})

time_echarts.dispatchAction({
    type: 'takeGlobalCursor',
    key: 'brush',
    brushOption: {
        brushType: 'lineX',
        brushMode: 'single'
    }
});

function renderBrushed(params) {
    console.log('brushend触发', params)
    last_brushed_flag = true;
    if (!params['areas'] || params['areas'].length == 0) {
        return
    }
    console.log("有效brushEnd")
    var time_arr = params['areas'][0]['coordRange']
    var start = new Date(time_arr[0]).Format('yyyy-MM-dd hh:mm:ss')
    var end = new Date(time_arr[1]).Format('yyyy-MM-dd hh:mm:ss')
    console.log('render Brushed', start, end)
}

time_echarts.on('brushEnd', renderBrushed); //圈选结束后的回调


// setInterval(function () {
//     for (var i = 0; i < 5; i++) {
//         // data.shift();
//         data.push(randomData());
//         data2.push(randomData2())
//     }
//     time_echarts.setOption({
//         series: [
//             {
//                 data: data
//             }, {
//                 data: data2
//             }
//         ]
//     });
// }, 1000);

function randomData() {
    start_time = new Date(+start_time + Math.random() * 1000 * 60);
    last_v = last_v + Math.random() * 100 - 47
    return {
        name: start_time.toString(),
        value: [
            start_time,
            last_v
        ]
    };
}

function randomData2() {
    start_time2 = new Date(+start_time2 + Math.random() * 1000 * 60);
    last_v2 = last_v2 + Math.random() * 100 - 47
    return {
        name: start_time2.toString(),
        value: [
            start_time2,
            0
        ]
    };
}