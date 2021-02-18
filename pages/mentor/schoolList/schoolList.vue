<template>
	<view class="main">
		<!-- 背景图区begin -->
		<image src="https://pic.job2020.cn/%E6%8E%92%E8%A1%8C%E6%A6%9C.png" mode="widthFix" class="backImg"></image>
		<!-- 背景图区end -->
		
		<!-- 排行榜begin -->
		<div class="schoolList">
			<div class='rankingRules' @click='toRulesDEtail'>排行规则</div>
			<div class="listType">
				<!-- <div>周榜</div>
				<div>月榜</div> -->
				<div>热度榜</div>
				
			</div>
			<div class="topList">
				
				<div class="topTwo">
					<div class='hotSchoolLogo'>
					<image src='https://pic.job2020.cn/%E7%AC%AC%E4%BA%8C.png' class="twoImgBack" mode="widthFix"></image>
					<image :src="schoolData[1].image" class="topTwoImg"></image>
					</div>
					<div class='shccolName'><icon class="iconfont icon-huomiao" style="color: #cfdef4;"></icon>{{schoolData[1].name}}</div>
					<div class="otherItem_r" @click='onPraise(schoolData[1].sid,1)'>{{schoolData[1].heat}}<icon :class="likeIndex !== 1 ? 'iconfont icon-dianzan' : 'iconfont icon-iconset0445'" ></icon></div>
				</div>
				<div class="topOne">
					<div class='hotSchoolLogo'>
					<image src='https://pic.job2020.cn/%E7%AC%AC%E4%B8%80.png' class="topImgBack" mode="widthFix"></image>
					<image :src="schoolData[0].image" class="topImg"></image>
					</div>
					
					<div class='shccolName'><icon class="iconfont icon-huomiao" style="color: #ffd847;"></icon>{{schoolData[0].name}}</div>
					<div class="otherItem_r" @click='onPraise(schoolData[0].sid,0)'>{{schoolData[0].heat}}<icon :class="likeIndex !== 0 ? 'iconfont icon-dianzan' : 'iconfont icon-iconset0445'" ></icon></div>
					
				</div>
				<div class="topTwo">
					<div class='hotSchoolLogo'>
					<image src='https://pic.job2020.cn/%E7%AC%AC%E4%B8%89.png' class="twoImgBack" mode="widthFix"></image>
					<image :src="schoolData[2].image" class="topTwoImg"></image>
					</div>
					<div class='shccolName'><icon class="iconfont icon-huomiao" style="color: #f6b583;"></icon>{{schoolData[2].name}}</div>
					<div class="otherItem_r" @click='onPraise(schoolData[2].sid,2)'>{{schoolData[2].heat}}<icon :class="likeIndex != 2 ? 'iconfont icon-dianzan' : 'iconfont icon-iconset0445'" ></icon></div>
				</div>
			</div>
			
			
			<div class="topOther">
			<block v-for="(item,index) in schoolData" :key="item.sid">
				<div class="otherItem" v-if='index > 2'>
					<div class="otherItem_l">
						<span><i class="iconfont icon-huomiao" style="color: #ff4747;display: inline;"></i>{{index+1}}</span>
						<image class="schoolLogo" :src="item.image"></image>
						<span>{{item.name}}</span>
					</div>
					
					<div class="otherItem_r" @click='onPraise(item.sid,index)'>{{item.heat}}<icon :class="likeIndex !== index ? 'iconfont icon-dianzan' : 'iconfont icon-iconset0445'" ></icon></div>
				</div>
			</block>
		  </div>
		  
		</div>
		<!-- 排行榜end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schoolData:[],
				likeIndex: '', //点赞索引
				onlyOnce: false,   //只能点赞一次
			}
		},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.request({
				url:'https://company.job2020.cn/school/findHeat',
				method:'GET',
				success: (res) => {
					console.log(res)
					this.schoolData = res.data
				}
			})
		},
		methods: {
			// 排行规则
			toRulesDEtail(){
				uni.navigateTo({
					url:"./rudes"
				})
			},
			// 点赞
			onPraise(id,idx){
				console.log(id,idx)
					uni.request({
						url:'https://company.job2020.cn/school/addHeat',
						method:"GET",
						data:{
							openId: getApp().globalData.uid,
							sId: id
						},
						success: (res) => {
							console.log(res)
							if(res.data.code === '1'){
								this.likeIndex = idx
								this.onlyOnce = true
								uni.showToast({
									title: '助力成功',
									icon: 'success',
									duration: 1000,
									success: (res) => {
										uni.request({
											url:'https://company.job2020.cn/school/findHeat',
											method:'GET',
											success: (res) => {
												console.log(res)
												this.schoolData = res.data
											}
										})
									}
								})
							}else{
								uni.showModal({
									title:'温馨提示',
									content:'亲，每天只能点赞一次哦'
								})
							}
						}
					})
				
			}
		}
	}
