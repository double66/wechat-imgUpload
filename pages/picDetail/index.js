Page({
  data: {
      id:null,
      dataInfo:{},
      showIndex: 1, //0列表展示 1图片展示
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      current: 0,
  },

  onLoad: function (options) {
    const id=options.id
    this.setData({id})
  },

  onShow: function () {
    this.getData()
  },
    //获取数据
    getData(){
        let that = this
        const {id} = this.data
        const db = wx.cloud.database()
        db.collection('imgList').doc(id).get({
            success: function (res) {
                console.log(res)
                that.setData({
                    dataInfo:res.data
                })
            }
        })
    },

    //swiper 监听
    bindchange: function(e) {
      const {current} = e.detail
        this.setData({
            current: current
        })
    },
    // 排序方式切换
    bindIcon(e){
      const OIndex = e.currentTarget.dataset.index
        this.setData({
            showIndex: OIndex,
            autoplay:OIndex==1?true:false
        })
    },
    //查看大图
    previewImg(e){
      const imgList = this.data.dataInfo.picList
        const OIndex = e.currentTarget.dataset.index
        wx.previewImage({
            current:imgList[OIndex],
            urls: imgList,
            success: res => {},
            fail: err=> {}
        })
    },

})
