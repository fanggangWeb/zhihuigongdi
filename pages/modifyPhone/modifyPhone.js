//获取应用实例
const app = getApp()
import { fetch, apiUrl } from '../../utils/fetch'
//Page Object
Page({
  data: {
    errorMessage: "",
    originPhone: "",
    nowPhone: "",
    smsCode: "",
    smsText: "发送验证码", // 发送验证码
    smsState: true, // 当前的发送验证码的状态
    height: app.globalData.statusBarHeight + app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
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
  originPhoneInput (e) {
    // console.log(e.detail.value)
    this.setData({
      originPhone: e.detail.value
    })
  },
  nowPhoneInput (e) {
    this.setData({
      nowPhone: e.detail.value
    })
  },
  smscodeInput (e) {
    this.setData({
      smsCode: e.detail.value
    })
  },
  toLogin () {
    this.setData({
      errorMessage: ""
    })
    if (!(/^1[123456789]\d{9}$/.test(this.data.originPhone))) {
      this.setData({
        errorMessage: "请输入格式正确的原电话"
      })
      return false
    }
    if (!(/^1[123456789]\d{9}$/.test(this.data.nowPhone))) {
      this.setData({
        errorMessage: "请输入格式正确的新电话"
      })
      return false
    }
    if (!this.data.smsCode) {
      this.setData({
        errorMessage: "请输入验证码"
      })
      return false
    }
    let data = {
    }
  },
  // 发送短信的按钮
  sendMsg () {
    this.setData({
      errorMessage: ""
    })
    if (!(/^1[123456789]\d{9}$/.test(this.data.originPhone))) {
      this.setData({
        errorMessage: "请输入格式正确的原电话"
      })
      return false
    }
    if (!this.data.smsState) {
      return false
    }
    var time = 61,
    that = this
    this.cutDown(time)
  },
  // 倒计时功能的封装
  cutDown (time) {
    if (time == 61) {
      time--
      this.setData({
        smsState: false,
        smsText: `${time}秒后重试`
      })
    } else if (time > 1 && time< 61) {
      time--
      this.setData({
        smsState: false,
        smsText: `${time}秒后重试`
      })
    } else {
      this.setData({
        smsState: true,
        smsText: "发送验证码"
      })
      return
    }
    setTimeout(() => {
      this.cutDown(time)
    }, 1000);
  }
});
  