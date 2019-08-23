// pages/register/register.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        captcha: '',
        second: 0,
        active_R: false
    },

    // 提交；
    relevancyBtn: function(event) {
        var that = this

        var active_R = that.data.active_R
        if (active_R) {
            var phone = that.data.phone
            var captcha = that.data.captcha
            var check = /^[1][3,4,5,7,8][0-9]{9}$/

            if (check.test(phone)) {
                if (captcha.length == 6) {
                    var post_data = {
                        openid: app.globalData.openid,
                        unionid: app.globalData.unionid,
                        phone: phone,
                        captcha: captcha
                    }
                    app.wxRequest('phone', post_data, 'POST', that, function(res) {
                        console.log('register.js----relevancyBtn---app.request--res', res)
                        if (res.data.status_code == 0 && res.data.data == "phone.updated") {
                            wx.showToast({
                                title: '关联成功！',
                                icon: 'success',
                                duration: 500
                            })
                            wx.removeStorage('users')
							app.wxRequest2('gw/account/home', {}, 'GET', that, function (res) {
								console.log('app---getUser---个人信息---res', res)
								if (res.data.code == 200) {
									wx.setStorageSync('users', res.data.data)
								}
							})
                            setTimeout(function() {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }, 500)
                            // wx.switchTab({
                            //   url: '/pages/index/index'
                            // })
                        } else if (res.status_code == 1) {
                            if (res.message == "captcha.invalid") {
                                wx.showToast({
                                    title: '关联失败！',
                                    image: '../../images/fail.png',
                                    duration: 500
                                })
                                that.setData({
                                    active_R: true,
                                    second: 0
                                })
                            } else if (res.message == "phone.already.exist") {
                                wx.showToast({
                                    title: '该号码已存在',
                                    image: '../../images/fail.png',
                                    duration: 500
                                })
                                that.setData({
                                    active_R: true,
                                    second: 0
                                })
                            }
                            
                        }
                    })
                    that.setData({
                        active_R: false
                    })

                } else {
                    wx.showToast({
                        title: '验证码不正确！',
                        image: '../../images/fail.png'
                    })
                }
            }
        }
    },

    phone: function(event) {
        this.data.phone = event.detail.value

        this.setData({
            phone: this.data.phone
        })
    },

    emptyPhone: function(event) {
        this.setData({
            phone: ''
        })
    },
    // 验证码；
    captchaBtn: function(event) {
		var that = this
        var phone = that.data.phone

        console.log('captcha---phone', phone)
        var check = /^[1][3,4,5,7,8][0-9]{9}$/
        var second = that.data.second
        console.log('captcha---second', second)
        if (!second) {
            if (!check.test(phone)) {
                wx.showToast({
                    title: '手机号码不正确',
                    icon: "none"
                })
            } else {
                var post_data = {
                    "phone": phone,
                    "name": "ali"
                }
                app.wxRequest('pub/sms', post_data, 'POST', that, function(res) {
                    console.log('验证码', res)
                    if (res.statusCode == 200) {
                        if (res.data.data == "ok" && res.data.status_code == 0) {
                            wx.showToast({
                                title: '验证码已发送至手机',
                                icon: 'none'
                            })
                        }
                    } else {
                        wx.showToast({
                            title: '验证码获取失败',
                            image: '../../images/fail.png'
                        })
                    }

                })
                that.setData({
                    second: 120
                })
                that.setInterval(120)
            }
        }
    },
    endSetInter: function() {
        clearInterval(that.data.interval)
    },
    setInterval: function(second) {
        var that = this
        that.data.interval = setInterval(function() {
            second--
            if (second == 0) {
                clearInterval(that.data.interval)
            }
            this.setData({
                second: second
            })
        }.bind(this), 1000)
    },

    captcha: function(event) {

        this.data.captcha = event.detail.value
        var check = /^[1][3,4,5,7,8][0-9]{9}$/
        if (check.test(this.data.phone) && this.data.captcha.length == 6) {
            this.data.active_R = true
        } else {
            this.data.active_R = false
        }
        this.setData({
            captcha: this.data.captcha,
            active_R: this.data.active_R
        })
    },
    // 清空验证码；
    emptyCaptcha: function(event) {
        this.setData({
            captcha: ''
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

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
        clearInterval(this.data.interval)

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