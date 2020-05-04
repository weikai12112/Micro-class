// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  regist:function(){
    wx.navigateTo({
      url: '../studentRegist/studentRegist',
    })
  }, 
  number:function(a){
    this.setData({
      unumber:a.detail.value
    })
  },
  password: function (a) {
    this.setData({
      upassword: a.detail.value
    })
  },
  login: function () {
    var that = this;
    var sendData = {
      unumber:this.data.unumber,
      upassword:this.data.upassword
    }
    for(var key in sendData){
      if (sendData[key] == '') {
        console.log(sendData[key])
        return wx.showToast({
          title: '请完善信息',
          icon: 'none'
        })
      }
    }
    wx.request({
      url: 'http://39.96.68.53:9898/UserController/userLog',
      method: 'POST',
      data: sendData,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.setStorageSync('user', res.data)
          wx.showToast({
            title: '登录成功',
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../indexPage/indexPage',
            })
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(app.globalData)
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