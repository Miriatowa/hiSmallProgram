<template>
	<view >
		<block v-for="(item,index) in commentData" :key="item.comId">
			<div class='voteCard'>
				<info-card :info="item">
				</info-card>
				<div class='card_title'>{{item.title}}</div>
				<radio-group @change="onSelect">
					<block v-for="(item2,index) in item.options" :key='item'>
						<div class='card_selItem' ><radio style="transform:scale(0.8);margin-right: 10rpx;" color="#44A1FF" :value="item2"></radio>{{item2}}</div>
					</block>
					<button class="voteBtn" @click="onVote" >投票</button>
				</radio-group>
			</div>
			
		</block>
	</view>
</template>

<script>
	import infoCard from '../../../../components/infoCard.vue'
	let type = 0
	let url = ''
	export default{
		data(){
			return {
				commentData: [],
				submitData: {},
				flag: true
			}
		},
		components:{infoCard},
		onLoad(options) {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			type = options.type
			
			if(type == 1){
				url = 'https://company.job2020.cn/company/allMvot'
				this.submitData['cId'] = options.cId
				this.submitData['cid'] = options.cId
				this.submitData['cvoId'] = options.mvoId
			}else{
				url = 'https://user.job2020.cn/details/allMvot'
				this.submitData['mvoId'] = options.mvoId
				this.submitData['merId'] = options.merId
			}
			
			uni.request({
				url,
				method:'GET',
				data:this.submitData,
				success: (res) => {
					console.log(res)
					this.commentData = res.data.data
					this.commentData[0].show = true
					if(this.commentData[0].anonymity === 'true'){
						this.commentData[0].head = 'https://pic.job2020.cn/%E5%8C%BF%E5%90%8D.jpg'
						this.commentData[0].nickName = '匿名用户'
					}
				}
			})
		},
		methods:{
			onSelect(e){
				this.submitData['options'] = e.detail.value
			},
			onVote(){
				if(this.flag){
					if(type == 1){
						url = 'https://company.job2020.cn/company/addVdetails'
					}else{
						url = 'https://user.job2020.cn/details/addVdetails'
					}
					this.submitData['openId'] = getApp().globalData.uid
					
					console.log(this.submitData)
					uni.request({
						url,
						method:'POST',
						data:this.submitData,
						success: (res) => {
							console.log(res)
							if(res.statusCode == 200){
								uni.showToast({
								    title: '投票成功',
									icon: 'success',
								    duration: 2000
								});
								if(type == 1){
									uni.redirectTo({
										url:`/pages/mentor/businessReview/editReview?cId=${this.submitData['cId']}`
									})
								}else{
									uni.redirectTo({
										url:`./merchantsInfo?id=${this.submitData['merId']}`
									})
								}
								this.flag = false
							}
						}
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	.voteCard{
		background-color: #fafafa;
		margin-top: 20rpx;
		padding-left: 15rpx;
		border-radius: 4px;
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
		width: 670rpx;
		margin: 0 auto;
		background-color: #44A1FF;
		color: #FFFFFF;
		margin-top: 60rpx;
	}
	button:after {
	    border: none;  
	}
</style>
