// setTabBar(options) {
//     console.log('setTabBar',options)
//     // var _this = this
//     // var tabBarData = _this.data.tabBarData
//     // tabBarData = page.globalData.tabBarData
//     // tabBarData.width = 1/tabBarData.tabBarArr.length*100+"%"
//     // tabBarData.tabBarId = _this.data.tabBarId
//     // console.log('11111111',tabBarData)
//     // console.log('1/tabBarData.tabBarArr.length*100%',1/tabBarData.tabBarArr.length*100+"%")
//     // console.log('page.globalData.tabBarArr',page.globalData.tabBarData)
//     // _this.setData({
//     //   tabBarData: tabBarData
//     // })
// }

class TabBar {
    // data: {
    //     tabBarData: {
    //         width: "50%",
    //         selectedId: 0,
    //         tabBarArr: []
    //     }
    // }
    constructor(options) {
        console.log('CLASS----TabBar',options)
    }
    // clickSwiper: function(options) {
    //     console.log("app.js-----clickSwiper---options",options)  
    // }

}
module.exports = TabBar;


// toTabBar: function(options) {
//     console.log('app.js----toTabBar---options',options)

//     var selectedId = options.currentTarget.dataset.selectedId
//     var tabBarId = options.currentTarget.dataset.tabBarId
//     var tabBarUrl = options.currentTarget.dataset.tabBarUrl

//     if ( tabBarId == 2 ) {
//       wx.makePhoneCall({
//         phoneNumber: '13688888888'
//       })
//     } else if ( tabBarId == 3 ) {
//       this.openLocation()
//     } else if( selectedId != tabBarId & tabBarId == 1 || tabBarId == 4  & selectedId != tabBarId ) {
//       this.globalData.selectedId = tabBarId
//       wx.navigateTo({
//         url: tabBarUrl
//       })
//     }
//   },
//   
//   
//   
//   
    // tabBarData: {
    //   tabBarId: 1,
    //   width: "50%",
    //   tabBarArr: [
    //     {
    //       id:1,
    //       text: "店铺",
    //       pagePath: "../store/store",
    //       iconPath: "../../images/tabBar/index.png",
    //       selectedIconPath: "../../images/tabBar/sel-index.png"
    //     },
    //     {
    //       id: 2,
    //       pagePath: "../page2/page2",
    //       text: "电话",
    //       iconPath: "../../images/tabBar/phone.png",
    //       selectedIconPath: "../../images/tabBar/sel-phone.png"
    //     }, {
    //       id: 3,
    //       pagePath: "../switchPage/switchPage",
    //       text: "导航",
    //       iconPath: "../../images/tabBar/address.png",
    //       selectedIconPath: "../../images/tabBar/sel-address.png"
    //     },
    //     {
    //       id: 4,
    //       pagePath: "../personal/personal",
    //       text: "我的",
    //       iconPath: "../../images/tabBar/my.png",
    //       selectedIconPath: "../../images/tabBar/sel-my.png"
    //     }
    //   ]
    // },
    // 
 

 //##子页面  
 //
 //data:{
 //     tabBarId: 1,
        // tabBarData: {
        //   width: "",
        //   tabBarId: 1,
        //   tabBarArr: []
        // },
 //
 //}