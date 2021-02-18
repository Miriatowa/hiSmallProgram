<template>
	<view class="main">
		<div class='at_rules'>
			活动规则
		</div>
		<div class='at_notice'>
			<block v-for="(item,index) in showData.list" :key='item'>
				<div>{{item.scroll}}</div>
			</block>
		</div>
		<image src='https://pic.job2020.cn/%E5%BC%80%E5%AE%9D%E7%AE%B1_8.png' class="at_chest" v-if='!showData.code'></image>
		<image src='https://pic.job2020.cn/%E5%BC%80%E5%AE%9D%E7%AE%B1_9.png' class="at_chestActive" v-if='showData.code'></image>
		<div class='at_btn'>
			<div>{{text}}</div>
			<div @click="onOpen" v-if='!showData.code' class='at_noActivebtn'>马上开宝箱</div>
			<div v-if='showData.code' class='at_noActivebtn at_activeBtn'>马上开宝箱</div>
		</div>
		<div class='at_progress'>
			<block v-for="(item,index) in signArr" :key='item'>
				<div :class="showData.time  > index ? 'at_progress_day_active' : 'at_progress_day'">
					<icon class="iconfont icon-xuanzhong2" v-if="showData.time > index"></icon>
				</div>
			</block>
			<div>
				<image :src="showData.time !== 7 ? 'https://pic.job2020.cn/%E5%BC%80%E5%AE%9D%E7%AE%B1_1.png' : 'https://pic.job2020.cn/%E5%BC%80%E5%AE%9D%E7%AE%B1_2.png'"
				 class='at_progress_lastday'></image>
			</div>

		</div>
		<div class='at_myReward'>
			<div>
				连续7天开宝箱，即可获得双倍奖励
			</div>
			<div @click='onShowMy'>我的奖励<icon class="iconfont icon-xiangyou1"></icon>
			</div>
		</div>
		<mask :maskShow='maskShow'>
			<scroll-view scroll-y="true" style="height: 500px;" v-if='step == 0'>
				<div class='ms_title'>
					<div class='ms_tiItem'>宝箱</div>
					<div class='ms_tiItem'>奖品</div>
					<div class='ms_tiItem'>时间</div>
				</div>
				<block v-for="item in myChestRec" :key='item'>
					<div class='ms_title'>
						<div class='ms_time'>
							<image :src='item.icon' class="ms_img"></image>
						</div>
						<div class='ms_time'>{{item.grade}}</div>
						<div class='ms_time'>{{item.time}}</div>
					</div>
				</block>
				<icon class="iconfont icon-shanchu" @click="onClose"></icon>
			</scroll-view>
			<div class="cardImg" v-if='step == 1'>
				<image :src='stepUrl' ></image>
				<div  @click="onClose">点击领取</div>
			</div>	
		</mask>
	</view>
</template>

<script>
	import mask from '../../../../components/mask.vue'
	export default {
		data() {
			return {
				signArr: [1, 2, 3, 4, 5, 6],
				showData: {},
				text: '今日可开启1次',
				maskShow: false,
				myChestRec: [],
				step: 0,
				stepUrl: ''
			}
		},
		components: {
			mask
		},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.request({
				url: 'https://user.job2020.cn/card/treasurechest',
				method: 'GET',
				data: {
					openId: getApp().globalData.uid
				},
				success: (res) => {
					this.showData = res.data.data
					if (this.showData.code) {
						this.text = '今天没有机会了'
					}
				}
			})
			setInterval(() => {
				var item = this.showData.list[0]
				this.showData.list.shift()
				this.showData.list.push(item)

			}, 2000)
		},
		onShareAppMessage(res) {
			return {
				title: '一个专属于大学生的小程序，进来即可获得现金好礼',
				imageUrl: 'https://pic.job2020.cn/%E5%88%86%E4%BA%AB_1.png',
				path: 'pages/mentor/mentor/mentor'
			}
		},
		methods: {
			// 打开宝箱
			async onOpen() {
				await uni.showLoading({
					title: '开启ing...',
					icon: "loading",
					success: (res) => {
						uni.request({
							url: 'https://user.job2020.cn/card/unpack',
							method: 'GET',
							data: {
								openId: getApp().globalData.uid
							},
							success: (res) => {
								setTimeout(() => {
									uni.hideLoading()
									console.log(res)
									this.stepUrl = res.data.data.prize[0]
									this.step = 1
									this.maskShow =true
									this.showData.code = 1
									this.text = '今天没有机会了'
								}, 1000)
							}
						})





					}
				})

			},
			onClose() {
				this.maskShow = false
			},
			onShowMy() {
				uni.request({
					url: 'https://user.job2020.cn/card/myreward',
					method: 'GET',
					data: {
						openId: getApp().globalData.uid
					},
					success: (res) => {
						console.log(res)
						this.myChestRec = res.data.data
						this.step = 0
						this.maskShow = true
						
					}
				})
			}
		}
	}
