// order.js
var app = getApp()
var pageSize = app.siteInfo.pageSize
// var pageSize = 5
Page({

    //  * 页面的初始数据   
    data: {
        navArr: [
            { title: '全部', status: '' },
            { title: '待付款', status: 'CREATED_PAY_PENDING' },
            { title: '待发货', status: 'CONFIRMED_DELIVER_PENDING' },
            { title: '待收货', status: 'DELIVERED_CONFIRM_PENDING' },
			{ title: '待评价', status: 'CLOSED_CONFIRMED' },
        ],
        statusArr: [
            { status: 'CREATED_PAY_PENDING', name: '待支付' },
            { status: 'CLOSED_PAY_TIMEOUT', name: '支付超时关闭' },
            { status: 'CLOSED_CANCELED', name: '已取消' },
            { status: 'PAID_CONFIRM_PENDING', name: '已支付' },
            { status: 'CONFIRMED_DELIVER_PENDING', name: '待发货' },
            { status: 'DELIVERING', name: '发货中' },
            { status: 'DELIVERED_CONFIRM_PENDING', name: '已发货' },
            { status: 'CANCELED_RETURN_PENDING', name: '待退货' },
            { status: 'CLOSED_CONFIRMED', name: '已确认收货' },
            { status: 'CANCELED_REFUND_PENDING', name: '待退款' },
            { status: 'CLOSED_REFUNDED', name: '已退款' }
        ],
        lightIndex: 0,
        pageNum: 1,
        orderList: [
            /*{
              id: 1,
              order_number: '172132415341351',
              status: 1,
              goods: [
              {
                name: 'LUX力士 恒久嫩肤娇肤沐浴乳润白美肤1升',
                price: 38.98,
                num: 2,
                cover: '../../images/800.png'
              },
              {
                name: 'LUX力士 恒久嫩肤娇肤沐浴乳润白美肤1升',
                price: 38.98,
                num: 2,
                cover: '../../images/800.png'
              }
              ],
              total_price: 88.88
            },
            {
              id: 1,
              order_number: '172132415341351',
              status: 1,
              goods: [
              {
                name: 'LUX力士 恒久嫩肤娇肤沐浴乳润白美肤1升',
                price: 38.98,
                num: 2,
                cover: '../../images/800.png'
              },
              {
                name: 'LUX力士 恒久嫩肤娇肤沐浴乳润白美肤1升',
                price: 38.98,
                num: 2,
                cover: '../../images/800.png'
              }
              ],
              total_price: 88.88
            },
            */
        ],
        status: ''
    },
    getUsers: function() {
        var that = this
        app.getUser(function(users) {
            console.log('个人信息--users', users)
            if (users) {
                var num = Number(users.delivered) + Number(users.delivering) + Number(users.payPending) + Number(users.commentPending)
                console.log('num', num)
                that.setData({
                    users: users
                })
            } else {
                that.setData({
                    users: {}
                })
            }
            
        })
    },
    orderBtn: function(event) {
        console.log('orderBtn---event', event)
        var _this = this
        var operation = event.currentTarget.dataset.operation
        var order_number = event.currentTarget.dataset.orderNumber
        console.log('operation', operation)
        // 提醒发货；
        if (operation == 'reminder') {
            app.wxRequest('order_deliver_reminder/' + order_number, {}, 'GET', that, function(res) {
                console.log('提醒发货----res', res)
                if (res.data.message == "order.deliver.reminded" && res.data.status_code == 0) {
                    wx.showToast({
                        title: '已提醒发货',
                        icon: 'success',
                        duration: 1000
                    })
                } else {
                    wx.showToast({
                        title: '已提醒发货,请耐心等待',
                        icon: 'none',
                        duration: 1000
                    })
                }
            })
        } else if (operation == 'confirm') {
            // 确认订单；
            var post_data = { "status": "CLOSED_CONFIRMED" }
            app.wxRequest('order/' + order_number, post_data, 'PUT', that, function(res) {
                console.log('确认订单；----res', res)
                if (res.data.message == "order.delete.success" && res.data.status_code == 0) {
                    wx.showToast({
                        title: '已确认订单；',
                        icon: 'success',
                        duration: 1000
                    })
                    _this.getOrderList(_this.data.navArr[_this.data.lightIndex].status)
                }
            })
        } else if (operation == 'delete') {
            // 删除订单；
            app.wxRequest('order/' + order_number, {}, 'DELETE', that, function(res) {
                console.log('删除订单；----res', res)
                if (res.data.message == "order.delete.success" && res.data.status_code == 0) {
                    wx.showToast({
                        title: '已删除订单',
                        icon: 'success',
                        duration: 1000
                    })
                    _this.getOrderList(_this.data.navArr[_this.data.lightIndex].status)
                }
            })
        } else if (operation == 'pay') {
            // 去支付；
            var post_data = {
                "order_type": "Order",
                "order_number": order_number,
                "type": "WXA"
            }
            app.wxRequest('wx/push_order', post_data, 'POST', that, function(res) {
                console.log('支付订单---res', res)
                if (res.data.status_code == 0) {
                    wx.requestPayment({
                        "timeStamp": res.data.data.timeStamp,
                        "nonceStr": res.data.data.nonceStr,
                        "package": res.data.data.package,
                        "signType": res.data.data.signType,
                        "paySign": res.data.data.paySign,
                        success: function(res) {
                            console.log('requestPayment----res', res)
                            _this.getOrderList(_this.data.navArr[_this.data.lightIndex].status)
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
        }
    },
    payment: function(options) {
        console.log('order.js----payment---options', options)
        var order_number = options.currentTarget.dataset.orderNumber

        app.payment(order_number, function(res) {
            console.log('order.js----payment---res', res)

            this.getOrderList('')
        })
    },
    //点击导航调用该方法
    clickNav: function(event) {

        var that = this
        var lightIndex = event.currentTarget.dataset.index
        that.data.status = event.currentTarget.dataset.status
        that.data.pageNum = 1
        wx.showLoading({
            title: ''
        })
        that.data.orderList = []
        that.setData({
            lightIndex: lightIndex,
        })
        that.getOrderList(that.data.status)
    },
    // 请求订单列表数据；
    getOrderList: function(status, pageNum) {
        console.log('---------order-----getOrderList-----status', status)

        var that = this
        var status = status
        var navArr = that.data.navArr
        var pageNum = that.data.pageNum
        console.log('getOrderList---pageNum',pageNum)
        console.log(status)
        if (status == '') {
            // 全部订单；
            status = ''
        } else {
            if (status == 'CONFIRMED_DELIVER_PENDING') {
                // delivering：待发货；
              status = '&status=CONFIRMED_DELIVER_PENDING&status=DELIVERING&status=PAID_CONFIRM_PENDING'
            } else if ( status == 'DELIVERED_CONFIRM_PENDING' ){
                // delivered: 待收货；
              status = '&status=DELIVERED_CONFIRM_PENDING&status=CANCELED_RETURN_PENDING&status=CONFIRMED_PICK_PENDING'
            } else if (status == 'CLOSED_CONFIRMED') {
              status = '&status=' + status + '&commented=false'
            } else {
              status = '&status=' + status
            }
        }
        console.log(status)
		var orderList = that.data.orderList
		if (!pageNum) {
			pageNum = 1
			orderList = []
		}
		var url = 'order?pageNumber=' + pageNum + '&pageSize=' + pageSize + status + '&queryMarketing=false'
		app.wxRequest(url, {}, 'GET', that, function (res) {
			console.log('order---res', res)
			that.data.total_page = res.data
			wx.hideLoading()
			var orderList2 = orderList.concat(res.data.data)

			console.log('orderListres', orderList)
			that.setData({
				orderList: orderList2,
				lightIndex: that.data.lightIndex,
				pageNum: pageNum
			})
		})
    },
    // 点击订单中间部分调用跳转；
    orderDetails: function(event) {
        console.log('orderDetails---event', event)
        var order_number = event.currentTarget.dataset.orderNumber
        var statusName = event.currentTarget.dataset.statusName
        // app.openPage('../evaluate/evaluate?order_number=' + order_number + '&statusName=' +statusName)
        app.openPage('../order-details/order-details?order_number=' + order_number + '&statusName=' + statusName)
    },
    // 取消订单；
    delOrder: function(event) {

        var _this = this
        var order_number = event.currentTarget.dataset.orderNumber
        wx.showModal({
            title: '提示',
            content: '确定要取消订单吗？',
            success: function(result) {
                wx.request({
                    url: app.globalData.URL_API + '/order/' + order_number,
                    data: {},
                    method: 'DELETE',
                    header: {
                        'Authorization': app.globalData.token,
                        'content-type': 'json'
                    },
                    success: function(res) {
                        console.log('delOrder----取消订单---res', res)
                        wx.showToast({
                            title: '已取消订单！',
                            icon: 'success',
                            duration: 500
                        })
                        _this.getOrderList('')

                    }
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log('---------order-----onLoad-----options', options)
        wx.showLoading({
            title: ''
        })
        var navArr = this.data.navArr

        /*for ( var i=0; i<4; i++ ) {
          if ( status == navArr[i].status ) {
            this.data.lightIndex = i
          }
        }
        console.log(this.data.lightIndex)
        */
        this.getOrderList('')
        this.getUsers()
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
        wx.stopPullDownRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var that = this
        var pageNum = that.data.pageNum
        var orderList = that.data.orderList
        if ( pageNum*pageSize == orderList.length ) {
			pageNum += 1
			that.getOrderList(this.data.status, pageNum)
        } else {
            wx.showToast({
                title: '没有更多了',
                icon: 'none'
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})