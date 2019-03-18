// pages/mine/mine.js
const app = getApp()
var sliderWidth = 96; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["我发起的项目", "我参与的项目","我的信息"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,

    startProjects:[],
    attendProjects:[],
    profile:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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
    const db = wx.cloud.database()
    
    db.collection('relation').where({
      _openid: app.globalData.openid,
      position: 'starter'
    }).get({
      success: function(res){
        that.setData({
          startProjects: res.data
        })
      }
    })

    db.collection('relation').where({
      _openid: app.globalData.openid,
      position: 'groupMember'
    }).get({
      success: function(res){
        that.setData({
          attendProjects: res.data
        })
      }
    })

    db.collection('user').where({
      _openid: app.globalData.openid,
    }).get({
      success: function(res){
        that.setData({
          profile:res.data[0]
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