// pages/application/application.js 表单中自己填自己的名字
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pro:[],
    senderNickname:'',
    proName: '',
    project: '',
    receiver: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      proName: options.proName,
      project: options.project,
      receiver: options.receiver,
      senderNickname: options.senderNickname
    })

    const db = wx.cloud.database()
    db.collection('project').where({
      _id: options.project
    }).get({
      success: function(res){
        that.setData({
          pro: res.data[0],
        })
      }
    })
  },
  onsubmit: function(){
    const db = wx.cloud.database()
    db.collection('info').add({
      data:{
        content: '申请加入到您的队伍',
        position: 'groupMember',
        proName: this.data.proName,
        project: this.data.project,
        receiver: this.data.receiver,
        sender: getApp().globalData.openid,
        senderNickname: this.data.senderNickname,
        state: 'unsolved'
      },
      success: function(res){
        wx.navigateTo({
          url: '../msgSuccess/msgSuccess',
        })
      },
      fail: function(res){
        wx.navigateTo({
          url: '../msgFail/msgFail',
        })
      }
    })
  },
  bindNicknameChange: function(e){
      console.log(e.detail.value)
      this.setData({
        senderNickname: e.detail.value
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