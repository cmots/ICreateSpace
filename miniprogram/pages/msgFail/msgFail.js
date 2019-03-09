// pages/msgFail/msgFail.js
Page({
  data:{},
  jumpToIndex: function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  jumpBack: function(){
    wx.switchTab({
      url: '../add/add',
    })
  }
})