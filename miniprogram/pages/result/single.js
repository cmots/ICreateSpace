// miniprogram/pages/result/single.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    type:'',
    name:'',
    major:'',
    key:'',
    description:'',
    openid:'',
    hobby:'',
    database:'',
    state:'',
    avatarUrl:''
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
    if(type=='project')
      that.setData({
        database:'project'
      })
    else
      that.setData({
        database: 'user'
      })
    const db = wx.cloud.database()
    const _ = db.command
    wx.showLoading({
      title: '读取中',
    })
    if(key=='id')
    {
      db.collection(that.data.database).where({
        _id: _.eq(options.id)
      }).get({
        success(res) {
          if (type == 'project') {
            that.setData({
              major: res.data[0].major,
              name: res.data[0].proName,
              description:res.data[0].description,
              id:options.id,
              openid:res.data[0]._openid,
              state:res.data[0].state
            })
          }
          if (type == 'student'||type=='teacher') {
            that.setData({
              major: res.data[0].major,
              name: res.data[0].nickName,
              description: res.data[0].description,
              id: options.id,
              hobby:res.data[0].hobby,
              openid: res.data[0]._openid,
              avatarUrl:res.data[0].avatarUrl
            })
          }
          wx.hideLoading();
        }
      })
    }
    else if(key=='name'){
      if (type == 'project') {
        db.collection(that.data.database).where({
          proName: _.eq(options.name)
        }).get({
          success(res) {
            if(res.data.length==0){              
              wx.showModal({
                content: '没有搜到哦',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 1,
                    })
                  }
                }
              });
            }
            else{
              that.setData({
                major: res.data[0].major,
                name: res.data[0].proName,
                description: res.data[0].description,
                state:res.data[0].state
              })
            }
            wx.hideLoading();
          }   
        })
      }
      else if(type=='teacher'||type=='student'){
        db.collection(that.data.database).where({
          proName: _.eq(options.id)
        }).get({
          success(res) {
            if (res.data.length == 0) {
              wx.showModal({
                content: '没有搜到哦',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 1,
                    })
                  }
                }
              });
            }
            else{
            that.setData({
              major: res.data[0].major,
              name: res.data[0].nickName,
              hobby:res.data[0].hobby,
              description: res.data[0].description,  
              avatarUrl: res.data[0].avatarUrl
            })
            }
            wx.hideLoading();
          }
        })
      }
    }
  },

  onApplication: function (e) {
    var that=this
    wx.navigateTo({
      url: '../application/application?project=' + that.data.id + '&proName=' + that.data.name + '&receiver=' + that.data.openid,
    })
  },

  onInvitation: function (e) {
    var that = this
    wx.navigateTo({
      url: '../invitation/invitation?user=' + that.data.openid + '&avatarUrl=' + that.data.avatarUrl + '&major=' + that.data.major + '&nickName=' + that.data.name,
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