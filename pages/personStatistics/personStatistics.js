//获取应用实例
const app = getApp()
import {
  fetch,
  imageURL
} from '../../utils/fetch'
import * as echarts from '../../ec-canvas/echarts';
let that, chart = null;
var index = 0
var colorList = ["#5FACF9", "#FFBA55", "#FF9B4D", "#FF8E50", "#56D193"]

var option = {
  color: ["#5FACF9", "#FFBA55", "#FF9B4D", "#FF8E50", "#56D193"],
  title: {
    text: '(项目人员构成图)',
    // subtext: '纯属虚构',
    x: 'center',
    y: 'bottom',
    textStyle: {
      color: "#666666",
      fontSize: 16,
      fontWeight: 300
    }
  },
  // tooltip: {
  //   trigger: 'item',
  //   formatter: "{a} <br/>{b} : {c} ({d}%)"
  // },
  // legend: {
  //     orient: 'vertical',
  //     left: 'left',
  //     data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
  // },
  series: [{
    name: '人员统计',
    type: 'pie',
    radius: '46%',
    center: ['50%', '60%'],
    data: [
      // {
      //   value: 335,
      //   name: '施工单位'
      // },
      // {
      //   value: 310,
      //   name: '监理单位'
      // },
      // {
      //   value: 234,
      //   name: '建设单位'
      // },
      // {
      //   value: 135,
      //   name: '其他'
      // },
      // {
      //   value: 1548,
      //   name: '作业工人'
      // }
    ],
    itemStyle: {
      normal: {
        // color: function () {
        //   return colorList[index++];
        // },
        label: {
          show: true,
          formatter: "{d}%({c}个)\n{b}",
          textStyle: {
            fontSize: '12',
            // fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        }
      },
      emphasis: {
        label: {
          show: true,
          // position: 'center',
          textStyle: {
            fontSize: '12',
            fontWeight: 'bold'
          }
        }
      }
    },
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
    ec: {
      onInit: initChart
    },
    height: app.globalData.statusBarHeight + app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  onLoad: function (options) {
    that = this
  },
  onReady: function () {},
  onShow: function () {
    this.getUserType()
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  // 获取所有的人员分类
  getUserType () {
    let data = {
      projectId: wx.getStorageSync("projectId")
    }
    fetch({
      url: "/worker/usertype",
      ContentType: "application/json;charset=uft-8",
      data
    }).then(res => {
      if (res.errcode == 0) {
        option.series[0].data = res.data
        chart.setOption(option);
      } else {
        wx.showModal({
          title: '错误',
          content: res.msg,
          showCancel: false
        });
      }
    })
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