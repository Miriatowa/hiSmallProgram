<template>
	<view>
		<!-- 通告栏begin -->
		<slidingNotice :url='url'>
			<div slot='marquee_right'>
				<image src='https://pic.job2020.cn/%E9%9B%86%E5%8D%A1_1.png' class="slide_img" @click='toDraw' mode="aspectFit"></image>
			</div>
		</slidingNotice>
		<!-- 通告栏end -->
		
		<!-- 筛选标签begin -->
		<div class="filterTags">
			<picker :range="allFood" :value="foodIndex" @change="onSelectFood"><view>{{allFood[foodIndex]}}<icon class="iconfont icon-xiangxia1"></icon></view></picker>
			<picker :range="area" :value="areaIndex" range-key='name' @change="onSelectArea"><view>{{area[areaIndex].name}}<icon class="iconfont icon-xiangxia"></icon></view></picker>
			<span  @click="onSelectRec">智能排序<icon class="iconfont icon-iconsfsx"></icon></span>
			<!-- <span @click="onSelectNew">筛选<icon class="iconfont icon-xiangxia1"></icon></span> -->
		</div>
		<!-- 筛选标签end -->
		<div class='addBanner' @click="onAddMerchants">
			<image src="https://pic.job2020.cn/%E6%B7%BB%E5%8A%A0%E5%95%86%E6%88%B7.png" mode="widthFix"></image>
		</div>
		
			<!-- 导师卡片begin -->
			<div class="mentorCard" >
				<block v-for="(item,index) in mentorData" :key="index">
					<div class="cardItem" @click='toDetail(item)'>
						<div class="itemTop">
							<image class='itemBox_l' :src="item.image" mode="scaleToFill"></image>
							<div class="itemBox_r">
								<div>{{item.name}}</div>
								<div><image src="https://pic.job2020.cn/%E4%BA%94%E6%98%9F.png"  mode="widthFix" class="itemBox_r_m"></image><span class="textStyle">{{item.type}}</span></div>
								<div class="textStyle"><span>{{item.addr}}</span></div>
							</div>
						</div>
						<div class="itemBottom">
							推荐理由：{{item.reason}}
						</div>
					</div>
				</block>
				
			</div>
			<!-- 导师卡片end -->
			<!-- 触底begin -->
				<div v-if='!requestMore' class='noMOreTips'>到底了ψ(｀∇´)ψ</div>
			<!-- 触底end -->
	</view>
</template>

