var wxCharts = require('../../utils/wxcharts.js')
var synthRing = null
var ageRing = null
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dossier: [{
            id: 1,
            name: '痘印',
            text: '痘痘发炎后，血管会扩张。但是消下去后血管并不会马上缩下去，就形成了一个一个平平红红的暂时性红斑。一般来说，通常这样的红斑平均来'
        }, ],
        selIndex: 0,
        nav: [
            {
                icon: '../../images/business/menu1.png',
                name: '线上测试',
                page: '../testing/testing',
				status: 1
            },
            {
                icon: '../../images/business/menu2.png',
                name: '预约门店',
                page: '../appoint/appoint?name=预约门店&store_type=store',
				status: 1
            },
            {
                icon: '../../images/business/menu3.png',
                name: '附近小屋',
                page: '../appoint/appoint?name=附近小屋&store_type=muaskin',
				status: 1
            },
            {
                icon: '../../images/business/menu4.png',
                name: '私人顾问',
                page: '',
				status: 1
            },
            {
                icon: '../../images/business/menu5.png',
                name: 'AI测试',
				page: '../AI-test/index',
				status: 0
            },
            {
                icon: '../../images/business/menu6.png',
                name: '品牌故事',
                page: '../article/article',
				status: 1
            },
        ],
        list: [
            /*{
              name: '肤质',
              value: '4颗星',
            },
            {
              name: '肤质',
              value: '4颗星',
            },
            {
              name: '肤质',
              value: '4颗星',
            },
            {
              name: '肤质',
              value: '4颗星',
            },
            {
              name: '肤质',
              value: '4颗星',
            },
            {
              name: '肤质',
              value: '4颗星',
            },
            {
              name: '肤质',
              value: '4颗星',
            },
            {
              name: '肤质',
              value: '4颗星',
            },
            {
              name: '肤质',
              value: '4颗星',
            },*/
        ],
        records: [],
        testResult: [
            {
                text: '皱纹',
                value: 50,
                symptom: 'Wrinkle',
                flag: false,
            },
            {
                text: '深斑',
                value: 40,
                symptom: 'HyperPigmentation',
                flag: false,
            },
            {
                text: '表面色素',
                value: 8,
                symptom: 'Pigmentation',
                flag: false,
            },
            {
                text: '毛孔',
                value: 50,
                symptom: 'Pore',
                flag: false,
            },
            {
                text: '敏感区',
                value: 50,
                symptom: 'SensitiveArea',
                flag: false,
            },
            {
                text: '粉刺',
                value: 50,
                symptom: 'Acne',
                flag: false,
            }
        ]
    },
	goReport: function () {
		var testId = this.data.testId
		console.log('goReport---this.data.testId', this.data.testId)
		if (testId) {
			app.openPage('../report/report?testId=' + testId)
		} else {
			wx.showToast({
				title: '没有测试id',
				icon: 'none'
			})
		}
	},
    openPage: function(e) {
        var url = e.currentTarget.dataset.url
        var openType = e.currentTarget.dataset.openType
        app.openPage(url, openType)
    },
    getRing: function(options) {
        console.log('getRing---options',options)
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            console.log('getSystemInfoSync', res)
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        synthRing = new wxCharts({
            animation: false,
            canvasId: 'synthRing',
            type: 'ring',
            extra: {
                ringWidth: 8,
                pie: {
                    offsetAngle: -90
                }
            },
            title: {
                name: options.synScore,
                color: '#000',
                fontSize: 16
            },
            subtitle: {
                name: '综合得分',
                color: '#666666',
                fontSize: 14
            },
            series: [{
                    name: '',
                    data: options.synScore,
                    stroke: false,
                    color: '#C28324'
                },
                {
                    name: '',
                    data: 100-options.synScore,
                    stroke: true,
                    color: '#F5F5F5'
                }
            ],
            disablePieStroke: true,
            width: 170,
            height: 150,
            dataLabel: false,
            legend: false,
            background: '#FFF',
            padding: 0
        });
        synthRing.addEventListener('renderComplete', () => {
            console.log('renderComplete');
        });
        ageRing = new wxCharts({
            animation: false,
            canvasId: 'ageRing',
            type: 'ring',
            extra: {
                ringWidth: 8,
                pie: {
                    offsetAngle: -90
                }
            },
            title: {
                name: options.synAge,
                color: '#000',
                fontSize: 16
            },
            subtitle: {
                name: '肌肤年龄',
                color: '#666666',
                fontSize: 14
            },
            series: [{
                    name: '',
                    data: options.synAge,
                    stroke: false,
                    color: '#FF8D1A'
                },
                {
                    name: '',
                    data:  100-options.synAge,
                    stroke: true,
                    color: '#F5F5F5'
                }
            ],
            disablePieStroke: true,
            width: 170,
            height: 150,
            dataLabel: false,
            legend: false,
            background: '#FFF',
            padding: 0
        });
        ageRing.addEventListener('renderComplete', () => {
            console.log('renderComplete');
        });
        setTimeout(() => {
            synthRing.stopAnimation();
            ageRing.stopAnimation();
        }, 500);
    },

    getTestDetails: function(testId) {
        var that = this
        console.log('business----getTestDetails----testId', testId)
        app.wxRequest2('meice/reports/' + testId, {}, 'GET', that, function(res) {
            console.log('business----getTestDetails----res', res)
            if (res.data.code == 200) {
                if (res.data.data && res.data.data.resultDatas) {
                    var resultDatas = res.data.data.resultDatas
                    var testResult = that.data.testResult
                    for (var i in resultDatas) {
                        if (resultDatas[i].number>=0) {
                            for (var j in testResult) {
                                if (resultDatas[i].symptom == testResult[j].symptom) {
                                    testResult[j].value = Math.round(resultDatas[i].ratio * 100)
                                    testResult[j].flag = true
                                }
                            }
                        }
                    }
                    app.globalData.testResult = testResult
                    that.setData({
                        testResult: testResult,
                        resultDatas: res.data.data.resultDatas
                    })
                }
            } else {
                wx.showToast({
                    title: res.data.message,
                    icon: 'none'
                })
            }
        })
    },
    getTest: function(userPhone) {
        var that = this
        // var userPhone = '13922112130'
        var userPhone = '13794411866'
        app.wxRequest2('meice/reports?userPhone=' + userPhone, {}, 'GET', that, function(res) {
            console.log('business----getTest----res', res)
            if (res.data.code == 200) {
                if (res.data.data) {
                    that.setData({
                        records: res.data.data.records
                    })
                    if (res.data.data.records.length) {
                        that.data.testId = res.data.data.records[0].id
                        that.getTestDetails(res.data.data.records[0].id)
                        that.getRing(
                            {
                                synAge: res.data.data.records[0].synAge,
                                synScore: res.data.data.records[0].synScore
                            }
                        )
                    }
                } else {
                    that.setData({
                        records: []
                    })
                }
            } else {
                wx.showToast({
                    title: res.data.message,
                    icon: 'none'
                })
            }
        })
        // this.setData({
        //   isTest: true
        // })
    },
    clickNav: function(event) {
        console.log(event)
        var page = event.currentTarget.dataset.page
        app.openPage(page)

    },
    businessScroll: function(event) {
        console.log('event', event)
        var index = event.detail.current
        this.setData({
            selIndex: index
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // this.getRing()
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
        var that = this
        var users = wx.getStorageSync('users')
        console.log('business---onshow---users', users)
        app.getUser(function(users) {
            if (users && users.phone) {
                that.getTest(users.phone)
            }
        })
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