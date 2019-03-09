// miniprogram/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems:[
      {name:"电信工程及管理",value:"cs"},
      {name:"物联网工程",value:"iot"},
      {name:"电子商务及法律",value:"ee"},
      {name:"校外",value:"undefined",checked:'true'},
    ],
    radioItems:[
      {name:"项目",value:"project",checked:'true'},
      {name:"学生",value:"student"},
      {name:"导师",value:"teacher"},
    ],
    major:"undefined",
    type:"project",
    searchType:'',
    inputShowed: false,
    inputVal: "",
  },

  checkboxChange(e) {
    const checked = e.detail.value
    const changed = {}
    for (let i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].value) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true
      } else {
        changed['checkboxItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
    this.data.major=e.detail.value
  },

  radioChange(e){
    this.data.type=e.detail.value
  },

  find(e){
    wx.navigateTo({
      url: '../result/result?major='+this.data.major+'&type='+this.data.type,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  search(e){
    wx.navigateTo({
      url: '../result/single?id=' + this.data.inputVal + '&type=' + this.data.type+'&key=name',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    console.log(this.data.inputVal)
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