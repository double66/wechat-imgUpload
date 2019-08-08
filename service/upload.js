
function uploadImages(filePath){
    var promise = new Promise((resolve,reject)=>{
        wx.showLoading({
            title: '上传中',
        })
        //获取当前时间，例20190801
        const myDate = new Date()
        const date = myDate.getDate()<10 ? '0'+myDate.getDate() : myDate.getDate()
        const month = myDate.getMonth()+1 <10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1
        const nowDate = myDate.getFullYear() +""+ month +""+ date
        //文件名称。时间戳+1000内随机数+文件后缀
        const fileName = new Date().getTime()+Math.floor(Math.random() * 1000)+"."+filePath.split('.').pop()
        //文件路径,当前时间+文件名，例20190801/1234567.png
        const fileKey = nowDate + '/'+fileName

         wx.cloud.uploadFile({
             cloudPath: fileKey,
             filePath: filePath,
             success:(respon)=>{
                 wx.hideLoading()
                 resolve(respon.fileID);
             },
             fail:(err)=>{
                 wx.hideLoading()
                 wx.showToast({
                     title: '上传错误,请重试',
                     icon: 'none',
                     duration: 2000
                 })
                 console.log("err:",err)
                 reject(err);
             },
         })
    })
    return promise;
}


module.exports = {
    uploadImages: uploadImages,
}
