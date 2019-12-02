//获取应用实例
const app = getApp()
import { fetch, apiUrl } from '../../utils/fetch'
//Page Object
Page({
  data: {
    errorMessage: "",
    originPwd: "", // 原密码
    nowPwd: "", // 新密码
    pwdAgain: "", // 再次输入的密码
  },
  //options(Object)
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
  originPwdInput (e) {
    // console.log(e.detail.value)
    this.setData({
      originPwd: e.detail.value
    })
  },
  nowPwdInput (e) {
    this.setData({
      nowPwd: e.detail.value
    })
  },
  pwdAgainInput (e) {
    this.setData({
      pwdAgain: e.detail.value
    })
  },
  toModify () {
    this.setData({
      errorMessage: ""
    })
    if (this.data.originPwd == "") {
      this.setData({
        errorMessage: "请输入原始密码"
      })
      return
    }
    if (this.data.nowPwd == "") {
      this.setData({
        errorMessage: "请输入新密码"
      })
      return
    }
    if (this.data.pwdAgain == "") {
      this.setData({
        errorMessage: "请再次输入新密码"
      })
      return
    }
    if (this.data.nowPwd != this.data.pwdAgain) {
      this.setData({
        errorMessage: "两次输入的新密码不一致"
      })
      return
    }
    let data = {
      oldPassword: this.data.originPwd,
      newPassword: this.data.nowPwd
    }
    fetch({
      url: "/user/updatePassword",
      ContentType: "application/json;charset=utf-8",
      data
    }).then(res => {
      if (res.errcode == 0) {
        wx.showToast({
          title: '密码修改成功',
          icon: 'success',
          duration: 2500
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 2500);
      } else {
        wx.showModal({
          title: '错误',
          content: res.msg,
          showCancel: false
        });
      }
    })
  },
  // 发送短信的按钮
  sendMsg () {
    if (!this.data.originPwd) {
      this.setData({
        errorMessage: "请输入原电话"
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