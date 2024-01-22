// pages/home/home.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    weatherData: {},
    cityInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCurrentCity();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const cityInfo = wx.getStorageSync("defaultCity");
    if (cityInfo) {
      this.getWeatherData();
    } else {
      this.getCurrentCity();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  getCurrentCity: function () {
    app.Api.getLocation()
      .then((res) => {
        const { latitude, longitude } = res;
        app.Api.sendRequest("https://geoapi.qweather.com/v2/city/lookup", {
          location: longitude + "," + latitude,
          key: "ed6456e6266d4e6bb5155e1cbd9547a9",
        }).then((res) => {
          const location = res.data.location[0];
          wx.setStorageSync("defaultCity", {
            cityName: `${location.adm2} ${location.name}`,
            cityId: location.id,
          });
          this.getWeatherData();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getWeatherData: function () {
    const cityInfo = wx.getStorageSync("defaultCity");
    app.Api.sendRequest("https://devapi.qweather.com/v7/weather/now", {
      location: cityInfo.cityId,
      key: "ed6456e6266d4e6bb5155e1cbd9547a9",
    }).then((res) => {
      console.log("weather", res);
      this.setData({
        weatherData: { ...res.data.now, updateTime: res.data.updateTime },
        cityInfo,
      });
    });
  },
});
