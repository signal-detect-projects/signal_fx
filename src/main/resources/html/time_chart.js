// 分时图相关
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")   ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

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
                date.Format("hh:mm") +"   "+
                params.value[1]
            );
        },
    },
    xAxis: {
        type: 'time',
        min: 'dataMin',
        show:false
    },
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
        },{
            name: 'data2',
            type: 'line',
            showSymbol: false,
            data: data2
        }
    ]
};
time_echarts.setOption(option);

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
            },{
            data:data2
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