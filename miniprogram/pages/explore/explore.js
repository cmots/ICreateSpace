// pages/explore/explore.js
var sliderWidth = 96; 

Page({
  data:{
    // winWidth: 0,
    // winHeight: 0,
    // currentTab: 0,
    pageStuCS: "[]",
    pageStuIOT:"[]",
    pageStuEE:"[]",
    pageStuUndefined:"[]",
    pageProCS: "[]",
    pageProIOT: "[]",
    pageProEE: "[]",
    pageProUndefined: "[]",
    tabs: ["CS", "IOT", "EE","undefined"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function(){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    const db = wx.cloud.database();
    db.collection('user').where({
      major: "CS"
    }).get({
      success: function (res) {
        console.log("cs")
        that.setData({
          pageStuCS: res.data
        })
      }
    })
    db.collection('user').where({
      major: 'IOT'
    }).get({
      success: function (res) {
        console.log("iot")
        that.setData({
          pageStuIOT: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    db.collection('user').where({ major: 'EE' }).get({
      success: function (res) {
        console.log("ee")
        that.setData({
          pageStuEE: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    db.collection('user').where({ major: 'undefined' }).get({
      success: function (res) {
        console.log("null")
        console.log(res)
        that.setData({
          pageStuUndefined: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    db.collection('project').where({major:"CS"}).get({
      success: function(res){
        that.setData({
          pageProCS: res.data
        })
      },
      fail: function(res){
        console.log(res)
      }
    })
    db.collection('project').where({major:'IOT'}).get({
      success: function(res){
        that.setData({
          pageProIOT: res.data
        })
      }
    })
    db.collection('project').where({major:'EE'}).get({
      success: function(res){
        that.setData({
          pageProEE: res.data
        })
      }
    })
    db.collection('project').where({major:'undefined'}).get({
      success: function(res){
        that.setData({
          pageProUndefined: res.data
        })
      }
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  onSwitch: function(event){
    var that = this;
    that.setData({
      currentTab: event.detail.current
    })
    console.log("here")
  },
  onNav:function(event){
    var that = this;
    if (this.data.currentTab === event.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: event.target.dataset.current
      })
    }
  },
  onApplication: function(e){
    var temp = e.currentTarget.dataset.index
    console.log(temp)
    wx.navigateTo({
      url: '../application/application?project='+temp._id+'&proName='+temp.proName+'&receiver='+temp._openid,
    })
  },
  onInvitation: function(e){
    var temp = e.currentTarget.dataset.index
    console.log(temp)
    wx.navigateTo({
      url: '../invitation/invitation?user='+temp._openid+'&avatarUrl='+temp.avatarUrl+'&major='+temp.major+'&nickName='+temp.nickName,
    })
  }
})