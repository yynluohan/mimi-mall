// pages/product-details/product-details.js

var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({

    /*页面的初始数据*/
    data: {
        num: 1,
        show: false,
        runAM: false,
        showPicker: false,
        isVideo: false,
        pageNum: 1,
        product: {
            // cover: ['../../images/800.png','../../images/800.png']
        }
    },
    /*addCart: function(url, post_data, method, callback) {
      app.wxRequest('shopping_cart?increase=false', post_data,'POST', function(res) {
        console.log('加入购物车',res)
        that.setData({
          cart: res.data.data
        })
      })
    },*/
    /*pauseVideo: function(event) {
      console.log('pauseVideo---event',event)
      this.setData({
        isVideo: false
      })
    },*/
    getMore: function(event) {
        console.log('getMore----event', event)
        var id = event.currentTarget.dataset.id
        app.openPage('../evaluate-list/evaluate-list?id=' + id)
    },
    // 获取商品评价；
    getEvaluations: function(id) {
        var that = this
        var pageNum = that.data.pageNum
        var url = 'gw/expore/info/evaluations?stockType=Product&pageSize=10&pageNum=' + pageNum + '&stockId=' + id
        app.wxRequest2(url, {}, 'GET', that, function(res) {
            console.log('商品评论----res', res)
            that.setData({
                evaluation: res.data.data
            })
        })
    },
    // 视频播放；
    startVideo: function(event) {
        this.setData({
            isVideo: true
        })
    },
    // 更新商品数量；
    numFun: function(event) {
        var type = event.currentTarget.dataset.type

        if (type == "minus") {
            if (this.data.num > 1) {
                this.data.num -= 1
            }
        } else if (type == "add") {
            this.data.num += 1
        }
        this.setData({
            num: this.data.num
        })
    },

    chanMask: function(event) {
        console.log('chanMask', event)
        var that = this
        var product = that.data.product

        if (product.required_participate_exam==1) {
            console.log('禁止----')
            return
        }
        if (event) {
            if (event.currentTarget.dataset.form) {
                that.data.form = event.currentTarget.dataset.form
            }
        }
        var users = that.data.users
        console.log('chanMask----users', users)
        if (users != '') {
            if (users.phone == null) {
                app.openPage('/pages/register/register')
            } else {
                var isShow = that.data.show ? false : true;
                var delay = isShow ? 30 : 500;
                console.log('delay---', delay)
                that.setData({
                    show: isShow,
                    runAM: !that.data.runAM
                })
                if (isShow) {
                    that.setData({
                        show: isShow
                    });
                } else {
                    that.setData({
                        runAM: isShow
                    });
                }

                setTimeout(function() {
                    console.log('setTimeout----1')
                    if (isShow) {
                        console.log('setTimeout----2')

                        that.setData({
                            runAM: isShow
                        });
                    } else {
                        console.log('setTimeout----3')
                        that.setData({
                            show: isShow
                        });
                    }
                }.bind(that), delay);
            }
        }

    },
    closePicker: function() {
        console.log('关闭')
        this.setData({
            showPicker: false
        })
    },

    confirm: function(event) {
        wx.showLoading({
            title: '加载中'
        })
        console.log('购买', event)
        var that = this
        var form = that.data.form
        var num = that.data.num
        var product = this.data.product
        // var price = parseInt(num) * product.price
        that.chanMask()

        if (form == 'cart') {
            var post_data = [{
                "product_id": product.id,
                "quantity": num,
                "price": product.price,
                "fare_id": product.fare_id,
                "weight": product.weight,
                "bulk": product.bulk
            }]
            app.wxRequest('shopping_cart?increase=false', post_data, 'POST', that, function(res) {
                console.log('加入购物车', res)
                if (res.data.status_code == 0) {
                    wx.hideLoading()
                    wx.showToast({
                        title: '已加入购物车',
                    })
                    wx.setStorageSync('cart', res.data.data)
                    that.setData({
                        cart: res.data.data
                    })
                }
            })
        } else if (form == 'buy') {
            var id = event.currentTarget.dataset.id
            var products = [{
                    product_id: product.id,
                    quantity: num,
                    price: product.price,
                    fare_id: product.fare_id,
                    weight: product.weight,
                    bulk: product.bulk,
					product_specification_id: null,
					product_specification_name: null,
					product_name: product.name,
					stock_balance: product.stock_balance,
					cover: product.cover,
					credit: product.credit,
                }]
                products = JSON.stringify(products)
            app.openPage('../sub-order/sub-order?products=' + products)
        }
    },
    goCart: function() {
        app.openPage('../cart/cart')
    },
    // 点击轮播图；
    clickSwiper: function(event) {
        console.log('轮播图')
        /*wx.previewImage({
          current: '../../images/details1.png',
          urls: ['../../images/details1.png','../../images/goods.png']
        })*/
    },
    // 获取商品；
    getProduct: function(id) {
        var that = this
		wx.showLoading({
			title: '',
		})
        var detailImg = []
        app.wxRequest('product/' + id, {}, 'GET', that, function(res) {
			wx.hideLoading()
            console.log('getProduct----res', res)
            detailImg = res.data.data.covers
            if (res.data.data.description != null) {
                WxParse.wxParse('description', 'html', res.data.data.description, that, 5);
            }
            that.setData({
                detailImg: detailImg,
                product: res.data.data
            })
        })
        // var detailImg = this.data.product.cover
        // console.log('detailImg',detailImg)
        // WxParse.wxParse('description', 'html', description, _this, 5);
    },

    //  生命周期函数--监听页面加载
    onLoad: function(options) {
        console.log('product-details.js---options', options)
        var that = this
        if (options.id) {
            that.getProduct(options.id)
            that.getEvaluations(options.id)
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
        var that = this
        app.getUser(function(users) {
            console.log('index----onshow---app.utils.getUser--users', users)
            if (users) {
                that.setData({
                    users: users
                })
            }
        })
        app.getCart(function(carts) {
            console.log('index----onshow---app.utils.getUser--carts', carts)
            if (carts) {
                that.setData({
                    cart: carts
                })
            } else {
                that.setData({
                    carts: []
                })
            }
        })
        /*var users = wx.getStorageSync('users')
        var cart = wx.getStorageSync('cart')
        if ( users == '' ) {
          app.getUser(function(res) {
            console.log('product-details---getUser--res',res)
            this.setData({
              users: res.data.data,
              cart: cart
            })
          })
        } else {
          this.setData({
            users: users,
            cart: cart
          })
        }*/
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