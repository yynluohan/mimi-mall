//index.js
//获取应用实例
const app = getApp()
var pageSize = app.siteInfo.pageSize
Page({
    data: {
        top: 0,
        pageNumber: 1,
        SystemInfo: app.globalData.SystemInfo,
        loginPopup: false,
        isLogin: app.globalData.isLogin
    },
    showLogin: function(e) {
        var that = this
        console.log('index----showLogin----e', e)

        var users = that.data.users
        app.getUser(function(users) {
            if (users) {
                if (!users.phone) {
                    app.openPage('../register/register')
                } else {
                    app.openPage('../my-profile/my-profile')
                }
            } else {
                
            }
        })

		// app.openPage('../register/register')
		return
        app.wxLogin('', that, function(res) {
            var page = getCurrentPages()
            console.log('index---showLogin--res', res)
            console.log('index---showLogin--page', res)
            wx.redirectTo({
                url: './index'
            })
        })
    },
    openPage: function(e) {
        console.log('index----openPage----e', e)
        var page = e.currentTarget.dataset.page
        var openType = e.currentTarget.dataset.openType

        app.openPage(page, openType)

    },
    closeLoginPopup: function() {
        this.setData({
            loginPopup: false
        })
    },
    goRegister: function() {
        app.openPage('../register/register')
    },
    goCart: function() {
        app.openPage('../cart/cart')
    },
    joinCart: function() {
        var that = this
        var myPackge = that.data.myPackge
        var post_data = []
        console.log('joinCart----myPackge', myPackge)
        if (myPackge) {
            for (var i in myPackge) {
                post_data.push({
                    product_id: myPackge[i].id,
                    quantity: 1
                })
            }
        }
        if (post_data) {
            app.wxRequest('shopping_cart?increase=true', post_data, 'POST', that, function(res) {
                console.log('加入购物车', res)
                if (res.data.status_code == 0) {
                    wx.hideLoading()
                    wx.showToast({
                        title: '添加成功',
                    })
                    wx.setStorageSync('cart', res.data.data)
                    that.setData({
                        carts: res.data.data
                    })
                }
            })
        }
    },
    getPackge: function(userPhone) {
        var that = this
		// userPhone = '13922112130'
        app.wxRequest2('gw/app/package/' + userPhone, {}, 'GET', that, function(res) {
            console.log('getPackge-----res', res)
            if (res.data.code == 200) {
                that.setData({
                     myPackge: res.data.data
                  // myPackge:{
                  //   expiredInDays:2,
                  //   products:[
                  //     {
                  //       cover:'https://www.muaskin.com/images/p/80215db34eae42725af9b210aaf36bb4.png',
                  //       name:'i-Softto玻尿酸 30ml 精华液B03',
                  //       matchRage:65,
                  //     },
                  //     {
                  //       cover: 'https://www.muaskin.com/images/p/80215db34eae42725af9b210aaf36bb4.png',
                  //       name: 'i-Softto玻尿酸 30ml 精华液B03',
                  //       matchRage: 65,
                  //     },
                  //     {
                  //       cover: 'https://www.muaskin.com/images/p/80215db34eae42725af9b210aaf36bb4.png',
                  //       name: 'i-Softto玻尿酸 30ml 精华液B03',
                  //       matchRage: 65,
                  //     },
                  //     {
                  //       cover: 'https://www.muaskin.com/images/p/80215db34eae42725af9b210aaf36bb4.png',
                  //       name: 'i-Softto玻尿酸 30ml 精华液B03',
                  //       matchRage: 65,
                  //     }
                  //   ]
                  // }
                })
            } else {
                console.log('getPackge---', res.data.errMsg)
                that.setData({
                    myPackge: []
                })
            }
        })
    },
    loadMore: function() {
        var that = this
        console.log('index----loadMore---触底')
        var pageNumber = that.data.pageNumber
        var goods = that.data.goods
        var category = that.data.category
        var lightIndex = that.data.lightIndex
        var goods = that.data.goods

        if (pageNumber * pageSize == goods.length) {
            that.data.pageNumber = that.data.pageNumber + 1
            that.getProduct(category[lightIndex].id)
        } else {
            console.log('没有更多了')
            console.log('index----loadMore----pageNumber * pageSize', pageNumber * pageSize)
            console.log('index----loadMore----pageNumber * pageSize', goods.length)
            wx.showToast({
                title: "没有更多了",
                icon: "none"
            })
        }
    },
    scrollTopFun: function(e) {
        console.log('scrollTopFun---e', e)
        var top = e.detail.scrollTop;
        this.setData({
            top: top
        })
    },
    // 点击分类；
    selCategory: function(event) {
        console.log('selCategory----event', event.currentTarget.dataset.id)
        var index = event.currentTarget.dataset.index
        var id = event.currentTarget.dataset.id
        this.getProduct(id)
        this.setData({
            category: this.data.category,
            lightIndex: index,
            pageNumber: 1
        })
    },
    goSearch: function() {
        app.openPage('../search/search?isHot=true')
    },
    // 跳转商品详情；
    productDetails: function(event) {
        var id = event.currentTarget.dataset.id
        console.log('productDetails---id', id)
        app.openPage('../product-details/product-details?id=' + id)
    },
    // 点击静态广告；
    clickBanner: function(event) {
        var url = event.currentTarget.dataset.url
        console.log("clickBanner---url", url)
    },
    // 点击轮播图；
    clickAdSwiper: function(event) {
        var url = event.currentTarget.dataset.url
        console.log("clickAdSwiper---url", url)
    },
    // 获取轮播图广告数据；
    getAdSwiper: function() {
        console.log('getAdSwiper---app.token', app.globalData.access_token)
        var that = this
        app.wxRequest('ad', {}, 'GET', that, function(res) {
            console.log('ad', res)
            that.setData({
                adSwiper: res.data.data[0].ads
            })
        })
    },
    // 获取某类别下的产品；
    getProduct: function(id) {
        var that = this
        var pageNumber = that.data.pageNumber
        console.log('getProduct---id', id)

        app.wxRequest('product_category/' + id + '?pageSize=' + pageSize + '&pageNumber=' + that.data.pageNumber, {}, 'GET', that, function(res) {
            console.log('index---getProduct---res', res)
            if (res.data.data && res.data.data.products) {
                if (pageNumber == 1) {
                    that.data.goods = res.data.data.products
                } else {
                    that.data.goods = that.data.goods.concat(res.data.data.products)
                }
                that.setData({
                    goods: that.data.goods
                })
            } else {
                // wx.showToast({
                //     title: '没有更多了',
                //     icon: 'none'
                // })
                that.setData({
                    goods: that.data.goods
                })
            }
        })
    },
    // 获取类别列表；
    getCategory: function() {
        var that = this
		wx.showLoading({
			title: '',
		})
        var category = [{
            name: '全部',
            id: -1
        }]
        app.wxRequest('product_category?promoted=true', {}, 'GET', that, function(res) {
            console.log('category', res)
			wx.hideLoading()
            if (res.statusCode == 200) {
                // category = res.data.data
                category = category.concat(res.data.data)
                that.getProduct(category[0].id)
                that.setData({
                    category: category,
                    lightIndex: 0
                })
            }
            /*for ( var i=0; i<data.data.length; i++ ) {
                if ( data.data[i].products.length > 0 ) {
                    category.array.push({name:data.data[i].name,id:data.data[i].id})
                }
            }
            that.getProduct(category.array[0].id)
            console.log('category',category)
            that.setData({
                category: category
            })*/
        })
    },
    /*getUser: function(callback) {
        var that = this
        app.wxRequest2('gw/account/home', {}, 'GET', that, function(res) {
            console.log('app---getUser---个人信息---res', res)
            if (res.data.code == 200) {
                wx.setStorageSync('users', res.data.data)
                typeof(callback) == 'function' && callback(res)
            }
        })
    },*/
    onLoad: function(options) {
        console.log('index---onLoad---options', options)
        var that = this
        that.data.onLoadOprions = options
        that.getCategory()
        // that.getAdSwiper()
        // that.getPackge()
        /*if ( app.globalData.access_token == '' ) {
            app.wxLogin(function(res) {
                console.log('index---登录',res)
                console.log('index---app.token',app.globalData.access_token)
                that.getCategory()
                that.getAdSwiper()
            })
        } else {
            that.getCategory()
            that.getAdSwiper()
        }*/

        /*this.setData({
            adSwiper: this.data.adSwiper,
            navData: this.data.navData,
            activity: this.data.activity
        })*/
    },
    onShow: function() {
        console.log('index-----onshow')
        var that = this
        // var users = wx.getStorageSync('users')
        // var carts = wx.getStorageSync('cart')
        // console.log('index----onshow---carts', carts)
        // console.log('index----onshow---users', users)

        app.utils.wxLogin('', that, function(res) {
            console.log('index----onLoad---res', res)
            app.getUser(function(users) {
                console.log('index----onshow---app.utils.getUser--res', res)
                if (users) {
                    if (users.phone) {
                        that.getPackge(users.phone)
                    }
                    that.setData({
                        users: users
                    }) 
                }
            })
            app.getCart(function(carts) {
                console.log('index----onshow---app.utils.getUser--res', res)
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

            /*if (carts.length) {
                console.log('!carts')
                app.utils.getCart(that, function(res) {
                    console.log('index----onshow---app.utils.getCart--res', res)
                    that.setData({
                        carts: res.data.data
                    })
                })
            } else {
                that.setData({
                    carts: carts
                })
            }
            if (!users) {
                console.log('!users')
                app.utils.getUser(that, function(res) {
                    console.log('index----onshow---app.utils.getUser--res', res)
                    if (res.data.code == 200 && res.data.data && res.data.data.phone) {
                        that.getPackge(res.data.data.phone)
                    }
                    that.setData({
                        users: res.data.data
                    })
                })
            } else {
                if (users.phone) {
                    that.getPackge(users.phone)
                }
                that.setData({
                    users: users
                })
            }*/
        })
    },
    getUserInfo: function(event) {
        var that = this
        console.log('getUserInfo---event', event)

        app.utils.getUserInfo(event, that, function(res) {
            console.log('getUserInfo----res--111-', res)
            app.globalData.access_token = res.data.data.access_token
            app.globalData.openid = res.data.data.openid
			if (res.data.data.unionid) {
				app.globalData.unionid = res.data.data.unionid
			}
			app.getUser(function (users) {
				that.setData({
					users: users
				})
			})
            var page = getCurrentPages()
            console.log('index---getUserInfo--res', res)
            console.log('index---getUserInfo--page', page)
            // that.onLoad(that.data.onLoadOprions)
            that.onShow()
        })

        // that.setData({
        //     userInfo: e.detail.userInfo,
        //     hasUserInfo: true
        // })
    },
    onReachBottom: function() {
        console.log('index----onReachBottom')

        /*var that = this
        console.log('index----onReachBottom')
        var pageNumber = that.data.pageNumber
        var goods = that.data.goods
        var category = that.data.category
        var lightIndex = that.data.lightIndex
        var goods = that.data.goods

        if ( pageNumber*pageSize == goods.length ) {
            that.data.pageNumber++
            that.getProduct(category[lightIndex].id)
        } else {
            console.log('没有更多了')
            wx.showToast({
              title: "没有更多了",
              icon: "none"
            })
        }*/
    },
    onShareAppMessage: function(e) {

    }

})