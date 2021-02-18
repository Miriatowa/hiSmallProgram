<template>
	<view class="main">
		<!-- 通告栏begin -->
		<slidingNotice :url="url">
			<div slot='marquee_right'>
				<image src='https://pic.job2020.cn/%E6%8A%BD%E5%A5%96_13.png' class="slide_img" @click='toDraw'></image>
			</div>
		</slidingNotice>
		<!-- 通告栏end -->
		<div class='infoCard'>
			<image class="mainTop" src="https://pic.job2020.cn/%E6%BF%80%E6%B4%BB%E4%BC%9A%E5%91%98.png" mode="widthFix"></image>
			<div class='vipInfo'>
				<image :src='showData.head'></image>
				<div>{{showData.expirationTime}}</div>
			</div>
		</div>
		
		<div class="mainMid">
			<div class="midItem">
				<image src='https://pic.job2020.cn/%E8%B5%84%E6%BA%90111.png'></image>
				<div class="item_right">
					<div>
						<div>年vip会员无限推荐</div>
						<div>提高交友次数，不错过机会</div>
					</div>
					<icon class="iconfont icon-xiangyou1"></icon>
				</div>
				
			</div>
			<div class="midItem">
				<image src='https://pic.job2020.cn/%E8%B5%84%E6%BA%90%20222.png'></image>
				<div class="item_right">
					<div>
						<div>每月赠送20积分(年vip送30积分)</div>
						<div>积分任意使用</div>
					</div>
					<icon class="iconfont icon-xiangyou1"></icon>
				</div>
				
			</div>
			<div class="midItem">
				<image src='https://pic.job2020.cn/%E8%B5%84%E6%BA%90333.png'></image>
				<div class="item_right">
					<div>
						<div>任务积分翻倍</div>
						<div>每日任务积分双倍(年vip三倍)获取</div>
					</div>
					<icon class="iconfont icon-xiangyou1"></icon>
				</div>
				
			</div>
			<div class="midItem">
				<image src='https://pic.job2020.cn/%E8%B5%84%E6%BA%90%208.png'></image>
				<div class="item_right">
					<div>
						<div>免费就业指导</div>
						<div>年vip赠送两次就业导师咨询</div>
					</div>
					<icon class="iconfont icon-xiangyou1"></icon>
				</div>
				
			</div>
		</div>
		<div class="mainBottom" @click="onGetVip">激活VIP</div>
		
		
		<!-- 弹出层 -->
		<mask :maskShow='maskShow'>
			<div class="maskMain">
				<div class="maskTitle">
					<span><i class="iconfont icon-vip"></i></span>VIP会员
					<icon class="iconfont icon-shanchu" @click="onCloseMask"></icon>
				</div>
				<div class="selectBox">
					<div :class="currentIndex == 0 ? 'noSelectItem' : 'selectItem'" data-index= '0' @click="onSelect">
						<div> </div>
						<div >1个月</div>
						<div>￥<span>10.00</span></div>
						<div class='oriPrice'>原价￥15/月</div>
					</div>
					<div  :class="currentIndex == 1 ? 'noSelectItem' : 'selectItem'" data-index= '1' @click="onSelect">
						<div class="discount">8折优惠</div>
						<div>3个月</div>
						<div>￥<span>24.00</span></div>
						<div class='oriPrice'>原价￥30/季</div>
					</div>
					<div  :class="currentIndex == 2 ? 'noSelectItem' : 'selectItem'" data-index= '2' @click="onSelect">
						<div class="discount">7折优惠</div>
						<div>半年</div>
						<div>￥<span>42.00</span></div>
						<div class='oriPrice'>原价￥60/半年</div>
					</div>
					<div  :class="currentIndex == 3 ? 'noSelectItem' : 'selectItem'" data-index= '3' @click="onSelect">
						<div class="discount_last">年vip</div>
						<div>一年</div>
						<div>￥<span>72.00</span></div>
						<div class='oriPrice'>原价￥120/年</div>
					</div>
				</div>
				<div class="maskBottom">
					<icon class="iconfont icon-weixinzhifu"></icon>微信支付
					<button :class="isIos ? 'unpurchaseBtn' : 'purchaseBtn'" @click='onBuyVip'>激活VIP</button>
					<div v-if='isIos' class='tips'>注：小程序暂不支持IOS虚拟商品充值，请前往HI情报局公众号激活</div>
				</div>
				
			</div>
			
			
		</mask>
	</view>
</template>

