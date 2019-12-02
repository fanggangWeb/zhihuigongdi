//获取应用实例
const app = getApp()
import { fetch, imageURL } from '../../utils/fetch'
//Page Object
Page({
  data: {
    detailInfo: {},
    height: app.globalData.statusBarHeight + app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  onLoad: function (options) {
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
  // 获取项目详情
  fetchDetail () {
    let data = {
      projectId: wx.getStorageSync("projectId")
    }
    fetch({
      url: "/project/details",
      data,
      ContentType: "application/json;charset=utf-8"
    }).then(res => {
      if (res.errcode == 0) {
        this.setData({
          detailInfo: res.data
        })
      } else {
        wx.showModal({
          title: "错误",
          content: res.msg,
          showCancel: false
        });
      }
    })
  }
});