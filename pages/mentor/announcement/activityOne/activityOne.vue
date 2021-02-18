<template>
	<view>
		<div class='main'>
			<div class='backImg'>
				<div class='rules' @click='toRules'>活动规则</div>
				<div class='content'>
					<div class='chartImg'>
						<block v-for="(item,index) in showData.or" :key='item.card'>
							<div class='imageWrap'>
								<image :src="item.sum == 0 ? images[index] : item.card " class="imageItem"></image>
								<div :class="item.sum == 0 ? 'noImageNum' : 'imageNum'">{{item.sum}}</div>
							</div>

						</block>
					</div>

					<div class='myRecords' @click='onMyCard'>我的卡片记录<icon class="iconfont icon-xiangyou1"></icon>
					</div>
					<div class='strategy'>
						<div class='strategyCon'>
							<block v-for="(item,index) in showData.list2" :key='item.activitiesName'>
								<div class='strategyItem'>
									<div class='strategyItem_l'>
										<image :src='item.icon'></image>
										<div class='strategyItem_lr'>
											<div>{{item.activitiesName}}({{item.cnumber}}/{{item.lnumber}})</div>
											<div>{{item.require}}</div>
										</div>
									</div>
									<div class='strategyItem_r' @click='toOtherPages' :data-idx='index'>去完成</div>
								</div>
							</block>
						</div>

					</div>
				</div>
				<mask :maskShow='maskShow'>
					<scroll-view scroll-y="true" style="height: 500px;">
						<div class='ms_title'>
							<div class='ms_tiItem'>卡片</div>
							<div class='ms_tiItem'>来源</div>
							<div class='ms_tiItem'>时间</div>
						</div>
						<block v-for="item in myCardRec" :key='item'>
							<div class='ms_title'>
								<div class='ms_time'>
									<image :src='item.card' class="ms_img"></image>
								</div>
								<div class='ms_time'>{{type[item.yeaId - 1]}}</div>
								<div class='ms_time'>{{item.createTime}}</div>
							</div>
						</block>
						<icon class="iconfont icon-shanchu" @click="onClose"></icon>
					</scroll-view>

				</mask>
			</div>

		</div>
	</view>
</template>

<script>
	import mask from '../../../../components/mask.vue'
	export default {
		data() {
			return {
				images: ['https://pic.job2020.cn/%E6%9C%AA%E9%9B%86%E5%AD%97%E4%BD%93%20%281%29.png',
					'https://pic.job2020.cn/%E6%9C%AA%E9%9B%86%E5%AD%97%E4%BD%93%20%282%29.png',
					'https://pic.job2020.cn/%E6%9C%AA%E9%9B%86%E5%AD%97%E4%BD%93%20%283%29.png',
					'https://pic.job2020.cn/%E6%9C%AA%E9%9B%86%E5%AD%97%E4%BD%93%20%284%29.png',
					'https://pic.job2020.cn/%E6%9C%AA%E9%9B%86%E5%AD%97%E4%BD%93%20%285%29.png',
					'https://pic.job2020.cn/%E6%9C%AA%E9%9B%86%E5%AD%97%E4%BD%93%20%286%29.png',
					'https://pic.job2020.cn/%E6%9C%AA%E9%9B%86%E5%AD%97%E4%BD%93%20%287%29.png',
					'https://pic.job2020.cn/%E6%9C%AA%E9%9B%86%E5%AD%97%E4%BD%93%20%288%29.png'
				],
				showData: [],
				maskShow: false,
				myCardRec: [],
				type: ['每日答题', '浏览社交', '浏览导师', '邀请好友']
			}
		},
		components: {
			mask
		},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.request({
				url: 'https://user.job2020.cn/card/showcard',
				method: 'GET',
				data: {
					openId: getApp().globalData.uid
				},
				success: (res) => {
					console.log(res)
					this.showData = res.data.data
				}
			})
		},
		onShareAppMessage(res) {
			return {
				title: '一个专属于大学生的小程序，进来即可获得现金好礼',
				imageUrl: 'https://pic.job2020.cn/%E5%88%86%E4%BA%AB_1.png',
				path: 'pages/mentor/mentor/mentor'
			}
		},
		methods: {
			onMyCard() {
				this.maskShow = true
				uni.request({
					url: 'https://user.job2020.cn/card/mycard',
					method: 'GET',
					data: {
						openId: getApp().globalData.uid
					},
					success: (res) => {
						console.log(res, '111111111')
						this.myCardRec = res.data.data
					}
				})
			},
			// 关闭我的卡片
			onClose() {
				this.maskShow = false
			},
			toOtherPages(e){
				switch(e.target.dataset.idx){
					case 0: 
						this.toAnswerQuestions()
						break;
					case 1:
						this.toSocial()
						break;
					case 2:
						this.toMentor()
						break;
					case 3:
						
						break;
					
				}
			},
			// 前往答题页面
			toAnswerQuestions() {
				uni.request({
					url: 'https://user.job2020.cn/card/selectquestion',
					method: 'GET',
					success: (res) => {
						if (res.data.data.code === 0) {
							uni.navigateTo({
								url: './answerQuestions'
							})

						} else {
							uni.showModal({
								title: '温馨提示',
								content: "今天机会用完了",
							})
						}

					}
				})

			},
			// 前往规则
			toRules() {
				uni.navigateTo({
					url: './colRules'
				})
			},
			// 前往社交主页
			toSocial() {
				uni.switchTab({
					url: '../../../home/index/index'
				})
			},
			// 前往导师主页
			toMentor() {
				console.log('1111')
				uni.switchTab({
					url: '../../mentor/mentor'
				})
			}
		}
	}
