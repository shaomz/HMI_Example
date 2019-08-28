// pages/convenient_life/convenient_life.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    biaozhi: true,
    b1: "item1",
    b2: "item1",
    b3: "item1",
    messages: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.onSocketMessage(function(res) {
      var mas = that.data.messages
      mas.push(res.data)
      that.setData({
        messages: mas
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      b1: "item1",
      b2: "item1",
      b3: "item1",
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  n1: function() {
    var biaozhi = this.data.biaozhi
    if (biaozhi) {
      wx.connectSocket({
        url: 'ws://192.168.43.91:9003',
      })
      setTimeout(function() {
        wx.sendSocketMessage({
          data: 'on',
        })
      }, 1500)
      this.setData({
        b1: "item2",
        biaozhi: false
      })
      setTimeout(function () {
        wx.closeSocket({
        })
      }, 1500)
    } else {
      wx.connectSocket({
        url: 'ws://192.168.43.91:9003',
      })
      setTimeout(function() {
        wx.sendSocketMessage({
          data: 'off',
        })
      }, 1500)
      this.setData({
        b1: "item1",
        biaozhi: true
      })
      setTimeout(function () {
        wx.closeSocket({
        })
      }, 1500)
    }
  },
  n2: function() {
    this.setData({
      b2: "item2"
    })
    // setTimeout(function () { }, 1000)
    wx.navigateTo({
      url: '../weather/weather'
    })
  },
  n3: function() {
    this.setData({
      b3: "item2"
    })
    wx.navigateTo({
      url: '../navigation1/navigation1'
    })
  }
})