//index.js
//获取应用实例
const app = getApp()
const common = require("../../utils/common.js")
const upFile = require("../../service/upload.js")
const check = require("../../service/check")

Page({
  data: {
    coverImgPreview: [],//封面 预览
    picListPreview: [], //图片集 预览
    coverImg:[],//封面
    picList:[], //图片集
    form:{},
  },
  onLoad: function () {
      // 页面创建时执行
  },
  onUnload:function(){
      // 页面销毁时执行
  },
  //点击选择图片上传，获取预览图列表
  bindCoverImg(e){
    const oImg = e.detail.pictureList
    console.log('封面:', oImg)
    this.setData({
      coverImgPreview: oImg
    })
  },
  bindPicList: function (e) {
    const oPics = e.detail.pictureList
    console.log("图集：",oPics)
    this.setData({
      picListPreview: oPics
    })
  },
  // 展示预览图【可删除】
    bindCoverRemove(e){},
    bindPicRemove(e){
      const {pictureList,index} = e.detail
        console.log(e.detail)
    },

  // 点击提交时，先触发图片上传事件，成功=>提交form，else=>提交失败
    async uploadCover(){ //封面上传
       const {coverImgPreview,coverImg} = this.data
        for(let i = 0;i<coverImgPreview.length; i++){
            const res = await check.imgCheck(coverImgPreview[i])
            console.log("校验封面图",res)
            if(res!=0) return
            const data = await upFile.uploadImages(coverImgPreview[i])
            coverImg.push(data)
        }
        this.setData({ coverImg })
    },
    async uploadPic(){ // 图集上传
        const {picListPreview, picList} = this.data
        for(let i = 0;i<picListPreview.length; i++){
            const res = await check.imgCheck(picListPreview[i])
            console.log("校验图集",res)
            if(res!=0) return
            const data = await upFile.uploadImages(picListPreview[i])
            picList.push(data)
        }
        this.setData({ picList })
    },


  // 提交
  async formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
      const { coverImgPreview,picListPreview } = this.data
      const oVal = e.detail.value
    //  字段验证
      const resTle = await check.msgCheck(oVal.title,'标题')
      console.log('校验title=====',resTle)
      if(resTle!=0) return
      const resInfo = await check.msgCheck(oVal.info,'简介')
      console.log('校验info=====',resInfo)
      if(resInfo!=0) return
    //  图片上传
      if(coverImgPreview.length<=0){
          return wx.showToast({
              title: '封面图忘传啦~',
              icon: 'none',
              duration: 2000
          })
      }
      if(picListPreview.length<=0){
          return wx.showToast({
              title: '图集忘传啦~',
              icon: 'none',
              duration: 2000
          })
      }
      await this.uploadCover()
      await this.uploadPic()
      // return

    //  表单提交
      this.formApply(oVal)

  },
   formApply(val){
       const {coverImg, picList} = this.data
       const { title, info } = val
       const timeNow = common.timeNow()
       const db = wx.cloud.database()
       db.collection('imgList').add({
           data: {
               time: timeNow,
               title: title,
               info: info,
               coverImg,
               picList,
           },
           success: function (res) {
               console.log(res)
               wx.showToast({
                   title: '提交成功'
               })
               wx.navigateBack({
                   delta: 1
               })
           }
       })
   },

})
