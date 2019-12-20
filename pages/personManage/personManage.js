//获取应用实例
const app = getApp()
import {
  fetch,
  imageURL
} from '../../utils/fetch'
//Page Object
Page({
  data: {
    searchValue: "",
    personList: [], // 人员列表
    wordTypeList: [], // 工作分类
    skip: 0,
    limit: 20,
    height: app.globalData.statusBarHeight + app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  onLoad: function (options) {
    this.getPersonByName()
    this.getWorkType()
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {

  },
  onUnload: function () {

  },
  inputChange(e) {
    this.setData({
      searchValue: e.detail.value
    })
    // this.getPersonByName()
  },
  searchConfirm() {
    this.getPersonByName()
  },
  // 获取所有的人员 条件查询全部
  getPersonByName() {
    let data = {
      projectId: wx.getStorageSync("projectId"),
      skip: this.data.skip,
      limit: this.data.limit,
      name: this.data.searchValue
    }
    fetch({
      // url: "/worker/find", // 不分页的写法
      url: "/worker/project",
      ContentType: "application/json;charset=utf-8",
      data: data
    }).then(res => {
      if (res.errcode == 0) {
        this.setData({
          personList: res.data.items
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
  // 获取项目工种
  getWorkType() {
    let data = {
      projectId: wx.getStorageSync("projectId")
    }
    fetch({
      url: "/worker/worktype",
      ContentType: "application/json; charset=utf-8",
      data: data
    }).then(res => {
      if (res.errcode == 0) {
        this.setData({
          wordTypeList: res.data
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
  // 下拉刷新
  onPullDownRefresh() {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1500);
    this.setData({
      skip: 0
    })
    this.getPersonByName()
    this.getWorkType()
  },
  // 上滑加载更多
  onReachBottom() {
    this.setData({
      skip: this.data.skip + this.data.limit
    })
    let data = {
      projectId: wx.getStorageSync("projectId"),
      skip: this.data.skip,
      limit: this.data.limit,
      name: this.data.searchValue
    }
    fetch({
      url: "/worker/project",
      ContentType: "application/json;charset=utf-8",
      data
    }).then(res => {
      if (res.errcode == 0) {
        if (res.data.items && res.data.items.length > 0) {
          this.setData({
            personList: this.data.personList.concat(res.data.items)
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