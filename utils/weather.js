function getCurrentCity(location) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://search.heweather.com/find',
      data: {
        location: location,
        key: 'ed6456e6266d4e6bb5155e1cbd9547a9'
      },
      success: resolve,
      fail: reject
    })
  })
}
module.exports = {
  getCurrentCity
}