// miniprogram/pages/result/single.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    name:'',
    major:'',
    key:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    const type=options.type
    const key=options.key
    that.setData({
      type:type,
      key:key
    })

    const db = wx.cloud.database()
    const _ = db.command
    wx.showLoading({
      title: '读取中',
    })
    if(key=='id')
    {
      db.collection(type).where({
        _id: _.eq(options.id)
      }).get({
        success(res) {
          if (type == 'project') {
            that.setData({
              major: res.data[0].major,
              name: res.data[0].proName
            })
          }
          wx.hideLoading();
        }
      })
    }
    else if(key=='name'){
      if (type == 'project') {
        db.collection(type).where({
          proName: _.eq(options.id)
        }).get({
          success(res) {
            that.setData({
              major: res.data[0].major,
              name: res.data[0].proName
            })
            wx.hideLoading();
          }
        })
      }
    }
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