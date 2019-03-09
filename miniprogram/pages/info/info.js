// pages/info/info.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infos:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  ontap: function (e) {
    var content = e.currentTarget.dataset.index.content
    var temp = e.currentTarget.dataset.index
    wx.cloud.callFunction({
      name: "updateDatabase",
      data:{
        id: temp._id
      },
      success: function(res){
        console.log(res)
        if (content == '接受了来自您的入队邀请') {
          wx.navigateTo({
            url: '../msgSuccess/msgSuccess',
          })
        } else if (content == '拒绝了来自您的入队邀请') {
          wx.navigateTo({
            url: '../msgFail/msgFail',
          })
        } else if (content == '邀请您入队') {
          wx.navigateTo({
            url: '../operation2/operation2?project=' + temp.project + '&user=' + temp.receiver + '&userNickname=' + temp.receiverNickname + '&proName=' + temp.proName+'&position=' + temp.position,
          })
        } else if (content == '申请加入到您的队伍'){
          wx.navigateTo({
            url: '../operation1/operation1?project=' + temp.project + '&user=' + temp.sender + '&userNickname=' + temp.senderNickname + '&proName=' + temp.proName + '&position=' + temp.position,
          })
        }
      },
      fail: function(res){
        console.log("fail at info ontap remove")
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
    var that = this
    console.log(getApp().globalData.openid)
    const db = wx.cloud.database();
    db.collection('info').where({
      receiver: getApp().globalData.openid,
      state: 'unsolved'
    }).get({
      success: function (res) {
        console.log(res.data)
        that.setData({
          infos: res.data
        })
      }
    })
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