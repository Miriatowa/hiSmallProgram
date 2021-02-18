<template>
	<view>
		<!-- 头部banner -->
		<image src="https://pic.job2020.cn/2222.png" mode="aspectFit" style="width: 100%;height: 270rpx;"></image>

		<div class="formBox">
			<!-- 搜集信息部分 -->
			<div class="mesItem">
				<span>微信：</span>
				<div><input placeholder="请输入微信号" @input="onInputWx"  maxlength="16" /></div>
			</div>
			<div class="mesItem">
				<span>QQ：</span>
				<div><input placeholder="请输入QQ号" @input="onInputQQ"  maxlength="10" /></div>
			</div>
			<div class="mesItem">
				<span>标签：</span>
				<div class="tagBox">
					<block v-for="item in tags" :key='item'>
						<div class="tags">{{item}}
							<icon class="iconfont icon-shanchu"></icon>
						</div>
					</block>
					<div class="addTags" @click="onAddTags" v-if="tags.length < 3">
						<icon class="iconfont icon-21" style="font-size: 28rpx;"></icon><span>自定义</span>
					</div>
				</div>
			</div>
			<div class="btnBox">
				<button type="primary" @click="onBack" class="btn">上一步</button>
				<button  open-type="getPhoneNumber" @getphonenumber="onFin" class="btn" >完成</button>
			</div>
		</div>
		
		<!-- 弹出层 -->
		<div class="maskBox">
			<mask :maskShow="isShow">
				<div class="addTagBox" ref="tagBox">
					<input placeholder="标签内容" class="tagsContent" @input="onInputTags" maxlength="4" />
					<div class="addTagsBtn">
						<div class="btn" @click="onCancel">取消</div>
						<div class="btn" @click="onSure">添加</div>
						
					</div>
				</div>
			</mask>
		</div>
	</view>
</template>

<script>
	import mask from '../../../../components/mask.vue'
	export default {
		data() {
			return {
				tags: [],
				tagsItem: '',
				isShow: false, //弹出层
				submitData: {}, //提交数据
			}
		},
		onLoad(option) {
			console.log(option)
			this.submitData['detId']=option.userId
		},
		components: {
			mask
		},
		methods: {
			onInputWx(e) {
				const wx = e.target.value
				this.submitData['weChat'] = wx
			},
			onInputQQ(e) {
				const qq = e.target.value
				this.submitData['qq'] = qq
			},
			// 添加标签
			onAddTags() {
				this.isShow = true
			},
			// 标签内容
			onInputTags(e) {
				this.tagsItem = e.target.value
			},
			// 取消添加
			onCancel() {
				this.isShow = false
			},
			// 确定添加
			onSure() {
				this.tags.push(this.tagsItem)
				this.isShow = false
				console.log(this.tags)
			},
			// 上一步
			onBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onFin(e){
				
				// let sData = e.detail
				// sData.session_key = getApp().globalData.session
				// uni.request({
				// 	url:'http://192.168.31.7:8090/details/accreditp',
				// 	method: 'POST',
				// 	data: sData,
				// 	success: (res) => {
				// 		console.log(res.data)
				// 	}
				// })
				this.submitData.encryptedData = e.detail.encryptedData 
				this.submitData.iv = e.detail.iv
				this.submitData.session_key = uni.getStorageSync('session');
				this.submitData['label']=this.tags
				this.submitData['state']=3
				console.log(this.submitData)
				uni.request({
					url: "https://user.job2020.cn/details/doThree",
					// url: 'http://192.168.31.7:8090/details/doThree',
						method: 'POST',
						data:this.submitData,
						success: (res) => {
							console.log(res)
							if(res.data.data.code){
								uni.switchTab({
									url:'../../../mentor/mentor/mentor'
								})
							}else{
								uni.showModal({
									title: '温馨提示',
									content: '亲，只有授权才能更好使用本产品哦'
								})
							}
						},
						fail(err) {
							console.error(err)
						}
					})
			},
		}
	}
</script>

<style scoped>
	.formBox {
		width: 670rpx;
		margin: 0 auto;
	}

	.mesAva {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 200;
	}

	.avaBox {
		width: 110rpx;
		height: 110rpx;
		border-radius: 50%;
		border: 2rpx solid #eee;
		padding: 5rpx;
		box-shadow: 0 0 10px #ddd;
		text-align: center;
		line-height: 110rpx;
	}

	.avaBox icon {
		color: #44A1FF;
		font-weight: 500;
		font-size: 36rpx;
	}

	.mesItem {
		font-weight: 200;
		display: flex;
		align-items: center;
		height: 120rpx;
		width: 100%;
		border-bottom: 2rpx solid #eee;
	}

	.btnBox {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 50rpx;
	}
	.btn {
		width: 220rpx;
		height: 80rpx;
		background-color: #e4f0fc;
		color: #44a1ff;
		border-radius: 10rpx;
		text-align: center;
		line-height: 80rpx;
		margin-top: 50rpx;
	}
	button:after {
	    border: none;  
	}
	.tagBox {
		display: flex;
		justify-content: space-around;
		/* align-items: center; */
	}

	.tags {
		padding: 5rpx 10rpx;
		height: 60rpx;
		background-color: #e8f3fe;
		color: #5faeff;
		text-align: center;
		line-height: 60rpx;
		border-radius: 10rpx;
		margin-right: 10rpx;

	}

	.addTags {
		padding: 5rpx 15rpx;
		border: 2rpx solid #5faeff;
		color: #5faeff;
		text-align: center;

		box-sizing: border-box;
		padding-bottom: 14rpx;
		border-radius: 10rpx;
		margin-right: 10rpx;
	}

	.addTags span {
		height: 40rpx;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	.addTagsBtn {
		display: flex;
		justify-content: space-around;
		padding-bottom: 50rpx;
	}

	.addTagBox {
		width: 570rpx;
		margin: 0rpx auto;
	}

	.maskBox {
		position: absolute;
		left: 0;
		top: 0;
	}

	.tagsContent {
		margin-top: 100rpx;
		padding-left: 20rpx;
		height: 80rpx;
		border-radius: 10rpx;
		border: 2rpx solid #5faeff;
	}
</style>
