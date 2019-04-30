// pages/data/data.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      titles:["单挑王","三分王","篮板王","冠军","MVP投票","MVP","技术统计"],
      title:"单挑王",
      titleIdx:0,
      data:{},
      tickets:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let index = that.data.titleIdx;
    var url = getUrl(index);
    wx.request({
      url: app.globalData.host + url,
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: res => {
        that.setData({
          data:res.data
        })
      }
    });

  },
  tapLeft: function () {
    let that = this;
    let index = that.data.titleIdx;
    if(index == 0) {
      return;
    }
    index--;
    var url = getUrl(index);
    wx.request({
      url: app.globalData.host + url,
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: res => {
        console.log(res);
        let _tickets = [];
        if (index == 4) {
          for (let i = 0; i < res.data.champion_players.length; i++) {
            let _ticket = {};
            _ticket.name = res.data.champion_players[i].name;
            _ticket.ticket = 0;
            _tickets.push(_ticket);
          }
        }
        that.setData({
          data: res.data,
          titleIdx: index,
          title: that.data.titles[index],
          tickets: _tickets 
        })
      }
    });
  },
  tapRight: function () {
    let that = this;
    let index = that.data.titleIdx;
    if (index == 6) {
      return;
    }
    index++;
    var url = getUrl(index);
    wx.request({
      url: app.globalData.host + url,
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: res => {
        console.log(res);
        let _tickets = [];
        if (index == 4) {
          for (let i = 0; i < res.data.champion_players.length; i++) {
            let _ticket = {};
            _ticket.name = res.data.champion_players[i].name;
            _ticket.ticket = 0;
            _tickets.push(_ticket);
          }
        }
        that.setData({
          data: res.data,
          titleIdx: index,
          title: that.data.titles[index],
          tickets: _tickets 
        })
      }
    });
  },

  setTicket: function (event) {
    let that = this;
    let data = event.currentTarget.dataset;
    let player = data.player;
    let type = data.type;
    let operate = data.operate;
    let _tickets = that.data.tickets;
    for (let i = 0; i < _tickets.length; i++) {
      if (_tickets[i].name == player) {
        if (operate == 1) {
          _tickets[i].ticket++;
        }
        if (operate == 2) {
          _tickets[i].ticket--;
        }
      }
    }
    that.setData({
      tickets: _tickets
    })
  },

  tapEnd: function () {
    let that = this;
    wx.request({
      url: app.globalData.host + "statistics/ticket",
      header: {
        "Content-Type": "applciation/x-www-form-urlencoded"
      },
      data: that.data.tickets,
      method: "POST",
      success: res => {
        
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

function getUrl(index) {
  var url = "statistics";
  if(index == 0) {
    url += "/solo";
  } else if(index == 1) {
    url += "/three";
  } else if(index == 2) {
    url += "/backboard";
  } else if(index == 3) {
    url += "/champion";
  } else if(index == 4){
    url += "/champion";
  } else if(index == 5){
    url += "/mvp";
  } else {
    url += "/statistics";
  }
  return url;
}