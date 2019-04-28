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
        "Content-Type": "applciation/json"
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
        "Content-Type": "applciation/json"
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
      url: app.globalData.host + 'main/team?team=' + "正赛",
      header: {
        "Content-Type": "applciation/json"
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