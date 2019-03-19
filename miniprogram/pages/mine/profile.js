// miniprogram/pages/mine/profile.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    nickName:'',
    nickNameHide:false,
    genderName: ['男', '女', '保密'],
    gender:[1,2,0],
    genderIndex: 0,
    nowGender:'',
    majorName: ['导师', '电信', '物联', '电管'],
    major: ['undefined', 'CS', 'IOT', 'EE'],
    majorIndex: 0,
    nowMajor:'',
    hobby:'',
    description:'',
    hobbyNum:0,
    descNum:0
  },

  bindNickNameChange:function(e){
    this.setData({
      nickName:e.detail.value,
      nickNameHide:true
    })
  },

  bindMajorChange:function(e){
    this.setData({
      majorIndex:e.detail.value
    })
  },

  bindGenderChange:function(e){
    this.setData({
      genderIndex:e.detail.value
    })
  },
  bindHobbyChange:function(e){
    if(e.detail.value.length>20)
      return;
    this.setData({
      hobby:e.detail.value,
      hobbyNum:e.detail.value.length
    })
  },
  bindDescriptionChange:function(e){
    if(e.detail.value.length>200)
      return;
    this.setData({
      description:e.detail.value,
      descNum:e.detail.value.length
    })
  },
  onsubmit:function(e){
    const db=wx.cloud.database()
    db.collection('user').doc(this.data.id).update({
      data:{
        nickName:this.data.nickName,
        major:this.data.major[this.data.majorIndex],
        gender:this.data.gender[this.data.genderIndex],
        hobby:this.data.hobby,
        description:this.data.description,
      },
      success:function(res){
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: app.globalData.openid,
    }).get({
      success: function (res) {
        that.setData({
          id: res.data[0]._id,
          nickName: res.data[0].nickName,
          nowGender: res.data[0].gender,
          nowMajor: res.data[0].major,
          hobby: res.data[0].hobby,
          description: res.data[0].description,
          hobbyNum: res.data[0].hobby.length,
          descNum: res.data[0].description.length
        })
        var majorIdx = 0
        for (majorIdx; majorIdx < 4; majorIdx++)
          if (that.data.nowMajor == that.data.major[majorIdx])
            that.setData({
              majorIndex: majorIdx
            })

        var genderIdx = 0
        for (genderIdx; genderIdx < 3; genderIdx++)
          if (that.data.nowGender == that.data.gender[genderIdx])
            that.setData({
              genderIndex: genderIdx
            })
      },
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