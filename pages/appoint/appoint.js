var app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var demo = new QQMapWX({
    key: 'XGKBZ-4EHRR-SE4WL-WYOXX-O2AE2-IZBHP' // 必填
});
Page({

    /*页面的初始数据*/
    data: {
        location: '',
        searchText: '',
        /*stores: [{
                id: 1,
                cover: '../../images/store_cover.jpg',
                name: '珠江新城体验二店',
                address: '广州市天河区珠江西路23号珠江新城商城专柜',
                area: '天河区',
                range: '3km'
            },
            {
                id: 1,
                cover: '../../images/store_cover.jpg',
                name: '珠江新城体验二店',
                address: '广州市天河区珠江西路23号珠江新城商城专柜',
                area: '天河区',
                range: '3km'
            },
            {
                id: 1,
                cover: '../../images/store_cover.jpg',
                name: '珠江新城体验二店',
                address: '广州市天河区珠江西路23号珠江新城商城专柜',
                area: '天河区',
                range: '3km'
            },
            {
                id: 1,
                cover: '../../images/store_cover.jpg',
                name: '珠江新城体验二店',
                address: '广州市天河区珠江西路23号珠江新城商城专柜',
                area: '天河区',
                range: '3km'
            }
        ]*/
    },
    closePopup(e) {
        var that = this
        that.setData({
            openPopup: false
        })
    },
    openSetting(e) {
        var that = this
        console.log('openSetting----e', e)
        if (e.detail.authSetting && e.detail.authSetting['scope.userLocation']) {
            that.setData({
                openPopup: false
            })
            wx.getLocation({
                type: 'gcj02',
                success: function(res) {
                    console.log('getLocation-----位置', res)
                    that.data.latitude = res.latitude
                    that.data.longitude = res.longitude

                    demo.reverseGeocoder({
                        location: {
                            latitude: that.data.latitude,
                            longitude: that.data.longitude
                        },
                        success: function(res) {
                            wx.hideLoading()
                            console.log('getLocation-----地址', res);
                            that.setData({
                                location: res.result.address
                            })
                        },
                        fail: function(res) {
                            console.log('getLocation----fail', res);
                        },
                        complete: function(res) {
                            console.log('getLocation-----complete', res);
                        }
                    });
                    that.getStore()
                },
                fail(e) {
                    console.log('getLocation-----位置-----fail', e)
                    wx.hideLoading()
                }
            })
        }
    },
    resetForm: function() {
        this.getStore()
        this.setData({
            searchText: ''
        })
    },

    searchAgency: function(event) {
        var that = this
        console.log('searchAgency---event', event)
        var searchText = event.detail.value
        that.setData({
            searchText: searchText
        })
        /*if ( searchText ) {
          var latitude = that.data.latitude
          var longitude = that.data.longitude
          
          var store_type = that.data.store_type
          app.wxRequest2('gw/stores?type='+store_type+'&search='+searchText, {}, 'GET', function(res) {
            console.log('搜索---res',res)
            if ( res.data.code == 200 ) {
              that.setData({
                storeList: res.data.data.records
              })
            } else {
              that.setData({
                storeList: []
              })
            }
          })
        } else {
          that.getStore()
        }*/
    },
    searchSubmit: function(event) {
        var that = this
        console.log('searchSubmit--event', event)
        var searchText = event.detail.value
        var latitude = that.data.latitude
        var longitude = that.data.longitude
        if (searchText) {
            var post_search = {
                // "type": "Muaskin",
                "type": that.data.store_type,
                "search": searchText,
                "longitude": longitude,
                "latitude": latitude
            }
            app.wxRequest2('gw/stores', post_search, 'GET', that, function(res) {
                console.log('搜索---res', res)
                if (res.data.code == 200) {
                    that.setData({
                        storeList: res.data.data.records
                    })
                    if (res.data.data.records.length == 0) {
                        wx.showToast({
                            title: '未找到相应门店',
                            icon: 'none'
                        })
                    }
                }
            })
        } else {
            that.getStore()
        }
    },
    storeDetails: function(event) {
        var id = event.currentTarget.dataset.id
        app.openPage('../store-details/store-details?id=' + id + '&title=' + this.data.title)
    },
    getStore: function() {
        var that = this
        console.log('that.data.latitude', that.data.latitude)
        console.log('that.data.longitude', that.data.longitude)
        console.log('that.data.store_type', that.data.store_type)
        var store_type = that.data.store_type
        var url = ''
        if (that.data.latitude && that.data.longitude) {
            url = "store/stores?type=" + store_type + "&longitude=" + that.data.longitude + "&latitude=" + that.data.latitude
        } else {
            url = "store/stores?type=" + store_type
        }
        app.wxRequest2(url, {}, 'GET', that, function(res) {
            console.log('店铺---res', res)
            if (res.statusCode == 200) {
                that.setData({
                    storeList: res.data.data.records
                })
            }
        })
    },
    // 获取位置；
    getLocation: function() {
        wx.showLoading({
            title: ''
        })
        var that = this
        wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
                console.log("authorize-----res", res)
                wx.getLocation({
                    type: 'gcj02',
                    success: function(res) {
                        console.log('getLocation-----位置', res)
                        that.data.latitude = res.latitude
                        that.data.longitude = res.longitude

                        demo.reverseGeocoder({
                            location: {
                                latitude: that.data.latitude,
                                longitude: that.data.longitude
                            },
                            success: function(res) {
                                wx.hideLoading()
                                console.log('getLocation-----地址', res);
                                that.setData({
                                    location: res.result.address
                                })
                            },
                            fail: function(res) {
                                console.log('getLocation----fail', res);
                            },
                            complete: function(res) {
                                console.log('getLocation-----complete', res);
                            }
                        });
                        that.getStore()
                    },
                    fail(e) {
                        console.log('getLocation-----位置-----fail', e)
                        wx.hideLoading()
                    }
                })
            },
            fail(e) {
                console.log("wx.authorize----fail---e", e)
                wx.hideLoading()
                that.setData({
                    openPopup: true
                })
            }
        })

    },
    /*生命周期函数--监听页面加载*/
    onLoad: function(options) {
        console.log("预约门店-----onload----options", options)
        if (options.name) {
            wx.setNavigationBarTitle({
                title: options.name
            })
            this.setData({
                title: options.name,
                store_type: options.store_type
            })
        }
        this.getLocation()
        this.getStore()
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