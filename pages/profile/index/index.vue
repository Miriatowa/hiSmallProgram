<template>
	<view>
		<!-- 个人中心头部begin -->
		<div class='headBackground'>
			<div class="personalCard">
				<div class="card_top">
					<div  >
						<image :src='showData.head' class="card_tl" ></image>
					</div>
					
					<div class="card_tr">
						<div class="card_mes">
							<div class="nickname">
								<span>{{showData.nickName}}</span>
								<vipIcon :state='showData.memberstate'></vipIcon>
							</div>
							<div class="myResume"  >
								<div @click='toSignIn'><span>签到送积分</span><icon class="iconfont icon-xiangyou" style="font-size: 20rpx;margin-top: -10rpx;"></icon></div>
								<image src='https://pic.job2020.cn/%E5%BC%80%E7%AE%B1%E5%AD%90_7.png' @click="toChest"></image>
							</div>
						</div>
						<div class='newMes' @click='tosystemNews'>
							<icon class="iconfont icon-liuyan" style="font-size: 50rpx;margin-right: 20rpx;"></icon>
							<!-- <icon class="iconfont icon-shezhi" style="font-size: 50rpx;margin-left: 10rpx;"></icon> -->
						</div>
						
					</div>
				</div>
				<div class="card_bottom">
					<div @click="tointelgralDetail">
						<div>{{showData.integral}}</div>
						<div class='vipBox' >我的积分</i></div>
					</div>
					<div @click="toPurchaseVip">
						<div>VIP会员</div>
						<div class='vipBox' >解锁会员</div>
					</div>
					<div >
						<div @click='toBuyCredits'>充值</div>
						<div class='vipBox' @click='toDraw'>积分抽奖</div>
					</div>
					</div>
				</div>
		
			</div>
		</div>
		<!-- 个人中心头部end -->
		
		
		<!-- 邀请新用户begin -->
		<div class="jobHelp">
			<image src="https://pic.job2020.cn/%E9%82%80%E8%AF%B7%E5%A5%BD%E5%8F%8B-%E8%83%B6%E5%9B%8A.png" mode="widthFix" class="inviteImg" @click="onInvitation"></image>
		</div>
		<!-- 求职助手end -->
		
		<!-- 其它选项begin -->
			<div class="other">
				<navigator  url="../personalPage/personalPage?identity=1" hover-class="none"><icon class="iconfont icon-zhuye fontStyle r"><span>社交主页</span></icon><icon class="iconfont icon-iconfonti fontStyle"></icon></navigator>
				<navigator url="../mySocial/mySocial" hover-class="none"><icon class="iconfont icon-liuyan fontStyle "><span>我的招呼</span></icon><icon class="iconfont icon-iconfonti fontStyle"></icon></navigator>
				<navigator url="../myCollection/myCollection" hover-class="none"><icon class="iconfont icon-shoucang fontStyle "><span>周边收藏</span></icon><icon class="iconfont icon-iconfonti fontStyle"></icon></navigator>
				<navigator url="../myMentor/myMentor" hover-class="none"><icon class="iconfont icon-laoshiguanli fontStyle "><span>我的导师</span></icon><icon class="iconfont icon-iconfonti fontStyle"></icon></navigator>
				<navigator url="../feedback/feedback" hover-class="none"><icon class="iconfont icon-fankui1 fontStyle "><span>帮助与反馈</span></icon><icon class="iconfont icon-iconfonti fontStyle"></icon></navigator>
			</div>
		<!-- 其它选项end -->
		
		
	</view>
</template>

