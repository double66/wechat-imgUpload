//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dataList:[],
  },
  onLoad: function () {
  },
  onShow:function(){
      if (typeof this.getTabBar === 'function' &&
          this.getTabBar()) {
          this.getTabBar().setData({
              selected: 0
          })
      }
    this.getImgList()
  },

  getImgList(){
    let that = this
    const db = wx.cloud.database()
    db.collection('imgList').orderBy('time','desc').get({
      success: function (res) {
        console.log(res)
        that.setData({
          dataList:res.data
        })
      }
    })
  },

  bindDetail(e){
    const {id} = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/picDetail/index?id='+id
    })
  },

})
