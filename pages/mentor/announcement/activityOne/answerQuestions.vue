<template>
	<view  class='main'>
		<div class='backImg'>
		<div class='content'>
			<div class='q_item'>
				<div class='q_itemTitle'>
					<div>1</div>
					<div>{{showData.title}}</div>
				</div>
				<ul  @click='onSeleAnswer'>
					<block v-for="(item,index) in showData.options" :key='index'>
						<li :class="currentAns == index ? 'q_itemSele activite' : 'q_itemSele' " :data-index='index' >{{chart[index]}}{{item}}</li>
					</block>
				</ul>
			</div>
			<mask :maskShow='maskShow'>
				<div class="cardImg">
					<image :src='showData.card' ></image>
					<div  @click="onSureGet">继续集卡</div>
				</div>
			</mask>
			<div class="sureBtn" @click="onSubmit">确认</div>
		</div>
		</div>
	</view>
</template>

<script>
	import mask from '../../../../components/mask.vue'
	export default {
		data() {
			return {
				currentAns: null,
				showData: [],
				chart: ['A、','B、','C、','D、','E、','F、，‘G、'],
				maskShow: false
			}
		},
		components:{mask},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.request({
				url:'https://user.job2020.cn/card/selectquestion',
				method:'GET',
				success: (res) => {
					console.log(res)
					if(res.data.data.code  === 0 ){
						this.showData =res.data.data.questionBank
					}
				}
			})
		},
		methods: {
			onSeleAnswer(e){
				this.currentAns = e.target.dataset.index
			},
			onSubmit(){
				uni.request({
					url:'https://user.job2020.cn/card/questions',
					method:'GET',
					data:{
						openId: getApp().globalData.uid,
						correctOptions: this.showData.options[this.currentAns],
						queId: this.showData.queId
					},
					success: (res) => {
						console.log(res,'111111111111111')
						if(res.data.data.code === 1 ){
							this.maskShow = true
							this.showData =res.data.data
						}else if(res.data.data.code === 0){
						uni.showModal({
							title:'温馨提示',
							content: '回答错误，再接再厉吧',
							
						})
						uni.request({
								url:'https://user.job2020.cn/card/selectquestion',
								method:'GET',
								success: (res) => {
									console.log(res)
									this.showData =res.data.data
								}
							})
					}else{
						uni.showModal({
							title:'温馨提示',
							content: '今日已经没有机会',
						})	
					}
					}
				})
			},
			onSureGet(){
				this.maskShow = false
			}
		}
	}
</script>

<style scoped>
	.main{
		width: 100%;
		height: 1700rpx;
		background-image: url("https://pic.job2020.cn/%E6%B4%BB%E5%8A%A8%E8%83%8C%E6%99%AF.png");
		background-repeat:no-repeat;
		background-attachment:scroll;
		background-position:left top;
		background-size:100% 100%;
	}
	.backImg{
		position: relative;
	}
	.content{
		position: absolute;
		left: 40rpx;
		top: 570rpx;
		width: 670rpx;
		margin: 0 auto;
		border-radius: 10rpx;
		background-color: #ffffff;
	}
	.q_item{
		margin-left: 20rpx;
		margin-top: 50rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #EBEEF5;
	}
	.q_itemTitle{
		display: flex;
		align-items: center;
		font-size: 28rpx;
	}
	.q_itemTitle div:first-child{
		width: 42rpx;
		height: 42rpx;
		margin-right: 20rpx;
		border-radius: 50%;
		line-height: 42rpx;
		background-color: #ffa07a;
		color: #ffffff;
		text-align: center;
		font-size: 24rpx;
	}
	.q_itemSele{
		padding-left: 62rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #909399;
	}
	.activite{
		background-color: #ffa07a;
		color: #ffffff;
		width: 568rpx;
	}
	.sureBtn{
		width: 150rpx;
		height: 80rpx;
		text-align: center;
		background-color: #ffcc33;
		color: #ff9933;
		font-weight: 400;
		line-height: 80rpx;
		border-radius: 20rpx;
		box-shadow: 8rpx 8rpx 5rpx #ff9933;
		margin-left: 33%;
		margin-top: 50rpx;
		margin-bottom: 50rpx;
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
