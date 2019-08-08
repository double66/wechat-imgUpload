//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'double-001',
      traceUser: true
    })

  },
  globalData: {
    userInfo: null
  }
})
