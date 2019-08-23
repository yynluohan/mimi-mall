var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        webUrl: 'http://team.muaskin.com',
        friends: [{
            avatar: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ66UDoa8HicdBuNc820jKrOicXzqhro8Orm50BcxRRTSVriaAEYFdqQ7ibqfBesniccgWic1CNjfxxV6zQ/132",
        }]
    },
    webMessage(e) {
        var that = this
        wx.showLoading({
            title: '',
        })
        console.log('webMessage-----e', e)
    },
    webError(e) {
        var that = this
        console.log('webError-----e', e)
        wx.hideLoading()
    },
    webLoad(e) {
        var that = this
        console.log('webLoad-----e', e)
        wx.hideLoading()
    },
    getSeller: function() {
        var that = this
        app.wxRequest('seller', {}, 'GET', that, function(res) {
            console.log('getSeller--res',res)
            that.setData({
                sellers: res.data.data
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getSeller()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var that = this
        var users = wx.getStorageSync('users')
        console.log('users----', users);
        that.setData({
            users: users
        })
        wx.showLoading({
            title: '',
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})