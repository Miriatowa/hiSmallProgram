<template>
	<view class="main">
		<view class="main">
			<form @submit="onSubmitData">
				<div class='f_item'>
					<label>店名</label>
					<input name="name" placeholder="名称" />
				</div>
				<div class='f_item'>
					<label>经营业务</label>
					<picker name='type' :range="type" :value="typeIndex" @change="onSelectType">{{type[typeIndex]}}</picker>
				</div>
				<div class='f_item'>
					<label>营业时间</label>
					<picker name='businessTime' :range="time" :value="timeIndex" @change="onSelectTime">{{time[timeIndex]}}</picker></div>
				</div>
				<div class='f_item'>
					<label>店铺地址</label>
					<input name='addr' placeholder="地址"  /></div>
				</div>
				<div class='f_item'>
					<label>附近高校</label>
					<picker name='school' :range="school" :value="schoolIndex" @change="onSelectSchool">{{school[schoolIndex]}}</picker></div>
				</div>
				<div class='f_upload'>
					<label>店铺图片</label>
					<uploadImg @uploadImg="getUploadImg"></uploadImg></div>
				</div>
				<button form-type="submit" class="addBtn" >提交数据</button>
			</form>
		</view>
	</view>
</template>

<script>
	import uploadImg from '../../../components/uploadImg.vue'
	export default {
		data() {
			return {
				images:[],  // 上传图片
				school:[] ,//学校数据
				schoolIndex: 0 ,
				type:['请选择','饮品','甜点','快餐简餐','小吃','中式菜肴','火锅','全球美食'] ,//经营业务
				typeIndex: 0 ,
				time:['请选择营业时间','上午','下午','全天'] ,//经营时间
				timeIndex: 0 ,
				submitData: {},  //提交数据库数据
				realImages:[],
			}
		},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.request({
				url:'https://company.job2020.cn/school/findAll',
				method:'GET',
				success: (res) => {
					res.data.unshift('高校')
					this.school = res.data
				}
			})
		},
		components:{
			uploadImg
		},
		methods: {
			// 选择经营类型
			onSelectType(e){
				this.typeIndex=e.detail.value
			},
			// 选择营业时间
			onSelectTime(e){
				this.timeIndex=e.detail.value
			},
			// 选择附近学校
			onSelectSchool(e){
				this.schoolIndex=e.detail.value
			},
			// 选择图片
			getUploadImg(res){
				this.images=res
			},
			// 提交数据
			onSubmitData(e){
				this.submitData = e.detail.value
			  if(this.submitData.name === '' && this.submitData.addr === ''){
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
			  
			  let promiseArr = []
			  let fileIds = []
			  // 上传图片到云存储
			  for(var i=0;i<this.images.length;i++){
			    let p = new Promise((resolve, reject) => {
			      let item = this.images[i]
			      // 文件扩展名
			      let suffix = /\.\w+$/.exec(item)[0]
			      uni.uploadFile({
			       url: 'https://company.job2020.cn/picture/image',
			       filePath: item,
			       name: 'file',
			       formData: {
			       	'ident': 1
			       },	
			        success: (res) => {
			          fileIds = fileIds.concat(res.data)
			          resolve()
			        },
			        fail: (err) => {
			          reject()
			        }
			      })
			     })
			    promiseArr.push(p)
			  }
			  Promise.all(promiseArr).then((res) => {
					this.submitData.type = this.type[this.submitData.type]
					this.submitData.businessTime = this.time[this.submitData.businessTime]
					this.submitData.school = this.school[this.submitData.school]
					this.submitData.image = fileIds
					this.submitData.openId = getApp().globalData.uid
					uni.request({
						url:'https://company.job2020.cn/merchant/doRegister',
						method:'POST',
						data:this.submitData,
						success: (res) => {
							uni.hideLoading()
							uni.showToast({
								title: '发布成功',
								icon: 'success',
								success: () => {
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},1000)
								}
							})
						}
					})
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
	.f_upload{
		margin-top: 36rpx;
	}
	.f_item,.f_upload label{
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
	
	
	
	
	
	
	
	
	.addMesItem{
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #EEEEEE;
		color: #303133;
	}
	.addMesItem input,picker{
		flex: 1;
		margin-left: 16rpx;
		color: #606266;
	}
	.mesCard{
		margin-top: 100rpx;
	}
	.addMesImg{
		margin-top: 20rpx;
	}
	.addBtn{
		margin-top: 50rpx;
		height: 80rpx;
		line-height: 80rpx;
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
