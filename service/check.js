//检查一段文本是否含有违法违规内容
function msgCheck(val,type) {
    if(!val){
        return wx.showToast({
            title: type + '忘写啦~',
            icon: 'none',
            duration: 2000
        })
    }

    var promise = new Promise((resolve,reject)=>{
        wx.cloud.callFunction({
            name: 'apiCheck',
            data: {
                action: 'msgCheck',
                content: val,
            },
        }).then(res => {
            console.log('msgCheck====',res)
            //0 成功   87014 内容含有违法违规内容
            if(res.result.errCode!=0){
                wx.showToast({
                    title: type+'内容含有违法违规内容',
                    icon: 'none',
                    duration: 2000
                })
            }
            resolve(res.result.errCode)
        }).catch(error=>{
            wx.showToast({
                title: type+'内容含有违法违规内容',
                icon: 'none',
                duration: 2000
            })
            reject(error);
        })
    })
    return promise
}
//校验一张图片是否含有违法违规内容  【图片大小限制：1M】
function imgCheck(img) {
    if(!img) return;
    wx.showLoading({
        title: '图片校验中',
    })

    var promise = new Promise((resolve,reject)=>{
        wx.getFileSystemManager().readFile({
            filePath: img,
            success:buffer=>{
                console.log('readFile===',buffer.data)
                wx.cloud.callFunction({
                    name: 'apiCheck',
                    data:{
                        action: 'imgCheck',
                        img: buffer.data,
                    }
                }).then(res=>{
                    wx.hideLoading()
                    console.log('imgCheck 成功====',res)

                    //0 成功   87014 内容含有违法违规内容
                    if(res.result.errCode == '87014'){
                        wx.showToast({
                            title: '图片含有违法违规内容',
                            icon:'none',
                        })
                    }
                    resolve(res.result.errCode )
                }).catch(err=>{
                    wx.hideLoading()
                    console.log('imgCheck 失败====',err)
                    reject(err);
                    wx.showToast({
                        title: '校验失败，请稍后再试',
                        icon:'none',
                    })
                })
            },
            fail:err=>{
                reject(err);
                console.log('fail=========',err)
            }
        })
    })
    return promise
}

module.exports = {
    msgCheck: msgCheck,
    imgCheck: imgCheck,
}
