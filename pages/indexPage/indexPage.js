// pages/indexPage/indexPage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    one:{},
    two:{},
    three:{},
    four:{}
  },
  refresh:function(){
    var that = this;
    
  },
  classList:function(e){
    let cid= e.currentTarget.id,
        url = '../classList/classList?cid=' + cid;
    wx.navigateTo({
      url: url
    })
    console.log(url)
  },
  switchNav:function(e){
    this.setData({
      currentTab: e.currentTarget.id
    })
  },
  inClass:function(e){
    wx.navigateTo({
      url: '../classList/classList',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData(app.globalData)
    console.log(this.data)
    if (wx.getStorageSync("user") == '') {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../login/login',
        })
      }, 1000)
    }
    wx.request({
      url: 'http://39.96.68.53:9898/CourseController/getCourse',
      method:'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:{
        cgrade:"大一",
        offset:0,
        limit:10
      },
      success:function(res){
        console.log(res)
        that.setData({
          one:res.data.data
        })
      }
    })
    wx.request({
      url: 'http://39.96.68.53:9898/CourseController/getCourse',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        cgrade: "大二",
        offset: 0,
        limit: 10
      },
      success: function (res) {
        console.log(res)
        that.setData({
          two: res.data.data
        })
      }
    })
    wx.request({
      url: 'http://39.96.68.53:9898/CourseController/getCourse',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        cgrade: "大三",
        offset: 0,
        limit: 10
      },
      success: function (res) {
        console.log(res)
        that.setData({
          three: res.data.data
        })
      }
    })
    wx.request({
      url: 'http://39.96.68.53:9898/CourseController/getCourse',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        cgrade: "大四",
        offset: 0,
        limit: 10
      },
      success: function (res) {
        console.log(res)
        that.setData({
          four: res.data.data
        })
      }
    })
    console.log(app.globalData)
    
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