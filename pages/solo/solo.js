const app = getApp()

Page({
  data: {
    session:"",
    count:0,
    current:1,
    players:{},
  },
  onLoad: function () {
    let that = this;
    wx.request({
      url: app.globalData.host + 'session/count',
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: res => {
        console.log(res);
        that.setData({
          count: res.data
        })
      }
    });

    wx.request({
      url: app.globalData.host + 'session/order?order='+that.data.current,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: res => {
        let data = res.data[0];
        let _session = data.group_name + "-" + data.session;
        that.setData({
          session: _session,
          players: res.data
        })
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  tabTechnical:function (event){
    let that = this;
    let data = event.currentTarget.dataset;
    let player = data.player;
    let type = data.type;
    let operate = data.operate;
    let url = "session/technical?";
    if (operate == 2) {
      url = "session/subtract?";
    }
    url = url + 'name=' + player.name + "&type=" + type + "&session=" + player.session+"&level="+player.level;
    wx.request({
      url: app.globalData.host + url,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: res => {
        that.onLoad();
      }
    });
  },
  tapLeft:function() {
    let that = this;
    let _current = that.data.current - 1;
    if (_current == 0) {
      _current = 1;
    }
    wx.request({
      url: app.globalData.host + 'session/order?order=' + _current,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: res => {
        let data = res.data[0];
        let _session = data.group_name + "-" + data.session;
        that.setData({
          session: _session,
          players: res.data,
          current: _current
        })
      }
    });
  },
  tapRight:function() {
    let that = this;
    let _current = that.data.current + 1;
    if (_current > that.data.count) {
      _current = that.data.count;
    }
    wx.request({
      url: app.globalData.host + 'session/order?order=' + _current,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: res => {
        let data = res.data[0];
        let _session = data.group_name + "-" + data.session;
        that.setData({
          session: _session,
          players: res.data,
          current: _current
        })
      }
    });
  },
  tapEnd:function() {
    let that = this;
    let level = that.data.players[0].level;
    wx.request({
      url: app.globalData.host + 'session/rise?level=' + level,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: res => {
        wx.request({
          url: app.globalData.host + 'session/count',
          header: {
            "Content-Type": "application/json"
          },
          method: "GET",
          success: res => {
            that.setData({
              count: res.data
            })
          }
        });
      }
    });

    
  }
});