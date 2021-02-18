<template>
	<view>
		<!-- 背景图begin -->
		<image src="https://pic.job2020.cn/scoreBack.png" class="backImg"></image>
		<!-- 签到部分gegin -->
		<div class="midBoxTop">
			<div>{{integral}}</div>
			<div><picker :range="integralType" :value="index" @change="onChangeType">
					{{integralType[integralTypeIndex]}}<i class="iconfont icon-xiangxia" style='display: inline;font-size: 20rpx;margin-left: 10rpx;'></i>
			</picker>
			</div>
		</div>
		<div class="midBox">
			<div class='midBoxTitle'>{{integralType[integralTypeIndex]}}</div>
			<block v-for="item in showData" :key='item.type'>
				<div class='integralItem'>
					<div>
						<div>{{item.type}}</div>
						<div>{{item.createTime}}</div>
					</div>
					<div >{{item.action}}</div>
				</div>
			</block>
			<div class='bottomText' @click='onRequestMore' v-if='requestMore'>下一页 ▼</div>
			<div class='bottomText'  v-if='!requestMore'>没有更多了</div>
		</div>
	</view>
</template>

<script>
	let page = 1
	let rows = 10
	export default {
		data() {
			return {
				integralType:['全部','支出','支入'],  
				integralTypeIndex: 0 ,
				showData: [],
				integral: '',
				requestMore: true
			}
		},
		onLoad(options) {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			this.integral = options.integral
			uni.request({
				url:'https://user.job2020.cn/money/selectBy',
				method: 'GET',
				data:{
					page: 1,
					rows: 10,
					action: this.integralType[this.integralTypeIndex],
					openId: getApp().globalData.uid
				},
				success: (res) => {
					this.showData = res.data.data.rows
					page ++
				}
				
			})
		},
		methods: {
			// 选择类型
			onChangeType(e){
				this.integralTypeIndex = e.detail.value
				this.requestMore = true
				uni.request({
						url:'https://user.job2020.cn/money/selectBy',
						method: 'GET',
						data:{
							page: 1,
							rows,
							openId: getApp().globalData.uid,
							action: this.integralType[this.integralTypeIndex]
						},
						success: (res) => {
							console.log(res)
							if(res.data.data.rows.length+1 < rows){
								this.requestMore = false
							}
							this.showData = res.data.data.rows
							
						}
						
					})
				
			},
			// 加载更多
			onRequestMore(){
					if(this.requestMore){
						uni.request({
							url:'https://user.job2020.cn/money/selectBy',
							method: 'GET',
							data:{
								page,
								rows,
								openId: getApp().globalData.uid,
								action: this.integralType[this.integralTypeIndex]
							},
							success: (res) => {
								console.log(res)
								if(res.data.data.rows.length+1 < rows){
									this.requestMore = false
								}
								this.showData = this.showData.concat(res.data.data.rows)
								 page ++
							}
							
						})
					}
				
			}
			
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
		border-radius: 20rpx;
		background-color: #FFFFFF;
		position: absolute;
		left: 40rpx;
		top: 170rpx;
		box-shadow: 0rpx 0rpx 20rpx #E5E5E5;
		margin-bottom: 50rpx;
	}
	.midBoxTitle{
		height: 70rpx;
		line-height: 80rpx;
		margin-left: 40rpx;
		/* text-align: center; */
	}
	.midBoxTitle span{
		color: #feb509;
		margin: 0rpx 40rpx 0rpx 5rpx;
	}
	.midBoxTitle span:nth-child(2){
		color: #909399;
	}
	.midBoxTop{
		width: 670rpx;
		position: absolute;
		left: 40rpx;
		top: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.midBoxTop div:nth-child(2){
		color: #FFFFFF;
		width: 130rpx;
		height: 40rpx;
		font-size: 22rpx;
		background-color: #4a8ec0;
		line-height: 40rpx;
		text-align: center;
		border-radius: 20rpx;
	}
	.midBoxTop div:first-child{
		color: #FFFFFF;
		font-size: 80rpx;
	}
	.integralItem{
		width: 590rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 150rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.integralItem:last-child{
		border-bottom: none;
		padding-bottom: 30rpx;
	}
	.integralItem div div:first-child{
		color: #606266;
	}
	.integralItem div div:nth-child(2){
		color: #C0C4CC;
		font-size: 22rpx;
		margin-top: 20rpx;
	}
	.integralItem div:nth-child(2){
		color: #feb509;
	}
	.bottomText{
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 24rpx;
		color: #C0C4CC;
	}
</style>
