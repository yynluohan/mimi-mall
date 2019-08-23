var app = getApp()
var nowDate = new Date()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sexs: ['保密', '男', '女'],
        profile: {},
        nowDate: nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate(),

    },
    saveBtn: function() {
        var that = this
        var users = that.data.users
        var profile = that.data.profile
        console.log('saveBtn---profile',profile)
        if (profile.real_name) {
            users.real_name = profile.real_name
            if (profile.birthday) {
                users.birthday = profile.birthday
                if (profile.sex >= 0) {
                    users.sex = profile.sex
                    app.wxRequest('profile', users, 'POST', that, function(res) {
                        console.log('saveBtn', res)
                        if (res.data.message == "profile.updated") {
                            wx.showToast({
                                title: '更新成功',
                                icon: 'success'
                            })
							wx.removeStorageSync('users')
                            app.getUser(function(){})
                            wx.navigateBack({
                                delta: 1
                            })
                        }
                    })
                } else {
                    wx.showToast({
                        title: '请填写性别！'
                    })
                    return
                }
            } else {
                wx.showToast({
                    title: '请填写出生日期！'
                })
                return
            }
        } else {
            wx.showToast({
                title: '真实姓名不能为空！'
            })
            return
        }

    },
    bindinput: function(event) {
        var that = this
        var real_name = event.detail.value
        var profile = that.data.profile
        profile.real_name = real_name
        that.setData({
            profile: profile
        })
    },
    pickerChange: function(event) {
        var that = this
        console.log('pickerChange---event', event)
        var pickerType = event.currentTarget.dataset.pickerType
        var value = event.detail.value
        var profile = that.data.profile
        if (pickerType == 'date') {
            profile.birthday = value
        } else if (pickerType == 'sex') {
            profile.sex = value
        }
        that.setData({
            profile: profile
        })
    },
    getUser: function() {
        var that = this
        app.getUser(function(users) {
            console.log('个人信息--users', users)
            that.data.profile = {
                real_name: users.real_name,
                birthday: users.birthday,
                sex: users.sex
            }
            that.setData({
                users: users,
                profile: that.data.profile,
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        that.getUser()
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