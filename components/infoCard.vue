<!-- @name: 个人信息组件 -->
<!-- @author: Miraitowa -->
<!-- @version: 1.0 -->
<template>
	<div class="main">
	<div class="flexBox">
		<div class='flexBox'>
			<div><image class="avatarImg" :src="info.head"></image></div>
			<div>
				<div class='nickNameBox'>
				<div>{{info.nickName}}</div>
				<i :class="info.sex == '男' ? 'iconfont icon-nan' : 'iconfont icon-nv'" v-if='!info.show'></i>
				<vipIcon :state='info.memberstate' v-if='!info.show'></vipIcon>
				</div>
				<div><slot name="lb_content"></slot></div>
			</div>
		</div>
		<div>
			<slot name="r_content"></slot>
		</div>
	</div>
	</div>
</template>

<script>
	import vipIcon from './vipIcon.vue'
	export default {
		data() {
			return {
				
			};
		},
		components:{ 
			vipIcon
		},
		props:{
			info: {
				type: Object,
				default: null,
			}
		}
	}
</script>

<style scoped>
	.main{
		width: 670rpx;
		margin: 0 auto;
	}
	.flexBox{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 150rpx;
	}
	.avatarImg{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.nickNameBox{
		display: flex;
		align-items: center;
	}
	.nickNameBox div{
		font-size: 28rpx;
	}
	.icon-nan{
		color: #44a1ff;
		display: inline;
		margin-left: 10rpx;
		font-size: 26rpx;
	}
	.icon-nv{
		display: inline;
		color: #f56df0;
		margin-left: 10rpx;
		font-size: 26rpx;
	}
</style>
