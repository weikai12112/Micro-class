// pages/class/class.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:''
  },
  sendContent:function(a){
    this.setData({
      content:a.detail.value
    })
  },
  finishClass:function(){
    console.log("触发",this.data)
    var sendData={
      cid: this.data.pageData.cid,
      lid: this.data.pageData.lid,
      uid: this.data.data.uid
    }
    console.log(sendData)
    wx.request({
      url: 'http://39.96.68.53:9898/RecordControler/changeRecord',
      method:"PUT",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:sendData,
      success:function(res){
        console.log(res)
        if(res.data.code == 200){
          wx.showToast({
            title: '观看完成',
          })
        }
      }
    })
  },
  updateBlogs: function () {
    var that = this
    wx.request({
      url: 'http://39.96.68.53:9898/DiscussionController/getDiscussion',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        offset: 0,
        limit: 20,
        lid: that.data.pageData.lid
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          contentList: res.data.data
        })
        console.log(that.data)
      }
    })
  },
  send:function(){
    
    var that = this
    console.log(this.data.content)
    if(this.data.content == ''){
      return wx.showToast({
        title: '不可发送空值',
        icon:"none"
      })
    }
    wx.request({
      url: 'http://39.96.68.53:9898/DiscussionController/addDiscussion',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:{
        lid:that.data.pageData.lid,
        uid: that.data.data.uid,
        dcontent:that.data.content
      },
      success:function(res){
        if(res.data.code == 200){
          wx.showToast({
            title: '发送成功',
          })
          wx.showNavigationBarLoading()
          that.updateBlogs()
        }
      }
    })
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
    this.setData(wx.getStorageSync("user"))
    this.setData(app.globalData)
    var item = JSON.parse(options.item)
    console.log(item)
    this.setData({
      pageData:item
    })
    var that = this
    wx.request({
      url: 'http://39.96.68.53:9898/DiscussionController/getDiscussion',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        offset: 0,
        limit: 20,
        lid: item.lid
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          contentList: res.data.data
        })
        console.log(that.data)
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