<template>
	<view class="index">
		<form @submit="formSubmit" @reset="formReset">
		<div class='head'>
			<div ><icon class="iconfont icon-letter"></icon><input placeholder="To" name='toobject' /></div>
			<picker :value="schoolIndex" name='school' :range='school' @change="selectSchool"><i class="iconfont icon-didian"></i>{{school[shcoolIdex]}}</picker>
		</div>
		<div class='main'>
			<textarea placeholder="爱Ta就勇敢的告诉Ta" name='wishes'></textarea>
			<uploadImg @uploadImg='getImageUrl'></uploadImg>
			<div class='anonymous'>
				<span>是否匿名发布</span>
				 <switch color='#ff74ad' name='anonymity' />
			</div>
		</div>
		<button form-type="submit" class="pubBtn">发布</button>
		</form>
	</view>
</template>

<script>
	import uploadImg from  '../../../../components/uploadImg.vue'
	export default{
		data(){
			return {
				school: [], //学校数据
				shcoolIdex: 0,  //选择学校索引
				images: [], //图片临时路径
				submitData: {},  //提交数据
			}
		},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.request({
				url:'https://company.job2020.cn/school/findAll',
				method:'GET',
				success: (res) => {
					res.data.unshift('选择位置')
					this.school = res.data
				}
			})
		},
		components:{uploadImg},
		methods:{
			
			// 选择学校
			selectSchool(e){
				console.log(e)
				this.shcoolIdex = e.detail.value
			},
			// 获得图片url
			getImageUrl(res){
				console.log(res)
				this.images = res
			},
			formSubmit(e){
				this.submitData = e.detail.value
				if(this.submitData['toobject'] === '' && this.submitData['wishes'] === ''){
								    uni.showModal({
								      title: '请输入举报内容',
								      content: '',
								    })
								    return
								  }
								  uni.showLoading({
								    title: '提交中...',
								    mask: true,
								  })
								  
								  if(this.images.length > 0){
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
								       	'ident': 8
								       },	
								        success: (res) => {
											console.log(res.data,"22222222")
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
										this.submitData['image'] = fileIds
										this.submitData['school'] = this.school[Number(this.submitData.school)]
										this.submitData['openId'] = getApp().globalData.uid
										 console.log(this.submitData)
										 uni.request({
										 	url:'https://user.job2020.cn/details/addWall',
											method:'POST',
											data:this.submitData,
											success: (res) => {
												console.log(res)
												uni.hideLoading()
												uni.showToast({
													title: '发布成功',
													icon: 'success',
													
												}).then((res)=>{
													setTimeout(()=>{
														uni.redirectTo({
															url: './loveWall'
														})
													},1000)
													
												})
											}
										 })
								    })
									}else{
										this.submitData['image'] = []
										this.submitData['school'] = this.school[Number(this.submitData.school)]
										this.submitData['openId'] = getApp().globalData.uid
										 console.log(this.submitData)
										 uni.request({
										 	url:'https://user.job2020.cn/details/addWall',
											method:'POST',
											data:this.submitData,
											success: (res) => {
												console.log(res)
												uni.hideLoading()
												if(res.data.data.code == 1){
													uni.showToast({
														title: '发布成功',
														icon: 'success',
														
													}).then((res)=>{
														setTimeout(()=>{
															uni.redirectTo({
																url: './loveWall'
															})
														},1000)
														
													})
												}else{
													uni.showModal({
														title:"温馨提示",
														content:'积分不足，请前往充值',
														success: (res) => {
															if(res.confirm){
																uni.redirectTo({
																	url:'../../../profile/buyCredits/buyCredits'
																})
															}
														}
													})
												}
												
												
											}
										 })
									}
				
			}
		}
	}
</script>

<style scoped>
	.index{
		width: 670rpx;
		margin: 0 auto;
	}
	.head div, picker{
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		border-bottom: 2rpx solid #DCDFE6;
	}
	.head div input{
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 18rpx;
		flex: 1;
	}
	.icon-didian{
		display: inline;
		margin-right: 18rpx;
		color: #ff74ad;
	}
	.icon-letter{
		display: inline;
		margin-right: 18rpx;
		color: #ff74ad;
	}
	textarea{
		padding-top: 20rpx;
		padding-left: 10rpx;
		color: #606266;
		font-size: 28rpx;
		width: 100%;
	}
	.anonymous{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
		padding-top: 10rpx;
		border-top: 2rpx solid #DCDFE6;
		font-size: 28rpx;
	}
	.anonymous switch{
		transform: scale(0.6);
	}
	.pubBtn{
		width: 570rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin: 100rpx auto 0 ;
		background-color: #ff74ad;
		color: #FFFFFF;
		border-radius: 45rpx;
	}
</style>
