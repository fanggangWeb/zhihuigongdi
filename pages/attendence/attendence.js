//获取应用实例
const app = getApp()
import {
  fetch,
  imageURL
} from '../../utils/fetch'
import * as echarts from '../../ec-canvas/echarts';
let that, chart = null;
var index = 0 
var colors = ['#1CB975', '#f1f1f1'];
var option = {
  // tooltip: {
  //   trigger: 'item',
  //   formatter: "{a} <br/>{b}: {c} ({d}%)"
  // },
  title: {
    text: '135',
    subtext: '到岗人数',
    // sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
    x: 'center',
    y: '70',
    itemGap: 5,
    textStyle : {
      color : '#1CB975',
      fontSize : 30,
      fontWeight : 'normal'
    },
    subtextStyle : {
      color : '#222222',
      fontSize : 14
    }
  },
  series: [{
    name: '项目考勤',
    type: 'pie',
    radius: ['55%', '70%'],
    avoidLabelOverlap: false,
    label: {
      normal: {
        show: false,
        position: 'center'
      },
      emphasis: {
        show: false,
        textStyle: {
          fontSize: '30',
          fontWeight: 'bold'
        }
      }
    },
    labelLine: {
      normal: {
        show: false
      }
    },
    itemStyle: {
      normal: {
        color: function () {
          return colors[index++];
        },
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      emphasis: {
        label: {
          show: true,
          position: 'center',
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      }
    },
    data: [{
      value: 135,
      name: '到岗人数'
    },
    {
      value: 135,
      name: '未到岗人数'
    }]
  }]
};

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  chart.setOption(option);
  return chart;
}
//Page Object
Page({
  data: {
    date: "2019-11-10",
    switchList: [{
        name: "管理人员",
        value: 1
      },
      {
        name: "作业工人",
        value: 2
      },
      {
        name: "关键岗位",
        value: 3
      }
    ],
    ec: {
      onInit: initChart
    },
    switchValue: 1,
    height: app.globalData.statusBarHeight + app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  onLoad: function (options) {
    that = this
  },
  onReady: function () {},
  onShow: function () {
    this.getToday()
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  // 日期选择器改变
  dateChange(e) {
    // console.log(e)
    this.setData({
      date: e.detail.value
    })
  },
  swtichChange(e) {
    // console.log(e.currentTarget.dataset.item)
    this.setData({
      switchValue: e.currentTarget.dataset.item.value
    })
    // option.series[0].data = arr
    // chart.setOption(option);
  },
  // 获取今天的日期
  getToday() {
    let today = new Date()
    // console.log(today.getFullYear()+" "+today.getMonth()+" "+ today.getDate())
    let year = today.getFullYear()
    let month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1)
    let day = today.getDate() > 9 ? today.getDate() : "0" + today.getDate()
    this.setData({
      date: year + "-" + month + "-" + day
    })
  },
});