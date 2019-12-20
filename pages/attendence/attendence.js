//获取应用实例
const app = getApp()
import {
  fetch,
  imageURL
} from '../../utils/fetch'
import * as echarts from '../../ec-canvas/echarts';
let that, chart = null;
var index = 0
var colors = ['#1CB975', '#666666'];
function setOptionData (comePeople, notCome) {
  var option = {
    // tooltip: {
    //   trigger: 'item',
    //   formatter: "{b}: {c} ({d}%)"
    // },
    color: ['#1CB975', '#666666'],
    title: {
      text: comePeople,
      subtext: '到岗人数',
      // sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
      x: 'center',
      y: '70',
      itemGap: 5,
      textStyle : {
        // color : '#1CB975',
        color: '#222222',
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
      radius: ['50%', '70%'],
      // avoidLabelOverlap: false,
      label: {
        normal: {
          show: true,
          formatter: "{b}:{c}({d}%)",
          position: "top",
          padding: [0, -20],
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
        // normal: {
        //   // color: function () {
            
        //   //   return colors[index++];
        //   // },
          
        //   label: {
        //     show: false
        //   },
        //   labelLine: {
        //     show: false
        //   }
        // },
        emphasis: {
          label: {
            show: false,
            position: 'center',
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        }
      },
      data: [{
        value: comePeople,
        name: '到岗人数'
      },
      {
        value: notCome,
        name: '未到岗人数'
      }]
    }]
  };
  return option
}


function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  chart.setOption(setOptionData(0,0));
  return chart;
}
//Page Object
Page({
  data: {
    date: "2019-11-27",
    switchList: [{
        name: "管理人员",
        value: 0
      },
      {
        name: "作业工人",
        value: 1
      },
      {
        name: "关键岗位",
        value: 2
      }
    ],
    workerCount: [],
    ec: {
      onInit: initChart
    },
    switchValue: 0,
    height: app.globalData.statusBarHeight + app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  onLoad: function (options) {
    that = this
  },
  onReady: function () {},
  onShow: function () {
    this.getToday()
    this.fetchAttendence()
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  // 日期选择器改变
  dateChange (e) {
    this.setData({
      date: e.detail.value
    })
    this.fetchAttendence()
  },
  swtichChange (e) {
    // console.log(e.currentTarget.dataset.item)
    this.setData({
      switchValue: e.currentTarget.dataset.item.value
    })
    
    this.fetchAttendence()
  },
  // 获取项目考勤的统计查询
  fetchAttendence () {
    let data = {
      projectId: wx.getStorageSync("projectId"),
      userTypeLabel:  this.data.switchValue, // 人员类别(0为管理人员,1为作业工人,2为其他)
      time: this.data.date
    }
    fetch({
      url: "/attendance/findAttendance",
      ContentType: "application/json;charset=utf-8",
      data
    }).then(res => {
      if (res.errcode == 0) {
        // option.title.text = res.data.comePeopleCount
        // option.series[0].data[0].value = res.data.comePeopleCount
        // option.series[0].data[1].value = res.data.total - res.data.comePeopleCount
        this.setData({
          workerCount: res.data.workerCount
        })
        chart.clear()
        chart.setOption(setOptionData(res.data.comePeopleCount, res.data.total - res.data.comePeopleCount));
        
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
  getToday () {
    let today = new Date()
    // console.log(today.getFullYear()+" "+today.getMonth()+" "+ today.getDate())
    let year = today.getFullYear()
    let month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1)
    let day = today.getDate() > 9 ? today.getDate() : "0" + today.getDate()
    this.setData({
      date: year + "-" + month + "-" + day
    })
  }

});