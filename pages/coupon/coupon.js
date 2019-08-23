var app = getApp()
var pageSize = app.siteInfo.pageSize
Page({

    /*页面的初始数据*/
    data: {
        // origin: '',
        /*coupons: [
          {
            id: 1,
            type: '产品代金券',
            describe: '满300可用',
            date: '2018.07.28-2018.08.28',
            status: 2,
            money: 50
          },
          ]*/
        pageNumber: 1,
        totalPage: 1
    },

    // 选择优惠券；
    selCoupon: function(event) {
        var selIndex = event.currentTarget.dataset.index
        var origin = this.data.origin
        if (this.data.origin == 'sub-order') {
            var pages = getCurrentPages()
            console.log('pages', pages)
            var pageIndex = -1
            for (var i = pages.length - 1; i >= 0; i--) {
                if (pages[i].route == "pages/sub-order/sub-order") {
                    pageIndex = i
                }
            }
            if (pageIndex != -1) {
                var agonePage = pages[pageIndex]
                if (selIndex == -1) {
                    agonePage.setData({
                        couponIndex: selIndex,
                    })
                } else {
                    agonePage.setData({
                        couponIndex: selIndex,
                        coupon: this.data.coupons[selIndex]
                    })
                }
                agonePage.calculate()
                wx.navigateBack({
                    delta: pages.length - 1 - pageIndex
                })
            }
        }
    },

    // 获取优惠券列表；
    getCoupon: function() {
        var that = this
        var pageNumber = that.data.pageNumber
        var url = 'coupon?pageNumber=' + pageNumber+'&pageSize=30'
        app.wxRequest(url, {}, 'GET', that, function(res) {
            console.log('优惠券列表', res)
            if (res.statusCode == 200) {
                that.data.totalPage = res.data.data.totalPage
                wx.hideLoading()
                if ( pageNumber == 1 ) {
                    that.data.couponList = res.data.data.coupons
                } else {
                    that.data.couponList = that.data.couponList.concat(res.data.data.coupons)
                }
                that.setData({
                    couponList: that.data.couponList
                })
            }
        })
    },
	getLocalTime(nS) {
		return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
	},
    /* 生命周期函数--监听页面加载*/
    onLoad: function(options) {
		var that = this
        console.log('coupon----options', options)
        wx.showLoading({
            title: '加载中',
        })
        if (!options.origin) {
            console.log('undefined')
            this.getCoupon()
        } else if (options.origin == 'sub-order') {
            this.data.origin = options.origin
            wx.hideLoading()
            var coupons = JSON.parse(options.coupons)
            console.log('onLoad----coupons', coupons)
			for (var i = 0; i < coupons.length; i++) {
				coupons[i].start_time_s = that.getLocalTime(coupons[i].start_time)
				coupons[i].end_time_s = that.getLocalTime(coupons[i].end_time)
			}
			console.log('onLoad----coupons2===', coupons)
            this.setData({
                coupons: coupons
            })
        }
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
    onReachBottom: function(event) {
        var that = this
        console.log('onReachBottom--event',event)
        var pageNumber = that.data.pageNumber
        var totalPage = that.data.totalPage
        if ( pageNumber < totalPage) {
            that.data.pageNumber = pageNumber + 1
            that.getCoupon()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})