<template>
	<view>
		<div class="top">
			<!-- 轮播图模块 -->
			<swiper indicator-dots circular autoplay="true" indicator-active-color="#44a1ff" class="swiper">
			    <swiper-item  v-for="(item,index) in swiperArr" :key="index">
			      <image :src="item.image" mode="widthFix"></image>
			    </swiper-item>
			  </swiper>
			 
			 <!-- 信息模块 -->
			 <div class="top_mid">
				 <div class="merchantsName">{{allData.name}}</div>
				 <div>
					 <image src="https://pic.job2020.cn/%E4%BA%94%E6%98%9F.png" class="merchantsStar"></image>
					 <span class="merchantsStarNum">{{allData.starLevel}}</span>
				 </div>
				 <div class="otherScore">
					 <div>
						<span>口味:{{allData.taste}}</span>
						<span>环境:{{allData.environment}}</span>
						<span>服务:{{allData.serve}}</span>
						<span>食材:{{allData.ingredient}}</span>
					 </div>
					 <span>{{allData.type}}</span>
				 </div>
				 <div class="merchantsTme">
					 <icon class="iconfont icon-shijian" style="margin-right: 10rpx;"></icon>营业时间：{{allData.businessTime}}
				 </div>
				 <div class="merchantsTme">
					 <icon class="iconfont icon-didian"  style="margin-right: 10rpx;"></icon>{{allData.addr}}
				 </div>
			 </div>
		</div>
		
		<!-- 用户评论模块 -->
		<div class="bottom">
			<div class="comment">
				<div class="commentTitle">
					<span>用户投票 (<span style="font-size: 26rpx;color: #666666;">{{commentData.length}}</span>)</span>
					<icon class="iconfont icon-xiangyou1"></icon>
				</div>
				<!-- <div class="commentTags">
					<div>味道赞</div>
					<div>服务热情</div>
					<div>环境很好</div>
				</div> -->
				<!-- 评论卡片 -->
				<div class='commentCard'>
					<block v-for="(item,index) in commentData" :key="item.comId">
						<div class='voteCard'>
							<info-card :info="item">
									<span slot="lb_content" class='card_school'>{{item.school}}</span>
							</info-card>
							<div class='card_title'>{{item.title}}</div>
							<div >
								<block v-for="(item2,index) in item.or" :key='item'>
								<div class='card_progress'>{{item2.options}}<progress :percent="item2.percent" active stroke-width="6" border-radius='4' backgroundColor="#999"  activeColor='#44A1FF' show-info  /></div>
								</block>
								
							</div>
							<div><button class="voteBtn" @click="toVote" :data-id= 'item.mvoId' v-if='item.sta == 0'>参与投票</button></div>
							<!-- <div style='height: 30rpx;'></div> -->
						</div>
						
					</block>
					<div style='height: 100rpx;'></div>
					
				</div>
				<!-- 评论组件 -->
				<div class='commentComponment'>
					<div @click="onAddComment"><icon class="iconfont icon-toupiao"></icon><div>发起投票</div></div>
					<div @click="onAddCollection" v-if="!isCollection">
						<icon class="iconfont icon-shoucang1"></icon><div>收藏</div>
					</div>
					<div @click="onReduceCollection" v-if='isCollection'>
						<icon class="iconfont icon-guanzhu"></icon><div>取消收藏</div>
					</div>
					
					<div><icon class="iconfont icon-fenxiang_2"></icon><div>分享</div><button open-type="share" class="shareBtn">分享</button></div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	let page = 1
	let rows = 10
	import infoCard from '../../../../components/infoCard.vue'
	export default {
		data() {
			return {
				allData:'',  //商家信息数据
				swiperArr: [],  //商家轮播数据
				isCollection: false,  //是否收藏
				merchantsId: '',
				commentData:[]
			}
		},
		components:{infoCard},
		onLoad(option) {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			this.merchantsId=option.id
			// 获取商家轮播图
			uni.request({
				url: `https://company.job2020.cn/merchantalbum/doSelectBy?merId=${this.merchantsId}`,
				method: 'GET',
				success: (res) => {
					this.swiperArr=res.data
				}
			})
		},
		onShow() {
			uni.request({
				url: 'https://company.job2020.cn/merchant/doSelect',
				method: 'GET',
				data:{
					page,
					rows,
					merId: this.merchantsId,
					openId: getApp().globalData.uid
				},
				success: (res) => {
					console.log(res)
					if(res.data.data.code){
						this.isCollection = true
					}else{
						this.isCollection = false
					}
					if(res.data.data.optionsDetailsVo){
						res.data.data.optionsDetailsVo.forEach(item =>{
							if(item.anonymity === 'true'){
								item.head = 'https://pic.job2020.cn/%E5%8C%BF%E5%90%8D.jpg'
								item.nickName = '匿名用户'
							}
						})
					}
					
					this.allData = res.data.data.merchant
					this.commentData=res.data.data.optionsDetailsVo
					
				}
			})
		},
		methods: {
			toVote(e){
				var mvoId = e.currentTarget.dataset.id
				uni.redirectTo({
					url: `./voteDetail?mvoId=${mvoId}&merId=${this.merchantsId}`
				})
				
			},
			// 加入收藏
			onAddCollection(){
				uni.request({
					url:'https://user.job2020.cn/favorite/addMerfavorite',
					method:'GET',
					data:{
						merId: this.merchantsId,
						openId:getApp().globalData.uid
					},
					success: (res) => {
						console.log(res)
						if(res.data.code){
							this.isCollection=true
							uni.showToast({
								title:'收藏成功',
								icon:'success'
							})
						}
						
					}
				})
				
			},
			// 取消收藏
			onReduceCollection(){
				uni.request({
					url:'https://user.job2020.cn/favorite/updatem',
					method:'GET',
					data:{
						merId: this.merchantsId,
						openId:getApp().globalData.uid
					},
					success: (res) => {
						console.log(res)
						if(res.data.code){
							this.isCollection= false
							uni.showToast({
								title:'取消收藏',
								icon:'success'
							})
						}
						
					}
				})
			},
			
			// 添加评论
			onAddComment(){
				uni.navigateTo({
					url: `./merchantsComment?name=${this.allData.name}&merchantsId=${this.merchantsId}`
				})
			}
		}
	}
