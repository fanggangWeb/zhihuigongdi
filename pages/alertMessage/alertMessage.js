//获取应用实例
const app = getApp()
import { fetch, apiUrl } from '../../utils/fetch'
//Page Object
Page({
  data: {
    dataList: [
      {
        type: 1, // 1安全帽 2人员闯入 3人群聚集 4火灾识别 5渣土车 6边界预警 7物料堆放
        isRead: 0, // 0未读 1已读
        title: "安全帽识别预警",
        time: "6分钟前",
        content: "A区有人员闯入，于今日9:30进入，尚未离开呀呀呀"
      }, {
        type: 2, // 反潜
        isRead: 1, 
        title: "人员闯入预警",
        time: "6分钟前",
        content: "A区有人员闯入，于今日9:30进入，尚未离开呀呀呀"
      }, {
        type: 3, 
        isRead: 1, 
        title: "人群聚集预警",
        time: "6分钟前",
        content: "A区有人员闯入，于今日9:30进入，尚未离开呀呀呀"
      }, {
        type: 4, 
        isRead: 1, 
        title: "火灾识别预警",
        time: "6分钟前",
        content: "A区有人员闯入，于今日9:30进入，尚未离开呀呀呀"
      }, {
        type: 5, 
        isRead: 1, 
        title: "渣土车识别预警",
        time: "6分钟前",
        content: "A区有人员闯入，于今日9:30进入，尚未离开呀呀呀"
      }, {
        type: 6, 
        isRead: 1, 
        title: "边界预警",
        time: "6分钟前",
        content: "A区有人员闯入，于今日9:30进入，尚未离开呀呀呀"
      }, {
        type: 7, 
        isRead: 0, 
        title: "物料堆放预警",
        time: "6分钟前",
        content: "A区有人员闯入，于今日9:30进入，尚未离开..."
      }, 
    ],
    dialogState: false,
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
  hadKnown () {
  }
});
  