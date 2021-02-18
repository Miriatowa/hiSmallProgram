<!-- @name: 抽奖组件 -->
<!-- @author: Miraitowa -->
<!-- @version: 1.0 -->
<!-- @dataTime: 2020-1-2 -->

<template>
	<view class="ld_main">
		<image src='https://pic.job2020.cn/%E6%8A%BD%E5%A5%96_8.png' class='ld_myRec'></image>
		<div class='id_level' @click='onSelectIndex'>
			<div :class="levelIndex === '0' ? 'id_level_active' : '' " data-idx='0'>2积分场</div>
			<div :class="levelIndex === '1' ? 'id_level_active' : '' " data-idx='1'>5积分场</div>
			<div :class="levelIndex === '2' ? 'id_level_active' : '' " data-idx='2'>9积分场</div>
		</div>
		<div class='ld_container'>
			<block v-for="(item,index) in  drContent.array" :key='index'>
				<div :class="curIndex === index ? 'ld_item active' : 'ld_item'" @click='flag && onStart(index)'>
					<image :src='item.image' class="ld_item_img"></image>
				</div>
			</block>
		</div>
		<div class="ld_notice">
			<block v-for="(item,index) in  drContent.drawscrollbar" :key='index'>
				<div :class="{id_noticeAct:animate}">{{item.scroll}}</div>
			</block>
		</div>
	</view>
</template>

<script>
	let timer = null
	export default {
		data() {
			return {
				drContent: [], //抽奖内容
				curIndex: 0, //当前索引
				flag: true,
				animate: false,
				levelIndex: '0', //场次索引
				level: ['2积分场', '5积分场', '9积分场']
			}
		},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.request({
				url: 'https://user.job2020.cn/money/showdraw',
				method: 'GET',
				data: {
					session: this.level[this.levelIndex]
				},
				success: (res) => {
					this.drContent = res.data.data
					timer = setInterval(this.showMarquee, 2000);
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
			// 切换积分场次
			onSelectIndex(e) {
				console.log(e.target.dataset.idx)
				if (e.target.dataset.idx != undefined) {
					this.levelIndex = e.target.dataset.idx
					uni.request({
						url: 'https://user.job2020.cn/money/showdraw',
						method: 'GET',
						data: {
							session: this.level[this.levelIndex]
						},
						success: (res) => {
							clearInterval(timer)
							this.drContent = res.data.data
							timer = setInterval(this.showMarquee, 2000);
							console.log(this.drContent.drawscrollbar)
						}
					})
				}
			},
			showMarquee() {
				this.animate = true;
				setTimeout(() => {
					this.drContent.drawscrollbar.push(this.drContent.drawscrollbar[0]);
					this.drContent.drawscrollbar.shift();
					this.animate = false;
				}, 1500);
			},
			// 开始抽奖
			onStart(idx) {
				// 顺时针顺序
				let index = [0, 1, 2, 5, 8, 7, 6, 3]
				let i = 0,
					j = 0,
					k = 0
				if (idx == '4') {
					uni.request({
						url: 'https://user.job2020.cn/money/integraldraw',
						method: 'GET',
						data: {
							openId: getApp().globalData.uid,
							session: this.level[this.levelIndex]
						},
						success: (res) => {
							console.log(res.data.data)
							k = res.data.data.indexes
							if (res.data.data.code == 0) {
								this.flag = false
								uni.showModal({
									title: '温馨提示',
									content: '今日抽奖已达上限'
								})
							}else if(res.data.data.code == 2){
								uni.showModal({
									title:'温馨提示',
									content: '积分不足，请前往充值',
									success: (res) => {
										if(res.confirm){
											uni.navigateTo({
												url: '../../profile/buyCredits/buyCredits'
											})
										}
									}
								})
							} else {
								var timer = setInterval(() => {
									i++
									if (i === 8) {
										j++
										i = 0

									}
									// 退出抽奖
									if (i === k && j === 6) {
										setTimeout(() => {
											uni.showModal({
												title: '温馨提示',
												content: '今天运气不佳呢，再接再厉'
											})
										}, 1000)

										clearInterval(timer)

									}
									this.curIndex = index[i]
								}, 100)
							}
						}
					})



				}


			}
		}
	}
</script>


<style scoped>
	.ld_main {
		position: relative;
		height: 1800rpx;
		background-image: url('https://pic.job2020.cn/%E6%8A%BD%E5%A5%96_9.png');
		background-repeat: no-repeat;
		background-origin: left top;
		background-size: 100% 100%;
	}

	.ld_myRec {
		position: absolute;
		left: 220rpx;
		top: 500rpx;
		width: 300rpx;
		height: 70rpx;
	}

	.id_level {
		display: flex;
		justify-content: space-between;
		position: absolute;
		left: 40rpx;
		top: 630rpx;
		width: 670rpx;
		color: #ffffff;
	}

	.id_level_active {
		font-weight: 600;
		color: #54c2fe;
		font-size: 36rpx;
	}

	.ld_container {
		position: absolute;
		left: 85rpx;
		top: 700rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		width: 600rpx;
		height: 600rpx;
	}

	.ld_item_img {
		margin-top: 10rpx;
		width: 150rpx;
		height: 150rpx;
		border-radius: 30rpx;
	}

	.ld_item {
		width: 170rpx;
		height: 170rpx;
		border-radius: 30rpx;
		line-height: 200rpx;
		text-align: center;
		background-color: #ffffff;
		box-shadow: 0 10rpx 10rpx 2rpx #f5f1ee;
		margin-right: 10rpx;
		margin-top: 10rpx;
	}

	.ld_item:nth-child(5) {
		background-color: #5aa6ff;
		box-shadow: 0 16rpx 2rpx 0rpx #2f8fff;
		color: #ffffff;
		font-size: 40rpx;
		text-wrap: wrap
	}

	.active {
		background-color: #f5f1ee;
	}

	.ld_notice {
		position: absolute;
		left: 40rpx;
		top: 1420rpx;
		width: 670rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 40rpx;
		font-size: 26rpx;
		color: #849eec;
		text-align: center;
		background-color: #0538d9;
		overflow: hidden;
	}

	.id_noticeAct {
		transition: all 0.5s;
		margin-top: -30rpx;


	}
</style>
