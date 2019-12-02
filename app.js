//app.js
App({
  onLaunch: function (options) {
    // 判断是否由分享进入小程序
    if (options.scene == 1007 || options.scene == 1008) {
      this.globalData.share = true
    } else {
      this.globalData.share = false
    };
    // 授权录音
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success() {
    //         }
    //       })
    //     }
    //   }
    // })
    // 获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
    wx.getSystemInfo({
      success: (res) => {
        // console.log(res)
        this.globalData.height = res.statusBarHeight
        this.globalData.statusBarHeight = res.statusBarHeight;
        this.globalData.headerHeight = res.system.indexOf('iOS') > -1 ? 44 : 48;
      },
      fail(err) {
        // console.log(err);
      }
    })
  },
  // 利用defineProperty观察globalData内propertyName的数据变化，数据发生变化执行传入的callback
  watch: function (callback, propertyName) {
    var AppData = this.globalData;
    Object.defineProperty(AppData, propertyName, {
      configurable: true,
      enumerable: true,
      set: function (newValue) {
        console.log(newValue)
        this["_"+propertyName] = newValue;
        callback(newValue);
      },
      get: function () {
        // 获取某项属性时触发
        return this["_"+propertyName]
      }
    })
  },
  globalData: {
    share: false, // 分享默认为false
    height: 0, // 导航栏高度
    statusBarHeight: 0, //导航的高度
    headerHeight: 0, //头部的高度
    textName: 2
  }
})