</script>

<style scoped>
	.main {
		width: 100%;
		height: 1344rpx;
		background-image: url("https://pic.job2020.cn/%E5%AE%9D%E7%AE%B1_4.png");
		background-repeat: no-repeat;
		background-attachment: scroll;
		background-position: left top;
		background-size: 100% 100%;
	}

	.at_rules {
		display: inline-block;
		width: 120rpx;
		height: 35rpx;
		border-radius: 17.5rpx;
		margin-left: 40rpx;
		margin-top: 50rpx;
		font-size: 22rpx;
		text-align: center;
		line-height: 35rpx;
		color: #c3d1e1;
		background-color: #074386;
	}

	.at_notice {
		margin: 0 auto;
		width: 500rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 30rpx;
		margin-top: 300rpx;
		text-align: center;
		color: #f4f8fb;
		font-size: 28rpx;
		background-color: #157abc;
		overflow: hidden;
	}

	.at_notice div {
		height: 50rpx;
		line-height: 50rpx;
		transform: translateX(40rpx, 400rpx);
		transition: transform 1s linear infinite;
	}

	.at_chest {
		position: absolute;
		width: 300rpx;
		height: 300rpx;
		left: 225rpx;
		top: 520rpx;
		animation: rotate .5s linear infinite;
	}

	.at_chestActive {
		position: absolute;
		width: 320rpx;
		height: 320rpx;
		left: 230rpx;
		top: 520rpx;
	}

	@keyframes rotate {
		0% {
			transform: translateY(0);
		}

		25% {
			transform: translateY(16rpx);
		}

		50% {
			transform: translateY(32rpx) scale(1.1, 0.9);

		}

		75% {
			ransform: translateY(16rpx);
		}

		100% {
			transform: translateY(0);
		}
	}

	.at_btn {
		margin-top: 420rpx;
		margin-left: 105rpx;
		margin-right: 105rpx;
	}

	.at_btn div:first-child {
		color: #f34119;
		font-size: 26rpx;
		text-align: center;
		font-weight: 600;
	}

	.at_noActivebtn {
		width: 540rpx;
		height: 90rpx;
		margin-top: 20rpx;
		border-radius: 45rpx;
		background-image: linear-gradient(#fff07b, #fea509);
		box-shadow: 0rpx 10rpx 4rpx 0rpx #ff5f01;
		color: #f34119;
		font-weight: 600;
		font-size: 40rpx;
		line-height: 100rpx;
		text-align: center;
	}

	.at_activeBtn {
		color: #d1d0cb;
		box-shadow: 0rpx 8rpx 4rpx 0rpx #d1d0cb;
		background-image: linear-gradient(#f5f5f5, #dbdbdb);
	}

	.at_progress {
		display: flex;
		justify-content: space-around;
		width: 650rpx;
		height: 34rpx;
		border-radius: 34rpx;
		margin: 0 auto;
		margin-top: 100rpx;
		border: 8rpx solid #3f97dc;
		background-color: #1774bc;

	}

	.at_progress_day {
		width: 65rpx;
		height: 65rpx;
		border-radius: 50%;
		margin-top: -20rpx;
		box-shadow: 0rpx 8rpx 4rpx 0rpx #d1d0cb;
		background-image: linear-gradient(#f5f5f5, #dbdbdb);
	}

	.at_progress_day_active {
		width: 65rpx;
		height: 65rpx;
		border-radius: 50%;
		box-shadow: 0rpx 8rpx 4rpx 0rpx #ff5f01;
		margin-top: -20rpx;
		text-align: center;
		line-height: 65rpx;
		color: #f34119;
		font-weight: 600;
		background-image: linear-gradient(#fff07b, #fea509);
	}

	.icon-xuanzhong2 {
		font-size: 34rpx;
	}

	.at_progress_lastday {
		width: 90rpx;
		height: 90rpx;
		margin-top: -30rpx;
	}

	.at_myReward {
		text-align: center;
		margin-top: 30rpx;
		color: #f34119;
	}

	.at_myReward div:nth-child(2) {
		margin-top: 50rpx;
	}


	.ms_title {
		display: flex;
		position: relative;
		justify-content: space-between;
		align-items: center;
	}

	.ms_tiItem {
		width: 33.3%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		border-bottom: 2rpx solid #DCDFE6;
		border-right: 2rpx solid #DCDFE6;
	}

	.ms_tiItem:last-child {
		border-right: none;
	}

	.ms_img {
		margin-top: 10rpx;
		width: 100rpx;
		height: 100rpx;
	}

	.ms_time {
		margin-right: 20rpx;
		font-size: 28rpx;
		color: #909399;
		width: 220rpx;
		text-align: center;
	}

	.icon-shanchu {
		padding: 10rpx;
		font-size: 36rpx;
		position: fixed;
		right: 10rpx;
		top: 10rpx;

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
