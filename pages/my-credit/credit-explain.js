// pages/my-credit/credit-explain.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
	getExplain: function (id) {
		var that = this
		var url = 'cms/term/config?type=CREDIT_RULES'
		app.wxRequest2(url, {}, 'GET', that, function (res) {
			console.log('积分规则----res', res)
			if (res.statusCode == 200) {
				if (res.data.data && res.data.data.content) {
					WxParse.wxParse('content', 'html', res.data.data.content, that, 5);
					that.setData({
						explain: res.data.data.content
					})
				} else {
					that.setData({
						explain: ''
					})
				}
			} else {
				that.setData({
					explain: ''
				})
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this
		that.getExplain()
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