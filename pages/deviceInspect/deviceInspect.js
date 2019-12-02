//获取应用实例
const app = getApp()
import { fetch, imageURL } from '../../utils/fetch'
//Page Object
Page({
  data: {
    deviceList: []
  },
  onLoad: function (options) {
  },
  onReady: function () {
  },
  onShow: function () {
    this.fetchDeviceList()
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  viewDetail (e) {
    // console.log(e.currentTarget.dataset.item)
    var item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../deviceInspect/deviceDetail/deviceDetail?serialNo='+item.serialNo
    });
  },
  fetchDeviceList () {
    let data = {
      projectId: wx.getStorageSync("projectId")
    }
    fetch({
      url: "/crane/project",
      ContentType: "application/json;charset=utf-8",
      data
    }).then(res => {
      // console.log(res)
      if (res.errcode == 0) {
        this.setData({
          deviceList: res.data
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