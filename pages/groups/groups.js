// pages/groups/groups.js
import * as echarts from '../../ec-canvas/echarts';

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var data1 = {
    "name": "root",
    "children": [{
      "name": "a",
     // "symbolSize":[32,32],
      "symbol":"image://http://img1.imgtn.bdimg.com/it/u=1393987749,3422146058&fm=26&gp=0.jpg",
      "children": [{
        "name": "a1"
      }, {
        "name": "a2"
      }, {
        "name": "a3"
      }, {
        "name": "a4"
      }]
    }, {
      "name": "b",
      "children": [{
        "name": "b1"
      }, {
        "name": "b2"
      }, {
        "name": "b3"
      }, {
        "name": "b4"
      }]
    }, {
      "name": "c",
      "children": [{
        "name": "c1"
      }]
    }, {
      "name": "d",
      "children": [{
        "name": "d1"
      }]
    }]
  };

  var option = {
    series: [{
      type: 'tree',
      orient: 'BT',
      lineStyle:{
        curveness:0,
        width:1
      }, 

      initialTreeDepth: -1,
      layerPadding:5,
      nodePadding: 5,
      name: 'tree1',
      // rootLocation: { x: 'center', y: '10%' },

      data: [data1],

      // top: '5%',
      // left: '20%',
      // bottom: '2%',
      // right: '15%',

      symbolSize: 20,
      symbol: 'circle',

      label: {
        normal: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          color: 'black'
        }
      }

    }]
  };
  chart.setOption(option);
  return chart;
}
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
    flag:0,
    ec: {
      onInit: initChart
    }
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