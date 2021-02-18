<template>
	<view >
		<!-- <div class="main"></div> -->
		<image src='https://pic.job2020.cn/%E4%BA%92%E5%8A%A8%E6%B4%BB%E5%8A%A8%E8%AF%A6%E6%83%85.jpg' mode="widthFix" class="image"></image>
		<icon class="iconfont icon-xiangzuo" @click="onBack"></icon>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			// 返回上一页
			onBack(){
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style scoped>
	.image{
		width: 100%;
		height: 100vh;
	}
	.icon-xiangzuo{
		color: #000000;
		font-size: 40rpx;
		font-weight: 600;
		position: fixed;
		left: 40rpx;
		top: var(--status-bar-height);
	}
	
</style>
