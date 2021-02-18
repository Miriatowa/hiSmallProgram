<template>
	<view>
		<!-- <div class='header'>
			<search></search>
		</div> -->
		<div class='container_1' @click='toDetail'>
			<div class='cardTop'>
				<icon class="iconfont icon-gonggao"></icon>hi情报局新春给您送福利啦
			</div>
			<div class='cardBottom'>
				<icon class="iconfont icon-liulan"></icon>阅读1w+
			</div>
		</div>
		<div class='container_2' @click='toActivityOne'>
			<div class='cardTop'>
				<icon class="iconfont icon-gonggao"></icon>hi情报局新春给您送福利啦
			</div>
			<div class='cardBottom'>
				<icon class="iconfont icon-liulan"></icon>阅读1w+
			</div>
		</div>
	</view>
</template>

<script>
	import search from '../../../components/uni-search-bar/uni-search-bar.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{search},
		methods: {
			toDetail(){
				uni.navigateTo({
					url:'./announcementDetail'
				})
			},
			// 跳转到活动一
			toActivityOne(){
				console.log('1111')
				uni.navigateTo({
					url:'./activityOne/activityOne'
				})
			}
		}
	}
</script>

<style scoped>
	.container_1{
		width: 670rpx;
		margin: 20rpx auto 0rpx;
		height: 340rpx;
		background-image: url('https://pic.job2020.cn/%E6%B4%BB%E5%8A%A8_2.png');
		background-position: left top;  
		background-size:100% 100%;
		border-radius: 10rpx;
		background-repeat: no-repeat;
		position: relative;
	}
	.container_2{
		width: 670rpx;
		margin: 20rpx auto 0rpx;
		height: 340rpx;
		background-image: url('https://pic.job2020.cn/%E6%B4%BB%E5%8A%A8_1.jpg');
		background-position: left top;  
		background-size:100% 100%;
		border-radius: 10rpx;
		background-repeat: no-repeat;
		position: relative;
	}
	.cardTop{
		color: #666666;
		text-align: center;
		margin-top: 20rpx;
		font-size: 28rpx;
	}
	.icon-gonggao{
		color: #c83f55;
		margin-right: 5rpx;
	}
	.cardBottom{
		position: absolute;
		right: 20rpx;
		bottom: 20rpx;
		color: #666666;
		font-size: 24rpx;
	}
	.icon-liulan{
		margin-right: 5rpx;
	}
</style>
