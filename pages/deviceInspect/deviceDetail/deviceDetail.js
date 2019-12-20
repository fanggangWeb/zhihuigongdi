//获取应用实例
const app = getApp()
import { fetch, imageURL } from '../../../utils/fetch'
//Page Object
Page({
  data: {
    serialNo: "",
    deviceInfo: {},
    warnInfo: {}, // 报警信息和设备安装的情况
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
    this.fetchDeviceWarn()
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
  },
  // 获取设备的告警信息
  fetchDeviceWarn () {
    let data = {
      serialNo: this.data.serialNo
    }
    fetch({
      url: "/warn/deviceWarnCount",
      ContentType: "application/json;charset=uft-8",
      data
    }).then(res => {
      if (res.errcode == 0) {
        this.setData({
          warnInfo: res.data
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