var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        menu: [{
                text: '全部'
            },
            {
                text: '五星评价'
            },
            {
                text: '四星评价'
            },
            {
                text: '三星评价'
            },
            {
                text: '二星评价'
            },
            {
                text: '一星评价'
            },
        ],
        lightIndex: 0,
        maxPage: 1,
        pageNum: 1,
        pageSize: 10,
        loadText: ''
    },
    selMenu: function(event) {
        var that = this
        var index = event.currentTarget.dataset.index
        if (index == 0) {
            that.getEvaluations(that.data.id, 6)
        } else {
            that.getEvaluations(that.data.id, (6 - index))
        }
        that.setData({
            lightIndex: index,
        })
    },
    // 获取评价；
    getEvaluations: function(id, starValue, curPage) {
        var that = this
        var pageNum = curPage ? curPage : 1
        var pageSize = that.data.pageSize
        var url = 'gw/expore/info/evaluations?stockType=Product&pageSize=' + pageSize+'&pageNum=' + pageNum + '&stockId=' + id

        if (starValue == 6) {
            url = 'gw/expore/info/evaluations?stockType=Product&pageSize=' + pageSize +'&pageNum=' + pageNum + '&stockId=' + id
        } else {
            url = 'gw/expore/info/evaluations?stockType=Product&pageSize=' + pageSize +'&pageNum=' + pageNum + '&stockId=' + id + '&starValue=' + starValue
        }
        app.wxRequest2(url, {}, 'GET', that, function(res) {
            console.log('商品评论----res', res)
            var evaluation
            if (pageNum == 1) {
                evaluation = res.data.data.records
            } else {
                evaluation = that.data.evaluation.concat(res.data.data.records)
            }
            if (res.data.data.current == res.data.data.pages) {
                that.data.loadText = '没有更多数据了'
            }
            
            that.setData({
                evaluation: evaluation,
                maxPage: res.data.data.pages || 1,
                pageNum: res.data.data.current || 1,
                loadText: that.data.loadText
            })
        })
    },
    getStarCount: function(id) {
        var that = this
        var pageNum = that.data.pageNum
        var url = 'cms/evaluations/starCount?stockType=Product&stockId=' + id
        app.wxRequest2(url, {}, 'GET', that, function(res) {
            console.log('getStarCount---res', res)
            var evaluationTotal = 0
            if (res.data.code == 200) {
                if (res.data.data.length) {
                    for (var i=0; i<res.data.data.length; i++) {
                        evaluationTotal += res.data.data[i].startCount
                    }
                }
            }
            that.setData({
                starCount: res.data.data,
                evaluationTotal: evaluationTotal
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        console.log('评论---onLoad--options', options)
        if (options && options.id) {
            that.setData({
                id: options.id
            })
            var starValue = parseInt(that.data.lightIndex)
            that.getEvaluations(options.id, starValue)
            that.getStarCount(options.id)
        }
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
    onReachBottom: function(e) {
        var that = this
        console.log('onReachBottom----触底-----e', e)
        var starValue = parseInt(6 - that.data.lightIndex)
        if (that.data.pageNum && that.data.maxPage && that.data.pageNum < that.data.maxPage) {
            var pageNum = that.data.pageNum + 1
            that.getEvaluations(that.data.id, starValue, pageNum)
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})