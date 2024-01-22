// pages/search/search.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cityLists: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  selectCity: function (e) {
    const { id, name } = e.currentTarget.dataset.city;
    const cityList = wx.getStorageSync("cities") || [];
    console.log({ id, name });
    wx.setStorage({
      key: "cities",
      data: [...cityList, { id, name }],
    });
    wx.switchTab({
      url: "../user/user",
    });
  },
  toSearch: function (e) {
    app.Api.sendRequest("https://geoapi.qweather.com/v2/city/lookup", {
      location: e.detail.value,
      key: "ed6456e6266d4e6bb5155e1cbd9547a9",
    }).then((res) => {
      if (res.data.code === "200") {
        this.setData({
          cityLists: res.data.location,
        });
      }
    });
  },
});
