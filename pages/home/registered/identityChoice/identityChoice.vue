<template>
	
	<view>
		<image src="https://pic.job2020.cn/2222.png" mode="aspectFit" style="width: 100%;height: 270rpx;"></image>
		<!-- 通告栏begin -->
		<slidingNotice :url="url">
			<!-- <div slot='marquee_right'>
				<image src='https://pic.job2020.cn/%E6%8A%BD%E7%AD%BE_1.png' class="slide_img" @click='toDraw'></image>
			</div> -->
		</slidingNotice>
		<!-- 通告栏end -->
		<div>
			<div class="identityBox">
				<!-- <image class="invitateImg" src="https://pic.job2020.cn/%E7%BB%84%201482.png" mode="widthFix" ></image> -->
				<form @submit="onSubmitData">
					<div class='f_item'>
						<label>来源</label>
						<input name="invitationcode" placeholder="邀请码" type="number" maxlength="6" />
					</div>
					<div class='f_item'>
						<label>学校</label>
						<input name="school" placeholder="院校名称"  />
					</div>
					<div class='f_item'>
						<label>专业</label>
						<input name="major" placeholder="专业名称" />
					</div>
					<div class='f_item'>
						<label>年级</label>
						<picker :range="gradeArr" :value="gradeIndex"  name="yearClass" @change='onSelectGrade'>{{gradeArr[gradeIndex]}}</picker>
						<!-- <input name="yearClass" placeholder="年级" /> -->
					</div>
					<div class='f_item'>
						<label>年龄</label>
						<input name="age" placeholder="年龄" type="number" />
					</div>
					<button  form-type="submit"  open-type="getUserInfo" @getuserinfo="onGetUserInfo" class="idenyityBtn" >完成</button>
					<div class='tips'>
						注：如果您暂无邀请码，请关注微信公众号'Hi情报局'，回复【邀请码】即可获取
					</div>
				</form>
				
			</div>
			
		</div>
	</view>
</template>

<script>
	import slidingNotice from '../../../../components/slidingNotice.vue'
	export default {
		data() {
			return {
				submitData: {},  //提交数据
				url: 'https://user.job2020.cn/details/userscrollbar',
				gradeArr: ['大一','大二','大三','大四'],
				gradeIndex: 0
			}
		},
		components:{slidingNotice},
		methods: {
			onSelectGrade(e){
				this.gradeIndex = e.target.value
			},
			onSubmitData(e){
				this.submitData = e.target.value
			},
			onGetUserInfo(e){
				if(this.submitData['invitationcode'] || this.submitData['school'] || this.submitData['major'] || this.submitData['yearClass'] || this.submitData['age']){
					this.submitData['avatarUrl']=e.detail.userInfo.avatarUrl
					this.submitData['nickName']=e.detail.userInfo.nickName
					this.submitData['gender']=e.detail.userInfo.gender
					this.submitData['city'] = e.detail.userInfo.city
					this.submitData['yearClass'] = this.gradeArr[this.gradeIndex ]
					let p = new Promise((resolve, reject) => {
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								// 临时登录code
								const code = loginRes.code		
								resolve(code)
					
							}
						});
					}).then((code) =>{
						this.submitData['code'] = code
						console.log(this.submitData)
						uni.request({
							url: "https://user.job2020.cn/details/accredit",
								method: 'POST',
								data:this.submitData,
								success: (res) => {
									if(res.data.code == 1){
										uni.setStorage({
										    key: 'session',
										    data: res.data.session_key,
										});
										uni.setStorage({
										    key: 'uid',
										    data: res.data.openId,
										});
										uni.switchTab({
											url:'../../../mentor/mentor/mentor'
										})
									}else{
										uni.showModal({
										    title: '温馨提示',
										    content: '无效邀请码',
										    success: function (res) {
										        if (res.confirm) {
										            console.log('用户点击确定');
										        } else if (res.cancel) {
										            console.log('用户点击取消');
										        }
										    }
										});
									}
								},
								fail(err) {
									console.error(err)
								}
							})
					})
				}else{
					uni.showModal({
					    title: '温馨提示',
					    content: '信息不完善，请完善信息',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
				
			},
		}
	}
</script>

<style scoped>
	.identityBox{
		width: 670rpx;
		margin: 100rpx auto 0rpx ;
	}
	.invitateImg{
		width: 200rpx;
		height: 200rpx;
		margin-left: 235rpx;
		margin-bottom: 80rpx;
		margin-top: 100rpx;
	}
	button:after {
	    border: none;  
	}
	.idenyityBtn{
		width: 572rpx;
		height: 80rpx;
		background-color: #e4f0fc;
		color: #44a1ff;
		border-radius: 10rpx;
		text-align: center;
		line-height: 80rpx;
		margin-top: 50rpx;
		margin-left: 50rpx;
		border: 2prx solid #E4F0FC;
	}
	.inputInvite{
		flex: 1;
		background-color: #FFF;
		border-radius: 4px;
		border: 1px solid #DCDFE6;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		color: #606266;
		height: 40px;
		line-height: 40px;
		outline: 0;
		padding: 0 15px;
		margin-left: 50rpx;
	}
	.tips{
		font-size: 24rpx;
		color: #909399;
		margin-top: 100rpx;
	}
	.f_item{
		display: flex;
		height: 100rpx;
		justify-content: space-between;
		align-items: center;
		color: #303133;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.f_item picker{
		margin: 0 auto;
	}
</style>
