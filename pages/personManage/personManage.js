//获取应用实例
const app = getApp()
import { fetch, imageURL } from '../../utils/fetch'
//Page Object
Page({
  data: {
    searchValue: "",
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

  },
  inputChange (e) {
    this.setData({
      searchValue: e.detail.value
    })
  }
});