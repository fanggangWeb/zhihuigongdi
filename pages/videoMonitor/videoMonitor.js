//获取应用实例
const app = getApp()
import { fetch, imageURL } from '../../utils/fetch'
//Page Object
Page({
  data: {
    height: app.globalData.statusBarHeight + app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  onLoad: function (options) {
  },
  onReady: function () {
    this.playerContext = wx.createLivePlayerContext('player', this);
    console.log(this.playerContext)
    this.playerContext.play();
  },
  onShow: function () {
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onReachBottom: function() {
    
  },
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh();
    },2000)
  },
  statechange(e){
  },
  error(e){
  }
});