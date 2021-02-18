<template>
	<view>
		<!-- 轮播组件begin -->
			<div class="swiper">
				<image :src="imageArr[0]" @click="toAddCompany"></image>
			</div>
				
		<!-- 轮播组件end -->
		
		<!-- 筛选begin -->
			<div class='screeningTags'>
				<picker mode="region" @change='onSelectCity'>{{currentCity[1]}}<icon class="iconfont icon-youxiatianchong" ></icon></picker>
				<picker :value="majorIndex" :range="majorArr" @change="onScreeningMajor">{{majorArr[majorIndex]}}<icon class="iconfont icon-youxiatianchong" ></icon></picker>
				<picker :value="scaleIndex" :range="scaleArr" @change="onScreeningSca">{{scaleArr[scaleIndex]}}<icon class="iconfont icon-youxiatianchong" ></icon></picker>
			</div>
		<!-- 筛选end -->
		
		<!-- 企业begin -->
		<div>
			<block v-for="(item,index) in showData" :key='item.cid'>
				<div class='companyCard'>
					<div class='cardLayout'>
						<image :src='item.image' ></image>
						<div class='cardRight'>
							<div>{{item.name}}</div>
							<div>{{item.addr}} | {{item.scale}} | {{item.industry}}</div>
							<div>
								<image src='https://pic.job2020.cn/%E4%BA%94%E6%98%9F.png' mode="widthFix"></image><span>{{item.grade}}分</span> | {{item.sum}}点评
							</div>
							<div @click='toEditReview(item.cid)'>
								<div class='reviewBtn'>点评</div>
								<div class='reviewContent'>
									{{item.introduce}}
								</div>
								<icon class="iconfont icon-xiangyou1"></icon>
							</div>
						</div>
					</div>
					
				</div>
			</block>
		</div>
		<!-- 企业end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageArr: ['https://pic.job2020.cn/%E4%BC%81%E4%B8%9A%E6%B7%BB%E5%8A%A0.png',], //轮播数据
				majorArr: [
					'全部',
					'计算机',
					'电子',
					'通讯',
					'硬件',
					'金融',
					'生活服务',
					'汽车',
					'交通',
					'贸易',
					'物流',
					'专业服务',
					'广告',
					'传媒',
					'文化',
					'房地产',
					'建筑',
					'机械',
					'制造',
					'能源',
					'化工',
					'环保',
					'消费品',
					'制药',
					'医疗',
					'教育',
					'培训'

				],
				scaleArr: ['规模','0-20人','20-99人','100-499人','500-999人','1000-9999人','10000人以上'],
				scaleIndex: 0,
				majorIndex: 0,
				currentCity: ['湖北','武汉','洪山区'],
				showData: [],
			}
		},
		onLoad() {
			uni.request({
				url:'https://company.job2020.cn/company/selectAll',
				method:'GET',
				data:{
					page: 1,
					rows: 10,
				},
				success: (res) => {
					console.log(res)
					this.showData = res.data.data.rows
				}
			})
		},
		methods: {
			// 城市筛选
			onSelectCity(e){
				console.log(e.detail.value)
				this.currentCity = e.detail.value
				uni.request({
					url:'https://company.job2020.cn/company/selectAll',
					data:{
						page: 1,
						rows: 10,
						addr: this.currentCity,
						industry: this.majorArr[this.majorIndex],
						scale: this.scaleArr[this.scaleIndex]
					},
					success: (res) => {
						this.showData = res.data.data.rows
					}
				})
			},
			// 专业筛选
			onScreeningMajor(e){
				this.majorIndex = e.detail.value
				console.log(this.currentCity)
				console.log(this.majorArr[this.majorIndex])
				console.log(this.scaleArr[this.scaleIndex])
				uni.request({
					url:'https://company.job2020.cn/company/selectAll',
					data:{
						page: 1,
						rows: 10,
						addr: this.currentCity,
						industry: this.majorArr[this.majorIndex],
						scale: this.scaleArr[this.scaleIndex]
					},
					success: (res) => {
						console.log(res)
						this.showData = res.data.data.rows
					}
				})
			},
			// 规模筛选
			onScreeningSca(e){
				this.scaleIndex = e.detail.value
				uni.request({
					url:'https://company.job2020.cn/company/selectAll',
					data:{
						page: 1,
						rows: 10,
						addr: this.currentCity,
						industry: this.majorArr[this.majorIndex],
						scale: this.scaleArr[this.scaleIndex]
					},
					success: (res) => {
						this.showData = res.data.data.rows
					}
				})
			},
			// 前往添加企业
			toAddCompany(){
				uni.navigateTo({
					url: './addBusiness'
				})
			},
			// 前往点评
			toEditReview(cid){
				console.log(cid)
				uni.navigateTo({
					url:`./editReview?cId=${cid}`
				})
			}
		}
	}
</script>

<style scoped>
	.swiper {
		height: 250rpx;
		width: 670rpx;
		margin: 20rpx auto 40rpx;
	}
	
	.swiper image {
		width: 100%;
		height: 250rpx;
		border-radius: 16rpx;
	}
	.screeningTags{
		display: flex;
		width: 670rpx;
		margin: 0 auto;
		padding-bottom: 20rpx;
		
	}
	.screeningTags picker{
		background-color: #f5f5f5;
		margin-right: 20rpx;
		text-align: center;
		padding: 0rpx 10rpx;
		border-radius: 10rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: #909399;
	}
	.icon-youxiatianchong{
		display: inline;
		font-size: 10rpx;
		margin-left: 5rpx;
	}
	
	.companyCard{
		border-bottom: 12rpx solid #eeeeee;
	}
	.companyCard:first-child{
		border-top: 2rpx solid #eeeeee;
	}
	.cardLayout{
		width: 670rpx;
		margin: 20rpx auto;
		display: flex;
	}
	.cardLayout  image{
		width: 150rpx;
		height: 150rpx;
		margin-right: 20rpx;
	}
	.cardRight{
		flex: 1;
	}
	.cardRight div:nth-child(2){
		font-size: 24rpx;
		color: #909399;
		margin-top: 10rpx;
	}
	.cardRight div:nth-child(3){
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #909399;
		margin-top: 10rpx;
	}
	.cardRight div:nth-child(3) image{
		width: 130rpx;
		height: 22rpx;
	}
	.cardRight div:nth-child(3) span{
		font-size: 22rpx;
		color: #ffb530;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}
	.cardRight div:nth-child(4){
		display: flex;
	}
	.reviewBtn{
		width: 80rpx;
		height: 32rpx;
		border-top-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
		border-top-right-radius: 4rpx;
		border-bottom-left-radius: 4rpx;
		margin-right: 6rpx;
		margin-top: 14rpx;
		background-color: #44a1ff;
		color: #ffffff;
		font-size: 22rpx;
		line-height: 32rpx;
		text-align: center;
	}
	.reviewContent{
		flex: 1;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