<script>
	import mask from '../../../components/mask.vue'
	import slidingNotice from '../../../components/slidingNotice.vue'
	export default {
		data() {
			return {
				maskShow: false,  //控制弹出层
				isSelect: false,
				price:[10,24,42,72],
				currentIndex: 0,
				showData: {},
				url:'https://user.job2020.cn/memberpay/memberscrollbar',
				isIos: false , //是否为ios机型
			}
		},
		components:{
			mask,
			slidingNotice
		},
		onLoad(){
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			// 获取机型
			uni.getSystemInfo({
			    success: (res) => {
					if(res.system.slice(0,3) === 'iOS'){
						this.isIos = true
						console.log(this.isIos)
					}
			    }
			});
			uni.request({
				url:"https://user.job2020.cn/memberpay/selectMember",
				method:'GET',
				data:{
					openId:getApp().globalData.uid
				},
				success: (res) => {
					if(res.data.member.memberstate == 0){
						res.data.member.expirationTime = '暂未激活会员'
					}else{
						res.data.member.expirationTime = res.data.member.expirationTime+'到期'
					}
					this.showData = res.data.member
					console.log(this.showData)
				}
			})
		},
		methods: {
			// 跳转抽奖
			toDraw(){
				uni.navigateTo({
					url:'../../mentor/questionnaire/luckDraw'
				})
			},
			onSelectVip(){
				this.isSelect = false
			},
			onSelectSvip(){
				this.isSelect = true
			},
			// 获取vip特权
			onGetVip(){
				this.maskShow = true
			},
			// 选择套餐
			onSelect(e){
				this.currentIndex = e.currentTarget.dataset.index
			},
			// 关闭弹出层
			onCloseMask(){
				this.maskShow = false
			},
			// 充值会员
			onBuyVip(){
				if(this.isIos) return
				uni.request({
					url:'https://user.job2020.cn/memberpay/orders',
					method:'GET',
					data:{
						openId:getApp().globalData.uid,
						prices: this.price[this.currentIndex]
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
								 	url: 'https://user.job2020.cn/memberpay/callBack',
									method: 'GET',
									data:{
										openId: getApp().globalData.uid,
										
									},
									success: (res) => {
										console.log(res,'222222222222')
										uni.navigateTo({
											url: '../buyCredits/buyCredits'
										})
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
	.main{
		width: 670rpx;
		margin: 0 auto;
	}
	.mainTop{
		width: 100%;
		margin-top: 50rpx;
	}
	.mainMid{
		margin-top: 50rpx;
	}
	.infoCard{
		position: relative;
	}
	.vipInfo{
		position: absolute;
		left: 20rpx;
		bottom: 30rpx;
		display: flex;
		align-items: center;
	}
	.vipInfo image{
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
	.vipInfo div{
		font-size: 28rpx;
		color: #ffffff;
		margin-left: 20rpx;
	}
	.midItem{
		display: flex;
		height: 150rpx;
		align-items: center;
		/* line-height: 100rpx; */
	}
	.midItem image{
		width: 80rpx;
		height: 80rpx;
		margin-right: 18rpx;
	}
	.icon-shanchu{
		position: fixed;
		right: 2%;
		top: 0;
		font-size: 40rpx;
	}
	.item_right{
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.item_right div div:nth-child(2){
		font-size: 24rpx;
		color: #606266;
		margin-top: 10rpx;
	}
	.icon-xiangyou1{
		font-size: 28rpx;
		color: #909399
	}
	.mainBottom{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #44a1ff;
		border-radius: 20rpx;
		margin-top: 50rpx;
	}
	.maskMain{
		width: 550rpx;
		margin: 0 auto;
		margin-top: 20rpx;
	}
	.maskTitle{
		text-align: center;
	}
	.maskTitle span{
		display: inline-block;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		background-color: #44A1FF;
		color: #FFFFFF;
		text-align: center;
		line-height: 50rpx;
		margin-right: 6rpx;
	}
	.selectBox{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.selectItem{
		width: 220rpx;
		height: 200rpx;
		margin-top: 30rpx;
		border: 2rpx solid #EEEEEE;
		box-shadow: 0 0 10rpx #CCCCCC;
		text-align: center;
		border-radius: 10rpx;
	}
	.noSelectItem{
		width: 220rpx;
		height: 200rpx;
		margin-top: 30rpx;
		border: 2rpx solid #EEEEEE;
		box-shadow: 0 0 10rpx #CCCCCC;
		text-align: center;
		border-radius: 10rpx;
		background-color: #fffbf2;
	}
	.selectItem div:nth-child(2){
		margin-top: 30rpx;
	}
	.selectItem div:nth-child(3){
		color: #ba8f5b;
		font-size: 42rpx;
		margin: 10rpx 0rpx 0rpx;
	}
	.noSelectItem div:nth-child(2){
		margin-top: 30rpx;
	}
	.noSelectItem div:nth-child(3){
		color: #ba8f5b;
		font-size: 42rpx;
		margin: 10rpx 0rpx 0rpx;
	}
	.oriPrice{
		color: #C0C4CC;
		font-size: 10px;
		text-decoration: line-through;
	}
	.discount{
		margin-top: -20rpx;
		font-size: 18rpx;
		height: 30rpx;
		line-height: 30rpx;
		width: 90rpx;
		background-color: #44a1ff;
		color: #FFFFFF;
		border-top-right-radius: 12rpx;
		border-bottom-left-radius: 12rpx;
	}
	.discount_last{
		margin-top: -20rpx;
		font-size: 18rpx;
		height: 30rpx;
		line-height: 30rpx;
		width: 90rpx;
		color: #FFFFFF;
		border-top-right-radius: 12rpx;
		border-bottom-left-radius: 12rpx;
		background-color: #ed4747;
	}
	.maskBottom{
		margin-top: 50rpx;
		margin-bottom: 30rpx;
		padding-top: 20rpx;
		border-top: 2rpx solid #EEEEEE;
		font-size: 28rpx;
	}
	.icon-weixinzhifu{
		color: #09bb07;
		margin-right: 10rpx;
		font-size: 32rpx;
	}
	.purchaseBtn{
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #44a1ff;
		border-radius: 20rpx;
		margin-top: 30rpx;
	}
	.unpurchaseBtn{
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #909399;
		border-radius: 20rpx;
		margin-top: 30rpx;
	}
	.slide_img{
		width: 100rpx;
		height: 100rpx;
	}
	.tips {
		margin-top: 20rpx;
		font-size: 20rpx;
		color: #C0C4CC;
	}
</style>
