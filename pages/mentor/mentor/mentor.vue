<template>
	<view class="mian">
		
		<!-- 通告栏begin -->
		<slidingNotice :url="url">
			<div slot='marquee_right'>
				<image src='https://pic.job2020.cn/%E6%8A%BD%E7%AD%BE_1.png' class="slide_img" @click='toDraw'></image>
			</div>
		</slidingNotice>
		<!-- 通告栏end -->
		
		<!-- 轮播组件begin -->
		<swiper indicator-dots circular autoplay="true" indicator-active-color="#44a1ff" class="swiper">
			<swiper-item v-for="(item,index) in swiperArr" :key="item">
				<image :src="item"></image>
			</swiper-item>
		</swiper>
		<!-- 轮播组件end -->
		<!-- 分类导航-begin -->
		<div class="navagitorBar">
			<navigator url="../schoolList/schoolList" hover-class="none">
				<image src="https://pic.job2020.cn/%E9%AB%98%E6%A0%A1%E6%8E%92%E8%A1%8C_1.png "></image>
				<div>高校排行</div>
			</navigator>
			<navigator url="../announcement/announcement" hover-class="none">
				<image src="https://pic.job2020.cn/%E5%85%AC%E5%91%8A_1.png" ></image>
				<div>公告</div>
			</navigator>
			<navigator url="../questionnaire/questionnaire" hover-class="none">
				<image src="https://pic.job2020.cn/%E5%B0%B1%E4%B8%9A%E9%97%AE%E5%8D%B7_1.png" ></image>
				<div>就业问卷</div>
			</navigator>
			<navigator url="../businessReview/businessReview" hover-class="none" >
				<image src="https://pic.job2020.cn/%E6%9B%B4%E5%A4%9A_1.png" ></image>
				<div>企业点评</div>
			</navigator>
		</div>

		<!-- 导师分类导航begin -->
		<div class='classification'>
			<div>
				<block v-for="(item,index) in selectTags" :key='item'>
					<span :class="currentNavIdx == index ? 'isSelectTags':'noSelectTags'" @click='onToggle(index)'>{{item}}</span>
				</block>

			</div>
			<div class='filterBox'>
				<picker :value="majorIndex" :range="majorArr" @change="onScreeningMajor">{{majorArr[majorIndex]}}<icon class="iconfont icon-youxiatianchong" ></icon></picker>
				<picker :value="workexIndex" :range="workExperience" @change="onScreeningExp">{{workExperience[workexIndex]}}<icon class="iconfont icon-youxiatianchong" ></icon></picker>
			</div>
		</div>
		<!-- 导师分类导航end -->

		<!-- 导师卡片begin -->
		<div class="mentorCard">
			<block v-for="(item,index) in mentorData" :key="item.tid">
				<div class="cardItem" @click='toDetail(item)'>
					<div class="cardItem_r">
						<image :src="item.image"></image>
					</div>
					<div class="cardItem_l">
						<div class="cardItem_l1">
							<div><span>{{item.name}}</span><span>{{item.position}}</span></div>
							<div>
								<image :src="item.starLevel" style="width: 160rpx ;height: 26rpx;margin-right: 10rpx;"
								 mode="widthFix"></image>
							</div>
						</div>
						<div class="cardItem_l2">{{item.workYear}}年经验 | {{item.industry}} | {{item.addr}}</div>
						<div class="cardItem_l2">{{item.school}}</div>
						<div class="cardItem_l2">{{item.company}}</div>
						<div class="cardItem_l3" >预约指导</div>
					</div>
				</div>
			</block>

		</div>
		<!-- 导师卡片end -->
		
		<mask :maskShow='maskShow'>
			<div class="cardImg" >
				<div  @click="onClose"><icon class="iconfont icon-shanchu"></icon></div>
				<image :src='murl' mode="widthFix"></image>
				
			</div>
		</mask>
		
		<!-- 触底begin -->
			<div v-if='!requestMore' class='noMOreTips'>到底了ψ(｀∇´)ψ</div>
		<!-- 触底end -->
	</view>
</template>

