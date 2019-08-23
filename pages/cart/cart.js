var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allSel: false,
        total_price: 0,
        selIndex: 0,
        btnWidth: 120,
        startX: 0,
        selArray: []
    },

    windUp: function() {
        var selArray = this.data.selArray
        var allSel = this.data.allSel
        var cartList = this.data.cartList
        var products = []
        var sub = false
        if (allSel) {
            if (cartList.length > 0) {
                sub = true
                for (var i = 0; i < cartList.length; i++) {
                    // var price = parseInt(cartList[i].quantity) * cartList[i].price
                    products[i] = {
                        "product_id": cartList[i].product_id,
                        "quantity": cartList[i].quantity,
                        "price": cartList[i].price,
                        "fare_id": cartList[i].fare_id,
                        "weight": cartList[i].weight,
                        "bulk": cartList[i].bulk,
                    }
                }
            }
        } else if (selArray.length > 0) {
            var num = 0
            console.log('selArray', selArray)
            for (var i = 0; i < cartList.length; i++) {
                if (selArray[i] == true) {
                    products[num] = {
                        "product_id": cartList[i].product_id,
                        "quantity": cartList[i].quantity,
                        "price": cartList[i].price,
                        "fare_id": cartList[i].fare_id,
                        "weight": cartList[i].weight,
                        "bulk": cartList[i].bulk,
                    }
                    num++
                }
            }
        } else if (selArray.length == 0) {
            wx.showToast({
                title: '请选择商品',
                icon: 'none'
            })
        }
        if (products.length == 0) {
            wx.showToast({
                title: '请选择商品',
                icon: 'none'
            })
            return
        }
        var products = JSON.stringify(products)

        console.log('products', products)
        app.openPage('../sub-order/sub-order?products=' + products)
    },

    // 跳转商品详情；
    productDetails: function(event) {
        var id = event.currentTarget.dataset.id
        console.log('productDetails---id', id)
        app.openPage('../product-details/product-details?id=' + id)
    },
    calculationPrice: function() {
        var that = this
        var selArray = that.data.selArray
        var cartList = that.data.cartList
        var total_price = 0
        for (var i in selArray) {
            if (selArray[i]) {
                total_price += Number(cartList[i].price) * Number(cartList[i].quantity)
            }
        }
        that.setData({
            total_price: parseFloat(total_price).toFixed(2)
        })
    },
    selProduct: function(event) {
        var index = event.currentTarget.dataset.index
        var total_price = 0
        var cartList = this.data.cartList
        var selArray = this.data.selArray
        console.log('selArray[index]', selArray[index])

        selArray[index] = selArray[index] ? false : true
        console.log('selArray[index]', selArray)
        var selectNum = 0
        for (var i in selArray) {
            if (selArray[i]) {
                total_price += cartList[i].price * parseInt(cartList[i].quantity)
                selectNum++
            }
        }
        if (selectNum == cartList.length) {
            this.setData({
                total_price: parseFloat(total_price).toFixed(2),
                allSel: true,
                selArray: selArray
            })
        } else {
            this.setData({
                total_price: parseFloat(total_price).toFixed(2),
                allSel: false,
                selArray: selArray
            })
        }
    },

    allSel: function(event) {
        console.log('全选', event)
        var total_price = 0
        var selArray = this.data.selArray
        var cartList = this.data.cartList
        if (!this.data.allSel) {
            for (var i = 0; i < cartList.length; i++) {
                selArray[i] = true
                total_price += cartList[i].price * parseInt(cartList[i].quantity)
            }
        } else {
            for (var i in cartList) {
                selArray[i] = false
            }
            total_price = 0
        }
        this.setData({
            allSel: !this.data.allSel,
            total_price: parseFloat(total_price).toFixed(2),
            selArray: selArray
        })
    },

    touchStart: function(event) {
        console.log('touchStart---event', event)
        var startX = event.touches[0].clientX
        var startY = event.touches[0].clientY
        this.setData({
            startX: startX,
            startY: startY,
            itemLefts: []
        })
    },
    touchMove: function(event) {
        console.log('touchMove---event', event)
        var index = event.currentTarget.dataset.index
        var movedX = event.touches[0].clientX - this.data.startX
        var movedY = event.touches[0].clientY - this.data.startY
        var btnWidth = this.data.btnWidth
        var itemLefts = this.data.itemLefts
        if (Math.abs(movedX) > this.data.btnWidth / 2) {
            itemLefts[index] = -movedX
            this.setData({
                itemLefts: itemLefts
            })
        } else {
            this.setData({
                itemLefts: []
            })
        }
    },
    touchEnd: function(event) {
        var index = event.currentTarget.dataset.index
        var endX = event.changedTouches[0].clientX
        var endY = event.changedTouches[0].clientY
        var moveX = this.data.startX - endX
        var buttonWidth = 120
        if (moveX < 0 || moveX == 0) {
            moveX = 0
        } else {
            if (moveX >= this.data.btnWidth / 2) {
                moveX = this.data.btnWidth
            } else {
                moveX = 0
            }
        }
        var itemLefts = this.data.itemLefts
        itemLefts[index] = -moveX
        this.setData({
            itemLefts: itemLefts,
            isScrollY: true
        })
    },
    // 删除地址；
    delAddress: function(event) {
        var that = this
        var id = event.currentTarget.dataset.id
        var post_data = [{
            "product_id": id,
            "quantity": 0
        }]
        app.wxRequest('shopping_cart?increase=false', post_data, 'POST', that, function(res) {
            console.log('删除购物车', res)
            if (res.data.status_code == 0) {
                wx.showToast({
                    title: '已删除',
                })
                wx.setStorageSync('cart', res.data.data)
            }
            that.setData({
                cartList: res.data.data,
                itemLefts: [],
                selArray: [],
                total_price: 0
            })
        })
    },
    updateCart: function(product) {
        var that = this
        console.log('更新购物车', product)
        var data = [{
            product_id: product.product_id,
            quantity: product.quantity,
        }]
        console.log('data', data)
        app.wxRequest('shopping_cart?increase=false', data, 'POST', that, function(res) {
            console.log('购物车数据', res)
			if (res.statusCode == 200) {
				wx.setStorageSync('cart', res.data.data)
				that.setData({
					cartList: res.data.data
				})
			}
            
            that.calculationPrice()
        })
    },
    dataReturn: function(res) {
        console.log('dataReturn', res)
    },
    numFun: function(event) {
		console.log('numFun---event', event)
        var index = parseInt(event.currentTarget.dataset.index)
        var type = event.currentTarget.dataset.type
        var cartList = this.data.cartList
        console.log("this.data.cartList", this.data.cartList)
        if (type == 'minus') {
            if (cartList[index].quantity > 1) {
                cartList[index].quantity = cartList[index].quantity - 1
                this.updateCart(cartList[index])
            }
        } else if (type == 'add') {
            cartList[index].quantity = cartList[index].quantity + 1
            this.updateCart(cartList[index])
        }
    },
    add: function() {
        app.openPage('../edit-address/edit-address')
    },
    edit: function(event) {
        var id = event.currentTarget.dataset.id
        app.openPage('../edit-address/edit-address?id=' + id)
    },

    radioChange: function(event) {
        console.log('event', event)
        var sel = event.detail.value
        var total_price = 0
        var cartList = this.data.cartList
        var allSel = false
        if (sel.length > 0) {
            this.data.selArray = sel
            for (var i = 0; i < sel.length; i++) {
                total_price += cartList[parseInt(sel[i])].price * cartList[parseInt(sel[i])].quantity
            }
            if (sel.length == cartList.length) {
                allSel = true
            }
            this.setData({
                total_price: parseFloat(total_price).toFixed(2),
                allSel: allSel
            })
        } else {
            this.setData({
                allSel: false,
                total_price: 0
            })
        }
        // this.setData({
        //   selIndex: selIndex
        // })
    },
    // 获取购物车数据；
    getCart: function() {
        var that = this
        /*app.getCart(function(carts) {
            console.log('index----onshow---app.utils.getUser--carts', carts)
            if (carts) {
                that.setData({
                    cartList: carts
                })
            } else {
                that.setData({
                    cartList: []
                })
            }
        })*/
        app.wxRequest('shopping_cart', {}, 'GET', that, function(res) {
            console.log('购物车', res)
            var selArray = []
            if (res.data.status_code == 0) {
                for (var i in res.data.data) {
                    selArray[i] = false
                }
                that.setData({
                    cartList: res.data.data,
                    selArray: selArray
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
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
		this.getCart()
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