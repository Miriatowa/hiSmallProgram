<template>
	<view>
		<div class="mentorCard" >
			<block v-for="(item,index) in mentorData" :key="index">
				<div class="cardItem" @click='toDetail(item)'>
					<div class="itemTop">
						<image class='itemBox_l' :src="item.image" mode="scaleToFill"></image>
						<div class="itemBox_r">
							<div>{{item.name}}</div>
							<!-- <div><image src="https://pic.job2020.cn/%E4%BA%94%E6%98%9F.png"  mode="widthFix" class="itemBox_r_m"></image><span class="textStyle">{{item.expenditure}}/人</span></div> -->
							<div class="textStyle"><span>{{item.addr}}</span><span style="margin-left: 30rpx;">{{item.type}}</span></div>
						</div>
					</div>
					<div class="itemBottom">
						推荐理由：{{item.reason}}
					</div>
				</div>
			</block>
			
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mentorData: [],
			}
		},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.request({
				url:"https://user.job2020.cn/favorite/selectFavoritem",
				method:"GET",
				data:{
					openId:getApp().globalData.uid
				},
				success: (res) => {
					console.log(res)
					this.mentorData=res.data.name
				}
			})
		},
		methods: {
			// 跳转到详情
			toDetail(item){
				console.log(item)
				uni.navigateTo({
					url:`../../merchants/merchants/merchantsInfo/merchantsInfo?id=${item.merId}`
				})
			},
		}
	}
</script>

<style scoped>
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
</style>