</script>

<style>
	
	.backImg{
		width: 100%;
		height: 300rpx;
		position: relative;
		left: 0;
		top: 0;
		z-index: 1;
		
	}
	.schoolList{
		width: 670rpx;
		margin: 0 auto;
		z-index: 99;
		position: absolute;
		left: 40rpx;
		top: 10%;
	}
	.rankingRules{
		margin-left: 520rpx;
		font-size: 22rpx;
		width: 150rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 20rpx;
		background-color: #316188;
		color:#f1f1f1;
		text-align: center;
	}
	.listType{
		display: flex;
		justify-content: space-around;
		z-index: 99;
		font-weight: 600;
		color: #FFFFFF;
	}
	.topList{
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin-top: 80rpx;
		display: flex;
		justify-content: space-between;
	}
	.topTwo,.topThree{
		height: 300rpx;
		width: 223rpx;
		
	}
	.topTwo,.topOne div{
		font-size: 32rpx;
		font-weight: 100;
		text-align: center;
		margin-top: 10rpx;
	}
	.topTwo div:nth-of-type(2){
		font-size: 24rpx;
		font-weight: 100;
		text-align: center;
		margin-top: 20rpx;
	}
	.topOne div:nth-of-type(2){
		font-size: 24rpx;
		font-weight: 100;
		text-align: center;
		margin-top: 54rpx;
	}
	.topOne{
		border: 2rpx solid #F0F0F0;
		height: 300rpx;
		width: 224rpx;
		margin-top: -30rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		box-shadow: 4rpx 2rpx 5rpx #F0F0F0;
	}
	.hotSchoolLogo{
		width: 100%;
		height: 120rpx;
		position: relative;
	}
	.topImg{
		width: 100rpx; 
		height: 100rpx;
		position: absolute;
		border-radius: 50%;
		left: 30%;
		top: 30%;
		
	}
	.topImgBack{
		position: absolute;
		width: 120rpx;
		height: 120rpx;
		left: 25%;
		top: -5.5%;
	}
	.twoImgBack{
		position: absolute;
		width: 120rpx;
		height: 120rpx;
		left: 25%;
		top: -5.5%;
	}
	.topTwoImg{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		position: absolute;
		left: 30%;
		top: 30%;
		
	}
	.shccolName{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding: 0rpx 20rpx;
	}
	.secondImgBack{
		position: absolute;
		width: 120rpx;
		height: 120rpx;
		left: 25%;
		top: -5.5%;
	}
	.otherItem{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}
	.schoolLogo{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-left: 40rpx;
	}
	.otherItem_l{
		display: flex;
		align-items: center;
	}
	
	.otherItem_l span{
		font-size: 30rpx;
		font-weight: 200;
		margin-left: 20rpx;
	}
	.otherItem_l span:first-child{
		width: 50rpx;
		margin-left: 0;
	}
	.otherItem_r{
		font-size: 26rpx;
		color: #C0C4CC;
		line-height: 40rpx;
	}
	.icon-huomiao{
		margin-right: 10rpx;
		font-size: 36rpx;
	}
	.icon-dianzan{
		/* color: #44A1FF; */
		margin-left: 6rpx;
	}
	.icon-iconset0445{
		margin-left: 10rpx;
		color: #44A1FF;
		font-size: 36rpx;
		animation: font-size .5s ease-in-out forwards;
	}
	@keyframes font-size {
	    0%{-webkit-transform:rotate(0deg) scale(0) }
	    25%{-webkit-transform:rotate(30deg) scale(0.2) }
	    50%{-webkit-transform:rotate(-20deg) scale(0.5) }
	    75%{-webkit-transform:rotate(20deg) scale(0.8) }
	    100%{-webkit-transform:rotate(5deg) scale(1) }
	}
</style>
