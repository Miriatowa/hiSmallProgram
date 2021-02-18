<template>
	<view>
		<!-- 头部banner -->
		<image src="https://pic.job2020.cn/2222.png" mode="aspectFit" style="width: 100%;height: 270rpx;"></image>
		
		<div class="formBox">
		<!-- 搜集信息部分 -->
		<div class="mesItem">
			<span>姓名：</span>
			<div><input  placeholder="请输入姓名" @input="onIputName" /></div>
		</div>
		<div class="mesItem">
			<span>性别：</span>
			<div><picker :range="sex" :value="sexIndex" @change="onSelectSex"><view>{{sex[sexIndex]}}</view></picker></div>
		</div>
		<div class="mesItem">
			<span>出生日期：</span>
			<div><picker mode="date" :value="birthDay"  @change="onSelectDate"><view class="uni-input">{{birthDay}}</view></picker></div>
		</div>
		<div class="mesItem">
			<span>所在城市：</span>
			<div><picker mode="region" :value="city" :range="city" @change="onSelectCity">{{city}}</picker></div>
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
				sexIndex:0,
				sex:['请选择',"男","女"],
				birthDay: "请选择",
				city:'请选择当前所在城市',
				submitData:{},   //提交数据
			}
		},
		onLoad(option) {
			console.log(option)
			this.submitData['detId']=option.dId
		},
		methods: {
			// 姓名
			onIputName(e){
				this.submitData['name']=e.target.value
			},
			// 性别
			onSelectSex(e){
				this.sexIndex=e.detail.value
				this.submitData['sex']=this.sex[this.sexIndex]
			},
			// 生日
			onSelectDate(e){
				this.birthDay=e.detail.value
				this.submitData['birthTime']=this.birthDay
			},
			// 所在城市
			onSelectCity(e){
				this.city=e.target.value[1]
				this.submitData['addr']=e.target.value
			},
			// 上一步
			onBack(){
				uni.navigateBack({
					delta: 1
				})
			},
			// 下一步
			onNext(){
				
				if(!this.submitData.name | !this.submitData.sex | !this.submitData.birthTime | !this.submitData.addr){
					uni.showToast({
					    title: '信息不完整',
						icon: 'loading',
					    duration: 1000
					})
				}else{
					this.submitData['state']=1
					console.log(this.submitData)
					uni.request({
						url: "https://user.job2020.cn/details/doOne",
						method: 'POST' ,
						data: this.submitData,
						success: (res) => {
							console.log(res)
							getApp().globalData.session = res.data.session_key
							getApp().globalData.uid = res.data.openId
							getApp().globalData.isLogin = true
							if(res.statusCode == 200){
								uni.navigateTo({
									url:`../perfectInformationTwo/perfectInformationTwo?userId=${this.submitData['detId']}`
								})
								
							}
							
						},
						fail(err) {
							console.log(err)
						}
					})
					
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
		height: 150rpx;
		width: 100%;
		border-bottom: 2rpx solid #eee;
	}
	.btnBox{
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 50rpx;
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
	input::input-placeholder{
		color:#000
	}
</style>
