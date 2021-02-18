<!-- @name: 抽奖组件 -->
<!-- @author: Miraitowa -->
<!-- @version: 1.0 -->

<template>
	<view>
		<div class='ld_container'>
			<block v-for="(item,index) in  drContent" :key='item'>
				<div class='ld_item'>{{item}}</div>
			</block>
		</div>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				drContent: [
					'谢谢惠顾',
					'iPhone12’，
					'5积分',
					'VIP7天',
					'开始抽奖',
					'10积分',
					'良品铺子零食一箱',
					'50积分',
					'年会会员'
				]
			}
		},
	}
</script>


<style scoped>
	.ld_container{
		display: flex;
		width: 670rpx;
		height: 670rpx;
		align-items: center;
		justify-content: space-between;
	}
	.ld_item{
		width: 33.3%;
		height: 33.3%;
		border-bottom: 2rpx solid #000000;
		border-right: 2rpx solid #000000;
		text-align: center;
	}
	.ld_item:nth-child(5){
		background-color: #007AFF;
	}
</style>
