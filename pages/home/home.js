//获取应用实例
const app = getApp()
import { fetch, imageURL } from '../../utils/fetch'
//Page Object
Page({
  data: {
    topMenuList: [
      {
        image: "../../assets/images/home/detail-icon.png",
        name: "项目详情"
      },
      {
        image: "../../assets/images/home/attendence-icon.png",
        name: "项目考勤"
      },
      {
        image: "../../assets/images/home/person-icon.png",
        name: "人员管理"
      },
      {
        image: "../../assets/images/home/person-statistics.png",
        name: "人员统计"
      }
    ],
    workMenuList: [
      {
        image: "../../assets/images/home/abnormal-person.png",
        name: "人员告警"
      },
      {
        image: "../../assets/images/home/video-monitor.png",
        name: "视频监控"
      },
      {
        image: "../../assets/images/home/environment-monitor.png",
        name: "环境监测"
      },
      {
        image: "../../assets/images/home/location.png",
        name: "定位系统"
      },
      {
        image: "../../assets/images/home/device-inspection.png",
        name: "设备检测"
      },
      {
        image: "../../assets/images/home/device-statistics.png",
        name: "设备统计"
      }
    ],

    height: app.globalData.statusBarHeight + app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  onLoad: function (options) {
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {

  },
  onUnload: function () {

  }
});