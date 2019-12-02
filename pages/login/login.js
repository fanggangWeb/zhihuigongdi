//获取应用实例
const app = getApp()
import { fetch, apiUrl } from '../../utils/fetch'
//Page Object
Page({
  data: {
    errorMessage: "",
    account: "",
    password: ""
  },
  //options(Object)
  onLoad: function(options) {
    
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  accountInput (e) {
    // console.log(e.detail.value)
    this.setData({
      account: e.detail.value
    })
  },
  passInput (e) {
    this.setData({
      password: e.detail.value
    })
  },
  toLogin () {
    this.setData({
      errorMessage: ""
    })
    if (this.data.account == "") {
      this.setData({
        errorMessage: "请输入账号"
      })
      return
    }
    if (this.data.password == "") {
      this.setData({
        errorMessage: "请输入密码"
      })
      return
    }
    let data = {
      userName: this.data.account,
      password: this.data.password
    }
    // 登录
    fetch({
      url: "/user/login",
      data
    }).then(res => {
      // console.log(res)
      if (res.errcode == 0) {
        wx.setStorageSync("TOKEN", res.data.token)
        // 获取用户信息
        fetch({
          url: "/user/info"
        }).then(res => {
          if (res.errcode == 0) {
            wx.setStorageSync("userInfo", res.data);
            wx.setStorageSync("projectId", res.data.projectId)
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
            });
            setTimeout(() => {
              wx.reLaunch({
                url: '../home/home'
              });
            }, 2000);
          } else {
            wx.showModal({
              title: '错误',
              content: res.msg,
              showCancel: false
            });
          }
        })
      } else {
        wx.showModal({
          title: '错误',
          content: res.msg,
        });
      }
    })
  }
});
  