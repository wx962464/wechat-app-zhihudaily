//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    list: [],
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false,
  },
  //事件处理函数
  bindViewTap: function(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  loadMore: function () {
    if (this.data.list.length === 0) return
    var date = this.getNextDate()
    var that = this
    that.setData({ loading: true })
    wx.request({
      url: 'http://news.at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date)) + 1),
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideNavigationBarLoading()
        that.setData({
           loading: false,
           list: that.data.list.concat([{ header: utils.formatDateWithWeekDay(date) }]).concat(res.data.stories)
         })
      },
      fail: function() {
        wx.hideNavigationBarLoading()
      }
    })
  },
  getNextDate: function (){
    var now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  onReachBottom: function() {
     console.log('触发了底部的刷新，开始加载')
     wx.showNavigationBarLoading()
     this.loadMore();
  },
  onLoad: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/latest',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
         that.setData({
           banner: res.data.top_stories,
           list: res.data.stories
          //  list: [{ header: '今日热闻' }].concat(res.data.stories)
         })
      },
      fail: function() {
        wx.hideLoading()
      }
    })
    this.index = 1
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    
  }
})
