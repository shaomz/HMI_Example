// pages/index1/index1.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  guihua: function () {
    wx.navigateTo({
      url: '../navigation2/navigation2'
    })
  },
  input1: function (e) {
    var that = app
    if (e.detail.value == "同济大学嘉定校区") {
      that.globalData.start = [121.218153, 31.288172]
    }
  },
  input2: function (e) {
    var that = app
    if (e.detail.value == "上汽大众") {
      that.globalData.end = [121.194404, 31.293559]
    }
  }
})