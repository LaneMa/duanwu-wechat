//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   players:{},
   groups:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that = this;
    wx.request({
      url: app.globalData.host + 'players',
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: res => {
        that.setData({
          players: res.data
        });
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  intoGroups:function(e) {
    wx.request({
      url: app.globalData.host + '',
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: res => {
        console.log(res);
      }
    })
  }
})
