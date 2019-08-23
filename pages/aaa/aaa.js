// pages/aaa/aaa.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    runAM:false
  },
  chanMask:function(){
    var isShow = this.data.show ? false : true;
    var delay  = isShow ? 30 : 1000;
    if(isShow){
      this.setData({
        show: isShow
      });
    }else{
      this.setData({
        runAM: isShow
      });
    }

    setTimeout(function(){
      if(isShow){
        this.setData({
          runAM: isShow
        });
      }else{
        this.setData({
          show: isShow
        });
      }
    }.bind(this), delay);
    
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