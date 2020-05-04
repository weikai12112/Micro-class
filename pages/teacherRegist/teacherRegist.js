// pages/studentRegist/studentRegist.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unumber: '',
    upassword: '',
    uname: '',
    ucollage: '',
    type: 0
  },
  back: function () {
    wx.navigateBack({
      delta: 1,//返回上一个页面
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(app.globalData)
  },
  regist: function () {
    wx.navigateTo({
      url: '../teacherRegist/teacherRegist',
    })
  },
  number: function (a) {
    this.setData({
      unumber: a.detail.value
    })
  },
  password: function (a) {
    this.setData({
      upassword: a.detail.value
    })
  },
  name: function (a) {
    this.setData({
      uname: a.detail.value
    })
  },
  school: function (a) {
    this.setData({
      ucollage: a.detail.value
    })
  },
  teacherRegist: function () {
    var that = this;
    var sendData = {
      uname: that.data.uname,
      unumber: that.data.unumber,
      ucollage: that.data.ucollage,
      upassword: that.data.upassword
    }
    for (let key in sendData) {
      console.log(sendData[key])
      if (sendData[key] == '') {
        console.log(sendData[key])
        return wx.showToast({
          title: '请完善信息',
          icon: 'none'
        })
      }
    }
    wx.request({
      url: 'http://39.96.68.53:9898/UserController/usersign',
      method: 'POST',
      data: {
        uname: that.data.uname,
        unumber: that.data.unumber,
        ucollage: that.data.ucollage,
        upassword: that.data.upassword,
        type: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '注册成功',
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../login/login',
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