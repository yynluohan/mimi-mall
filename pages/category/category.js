var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        category: [{
            id: 1,
            name: '美容护肤',
        }, {
            id: 2,
            name: '补水',
        }, {
            id: 3,
            name: '化妆品',
        }, {
            id: 4,
            name: '防晒',
        }, {
            id: 1,
            name: '美容护肤',
        }, {
            id: 2,
            name: '补水',
        }, {
            id: 3,
            name: '化妆品',
        }, {
            id: 4,
            name: '防晒',
        }],
        activity: {
            cover: '../../images/ad1.png',
            id: '活动id',
            goods: [{
                img: '../../images/good1.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: '108',
                id: '1'
            }, {
                img: '../../images/good1.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: '108',
                id: '1'
            }, {
                img: '../../images/good1.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: '108',
                id: '1'
            }, {
                img: '../../images/good1.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: '108',
                id: '1'
            }, ]
        },
        lightIndex: 0,
        hot: {
            cover: '../../images/hot_cover.png',
            url: '热销url',
            id: '热销id',
            products: [{
                id: 1,
                img: '../../images/good3.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: 108,
                num: 9998,
            }, {
                id: 1,
                img: '../../images/good3.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: 108,
                num: 9998,
            }, {
                id: 1,
                img: '../../images/good3.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: 108,
                num: 9998,
            }, {
                id: 1,
                img: '../../images/good3.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: 108,
                num: 9998,
            }, {
                id: 1,
                img: '../../images/good3.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: 108,
                num: 9998,
            }, {
                id: 1,
                img: '../../images/good3.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: 108,
                num: 9998,
            }, {
                id: 1,
                img: '../../images/good3.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: 108,
                num: 9998,
            }, ]
        },
        newPro: {
            id: '新品上市id',
            cover: '../../images/hot_cover.png',
            url: '新品上市url',
            data: [{
                time: '2018-08-24',
                products: [{
                    id: 1,
                    name: 'MUASKIN透明质酸保湿肌底液',
                    cover: '../../images/good1.png',
                    price: 108
                }, {
                    id: 1,
                    name: 'MUASKIN透明质酸保湿肌底液',
                    cover: '../../images/good2.png',
                    price: 108
                }, {
                    id: 1,
                    name: 'MUASKIN透明质酸保湿肌底液',
                    cover: '../../images/good4.png',
                    price: 108
                }, {
                    id: 1,
                    name: 'MUASKIN透明质酸保湿肌底液',
                    cover: '../../images/good4.png',
                    price: 108
                }, ]
            }, {
                time: '2018-08-22',
                products: [{
                    id: 1,
                    name: 'MUASKIN透明质酸保湿肌底液',
                    cover: '../../images/good1.png',
                    price: 108
                }, {
                    id: 1,
                    name: 'MUASKIN透明质酸保湿肌底液',
                    cover: '../../images/good2.png',
                    price: 108
                }, {
                    id: 1,
                    name: 'MUASKIN透明质酸保湿肌底液',
                    cover: '../../images/good4.png',
                    price: 108
                }, {
                    id: 1,
                    name: 'MUASKIN透明质酸保湿肌底液',
                    cover: '../../images/good4.png',
                    price: 108
                }, ]
            }, {
                time: '2018-08-16',
                products: [{
                    id: 1,
                    name: 'MUASKIN透明质酸保湿肌底液',
                    cover: '../../images/good4.png',
                    price: 108
                }, {
                    id: 1,
                    name: 'MUASKIN透明质酸保湿肌底液',
                    cover: '../../images/good4.png',
                    price: 108
                }, {
                    id: 1,
                    name: 'MUASKIN透明质酸保湿肌底液',
                    cover: '../../images/good3.png',
                    price: 108
                }, {
                    id: 1,
                    name: 'MUASKIN透明质酸保湿肌底液',
                    cover: '../../images/good3.png',
                    price: 108
                }, ]
            }, ]
        },
        news: {
            id: '最新动态id',
            url: '最新动态url',
            cover: '../../images/ad1.png',
            articles: [{
                cover: '../../images/article1.png',
                id: 1,
                name: '除了涂防，还有这些值得尝试的机会',
                subtitle: 'SPF指数主要是防止UVB，但并不会是 越高越好，过高的SPF指数会带',
                num: 89520,
                date: '08-24'
            }, {
                cover: '../../images/article1.png',
                id: 1,
                name: '除了涂防，还有这些值得尝试的机会',
                subtitle: 'SPF指数主要是防止UVB，但并不会是 越高越好，过高的SPF指数会带',
                num: 89520,
                date: '08-24'
            }, {
                cover: '../../images/article1.png',
                id: 1,
                name: '除了涂防，还有这些值得尝试的机会',
                subtitle: 'SPF指数主要是防止UVB，但并不会是 越高越好，过高的SPF指数会带',
                num: 89520,
                date: '08-24'
            }, {
                cover: '../../images/article1.png',
                id: 1,
                name: '除了涂防，还有这些值得尝试的机会',
                subtitle: 'SPF指数主要是防止UVB，但并不会是 越高越好，过高的SPF指数会带',
                num: 89520,
                date: '08-24'
            }, {
                cover: '../../images/article1.png',
                id: 1,
                name: '除了涂防，还有这些值得尝试的机会',
                subtitle: 'SPF指数主要是防止UVB，但并不会是 越高越好，过高的SPF指数会带',
                num: 89520,
                date: '08-24'
            }, {
                cover: '../../images/article1.png',
                id: 1,
                name: '除了涂防，还有这些值得尝试的机会',
                subtitle: 'SPF指数主要是防止UVB，但并不会是 越高越好，过高的SPF指数会带',
                num: 89520,
                date: '08-24'
            }, ]
        }
    },

    articleDetails: function(event) {
        var id = event.currentTarget.dataset.id
        console.log('articleDetails---id', id)
    },

    // 热销购买按钮；
    productDetails: function(event) {
        var id = event.currentTarget.dataset.id
        console.log()
    },

    // 点击商品；
    productDetails: function(event) {
        var id = event.currentTarget.dataset.id
        console.log('productDetails---id', id)
        app.openPage('../product-details/product-details?id=' + id)
    },

    // 点击分类；
    selCategory: function(event) {
        var index = event.currentTarget.dataset.index
        var id = event.currentTarget.dataset.id
        this.setData({
            lightIndex: index
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log('category.js----options', options)
        if (options.mould) {
            var title = ''
            if (options.mould == 'all') {
                title = '全部商品'
            } else if (options.mould == 'hot') {
                title = '榜单热销'
            } else if (options.mould == 'new_pro') {
                title = '新品上市'
            } else if (options.mould == 'news') {
                title = '最新动态'
            }
            wx.setNavigationBarTitle({
                title: title
            })
            this.setData({
                // mould: options.mould
                mould: 'all'
            })
        }
        this.setData({
            // mould: options.mould
            mould: 'all'
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