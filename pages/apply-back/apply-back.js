// pages/apply-back/apply-back.js
Page({

  /**
   * 页面的初始数据
   */
   data: {
    order: {
      goods: [
      {
        id: 1,
        cover: '../../images/800.png',
        name: 'LUX力士 恒久嫩肤娇肤沐浴乳1升'
      },
      {
        id: 1,
        cover: '../../images/800.png',
        name: 'LUX力士 恒久嫩肤娇肤沐浴乳1升'
      },
      ],
      price: 68.00
    },
    apply: {
      goods: [
      {
        id: 1,
        img: '../../images/800.png'
      },
      {
        id: 1,
        img: '../../images/800.png'
      },
      {
        id: 1,
        img: '../../images/800.png'
      },
      ],
      status: 1
    },
    showPopup: false
  },

  closePopup: function (event) {
    this.setData({
      showPopup: !this.data.showPopup
    })
  },
  showPopup: function (event) {
    this.setData({
      showPopup: !this.data.showPopup
    })
  },

  formSubmit: function (event) {
    console.log('event',event)
  },
  delImg: function (event) {
    console.log("删除")
    // var index = event.currentTarget.dataset.index
  },

  update: function (event) {
    console.log("上传")
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