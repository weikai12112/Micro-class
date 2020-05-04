// pages/my/my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identy:{
      0:'',
      1:'发布课程'
    }
  },
  classList: function (e) {
    let cid = e.currentTarget.id,
      url = '../classList/classList?cid=' + cid;
    wx.navigateTo({
      url: url
    })
    console.log(url)
  },
  sendClass:function(){
    wx.navigateTo({
      url: '../classUp/classUp',
    })
  },
  notes:function(){
    wx.navigateTo({
      url: '../notes/notes',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData(app.globalData)
    this.setData(wx.getStorageSync("user"))
    console.log(this.data)
    wx.request({
      url: 'http://39.96.68.53:9898/RecordControler/getRecord',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:{
        uid:that.data.data.uid
      },
      success:function(res){
        console.log(res)
        that.setData({
          todayList:res.data.data
        })
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