// pages/my-credit/my-credit.js
var app = getApp()
var date = new Date()
var year = date.getFullYear()
var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nowDate: year + '-' + month,
        creditList: [{
            time: '2018-10-21 00:09:58',
            content: '好评赠送',
            credit: 100,
            status: 1,
            order_num: 18101810075698120
        }, {
            time: '2018-10-21 00:09:58',
            content: '积分退还',
            credit: 200,
            status: 2,
            order_num: 18101810075698120
        }, {
            time: '2018-10-21 00:09:58',
            content: '积分抵扣',
            credit: 100,
            status: 3,
            order_num: 18101810075698120
        }, {
            time: '2018-10-21 00:09:58',
            content: '好评赠送',
            credit: 100,
            status: 1,
            order_num: 18101810075698120
        }, {
            time: '2018-10-21 00:09:58',
            content: '积分退还',
            credit: 200,
            status: 2,
            order_num: 18101810075698120
        }, {
            time: '2018-10-21 00:09:58',
            content: '积分抵扣',
            credit: 100,
            status: 3,
            order_num: 18101810075698120
        }, {
            time: '2018-10-21 00:09:58',
            content: '好评赠送',
            credit: 100,
            status: 1,
            order_num: 18101810075698120
        }, {
            time: '2018-10-21 00:09:58',
            content: '积分退还',
            credit: 200,
            status: 2,
            order_num: 18101810075698120
        }, {
            time: '2018-10-21 00:09:58',
            content: '积分抵扣',
            credit: 100,
            status: 3,
            order_num: 18101810075698120
        }, ]
    },
    openPage: function(e) {
		var page = e.currentTarget.dataset.page
        var openType = e.currentTarget.dataset.openType

		app.openPage(page, openType)

    },
    bindPickerChange: function(event) {
        console.log('bindPickerChange--event', event)
        var value = event.detail.value
        this.setData({
            nowDate: value
        })
    },
    getCredit() {
        var that = this
        app.wxRequest2('vip/agent/app/credit', {}, 'GET', that, function(res) {
            console.log('getCredit----我的积分-----res', res)
            if(res.data.code== 200) {
                that.setData({
                    creditData: res.data.data
                })
            }
        })
    },
    getHistories() {
        var that = this
        app.wxRequest2('vip/credit/histories?vipId=0', {}, 'GET', that, function(res) {
            console.log('getHistories----获取积分历史信息-----res', res)
            if(res.data.code== 200) {
                that.setData({
                    historiesData: res.data.data.records
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        console.log('month', month)
        console.log('that.data.nowDate', that.data.nowDate)
        var nowDate = that.data.nowDate
        that.getCredit()
        app.getUser(function(users) {
            console.log('my-credit------onLoad=====users', users)
            that.getHistories(users.vipNo)
        })

        that.setData({
            nowDate: nowDate
        })
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