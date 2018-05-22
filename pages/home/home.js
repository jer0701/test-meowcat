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
        console.log(res);
        app.globalData.userInfo = res.userInfo
        that.setData({ userInfo: res.userInfo })
     
        // console.log(app.globalData.userInfo);
  
          //that.loginCheck()

          //that.login()

          //that.updateUserInfo();
          that.getUserInfo();

        
      }
    })
  },

  loginCheck: function() {
    var that = this;
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQyZWU4MzViNDc2MjVjOTFiMjE1ZmVjZTU3ZGJmYTBmNDAxZThhZDciLCJpYXQiOjE1MjY1MzgzMDYsImV4cCI6MTUyNjUzODM2Nn0.MS4AVH-xLQLlI9sfoSMxycLxP_nZgiNwJ-6zUWUZPdo";
    wx.request({
      url: 'http://localhost:7001/api/login/check',
      header: { authorization: token },
      method: 'GET',
      success: function (res) {
        if (res.data.status === 'ok') {
          console.log("ok")
        } else {
          console.log("fail")
        }
      }
    })
  },
  login: function() {
    wx.login({
      success: function (res) {
        /** 发送登陆code给服务器*/
        console.log(res.code);
        console.log(app.globalData.userInfo);
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
            wx.setStorageSync('token', token);
            wx.setStorageSync('openid', res.data.openid);
            console.log(wx.getStorageSync('token'))
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

  updateUserInfo: function() {

        console.log(app.globalData.userInfo);

        var userInfo = app.globalData.userInfo;
        var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQyZWU4MzViNDc2MjVjOTFiMjE1ZmVjZTU3ZGJmYTBmNDAxZThhZDciLCJpYXQiOjE1MjY5NTIyMzIsImV4cCI6MTUyNzIxMTQzMn0.Grt8d2WquAiNBb9L9cQRb7mA2F5laZ1oX11uxvfDWrE";
        userInfo.birthdate = new Date("1994/07/01 07:30:00");
        wx.request({
          url: 'http://localhost:7001/api/userinfo',
          header: { authorization: token },
          method: 'POST',
          data: {
            openid: "oxFLx5PgLr3ecvQDrV6YmghP0jG4",
            userInfo: userInfo
          },
          success: function (res) {
            console.log(res);
            if (res.data.status !== 'ok') {
              wx.showModal({ title: '服务器请求失败,请重试' })
              return
            }
          }, fail: function () {
            wx.showModal({
              title: '微信出错(login)',
              content: '本错误来自于微信本身，请尝试重启微信',
            })
          }
        })
  },

  getUserInfo: function() {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQyZWU4MzViNDc2MjVjOTFiMjE1ZmVjZTU3ZGJmYTBmNDAxZThhZDciLCJpYXQiOjE1MjY5NTIyMzIsImV4cCI6MTUyNzIxMTQzMn0.Grt8d2WquAiNBb9L9cQRb7mA2F5laZ1oX11uxvfDWrE";
    wx.request({
      url: 'http://localhost:7001/api/userinfo',
      method: 'GET',
      header: { authorization: token },
      data: {
        openid: "oxFLx5PgLr3ecvQDrV6YmghP0jG4"
      },
      success: function (res) {
        console.log(res);
        //console.log(new Date(res.data.data.user.birthdate));
        if (res.data.status !== 'ok') {
          wx.showModal({ title: '服务器请求失败,请重试' })
          return
        }
      }, fail: function () {
        wx.showModal({
          title: '微信出错(login)',
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