</script>

<style scoped>
	.top{
		width: 710rpx;
		margin: 30rpx auto 20rpx;
	}
	.swiper{
		height: 300rpx;
		padding: 0rpx 20rpx;
		display: flex;
		justify-content: center;
		background-color: #FFFFFF;
	}
	swiper-item image{
		height: 300rpx;
		width: 100%;
		border-radius: 16rpx;
	}
	.top_mid{
		width: 670rpx;
		margin: 16rpx auto 0;
	}
	.merchantsName{
		font-size: 36rpx;
		font-size: 600;
		margin-bottom: 10rpx;
	}
	.merchantsStar{
		width: 160rpx;
		height: 27rpx;
	}
	.merchantsStarNum{
		color: #f5b931;
		font-size: 28rpx;
		margin-left: 10rpx;
		margin-right: 30rpx;
	}
	.merchantsComment{
		font-size: 28rpx;
		margin-right: 10rpx;
	}
	.otherScore{
		display: flex;
		margin-top: 8rpx;
		margin-bottom: 20rpx;
		justify-content: space-between;
		font-size: 22rpx;
		color: #9e9e9e;
	}
	.otherScore div span{
		margin-right: 10rpx;
	}
	.merchantsTme{
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		border-top: 2rpx solid #EEEEEE;
	}
	
	.bottom{
		border-top: 16rpx solid #EEEEEE;
	}
	.comment{
		width: 670rpx;
		margin: 0 auto;
	}
	.commentTitle{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10rpx;
	}
	.commentTags{
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}
	.commentTags div{
		font-size: 24rpx;
		color: #9e9e9e;
		background-color: #f4f4f4;
		padding: 8rpx 16rpx;
		text-align: center;
		margin-right: 15rpx;
		border-radius: 20rpx;
	}
	.voteCard{
		background-color: #fafafa;
		margin-top: 20rpx;
		padding-left: 15rpx;
		border-radius: 4px;
		padding: 20rpx 15rpx;
	}
	.card_title{
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		padding-left: 10rpx;
	}
	.card_school{
		font-size: 24rpx;
		color: #C0C4CC;
	}
	.card_selItem{
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 2rpx solid #EEEEEE;
		padding-left: 10rpx;
	}
	.card_progress{
		font-size: 26rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		color: #909399;
	}
	.voteBtn{
		width: 470rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		margin: 0 auto;
		background-color: #44A1FF;
		color: #FFFFFF;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
	}
	button:after {
	    border: none;  
	}
	
	
	
	
	
	.commentComponment{
		display: flex;
		width: 100%;
		background-color: #FFFFFF;
		height: 100rpx;
		line-height: 100prx;
		/* justify-content: space-between; */
		align-items: center;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.commentComponment div{
		flex: 1;
		text-align: center;
		font-size: 26rpx;
	}
	.commentComponment div icon{
		font-size: 45rpx;
	}
	.shareBtn{
		width: 250rpx;
		height: 120rpx;
		position: absolute;
		right: 0;
		bottom: 0;
		opacity: 0;
	}
	.icon-guanzhu{
		color: #ffa800;
		font-size: 60rpx;
	}
</style>
