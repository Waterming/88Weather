function sendRequest(url, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: Object.assign({}, params),
      header: { "Content-Type": "json" },
      success: resolve,
      fail: reject,
    });
  });
}
function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: resolve,
      fail: reject,
    });
  });
}
function getLocation() {
  return new Promise((resolve, reject) => {
    wx.getLocation({ success: resolve, fail: reject });
  });
}

function showModal(obj) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: obj.title || "",
      content: obj.content,
      success: (res) => {
        if (res.confirm) {
          resolve(obj.data);
        }
      },
      fail: obj.fail,
    });
  });
}

module.exports = {
  sendRequest,
  getUserInfo,
  getLocation,
  showModal,
};
