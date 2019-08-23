// pages/previewImage/previewImage.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sliderValue: 50
    },

    sliderChange: function(event) {
        console.log('sliderChange---event', event)
        var value = event.detail.value
        this.setData({
            sliderValue: value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        console.log('previewImage-----options', options)
        console.log('previewImage-----onLoad----previewImages', app.globalData.previewImages)
        that.setData({
            previewImages: app.globalData.previewImages
        })
        // var options = {img0: "https://www.muaskin.com/images/meice/4-cross_thumb.png", img1: "https://www.muaskin.com/images/meice/4-Pigmentation_thumb.png"}
        // if (options.img0 &&options.img1) {
        //     this.setData({
        //         imgs: options
        //     })
        // }
        
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