<template>
	<view>
		<!-- 背景图begin -->
		<image src="https://pic.job2020.cn/scoreBack.png" class="backImg"></image>
		<!-- 签到部分gegin -->
		<div class="midBox">
			<div class="midBoxTop">
				<image :src="showData.user.head" class="avatarImg"></image>
				<div class="integralIcon"><image src="https://pic.job2020.cn/%E8%B5%84%E6%BA%90%201.png" ></image>{{showData.user.integral}}</div>
				<div class='integralDetail' @click='toCreditDetail'>积分明细<icon class="iconfont icon-xiangyou1"></icon></div>
			</div>
			
			<div class="flexBox">
				<block v-for="(item,index) in integralNum" :key='item' >
					<div class='signInItem' >
						<div  :class="showData.signinVo.completeNumber  > index ? 'hasSign' : 'noSign'  ">+{{item}}</div>
						<div>第{{index+1}}天</div>
					</div>
				</block>
			</div>
			<div class="signBtn" @click='onSignIn' v-if='!showData.signinVo.signstate'>签到</div>
			<div class="hasSignBtn" v-if='showData.signinVo.signstate'>今日已签</div>
		</div>
		
		<!-- 积分任务begin -->
		<div class='task'>
			<div class='taskRitle'>积分任务</div>
			<div>
				<block v-for="(item,index) in showData.list1" :key='item.intId'>
					<div class="taskItem">
						<div class="taskItemLeft">
							<image :src="item.icon"></image>
							<div>
								<div class='taskItem_l_r_t'>
									<span>{{item.integralName}}</span>
									<div><image src="https://pic.job2020.cn/%E8%B5%84%E6%BA%90%201.png" ></image>+{{item.integral}}</div>
								</div>
								<div class="taskItem_l_r_b">完成{{item.completeNumber}}/{{item.largestNumber}}</div>
							</div>
						</div>
						<button class='toCompleteBtn' @click='toFinish(index)' v-if='index !== 1' :disabled="item.completeNumber === item.largestNumber ? true : false" >去完成</button>
						<button class='toCompleteBtn' open-type="share" :disabled="item.completeNumber === item.largestNumber ? true : false" @click='onShare' v-if='index === 1'>分享</button>
					</div>
				</block>
			</div>
		</div>
		<div class='invitate'>
			<div class='taskRitle'>邀请有奖</div>
			<div>
				<div class="taskItem">
					<div class="taskItemLeft">
						<image :src="showData.inviteNewUsers.icon"></image>
						<div>
							<div class='taskItem_l_r_t'>
								<span>{{showData.inviteNewUsers.integralName}}</span>
								<div><image src="https://pic.job2020.cn/%E8%B5%84%E6%BA%90%201.png" ></image>+{{showData.inviteNewUsers.integral}}</div>
							</div>
							<div class="taskItem_l_r_b">完成{{showData.inviteNewUsers.completeNumber}}/不限次数</div>
						</div>
					</div>
					<div class='toCompleteBtn' @click='toInvitate'>去完成</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				integralNum:[1,1,2,3,4,5,5],  //积分数据
				isSign: false,
				showData: [],
			}
		},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.request({
				url:'https://user.job2020.cn/money/all',
				method:'GET',
				data:{
					openId: getApp().globalData.uid
				},
				success: (res) => {
					console.log(res)
					this.showData = res.data
				}
			})
		},
		methods: {
			// 签到
			onSignIn(){
				uni.request({
					url:'https://user.job2020.cn/money/signin',
					method:'GET',
					data:{
						openId:getApp().globalData.uid,
						intId: this.showData.signinVo.intId
					}, 
					success: (res) => {
						uni.redirectTo({
							url:'/pages/profile/signIn/signIn'
						})
					}
				})
			},
			// 积分明细
			toCreditDetail(){
				uni.navigateTo({
					url:`../integralSubsidiary/integralSubsidiary?integral=${this.showData.user.integral}`
				})
			},
			onShare(){
				uni.request({
					url:'https://user.job2020.cn/money/share',
					method: 'GET',
					data:{
						openId: getApp().globalData.uid
					},
					success: (res) =>{
						console.log(res.data.data.state)
						if(res.data.data.state === 1){
							uni.showToast({
								title:'分享成功',
								icon:'success'
							})
						}
					}
				})
				
			},
			// 去完成
			toFinish(idx){
				let url = ''
				console.log(idx)
				switch(idx){
					case 0:
						url = '../../merchants/merchants/merchants';
						break;
					case 2:
						url = '../../home/index/index';
						break;
					case 5:
						url = '../../merchants/merchants/merchants';
						break;
					case 6:
						url = '../../mentor/mentor/mentor';
						break;
					case 7:
						url = '../../mentor/mentor/mentor'
						break;
					case 8:
						url = '../../merchants/merchants/merchants';
						break;
				}
				uni.switchTab({
					url,
				})
			},
			
			
			
			
			// 上传相册
			toUploadImage(){
				uni.navigateTo({
					url: '../personalPage/personalPage?identity=1'
				})
			},
			// 邀请新用户
			toInvitate(){
				uni.navigateTo({
					url:'../invitateNew/invitateNew'
				})
			},
			
		}
	}
