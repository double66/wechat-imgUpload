// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.isIphoneX,
      selected: 0,
      color:"#cdcdcd",
      selectedColor:"#47da09",
      backgroundColor:"#fff",
      list: [{
          pagePath: "/pages/index/index",
          iconPath: "/common/tabbar/home.png",
          selectedIconPath: "/common/tabbar/home-def.png",
          text: "首页"
      }, {
          pagePath: "/pages/upload/index",
          iconPath: "/common/tabbar/add.png",
          isSpecial: true,
          text: "发布"
      }, {
          pagePath: "/pages/mine/index",
          iconPath: "/common/tabbar/mine.png",
          selectedIconPath: "/common/tabbar/mine-def.png",
          text: "我的"
      }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
      switchTab(e) {
          const data = e.currentTarget.dataset
          const url = data.path
          const type= data.type
          // console.log(type,url, data.index)
          wx[type]({url})
          if(type === 'navigateTo') return;
          this.setData({
              selected: data.index
          })
      }
  }
})
