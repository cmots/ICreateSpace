// pages/operation/operation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project:'',
    user:'',
    // userNickname:'',
    proName:'',
    pro: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      project:options.project,
      user:options.user,
      // userNickname:options.userNickname,
      proName: options.proName,
      position: options.position
    })
    const db = wx.cloud.database()
    db.collection('project').where({
      _id:options.project
    }).get({
      success: function(res){
        
        that.setData({
          pro: res.data[0]
        })
      },
      fail: function(res){
        console.log("fail at operation2")
      }
    })
  },
  onAccept: function(res){
    var that = this
    const db = wx.cloud.database()
    db.collection('relation').add({
      data:{
        userId: that.data.user,
        proName: that.data.proName,
        position: 'groupMember'
      },
      success: function(res){
        wx.switchTab({
          url: '../info/info',
        })
      },
      fail: function(res){
        console.log("fail at operation2")
      }
    })
  },
  onReject: function(res){
    wx.switchTab({
      url: '../info/info',
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