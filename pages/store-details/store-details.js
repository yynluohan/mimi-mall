var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
var date = new Date()
var Y = date.getFullYear()
var M = date.getMonth()+1
var D = date.getDate()
var H = date.getHours()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        runAM: false,
        fee: 0,
        detailImg: [
            // '../../images/store_cover.jpg',
            // '../../images/store_cover.jpg',
            // '../../images/store_cover.jpg',
            // '../../images/store_cover.jpg',
        ],
        store: {
            // id: 1,
            // name: '珠江新城体验一店',
            // area: '天河区',
            // range: '1.3km',
            // address: '广州市天河区珠江西路23号珠江新城商城专柜',
            // phone: '13600000000',
            // abstract: '简介简介简介简介简介',
        },
        times: ['00:00~02:00', '02:00~04:00', '04:00~06:00', '06:00~08:00', '08:00~10:00', '10:00~12:00', '12:00~14:00', '14:00~16:00', '16:00~18:00', '18:00~20:00', '20:00~22:00','22:00~23:59'],
        appointTime: [
            {
                earliestTime: '00:00:00',
                latestTime: '02:00:00'
            },
            {
                earliestTime: '02:00:00',
                latestTime: '04:00:00'
            },
            {
                earliestTime: '04:00:00',
                latestTime: '06:00:00'
            },
            {
                earliestTime: '06:00:00',
                latestTime: '08:00:00'
            },{
            earliestTime: '08:00:00',
            latestTime: '10:00:00'
        }, {
            earliestTime: '10:00:00',
            latestTime: '12:00:00'
        }, {
            earliestTime: '12:00:00',
            latestTime: '14:00:00'
        }, {
            earliestTime: '14:00:00',
            latestTime: '16:00:00'
        }, {
            earliestTime: '16:00:00',
            latestTime: '18:00:00'
        }, {
            earliestTime: '18:00:00',
            latestTime: '20:00:00'
        }, {
            earliestTime: '20:00:00',
            latestTime: '22:00:00'
        },{
            earliestTime: '22:00:00',
            latestTime: '23:59:00'
        } ],
        selTimePicker: [],
        appointType: '',
        fieldC: '',
        appointDate: '',
        timeIndex: -1,
        nowDate: Y+'-'+ (M>9?M:('0'+M))+'-'+(D>9?D:('0'+D)),
        startDate: '',
        location: true,
    },
    // 预约类型；
    getAppointments: function() {
        var that = this
        app.wxRequest2('appointment/items?status=1', {}, 'GET', that, function(res) {
            console.log('预约类型---res', res)
            if (res.data.code == 200) {
                that.setData({
                    listType: res.data.data.records
                })
            }
        })
    },
    // 定位导航
    openLocation: function(event) {
        var that = this
        var store = that.data.store
        var address = store.province + store.city + store.district + store.address
        if (that.data.location) {
            that.data.location = false
            app.openLocation(address, function(res) {
                console.log('导航--res', res)
                that.data.location = true
            })
        } else {
            wx.showToast({
                title: '请勿重复点击',
                icon: 'none'
            })
        }
    },

    bindPickerChange: function(event) {
        var that = this
        console.log('bindPickerChange----event', event)
        var pickerType = event.currentTarget.dataset.pickerType
        console.log('bindPickerChange----Y', Y)
        if (pickerType == 'fieldC') {
            that.setData({
                fieldC: event.detail.value
            })
        } else if (pickerType == 'appointDate') {
            var nowDate = that.data.nowDate
            var nowHours = new Date().getHours()
            var times = that.data.times
            var selTimePicker = that.data.selTimePicker
            console.log('bindPickerChange----event.detail.value', event.detail.value)
            console.log('bindPickerChange----date', nowDate)
            console.log('bindPickerChange----new Date()', new Date())
            
            if (nowDate == event.detail.value) {
                var index = Math.ceil(nowHours / 2)
                
                selTimePicker = times.slice(index)
                that.setData({
					timeIndex: Math.ceil(nowHours/2)
                })
                console.log('bindPickerChange----------nowHours', nowHours)
				console.log('bindPickerChange----------Math.ceil(nowHours/2)', Math.ceil(nowHours/2)+9)
            } else {
                selTimePicker = times
            }
            that.setData({
                appointDate: event.detail.value,
                selTimePicker: selTimePicker,
                
            })
        } else if (pickerType == 'timeIndex') {
			console.log('that.data.timeIndex', that.data.timeIndex)
			if (that.data.timeIndex == 12) {
				return
			}
            that.setData({
                timeIndex: event.detail.value
            })
        }
    },
    // 提交表单；
    appiontStore: function(event) {
        var that = this
        console.log('提交预约表单', event)
        console.log('this.data.code', that.data.code)
        var users = that.data.users
        var name = event.detail.value.name
        var phone = event.detail.value.phone
        var appointType = that.data.appointType
        var fee = that.data.fee
        var fieldC = that.data.fieldC || users.birthday
        var appointDate = that.data.appointDate
        var timeIndex = that.data.timeIndex
        var store = that.data.store
        var appointTime = that.data.appointTime
        var times = that.data.times
        console.log('store', store)
        var code = that.data.code
        console.log('appiontStore---appointType', appointType)
        console.log('appiontStore---fieldC', fieldC)
        console.log('appiontStore---appointDate', appointDate)
        console.log('appiontStore---timeIndex', timeIndex)
        // console.log('appiontStore---store_type',store_type)
        if (appointType == '') {
            wx.showToast({
                title: '请选择测试类型',
                icon: 'none'
            })
        } else if (name == '') {
            wx.showToast({
                title: '请填写联系人姓名',
                icon: 'none'
            })
        } else if (phone == '') {
            wx.showToast({
                title: '请填写联系电话',
                icon: 'none'
            })
        } else if (fieldC == '') {
            wx.showToast({
                title: '请选择出生日期',
                icon: 'none'
            })
        } else if (appointDate == '') {
            wx.showToast({
                title: '请选择预约日期',
                icon: 'none'
            })
        } else if (timeIndex == -1 || timeIndex == 12) {
            wx.showToast({
                title: '请选择预约时间段',
                icon: 'none'
            })
        } else {
            var post_appoint = {
                "memberId": that.data.users.id,
                "userId": that.data.users.userid,
                "appointmentTime": appointDate,
                "code": code,
                "earliestTime": appointDate + ' ' + appointTime[timeIndex].earliestTime,
                "latestTime": appointDate + ' ' + appointTime[timeIndex].latestTime,
                "fieldC": fieldC,
                "itemId": store.warehouseId,
                "itemName": store.name,
                "icon": store.avatar,
                "itemIcon": store.avatar,
                "itemAddress": store.province + store.city + store.district + store.address,
                "itemDescription": store.introduce,
                "memberName": name,
                "memberPhone": phone,
                "timeTnterval": [times[timeIndex]],
                "type": appointType,
                "fee": fee
            }
            app.wxRequest2('appointment/appointments', post_appoint, 'POST', that, function(res) {
                console.log('预约----res', res)
                if (res.data.code == 200) {
                    wx.showToast({
                        title: '预约成功',
                        icon: 'success'
                    })
                    if (fee > 0) {
                        var post_order = {
                            order_number: code,
                            order_type: "appointment",
                            type: "WXA"
                        }
                        app.wxRequest('wx/push_order', post_order, 'POST', that, function(res) {
                            console.log('wxPay----res', res)
                            if (res.data.status_code == 0) {
                                wx.requestPayment({
                                    "timeStamp": res.data.data.timeStamp,
                                    "nonceStr": res.data.data.nonceStr,
                                    "package": res.data.data.package,
                                    "signType": res.data.data.signType,
                                    "paySign": res.data.data.paySign,
                                    success: function(res) {
                                        console.log('requestPayment----res', res)
                                        if (res.errMsg == "requestPayment:ok") {
                                            app.openPage('../appiont-status/appiont-status?order_number=' + code + '&status=1')
                                            // app.openPage('../payment/payment?order_number='+order_number)
                                            // app.openPage('../order-details/order-details')
                                        }
                                    },
                                    fail: function(e) {
                                        console.log('fail----e', e)
                                        wx.showToast({
                                            title: '支付失败',
                                            image: '../../images/fail.png',
                                            duration: 1000
                                        })
                                        // app.openPage('../payment/payment?order_number='+order_number)
                                        // app.openPage('../order-details/order-details?order_number='+order_number)
                                    }
                                })
                            } else if (res.data.status_code == 1) {
                                wx.showToast({
                                    title: '支付失败',
                                    image: '../../images/fail.png'
                                })
                                app.openPage('../appiont-status/appiont-status?order_number=' + code + '&status=2')
                            }
                        })
                    } else {
                        app.openPage('../appiont-status/appiont-status?order_number=' + code + '&status=1')
                    }

                    /*setTimeout(function(){
                      app.openPage('../my-appoint/my-appoint')
                    },1000)*/
                } else if (res.data.code == 400) {
                    wx.showToast({
                        title: '不能重复预约',
                        icon: '',
                        image: '../../images/fail.png'
                    })
                }
            })
        }
    },
    getCode: function() {
        var that = this
        app.wxRequest2('pub/sn/serial?prefix=APT', {}, 'GET', that, function(res) {
            console.log('code---res', res)
            if (res.data.code == 200) {
                that.setData({
                    code: res.data.data
                })
            }
        })
    },
    checkboxChange: function(event) {
        var that = this
        console.log('多选框', event)
        var value = event.detail.value
        var listType = that.data.listType
        var fee = 0
        var appointType = ''
        if (value.length > 0) {
            for (var i in value) {
                fee += listType[Number(value[i])].fee
                appointType += listType[Number(value[i])].type
            }
        }
        console.log('fee', fee)
        console.log('appointType', appointType)
        this.setData({
            appointType: appointType,
            fee: fee
        })
    },
    // 获取个人信息；
    getUser: function(cb) {
        var that = this
        app.getUser(function(users) {
            console.log('个人信息--users', users)
            typeof(cb) == "function" && cb(users)
            if (users) {
                that.setData({
                    users: users
                })
            } else {
                that.setData({
                    users: {}
                })
            }
        })
        /*var userss = wx.getStorageSync('userss')
        var users = wx.getStorageSync('users')
        console.log('userss',userss)
        console.log('users',users)
        if ( users ) {
          that.setData({
            users: users
          })
        }*/
    },
    chanMask: function(event) {
        var that = this
        console.log('chanMask---event', event)
        console.log('event.currentTarget.dataset.typeBtn', event.currentTarget.dataset.typeBtn)
        var typeBtn
        if (event.currentTarget.dataset.typeBtn != undefined) {
            typeBtn = event.currentTarget.dataset.typeBtn
            if (typeBtn == "appiont") {
                that.getCode()
                // that.getUser()
            }
        }
        that.getUser(function (users) {
            console.log("store-details----onshow---users", users)
            if (users) {
                if (!users.phone) {
                    wx.showModal({
                        title: '绑定手机号',
                        content: '为了给您提供更好的产品体验，需要您绑定一个常用的手机号',
                        cancelText: '取消',
                        confirmText: '立即绑定',
                        confirmColor: '#c28324',
                        success(res) {
                            if (res.confirm) {
                                app.openPage('../register/register')
                            } else if (res.cancel) {

                            }
                        }
                    })
                } else {
                    // var typeBtn = event.currentTarget.dataset.typeBtn
                    console.log('chanMask')
                    var isShow = that.data.show ? false : true;
                    var delay = isShow ? 30 : 500;
                    console.log('delay---', delay)
                    /*that.setData({
                      show: isShow,
                      runAM: !that.data.runAM
                    })*/
                    if (isShow) {
                        that.setData({
                            show: isShow
                        });
                    } else {
                        that.setData({
                            runAM: isShow
                        });
                    }

                    setTimeout(function () {
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
            } else {
                wx.showToast({
                    title: '用户信息未完善',
                    icon: 'none'
                })
            }
        })
        // var typeBtn = event.currentTarget.dataset.typeBtn
        /*console.log('chanMask')
        var isShow = that.data.show ? false : true;
        var delay = isShow ? 30 : 500;
        console.log('delay---', delay)
        /*that.setData({
          show: isShow,
          runAM: !that.data.runAM
        })/
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
        }.bind(that), delay);*/
    },
    callUp: function(event) {
        var telephone = event.currentTarget.dataset.telephone
        if (telephone) {
            wx.makePhoneCall({
                phoneNumber: telephone,
            })
        }
    },
    getStoreDetails: function(id) {
        var that = this
        app.wxRequest2('store/stores/' + id, {}, 'GET', that, function(res) {
            console.log('店铺详情---res', res)
            if (res.statusCode == 200) {
                if (res.data.data.introduce) {
                    WxParse.wxParse('description', 'html', res.data.data.introduce, that, 5);
                }

                that.setData({
                    store: res.data.data,
                    detailImg: res.data.data.images
                })
            }
        })
    },
    // 生命周期函数--监听页面加载
    onLoad: function(options) {
        console.log('store-details----options', options)
        var title = options.title != '' ? options.title : ''
        this.setData({
            title: title
        })
        var id = options.id
        this.getStoreDetails(id)
        this.getAppointments()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    getStartDate() {
        var that = this
        console.log('getStartDate----H', H)
        if (H>=22) {
            var dd = new Date()
            dd.setDate(dd.getDate() + 1)
            var YY = dd.getFullYear()
            var MM = dd.getMonth() + 1
            var DD = dd.getDate()

            that.data.startDate = YY + '-' + (MM > 9 ? MM : ('0' + MM)) + '-' + (DD > 9 ? DD : ('0' + DD))
        } else {
            that.data.startDate = that.data.nowDate
        }
        console.log('getStartDate----that.data.startDate', that.data.startDate)
        that.setData({
            startDate: that.data.startDate
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var that = this
        that.getStartDate()

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