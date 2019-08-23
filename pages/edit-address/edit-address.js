const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
   data: {
    region: [],
    is_default: true
  },

  // 提交form;
  formSubmit: function(event) {
    console.log('event,event',event)
    var name = event.detail.value.name
    var phone = event.detail.value.phone
    var detailed = event.detail.value.detailed
    var bool = true
    var region = this.data.region
    if ( name == "" ) {
      bool = false
      wx.showToast({
        title: '收件人姓名不能为空',
        icon: 'none'
      })
    } else if ( phone == "" ) {
      bool = false
      wx.showToast({
        title: '联系方式不能为空',
        icon: 'none'
      })
    } else if ( region.length !=3 ) {
      bool = false
      wx.showToast({
        title: '请选择区域',
        icon: 'none'
      })
    } else if ( detailed == "" ) {
      bool = false
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
    }
    var address = {
      "contact_user": name,
      "phone": phone,
      // "zip": "510000",
      "province": region[0],
      "city": region[1],
      "district": region[2],
      // "street": "jianzhong road",
      // "street_number": "50",
      "detail": detailed,
      "is_default": this.data.is_default?1:0
    }
    if ( bool ) {
      var url = ''
      var method = ''
      var title = ''
      console.log('this.data.type',this.data.type)
      if ( this.data.type == 'add' ) {
        url = 'contact' 
        method = 'POST'
        title = '添加成功'
      } else if ( this.data.type == 'edit' ) {
        url = 'contact/'+ this.data.address.id
        method = 'PUT'
        title = '修改成功'
      }
      app.wxRequest( url, address, method, this, function(res) {
        console.log('添加地址',res)
        if ( res.statusCode == 200 ) {
          wx.showToast({
            title: title,
            icon: 'success'
          })
          setTimeout(function(){
			  app.openPage('../address/address?origin=sub-order', 'redirectTo')
          },500)
        }
      })
      // app.openPage('../address/address')
    }

  },
  switchChange: function(event) {
    console.log('是否默认---event',event)
    this.data.is_default = event.detail.value
  },

  // 选择地址；
  bindRegionChange: function(event) {
    console.log("event",event)
    var region = [event.detail.value[0], event.detail.value[1],event.detail.value[2]]
    // var region = event.detail.value[0] +' '+ event.detail.value[1] +' '+ event.detail.value[2]
    this.setData({
      region: region
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
    console.log('options',options)
    if ( options.address ) {
      var address = JSON.parse(options.address)
      console.log('onLoad----address',address)
      this.setData({
        address: address,
        type: options.type,
        region: [address.province, address.city, address.district]
      })
    } else {
      this.setData({
        type: options.type,
      })
    }
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