// pages/add/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proName: '',
    major: ['undefined', 'CS', 'IOT', 'EE'],
    majorIndex: 0,
    state: ['招人中..','进行中..','已结束'],
    stateIndex: 0,
    description: ''
  },
  bindMajorChange: function(e){
    this.setData({
      majorIndex: e.detail.value
    })
  },
  bindProNameChange: function(e){
    this.setData({
      proName: e.detail.value
    })
  },
  bindStateChange: function(e){
    this.setData({
      stateIndex: e.detail.value
    })
  },
  bindProDescriptionChange: function(e){
    this.setData({
      description: e.detail.value
    })
  },
  onsubmit: function(){// 暂时只有项目名称不能为空
    var that = this
    if(this.data.proName==''){
      wx.showModal({
        title: '提示',
        content: '项目名称不能为空',
      })
    }else{
      const db = wx.cloud.database()
      db.collection('project').add({
        data:{
          proName: this.data.proName,
          staterId: getApp().globalData.openid,
          major: this.data.major[this.data.majorIndex],
          state: this.data.state[this.data.stateIndex],
          description: this.data.description
        },
        success: function(res){
          db.collection('relation').add({
            data: {
              position: 'starter',
              proName: that.data.proName,
              userId: getApp().globalData.openid,
            },
            success: function (res) {
              wx.navigateTo({
                url: '../msgSuccess/msgSuccess',
              })
            },
            fail: function (res) {
              console.log("fail")
            }
          })

        },
        fail: function(){
          wx.navigateTo({
            url: '../msgFail/msgFail',
          })
        }
      })
    }
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