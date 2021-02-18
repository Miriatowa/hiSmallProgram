<!-- @name: vip图标组件 -->
<!-- @author: Miraitowa -->
<!-- @version: 1.0 -->

<template>
	<view>
		<div>
			<div v-if='state == 0'></div>
			<div v-if='state == 2' class='yearVip'><i class='iconfont icon-vip'></i>年VIP</div>
			<div v-if='state == 1' class='monthVip'><i class='iconfont icon-vip'></i>VIP</div>
		</div>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		props:{
			state:{
				type: String,
				default: '0'
			}
		}
	}
</script>

<style scoped>
	.yearVip{
		width: 106rpx;
		height: 30rpx;
		line-height: 30rpx;
		font-size: 22rpx;
		background-color: #ed4747;
		color: #ffffff;
		border-radius: 15rpx;
		text-align: center;
		margin-left: 20rpx;
	}
	.monthVip{
		width: 106rpx;
		height: 30rpx;
		line-height: 30rpx;
		font-size: 22rpx;
		background-color: #44a1ff;
		color: #ffffff;
		border-radius: 15rpx;
		text-align: center;
		margin-left: 20rpx;
	}
	.icon-vip{
			display: inline;
			margin-right: 6rpx;
		}
</style>
