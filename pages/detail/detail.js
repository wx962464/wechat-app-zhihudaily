var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    art: {},
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  onLoad: function (options) {
    console.log("onLoad options = " + options.id)
    var that = this
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
          var content = res.data.body
          console.log(content)
          WxParse.wxParse('detailContent', 'html', content, that, 5);
          that.setData({
            art: res.data
          })
      }
    })
  }
})
