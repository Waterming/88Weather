// pages/user/user.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    hasUserInfo: false,
    cities: [],
    defaultCity: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo.nickName) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
    } else if (this.data.canIUse) {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting["scope.userInfo"]) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            app.Api.getUserInfo().then((res) => {
              app.globalData.userInfo = res.userInfo;
              this.setData({
                hasUserInfo: true,
                userInfo: res.userInfo,
              });
            });
          }
        },
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDefaultData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setDefaultData();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.setStorage({
      key: "cities",
      data: this.data.cities,
    });
  },

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
  getDefaultData: function () {
    wx.getStorage({
      key: "cities",
      success: (res) => {
        console.log("111", res.data);
        if (res.data) {
          this.setData({
            cities: res.data,
          });
        }
      },
    });
    wx.getStorage({
      key: "defaultCity",
      success: (res) => {
        if (res.data) {
          this.setData({
            defaultCity: res.data.cityId,
          });
          app.globalData.cid = res.data.cityId;
        }
      },
    });
  },
  setDefaultData: function () {},
  todelete: function (e) {
    const data = this.data.cities.filter((item) => {
      return item.id !== e.currentTarget.id;
    });
    if (e.currentTarget.id === this.data.defaultCity) {
      this.setData({
        defaultCity: "",
      });
    }
    this.setData({
      cities: data,
    });
    wx.setStorageSync("cities", data);
  },
  switchChange: function (e) {
    const data = this.data.cities.filter((item) => {
      return item.id === e.currentTarget.id;
    });
    this.setData({
      defaultCity: data[0].id,
    });
    wx.setStorageSync("defaultCity", {
      cityId: data[0].id,
      cityName: data[0].name,
    });
  },
  addCity: function () {
    wx.navigateTo({
      url: "../search/search",
    });
  },
  toHome: function (e) {
    this.setData({
      defaultCity: e.currentTarget.id,
    });
    wx.switchTab({
      url: "../home/home",
    });
  },
});
