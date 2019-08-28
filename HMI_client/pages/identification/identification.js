// pages/identification/identification.js
const plugin = requirePlugin("WechatSI")
// setTimeout(function () {},6000)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    face_result: '0',
    btn: 'Face recognition',
    speed: "0.17 m/s",
    distance: "0.17 m",
    speak: false,
  },

  textToSpeech: function (res) {
    this.setData({
      speak: true,
    })
    plugin.textToSpeech({
      lang: 'zh_CN',
      content: res,
      success: (resTrans) => {
        wx.playBackgroundAudio({
          dataUrl: resTrans.filename,
          title: '',
        })
      },
    })
    setTimeout(function () {}, 10000)
    this.setData({
      speak: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.connectSocket({
      url: 'ws://192.168.43.91:9001',
    })
    wx.onSocketMessage(function (res) {
      var mas = res.data
      if (mas == '1') {
        that.setData({
          btn: 'Successful!',
          face_result: mas
        })
      }
      if (mas.substring(0, 3)=='dis'){
        that.setData({
          distance: mas.substring(3)
        })
      }
      if (mas.substring(0, 3) == 'spe') {
        that.setData({
          speed: mas.substring(3)
        })
      }
      if (mas.substring(0, 3) == 'war') {
        if (that.data.speak == false) {
          that.textToSpeech(mas.substring(3))
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

  face_detect: function () {
    var that = this
    if (that.data.face_result == '1') {
      wx.closeSocket({})
      wx.switchTab({
        url: '../vehicle_service/vehicle_service',
      })
    }
    if (that.data.face_result == '0') {
      that.setData({
        face_result: '2'
      })
      wx.sendSocketMessage({
        data: 'face_detect',
      })
    }
  }
})