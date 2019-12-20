//获取应用实例
const app = getApp()
import {
  fetch,
  imageURL
} from '../../utils/fetch'
//Page Object
Page({
  data: {
    videoState: false,
    fullScreenFlag: false,
    hunanTV: "rtmp://58.200.131.2:1935/livetv/hunantv",
    cameraFirst: {},
    cameraList: [],
    height: app.globalData.statusBarHeight + app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  onLoad: function (options) {
    this.getAllCameraInfo()
  },
  onReady: function () {
    // this.playerContext = wx.createLivePlayerContext('player', this);
    // console.log(this.playerContext)
    // this.playerContext.play();
  },
  onShow: function () {
    this.judgeFullScreen()
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onReachBottom: function () {

  },
  // onPullDownRefresh: function () {
  //   setTimeout(() => {
  //     wx.stopPullDownRefresh();
  //   }, 2000)
  // },
  statechange(e) {
    console.log(e)
  },
  error(e) {
    console.log("videoerror" + JSON.stringify(e))
    wx.showModal({
      title: '',
      content: JSON.stringify(e),
      showCancel: false
    });
  },
  startOrStop() {
    // console.log(this.playerContext)
    if (this.data.videoState == false) { // 暂停中显示着按钮，点击后播放
      this.playerContext.play();
    } else {
      this.playerContext.pause()
    }
    this.setData({
      videoState: !this.data.videoState
    })
  },
  // 点击单个的视频改变视频的地址
  changeVideo (e) {
    console.log(e.currentTarget.dataset.item)
    var item = e.currentTarget.dataset.item
    this.setData({
      cameraFirst: item
    })
    // this.playerContext.play();
  },
  // 获取所有的摄像头信息
  getAllCameraInfo () {
    let data = {
      projectId: wx.getStorageSync("projectId")
    }
    fetch({
      url: "/camera/project",
      ContentType: "application/json;charset=utf-8",
      data
    }).then(res => {
      if (res.errcode == 0) {
        this.setData({
          cameraList: res.data
        })
        if (res.data.length > 0) {
          this.setData({
            cameraFirst: res.data[0]
          })
        }
      } else {
        wx.showModal({
          title: '错误',
          content: res.msg,
          showCancel: false
        });
      }
    })
  },
  // 全屏或者缩小屏幕
  fullOrSmallScreen() {
    var that = this, device, deviceHeight, videoRect;
    // 获取设备的高度 以便与视频进行比较
    device = wx.getSystemInfoSync()
    deviceHeight = device.windowHeight
    
    var query = wx.createSelectorQuery();
    query.select('#player').boundingClientRect(function (rect) {
      // console.log(rect)
      videoRect = rect
      // 如果当前播放视频的长度或者宽度 大于或者等于当前设备的长度 说明已经全屏了
    if (videoRect.width >= deviceHeight || videoRect.height >= deviceHeight) {
      that.setData({
        fullScreenFlag: true
      })
    } else {
      that.setData({
        fullScreenFlag: false
      })
    }

    var fullScreenFlag = that.data.fullScreenFlag;
    if (fullScreenFlag) {
      fullScreenFlag = false;
    } else {
      fullScreenFlag = true;
    }
    if (fullScreenFlag) {
      // 全屏
      that.playerContext.requestFullScreen({
        direction: 90,
        success: res => {
          that.setData({
            fullScreenFlag: fullScreenFlag
          });
          console.log('我要执行了');
        },
        fail: res => {
          // console.log('fullscreen fail' + res);
        }
      });
    } else {
      //缩小
      that.playerContext.exitFullScreen({
        success: res => {
          that.setData({
            fullScreenFlag: fullScreenFlag
          });
        },
        fail: res => {
          // console.log('exit fullscreen success' + res);
        }
      });
    }
    }).exec();
    
  },
  // 安卓用户如果是不使用退出全屏按钮退出那么需要使用onShow来判断全屏状态 显示对应的样式
  judgeFullScreen () {
    var that = this, device, deviceHeight, videoRect;
    // 获取设备的高度 以便与视频进行比较
    device = wx.getSystemInfoSync()
    deviceHeight = device.windowHeight
    
    var query = wx.createSelectorQuery();
    query.select('#player').boundingClientRect(function (rect) {
      // console.log(rect)
      videoRect = rect
      // 如果当前播放视频的长度或者宽度 大于或者等于当前设备的长度 说明已经全屏了
      if (videoRect.width >= deviceHeight || videoRect.height >= deviceHeight) {
        that.setData({
          fullScreenFlag: true
        })
      } else {
        that.setData({
          fullScreenFlag: false
        })
      }
    })
  }
  
});