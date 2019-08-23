// search.js
const app = getApp()
var pageSize = app.siteInfo.pageSize
Page({
  data: {
    productList: [],
    orderArr: [
    { 'title': '人气', 'src': '#', 'color': '#000', 'order': 'view_count'},
    { 'title': '销量', 'src': '#', 'color': '#000', 'order': 'sales'},
    { 'title': '价格', 'src': '#', 'color': '#000', 'order': 'price'}, 
    ],
    hotWord: [],
    historyWord: ['asd','56464'],
    isHot: false,
    selectPerson:false,
    select: true,
    searchName: '',
    animationData: {},
    focus: false,
    pageNumber: 1,
    totalSize: 10,
    url: '',
    type: '',
    searchText: '',
    /*goods: [
      {
        cover: '../../images/good1.png',
        id: 1,
        name: '香氛焕彩水乳液丙多芬卡撒反对50ml',
        prompt: '针对肤质解决暗沉有光等问',
        price: 288.00,
      },
      {
        cover: '../../images/good1.png',
        id: 1,
        name: '香氛焕彩水乳液丙多芬卡撒反对50ml',
        prompt: '针对肤质解决暗沉有光等问',
        price: 288.00,
      },
      {
        cover: '../../images/good1.png',
        id: 1,
        name: '香氛焕彩水乳液丙多芬卡撒反对50ml',
        prompt: '针对肤质解决暗沉有光等问',
        price: 288.00,
      },
      {
        cover: '../../images/good1.png',
        id: 1,
        name: '香氛焕彩水乳液丙多芬卡撒反对50ml',
        prompt: '针对肤质解决暗沉有光等问',
        price: 288.00,
      },
      {
        cover: '../../images/good1.png',
        id: 1,
        name: '香氛焕彩水乳液丙多芬卡撒反对50ml',
        prompt: '针对肤质解决暗沉有光等问',
        price: 288.00,
      },
      {
        cover: '../../images/good1.png',
        id: 1,
        name: '香氛焕彩水乳液丙多芬卡撒反对50ml',
        prompt: '针对肤质解决暗沉有光等问',
        price: 288.00,
      },
    ]
    */
  },
  resetForm: function() {
    // this.getProduct(-1)
    this.setData({
      searchText: '',
      isHot: true
    })
  },
  historyWord: function(text) {
    var that = this
    console.log('historyWord---text',text)
    var historyWord =  that.data.historyWord
    console.log('historyWord---that.data.historyWord',that.data.historyWord)
    var bool = true
    if ( historyWord.length > 0 ) {
      for ( var i=0; i<historyWord.length; i++ ) {
        if ( text == historyWord[i] ) {
          bool = false
          return
        }
      }
    } else {
      historyWord.push(text)
      console.log('historyWord.push',historyWord)
    }
    if (bool) {
      historyWord.push(text)
    }
      console.log('historyWord.push222',historyWord)

    that.setData({
      historyWord: historyWord
    })
  },
  searchAgency: function(event) {
    console.log('searchAgency---event',event)
    var searchText = event.detail.value
    searchText = searchText.replace(/^\s+|\s+$/g, '')
    // if ( searchText != '' ) {
      //   this.historyWord(searchText)
      //   this.data.pageNumber = 1
      //   var url = 'product_search?name='+searchText+'&pageSize='+pageSize
      //   this.getSearchData('name', url, 'false')
      // }
      this.setData({
        searchText: searchText
      })
    },
    // 搜索；
    searchSubmit: function(event) {
      console.log('event',event)
      var searchText
      if ( event.detail.value ) {
        searchText = event.detail.value.replace(/^\s+|\s+$/g, '')
      }
      if ( event.currentTarget.dataset.hotWord ) {
        searchText = event.currentTarget.dataset.hotWord
      }
      console.log('searchText',searchText)
      // var abc = searchText.replace(/^\s+|\s+$/g, '')
      // console.log('abc',abc)

      if ( searchText != '' ) {
        console.log('searchSubmit---searchText',searchText)
        this.historyWord(searchText)
        this.data.pageNumber = 1
        var url = 'product_search?name='+searchText+'&pageSize='+pageSize
        this.getSearchData('name', url, 'false')
      }
      this.setData({
        isHot: false
      })
    },

    // 清空历史搜索；
    empty: function() {
      this.setData({
        historyWord: []
      })    
    },
    // 点击商品调用该函数跳转详情页；
    getDetails: function (options){
      console.log('a11a1a1a1a1')
      console.log(options.currentTarget.dataset.id)
      wx.navigateTo({
        url: '../details/details?id=' + options.currentTarget.dataset.id
      })
    },

    clickOrder: function(event) {
      console.log('------search----clickOrder-----')

      var _this = this

      var index = event.currentTarget.dataset.index

      var orderArr = _this.data.orderArr
      var orderBy = orderArr[index].order

      console.log(index)
      for ( var i=0; i<orderArr.length; i++ ) {
        if ( i == index ) {
          orderArr[i].color = 'red'
        } else {
          orderArr[i].color = "#000"
        }
      }

      if ( index == 2 ) {
        _this.data.selectPerson = !_this.data.selectPerson

      } else {
        _this.data.selectPerson = false
        orderArr[2].title = "价格"


        _this.setData({
          selectPerson: false,
          select: true,
          orderArr: orderArr
        })
      }
      if(_this.data.selectPerson == true){

        var animation = wx.createAnimation({
          duration: 200,
          timingFucion: "ease",
        })

        animation.height(160+'rpx').step()

        _this.setData({
          selectPerson: _this.data.selectPerson,
          orderArr: _this.data.orderArr,
          animationData: animation.export()
        })
      }else{

        var animation = wx.createAnimation({
          duration: 100,
          timingFucion: "ease",
        })

        animation.height(0+'rpx').step()

        _this.setData({
          selectPerson:_this.data.selectPerson,
          orderArr: _this.data.orderArr,
          animationData: animation.export()
        })
      }
      var url = this.data.url +'&orderByDesc='+ orderArr[index].order

      this.getSearchData( this.data.type, url, 'false')
      wx.request({
        // http://112.74.26.228:10080/rest/product_search?pageNumber=1&pageSize=20&name=abc&orderByDesc=view_count&orderBy=price&orderBy=sales
        url: app.siteInfo.API_URL +'/product_search?name='+ _this.data.searchName +'&orderByDesc='+ orderArr[index].order,
        header: {
          'access_token': app.globalData.token,
          'content-type': 'json'
        },
        success: function (res) {

          console.log(res.data.data)
          wx.hideLoading()
          _this.setData({
            productList: res.data.data,
            isHot: false,
            orderArr: _this.data.orderArr
          })
        }
      });
    },

    mySelect:function(e){
      var _this = this
      var orderArr = _this.data.orderArr
      var selectPrice = e.currentTarget.dataset.order
      console.log(777)
      console.log(selectPrice)
      var text = ''
      orderArr[2].color = "red"
      if ( selectPrice == 'orderBy') {
        text = "从低到高"
      } else {
        text = "从高到低"
      }

      var animation = wx.createAnimation({
        duration: 100,
        timingFucion: "ease",
      })

      animation.height(0+'rpx').step()

      console.log(orderArr[2].color)
      // var url = API_URL+'product_search?pageNumber=1&pageSize=60&name='+ _this.data.searchName +'&'+ selectPrice + '=' + orderArr[2].order
      console.log(533)
      // console.log(url)
      wx.request({
        // http://112.74.26.228:10080/rest/product_search?pageNumber=1&pageSize=20&name=abc&orderByDesc=view_count&orderBy=price&orderBy=sales
        url: app.siteInfo.API_URL + '/product_search?pageNumber=1&pageSize=60&name='+ _this.data.searchName +'&'+ selectPrice + '=' + orderArr[2].order, //仅为示例，并非真实的接口地址
        header: {
          'access_token': app.globalData.token,
          'content-type': 'json'
        },
        success: function (res) {
          console.log(res.data.data)
          wx.hideLoading()
          _this.setData({
            productList: res.data.data,
            isHot: 'false',
            selectPerson:true,
            select: false,
            selectPrice: text,
            orederArr: _this.data.orderArr,
            animationData: animation.export()
          })
        }
      });

    /*this.setData({
      selectPerson:true,
      select: false,
      selectPrice: text,
      orederArr: this.data.orderArr
    })*/
  },
  // 获取某类别下的产品；
  getProduct: function(id) {
    var that = this
    var pageNumber = that.data.pageNumber
    console.log('getProduct---id',id)

    app.wxRequest('product_category/'+id+'?pageSize='+pageSize+'&pageNumber='+that.data.pageNumber, {}, 'GET', that, function(res) {
      console.log('product',res)
      if ( res.data.data.products.length>0 ) {
        if ( pageNumber == 1 ) {
          that.data.productList = res.data.data.products
        } else {
          that.data.productList = that.data.productList.concat(res.data.data.products)
        }
        console.log('that.data.productList',that.data.productList)
        that.setData({
          productList: that.data.productList,
          isHot: false,
        })
      } else {
        that.setData({
          productList: [],
        })
      }
    })
  },
  // search页面搜索框,热搜词调用该方法判断；
  hotSearch: function(event) {
    console.log('----search---searchAgency---',event)
    /*wx.showToast({
      title:"加载中..",
      icon:"loading",
      duration:1000
    });*/
    var isHot = 'true'
    var orderBy = "true"
    var order = orderBy? 'orderBy':'orderByDesc'
    // 判断是点击热搜索关键词还是输入框输入搜索内容
    if(!event.detail.value){
      console.log('event.currentTarget.dataset.hitWord',event.currentTarget.dataset.hotWord)
      this.data.searchName = event.currentTarget.dataset.hotWord
    } else {
      this.data.searchName = event.detail.value
      console.log('event.detail.value',event.detail.value)
    }
    this.data.type = "name"
    var url = app.siteInfo.API_URL + 'product_search?name='+ this.data.searchName + '&pageNumber=1'
    this.data.totalSize = 10

    console.log(this.data.productList)
    this.getSearchData('name',url,isHot)
  },
  // 请求热搜关键词数据；
  getHot:function () {
    var that = this
    wx.request({
      url: app.siteInfo.API_URL + 'product_hit_word', //仅为示例，并非真实的接口地址
      header: {
        'access_token': app.globalData.token,
        'content-type': 'json'
      },
      success: function (res) {
        console.log('热搜关键词',res.data.data)
        wx.hideLoading()
        that.setData({
          hotWord: res.data.data,
          isHot: true,
        })
      }
    });
  },
  // 请求商品数据；
  getSearchData: function (type,url,isHot) {
    console.log('-----search----getSearchData----')
    console.log('getSearchData----url',url)
    console.log('isHot',isHot)
    var that = this
    console.log('getSearchData-----this.data.pageNumber',that.data.pageNumber)
    that.data.url = url
    that.data.type = type
    wx.request({
      // http://112.74.26.228:10080/rest/product_search?pageNumber=1&pageSize=20&name=abc&orderByDesc=view_count&orderBy=price&orderBy=sales
      url: app.siteInfo.API_URL+ url + '&pageNumber='+that.data.pageNumber,
      header: {
        'Authorization': app.globalData.access_token,
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log('getSearchData------------getSearchData----res',res)
        
        wx.hideLoading()
        console.log('isHot',isHot)
        var Data = res.data.data

        var productList = []
        console.log('追加之前',that.data.productList)
        if ( type == "id" ) {
          if ( Data.products.length <= that.data.totalSize ) {
            for ( var i=productList.length; i<Data.products.length; i++ ) {
              productList.push(Data.products[i])
            }
          }
        } else if ( type == "name" ) {
          console.log('name-------------res.data.data',res.data.data)
          if ( that.data.pageNumber == 1 ) {
            that.data.productList = res.data.data
          } else {
            console.log('that.data.pageNumber---',that.data.pageNumber)
            if ( res.data.data.length > 0 ) {
              that.data.productList = that.data.productList.concat(res.data.data)
            } else {
              wx.showToast({
                title: "没有更多了",
                icon: "none"
              })
            }
          }
          // if ( Data.length <= that.data.totalSize ) {
            //   for ( var i=productList.length; i<Data.length; i++ ) {
              //     productList.push(Data[i])
              //   }
              // }
            }
            // that.data.productList = productList
            console.log('追加之后',that.data.productList)
            that.setData({
              isHot: false,
              productList: that.data.productList
            })

        /*if (isHot == 'true') {
          console.log('isHot----true:',isHot)
          _this.setData({
            isHot: 'false',
            productList: _this.data.productList
          })
        } else {
          console.log('isHot----false:',isHot)
          var productList = _this.data.productList
          console.log('追加之前',_this.data.productList)
          var data = res.data.data
          if ( data.products.length <= _this.data.totalSize ) {
            for ( var i=productList.length; i<data.products.length; i++ ) {
              productList.push(data.products[i])
            }
          }
          _this.data.productList = productList
          console.log('追加之后',_this.data.productList)

          _this.setData({
            isHot: 'false',
            productList: _this.data.productList
          })
        }*/
      }
    });
  },
  // 跳转商品详情；
  productDetails: function(event) {
    var id = event.currentTarget.dataset.id
    console.log('productDetails---id',id)
    app.openPage('../product-details/product-details?id='+id)
  },
  /*
   * 生命周期函数--监听页面加载
   */ 
   onLoad: function (options) {
    console.log('-------search----onload------options',options)
    wx.showToast({
      title:"加载中..",
      icon:"loading",
      duration:1000
    });
    this.getHot()
    this.setData({
      // productList: this.data.productList,
      isHot: true,
      focus: this.data.focus
    })
    // this.getProduct(-1)

    // return
    // focus:判断进入改页面时输入框是否获取焦点；
    if (options.focus=='true') {
      this.data.focus = true
    } else {
      this.data.focus = false
    }
    if (options.isHot=='true') {
      this.getHot()
      this.setData({
        productList: this.data.productList,
        isHot: true,
        focus: this.data.focus
      })
    } else if (options.id) {
      console.log(options)
      var title = options.title
      var id = options.id
      var isHot = options.isHot
      this.data.type = 'id'
      var url = 'product_category/'+ id +'&pageSize='+ that.data.totalSize
      wx.setNavigationBarTitle({
        title: title
      })
      this.getSearchData('id',url,isHot)
    } else if ( options.cart ) {
      var url = 'product?zone=1&pageSize='+that.data.pageSize
      var isHot = true
      this.getSearchData('name',url,isHot)
      /*app.request('/product?pageNumber=1&pageSize=10&zone=1', {}, 'GET', function(res) {
        console.log('/product?pageNumber=1&pageSize=10&zone=1',res)
      })*/
    }
  },
  requestData: function () {
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
    // console.log('-----search-----onshow-----')
    // console.log(this.data.productList)
    // this.setData({
      //   productList: this.data.productList,
      //   isHot: 'false',
      // })
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
    var productList = this.data.productList
    var pageNumber = this.data.pageNumber
    var bigSize = pageNumber * pageSize

    console.log('productList.length',productList.length)
    console.log('bigSize',bigSize)
    console.log('pageNumber',pageNumber)
    console.log('onReachBottom----url',this.data.url)
    console.log('this.data.type',this.data.type)

    if ( pageNumber*pageSize == productList.length ) {
      this.data.pageNumber++
      console.log('onReachBottom---this.data.pageNumber',this.data.pageNumber)
      this.getSearchData( this.data.type ,this.data.url, 'false')
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
   onShareAppMessage: function () {

   }
 })