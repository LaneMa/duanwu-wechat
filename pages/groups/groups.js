// pages/groups/groups.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playersA:{},
    playersB:{},
    playersC:{},
    playersD:{},
    players:{},
    flag:0
  },
  onLoad: function() {
    let that = this;
    wx.request({
      url: app.globalData.host + 'players/suspend',
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: res => {
        let _playersA = [];
        let _playersB = [];
        let _playersC = [];
        let _playersD = [];
        for (var index in res.data) {
          let player = {};
          player = res.data[index];
          if (index % 4 == 1) {
            _playersA.push(player.name);
          } else if (index % 4 == 2) {
            _playersB.push(player.name);
          } else if (index % 4 == 3) {
            _playersC.push(player.name);
          } else if (index % 4 == 0) {
            _playersD.push(player.name);
          }
        }
        that.setData({
          playersA: _playersA,
          playersB: _playersB,
          playersC: _playersC,
          playersD: _playersD
        });
      }
    })
  },
  start: function() {
    let that = this;
    wx.request({
      url: app.globalData.host + 'players/suspend',
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: res => {
        var flag = setInterval(function(){
          let _playersA = [];
          let _playersB = [];
          let _playersC = [];
          let _playersD = [];
          let players = res.data.slice(0);
          let data = [];
          while (players.length > 0) {
            let range = players.length;
            let idx = Math.floor(Math.random() * range);
            data.push(players.splice(idx,1));
          }
         
          for (var index in data) {
            let player = {};
            player = data[index][0];
            if (index % 4 == 1) {
              _playersA.push(player.name);
            } else if (index % 4 == 2) {
              _playersB.push(player.name);
            } else if (index % 4 == 3) {
              _playersC.push(player.name);
            } else if (index % 4 == 0) {
              _playersD.push(player.name);
            }
          }
          that.setData({
            playersA: _playersA,
            playersB: _playersB,
            playersC: _playersC,
            playersD: _playersD
          });
        }, 150);
        that.setData({
          flag: flag
        })
      }
    });
  },
  stop: function() {
    let that = this;
    wx.request({
      url: app.globalData.host + 'group',
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",
      success: res => {
        clearInterval(that.data.flag);
        let _playersA = [];
        let _playersB = [];
        let _playersC = [];
        let _playersD = [];
        for (var index in res.data) {
          var player = res.data[index];
          if(player.group_name == "A") {
            _playersA.push(player.player_name);
          } else if (player.group_name == "B") {
            _playersB.push(player.player_name);
          } else if (player.group_name == "C") {
            _playersC.push(player.player_name);
          } else if (player.group_name == "D") {
            _playersD.push(player.player_name);
          }
        }
        that.setData({
          playersA: _playersA,
          playersB: _playersB,
          playersC: _playersC,
          playersD: _playersD
        });
      }
    });
  }
  
})