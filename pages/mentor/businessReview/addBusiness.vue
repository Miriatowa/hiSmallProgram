<template>
	<view class="main">
		<form @submit="onSubmitData">
			<div class="f_item f_ava">
				<label>企业LOGO</label>
				<div class="avaBox">
					<image @click="onChangeAva" :src="tempUrl" mode="widthFix"></image>
					<icon class="iconfont icon-xiangyou1"></icon>
				</div>
			</div>
			<div class='f_item'>
				<label>企业名称</label>
				<input name="name" placeholder="名称" />
			</div>
			<div class='f_item'>
				<label>企业地址</label>
				<input name="addr" placeholder="地址" />
			</div>
			<div class='f_item'>
				<label>企业类型</label>
				<picker :range="typeArr" :value="typeIndex" @change="onChangeType" name='type'>{{typeArr[typeIndex]}}</picker>
			</div>
			<div class='f_item'>
				<label>企业规模</label>
				<picker :range="scaleArr" :value="scaleIndex" @change="onChangeScale" name='scale'>{{scaleArr[scaleIndex]}}</picker>
			</div>
			<div class='f_item'>
				<label>所属行业</label>
				<picker :range="majorArr" :value="majorIndex" @change="onChangeMajor" name='industry'>{{majorArr[majorIndex]}}</picker>
			</div>
			<div class='f_item f_textarea'>
				<label>企业介绍</label>
				<textarea name='introduce'></textarea>
			</div>
			<button form-type="submit" class="addBtn" >提交数据</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tempUrl: '',
				scaleArr: ['0-20人','20-99人','100-499人','500-999人','1000-9999人','10000人以上'],
				scaleIndex: 0,
				typeArr: ['国有企业','私营企业','集体所有制','个人独资企业','股份制企业','联营企业','有限合伙企业','外商投资企业','股份合作企业'],
				typeIndex: 0,
				submitData: {},  //提交数据库数据
				majorIndex: 0,
				majorArr: [
					'计算机',
					'电子',
					'通讯',
					'硬件',
					'金融',
					'生活服务',
					'汽车',
					'交通',
					'贸易',
					'物流',
					'专业服务',
					'广告',
					'传媒',
					'文化',
					'房地产',
					'建筑',
					'机械',
					'制造',
					'能源',
					'化工',
					'环保',
					'消费品',
					'制药',
					'医疗',
					'教育',
					'培训'
				
				],
			}
		},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
		},
		methods: {
			// 更换头像
			onChangeAva() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						console.log(res,'1')
						 const tempFilePaths = res.tempFilePaths;
						       uni.uploadFile({
						           url: 'https://company.job2020.cn/picture/image',
						           filePath: tempFilePaths[0],
						           name: 'file',
						           formData: {
						               'ident': 1
						           },
						           success: (res) => {
									   console.log(res)
						       		this.tempUrl = res.data
						           }
						       });
					}
				});
			},
			// 选择企业性质
			onChangeType(e){
				this.typeIndex = e.detail.value
			},
			// 选择规模
			onChangeScale(e){
				this.scaleIndex = e.detail.value
			},
			// 选择行业
			onChangeMajor(e){
				this.majorIndex = e.detail.value
			},
			
			// 提交数据
			onSubmitData(e){
				console.log(e)
				this.submitData = e.detail.value
				this.submitData.scale = this.scaleArr[this.submitData.scale]
				this.submitData.industry = this.majorArr[this.submitData.industry]
				this.submitData.type = this.typeArr[this.submitData.type]
				this.submitData.image = this.tempUrl
				this.submitData.openId = getApp().globalData.uid
				console.log(this.submitData)
			  if(this.submitData.name === '' && this.submitData.address === ''){
			    uni.showModal({
			      title: '请输入内容',
			      content: '',
			    })
			    return
			  }
			  uni.showLoading({
			    title: '提交中...',
			    mask: true,
			  })
			  uni.request({
			  	url:'https://company.job2020.cn/company/doRegister',
			  	method:'POST',
			  	data:this.submitData,
			  	success: (res) => {
			  		uni.hideLoading()
			  		uni.showToast({
			  			title: '发布成功',
			  			icon: 'success',
			  			
			  		}).then((res)=>{
			  			setTimeout(()=>{
			  				uni.navigateBack({
			  					delta:1
			  				})
			  			},1000)
			  			
			  		})
			  	}
			  })
			},
		}
	}
</script>

<style>
	.main{
		width: 670rpx;
		margin: 0 auto;
	}
	.f_item{
		display: flex;
		height: 100rpx;
		justify-content: space-between;
		align-items: center;
		color: #303133;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.f_textarea{
		height: 300rpx;
		border-bottom: none;
	}
	.f_item label{
		/* font-weight: 600; */
		color: #606266;
		font-size: 28rpx;
	}
	.f_item input,picker{
		flex: 1;
		margin-left: 50rpx;
		color: #606266;
		font-size: 28rpx;
	}
	.f_item textarea{
		flex: 1;
		height: 200rpx;
		margin-left: 30rpx;
		padding: 15rpx 10rpx;
		outline: auto;
		outline-color: #E4E7ED;
		border-radius: 10rpx;
		color: #606266;
		font-size: 28rpx;
	}
	.f_ava {
		height: 150rpx;
		width: 100%;
		border-bottom: 2rpx solid #eee;
	}
	.avaBox {
		display: flex;
		align-items: center;
	}
	
	.avaBox image {
		width: 120rpx;
		height: 120rpx;
		background-color: #e9d4d3;
		border-radius: 20rpx;
		margin-right: 10rpx;
	}
	.addBtn{
		margin-top: 50rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #44A1FF;
		border-radius: 15rpx;
		width: 670rpx;
	}
	input::input-placeholder{
		color:#C0C4CC
	}
</style>
