var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: {
            id: 1,
            num: '123456789',
            goods: [{
                id: 1,
                name: '索芙特花香美肤沐浴露',
            }, {
                id: 1,
                name: '索芙特花香美肤沐浴露',
            }, {
                id: 1,
                name: '索芙特花香美肤沐浴露',
            }, {
                id: 1,
                name: '索芙特花香美肤沐浴露',
            }, ],
            time: '2018-08-31 18:18:18'
        }
    },
    footBtn: function(event) {
        console.log('payment---footBtn----event', event)
        var url = event.currentTarget.dataset.url
        if (url == "/pages/index/index") {
            console.log('')
            wx.switchTab({
                url: url
            })
        } else {
            app.openPage(url)
        }
    },
    pay: function(event) {
        var order_number = event.currentTarget.dataset.orderNumber

        var that = this
        var post_order = {
            "order_number": order_number,
            "order_type": "Order",
            "type": "WXA"
        }
        app.wxRequest('wx/push_order', post_order, 'POST', that, function(res) {
            console.log('wxPay----res', res)
            if (res.data.status_code == 0) {
                wx.requestPayment({
                    "timeStamp": res.data.data.timeStamp,
                    "nonceStr": res.data.data.nonceStr,
                    "package": res.data.data.package,
                    "signType": res.data.data.signType,
                    "paySign": res.data.data.paySign,
                    success: function(res) {
                        console.log('requestPayment----res', res)
                        if (res.errMsg == "requestPayment:ok") {
                            // app.openPage('../payment/payment?order_number='+order_number)

                            // app.openPage('../order-details/order-details')
                        }
                    },
                    fail: function(e) {
                        console.log('fail----e', e)
                        wx.showToast({
                            title: '支付失败',
                            image: '../../images/fail.png',
                            duration: 1000
                        })
                        // app.openPage('../payment/payment?order_number='+order_number)
                        // app.openPage('../order-details/order-details?order_number='+order_number)
                    }
                })
            } else if (res.data.status_code == 1) {
                wx.showToast({
                    title: '支付失败',
                    image: '../../images/fail.png'
                })
            }
        })
    },
    getOrderDetails: function(order_number) {
        var _this = this
        app.wxRequest('order/' + order_number, {}, 'GET', function(res) {
            console.log('payment---getOrderDetails---res', res)
            _this.setData({
                order: res.data.data,
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log('payment---options', options);
        var order_number = options.order_number
        this.getOrderDetails(order_number)
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