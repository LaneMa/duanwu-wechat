const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ["正赛", "狼群", "湘北"],
    title: "正赛",
    current: 1,
    game: {},
    quarter: 0,
    hiddenModal:true,
    players:{},
    alive:'',
    type:0,
    operate:1
  },

  tapLeft: function () {
    let that = this;
    let _current = that.data.current - 1;
    if (_current == 0) {
      _current = 1;
    }
    let _team = that.data.titles[_current - 1];
    wx.request({
      url: app.globalData.host + 'main/team?team=' + _team,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: res => {
        that.setData({
          title: _team,
          game: res.data,
          current: _current
        })
      }
    });
  },

  tapRight: function () {
    let that = this;
    let _current = that.data.current + 1;
    if (_current > that.data.titles.length) {
      _current = that.data.titles.length;
    }
    let _team = that.data.titles[_current - 1];
    wx.request({
      url: app.globalData.host + 'main/team?team=' + _team,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: res => {
        that.setData({
          title: _team,
          game: res.data,
          current: _current
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this;
    let _current = that.data.current - 1;
    let _team = that.data.titles[_current];
    wx.request({
      url: app.globalData.host + 'main/quarter',
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: res => {
        let _quarter = res.data;
        if (_quarter == 0) {
          _quarter += 1;
          wx.request({
            url: app.globalData.host + 'main/quarter/set?quarter=' + _quarter,
            header: {
              "Content-Type": "application/json"
            },
            method: "GET",
            success: res => {

            }
          });
        }
        that.setData({
          quarter: _quarter,
        })
      }
    });
    wx.request({
      url: app.globalData.host + 'main/team?team=' + "正赛",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: res => {
        that.setData({
          title: _team,
          game: res.data
        })
      }
    });
  },

  tabQuarter: function (event) {
    let that = this;
    let _quarter = that.data.quarter + 1;
    let data = event.currentTarget.dataset;
    let operate = data.operate;
    if (operate == 1) {
      _quarter = that.data.quarter + 1;
    } else {
      _quarter = that.data.quarter - 1;
    }
    wx.request({
      url: app.globalData.host + 'main/quarter/set?quarter=' + _quarter,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: res => {
        that.setData({
          quarter: _quarter,
        })
      }
    });
  },
  tabTechnical: function (event) {
    let that = this;
    let data = event.currentTarget.dataset;
    wx.request({
      url: app.globalData.host + "players/team?team=" + data.player.name,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: res => {
        that.setData({
          players:res.data
        });
      }
    });
    that.setData({
      hiddenModal:false,
      type:data.type,
      operate: data.operate
    })
    
  },
  tapRadio: function (event) {
    let that = this;
    let data = event.currentTarget.dataset;
    that.setData({
      alive:data.player
    })
  },
  modalCancel:function() {
    let that = this;
    that.setData({
      alive: '',
      hiddenModal:true
    })
  },
  modalConfirm: function() {
    let that = this;
    let data = that.data;
    if(!data.alive) {
      return;
    }
    let url = "main/increase?";
    if (data.operate == 2) {
      url = "main/reduce?";
    }
    url = url + 'name=' + data.alive + "&type=" + data.type + "&quarter=" + data.quarter;
    wx.request({
      url: app.globalData.host + url,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: res => {
        that.setData({
          alive: '',
          hiddenModal: true
        });
        that.onLoad();
      }
    });
    
  },
  tapEnd:function() {
    let that = this;
    wx.request({
      url: app.globalData.host + "main/over",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: res => {
        that.onLoad();
        wx.showModal({
          content: '比赛已结束',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
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