<script>
	import vipIcon from '../../../components/vipIcon.vue'
	export default {
		data() {
			return {
				showData: {},
			}
		},
		components:{
			vipIcon,
		},
		onShow() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			if(getApp().globalData.uid){
				uni.request({
					url:'https://user.job2020.cn/details/my',
					method: 'GET',
					data:{
						openId: getApp().globalData.uid
					},
					success: (res) => {
						console.log(res)
						this.showData = res.data.data
						
					}
				})
			}else{
				uni.showModal({
				    title: '温馨提示',
				    content: '亲，本产品需登录方可使用...',
					showCancel: false,
					confirmText: '前往登录',
					confirmColor:'#44a1ff',
				    success: (res) => {
				        if (res.confirm) {
				           uni.navigateTo({
				           	url:'/pages/home/registered/identityChoice/identityChoice'
				           })
				        } 
				    }
				})
			}
			
		},
		methods: {
			toChest(){
				uni.navigateTo({
					url:'../../mentor/announcement/activityThree/activityThree'
				})
			},
			toDraw(){
				uni.navigateTo({
					url:'../../mentor/questionnaire/luckDraw'
				})
			},
			// 系统消息
			tosystemNews(){
				uni.navigateTo({
					url:'../systemsNews/systemsNews'
				})
			},
			// 邀请新用户
			onInvitation(){
				uni.navigateTo({
					url:'../invitateNew/invitateNew'
				})
			},
			// 充值积分
			toBuyCredits(){
				uni.navigateTo({
					url:`../buyCredits/buyCredits?integral=${this.showData.integral}`
				})
			},
			toPurchaseVip(){
				uni.navigateTo({
					url:'../purchaseVip/purchaseVip'
				})
			},
			toSignIn(){
				uni.navigateTo({
					url: '../signIn/signIn'
				})
			},
			// 积分详情
			tointelgralDetail(){
				uni.navigateTo({
					url: '../signIn/signIn'
				})
			},
		}
	}
</script>

<style>
	.headBackground{
		height: 300rpx;
		width: 100%;
		background-color: #44a1ff;
		border-radius: 0rpx 0rpx 150rpx 150rpx;
		position: relative;
	}
	.personalCard{
		width: 670rpx;
		height: 360rpx;
		margin: 25rpx auto 0;
		border-radius: 10rpx;
		position: absolute;
		background-color: #FFFFFF;
		border: 2rpx solid #F8F8F8;
		box-shadow: -4rpx -4rpx 3rpx #F8F8F8 inset;
		left: 40rpx;
		top: 0;
		z-index: 999;
	}
	.card_top{
		display: flex;
		margin-top: 50rpx;
	}
	.card_tl{
		height: 120rpx;
		width: 120rpx;
		border-radius: 50%;
		margin-left: 20rpx;
		border: 2rpx solid #F8F8F8;
	}
	.card_bottom{
		display: flex;
		width: 100%;
		height: 56rpx;
		line-height: 56rpx;
		margin: 50rpx 20rpx 0rpx 50rpx;
	}
	.card_bottom div{
		width: 220rpx;
	}
	.vipBox{
		height: 32rpx;
		font-size: 24rpx;
		color: #999999;
		display: flex;
	}
	
	.card_mes{
		margin-left: 20rpx;
	}
	.nickname{
		font-size: 36rpx;
		margin-top: 10rpx;
		display: flex;
		align-items: center;
	}
	.myResume{
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.myResume div{
		font-size: 24rpx;
		color: #FFFFFF;
		width: 180rpx;
		height: 50rpx;
		line-height: 50rpx;
		background-color: #ff9470;
		text-align: center;
		border-radius: 25rpx;
		margin-top: 10rpx;
	}
	.myResume image{
		width: 60rpx;
		height: 60rpx;
		margin-left: 25rpx;
	}
	.card_tr{
		display: flex;
		width: 100%;
		justify-content: flex-end;
	}
	.newMes{
		flex: 1;
		text-align: right;
		margin-right: 20rpx;
	}
	.inviteImg{
		width: 100%;
		/* margin: 0 auto; */
	}
	.jobHelp{
		width: 670rpx;
		margin: 90rpx auto 0rpx;
	}

	.other{
		width: 670rpx ;
		margin: 0 auto;
	}
	.other navigator{
		height: 90rpx;
		line-height: 90rpx;
		display: flex;
		justify-content: space-between;
	}
	.other navigator icon span{
		margin-left: 20rpx ;
		font-size: 24rpx;
		font-weight: 300;
	}
	.fontStyle{
		font-size: 40rpx;
		font-weight: 500;
		
	}
</style>
