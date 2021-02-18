<template>
	<view class="index">
		<div class='head' >
			<block v-for="(item,index) in selectArr" :key='item'>
				<div :data-index = 'index' @click='onSelect'>
					{{item}}
					<div  :class="idx === index ? 'select' : ''"></div>
				</div>
			</block>
			
			<!-- <div @click='onSelectDis'>
				附近
				<div v-if='isSelect' class='select'></div>
			</div>
			<div @click='onSelectMy'>
				我的
				<div v-if='isSelect' class='select'></div>
			</div> -->
		</div>
		<div class='main'>
			<block v-for="(item,index) in loveCard" :key='index'>
				<div class='mainItem'>
					<div class='itemHead'>
						<info-card :info="item">
							<div slot='r_content' class='itemSchool' v-if="item.school !== '选择位置'">
								<i class='iconfont icon-didian'></i>{{item.school}}
							</div>
						</info-card>
					</div>
					<div>
						<div class='itemTo'>To：{{item.toobject}}</div>
						<div class='itemContent'>{{item.wishes}}</div>
						<block v-for='item2 in  item.image' :key='index'>
							<image :src='item2' class="itemImage" mode="aspectFit" @tap="onPreviewImage" :data-curren='item2' :data-images='item.image'></image>
						</block>
						<div class='giveLike'>
							<icon class="iconfont icon-dianzan_" @click="onGiveLike(item.conId)"></icon>
							<span v-if='item.userVo'>{{item.giveLike}}</span>
						</div>


					</div>
				</div>

			</block>
		</div>


		<!-- 触底begin -->
		<div v-if='!requestMore' class='noMOreTips'>暂无更多数据ψ(｀∇´)ψ</div>
		<!-- 触底end -->

		<!-- 表白按钮begin -->
		<div class='publishBtn' @click='toPublish'>
			<i class="iconfont icon-xihuan"></i>表白TA
		</div>
		<!-- 表白按钮end -->
	</view>
</template>

<script>
	let page = 1,
		rows = 10
	import infoCard from '../../../../components/infoCard.vue'
	import vipIcon from '../../../../components/vipIcon.vue'
	export default {
		data() {
			return {
				isSelect: false,
				loveCard: [],
				selectArr: ['推荐','最新','我的'],
				idx: 0,
				requestMore: true //是否还有数据
			}
		},
		components: {
			infoCard,
			vipIcon
		},
		onShow() {
			page = 1
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			this.request()
		},
		// 触底加载更多
		onReachBottom() {
			if (this.requestMore) {
				this.request()
			}

		},
		methods: {
			request() {
				let giveLike = ''
				uni.request({
					url: 'https://user.job2020.cn/details/selectWall',
					method: 'GET',
					data: {
						rows,
						page
					},
					success: (res) => {
						console.log(res.data.data,page)
						if (res.data.data.length + 1 < rows) {
							this.requestMore = false
						}
						if (res.data.data) {
							res.data.data.forEach(item => {
								if (item.userVo) {
									for (var i = 0; i < item.userVo.length; i++) {
										if (i == item.userVo.length - 1) {
											giveLike += item.userVo[i].nickName
										} else {
											giveLike += item.userVo[i].nickName + '、'
										}
									}
									item.giveLike = giveLike + '等' + item.userVo.length + '人觉得很赞'
								}

								if (item.anonymity == 'true') {
									item.nickName = '匿名用户'
									item.head = 'https://pic.job2020.cn/%E5%8C%BF%E5%90%8D.jpg'
								}
								giveLike = ''

							})
						}
						this.loveCard = this.loveCard.concat(res.data.data)
						page++
					}
				})
			},
			// 预览图片
			onPreviewImage(e) {
				console.log(e)
				uni.previewImage({
					urls: e.target.dataset.images,
					current: e.target.dataset.curren
				})
			},
			onGiveLike(conId) {
				uni.request({
					url: 'https://user.job2020.cn/details/addWallpraise',
					method: 'GET',
					data: {
						openId: getApp().globalData.uid,
						conId
					},
					success: (res) => {
						console.log(res,'1111111')
						if(res.data.data !== "点赞失败！不可重复点赞"){
							if(!this.isSelect){
								this.onSelectNew()
							}else{
								this.onSelectDis()
							}
						}
						
					}
				})
			},
			onSelect(e){
				this.idx = e.target.dataset.index
				switch (this.idx){
					case 0:
						this.onSelectNew();
						break;
					case 1:
						this.onSelectDis();
						break;
					case 2:
					this.onSelectMy()
						break;
				}
				
			},
			onSelectNew() {
				page = 1
				let giveLike = ''
				uni.request({
					url: 'https://user.job2020.cn/details/selectWall',
					method: 'GET',
					data: {
						rows,
						page
					},
					success: (res) => {
						this.loveCard = res.data.data
						if (this.loveCard) {
							this.isSelect = false
							this.loveCard.forEach(item => {
								console.log(item)
								if (item.userVo) {
									for (var i = 0; i < item.userVo.length; i++) {
										if (i == item.userVo.length - 1) {
											giveLike += item.userVo[i].nickName
										} else {
											giveLike += item.userVo[i].nickName + '、'
										}
									}
									item.giveLike = giveLike + '等' + item.userVo.length + '人觉得很赞'
								}
								if (item.anonymity == 'true') {
									item.nickName = '匿名用户'
									item.head = 'https://pic.job2020.cn/%E5%8C%BF%E5%90%8D.jpg'
								}
								giveLike = ''
							})
						}
					}
				})
			},
			onSelectDis() {
				page = 1
				uni.request({
					url: 'https://user.job2020.cn/details/schoolWall',
					method: 'GET',
					data: {
						openId: getApp().globalData.uid,
						page,
						rows
					},
					success: (res) => {
						console.log(res)
						this.loveCard = res.data.data
						this.isSelect = true
						if (this.loveCard) {
							this.loveCard.forEach(item => {
								console.log(item)
								if (item.userVo) {
									for (var i = 0; i < item.userVo.length; i++) {
										if (i == item.userVo.length - 1) {
											giveLike += item.userVo[i].nickName
										} else {
											giveLike += item.userVo[i].nickName + '、'
										}
									}
									item.giveLike = giveLike + '等' + item.userVo.length + '人觉得很赞'
								}
								if (item.anonymity == 'true') {
									item.nickName = '匿名用户'
									item.head = 'https://pic.job2020.cn/%E5%8C%BF%E5%90%8D.jpg'
								}
								giveLike = ''
							})
						}
					}
				})
				this.isSelect = true
			},
			onSelectMy(){
				uni.request({
					url:'https://user.job2020.cn/details/selectmyWall',
					method: 'GET',
					data:{
						openId: getApp().globalData.uid
					},
					success: (res) => {
						this.loveCard = res.data.data
					}
				})
			},
			toPublish() {
				uni.redirectTo({
					url: './publishLoveWall'
				})
			},
		}
	}
