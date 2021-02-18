<template>
	<view>
		<!-- 头部banner -->
		<image src="https://pic.job2020.cn/2222.png" mode="aspectFit" style="width: 100%;height: 270rpx;"></image>
		
		<div class="formBox">
		<!-- 搜集信息部分 -->
		<div class="mesItem">
			<span>学校：</span>
			<div><input  placeholder="学校名称" @input="onInputSchool" /></div>
		</div>
		<div class="mesItem">
			<span>专业：</span>
			<div><input  placeholder="专业名称" @input="onInputMajor" /></div>
		</div>
		<div class="mesItem">
			<span>入学时间：</span>
			<div><picker mode="date" :value="startTime"  @change="onStartTime"><view class="uni-input">{{startTime}}</view></picker></div>
		</div>
		<div class="mesItem">
			<span>毕业时间：</span>
			<div><picker mode="date" :value="endTime"  @change="onEndTime"><view class="uni-input">{{endTime}}</view></picker></div>
		</div>
		<div class="btnBox">
			<div class="btn" @click="onBack">上一步</div>
			<div class="btn" @click="onNext">下一步</div>
		</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				startTime: "请选择入学时间",
				endTime: "请选择毕业时间",
				submitData:{},
			}
		},
		onLoad(option) {
			console.log(option)
			this.submitData['detId']=option.userId
		},
		methods: {
			// 学校
			onInputSchool(e){
				this.submitData['school']=e.target.value
			},
			// 专业
			onInputMajor(e){
				this.submitData['major']=e.target.value
			},
			// 入学时间
			onStartTime(e){
				this.startTime=e.detail.value
				this.submitData['enrollmentTime']=this.startTime
			},
			// 毕业时间
			onEndTime(e){
				this.endTime=e.detail.value
				this.submitData['graduationTime']=this.endTime
			},
			// 上一步
			onBack(){
				uni.navigateBack({
					delta:1
				})
			},
			// 下一步
			onNext(){
				
				this.submitData['state']=2
				console.log(this.submitData)
				if(!this.submitData.school || !this.submitData.major || !this.submitData.enrollmentTime || !this.submitData.graduationTime ){
					uni.showToast({
					    title: '信息不完整',
						icon: 'loading',
					    duration: 1000
					})
				}else{
					uni.request({
					    url: 'https://user.job2020.cn/details/doTwo',
					    data: this.submitData,
					    success: (res) => {
					        console.log(res);
							if(res.statusCode == 200){
								uni.navigateTo({
									url:`../perfectInformationThree/perfectInformationThree?userId=${this.submitData['detId']}`
								})
							}
							
					    },
						fail(err) {
							console.error(err)
						}
					});
					
				}
				
			}
		}
	}
</script>

<style scoped>
	.formBox{
		width: 670rpx;
		margin: 0 auto;
	}
	.mesAva{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 200;
	}
	.avaBox{
		width: 110rpx;
		height: 110rpx;
		border-radius: 50%;
		border: 2rpx solid #eee;
		padding: 5rpx;
		box-shadow: 0 0 10px #ddd;
		text-align: center;
		line-height: 110rpx;
	}
	.avaBox icon{
		color: #44A1FF;
		font-weight: 500;
		font-size: 36rpx;
	}
	.mesItem{
		font-weight: 200;
		display: flex;
		align-items: center;
		height: 120rpx;
		width: 100%;
		border-bottom: 2rpx solid #eee;
	}
	.btnBox{
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 20rpx;
	}
	.btn{
		width: 220rpx;
		height: 80rpx;
		background-color: #e4f0fc;
		color: #44a1ff;
		border-radius: 10rpx;
		text-align: center;
		line-height: 80rpx;
		margin-top: 50rpx;
	}
</style>
