// pages/classList/classList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addClassBottom:1,
    video:'',
    addName:'',
    addClassIpt:1
  },
  className:function(a){
    this.setData({
      addName:a.detail.value
    })
  },
  addClassBottom:function(){
    this.setData({
      addClassBottom:0,
      addClassIpt: 0
    })
  },
  addVideo:function(){
    var that = this
    console.log("1111")
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res)
        console.log(res.tempFilePath)
        that.setData({
          video: res.tempFilePath
        })
      }
    })
  },
  addPlan:function(){
    var that = this;
    console.log(this.data)
    wx.request({
      url: 'http://39.96.68.53:9898/RecordControler/inRecord',
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:{
        cid:that.data.cid,
        uid:that.data.data.uid
      },
      success:function(res){
        console.log(res)
        if(res.data.code == 200 ){
          wx.showToast({
            title: '添加成功',
          })
        }
      }
    })
  },
  updateBlogs:function(){
    var that = this
    wx.request({
      url: 'http://39.96.68.53:9898/LessonController/getCourse',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        cid: that.data.cid,
        uid: that.data.data.uid
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          classList: res.data.data
        })
        console.log(that.data)
      }
    })
  },
  add:function(){
    var that = this
    if(this.data.video == ''){
      return wx.showToast({
        title: '请上传教学视频',
        icon:'none'
      })
    }
    if (this.data.addName == '') {
      return wx.showToast({
        title: '请输入教程名',
        icon: 'none'
      })
    }
    wx.request({
      url: 'http://39.96.68.53:9898/LessonController/addCourse',
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:{
        lname:that.data.addName,
        lvideo:that.data.video,
        chapter_id:1,
        chapter_name:1,
        cid:that.data.cid
      },
      success:function(res){
        if(res.data.code ==200){
          wx.showToast({
            title: '上传成功',
          })
          setTimeout(function(){
            wx.showNavigationBarLoading()
            that.updateBlogs()
          },1000)
        }
      }
    })
  },
  classVideo:function(e){
    var i = e.currentTarget.dataset.item;
    i.cid = this.data.cid
    var item = JSON.stringify(i)
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../class/class?item='+item
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
    this.setData(app.globalData);
    this.setData(wx.getStorageSync("user"))
    var cid=options.cid;
    this.setData({
      cid : cid
    })
    var that = this
    console.log(this)
    if(this.data.data.type==0){
      console.log('student')
      this.setData({
        addClassBottom:0,
        addClassIpt: 1
      })
    }
    console.log(options)
    wx.request({
      url: 'http://39.96.68.53:9898/LessonController/getCourse',
      method:"GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:{
        cid:cid,
        uid: that.data.data.uid
      },
      success:function(res){
        console.log(res.data.data)
        that.setData({
          classList:res.data.data
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