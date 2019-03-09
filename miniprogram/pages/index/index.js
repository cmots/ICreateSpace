//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: '/images/wx_login.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    banner_url: [{
      url: '../../images/table01.png'
    },{
      url: '../../images/table02.png'
    }],
    open: false,
    indicatorDots: true,//是否显示面板指示点
    autoplay: true,//是否开启自动切换
    interval: 3000,//自动切换时间间隔
    duration: 500//滑动动画时长
  },
  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onSlideChange: function(event){
    var postId = event.detail.current;
    // console.log(postId);
  },
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
})