// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

    switch (event.action) {
        case 'msgCheck':{
          return msgCheck(event)
        }
        case 'imgCheck':{
          return imgCheck(event)
        }
        default:{
          return
        }
    }
}

async function msgCheck(event) {
  console.log("event==",event)
  const res = await cloud.openapi.security.msgSecCheck({
      content:event.content
  })
  return res
}

async function imgCheck(event) {
  const res = await cloud.openapi.security.imgSecCheck({
      media:{
          contentType: 'image/png',
          value:Buffer.from(event.img),
      }
  })
    return res
}
