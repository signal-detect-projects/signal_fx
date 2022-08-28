// 分时图相关
var time_echarts = echarts.init(document.getElementById('time_echarts'), null, {renderer: 'svg'});


var data = [];


for (var i = 0; i < 1000; i++) {
    data.push(randomData());
}
option = {
    title: {
        text: 'Dynamic Data & Time Axis'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return (
                date.getDate() +
                '/' +
                (date.getMonth() + 1) +
                '/' +
                date.getFullYear() +
                ' : ' +
                params.value[1]
            );
        },
        // axisPointer: {
        //     animation: false
        // }
    },
    xAxis: {
        type: 'time',
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        },
        axisLabel: {
            show: false, // 不显示坐标轴上的文字
        },
    },
    series: [
        {
            name: 'Fake Data',
            type: 'line',
            showSymbol: false,
            data: data
        }
    ]
};
time_echarts.setOption(option);

setInterval(function () {
    for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
    }
    time_echarts.setOption({
        series: [
            {
                data: data
            }
        ]
    });
}, 1000);

var start_time = new Date()
start_time.setHours(8)
start_time.setMinutes(0)

function randomData() {
    start_time = new Date(+start_time + Math.random() * 10 + 15);
    return {
        name: start_time.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    };
}
