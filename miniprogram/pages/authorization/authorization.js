const app = getApp();

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onshow: function(){
    wx.hideTabBar()
  },
  onLoad: function () {
    var that = this;

    wx.cloud.callFunction({
      name: "login",
      data:{},
      success: function(res){
        app.globalData.openid = res.result.openid
      }
    })
    //查看是否授权
    wx.getSetting({
      success: function (res) {

            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                  
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }
              })
            }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      //插入登录的用户的相关信息到数据库
      const db = wx.cloud.database()
      db.collection('user').add({
        data:{
          openid: getApp().globalData.openid,
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,//头像
          major:'undefined'
        },
        success: function(res){
          console.log("cloud add success")
          wx.switchTab({
            url: '/pages/index/index',
          })
        },
        fail: function(res){
          console.log("cloud add fail")
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    const db = wx.cloud.database();
    db.collection(user).where({openid:app.globalData.openid}).get({
      success: function (res) {
        console.log(res.data);
        getApp().globalData.userInfo = res.data;
      }
    })
  }
})