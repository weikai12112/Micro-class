// pages/classUp/classUp.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picture: []
  },
  back: function () {
    wx.navigateBack({
      delta: 1,//返回上一个页面
    })
  },
  picture: function (e) {
    var that = this;
    var picture = this.data.picture;
    wx.chooseImage({
      count:  1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        if (picture.length + res.tempFilePaths.length > 1) {
          return wx.showToast({
            title: '最多一张图片',
            icon: 'none'
          })
        }
        for (var i = 0; i < tempFilePaths.length; i++) {
          picture.push(tempFilePaths[i])
          console.log(tempFilePaths)
        }
        that.setData({
          picture: res.tempFilePaths
        })
        console.log(that.data)
      },
    })
  },
  cname:function(a){
    this.setData({
      cname:a.detail.value
    })
  },
  cintroduce: function (a) {
    this.setData({
      cintroduce: a.detail.value
    })
  },
  cgrade: function (a) {
    this.setData({
      cgrade: a.detail.value
    })
  },
  crequirements: function (a) {
    this.setData({
      crequirements: a.detail.value
    })
  },
  send:function(){
    var that = this
    var sendData = {
      uid: this.data.data.uid,
      cname:this.data.cname,
      cintroduce: this.data.cintroduce,
      cgrade: this.data.cgrade,
      crequirements: this.data.crequirements
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
    wx.uploadFile({
      url: 'http://39.96.68.53:9898/CourseController/addCourse', //仅为示例，非真实的接口地址  
      filePath: that.data.picture[0],
      name: 'cpicture',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: sendData,
      success: function (res) {
        console.log(JSON.parse(res.data))
        var data = JSON.parse(res.data)
        if (data.code == 200) {
          wx.showToast({
            title: '上传成功',
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../indexPage/indexPage',
              success: function () {
                let pages = getCurrentPages()
                let prePage = pages[0]
                console.log(prePage)
                prePage.onLoad()
              }
            })
          }, 1000)
        } else {
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          })

        }
      },
      complete: function (res) {
        
      }
    })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(wx.getStorageSync("user"))
    this.setData(app.globalData)
    console.log(this.data)
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