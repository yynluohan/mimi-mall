var app = getApp()
Page({

    /*页面的初始数据*/
    data: {
        /*order: {
          status: 2,
          time: 29,
          address: '广东省 广州市 黄浦区 科学城彩频路广东软件园C栋000',
          user: '张三',
          phone: '13644455588',
          date: '2017.05.10   10:20:30',
          num: 1235456789,
          remark: '请发顺丰快递',
          goods: [
            {
              id: 1,
              cover: '../../images/800.png',
              name: '香氛臻焕修护尊享装',
              price: 39.90,
              num: 2,
            },
            {
              id: 1,
              cover: '../../images/800.png',
              name: '香氛臻焕修护尊享装',
              price: 39.90,
              num: 2,
            },
            {
              id: 1,
              cover: '../../images/800.png',
              name: '香氛臻焕修护尊享装',
              price: 39.90,
              num: 2,
            },
          ],
          express: {
            node: '[广州市] 快件已在广州天河区签收  签收人：前台，感谢您使用中通快递，期待再次为您服务',
            time: '2018-06-06 12:57:36'
          }
        }*/
        statusArr: [{
            status: 'CREATED_PAY_PENDING',
            name: '待支付'
        }, {
            status: 'CLOSED_PAY_TIMEOUT',
            name: '支付超时关闭'
        }, {
            status: 'CLOSED_CANCELED',
            name: '已取消'
        }, {
            status: 'PAID_CONFIRM_PENDING',
            name: '已支付'
        }, {
            status: 'CONFIRMED_DELIVER_PENDING',
            name: '待发货'
        }, {
            status: 'DELIVERING',
            name: '发货中'
        }, {
            status: 'DELIVERED_CONFIRM_PENDING',
            name: '已发货'
        }, {
            status: 'CANCELED_RETURN_PENDING',
            name: '待退货'
        }, {
            status: 'CLOSED_CONFIRMED',
            name: '已确认收货'
        }, {
            status: 'CANCELED_REFUND_PENDING',
            name: '待退款'
        }, {
            status: 'CLOSED_REFUNDED',
            name: '已退款'
        }],
    },

    orderBtn: function(event) {
        console.log('orderBtn---event', event)
        var that = this
        var operation = event.currentTarget.dataset.operation
        var order_number = event.currentTarget.dataset.orderNumber
        console.log('status', status)
        if (operation == 'reminder') {
            console.log('DELIVERED_CONFIRM_PENDING')
            app.wxRequest('order_deliver_reminder/' + order_number, {}, 'GET', that, function(res) {
                console.log('提醒发货----res', res)
                if (res.data.message == "order.deliver.reminded" && res.data.status_code == 0) {
                    wx.showToast({
                        title: '已提醒发货',
                        icon: 'success',
                        duration: 1000
                    })
                }
            })
        } else if (operation == 'delete') {
            app.wxRequest('order/' + order_number, {}, 'DELETE', that, function(res) {
                console.log('删除订单----res', res)
                if (res.data.message == "order.delete.success" && res.data.status_code == 0) {
                    wx.showToast({
                        title: '已删除',
                        icon: 'success',
                        duration: 1000
                    })
                    setTimeout(function() {
                        app.openPage('../order/order')
                    }, 1000)
                }
            })
        } else if (operation == 'pay') {
            var post_data = {
                "order_type": "Order",
                "order_number": order_number,
                "type": "WXA"
            }
            app.wxRequest('wx/push_order', post_data, 'POST', that, function(res) {
                console.log('支付---res', res)
                if (res.data.status_code == 0) {
                    wx.requestPayment({
                        "timeStamp": res.data.data.timeStamp,
                        "nonceStr": res.data.data.nonceStr,
                        "package": res.data.data.package,
                        "signType": res.data.data.signType,
                        "paySign": res.data.data.paySign,
                        success: function(res) {
                            console.log('requestPayment----res', res)
                            that.getOrderDetails(options.order_number)
                        },
                        fail: function(e) {
                            console.log('fail----e', e)
                            wx.showToast({
                                title: '支付失败',
                                image: '../../images/fail.png',
                                duration: 1000
                            })
                        }
                    })
                } else if (res.data.status_code == 1) {
                    wx.showToast({
                        title: '支付失败',
                        image: '../../images/fail.png'
                    })
                }
            })
        } else if (operation == 'evaluate') {

        }
    },

    expressDetails: function(event) {
        app.openPage('../express-details/express-details')
    },

    getOrderDetails: function(order_number) {
        var that = this
        app.wxRequest('order/' + order_number, {}, 'GET', that, function(res) {
            console.log('getOrderDetails---res', res)
            var product_price = 0
            if (res.data.data.order_items.length > 0) {
                var order_items = res.data.data.order_items
                for (var i in order_items) {
                    product_price += order_items[i].final_price
                }
            }
            that.setData({
                order: res.data.data,
                product_price: parseFloat(product_price).toFixed(2)
            })
        })
    },
    //  * 生命周期函数--监听页面加载

    onLoad: function(options) {
        console.log('order-details----options', options)
        this.data.order_number = options.order_number
        this.getOrderDetails(options.order_number)
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