<script>
	import slidingNotice from '../../../components/slidingNotice.vue'
	import mask from '../../../components/mask.vue'
	let page = 1,
		rows = 10
		
	export default {
		data() {
			return {
				swiperArr: [
					'https://pic.job2020.cn/%E8%BD%AE%E6%92%AD_3.png',
					'https://pic.job2020.cn/%E8%BD%AE%E6%92%AD_2.png',
					'https://pic.job2020.cn/%E8%BD%AE%E6%92%AD_1.png',
					
				], //轮播数据
				selectTags: ['推荐', '最新', '人气'],
				majorArr: [
					'行业',
					'计算机',
					'互联网',
					'通信',
					'电子',
					'销售',
					'客服',
					'会计',
					'金融',
					'银行',
					'保险',
					'生产',
					'营运',
					'采购',
					'物流',
					'生物',
					'制药',
					'化工',
					'医疗',
					'广告',
					'市场',
					'媒体',
					'艺术',
					'建筑',
					'房地产',
					'人事',
					'行政',
					'高级管理',
					'咨询',
					'法律',
					'教育',
					'科研',
					'服务业',
					'政府机构',
					'翻译'
				],
				majorIndex: 0,
				workExperience:['经验','1年','3年','5年','8年','10年'],
				workexIndex:0,
				currentNavIdx: 0, // 头部导航索引
				mentorData: [], //导师信息
				url: 'https://user.job2020.cn/details/userscrollbar',
				requestMore: true ,//是否还有数据
				maskShow: false,
				murl: ''
			}
		},
		onLoad() {
			console.log(uni.getStorageSync('uid'))
			uni.request({
				url:'https://teacher.job2020.cn/teacher/select',
				method: "GET",
				data: {
					page,
					rows,
					selection:this.selectTags[0],
				},
				success: (res) => {
					console.log(res)
					page++
					this.mentorData = res.data.data.rows
					uni.request({
						url:'https://user.job2020.cn/details/popupad',
						method:'GET',
						success: (res) => {
							console.log(res)
							this.murl = res.data.data.advertise
							this.maskShow = true
						}
						
					})
					
				}
			})
			
			
		},
		// 触底加载更多
		onReachBottom(){
		 if(this.requestMore){
			uni.request({
				url:'https://teacher.job2020.cn/teacher/select',
				method: "GET",
				data: {
					page,
					rows,
					selection:this.selectTags[this.currentNavIdx],
					workYear: this.workExperience[this.workexIndex],
					industry: this.majorArr[this.majorIndex],
				},
				success: (res) => {
					if(res.data.data.rows.length+1 < rows){
								this.requestMore = false
						}
					this.mentorData = this.mentorData.concat(res.data.data.rows)
							console.log(this.mentorData)
							page++
				}
			})
		 }
		 
		},
		methods: {
			// 关闭弹出层
			onClose(){
				this.maskShow =false
			},
			// 前往抽签
			toDraw(){
				console.log(1)
				uni.navigateTo({
					url: '../announcement/activityTwo/activityTwo'
				})
			},
			// 切换排行
			onToggle(idx) {
				page = 0
				this.currentNavIdx = idx
				console.log(this.selectTags[this.currentNavIdx])
				uni.request({
					url:'https://teacher.job2020.cn/teacher/select',
					method: "GET",
					data: {
						selection:this.selectTags[this.currentNavIdx],
						workYear: this.workExperience[this.workexIndex],
						industry: this.majorArr[this.majorIndex],
						page: 1,
						rows: 10
					},
					success:(res)=> {
						this.mentorData = res.data.data.rows
						console.log(res)
					}
				})
			},
			onScreeningMajor(e){
				this.majorIndex = e.target.value
				uni.request({
					url:'https://teacher.job2020.cn/teacher/findTeacher',
					method:'GET',
					data:{
						workYear: this.workExperience[this.workexIndex],
						industry: this.majorArr[this.majorIndex],
						page: 1,
						rows: 10,
					},
					success:(res)=> {
						console.log(res)
						this.mentorData = res.data.data.rows
						
					}
				})
			},
			onScreeningExp(e){
				this.workexIndex = e.target.value
				uni.request({
					url:'https://teacher.job2020.cn/teacher/findTeacher',
					method:'GET',
					data:{
						industry: this.majorArr[this.majorIndex],
						workYear: this.workExperience[this.workexIndex],
						page: 1,
						rows: 10,
					},
					success:(res)=> {
						console.log(res)
						this.mentorData = res.data.data.rows
					}
				})
			},
			getCurrentIndex(res) {
				console.log(res)
			},
			// 跳转到导师详情
			toDetail(item) {
				console.log(item.tid)
				uni.navigateTo({
					url: `../mentorDetail/mentorDetail?tid=${item.tid}`
				})
			}
		},
		components: {
			slidingNotice,
			mask
		},
	}
