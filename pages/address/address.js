const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // origin: '',
    // address: [
    //   {
    //     id: 1,
    //     name: '张三',
    //     phone: 13688899945,
    //     address: '广东省广州市黄浦区科学城彩频路广东软件园C栋000',
    //     default: true,
    //   },
    // ],
    selIndex: 0,
    btnWidth: 120,
    startX: 0
  },

  touchStart: function(event) {
    console.log('touchStart---event',event)
    var startX = event.touches[0].clientX
    var startY = event.touches[0].clientY
    this.setData({
      startX: startX,
      startY: startY
    })
  },
  touchMove: function(event) {
    console.log('touchMove---event',event)
    var index = event.currentTarget.dataset.index
    var movedX = event.touches[0].clientX - this.data.startX
    var movedY = event.touches[0].clientY - this.data.startY
    var btnWidth = this.data.btnWidth
    var leftList = this.data.leftList
    if ( Math.abs(movedX) > this.data.btnWidth/2 ) {
      leftList[index] = -movedX
      this.setData({
        leftList: leftList
      })
    } else {
      this.setData({
        leftList: []
      })
    }
  },
  touchEnd: function(event) {
    console.log('touchEnd---event',event)
    console.log('this.data.startX',this.data.startX)
    var index = event.currentTarget.dataset.index
    var endX = event.changedTouches[0].clientX
    var endY = event.changedTouches[0].clientY
    var moveX = this.data.startX - endX

    if ( moveX < 0 || moveX== 0 ) {
      moveX = 0
    } else {
      if ( moveX >= this.data.btnWidth/2 ) {
        moveX = this.data.btnWidth
      } else {
        moveX = 0
      }
    }
    var leftList = this.data.leftList
    leftList[index] = -moveX
    this.setData({
      leftList: leftList
    })
  },
  // 删除地址；
  delAddress: function(event) {
    var id = event.currentTarget.dataset.id
    var that = this
    console.log('删除')
    app.wxRequest('contact/'+id, {}, 'DELETE', that, function(res) {
      console.log('删除地址---res',res)
      that.getAddress()
    })
  },

  add: function() {
	  app.openPage('../edit-address/edit-address?type=add')
  },
  edit: function(event) {
    var index = event.currentTarget.dataset.index
    var address = JSON.stringify(this.data.addressList[index])

	  app.openPage('../edit-address/edit-address?address=' + address + '&type=edit')
  },

  radioChange: function(event) {
    console.log('radioChange----event',event)
    var selIndex = parseInt(event.currentTarget.dataset.index)
    // var selIndex = parseInt(event.detail.value)
    this.setData({
      selIndex: selIndex
    })
    if ( this.data.origin == 'sub-order' ) {
      var pages = getCurrentPages()
      console.log('pages',pages)
      var pageIndex = -1
      for ( var i=pages.length-1; i>=0; i-- ) {
        if ( pages[i].route == "pages/sub-order/sub-order" ) {
          pageIndex = i
        }
      }
      if ( pageIndex != -1 ) {
        var agonePage = pages[pageIndex]
        console.log('this.data.addressList[selIndex]',this.data.addressList[selIndex])
        agonePage.Carriage(agonePage.data.options,this.data.addressList[selIndex])
        agonePage.setData({
          addressList: this.data.addressList,
          addressIndex: selIndex,
          address: this.data.addressList[selIndex]
        })

        console.log('pageIndex',pageIndex)
        console.log('pages.length-1-pageIndex',pages.length-1-pageIndex)
        console.log('pages.length-pageIndex',pages.length-pageIndex)
        wx.navigateBack({
          delta: pages.length-1-pageIndex
        })
      }
    }
  },

  // 获取收货地址；
  getAddress: function() {
    var that = this
    app.wxRequest('contact', {}, 'GET', that, function(res) {
      console.log('收货地址----res',res)

      if ( res.statusCode == 200 ) {
		  if (res.data.data) {
			  for (var i=0;i<res.data.data.length; i++) {
				  if (res.data.data[i].is_default) {
					  that.data.selIndex = i
					  break
				  }
			  }
		  }
        that.setData({
          addressList: res.data.data,
			selIndex: that.data.selIndex,
          leftList: []
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('address---options',options)
    if ( options.origin ) {
      this.data.origin = options.origin,
      this.setData({
        origin: options.origin,
        selIndex: options.selIndex
      })
    }
    this.getAddress()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})