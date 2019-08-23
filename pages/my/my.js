//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        menu: [{
            img: '../../images/my/bulletin.png',
            name: '我的测试报告',
            url: '../report/index',
            status: 1
        }, {
            img: '../../images/my/order.png',
            name: '我的订单',
            url: '../order/order',
            status: 1
        }, {
            img: '../../images/my/cart.png',
            name: '购物车',
            url: '../cart/cart',
            status: 1
        }, {
            img: '../../images/my/cart.png',
            name: '我的朋友',
            url: '../my-friend/my-friend',
            status: 0
        }, {
            img: '../../images/my/credit@2x.png',
            name: '我的积分',
            url: '../my-credit/my-credit',
            status: 1
        }, {
            img: '../../images/my/coupon@2x.png',
            name: '优惠券',
            url: '../coupon/coupon',
            status: 0
        }, {
            img: '../../images/my/appiont@2x.png',
            name: '我的预约',
            url: '../my-appoint/my-appoint',
            status: 1
        }, {
            img: '../../images/menu6.png',
            name: '地址管理',
            url: '../address/address',
            status: 1
        }, ]
    },

    /*getCoupon: function (toatlSize) {
        var that = this
        var pageSize = toatlSize ? toatlSize : 30
        var url = 'coupon?pageNumber=1&pageSize=' + pageSize
        app.wxRequest(url, {}, 'GET', that, function (res) {
            console.log('优惠券列表', res)
            var coupon_active = 0
            if (res.statusCode == 200) {
                that.data.totalPage = res.data.data.totalPage
                wx.hideLoading()
                var couponList = res.data.data.coupons
                if (res.data.data.totalPage > 1 ) {
                    that.getCoupon(res.data.data.totalRow)
                } else if (couponList.length){
                    
                    for (var i = 0; i < couponList.length; i++) {
                        if (couponList[i].status == "ACTIVATION") {
                            coupon_active++
                        }
                    }
                }
                console.log('getCoupon---coupon_active----coupon_active')
                that.setData({
                    coupon_active: coupon_active
                })
            }
        })
    },*/
    openPage: function(event) {
        var page = event.currentTarget.dataset.page
        app.openPage(page)
    },
    bindPhone: function() {
        app.openPage('../register/register')
    },
    getPhoneNumber: function(res) {
        console.log('getPhoneNumber--res', res)
    },
    // 点击菜单；
    clickMenu: function(e) {
        var that = this
        var url = e.currentTarget.dataset.url
        var index = e.currentTarget.dataset.index
        console.log('clickMenu---e', e)
        console.log('clickMenu---url', url)
        if (index == 0) {
            var users = that.data.users
            if (users.phone) {
                url = url + '?phone=' + users.phone
                // url = url + "?phone=13794411866"
                // url = url + "?phone=13922112130"
                app.openPage(url)
            } else {
                wx.showToast({
                    title: '未绑定手机号码',
                    icon: 'none'
                })
            }
        } else {
            app.openPage(url)
        }
    },
    onLoad: function() {},
    onShow: function() {
        var that = this

        app.getUser(function(users) {
            console.log('个人信息--users', users)
            
            if (users) {
                var num = Number(users.delivered) + Number(users.delivering) + Number(users.payPending) + Number(users.commentPending)
                console.log('num', num)
                console.log('users.ACTIVATION', users.ACTIVATION)
                that.setData({
                    users: users,
                    orderNum: num,
                    couponNum: users.ACTIVATION
                })
            }
        })
        app.getCart(function(carts) {
            console.log('index----onshow---app.utils.getUser--carts', carts)
            if (carts) {
                that.setData({
                    carts: carts
                })
            } else {
                that.setData({
                    carts: []
                })
            }
        })
        // that.getCoupon()
        // that.getOrder()
        /*var cart = wx.getStorageSync('cart')
        that.setData({
            cart: cart
        })*/
    },
    getUserInfo: function(e) {
        console.log('123')
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
        })
    }
})