<template>
	<view class="main">
		<div class="headBack">
			<image src="https://pic.job2020.cn/%E9%82%80%E8%AF%B7%E6%9C%89%E5%A5%96.png" mode="widthFix" class="backImg"></image>
			<!-- <icon class="iconfont icon-xiangzuo" @click="onBack"></icon> -->
			<!-- 通告栏begin -->
			<div class='slidingNotice'>
				<div class="marquee">
					<image src='https://pic.job2020.cn/Hi%E6%8A%A5.png'  class="marquee_title"></image>
					<div class="marquee_box">
						<div  :class="{marquee_divst: true,marquee_top:animate}">
							<div v-for="(item,index) in marqueedivst" :key='index'><span>●</span>{{item.scroll}}</div>
						</div>
					</div>
					<div>
						<slot name="marquee_right">
							<image src='https://pic.job2020.cn/%E9%9B%86%E5%8D%A1_1.png' class="slide_img" @click='toDraw' mode="aspectFit"></image>
						</slot>
					</div>
				</div>
			</div>
			
			<!-- 通告栏end -->
		</div>
		<div >
			<div class='invitateBottom'>
				<div  class="myInvitate">
					<div>邀请码：<span>{{inviteCode.random}}<icon class="iconfont icon-fuzhi" @click="onCopy"></icon></span></div>
					<div @click='inviteRule'>奖励规则<i class="iconfont icon-xiangyou1"></i></div>
				</div>
				<block v-for="(item,index) in inviteCode.list" :key='index' v-if="index < 10">
					<div class='invitatePeopleItem'>
						<div class='i_left'>
							<image :src='item.head'></image>
							<div>{{item.nickName}}</div>
						</div>
						
						<div class='i_right'>已邀请</div>
					</div>
				</block>
				<button open-type="share" class="invitateBtn" @click='onInvitate'>马上邀请</button>
				<div style='height: 100rpx;'></div>
			</div>
		</div>
		
	</view>
</template>

<script>
	import slidingNotice from '../../../components/slidingNotice.vue'
	export default {
		data() {
			return {
				backHeight: null ,  //背景图高度
				inviteCode: '',
				url: 'https://user.job2020.cn/details/intscrollbar',
				marqueedivst: [],
				animate: false
			}
		},
		components:{slidingNotice},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.showShareMenu({
			     menus: ['shareAppMessage', 'shareTimeline'],
			     success(res) {
			       console.log(res)
			     },
			     fail(e) {
			       console.log(e)
			     }
			})
			uni.request({
				url:'https://user.job2020.cn/details/code',
				method: 'GET',
				data:{
					openId: getApp().globalData.uid
				},
				success: (res) => {
					console.log(res)
					this.inviteCode = res.data.data
				}
			})
			uni.request({
				url: this.url,
				method:'GET',
				success: (res) => {
					console.log(res.data)
					this.marqueedivst = res.data
					setInterval(this.showMarquee, 2000);
				}
			})
		},
		onShareAppMessage(res) {
		    return {
		      title: '一个专属于大学生的小程序，进来即可获得现金好礼',
			  imageUrl: 'https://pic.job2020.cn/%E5%88%86%E4%BA%AB_1.png',
		      path: 'pages/mentor/mentor/mentor'
		    }
		  },
		methods: {
			// 跳转到集卡
			toDraw(){
				uni.navigateTo({
					url: '../../mentor/announcement/activityOne/activityOne'
				})
			},
			showMarquee() {
				this.animate = true;
				setTimeout(() => {
					this.marqueedivst.push(this.marqueedivst[0]);
					this.marqueedivst.shift();
					this.animate = false;
				}, 1000);
			},
			// 返回上一页
			onBack(){
				uni.navigateBack({
					delta:1
				})
			},
			// 复制邀请码
			onCopy(){
				uni.setClipboardData({
				    data: this.inviteCode.toString(),
				    success:  (res)=> {
				        uni.showToast({
				        	title: '复制成功',
							icon: 'success'
				        })
				    }
				});
			},
			// 邀请规则
			inviteRule(){
				uni.navigateTo({
					url:'./invitateRules'
				})
			},
			// 邀请他人
			onInvitate(){
				
			}
		}
	}
</script>

<style scoped>
	.main{
		background-color: #fef2d8;
		min-height: 100vh;
	}
	.backImg{
		width: 100%;
		border-bottom: 10rpx solid #FFFFFF;
		position: relative;
	}
	.slidingNotice{
		position: absolute;
		left: 40rpx;
		top: 10rpx;
	}
	.icon-xiangzuo{
		color: #000000;
		font-size: 40rpx;
		font-weight: 600;
		position: fixed;
		left: 40rpx;
		top: var(--status-bar-height);
	}
	.invitateBottom{
		width: 670rpx;
		margin: 0 auto;
	}
	.myInvitate{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;
		margin-bottom: 5vh;
	}
	.myInvitate div{
		color: #606266;
	}
	.myInvitate div:nth-child(2){
		color: #909399;
	}
	.myInvitate div span{
		font-size: 24rpx;
		color: #C0C4CC;
	}
	.myInvitate div i{
		display: inline;
		font-size: 28rpx;
	}
	.invitatePeopleItem{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 22rpx;
		height: 100rpx;
	}
	.i_left{
		display: flex;
	}
	.i_left image{
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-right: 50rpx;
	}
	.invitateBtn{
		margin-top: 50rpx;
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background-color: #87adeb;
		color: #fef2d8;
		border-radius: 14rpx;
	}
	.i_right{
		margin-left: 300rpx;
		color: #C0C4CC;
	}
	.icon-fuzhi{
		margin-left: 10rpx;
	}
	.marquee {
		width: 670rpx;
		margin: 30rpx auto 0;
		height: 80rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		overflow: hidden;
	}
	
	.marquee_title {
		width: 100rpx;
		height: 100rpx
	}
	.icon-gonggao{
		margin-right: 4rpx;
	}
	.marquee_box {
		position: relative;
		flex: 1;
	}
	
	.marquee_divst {
		position: absolute;
		top: -40rpx;
		left: 0;
	}
	
	.marquee_top {
		transition: all .5s;
		margin-top: -40rpx;
	}
	
	.marquee_divst div {
		display: flex;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 22rpx;
		padding-left: 40rpx;
		color: #eaf0f6;
	}
	.marquee_divst div span{
		font-size: 20rpx;
		color: #ffffff;
		margin-right: 10rpx;
	}
	.slide_img{
		width: 100rpx;
		height: 100rpx;
	}
</style>
