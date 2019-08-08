// component/uploadImg/index.js
Component({
    //组件的属性列表
    properties: {
        count: { //最多选择图片的张数，默认9张
            type: Number,
            value: 9
        },
        imgList: { //预览图片的路径
            type: Array,
            value: []
        },
        desc:{ //选择按钮文字提示
          type: String,
          value: '图片上传'
        },
    },

    //组件的初始数据
    data: {
        imgList:[]
    },

    // 在组件实例进入页面节点树时执行
    attached: function() {
        this.setData({
            imgList:[],
        })
    },

    //组件的方法列表
    methods: {
        checkImgUpload(){
          let that = this;
          let pics = that.data.imgList;
          wx.chooseImage({
              count: that.data.count,
              sizeType: ['original', 'compressed'],
              sourceType: ['album', 'camera'],
              success: res => {
                  let imgs = res.tempFilePaths;
                  for (let i = 0; i < imgs.length; i++) {
                      if(res.tempFiles[i].size>1024*1024 ){
                          wx.showToast({
                            title: '图片不能大于1M',
                            icon:'none'
                          })
                      }else {
                          pics.push(imgs[i])
                      }
                  }
                  that.setData({
                      imgList: pics
                  },function () {
                      // detail对象，提供给事件监听函数
                      let myEventDetail = {
                          pictureList: that.data.imgList
                      }
                      let myEventOption = {} // 触发事件的选项
                      that.triggerEvent('addPic', myEventDetail, myEventOption)//结果返回调用的页面
                  })
            }
          });
        },

        checkRemove(e){
            let that = this;
            const {index} = e.currentTarget.dataset
            let pics = that.data.imgList;
            console.log(index,e)
            pics.splice(index,1)
            that.setData({
                imgList:pics
            },function () {
                // detail对象，提供给事件监听函数
                let myEventDetail = {
                    pictureList: that.data.imgList,
                    index: index
                }
                let myEventOption = {} // 触发事件的选项
                that.triggerEvent('remove', myEventDetail, myEventOption)//结果返回调用的页面
            })

        }
    },
})