</script>

<style scoped>
	.index {
		width: 670rpx;
		margin: 0 auto;
	}

	.head {
		display: flex;
		width: 270rpx;
		margin-top: 30rpx;
		justify-content: space-between;
		/* align-items: center; */
	}

	.select {
		width: 30rpx;
		height: 6rpx;
		border-radius: 5rpx;
		background-color: #f3ace7;
		margin: 6rpx auto;
	}

	.noSelect {
		border-bottom: 2rpx solid #f3ace7;
	}

	.mainItem {
		border-bottom: 10rpx solid #EEEEEE;
	}

	.mainItem:last-child {
		border: none;
	}

	.itemSchool {
		width: 200rpx;
		height: 40rpx;
		border-radius: 20rpx;
		background-color: #eaeff5;
		font-size: 20rpx;
		text-align: center;
		line-height: 40rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.itemTo {
		color: #f3ace7;
		font-weight: 600;
		padding-top: 20rpx;
		border-top: 2rpx solid #EEEEEE;
	}

	.itemContent {
		font-size: 28rpx;
		color: #909399;
		margin: 20rpx 0rpx;

	}

	.itemImage {
		width: 210rpx;
		height: 210rpx;
		margin-right: 10rpx;
	}

	.publishBtn {
		width: 120rpx;
		height: 120rpx;
		text-align: center;
		font-size: 20rpx;
		color: #FFFFFF;
		border-radius: 50%;
		background-image: linear-gradient(to bottom right, #fcb66b, #fe5cb6);
		position: fixed;
		right: 0;
		bottom: 100rpx;
	}

	.icon-xihuan {
		font-size: 50rpx;
		line-height: 70rpx;
	}

	.icon-didian {
		display: inline;
		margin-right: 5rpx;
		color: #f3ace7;
		font-size: 20rpx;
	}

	.icon-dianzan_ {
		margin-right: 10rpx;
	}

	.giveLike {
		margin-bottom: 30rpx;
		color: #345e87;
		font-size: 26rpx;
	}

	.noMOreTips {
		text-align: center;
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #C0C4CC;
	}
</style>
