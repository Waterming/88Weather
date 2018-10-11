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
    this.getCurrentCity()
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
  getCurrentCity: function() {
    app.Api
    .getLocation()
    .then(res => {
      const { latitude, longitude } = res;
      return app.Weather.getCurrentCity(longitude + ','+latitude)
    })
    .then(res => {
      const cityId = wx.getStorageSync('defaultCity');
      const { cid, location } = res.data.HeWeather6[0].basic[0];
      if (cityId !== cid){
        return app.Api.showModal({ content: '是否切换到当前城市：'+location, data: cid })
      }else {
        return Promise.reject();
      }
    })
    .then(res => {
      wx.setStorageSync('defaultCity', res);
      this.getWeatherData();
    })
    .catch(err => {
      
    })
  },
  getWeatherData: function() {
    const cityId = wx.getStorageSync('defaultCity');
    app.Api.sendRequest('https://free-api.heweather.com/s6/weather/now', {
      location: cityId,
      key: 'ed6456e6266d4e6bb5155e1cbd9547a9'})
      .then(res => {
        this.setData({
          weatherData: res.data.HeWeather6[0]
        })
      })
  }
})