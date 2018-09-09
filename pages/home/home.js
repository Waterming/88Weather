// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weatherData: {}
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
    this.getWeatherData();
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
  getWeatherData: function() {
    const cityId = wx.getStorageSync('defaultCity');
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/now',
      data: {
        location: cityId,
        key: 'ed6456e6266d4e6bb5155e1cbd9547a9'
      },
      success: (res) => {
        this.setData({
          weatherData: res.data.HeWeather6[0]
        })
      }
    })
  }
})