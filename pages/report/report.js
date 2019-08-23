var wxCharts = require('../../utils/wxcharts.js')
var app = getApp()
var synthRing = null
var ageRing = null
var radarChart = null
Page({

    /*页面的初始数据*/
    data: {
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
        ],
        fs: [
            {
                bg_color: '#eea5ba',
                text: '绯红'
            },
            {
                bg_color: '#fff5f8',
                text: '透白'
            },
            {
                bg_color: '#fdecd5',
                text: '白皙'
            },
            {
                bg_color: '#fadebb',
                text: '自然'
            },
            {
                bg_color: '#f5c8b4',
                text: '小麦'
            },
            {
                bg_color: '#e2ae97',
                text: '暗沉'
            },
            {
                bg_color: '#cd937a',
                text: '古铜'
            },
            {
                bg_color: '#884e35',
                text: '黝黑'
            },
        ],
        fs_index: -1,
        synthData: {
            animation: true,
            canvasId: 'synthRing',
            type: 'ring',
            extra: {
                ringWidth: 12,
                pie: {
                    offsetAngle: -90
                }
            },
            title: {
                name: '75分',
                color: '#000',
                fontSize: 20
            },
            subtitle: {
                name: '',
                color: '#666666',
                fontSize: 10
            },
            series: [{
                    name: '',
                    data: 75,
                    stroke: false,
                    color: '#C28324'
                },
                {
                    name: '',
                    data: 25,
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
        },
        ageData: {
            animation: true,
            canvasId: 'ageRing',
            type: 'ring',
            extra: {
                ringWidth: 12,
                pie: {
                    offsetAngle: -90
                }
            },
            title: {
                name: '23岁',
                color: '#000',
                fontSize: 20
            },
            subtitle: {
                name: '',
                color: '#666666',
                fontSize: 10
            },
            series: [{
                    name: '',
                    data: 23,
                    stroke: false,
                    color: '#FF8D1A'
                },
                {
                    name: '',
                    data: 77,
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
        }
    },
    previewImage: function(event) {
        console.log('previewImage',event)
        var url = event.currentTarget.dataset.url
        var urls = []
        if (url) {
            urls = url.split('#')
        }
        var previewImages = []
        for (var i=0;i<urls.length;i++) {
            var itemImg = urls[i].split('?')
            previewImages.push(itemImg[0])
        }
        console.log('previewImage-----urls',urls)
        var index = event.currentTarget.dataset.index
        // var resultDatas = this.data.resultDatas
        app.globalData.previewImages = urls
        // app.openPage('../previewImage/previewImage?img0='+urls[0]+'&img1='+urls[1])
        app.openPage('../previewImage/previewImage')
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
                    var testDetails = res.data.data
                    for (var i in resultDatas) {
                        if (resultDatas[i].number >= 0) {
                        resultDatas[i].value = Math.round(resultDatas[i].ratio * 100)
                            for (var j in testResult) {
                                if (resultDatas[i].symptom == testResult[j].symptom) {

                                    resultDatas[i].text = testResult[j].text
                                    resultDatas[i].flag = true

                                    testResult[j] = resultDatas[i]
                                    
                                }
                            }
                        }
                    }
                    that.getRing({
                        synAge: res.data.data.synAge,
                        synScore: res.data.data.synScore
                    })
                    that.getRadar(testResult)
                    app.globalData.testResult = testResult
                    console.log('report----testResult',testResult)
                    that.setData({
                        testDetails: testDetails,
                        testResult: testResult,
                        resultDatas: res.data.data.resultDatas,
                        fs_index: 8 - res.data.data.complexion
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
    getRing: function(options) {
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
                    data: 100 - options.synScore,
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
                    data: 100 - options.synAge,
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
    /*getRadar: function(options) {
        console.log('getRadar----options',options)
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        } 
        radarChart = new wxCharts({
            canvasId: 'radarCanvas',
            type: 'radar',
            splitNumber: 4,
            categories: ['敏感区', '粉刺', '深斑', '毛孔', '皱纹', '表面色素'],
            series: [{
                name: '趋势往内,代表该项肤质越好',
                data: [options[4].value, options[5].value, options[1].value, options[3].value, options[0].value, options[2].value]
            }],
			background: 'red',
            // background: '#ccc',
            legend: true, // 是否显示图表下方各类别的标识，默认：true
            dataLabel: true,
            width: windowWidth * 0.8,
            height: 250,
            extra: {
                radar: {
                    max: 100,
                    gridColor: '#000000',
                }
            },
            splitArea: {
                show: false,
                areaStyle: {
                    width: 1,
                    color: '#cf0f00',
                    opacity: 0.5
                }
            }
        });
    },*/
	getRadar: function (options) {
		console.log('getRadar----options', options)
		var that = this
        var valueData = [options[4].value, options[5].value, options[1].value, options[3].value, options[0].value, options[2].value]
        console.log('getRadar---valueData',valueData)
		var radarData = [{ name: '趋势往内,代表该项肤质越好', value: valueData, color: '#fadebb'}]
        
		var options = {
			data: radarData,
			xLabel: ['敏感区', '粉刺', '深斑', '毛孔', '皱纹', '表面色素'],
			chartRatio: 0.7,
			style: 'radar',
			showLabel: true,
			animation: true,
			showTooltip: true,
			// tooltip: '{a}:{b}',
			area: true,
		}
		that.roseComp = that.selectComponent('#radar');
		that.roseComp.setOptions(options);
		that.roseComp.initChart(320, 250);

		// radarChart = new wxCharts({
		// 	canvasId: 'radarCanvas',
		// 	type: 'radar',
		// 	splitNumber: 4,
		// 	categories: ['敏感区', '粉刺', '深斑', '毛孔', '皱纹', '表素'],
		// 	series: [{
		// 		name: '趋势往内,代表该项肤质越好',
		// 		data: [options[4].value, options[5].value, options[1].value, options[3].value, options[0].value, options[2].value]
		// 	}],
		// 	background: 'red',
		// 	// background: '#ccc',
		// 	legend: true, // 是否显示图表下方各类别的标识，默认：true
		// 	dataLabel: true,
		// 	width: windowWidth * 0.8,
		// 	height: 250,
		// 	extra: {
		// 		radar: {
		// 			max: 100,
		// 			gridColor: '#000000',
		// 		}
		// 	},
		// 	splitArea: {
		// 		show: false,
		// 		areaStyle: {
		// 			width: 1,
		// 			color: '#cf0f00',
		// 			opacity: 0.5
		// 		}
		// 	}
		// });
	},
	openPage(e) {
		var that = this
		app.openPage('./index?phone='+that.data.phone)
	},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        console.log('report---onLoad---options', options)
        if (options) {
            if (options.testId) {
                that.getTestDetails(parseInt(options.testId))
            }
            // if (options.phone) {
            //     that.getTestDetails(options.phone)
            // }
			app.getUser(function (users) {
				console.log('app.getUser(function (users) {', users)
				if (users && users.phone) {
					that.setData({
						phone: users.phone
					})
				}
			})
        }
        // var testResult = app.globalData.testResult
        // this.setData({
        //     testResult: testResult
        // })
        // this.getRing()
        // this.getRadar()
    },


    /*生命周期函数--监听页面初次渲染完成*/
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