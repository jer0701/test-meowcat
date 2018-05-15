// pages/home/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    
    var that = this

    /**设置用户信息 */
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        app.globalData.userInfo = res.userInfo
        that.setData({ userInfo: res.userInfo })
     
        // console.log(app.globalData.userInfo);
        that.login()
      }
    })
  },

  login: function() {
    wx.login({
      success: function (res) {
        /** 发送登陆code给服务器*/
        console.log(res.code);
        wx.request({
          url: 'http://localhost:7001/api/login',
          method: 'POST',
          data: {
            code: res.code,
            userInfo: app.globalData.userInfo
          },
          success: function (res) {
            console.log(res);
            if (res.data.status !== 'ok') {
              wx.showModal({ title: '服务器请求失败,请重试' })
              return
            }
            let token = res.data.token
            wx.setStorageSync('token', token)
            //console.log(wx.getStorageSync('token'))
          }, fail: function () {
            wx.showModal({
              title: '微信出错(login)',
              content: '本错误来自于微信本身，请尝试重启微信',
            })
          }
        })
      },
      fail: function () {
        wx.showModal({
          title: '微信出错',
          content: '本错误来自于微信本身，请尝试重启微信',
        })
      }
    })
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