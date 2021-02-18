<!-- @name: 自定义按钮组件 -->
<!-- @author: Miraitowa -->
<!-- @version: 1.0 -->
<template>
	<view>
		<button class='btn' @click='onClick'>{{message}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			message:{
				type: String,
				default: '确认'
			}
		},
		methods:{
			onClick(){
				this.$emit('onClick')
			}
		}
	}
</script>

<style scoped>
	.btn{
		position: fixed;
		left: 0;
		bottom: 0;
		height: 100rpx;
		width: 100%;
		background-color: #44a1ff;
		border:2rpx solid  #44a1ff;
		color: #FFFFFF;
		text-align: center;
		line-height: 100rpx;
		border-radius: 4px;
	}
	.btn:hover{
		background-color: #66b1ff;
		border:2rpx solid  #66b1ff;
	}
</style>
