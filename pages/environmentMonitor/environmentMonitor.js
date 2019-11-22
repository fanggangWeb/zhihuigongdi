//获取应用实例
const app = getApp()
import { fetch, imageURL } from '../../utils/fetch'
//Page Object
Page({
  data: {
    dayStatus: 3, // 1上午 2下午 3晚上
    // weatherImage: "../../assets/images/environment/day-bg.jpg", // 上午的背景图片
    // weatherImage: "../../assets/images/environment/pm-bg.jpg", // 下午的背景图片
    weatherImage: "../../assets/images/environment/night-bg.jpg", // 晚上的背景图片
    height: app.globalData.statusBarHeight + app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  onLoad: function (options) {
  },
  onReady: function () {
  },
  onShow: function () {
    this.judgeTimeInterval()
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  // 判断时间是 中午下午晚上 然后显示对应的样式
  judgeTimeInterval () {
    let time = new Date()
    time = parseInt(time.getHours())
    // console.log(time)
    // 获取时间后分为三种区间段 6:00-12:00 12:00-18:00 18:00-次日6：00晚上
    switch (true) {
      case (time >= 6 && time < 12 ):
        this.setData({
          dayStatus: 1,
          weatherImage: "../../assets/images/environment/day-bg.jpg"
        })
        break;
      case (time >= 12 && time < 18):
        this.setData({
          dayStatus: 2,
          weatherImage: "../../assets/images/environment/pm-bg.jpg"
        })
        break;  
      default:
        this.setData({
          dayStatus: 3,
          weatherImage: "../../assets/images/environment/night-bg.jpg"
        })
        break;
    }
  }
});