// pages/invitation/invitation.js 
const app = getApp()
Page({

  /**
   * 页面的初始数据**将邀请的项目做成选框形式的
   */
  data: {
    stu:{},
    pro:[],
    proIndex:0,
    user:"",
    avatarUrl:"",
    major:"",
    nickName:"",
    inivitedPro:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      user: options.user,
      avatarUrl: options.avatarUrl,
      major: options.major,
      nickName: options.nickName
    })
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: that.data.user
    }).get({
      success: function(res){
        that.setData({
          stu: res.data[0]
        })
      }
    })
    db.collection('project').where({
      _openid: getApp().globalData.openid
    }).get({
      success: function(res){
        that.setData({
          pro: res.data
        })
      }
    })
  },
  bindProChange: function(e){
    this.setData({
      proIndex:e.detail.value
    })
  },
  onsubmit: function(){
    const db = wx.cloud.database()
    db.collection('info').add({
      data: {
        content: '邀请您入队',
        position: 'groupMember',
        proName: this.data.proName,
        project: this.data.project,
        receiver: this.data.user,
        sender: getApp().globalData.openid,
        senderNickname: this.data.nickName,
        state: 'unsolved'
      },
      success: function (res) {
        wx.navigateTo({
          url: '../msgSuccess/msgSuccess',
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../msgFail/msgFail',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})