var QQMapWX = require('./utils/qqmap-wx-jssdk.min.js')
var map_key = "XGKBZ-4EHRR-SE4WL-WYOXX-O2AE2-IZBHP"
var app = getApp()
var siteInfo = require('siteinfo.js')
var utils = require('./utils/util.js')
App({
    siteInfo: siteInfo,
    utils: utils,
    wxRequest: utils.wxRequest,
	wxRequest2: utils.wxRequest2,
    wxRequest3: utils.wxRequest3,
    getResult: utils.getResult,
    loginResult: utils.loginResult,
    wxLogin: utils.wxLogin,
    API_URL: 'https://www.muaskin.com/rest/',
    API_URL2: 'https://www.muaskin.com/api/',
    onLaunch: function() {
        var that = this
        // 展示本地存储能力
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)
        /*wx.authorize({
            scope: 'scope.userInfo',
            success: function(res) {
                console.log('wx.authorize---res', res)
            }
        })*/
        /*wx.getSetting({
            success: function(res) {
                console.log('wx.getSetting----res',res)
                if (res.authSetting['scope.userInfo']) {
                }
            }
        })*/
        that.getSystemInfo()
        // 获取用户信息
        /*wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })*/
    },
    onShow: function() {
        var that = this
        wx.checkSession({
            success(res) {
                console.log('checkSession---success', res)
            },
            fail(res) {
                console.log('checkSession---fail', res)
                var page = getCurrentPages()
                console.log('checkSession---fail---page', page)

                // that.wxLogin()
            }
        })
        that.wxLogin('')
        // that.wxLogin('', that, function(res) {
        //     console.log('app----wxLogin', res)
        //     if (res.message == "user.not.found") {
        //         that.openPage('/pages/register/register')
        //     } else {
        //         that.globalData.access_token = res.data.data.access_token
        //         that.globalData.openid = res.data.data.openid
        //         that.globalData.unionid = res.data.data.unionid
        //     }
        //     /*that.getUser(function(res) {
        //         if (res.data.data.phone == null) {
        //             that.openPage('/pages/register/register')
        //         } else {
        //             console.log('phone---false')
        //         }
        //     })
        //     that.getCart(function(res) {
        //         console.log('----------购物车', res)
        //     })*/
        // })
    },
    globalData: {
        userInfo: null,
        access_token: '',
        openid: '',
        unionid: '',
        isLogin: false
    },
    // 设备信息；
    getSystemInfo: function() {
        var that = this
        wx.getSystemInfo({
            success: function(res) {
                console.log('设备----getSystemInfo', res)
                wx.setStorageSync('SystemInfo', res)
                that.globalData.SystemInfo = res
            }
        })
    },
    // wxLogin: function(userInfo, that, cb) {
    //     console.log('app=====wxLogin======userInfo',userInfo)
    //     var $this = this
    //     wx.login({
    //         success: function(res) {
    //             console.log('wx.login--res', res)
    //             var post_data = {}
    //             if (userInfo) {
    //                 post_data =  {
    //                     code: res.code,
    //                     encryptedData: userInfo.encryptedData,
    //                     iv: userInfo.iv
    //                 }
    //             } else {
    //                 post_data =  {
    //                     code: res.code,
    //                 }
    //             }
    //             wx.request({
    //                 url: $this.siteInfo.API_URL + 'login_wxa',
    //                 data: post_data,
    //                 method: 'POST',
    //                 header: {
    //                     'content-type': 'application/json'
    //                 },
    //                 success: function(res) {
    //                     console.log('app---wxLogin---res', res)
    //                     var page = getCurrentPages()
    //                     $this.loginResult(res, that, cb)
    //                     return
    //                     if (res.data.status_code == 4001) {
    //                         wx.showToast({
    //                             title: '登录失败',
    //                             icon: 'none'
    //                         })
    //                     } else if (res.data.status_code == 0) {
    //                         typeof(cb) == "function" && cb(res)
    //                         console.log('app----login_wxa---res222', res)
    //                         $this.globalData.isLogin = true
    //                         if (res.message == "user.not.found") {
    //                             $this.openPage('/pages/register/register')
    //                         } else {
    //                             $this.globalData.access_token = res.data.data.access_token
    //                             $this.globalData.openid = res.data.data.openid
    //                             $this.globalData.unionid = res.data.data.unionid
    //                         }
    //                     } else {
    //                         wx.showToast({
    //                             title: '登录失败',
    //                             icon: 'none'
    //                         })
    //                     }
    //                 }
    //             })
    //         }
    //     })
    // },
    tokenCallback: function() {},
    // 获取个人信息;
    getUser: function(cb) {
        var that = this
        // var users = wx.getStorageSync('users')
        // if (users) {
        //     typeof(cb) == 'function' && cb(users)
        // } else {
            that.wxRequest2('gw/account/home', {}, 'GET', that, function(res) {
                console.log('app---getUser---个人信息---res', res)
                if (res.data.code == 200) {
					if (res.data.data) {
						if (res.data.data.grade && res.data.data.grade.logo) {
							res.data.data.grade.logos = JSON.parse[res.data.data.grade.logo]
						} else {
							res.data.data.grade.logos = []
						}
					}
                    typeof(cb) == 'function' && cb(res.data.data) 
                    // wx.setStorageSync('users', res.data.data)
                } else {
                    typeof(cb) == 'function' && cb() 
                }
            })
        // }
        
    },
    getCart: function(cb) {
        var that = this
        // var cart = wx.getStorageSync('cart')
        // if (cart) {
        //     typeof(cb) == 'function' && cb(cart)
        // } else {
            that.wxRequest('shopping_cart', {}, 'GET', that, function(res) {
                console.log('购物车', res)
                if (res.statusCode == 200) {
                    // wx.setStorageSync('cart', res.data.data)
                    typeof(cb) == 'function' && cb(res.data.data)
                } else {
                    typeof(cb) == 'function' && cb()
                }
            })
        // }
    },
    // 公共方法；
    // 网络请求；
    /*wxRequest: function(url, data, method, callback, that) {
        // var that = this
        wx.request({
            url: this.siteInfo.API_URL + url,
            data: data,
            method: method,
            header: {
                'Authorization': this.globalData.access_token,
                'content-type': 'application/json'
            },
            success: function(res) {
                if (res.data.code == 401) {

                }
                callback(res)
            }
        })
    },
    wxRequest2: function(url, data, method, callback) {
        // var that = this
        wx.request({
            url: this.siteInfo.API_URL2 + url,
            data: data,
            method: method,
            header: {
                'Authorization': this.globalData.access_token,
                'content-type': 'application/json'
            },
            success: function(res) {
                callback(res)
            }
        })
    },*/
    // 微信支付；
    wxPayment: function(order_number, callback) {
        wx.request({
            url: 'https://www.muaskin.com/app/payment/wpay/' + order_number,
            data: {},
            method: 'GET',
            header: {
                'Authorization': this.globalData.access_token,
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log('支付---res', res)
            }
        })
    },
    // 跳转页面；wx.navigateTo ， wx.reLaunch；
    openPage: function(page, openType) {
        if (page != '') {
            var pages = getCurrentPages()
			if (openType == 'switchTab') {
				wx.switchTab({
					url: page
				})
			} if (openType == 'redirectTo') {
				wx.redirectTo({
					url: page
				})
			} else {
                if (pages.length >= 9) {
                    wx.reLaunch({
                        url: page
                    })
                } else {
                    wx.navigateTo({
                        url: page
                    })
                }
            }
        } else {
            wx.showToast({
                title: '暂未开通',
                icon: 'none'
            })
        }
    },
    // 定位导航；
    openLocation: function(address, cb) {
        console.log("openLocation-----address", address)
        var that = this
        if (address) {
            if (map_key) {
                var qqMap = new QQMapWX({
                    key: map_key
                })
                qqMap.geocoder({
                    address: address,
                    success: function(mapData) {
                        console.log('qqMap.geocoder---mapData', mapData)
                        var lng = mapData.result.location.lng
                        var lat = mapData.result.location.lat
                        wx.getLocation({
                            type: 'gcj02',
                            success: function(res) {
                                console.log('getLocation', res)
                                wx.openLocation({
                                    latitude: lat,
                                    longitude: lng,
                                    scale: 28,
                                    name: address,
                                    success: function(res) {
                                        cb = typeof(cb) == "function" ? cb(res) : '';
                                    }
                                })
                            },
                            fail: function(fail) {
                                console.log('fail', fail)
                                wx.showModal({
                                    title: '提示',
                                    content: '导航需要您授权！',
                                    confirmText: '去设置',
                                    success: function(modal) {
                                        if (modal.confirm) {
                                            wx.openSetting({
                                                success: function(openSetting) {
                                                    console.log('openSetting', openSetting)
                                                    if (openSetting.authSetting['scope.userLocation']) {
                                                        that.openLocation(address)
                                                    }
                                                }
                                            })
                                        } else if (modal.cancel) {
                                            console.log('取消')
                                        }
                                    }
                                })
                            }
                        })
                    },
                    fail: function(e) {

                    }
                })
            } else {
                // that.getJSSDK("/getSDK")
                wx.showToast({
                    title: "请填写小程序JS SDK的key",
                    icon: "none"
                })
            }
        } else {
            wx.showToast({
                title: '店铺未开放地址',
                icon: 'none'
            })
        }
    },
})