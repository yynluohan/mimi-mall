var siteInfo = require('../siteinfo.js')

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function wxRequest(url, data, method, that, cb) {
    var app = getApp()
    var pages = getCurrentPages()
    var currPage = pages[pages.length-1]
    // var access_token = "eyJsb2dpbl9uYW1lIjoibzN2OHExS0tTbnZyYmxCRDVIaXZyMGdFSlV1YyIsImlkIjoiNiIsInRva2VuIjoiNzFkMmM5OTgxZWQ2ZmRkZTAwOTFiY2Q4ZTUxZjA2YjNlMWJhNDU2YyJ9"
    // var access_token = "eyJsb2dpbl9uYW1lIjoibzN2OHExS0tTbnZyYmxCRDVIaXZyMGdFSlV1YyIsImlkIjoiNiIsInRva2VuIjoiNzFkMmM5OTgxZWQ2ZmRkZTAwOTFiY2Q4ZTUxZjA2YjNlMWJhNDU2YyJ9"
	// var access_token = "eyJsb2dpbl9uYW1lIjoibzN2OHExS0tTbnZyYmxCRDVIaXZyMGdFSlV1YyIsImlkIjoiNiIsInRva2VuIjoiZjcxNGIzZTM2N2MwNzhkNmM4NTc3NjQ3MzIxMjUxYzc2ODI4NzgyOSJ9"

    wx.request({
        url: app.siteInfo.API_URL + url,
        data: data,
        method: method,
        header: {
            'Authorization': app.globalData.access_token,
			// 'Authorization': access_token,
            'content-type': 'application/json'
        },
        success: function(res) {
            if (res.data.code == 4001) {
                currPage.setData({
                    loginPopup: true
                })
            } else {
                typeof(cb) == 'function' && cb(res)
            }
        }
    })
}

function wxRequest2(url, data, method, that, cb) {
    var app = getApp()
    console.log('wxRequest2-----app.globalData.access_token', app.globalData.access_token)
    // var access_token = "eyJsb2dpbl9uYW1lIjoibzN2OHExS0tTbnZyYmxCRDVIaXZyMGdFSlV1YyIsImlkIjoiNiIsInRva2VuIjoiNzFkMmM5OTgxZWQ2ZmRkZTAwOTFiY2Q4ZTUxZjA2YjNlMWJhNDU2YyJ9"
	// var access_token = "eyJsb2dpbl9uYW1lIjoibzN2OHExS0tTbnZyYmxCRDVIaXZyMGdFSlV1YyIsImlkIjoiNiIsInRva2VuIjoiNzFkMmM5OTgxZWQ2ZmRkZTAwOTFiY2Q4ZTUxZjA2YjNlMWJhNDU2YyJ9"
	// var access_token = "eyJsb2dpbl9uYW1lIjoibzN2OHExS0tTbnZyYmxCRDVIaXZyMGdFSlV1YyIsImlkIjoiNiIsInRva2VuIjoiZjcxNGIzZTM2N2MwNzhkNmM4NTc3NjQ3MzIxMjUxYzc2ODI4NzgyOSJ9"

	wx.request({
        url: app.siteInfo.API_URL2 + url,
        data: data,
        method: method,
        header: {
            'Authorization': app.globalData.access_token,
			// 'Authorization': access_token,
            'content-type': 'application/json'
        },
        success: function(res) {
            console.log('-------------res', res)
            if (res.data.code == 401) {
                var userInfo = wx.getStorageSync('userInfo')
                console.log('utils---userInfo', userInfo)
                app.wxLogin(userInfo, function(res, set) {
                    if (set) {
                        that.setData({
                            loginPopup: set.loginPopup
                        })
                    } else {

                    }
                    // that.onLoad(that.onLoadOprions)
                    // that.onShow()
                })
            } else {
                typeof(cb) == 'function' && cb(res)
            }
        }
    })
}
function wxRequest3(url, data, method, that, cb) {
	var app = getApp()
	console.log('wxRequest2-----app.globalData.access_token', app.globalData.access_token)
	// var access_token = "eyJsb2dpbl9uYW1lIjoibzN2OHExS0tTbnZyYmxCRDVIaXZyMGdFSlV1YyIsImlkIjoiNiIsInRva2VuIjoiNzFkMmM5OTgxZWQ2ZmRkZTAwOTFiY2Q4ZTUxZjA2YjNlMWJhNDU2YyJ9"
	// var access_token = "eyJsb2dpbl9uYW1lIjoibzN2OHExS0tTbnZyYmxCRDVIaXZyMGdFSlV1YyIsImlkIjoiNiIsInRva2VuIjoiNzFkMmM5OTgxZWQ2ZmRkZTAwOTFiY2Q4ZTUxZjA2YjNlMWJhNDU2YyJ9"
	// var access_token = "eyJsb2dpbl9uYW1lIjoibzN2OHExS0tTbnZyYmxCRDVIaXZyMGdFSlV1YyIsImlkIjoiNiIsInRva2VuIjoiZjcxNGIzZTM2N2MwNzhkNmM4NTc3NjQ3MzIxMjUxYzc2ODI4NzgyOSJ9"
	wx.request({
		url: app.siteInfo.API_URL3 + url,
		data: data,
		method: method,
		header: {
			'Authorization': app.globalData.access_token,
			// 'Authorization': access_token,
			'content-type': 'application/json'
		},
		success: function (res) {
			console.log('-------------res', res)
			if (res.data.code == 401) {
				var userInfo = wx.getStorageSync('userInfo')
				console.log('utils---userInfo', userInfo)
				app.wxLogin(userInfo, function (res, set) {
					if (set) {
						that.setData({
							loginPopup: set.loginPopup
						})
					} else {}
					// that.onLoad(that.onLoadOprions)
					// that.onShow()
				})
			} else {
				typeof (cb) == 'function' && cb(res)
			}
		}
	})
}

