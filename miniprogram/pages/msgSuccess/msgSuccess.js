Page({
  data:{},
  jumpToIndex: function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  jumpToMine: function(){
    wx.switchTab({
      url: '../mine/mine',
    })
  }
})