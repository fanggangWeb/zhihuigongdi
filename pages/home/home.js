//获取应用实例
const app = getApp()
import { fetch, imageURL } from '../../utils/fetch'
//Page Object
Page({
  data: {
    skip: 0,
    limit: 100,
    projectList: [],
    projectIndex: "",
    topMenuList: [
      {
        image: "../../assets/images/home/detail-icon.png",
        path: "../projectDetail/projectDetail",
        name: "项目详情"
      },
      {
        image: "../../assets/images/home/attendence-icon.png",
        path: "../attendence/attendence",
        name: "项目考勤"
      },
      {
        image: "../../assets/images/home/person-icon.png",
        path: "../personManage/personManage",
        name: "人员管理"
      },
      {
        image: "../../assets/images/home/person-statistics.png",
        path: "../personStatistics/personStatistics",
        name: "人员统计"
      }
    ],
    workMenuList: [
      {
        image: "../../assets/images/home/abnormal-person.png",
        path: "../personAlarm/personAlarm",
        name: "人员告警"
      },
      {
        image: "../../assets/images/home/video-monitor.png",
        path: "../videoMonitor/videoMonitor",
        name: "视频监控"
      },
      {
        image: "../../assets/images/home/environment-monitor.png",
        path: "../environmentMonitor/environmentMonitor",
        name: "环境监测"
      },
      // {
      //   image: "../../assets/images/home/location.png",
      //   path: "../",
      //   name: "定位系统"
      // },
      {
        image: "../../assets/images/home/device-inspection.png",
        path: "../deviceInspect/deviceInspect",
        name: "设备检测"
      },
      {
        image: "../../assets/images/home/alert-message.png",
        path: "../alertMessage/alertMessage",
        name: "预警消息",
        type: "switch"
      },
      // {
      //   image: "../../assets/images/home/device-statistics.png",
      //   path: "",
      //   name: "设备统计"
      // }
    ],
    height: app.globalData.statusBarHeight + app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  onLoad: function (options) {
    this.projectList()
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {

  },
  onUnload: function () {
    
  },
  // 页面首次加载 设置默认的项目
  setDefaultProject (projectList) {
    var projectId = wx.getStorageSync("projectId");
    if (projectList && projectList.length>0) {
      projectList.forEach((e,i) => {
        if (e.guid == projectId) {
          this.setData({
            projectIndex: String(i)
          })
        }
      })
    }
  },
  // 当选择的项目
  projectChange (e) {
    // console.log(e)
    this.setData({
      projectIndex: e.detail.value
    })
    wx.setStorageSync("projectId", this.data.projectList[e.detail.value].guid);
  },
  menuGo (e) {
    // console.log(e)
    if (e.currentTarget.dataset.item.type == "switch") {
      wx.switchTab({
        url: e.currentTarget.dataset.item.path
      });
    } else {
      wx.navigateTo({
        url: e.currentTarget.dataset.item.path,
      });
    }
    
  },
  // 获取当前用户的所有列表
  projectList () {
    let data = {
      skip: this.data.skip,
      limit: this.data.limit
    }
    fetch({
      url: "/user/projects",   
      ContentType: "application/json;charset=utf-8",
      data
    }).then(res => {
      if (res.errcode == 0) {
        this.setData({
          projectList: res.data.items
        })
        this.setDefaultProject(res.data.items)
      } else {
        wx.showModal({
          title: '错误',
          content: res.msg,
        });
      }
    })
  },
  
});