function getUser(that, cb) {
    console.log('utils---getUser')
    var app = getApp()
    app.wxRequest2('gw/account/home', {}, 'GET', that, function(res) {
        console.log('app---getUser---个人信息---res', res)
        if (res.data.code == 200) {
            wx.setStorageSync('users', res.data.data)
            typeof(cb) == 'function' && cb(res)
        } else if (res.data.code == 4001) {
            app.wxLogin('',that)
            console.log('getUser-----4001')
        }
    })
}

function getCart(that, cb) {
    var app = getApp()
    var pages = getCurrentPages()
    var curPage = pages[pages.length - 1]
    app.wxRequest('shopping_cart', {}, 'GET', that, function(res) {
        console.log('utils---getCart---res', res)
        if (res.data.code == 200) {
            wx.setStorageSync('cart', res.data.data)
            typeof(cb) == 'function' && cb(res)
        } else if (res.data.status_code == 4001) {
            curPage.setData({
                loginPopup: true
            })
        }
    })
}

function getUserInfo(event, that, cb) {
    var app = getApp()
    console.log('utils----getUserInfo--event', event)
    if (event.detail.errMsg == "getUserInfo:fail auth deny") {
        that.setData({
            loginPopup: true
        })
    } else if (event.detail.errMsg == "getUserInfo:ok") {
        that.setData({
            loginPopup: false
        })
        wxLogin(event.detail, that, cb)
    }
}

function wxLogin(userInfo, that, cb) {
    console.log('index----wxLogin')
    var app = getApp()
    console.log('utils=====wxLogin======userInfo', userInfo)
    console.log('utils=====wxLogin======that', that)
    var $this = this
    wx.login({
        success: function (res) {
            console.log('wx.login--res', res)
            var post_data = {}
            if (userInfo) {
                post_data = {
                    code: res.code,
                    encryptedData: userInfo.encryptedData,
                    iv: userInfo.iv
                }
            } else {
                post_data = {
                    code: res.code,
                }
            }
            wx.request({
                url: siteInfo.API_URL + 'login_wxa',
                data: post_data,
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    console.log('index----utils---wxLogin---res', res)
                    loginResult(res, that, cb)
                }
            })
        }
    })
}
function loginResult(res, that, cb) {
    console.log('index---utils---loginResult----res', res)
    var app = getApp()
    var pages = getCurrentPages()
    console.log('utils----loginResult---pages', pages)
    var curPage = pages[pages.length - 1]
    if (res.data.status_code == 4001) {
        // wx.showToast({
        //     title: '登录失败4001',
        //     icon: 'none'
        // })
        if (that) {
            curPage.setData({
                loginPopup: true
            })
        }
        
    } else if (res.data.status_code == 0) {
        if (that) {
            curPage.setData({
                loginPopup: false
            })
        }
		if (res.message) {
			if (res.message == "user.not.found") {
				app.openPage('/pages/register/register')
			} else {
				console.log('index---loginResult---0--found')
				app.globalData.access_token = res.data.data.access_token
				app.globalData.openid = res.data.data.openid
				if (res.data.data.unionid) {
					app.globalData.unionid = res.data.data.unionid
				}
			}
        } else {
            console.log('index---loginResult---0--found')
            app.globalData.access_token = res.data.data.access_token
            app.globalData.openid = res.data.data.openid
			if (res.data.data.unionid) {
				app.globalData.unionid = res.data.data.unionid
			}
        }
        typeof(cb) == "function" && cb(res)
    } else {
        wx.showToast({
            title: '登录失败status_code!=0',
            icon: 'none'
        })
    }
}
function getResult(res, that, cb) {
    var app = getApp()
    var pages = getCurrentPages()
    console.log('utils----getResult---pages', pages)
    console.log('utils----getResult---res', res)
    var curPage = pages[pages.length - 1]
    if (res.data.status_code == 4001) {
        // wx.showToast({
        //     title: '登录失败',
        //     icon: 'none'
        // })
        curPage.setData({
            loginPopup: true
        })
    } else if (res.data.status_code == 0) {
        typeof(cb) == "function" && cb(res)
        if (res.message == "user.not.found") {
            app.openPage('/pages/register/register')
        } else {
            app.globalData.access_token = res.data.data.access_token
            app.globalData.openid = res.data.data.openid
            app.globalData.unionid = res.data.data.unionid
        }
    } else {
        wx.showToast({
            title: '登录失败',
            icon: 'none'
        })
    }
}
function getResult2(res, that, cb) {
    var app = getApp()
    var pages = getCurrentPages()
    var curPage = pages[pages.length - 1]
    if (res.data.code == 4001) {
        wx.showToast({
            title: '登录失败',
            icon: 'none'
        })
        curPage.setData({
            loginPopup: true
        })
    } else if (res.data.status_code == 0) {
        typeof(cb) == "function" && cb(res)
        if (res.message == "user.not.found") {
            app.openPage('/pages/register/register')
        } else {
            app.globalData.access_token = res.data.data.access_token
            app.globalData.openid = res.data.data.openid
            app.globalData.unionid = res.data.data.unionid
        }
    } else {
        wx.showToast({
            title: '登录失败',
            icon: 'none'
        })
    }
}

module.exports = {
    formatTime: formatTime,
    getUserInfo: getUserInfo,
    wxRequest: wxRequest,
    wxRequest2: wxRequest2,
	wxRequest3: wxRequest3,
    getUser: getUser,
    getCart: getCart,
    getResult: getResult,
    getResult2: getResult2,
    wxLogin: wxLogin,
    loginResult: loginResult
}