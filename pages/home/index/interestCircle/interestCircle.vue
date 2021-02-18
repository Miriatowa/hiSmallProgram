<template>
	<view>
		<div class='head'>
			<div class='container'>
				<div class='h_addBtn'>
					<image src='https://vkceyugu.cdn.bspapp.com/VKCEYUGU-miraitowa/17ad87a0-2489-11eb-8ff1-d5dcf8779628.jpg'></image>
					<span>随机加入</span>
				</div>
			</div>
			
		</div>
		<div class='main'>
			
			<div class='main_wid'>
				<div class='searchCom'>
					<input placeholder="搜索感兴趣的圈子" >
					<i class='iconfont icon-sousuo2'></i>
					<div><i class="iconfont icon-shaixuan"></i>筛选</div>
				</div>
				<block v-for="(item,index) in  allData" :key='item'>
					<div class='interestCard'>
						<div class='cardTitle'>王者荣耀</div>
						<div class='cardTags'>
							<span>游戏</span>
							<span>妹子多</span>
							<span>大神多</span>
						</div>
						<div class='cardImg'>
							<image src='https://vkceyugu.cdn.bspapp.com/VKCEYUGU-miraitowa/17ad87a0-2489-11eb-8ff1-d5dcf8779628.jpg'></image>
							<div>队长</div>
						</div>
					</div>
				</block>
				
			</div>
			
			<div class='addBtn' @click='toPublish'>
				<i class="iconfont icon-21"></i>创建圈子
			</div>
			
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allData:[1,2,3,4,5]
			}
		},
		methods: {
			// 跳转到发布
			toPublish(){
				uni.navigateTo({
					url:'./publishInterest'
				})
			},
		}
	}
</script>

<style scoped>
	.container{
		height: 340rpx;
		background-image: url('https://pic.job2020.cn/interest.png');
		background-position: left top;  
		background-size:100% 100%;
		background-repeat: no-repeat;
		position: relative;
		margin-bottom: 10rpx;
	}
	.h_addBtn{
		width: 300rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 50rpx;
		box-shadow: 5rpx 5rpx 10rpx #606266;
		position: absolute;
		left: 50rpx;
		bottom: 100rpx;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		font-weight: 600;
	}
	.h_addBtn image{
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
		margin-right: 40rpx;
		/* box-shadow: 2rpx  2rpx 10rpx #F2F6FC; */
	}
	.main{
		background-color: #f3f4f8;
	}
	.main_wid{
		width: 670rpx;
		margin: 0 auto;
	}
	.searchCom{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
	}
	.searchCom input{
		width: 500rpx;
		background-color: #ffffff;
		height: 60rpx;
		border-radius: 40rpx;
		margin-right: 50rpx;
		padding-left: 20rpx;
		font-size: 26rpx;
	}
	.icon-sousuo2{
		position: absolute;
		left: 500rpx;
	}
	.icon-shaixuan{
		display: inline;
		margin-right: 5rpx;
	}
	.interestCard{
		margin-top: 30rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		box-shadow: 4rpx 4rpx 4rpx #DCDFE6;
	}
	.cardTitle{
		font-size: 36rpx;
		font-weight: 600;
		padding-top: 20rpx;
		margin-left: 28rpx;
	}
	.cardTags{
		margin-left: 28rpx;
		margin-top: 20rpx;
	}
	.cardTags span{
		padding: 5rpx 20rpx;
		background-color: #c7e0fe;
		border-radius: 10rpx;
		margin-right: 20rpx;
		font-size: 22rpx;
	}
	.cardImg{
		position: relative;
	}
	.cardImg image{
		height: 60rpx;
		width: 60rpx;
		border-radius: 50%;
		margin-left: 28rpx;
		margin-top: 20rpx;
		z-index: -1;
		border: 2rpx solid #c7e0fe;
		margin-bottom: 20rpx;
	}
	.cardImg div{
		width: 50rpx;
		height: 26rpx;
		font-size: 16rpx;
		background-color: #c7e0fe;
		text-align: center;
		line-height: 26rpx;
		border-radius: 10rpx;
		position: absolute;
		left: 33rpx;
		bottom: 20rpx;
	}
	.addBtn{
		width: 120rpx;
		height: 120rpx;
		text-align: center;
		font-size: 20rpx;
		color: #FFFFFF;
		border-radius: 50%;
		background-image: linear-gradient(to bottom right, #c7e0fe, #6aa6ef );
		position: fixed;
		right: 0;
		bottom: 100rpx;
	}
	.icon-21{
		/* color:#303133; */
		font-size: 50rpx;
		line-height: 70rpx;
	}
</style>
