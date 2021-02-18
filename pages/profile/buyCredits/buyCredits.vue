<template>
	<view>
		<!-- 通告栏begin -->
		<slidingNotice :url="url">
			<div slot='marquee_right'>
				<image src='https://pic.job2020.cn/%E6%8A%BD%E5%A5%96_13.png' class="slide_img" @click='toDraw'></image>
			</div>
		</slidingNotice>
		<!-- 通告栏end -->
		
		
		<!-- 头部 -->
		<div class="creditsTop">
			<span>当前账户积分</span>
			<div>
				<span>{{integral}}</span>积分
			</div>
		</div>
		
		<!-- 面值 -->
		<div class="creditMid">
			<div class='layout'>
				<div class="exchangeRate">1元 = 1积分</div>
				<div class='numBox'>
					<block v-for="(item,index) in buyNum" :key='item'>
						<div :class="index == idx ?  'numItemNoSelect' : 'numItemSelect' " @click="onSelectNum(index)">
							<div>{{item}}元</div>
							<div v-if='index < 1'>{{item}}积分</div>
							<div v-if='index >= 1'>{{item}}积分<span >+赠送{{presentIntegral[index]}}</span></div>
						</div>
					</block>
				</div>
			</div>
			
		</div>
		
		<!-- 底部 -->
		<div class='layout'>
			<div class="tips">
				<div>注意：</div>
				<div>1. 充值积分仅限Hi情报局使用</div>
				<div>2. 如您遇到充值问题，请私信官方反馈，第一时间给您解决</div>
				<div v-if='isIos'>3、小程序暂不支持IOS虚拟商品充值，请前往HI情报局公众号激活</div>
			</div>
			
		</div>
		
		<div :class="isIos ? 'unbuyBtn' : 'buyBtn'" @click='onBuyCredits'>确认充值</div>
	</view>
</template>

<script>
	import slidingNotice from '../../../components/slidingNotice.vue'
	export default {
		data() {
			return {
				buyNum:['1','10','30','50','100','150'],
				presentIntegral: [0,1,4,7,16,26],
				isSelect: true ,    //是否选中
				idx: 0 ,
				url:'https://user.job2020.cn/money/orderscrollbar',
				integral: '',
				isIos: false,
			}
		},
		components:{slidingNotice},
		onLoad(options) {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			this.integral = options.integral
			// 获取机型
			uni.getSystemInfo({
			    success: (res) => {
					if(res.system.slice(0,3) === 'iOS'){
						this.isIos = true
						console.log(this.isIos)
					}
			    }
			});
		},
		methods: {
			// 跳转到抽奖
			toDraw(){
				uni.navigateTo({
					url:'../../mentor/questionnaire/luckDraw'
				})
			},
			onSelectNum(index){
				this.idx = index
			},
			
			// 购买
			onBuyCredits(){
				if(this.isIos) return
				uni.request({
					url:'https://user.job2020.cn/money/orders',
					method:'GET',
					data:{
						openId:getApp().globalData.uid,
						prices: Number(this.buyNum[this.idx])
					},
					success: (res) => {
						console.log(res)
						uni.requestPayment({
						     provider: 'wxpay',
						     timeStamp: res.data.timeStamp,
						     nonceStr: res.data.nonceStr,
						     package: res.data.package,
						     signType: res.data.signType,
						     paySign: res.data.paySign,
						     success:  (res)=> {
								 console.log(res,'11111111111')
								 uni.request({
								 	url: 'https://user.job2020.cn/money/callBack',
									method: 'GET',
									data:{
										openId: getApp().globalData.uid,
										
									},
									success: (res) => {
										console.log(res,'222222222222')
									}
								 })
														 
						     },
						     fail: function (err) {
						         console.log('fail:' + JSON.stringify(err));
						     }
						 });
					}
				})
			}
		}
	}
</script>

<style scoped>
	.creditsTop{
		margin-top: 80rpx;
		width: 100%;
		text-align: center;
		padding-bottom: 40rpx;
	}
	.creditsTop div span{
		margin-top: 20rpx;
		font-size: 50rpx;
		color: #303133;
		margin-right: 6rpx;
	}
	.creditsTop div{
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #909399;
		
	}
	.creditsTop span{
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #909399;
	}
	.creditMid{
		border-top: 10rpx solid #EEEEEE;
		margin-top: 50rpx;
		/* width: 670rpx; */
		margin: 0 auto;
	}
	.layout{
		width: 670rpx;
		margin: 30rpx auto 0;
	}
	.numBox{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.exchangeRate{
		color: #909399;
		font-size: 28rpx;
	}
	.numItemSelect{
		width: 320rpx;
		height: 140rpx;
		background-color: #f1f8ff;
		border-radius: 10rpx;
		text-align: center;
		margin-top: 20rpx;
	}
	.numItemNoSelect{
		width: 320rpx;
		height: 140rpx;
		background-color: #44a1ff;
		color: #FFFFFF;
		border-radius: 10rpx;
		text-align: center;
		margin-top: 20rpx;
	}
	.numItemNoSelect div:first-child{
		margin-top: 30rpx;
		font-size: 40rpx;
		color: #FFFFFF;
	}
	.numItemNoSelect div:nth-child(2){
		font-size: 24rpx;
		color: #FFFFFF;
	}
	.numItemSelect div:first-child{
		margin-top: 30rpx;
		font-size: 40rpx;
		color: #303133;
	}
	.numItemSelect div:nth-child(2){
		font-size: 24rpx;
		color: #909399;
	}
	.numItemSelect div:nth-child(2) span{
		font-size: 24rpx;
		color: #44a1ff;
	}
	.numItemNoSelect div:nth-child(2) span{
		font-size: 24rpx;
		color: #FFFFFF;
	}
	.tips{
		margin-top: 50rpx;
	}
	.tips div{
		font-size: 24rpx;
		color: #C0C4CC;
		margin-top: 20rpx;
	}
	.tips div:first-child{
		font-size: 32rpx;
		
	}
	.buyBtn{
		width: 670rpx;
		margin: 50rpx auto;
		height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #44a1ff;
		text-align: center;
		line-height: 100rpx;
		border-radius: 15rpx;
	}
	.unbuyBtn{
		width: 670rpx;
		margin: 50rpx auto;
		height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #909399;
		text-align: center;
		line-height: 100rpx;
		border-radius: 15rpx;
	}
	.slide_img{
		width: 100rpx;
		height: 100rpx;
		animation: shake 3s linear infinite;
	}
</style>
