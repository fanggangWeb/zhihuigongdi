//获取应用实例
const app = getApp()
import { fetch, apiUrl } from '../../utils/fetch'
//Page Object
Page({
  data: {
    dialogState: false,
    confirmText: "我已知晓",
    oneInfo: {},
    dataList: [],
    noDataState: false,
    skip: 0,
    limit: 40,
    dialogState: false,
    height: app.globalData.statusBarHeight + app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  //options(Object)
  onLoad: function(options) {
    
  },
  onReady: function() {
    
  },
  onShow: function() {
    this.getAlarmMessage()
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  // 查看某一个告警信息的详情
  detailOne (e) {
    // console.log(e.currentTarget.dataset.item)
    this.setData({
      oneInfo: e.currentTarget.dataset.item,
      dialogState: true
    })
  },
  // 更改某条消息的状态
  hadKnown () {
    let data = {
      id: this.data.oneInfo.id,
      isRead: 1
    }
    fetch({
      url: "/warn/update",
      ContentType: "application/json;charset=utf-8",
      data: data
    }).then(res => {
      this.setData({
        dialogState: false
      })
      if (res.errcode == 0) {
        this.setData({
          skip: 0
        })
        this.getAlarmMessage()
      } else {
        wx.showToast({
          title: '更改状态失败，请稍后重试',
          icon: 'none',
          duration: 2000
        });
      }
    })
    
  },
  // 获取所有的人员告警消息
  getAlarmMessage () {
    let data = {
      projectId: wx.getStorageSync("projectId"),
      // isRead: "",
      skip: this.data.skip,
      limit: this.data.limit
    }
    fetch({
      url: "/warn/find",
      ContentType: "application/json;charset=utf-8",
      data
    }).then(res => {
      if (res.errcode == 0) {
        this.setData({
          dataList: res.data
        })
        if (res.data.length>0) {
          this.setData({
            noDataState: false
          })
        } else {
          this.setData({
            noDataState: true
          })
        }
      } else {
        wx.showModal({
          title: '错误',
          content: res.msg,
          showCancel: true
        });
        this.setData({
          noDataState: false
        })
      }
    })
  },
  // 下拉刷新
  onPullDownRefresh () {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1500);
    this.setData({
      skip: 0
    })
    this.getAlarmMessage()
  },
  // 上滑加载更多
  onReachBottom () {
    var that = this
    this.setData({
      skip: this.data.skip + this.data.limit
    })
    let data = {
      projectId: wx.getStorageSync("projectId"),
      // isRead: "",
      skip: this.data.skip,
      limit: this.data.limit
    }
    fetch({
      url: "/warn/findPeopleAlert",
      ContentType: "application/json;charset=utf-8",
      data
    }).then(res => {
      if (res.errcode == 0) {
        if (res.data&&res.data.length > 0) {
          this.setData({
            dataList: this.data.datalist.concat(res.data)
          })
        } else {
          this.setData({
            skip: this.data.skip - this.data.limit
          })
        }
      } else {
        wx.showModal({
          title: '错误',
          content: res.msg,
          showCancel: false
        });
        this.setData({
          skip: this.data.skip - this.data.limit
        })
      }
    })
  }
});
  