<script>
	let page = 1
	let rows = 10
	import slidingNotice from '../../../components/slidingNotice.vue'
	export default {
		data() {
			return {
				isSelect:true,
				// 美食分类
				allFood:['热销美食','饮品','甜点','快餐简餐','小吃','中式菜肴','火锅','全球美食'],
				foodIndex:0,
				// 区域分类
				area:[],
				areaIndex:0,
				mentorData:[],
				requestMore: true,
				url:'https://user.job2020.cn/details/mercscrollbar'
			}
		},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			if(getApp().globalData.uid){
				uni.request({
					url:'https://company.job2020.cn/school/findHeat',
					method:'GET',
					success: (res) => {
						res.data.unshift({name: '高校'})
						this.area = res.data
					}
				})
				uni.request({
					url:"https://company.job2020.cn/merchant/query",
					method:"GET",
					data:{
						page,
						rows,
						school:'',
						type: '',
						sort:''
					},
					success: (res) => {
						console.log(res.data.data)
						this.mentorData=res.data.data.rows
						page++
					}
				})
			}else{
				uni.showModal({
				    title: '温馨提示',
				    content: '亲，本产品需登录方可使用...',
					showCancel: false,
					confirmText: '前往登录',
					confirmColor:'#44a1ff',
				    success: (res) => {
				        if (res.confirm) {
				           uni.navigateTo({
				           	url:'/pages/home/registered/identityChoice/identityChoice'
				           })
				        } 
				    }
				})
			}
			
			
		},
		// 触底加载更多
		onReachBottom(){
		 if(this.requestMore){
			uni.request({
				url:'https://company.job2020.cn/merchant/query',
				method: "GET",
				data: {
					page,
					rows,
					school: this.area[this.areaIndex].name,
					type: this.allFood[this.foodIndex],
					sort:'',
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
		components:{slidingNotice},
		methods: {
			// 跳转到集卡
			toDraw(){
				uni.navigateTo({
					url:'../../mentor/announcement/activityOne/activityOne'
				})
			},
			// 跳转到详情
			toDetail(item){
				uni.navigateTo({
					url:`./merchantsInfo/merchantsInfo?id=${item.merId}`
				})
			},
			// 添加商户
			onAddMerchants(){
				uni.navigateTo({
					url: '../addMerchants/addMerchants'
				})
			},
			// 智能排序
			onSelectRec(){
				uni.request({
					url:'https://company.job2020.cn/merchant/query',
					method:'GET',
					data:{
						page:1,
						rows:10,
						// school: '',
						// type: '',
						sort:'智能排序'
					},
					success: (res) => {
						console.log(res)
						this.mentorData=res.data.data.rows
					}
				})
				this.isSelect=true
			},
			onSelectFood(e){
				this.foodIndex = e.detail.value
				uni.request({
					url:'https://company.job2020.cn/merchant/query',
					method:'GET',
					data:{
						page: 1,
						rows: 10,
						school: this.area[this.areaIndex].name,
						type: this.allFood[this.foodIndex],
						sort:''
					},
					success: (res) => {
						console.log(res)
						this.mentorData = res.data.data.rows
					}
				})
			},
			// 学校筛选
			onSelectArea(e){
				console.log(e.detail.value)
				this.areaIndex = e.detail.value
				uni.request({
					url:'https://company.job2020.cn/merchant/query',
					method:'GET',
					data:{
						school: this.area[this.areaIndex].name,
						page: 1,
						rows: 10,
						type: this.allFood[this.foodIndex],
						sort:''
					},
					success: (res) => {
						console.log(res)
						this.mentorData = res.data.data.rows
					}
				})
			},
			onSelectNew(){
				this.isSelect=false
			},
		}
	}
</script>

<style scoped>
	.headTags{
		height: 104rpx;
		/* width: 100%; */
		background-color: #99CCFF;
		color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0rpx 40rpx;
	}
	.jobTags{
		font-weight: 600;
	}
	.icon-xiangxia1{
		font-size: 22rpx;
		margin-left: 8rpx;
	}
	.icon-xiangxia{
		font-size: 16rpx;
		margin-left: 8rpx;
	}
	.filterTags{
		width: 670rpx;
		height: 80rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
	}
	.categoryLabels{
		display: inline-block;
		height: 50rpx;
		width: 100rpx;
		font-size: 28rpx;
		background-color: #F5F5F5;
		border-radius: 10rpx;
		text-align: center;
		line-height: 50rpx;
		color: #808080;
		margin-right: 10rpx;
		position: relative;
	}
	.icon-youxiatianchong{
		position: absolute;
		font-size: 12rpx;
		right: 8%;
		bottom: -%10;
		color: #808080;
	}
	.addBanner{
		width: 670rpx;
		margin: 30rpx auto;
	}
	.addBanner image{
		width: 100%;
		border-radius: 20rpx;
	}
	.mentorCard{
		
	}
	.cardItem{
		width: 670rpx;
		margin: 20rpx auto;
		border: 2rpx solid #F8F8F8;
		box-shadow: 6rpx -6rpx 5rpx #F8F8F8 inset;
		padding: 20rpx 10rpx 0rpx;
		border-radius: 10rpx;
	}
	.itemTop{
		display: flex;
		/* justify-content: space-between; */
	}
	.itemBottom{
		margin-top: 30rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx ;
		border-top: 2rpx solid #f5f5f5;
		font-size: 26rpx;
		color: #999999;
	}
	.itemBox_l{
		width: 160rpx;
		height: 160rpx;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx #EEEEEE;
		margin-left: 10rpx;
	}
	.itemBox_r{
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.itemBox_r_m{
		width: 126rpx;
		height: 26rpx;
		margin-right: 20rpx;
	}
	.textStyle{
		font-size: 26rpx;
		color: #999999;
	}
	.cardItem_l{
		flex: 1;
		height: 300rpx;
		margin-left: 15rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.cardItem_l1{
		display: flex;
		justify-content: space-between;
	}
	.cardItem_l1 span:first-child{
		font-size: 36rpx;
	}
	.cardItem_l1 span:nth-child(2){
		font-size: 22rpx;
		color: #808080;
		margin-left: 16rpx;
	}
	.cardItem_l2{
		font-size: 28rpx;
	}
	.cardItem_l3{
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
	}
</style>
