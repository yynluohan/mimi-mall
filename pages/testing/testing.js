var app = getApp()
var nowDate = new Date()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isSubmit: false,
        subject: true,
        profile: {},
        questionNum: 0,
        /*surveys: {
            author: "雁能",
            createTime: "",
            enabled: 1,
            id: "1",
            status: "1",
            title: "测试问卷",
            type: "测试",
            updateTime: "",
            surveyItems: [{
                content: "测试题目1",
                id: "1",
                isRequired: 0,
                itemOptions: [{
                    content: "选项A",
                    id: "1",
                    itemId: "1",
                    optionNum: 1
                }, {
                    content: "选项B",
                    id: "2",
                    itemId: "1",
                    optionNum: 2
                }, {
                    content: "选项C",
                    id: "3",
                    itemId: "1",
                    optionNum: 3
                }, {
                    content: "选项D",
                    id: "4",
                    itemId: "1",
                    optionNum: 4
                }, {
                    content: "选项E",
                    id: "5",
                    itemId: "1",
                    optionNum: 4
                }, ],
                questionNum: 1,
                surveyId: "1",
                type: "RADIO",
            }, {
                content: "测试题目2",
                id: "1",
                isRequired: 0,
                itemOptions: [{
                    content: "选项A",
                    id: "1",
                    itemId: "1",
                    optionNum: 1
                }, {
                    content: "选项B",
                    id: "2",
                    itemId: "1",
                    optionNum: 2
                }, {
                    content: "选项C",
                    id: "3",
                    itemId: "1",
                    optionNum: 3
                }, {
                    content: "选项D",
                    id: "4",
                    itemId: "1",
                    optionNum: 4
                }, ],
                questionNum: 2,
                surveyId: "1",
                type: "RADIO",
            }, {
                content: "测试题目3",
                id: "1",
                isRequired: 0,
                itemOptions: [{
                    content: "选项A",
                    id: "1",
                    itemId: "1",
                    optionNum: 1
                }, {
                    content: "选项B",
                    id: "2",
                    itemId: "1",
                    optionNum: 2
                }, {
                    content: "选项C",
                    id: "3",
                    itemId: "1",
                    optionNum: 3
                }, {
                    content: "选项D",
                    id: "4",
                    itemId: "1",
                    optionNum: 4
                }, {
                    content: "选项E",
                    id: "5",
                    itemId: "1",
                    optionNum: 5
                }, {
                    content: "选项F",
                    id: "6",
                    itemId: "1",
                    optionNum: 6
                }, ],
                questionNum: 3,
                surveyId: "1",
                type: "RADIO",
            }, {
                content: "测试题目4",
                id: "1",
                isRequired: 0,
                itemOptions: [{
                    content: "选项A",
                    id: "1",
                    itemId: "1",
                    optionNum: 1
                }, {
                    content: "选项B",
                    id: "2",
                    itemId: "1",
                    optionNum: 2
                }, {
                    content: "选项C",
                    id: "3",
                    itemId: "1",
                    optionNum: 3
                }, {
                    content: "选项D",
                    id: "4",
                    itemId: "1",
                    optionNum: 4
                }, ],
                questionNum: 4,
                surveyId: "1",
                type: "MULTI",
            }, {
                content: "测试题目5",
                id: "1",
                isRequired: 0,
                itemOptions: [{
                    content: "选项A",
                    id: "1",
                    itemId: "1",
                    optionNum: 1
                }, {
                    content: "选项B",
                    id: "2",
                    itemId: "1",
                    optionNum: 2
                }, {
                    content: "选项C",
                    id: "3",
                    itemId: "1",
                    optionNum: 3
                }, {
                    content: "选项D",
                    id: "4",
                    itemId: "1",
                    optionNum: 4
                }, ],
                questionNum: 5,
                surveyId: "1",
                type: "MULTI",
            }, {
                content: "测试题目6",
                id: "1",
                isRequired: 0,
                itemOptions: [{
                    content: "选项A",
                    id: "1",
                    itemId: "1",
                    optionNum: 1
                }, {
                    content: "选项B",
                    id: "2",
                    itemId: "1",
                    optionNum: 2
                }, {
                    content: "选项C",
                    id: "3",
                    itemId: "1",
                    optionNum: 3
                }, {
                    content: "选项D",
                    id: "4",
                    itemId: "1",
                    optionNum: 4
                }, ],
                questionNum: 6,
                surveyId: "1",
                type: "MULTI",
            }, ],
        },*/
        nowDate: nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate(),
    },
    openPage: function(e) {
        var url = e.currentTarget.dataset.url
        var openType = e.currentTarget.dataset.openType

        app.openPage(url, openType)
    },
    // 提交答案；
    subAnswers: function() {
        var that = this
        var answers = that.data.answers
        console.log('testing---subAnswers---answers', answers)

        var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
        var post_answers = []
        for (var i in answers) {
            var item = parseInt(i) + 1
            for (var j in answers[i]) {
                if (answers[i][j]) {
                    item = item + ',' + arr[j]
                }
            }
            post_answers.push(item)
        }
        console.log('testing----subAnswers----post_answers', post_answers)
    },
    // 选择答案；
    selAnswer: function(event) {
        var that = this
        console.log('testing---selAnswer----event', event)
        var index = event.currentTarget.dataset.index
        var itemType = event.currentTarget.dataset.itemType
        var questionNum = that.data.questionNum
        var answerNum = questionNum - 1
        var answers = that.data.answers
        // 单选；
        if (itemType == 'RADIO') {
            for (var i in answers[answerNum]) {
                if (i == index) {
                    answers[answerNum][i] = !answers[answerNum][i]
                } else {
                    answers[answerNum][i] = false
                }
            }
            // 多选
        } else if (itemType == 'MULTI') {
            answers[answerNum][index] = !answers[answerNum][index]
        }
        that.setData({
            answerItem: answers[questionNum - 1]
        })

    },
    // 获取题目；
    getSurvey: function() {
        var that = this
        app.wxRequest2('survey/surveys/selected?type=CTest', {}, 'GET', that, function(res) {
            console.log('testing-----getSurvey---res', res)
            if (res.data.code == 200) {
                if (res.data.data) {
                    var questionNum = that.data.questionNum
                    var surveys = res.data.data
                    var answers = new Array(surveys.surveyItems.length)
                    for (var i in surveys.surveyItems) {
                        var itemOptions = surveys.surveyItems[i].itemOptions
                        answers[i] = new Array(itemOptions.length)
                        for (var j in itemOptions) {
                            answers[i][j] = false
                            surveys.surveyItems[i].itemOptions[j].imageUrl_s = JSON.parse(itemOptions[j].imageUrl)
                        }
                        console.log('answers', answers)
                        console.log('surveys', surveys)
                    }
                    that.setData({
                        surveys: res.data.data,
                        questionNum: questionNum,
                        surveyItems: surveys.surveyItems[questionNum - 1],
                        answers: answers
                    })
                } else {}
            }
        })
    },
    selSex: function(event) {
        var status = event.currentTarget.dataset.status
        var profile = this.data.profile
        profile.sex = status
        this.setData({
            profile: profile
        })
    },
    // 按钮操作；
    subjectBtn: function(event) {
        var that = this
        var operation = event.currentTarget.dataset.operation
        var questionNum = that.data.questionNum
        var surveys = that.data.surveys
        var answers = that.data.answers
        console.log('subjectBtn----questionNum', questionNum)
        console.log('subjectBtn----surveys', surveys)
        console.log('subjectBtn----answers', answers)
        if (operation == 'start') {
			var profile = that.data.profile
			if (!profile.birthday) {
				wx.showToast({
					title: '请填写出生年月',
					icon: 'none'
				})
				return
			} else if (!profile.sex) {
				wx.showToast({
					title: '请填写性别',
					icon: 'none'
				})
				return
			}
            that.getSurvey()
            questionNum = 1
            that.setData({
                questionNum: questionNum,
                // surveys: surveys,
                // surveyItems: surveys.surveyItems[questionNum - 1]
            })
        } else if (operation == 'upper') {
            questionNum = questionNum - 1
            if (questionNum) {
                surveyItems = surveys.surveyItems[questionNum - 1]
                answerItem = answers[questionNum - 1]
            } else {
                surveyItems = {}
                answerItem = []
            }
            that.setData({
                questionNum: questionNum,
                surveys: surveys,
                surveyItems: surveyItems,
                answerItem: answerItem
            })
        } else if (operation == 'next') {
            var flag = false
            var answerItem = answers[questionNum - 1]
            var surveyItems = surveys.surveyItems[questionNum - 1]

            for (var i in answerItem) {
                if (answerItem[i]) {
                    flag = true
                    break
                }
            }
            if (surveys.surveyItems[questionNum - 1].isRequired) {
                if (flag) {
                    if (questionNum == surveys.surveyItems.legnth) {
                        questionNum = questionNum
                        that.subAnswers()
                    } else {
                        questionNum = questionNum + 1;
                    }
                    that.setData({
                        questionNum: questionNum,
                        surveys: surveys,
                        surveyItems: surveys.surveyItems[questionNum - 1],
                        answerItem: answers[questionNum - 1]
                    })
                } else {
                    if (surveyItems.isRequired) {
                        wx.showToast({
                            title: '请选择一项答案！',
                            icon: 'none'
                        })
                    } else {
                        that.setData({
                            questionNum: questionNum,
                            surveys: surveys,
                            surveyItems: surveys.surveyItems[questionNum - 1],
                            answerItem: answers[questionNum - 1]
                        })
                    }
                }
            } else {
                if (questionNum == surveys.surveyItems.length) {
                    questionNum = questionNum
                    that.subAnswers()
                } else {
                    questionNum = questionNum + 1;
                    that.setData({
                        questionNum: questionNum,
                        surveys: surveys,
                        surveyItems: surveys.surveyItems[questionNum - 1],
                        answerItem: answers[questionNum - 1]
                    })
                }
            }

        } else if (operation == 'submit') {
            var answerArr = []
            for (var i = 0; i < surveys.surveyItems.length; i++) {
                var itemAnswerStr = i + 1 + ','
                for (var j = 0; j < answers.length; j++) {
                    if (answers[i][j]) {
                        itemAnswerStr += surveys.surveyItems[i].itemOptions[j].content
                    }
                }
                answerArr.push(itemAnswerStr)
            }
            console.log('answerArr----', answerArr)

            var post_data = {
                authorId: that.data.users.id,
                authorMessage: "",
                content: answerArr,
                surveyId: surveys.id
            }
            app.wxRequest2('survey/surveys/answers', post_data, 'POST', that, function(res) {
                console.log('提交测试------res', res)
                if (res.data.code == 200) {
                    that.setData({
                        isSubmit: true
                    })
                }
            })
        }
    },
    bindPickerChange: function(event) {
		var that = this
        console.log('event', event)
        var value = event.detail.value
        console.log('value', value)
        var age = nowDate.getFullYear() - value.substring(0, 4)
        console.log(age)
		var profile = that.data.profile
		profile.birthday = value
		profile.age = age
		that.setData({
			profile: profile
        })
    },
    judgeAnswered(uesrId) {
        var that = this
        app.wxRequest2('app/surveys/answered/' + uesrId, {}, 'GET', that, function(res) {
            console.log('judgeAnswered-----res', res)
            if (res.data.code == 200) {
                if (res.data.data) {

                } else {

                }
            }
        })
    },
    getUser: function() {
        var that = this
        var users = wx.getStorageSync('users')
        var profile = {}

        app.getUser(function(users) {
            console.log('个人信息--users', users)
            if (users) {
                that.judgeAnswered(users.id)
                profile.birthday = users.birthday
                profile.sex = users.sex
                var birthdayArr = profile.birthday.split('-')
                if (birthdayArr[0].length==4) {
                    profile.age = (nowDate.getFullYear() - parseInt(birthdayArr[0]))?nowDate.getFullYear() - parseInt(birthdayArr[0]) + '岁': '1岁'
                } else {
                    profile.age = ''
                }
                that.setData({
                    users: users,
                    profile: profile
                })
            } else {
                that.setData({
                    users: {},
                    profile: profile
                })
            }
        })
        /*if (!users) {
            console.log('!users')
            app.utils.getUser(that, function(res) {
                console.log('index----onshow---app.utils.getUser--res', res)
                if (res.data.code == 200 && res.data.data && res.data.data.id) {
                    that.judgeAnswered(res.data.data.id)
                    profile.birthday = users.birthday
                    profile.sex = users.sex
                    if (users.birthday) {
                        profile.age = nowDate.getFullYear() - users.birthday.substring(0, 4)
                    } else {
                        profile.age = ''
                    }
                }
                that.setData({
                    users: res.data.data,
                    profile: profile
                })
            })
        } else {
            that.judgeAnswered(users.id)
            profile.birthday = users.birthday
            profile.sex = users.sex
            if (users.birthday) {
                profile.age = nowDate.getFullYear() - users.birthday.substring(0, 4)
            } else {
                profile.age = ''
            }
            that.setData({
                users: users,
                profile: profile
            })
        }*/
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        // that.getUser()
        // var surveys = that.data.surveys
        // var questionNum = that.data.questionNum

        // console.log('surveys.surveyItems[questionNum]', surveys.surveyItems[questionNum])
        // that.setData({
        //     questionNum: questionNum,
        //     // surveys: surveys,
        //     // surveyItems: surveys.surveyItems[questionNum-1],
        //     // answerItem: answers[questionNum - 1]
        // })
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
        var profile = {}
        that.getUser()
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