</script>

<style scoped>
	.headNav {
		width: 670rpx;
		height: 67rpx;
		margin: 10rpx auto;
		display: flex;
		justify-content: space-between;
		color: #666666;
		
	}

	.swiper {
		height: 250rpx;
		width: 670rpx;
		margin: 20rpx auto;
	}

	swiper-item image {
		height: 250rpx;
		width: 670rpx;
		border-radius: 16rpx;
	}

	.activeNavItem {
		border-bottom: 4rpx solid #99CCFF;
	}

	.classification {
		border-top: 10rpx solid #eeeeee;
		border-bottom: 2rpx solid #EEEEEE;
		height: 100rpx;
		padding: 0rpx 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #606266;
		font-size: 28rpx;
	}
	.filterBox{
		display: flex;
	}
	.filterBox picker{
		margin-left: 30rpx;
	}
	.classification div {
		height: 100rpx;
		line-height: 100rpx;
		color: #909399;
	}

	

	.isSelectTags {
		font-size: 34rpx;
		font-weight: 600;
		margin-right: 20rpx;
		color: #303133;
	}

	.noSelectTags {
		margin-right: 20rpx;
		color: #606266;
	}

	.icon-youxiatianchong {
		font-size: 14rpx;
		margin-left: 6rpx;
		color: #909399;
	}

	.navagitorBar {
		width: 670rpx;
		margin: 40rpx auto;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	.navagitorBar navigator image{
		width: 90rpx;
		height: 90rpx;
	}
	.navagitorBar navigator div {
		text-align: center;
		font-size: 24rpx;
		color: #808080;
	}

	.cardItem {
		display: flex;
		width: 670rpx;
		height: 350rpx;
		margin: 20rpx auto;
		border: 2rpx solid #F8F8F8;
		box-shadow: 6rpx -6rpx 5rpx #F8F8F8 inset;
		padding: 20rpx 10rpx 0rpx;
		border-radius: 10rpx;
	}

	.cardItem_r image {
		width: 190rpx;
		height: 300rpx;
		border-radius: 10rpx;
	}

	.cardItem_l {
		flex: 1;
		height: 300rpx;
		margin-left: 15rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.cardItem_l1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.cardItem_l1 span:first-child {
		font-size: 36rpx;
	}

	.cardItem_l1 span:nth-child(2) {
		font-size: 22rpx;
		color: #909399;
		margin-left: 16rpx;
	}

	.cardItem_l2 {
		font-size: 28rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		color: #C0C4CC;
	}

	.cardItem_l3 {
		width: 148rpx;
		height: 60rpx;
		background-color: #99ccff;
		color: #FFFFFF;
		font-size: 26rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 10rpx;
	}
	.noMOreTips{
		text-align: center;
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #C0C4CC;
	}
	
	.slide_img{
		width: 100rpx;
		height: 100rpx;
		animation: shake 3s linear infinite;
	}
	.cardImg{
		position: fixed;
		top: calc(50% - 400rpx);
		left: calc(50% - 275rpx);
	}
	.cardImg image{
		width: 550rpx;
		height: 550rpx;
	}
	.cardImg div{
		
		font-weight: 600;
		color: #ffffff;
		text-align: right;
	}
	.icon-shanchu{
		font-size: 50rpx;
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
