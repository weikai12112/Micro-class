// pages/notes/notes.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  edit:function(a){
    this.setData({
      content: a.detail.value
    })
  },
  back:function(){
    
    wx.navigateBack({
      delta: 1,//返回上一个页面
    })
  },
  save:function(){
    var that = this
    wx.request({
      url: 'http://39.96.68.53:9898/NotesController/changeNotes',
      method: "PUT",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        uid: this.data.data.uid,
        ucontent: that.data.content
      },
      success: function (res) {
        if(res.data.code == 200){
          wx.showToast({
            title: '保存成功',
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
    this.setData(wx.getStorageSync("user"))
    var that = this
    wx.request({
      url: 'http://39.96.68.53:9898/NotesController/addNotes',
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:{
        uid: this.data.data.uid,
        ucontent:''
      },
      success:function(res){
        console.log(res)
      }
    })
    wx.request({
      url: 'http://39.96.68.53:9898/NotesController/getNotes',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        uid: this.data.data.uid
      },
      success: function (res) {
        that.setData({
          notes:res.data.data.ucontent
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