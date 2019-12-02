//获取应用实例
const app = getApp()
import { fetch, imageURL } from '../../../utils/fetch'
//Page Object
Page({
  data: {
    serialNo: "",
    deviceInfo: {},
    height: app.globalData.statusBarHeight + app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      serialNo: options.serialNo
    })
  },
  onReady: function () {
  },
  onShow: function () {
    this.fetchDetail()
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  // 根据当前的设备编号，实时获取设备的详情
  fetchDetail () {
    let data = {
      serialNo: this.data.serialNo
    }
    fetch({
      url: "/crane/rtd",
      ContentType: "application/json;charset=utf-8",
      data
    }).then(res => {
      if (res.errcode == 0) {
        // console.log(res)
        this.setData({
          deviceInfo: res.data
        })
      } else {
        wx.showModal({
          title: '错误',
          content: res.msg,
          showCancel: false
        });
      }
    })
  }
});