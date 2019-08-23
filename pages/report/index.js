// pages/report/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currPage: 1,
        pageSize: 10,
        totalPage: 1,
        dataText: ''
    },
    openPage: function (event) {
        var page = event.currentTarget.dataset.page
        app.openPage(page)
    },
    getReports(phone, currPage) {
        var that = this
        console.log('business----getTestDetails----testId', phone)
        var pageNum = currPage ? currPage:1
        var pageSize = that.data.pageSize
        var reportList
        var totalPage = 1
        app.wxRequest2('meice/reports?userPhone=' + phone + '&pageNum=' + pageNum + '&pageSize=' + pageSize, {}, 'GET', that, function (res) {
            console.log('getReports-----res', res)
            if(res.data.code == 200) {
                if (pageNum == 1) {
                    reportList = []
                } else {
                    reportList = that.data.reportList
                }
                if (res.data.data && res.data.data.records) {
                    totalPage = res.data.data.pages
                    reportList = reportList.concat(res.data.data.records)
                    if (res.data.data.current == res.data.data.pages) {
                        that.data.dataText = '没有更多数据了'
                    } else {
                        that.data.dataText = '加载更多...'
                    }
                }
            } else {
                wx.showToast({
                    title: res.data.message,
                    icon: 'none'
                })
                reportList = that.data.reportList
            }
            that.setData({
                reportList: reportList,
                dataText: that.data.dataText,
                totalPage: totalPage
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        console.log('report----onLoad----options', options)
        if (options && options.phone) {
            that.setData({
                phone: options.phone
            })
            that.getReports(options.phone)
        }
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
        var that = this
        var totalPage = that.data.totalPage
        var currPage = that.data.currPage
        if (currPage < totalPage) {
            currPage += 1
            that.getReports(that.data.phone, currPage)
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})