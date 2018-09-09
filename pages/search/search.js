// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityLists:[]
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
  selectCity: function(e) {
    const {cid,location} = e.currentTarget.dataset.city;
    const cityList = wx.getStorageSync('cities') || [];
    wx.setStorage({
      key:'cities', 
      data:[
        ...cityList,
        {cid,location}
    ]});
    wx.switchTab({
      url: '../user/user'
    })
  },
  toSearch: function(e) {
    wx.request({
      url: 'https://search.heweather.com/find',
      data: {
        location: e.detail.value,
        key: 'ed6456e6266d4e6bb5155e1cbd9547a9'
      },
      success: (res) => {
        if(res.data.HeWeather6[0].status === 'ok'){
          this.setData({
            cityLists: res.data.HeWeather6[0].basic
          })
        }
      }
    })
  }
})