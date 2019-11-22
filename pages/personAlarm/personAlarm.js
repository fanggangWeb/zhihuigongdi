//获取应用实例
const app = getApp()
import { fetch, apiUrl } from '../../utils/fetch'
//Page Object
Page({
  data: {
    dialogState: true,
    dataList: [
      {
        type: 1, // 1反潜 2超时
        isRead: 0, // 0未读 1已读
        title: "防返潜分析",
        time: "6分钟前",
        content: "张得志于11-05 13:00,11-05 14:05多次进老师的罚款扣分实得分"
      }, {
        type: 2, 
        isRead: 0, // 未读
        title: "超时分析",
        time: "6分钟前",
        content: "张得志于11-05 13:00,11-05 14:05多次进老师的罚款扣分实得分"
      }, {
        type: 1, // 反潜
        isRead: 1, 
        title: "防返潜分析",
        time: "6分钟前",
        content: "张得志于11-05 13:00,11-05 14:05多次进老师的罚款扣分实得分"
      }, {
        type: 2, 
        isRead: 1, 
        title: "超时分析",
        time: "6分钟前",
        content: "张得志于11-05 13:00,11-05 14:05多次进老师的罚款扣分实得分"
      }
    ],
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

  }
});
  