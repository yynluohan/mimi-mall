索芙特

主色： c28324

    <view style="background-color:#F6F7FB;width:100%;height:20rpx"></view>


<!--     <view style="background-color:#F6F7FB;width:100%;height:20rpx"></view>
    <view class="banner">
        <view class="left-banner" bindtap="clickBanner" data-url="{{banner[0].url}}">
            <image src="{{banner[0].img}}"></image>
        </view>
        <view class="right-banner">
            <image src="{{banner[1].img}}" bindtap="clickBanner" data-url="{{banner[1].url}}"></image>
            <image src="{{banner[2].img}}" bindtap="clickBanner" data-url="{{banner[2].url}}"></image>
        </view>
    </view> -->
<!--     <view style="background-color:#F6F7FB;width:100%;height:20rpx"></view>
    <template is="activity" data="{{activity}}" />
    <view style="background-color:#F6F7FB;width:100%;height:30rpx"></view>
    <template is="activity" data="{{activity}}" /> -->

    /*
        adSwiper: [
            {
                img: '../../images/ad1.png',
                url: '111',
            },
            {
                img: '../../images/ad1.png',
                url: '222',
            },
            {
                img: '../../images/ad1.png',
                url: '333',
            }
        ],
        navData: [
            {
                icon: '../../images/nav1.png',
                name: '全部商品',
                page: '../category/category?mould=all'
            },
            {
                icon: '../../images/nav1.png',
                name: '热销榜单',
                page: '../category/category?mould=hot'
            },
            {
                icon: '../../images/nav1.png',
                name: '新品上市',
                page: '../category/category?mould=new_pro'
            },
            {
                icon: '../../images/nav1.png',
                name: '最新动态',
                page: '../category/category?mould=news'
            },
        ],
        activity: {
            cover: '../../images/ad1.png',
            id: '活动id',
            goods: [
            {
                img: '../../images/good1.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: '108',
                id: '1'
            },
            {
                img: '../../images/good1.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: '108',
                id: '1'
            },
            {
                img: '../../images/good1.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: '108',
                id: '1'
            },
            {
                img: '../../images/good1.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: '108',
                id: '1'
            },
            ]
        },
        banner: [
            {
                img: '../../images/left-banner.png',
                url: 'banner'
            },
            {
                img: '../../images/right-banner.png',
                url: 'banner'
            },
            {
                img: '../../images/right-banner.png',
                url: 'banner'
            }
        ],
        category: {
            lightIndex: 0,
            array: [
            {
                id: 1,
                name: '美容护肤',
            },
            {
                id: 2,
                name: '补水',
            },
            {
                id: 3,
                name: '化妆品',
            },
            {
                id: 4,
                name: '防晒',
            },
            {
                id: 1,
                name: '美容护肤',
            },
            {
                id: 2,
                name: '补水',
            },
            {
                id: 3,
                name: '化妆品',
            },
            {
                id: 4,
                name: '防晒',
            },
            ]
        },
        goods: [
            {
                cover: '../../images/good1.png',
                id: 1,
                name: '香氛焕彩水乳液丙多芬卡撒反对50ml',
                prompt: '针对肤质解决暗沉有光等问',
                price: 288.00,
            },
        ]
        */


        getUser: function(cb) {
        var that = this
        var users = wx.getStorageSync('users')
        if (users) {
            typeof(cb) == 'function' && cb(users)
        } else {
            that.wxRequest2('gw/account/home', {}, 'GET', that, function(res) {
                console.log('app---getUser---个人信息---res', res)
                if (res.data.code == 200) {
                    typeof(cb) == 'function' && cb(res.data.data) 
                    wx.setStorageSync('users', res.data.data)
                }
            })
        }
        
    },
    getCart: function(cb) {
        var that = this
        var cart = wx.getStorageSync('cart')
        if (cart) {
            typeof(cb) == 'function' && cb(cart)
        } else {
            that.wxRequest('shopping_cart', {}, 'GET', that, function(res) {
                console.log('购物车', res)
                if (res.data.code == 200) {
                    wx.setStorageSync('cart', res.data.data)
                    typeof(cb) == 'function' && cb(res)
                }
            })
        }
    },