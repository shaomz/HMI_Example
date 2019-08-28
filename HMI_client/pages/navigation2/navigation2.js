var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "../../imgs/mapicon_navi_s.png",
      id: 0,
      latitude: 31.288172,
      longitude: 121.218153,
      width: 23,
      height: 33
    }, {
      iconPath: "../../imgs/mapicon_navi_e.png",
      id: 0,
      latitude: 31.293559,
      longitude: 121.194404,
      width: 24,
      height: 34
    }],
    distance: '',
    polyline: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getDrivingRoute({
      origin: '121.218153, 31.288172',
      destination: '121.194404, 31.293559',
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }

      }
    })
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

  },
  goDetail: function () {
    wx.navigateTo({
      url: '../navigation3/navigation3'
    })
  }
})