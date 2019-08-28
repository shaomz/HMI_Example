// pages/customer_service/customer_service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [],
    yangshi: false,
    kaiguan: "已关闭",
    xiaoxi: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.onSocketMessage(function (res) {
      var mas = that.data.messages
      if (res.data == 'Stop the music.' || res.data == 'Stop the movie.'){}
      else      
      {
        mas.push(res.data)
        that.setData({
          messages: mas
        })
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
  input: function (e) {
    this.setData({ xiaoxi: e.detail.value })
  },
  qufan: function () {
    var ys = this.data.yangshi
    if (this.data.kaiguan == "已关闭") {
      this.setData({ kaiguan: "已开启", yangshi: !ys })
      wx.connectSocket({
        url: 'ws://192.168.43.91:9002',
      })
    }
    else {
      this.setData({ kaiguan: "已关闭", yangshi: !ys, messages: [] })
      wx.closeSocket({
      })
    }
  },
  send: function () {
    var that = this
    wx.sendSocketMessage({
      data: 'Me:'+that.data.xiaoxi,
    })
  }
})