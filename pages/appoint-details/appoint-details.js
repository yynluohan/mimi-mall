var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appoint: {
      id: 1,
      type: '皮肤测试、DNA测试',
      num: '123456789',
      cover: '../../images/store_cover.jpg',
      name: '珠江新城体验二店',
      address: '广州市天河区珠江西路23号珠江新城商城专柜',
      date: '2017.05.10   上午',
      price: 30.00,
      code: '34428349283948',
      status: 2,
    }
  },

  getAppointDetails: function(id) {
    var that = this
    app.wxRequest2('appointment/appointments/'+id, {}, 'GET', that, function(res) {
      console.log('预约详情---res',res)
      if ( res.data.code == 200 ) {
        that.setData({
          appoint: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options',options)
    this.getAppointDetails(options.id)
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