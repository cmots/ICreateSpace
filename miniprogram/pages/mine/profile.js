// miniprogram/pages/mine/profile.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    nowGender:'',
    gender: ['男', '女', '保密'],
    genderIndex: 0,
    nowMajor:'',
    majorName: ['校外', '电信', '物联', '电管'],
    major: ['undefined', 'CS', 'IOT', 'EE'],
    majorIndex: 0,
    hobby:'',
    description:'',
    hobbyNum:0,
    descNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that=this
    const db=wx.cloud.database()
    db.collection('user').where({
      _openid: app.globalData.openid,
    }).get({
      success: function(res) {
        that.setData({
          nickName:res.data[0].nickName,
          nowGender:res.data[0].gender,
          nowMajor:res.data[0].major,
          hobby:res.data[0].hobby,
          description:res.data[0].description
        })
      },
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