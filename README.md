# wechat-imgUpload
原生小程序【upload】+云函数【内容安全校验】  简易版相册小程序

1.原生小程序组件----- 图片上传   
2.云函数校验-------图片校验，内容校验

# 注意事项
1.开通‘云开发’（微信开发者工具=>左上角=>云开发）   
2.修改app.js文件中初始化默认环境 env换成云环境id（云开发=>设置）即可看到环境id
```diff
wx.cloud.init({
  env: 'double',
  traceUser: true
})
```
3.建数据库（云开发=>数据库）   

4.修改数据库名称
```diff
db.collection('imgList')
```
可全局查找并替换此处的 ‘imgList’




至此，项目可正常运行
