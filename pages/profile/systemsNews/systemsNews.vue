<template>
	<view>
		<block v-for="(item,index) in showData" :key='item.mesId'>
		<div class='newItem'> 
			<div class='newItem_l'>
				<div>
					<i class="iconfont icon-liuyan"></i>
				</div>
				<div>
					<div >{{item.type}}</div>
					<div class='newItem_l_lb'>{{item.content}}</div>
				</div>
			</div>
			<div class='newItem_r'>{{item.createTime}}</div>
		</div>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showData: []
			}
		},
		onShow() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.request({
				url: "https://user.job2020.cn/details/selectinfo",
				method:'GET',
				data:{
					openId: getApp().globalData.uid
				},
				success:(res)=> {
					console.log(res)
					this.showData = res.data.data
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.newItem{
		
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		height: 100rpx;
		width: 670rpx;
		margin: 20rpx auto 0;
		border-bottom: 2rpx solid #eeeeee;
	}
	.newItem_l{
		display: flex;
		align-items: center;
	}
	.newItem_l_lb{
		font-size: 24rpx;
		color: #C0C4CC;
		margin-top: 10rpx;
	}
	
	.newItem_r{
		font-size: 22rpx;
		color: #909399;
	}
	
	.icon-liuyan{
		display: inline;
		padding: 20rpx;
		background-color: #fdcf34;
		border-radius: 50%;
		color: #ffa200;
		font-weight: 600;
		margin-right: 10rpx;
		font-size: 36rpx;
	}
</style>
