// 分时图相关

var time_echarts = echarts.init(document.getElementById('time_echarts'), null, {renderer: 'svg'});


var data = [];
var data2 = []
var start_time = new Date()
start_time.setHours(8)
start_time.setMinutes(0)
var start_time2 = new Date(+start_time)
var last_v = 400
var last_v2 = 1000

for (var i = 0; i < 1000; i++) {
    data.push(randomData());
    data2.push(randomData2())
}
option = {
    title: {
        text: '趋势图'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return (
                date.Format("hh:mm") + "   " +
                params.value[1]
            );
        },
    },
    brush: {
        xAxisIndex: "all",
        brushLink: "all",
        brushStyle: {
            borderWidth: 2,
            color: "rgba(255,255,255,0.1)",
            borderColor: "#0A244C",
            borderTop: 0,
            borderBottom: 0,
            borderCap: 'round',
            borderDashOffset: 1,
            borderType: [5, 3],
            borderJoin: 'round'
        },
    },
    xAxis: {
        type: 'time',
        min: 'dataMin',
        show: false
    },
    axisPointer: {
        link: {
            xAxisIndex: "all", // 实现多个图的贯穿 X 轴提示线
        },
    },
    dataZoom: [
        {
            type: 'inside',
            xAxisIndex: "all",
        },
    ],
    yAxis: {
        type: 'value',
        boundaryGap: ['25%', '50%'],
        splitLine: {
            show: false
        },
        axisLabel: {
            show: false, // 不显示坐标轴上的文字
        },
    },
    series: [
        {
            name: 'data1',
            type: 'line',
            showSymbol: false,
            data: data
        }, {
            name: 'data2',
            type: 'line',
            showSymbol: false,
            data: data2
        }
    ]
};
time_echarts.setOption(option);

time_echarts.getZr().on('click', data => {
    var list = [data.offsetX, data.offsetY]
    var index = 0
    console.log('点击', data)
    // // 判断点击的坐标在不在坐标系内
    // while (!myEchart.containPixel({gridIndex: index}, list) && index < 4) {
    //     index++
    // }
    // // 如果 index > 3, 说明点击的是空白区域
    // if (index > 3) return
    // // 点击相同通道，不处理
    // if (index === this.selectedSeriesIndex) return
    // this.$emit("selectedComponent", index);
    // this.selectedSeriesIndex = index
})

time_echarts.dispatchAction({
    type: "brush",
    areas: [
        {
            brushType: "lineX",
            coordRange: coordRange,
            gridIndex: 4,
        },
    ],
});

setInterval(function () {
    for (var i = 0; i < 5; i++) {
        // data.shift();
        data.push(randomData());
        data2.push(randomData2())
    }
    time_echarts.setOption({
        series: [
            {
                data: data
            }, {
                data: data2
            }
        ]
    });
}, 1000);

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
            last_v2
        ]
    };
}