</script>

<style scoped>
	.main {
		width: 100%;
		height: 1700rpx;
		background-image: url("https://pic.job2020.cn/%E6%B4%BB%E5%8A%A8%E8%83%8C%E6%99%AF.png");
		background-repeat: no-repeat;
		background-attachment: scroll;
		background-position: left top;
		background-size: 100% 100%;
	}

	.rules {
		display: inline-block;
		width: 120rpx;
		height: 35rpx;
		border-radius: 17.5rpx;
		margin-left: 600rpx;
		margin-top: 50rpx;
		font-size: 22rpx;
		text-align: center;
		line-height: 35rpx;
		color: #ff5b4f;
		background-color: #344a4a;
	}

	.rules::before {
		content: '';
		height: 50rpx;
	}

	.backImg {
		position: relative;
	}

	.content {
		position: absolute;
		left: 40rpx;
		top: 570rpx;
		width: 670rpx;
		margin: 0 auto;
	}

	.chartImg {

		display: flex;
		flex-wrap: wrap;

	}

	.imageWrap {
		position: relative;
	}

	.imageItem {
		width: 160rpx;
		height: 160rpx;
		margin-right: 7rpx;
		margin-top: 20rpx;

	}

	.imageItem:nth-child(4n) {
		margin-right: 0rpx;
	}

	.noImageNum {
		display: none;
		position: absolute;
	}

	.imageNum {
		position: absolute;
		right: 0rpx;
		top: 20rpx;
		font-size: 22rpx;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 40rpx;
		border: 4rpx solid #ffbd8d;
		background-color: #d73125;
		color: #ffbd8d;

	}



	.myRecords {
		margin-top: 30rpx;
		font-size: 28rpx;
		text-align: center;
		color: #feaa6a;
	}

	.strategy {
		margin-top: 50rpx;
		width: 100%;
		background-image: url("https://pic.job2020.cn/%E6%94%BB%E7%95%A5.png");
		background-repeat: no-repeat;
		background-attachment: scroll;
		background-position: left top;
		background-size: 100% 100%;

	}

	.strategyItem {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 620rpx;
		height: 80rpx;
		margin-left: 35rpx;
		margin-bottom: 16rpx;
	}

	.strategyItem:first-child {
		padding-top: 80rpx;
	}

	.strategyItem:last-child {
		padding-bottom: 50rpx;
	}

	.strategyItem_l {
		display: flex;
	}

	.strategyItem_l image {
		width: 80rpx;
		height: 80rpx;
		margin-right: 20rpx;
	}

	.strategyItem_lr div:first-child {
		color: #ff8d47;
		font-size: 26rpx;
	}

	.strategyItem_lr div:nth-child(2) {
		margin-top: 10rpx;
		font-size: 22rpx;
	}

	.strategyItem_r {
		height: 40rpx;
		line-height: 40rpx;
		padding: 5rpx 25rpx;
		border-radius: 20rpx;
		background-color: #ff8f49;
		color: #ffffff;
		font-size: 22rpx;
		margin-right: 20rpx;
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

	.ms_img {
		width: 100rpx;
		height: 100rpx;
	}

	.ms_tiItem:last-child {
		border-right: none;
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
</style>
