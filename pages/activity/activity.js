const app = getApp()
Page({

    /**页面的初始数据*/
    data: {
        activity: {
            cover: '../../images/ad1.png',
            goods: [
            {
                img: '../../images/good1.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: '108',
                id: '1'
            },
            {
                img: '../../images/good1.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: '108',
                id: '1'
            },
            {
                img: '../../images/good1.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: '108',
                id: '1'
            },
            {
                img: '../../images/good1.png',
                name: 'MUASKIN透明质酸保湿肌底液',
                price: '108',
                id: '1'
            },
            ]
        },
    },
    // 跳转商品详情；
    productDetails: function(event) {
        var id = event.currentTarget.dataset.id
        console.log('productDetails---id',id)
        app.openPage('../product-details/product-details?id='+id)
    },
    /*生命周期函数--监听页面加载*/
    onLoad: function (options) {

    },

    /*生命周期函数--监听页面初次渲染完*/
    onReady: function () {

    },

    /*生命周期函数--监听页面显示*/
    onShow: function () {

    },

    /*生命周期函数--监听页面隐藏*/
    onHide: function () {

    },

    /*生命周期函数--监听页面卸载*/
    onUnload: function () {

    },

    /*页面相关事件处理函数--监听用户下拉动作*/
    onPullDownRefresh: function () {

    },

    /*页面上拉触底事件的处理函数*/
    onReachBottom: function () {

    },

    /*用户点击右上角分享*/
    onShareAppMessage: function () {

    }
})