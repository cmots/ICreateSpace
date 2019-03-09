// miniprogram/pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    limit:14,
    dataList:[],
    type:'',
    major:'',
  },

  loadData:function(major,type){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    const db = wx.cloud.database();

    var result = major.split(",")

    const _ = db.command
    switch (result.length) {
      case 1: db.collection(type).where({
        major: _.eq(result[0])
      }).limit(that.data.limit).skip(that.data.num).get({
        success(res) {
        for(var i=0;i<that.data.limit&&i<res.data.length;i++)
          {
            that.data.dataList.push(res.data[i]);
            that.setData({
              dataList:that.data.dataList
            })
          }

          that.setData({
            num: that.data.num + res.data.length
          })
          wx.hideLoading();
          
        },
      });
        break;
      case 2: db.collection(type).where({
        major: _.eq(result[0]).or(_.eq(result[1]))
      }).limit(that.data.limit).skip(that.data.num).get({
        success(res) {
          for (var i = 0; i < that.data.limit && i < res.data.length; i++) {
            that.data.dataList.push(res.data[i]);
          }
          that.setData({
            dataList: that.data.dataList
          })
          that.setData({
            num: that.data.num + res.data.length
          })
          wx.hideLoading();
        }
      });
        break;
      case 3: db.collection(type).where({
        major: _.eq(result[0]).or(_.eq(result[1])).or(_.eq(result[2]))
      }).limit(that.data.limit).skip(that.data.num).get({
        success(res) {
          for (var i = 0; i < that.data.limit && i < res.data.length; i++) {
            that.data.dataList.push(res.data[i]);
          }
          that.setData({
            dataList: that.data.dataList
          })
          that.setData({
            num: that.data.num + res.data.length
          })
          wx.hideLoading();
        }
      });
        break;
      case 4: db.collection(type).where({
        major: _.eq(result[0]).or(_.eq(result[1])).or(_.eq(result[2])).or(_.eq(result[3]))
      }).limit(that.data.limit).skip(that.data.num).get({
        success(res) {
          for (var i = 0; i < that.data.limit && i < res.data.length; i++) {
            that.data.dataList.push(res.data[i]);
          }
          that.setData({
            dataList: that.data.dataList
          })
          that.setData({
            num: that.data.num + res.data.length
          })
          wx.hideLoading();
        }
      });
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    const major = options.major
    const type = options.type
    that.setData({
      type:type,
      major:major
    })
    this.loadData(major,type)
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
    var that=this
    this.loadData(that.data.major,that.data.type)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})