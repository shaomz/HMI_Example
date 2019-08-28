var app = getApp()
var amapFile = require('../../libs/amap-wx.js')
var config = require('../../libs/config.js')
const plugin = requirePlugin("WechatSI")
const manager = plugin.getRecordRecognitionManager()
Page({
  data: {
    translatetext: "",
    recording: false,
    currenttext: "",
    button: "(●'◡'●) please speak",
    btn_color: "btn1",
    translate: false,
    send: false,
    weather: {},
    speak: false,
    biaozhi: false,
  },
  streamRecord: function (e) {
    manager.start({
      lang: 'en_US',
    })
    this.setData({
      recording: true,
      button: "(●'◡'●) I'm listening",
      btn_color: "btn2",
    })
  },
  streamRecordEnd: function (e) {
    if (!this.data.recording) {
      console.warn("has finished!")
      return
    }
    manager.stop()
    this.setData({
      recording: false,
      button: "(●'◡'●) please speak",
      btn_color: "btn1",
    })
  },
  initRecord: function () {
    manager.onRecognize = (res) => {
      let text = res.result
      this.setData({
        currenttext: text,
      })
    }
    manager.onStop = (res) => {
      let text = res.result
      if (text == '') {
        return
      }
      this.setData({
        currenttext: text,
      })
      this.translateTextAction()
    }
  },

  translateTextAction: function () {
    this.setData({
      translate: true,
    })
    let lfrom = 'zh_CN'
    let lto = 'en_US'
    plugin.translate({
      lfrom: lfrom,
      lto: lto,
      content: this.data.currenttext,
      tts: true,
      success: (resTrans) => {
        let text = resTrans.result
        this.setData({
          translatetext: text,
        })
        console.log(text)
        this.setData({
          translate: false,
          send: true,
        })
        if (text == "How's the weather.") {
          var weather = this.data.weather
          this.textToSpeech("今天天气为" + weather.weather.data + "温度为" + weather.temperature.data + "度，湿度为" + weather.humidity.data)
        }
        if (text.substring(0, 4) == "Stop") {
          wx.connectSocket({
            url: 'ws://192.168.43.91:9002',
          })
        }
        if (text == "Go on." || text == "Please stop.") {
          wx.connectSocket({
            url: 'ws://192.168.43.138:9004',
          })
        }
        else {
          wx.connectSocket({
            url: 'ws://192.168.43.91:9001',
          })
        }
        setTimeout(function () {
          wx.sendSocketMessage({
            data: text,
          })
        }, 1500)
        this.setData({
          send: false,
        })
        setTimeout(function () {
          wx.closeSocket({
          })
        }, 1500)
        // wx.playBackgroundAudio({
        //   dataUrl: resTrans.filename,
        //   title: '',
        // })
        if (text == "Open the camera.") {
          this.setData({
            biaozhi: true,
          })
        }
      },
    })
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
    setTimeout(function () { }, 10000)
    this.setData({
      speak: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initRecord()
    var that = this
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getWeather({
      success: function (data) {
        that.setData({
          weather: data
        });
        console.log(data)
      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
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

  }
})