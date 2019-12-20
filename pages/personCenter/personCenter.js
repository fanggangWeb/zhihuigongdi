import { fetch } from "../../utils/fetch"
//Page Object
Page({
  data: {
    avatarUrl: "../../assets/images/center.png",
    userName: "",
    userPhone: ""
  },
  //options(Object)
  onLoad: function(options){
    
  },
  onReady: function(){
    
  },
  onShow: function(){
    this.fetchUserInfo()
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  modifyPhone () {
    wx.navigateTo({
      url: '../modifyPhone/modifyPhone'
    });
  },
  modifyPassword () {
    wx.navigateTo({
      url: '../modifyPassword/modifyPassword'
    });
  },
  // 获取登录的用户信息
  fetchUserInfo () {
    fetch({
      url: "/user/info"
    }).then(res => {
      if (res.errcode == 0) {
        this.setData({
          avatarUrl: res.data.Avatar || "../../assets/images/center.png",
          userName: res.data.name,
          userPhone: res.data.mobile
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
  // 退出登录
  logOut () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定退出该账户吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          fetch({
            url: "/user/logout",
          }).then(res => {
            if (res.errcode == 0) {
              wx.clearStorageSync();
              wx.showToast({
                title: '退出登录成功',
                icon: 'success',
                image: '',
                duration: 2500,
                mask: true
              });
              setTimeout(() => {
                wx.reLaunch({
                  url: '../login/login',
                });
              }, 2000)
              
            } else {
              wx.showToast({
                title: '已为您清除登录信息',
                icon: 'none',
                image: '',
                duration: 2500,
                mask: true
              });
              wx.clearStorageSync();
              setTimeout(() => {
                wx.reLaunch({
                  url: '../login/login',
                });
              }, 2000)
            }
          })
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
});