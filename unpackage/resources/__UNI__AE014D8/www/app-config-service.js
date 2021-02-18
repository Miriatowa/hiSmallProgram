
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/mentor/mentor/mentor","pages/home/index/index","pages/merchants/merchants/merchants","pages/profile/index/index","pages/mentor/questionnaire/questionnaire","pages/mentor/questionnaire/luckDraw","pages/mentor/schoolList/schoolList","pages/mentor/schoolList/rudes","pages/profile/feedback/feedback","pages/profile/personalPage/personalPage","pages/profile/personalPage/editPersonal","pages/profile/personalPage/addTags","pages/home/registered/identityChoice/identityChoice","pages/home/registered/perfectInformationOne/perfectInformationOne","pages/home/registered/perfectInformationTwo/perfectInformationTwo","pages/home/registered/perfectInformationThree/perfectInformationThree","pages/merchants/merchants/merchantsInfo/merchantsInfo","pages/merchants/merchants/merchantsInfo/merchantsComment","pages/mentor/mentorDetail/mentorDetail","pages/profile/invitateNew/invitateNew","pages/profile/invitateNew/invitateRules","pages/merchants/addMerchants/addMerchants","pages/profile/buyCredits/buyCredits","pages/profile/purchaseVip/purchaseVip","pages/profile/mySocial/mySocial","pages/profile/myMentor/myMentor","pages/profile/signIn/signIn","pages/profile/integralSubsidiary/integralSubsidiary","pages/profile/myCollection/myCollection","pages/home/index/toReport","pages/home/index/loveWall/loveWall","pages/home/index/loveWall/publishLoveWall","pages/mentor/announcement/announcement","pages/mentor/announcement/announcementDetail","pages/mentor/announcement/activityOne/activityOne","pages/mentor/announcement/activityOne/colRules","pages/home/index/interestCircle/interestCircle","pages/home/index/interestCircle/publishInterest","pages/merchants/merchants/merchantsInfo/voteDetail","pages/profile/systemsNews/systemsNews","pages/mentor/businessReview/businessReview","pages/mentor/businessReview/editReview","pages/mentor/businessReview/addBusiness","pages/mentor/announcement/activityOne/answerQuestions","pages/mentor/announcement/activityTwo/activityTwo","pages/mentor/announcement/activityThree/activityThree"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"Hi情报局","navigationBarBackgroundColor":"#44a1ff","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#7A7E83","selectedColor":"#44a1ff","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/mentor/mentor/mentor","iconPath":"static/fonts/tabbar/company.png","selectedIconPath":"static/fonts/tabbar/company-sel.png","text":"就业"},{"pagePath":"pages/home/index/index","iconPath":"static/fonts/tabbar/index.png","selectedIconPath":"static/fonts/tabbar/index-sel.png","text":"社交"},{"pagePath":"pages/merchants/merchants/merchants","iconPath":"static/fonts/tabbar/shop.png","selectedIconPath":"static/fonts/tabbar/shop-sel.png","text":"周边"},{"pagePath":"pages/profile/index/index","iconPath":"static/fonts/tabbar/personal.png","selectedIconPath":"static/fonts/tabbar/personal-sel.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"大学生应聘","compilerVersion":"3.0.7","entryPagePath":"pages/mentor/mentor/mentor","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/mentor/mentor/mentor","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"就业","onReachBottomDistance":50}},{"path":"/pages/home/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"社交"}},{"path":"/pages/merchants/merchants/merchants","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"周边","onReachBottomDistance":50}},{"path":"/pages/profile/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人"}},{"path":"/pages/mentor/questionnaire/questionnaire","meta":{},"window":{"navigationBarTitleText":"调查问卷","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFFFF","enablePullDownRefresh":false}},{"path":"/pages/mentor/questionnaire/luckDraw","meta":{},"window":{"navigationBarTitleText":"积分抽奖","enablePullDownRefresh":false}},{"path":"/pages/mentor/schoolList/schoolList","meta":{},"window":{"navigationBarTitleText":"排行榜","enablePullDownRefresh":false}},{"path":"/pages/mentor/schoolList/rudes","meta":{},"window":{"navigationBarTitleText":"排行规则","enablePullDownRefresh":false}},{"path":"/pages/profile/feedback/feedback","meta":{},"window":{"navigationBarTitleText":"帮助与反馈","enablePullDownRefresh":false}},{"path":"/pages/profile/personalPage/personalPage","meta":{},"window":{"navigationBarTitleText":"个人主页","navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/profile/personalPage/editPersonal","meta":{},"window":{"navigationBarTitleText":"编辑资料","enablePullDownRefresh":false}},{"path":"/pages/profile/personalPage/addTags","meta":{},"window":{"navigationBarTitleText":"添加标签","enablePullDownRefresh":false}},{"path":"/pages/home/registered/identityChoice/identityChoice","meta":{},"window":{"navigationBarTitleText":"邀请码","enablePullDownRefresh":false}},{"path":"/pages/home/registered/perfectInformationOne/perfectInformationOne","meta":{},"window":{"navigationBarTitleText":"完善资料（1/3）","enablePullDownRefresh":false}},{"path":"/pages/home/registered/perfectInformationTwo/perfectInformationTwo","meta":{},"window":{"navigationBarTitleText":"完善资料 （2/3）","enablePullDownRefresh":false}},{"path":"/pages/home/registered/perfectInformationThree/perfectInformationThree","meta":{},"window":{"navigationBarTitleText":"完善资料 （3/3）","enablePullDownRefresh":false}},{"path":"/pages/merchants/merchants/merchantsInfo/merchantsInfo","meta":{},"window":{"navigationBarTitleText":"商家详情","enablePullDownRefresh":false}},{"path":"/pages/merchants/merchants/merchantsInfo/merchantsComment","meta":{},"window":{"navigationBarTitleText":"评论","enablePullDownRefresh":false}},{"path":"/pages/mentor/mentorDetail/mentorDetail","meta":{},"window":{"navigationBarTitleText":"导师详情","enablePullDownRefresh":false}},{"path":"/pages/profile/invitateNew/invitateNew","meta":{},"window":{"navigationBarTitleText":"邀请有奖","enablePullDownRefresh":false}},{"path":"/pages/profile/invitateNew/invitateRules","meta":{},"window":{"navigationBarTitleText":"奖励规则","enablePullDownRefresh":false}},{"path":"/pages/merchants/addMerchants/addMerchants","meta":{},"window":{"navigationBarTitleText":"添加商户","enablePullDownRefresh":false}},{"path":"/pages/profile/buyCredits/buyCredits","meta":{},"window":{"navigationBarTitleText":"充值","enablePullDownRefresh":false}},{"path":"/pages/profile/purchaseVip/purchaseVip","meta":{},"window":{"navigationBarTitleText":"会员特权","enablePullDownRefresh":false}},{"path":"/pages/profile/mySocial/mySocial","meta":{},"window":{"navigationBarTitleText":"我的招呼","enablePullDownRefresh":false}},{"path":"/pages/profile/myMentor/myMentor","meta":{},"window":{"navigationBarTitleText":"我的导师","enablePullDownRefresh":false}},{"path":"/pages/profile/signIn/signIn","meta":{},"window":{"navigationBarTitleText":"积分签到","enablePullDownRefresh":false}},{"path":"/pages/profile/integralSubsidiary/integralSubsidiary","meta":{},"window":{"navigationBarTitleText":"积分明细","enablePullDownRefresh":false}},{"path":"/pages/profile/myCollection/myCollection","meta":{},"window":{"navigationBarTitleText":"我的收藏","enablePullDownRefresh":false}},{"path":"/pages/home/index/toReport","meta":{},"window":{"navigationBarTitleText":"举报","enablePullDownRefresh":false}},{"path":"/pages/home/index/loveWall/loveWall","meta":{},"window":{"navigationBarTitleText":"表白墙","navigationBarBackgroundColor":"#FFFFFF","enablePullDownRefresh":false}},{"path":"/pages/home/index/loveWall/publishLoveWall","meta":{},"window":{"navigationBarTitleText":"发布表白","navigationBarBackgroundColor":"#FFFFFF","enablePullDownRefresh":false}},{"path":"/pages/mentor/announcement/announcement","meta":{},"window":{"navigationBarTitleText":"公告","enablePullDownRefresh":false}},{"path":"/pages/mentor/announcement/announcementDetail","meta":{},"window":{"navigationBarTitleText":"活动详情","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/mentor/announcement/activityOne/activityOne","meta":{},"window":{"navigationBarTitleText":"集卡领现金","navigationBarBackgroundColor":"#FFFFFF","enablePullDownRefresh":false}},{"path":"/pages/mentor/announcement/activityOne/colRules","meta":{},"window":{"navigationBarTitleText":"活动规则","enablePullDownRefresh":false}},{"path":"/pages/home/index/interestCircle/interestCircle","meta":{},"window":{"navigationBarTitleText":"兴趣圈","navigationBarBackgroundColor":"#f3f4f8","enablePullDownRefresh":false}},{"path":"/pages/home/index/interestCircle/publishInterest","meta":{},"window":{"navigationBarTitleText":"创建圈子","navigationBarBackgroundColor":"#f3f4f8","enablePullDownRefresh":false}},{"path":"/pages/merchants/merchants/merchantsInfo/voteDetail","meta":{},"window":{"navigationBarTitleText":"投票","enablePullDownRefresh":false}},{"path":"/pages/profile/systemsNews/systemsNews","meta":{},"window":{"navigationBarTitleText":"消息","navigationBarBackgroundColor":"#ffffff","enablePullDownRefresh":false}},{"path":"/pages/mentor/businessReview/businessReview","meta":{},"window":{"navigationBarTitleText":"企业评论","enablePullDownRefresh":false}},{"path":"/pages/mentor/businessReview/editReview","meta":{},"window":{"navigationBarTitleText":"企业详情","enablePullDownRefresh":false}},{"path":"/pages/mentor/businessReview/addBusiness","meta":{},"window":{"navigationBarTitleText":"添加企业","enablePullDownRefresh":false}},{"path":"/pages/mentor/announcement/activityOne/answerQuestions","meta":{},"window":{"navigationBarTitleText":"答题","navigationBarBackgroundColor":"#FFFFFF","enablePullDownRefresh":false}},{"path":"/pages/mentor/announcement/activityTwo/activityTwo","meta":{},"window":{"navigationBarTitleText":"新年签","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/mentor/announcement/activityThree/activityThree","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