</script>

<style scoped>
	.backImg{
		width: 100%;
		height: 250rpx;
		position: relative;
	}
	.midBox{
		width: 670rpx;
		height: 470rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		position: absolute;
		left: 40rpx;
		top: 150rpx;
		box-shadow: 0rpx 0rpx 20rpx #E5E5E5;
	}
	.midBoxTop{
		margin-left: 280rpx;
	}
	.avatarImg{
		width: 110rpx;
		height: 110rpx;
		border-radius: 50%;
		margin-top: -55rpx;
	}
	.integralIcon{
		color: #feb400;
		font-size: 46rpx;
	}
	.integralIcon image{
		width: 32rpx;
		height: 32rpx;
	}
	.integralDetail{
		font-size: 24rpx;
		color: #909399;
	}
	.icon-xiangyou1{
		font-size: 22rpx;
		margin-left: 6rpx;
		color: #909399;
	}
	.flexBox{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.hasSign{
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		border: 2rpx solid #EEEEEE;
		text-align: center;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #ffffff;
		margin-top: 50rpx;
		background-color: #44a1ff;
	}
	.noSign{
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		border: 2rpx solid #EEEEEE;
		text-align: center;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #909399;
		margin-top: 50rpx;
	}
	.signInItem div:nth-child(2){
		font-size: 20rpx;
		color: #606266;
		text-align: center;
		margin-top: 10rpx;
	}
	.signBtn{
		width: 560rpx;
		margin: 40rpx auto 0;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #44A1FF;
		border-radius: 40rpx;
		text-align: center;
		color: #FFFFFF;
	}
	.hasSignBtn{
		width: 560rpx;
		margin: 40rpx auto 0;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #d9d9d8;
		border-radius: 40rpx;
		text-align: center;
		color: #FFFFFF;
	}
	
	.task{
		width: 670rpx;
		margin: 420rpx auto 0;
	}
	.invitate{
		width: 670rpx;
		margin: 50rpx auto 50rpx;
	}
	.taskRitle{
		margin-bottom: 50rpx;
		color: #303133;
		font-weight: 600;
	}
	.taskItem{
		display: flex;
		height: 188rpx;
		border-radius: 20rpx;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 0 10rpx #EEEEEE;
		margin-top: 10rpx;
	}
	.taskItemLeft{
		display: flex;
		align-items: center;
	}
	.taskItemLeft image{
		width: 72rpx;
		height: 72rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}
	.taskItem_l_r_t{
		display: flex;
		color: #303133;
	}
	.taskItem_l_r_t div{
		display: flex;
		align-items: center;
		font-size: 22rpx;
		color: #feb400;
		margin-left: 10rpx;
	}
	.taskItem_l_r_t div image{
		width: 30rpx;
		height: 30rpx;
	}
	.taskItem_l_r_b{
		font-size: 24rpx;
		color: #909399;
		margin-top: 10rpx;
	}
	.toCompleteBtn{
		height: 60rpx;
		width: 145rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 36rpx;
		border: 2rpx solid  #44A1FF;
		font-size: 28rpx;
		color: #44A1FF;
		margin-right: 10rpx;
		background-color: #ffffff;
	}
</style>
