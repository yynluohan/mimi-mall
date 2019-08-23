var app = getApp()
var pageSize = app.siteInfo.pageSize

Page({

    /**
     * 页面的初始数据
     */
    data: {
        nav: [{
                name: '待到门店',
                status: 'WAIT_TO_STORE',
                // num: 2
            },
            {
                name: '已完成',
                status: 'DONE',
                // num: 2
            },
        ],
        selIndex: 0,
        pageNum: 1,
        totalPage: 1,
        appoints: []
        /*appoints: [
          {
            id: 1,
            type: '皮肤测试、DNA测试',
            num: '123456789',
            cover: '../../images/store_cover.jpg',
            name: '珠江新城体验二店',
            address: '广州市天河区珠江西路23号珠江新城商城专柜',
            date: '2017.05.10   上午'
          },
          {
            id: 1,
            type: '皮肤测试、DNA测试',
            num: '123456789',
            cover: '../../images/store_cover.jpg',
            name: '珠江新城体验二店',
            address: '广州市天河区珠江西路23号珠江新城商城专柜',
            date: '2017.05.10   上午'
          }
        ]*/
    },

    appointBtn: function(event) {
        var that = this
        var id = event.currentTarget.dataset.id
        var type = event.currentTarget.dataset.type

		if (type == "delete") {
            console.log('删除')
			app.wxRequest2('appointment/appointments/app/' + id, {}, 'DELETE', that, function (res) {
				console.log('删除---res', res)
				if (res.data.code == 200) {
					wx.showToast({
						title: '删除成功',
						icon: 'none'
					})
				}
				that.getAppoint(that.data.nav[that.data.selIndex].status)
			})
        } else if (type == 'cancel') {
            console.log('取消')
            app.wxRequest2('appointment/appointments/' + id + '/action/cancel', {}, 'POST', that, function(res) {
                console.log('取消---res', res)
                if (res.data.code == 200) {
                    wx.showToast({
                        title: '取消成功',
                        icon: 'none'
                    })
                }
                that.getAppoint(that.data.nav[that.data.selIndex].status)
            })
        }
    },

    appointDetails: function(event) {
        var id = event.currentTarget.dataset.id
        app.openPage('../appoint-details/appoint-details?id=' + id)
    },
    getAppoint: function (status, pageNum) {
        var that = this
        if (!pageNum) {
            pageNum = 1
        }
        var appoints = that.data.appoints
        if (pageNum == 1) {
            appoints = []
        }
        var url = 'appointment/app/appointments?status=' + status + '&pageSize=' + pageSize + '&pageNum=' + pageNum
        app.wxRequest2(url, {}, 'GET', that, function(res) {
            console.log('预约---res', res)
            if (res.data.code == 200) {
                var records = res.data.data.records
                if (records.length > 0) {
                    for (var i in records) {
                        var len = records[i].latestTime.length
                        records[i].latestTime_s = records[i].latestTime.substring((len - 8), len)
                    }
                }
                that.setData({
                    appoints: appoints.concat(records),
                    totalPage: res.data.data.pages ? res.data.data.pages : 1,
                    pageNum: pageNum
                })
            }

        })
    },
    selNav: function(event) {
        var index = event.currentTarget.dataset.index
        if (this.data.selIndex != index) {
            this.getAppoint(this.data.nav[index].status)
        }
        this.setData({
            selIndex: index
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getAppoint('WAIT_TO_STORE')

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
        var that = this
        var appoints = that.data.appoints

        var totalPage = that.data.totalPage
        var pageNum = that.data.pageNum

        if (pageNum < totalPage) {
            pageNum += 1
            that.getAppoint(that.data.nav[that.data.selIndex].status, pageNum)
        } else {
            wx.showToast({
                title: "没有更多了",
                icon: "none"
            })
        }



    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})