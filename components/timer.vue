<!-- @name: 倒计时组件 -->
<!-- @author: Miraitowa -->
<!-- @version: 1.0 -->
<template>
	<view>
		<div v-if='start' class='timer'>
			<image src='https://pic.job2020.cn/%E6%B5%8F%E8%A7%88%E6%97%B6%E9%97%B4.png'></image>
			<progress :percent="per" activeColor="#ffb530" stroke-width="6" border-radius='4'></progress>
			<div class='timerText'>浏览15s得卡片</div>
		</div>
		<mask :maskShow='maskShow'>
			<div class="cardImg">
				<image :src='showData.card' ></image>
				<div  @click="onSureGet">继续集卡</div>
			</div>
			
			
		</mask>
	</view>
	
</template>

<script>
	import mask from './mask.vue'
	// 倒计时15s
	let num = 15
	let timer = null
	export default{
		data(){
			return {
				per: 0,
				start: false,
				yeaId: '',
				showData: {},
				maskShow: false
			}
		},
		components:{
			mask
		},
		methods:{
			onStart(){
				console.log('开始倒计时')
				this.start = true
				timer = setInterval(()=>{
					num--
					if(num <= 0){
						// 清除定时器
						this.onEnd()
						//任务完成，请求卡片
						uni.request({
							url:'https://user.job2020.cn/card/visit',
							method: 'POST',
							data:{
								openId: getApp().globalData.uid,
								yeaId: this.yeaId
							},
							success: (res) => {
								this.maskShow = true
								this.showData = res.data.data
							}
						})
						return
					}
					this.per = Math.floor( (15 - num) / 15 * 100)
				},1000)
			},
			// 领取卡片
			onSureGet(){
				this.maskShow = false
			},
			onEnd(){
				clearInterval(timer)
				// 隐藏显示器
				this.start = false
				// 还原倒计时时间
				num = 15
			}
		}
	}
</script>

<style scoped>
	.timer{
		position: fixed;
		right: 0;
		top: 30%;
		
	}
	.timer image{
		width: 80rpx;
		height: 80rpx;
		margin-bottom: -20rpx;
	}
	.timer progress{
		width: 100rpx;
	}
	.timerText{
		 background: rgba(0, 0, 0, 0.6);
		 width: 100rpx;
		 font-size: 18rpx;
		 margin-top: -10rpx;
		 padding-top: 15rpx;
		 color: #ffffff;
		 border-radius: 10rpx;
		 text-align: center;
	}
	/* 弹出卡片样式 */
	.cardImg{
		position: fixed;
		top: calc(50% - 275rpx);
		left: calc(50% - 275rpx);
		animation: shake 3s linear infinite;
	}
	.cardImg image{
		width: 550rpx;
		height: 550rpx;
	}
	.cardImg div{
		width: 300rpx;
		height: 65rpx;
		background: linear-gradient(#fde8b1,#fda949);
		text-align: center;
		line-height: 65rpx;
		border-radius: 32rpx;
		color: #89622b;
		margin: 0 auto;
	}
	@keyframes shake {
	  70%, 80% {
	    transform: rotate(7deg);
	  }
	  75% {
	    transform: rotate(-7deg);
	  }
	 
	  65%,
	  85% {
	    transform: rotate(0);
	  }
	}
</style>
