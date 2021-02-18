<template>
	<div class='index'>
		<div class='head'>
			<div class='h_title'>请选择举报理由:</div>
			<checkbox-group @change="checkboxChange">
				<block v-for="(item,index) in reportReason" :key="item">
					<div class="h_item"><checkbox :value="item">{{item}}</checkbox></div>
				</block>
			</checkbox-group>
		</div>
		<div class='main'>
			<div class='h_title'>上传截图，提高举报处理效率</div>
			<uploadImg @uploadImg='getUploadImg'></uploadImg>
			<textarea placeholder="举报详情..." class="m_textarea" @input="onInputCon"></textarea>
		</div>
		<bottomBtn @onClick='onSubmit' message='提交'></bottomBtn>
	</div>
</template>

<script>
	import uploadImg from '../../../components/uploadImg.vue'
	import bottomBtn from '../../../components/bottomBtn.vue' 
	export default{
		data(){
			return {
				reportReason:['身份作假，不是在校大学生','广告、推销','诈骗、托','色情低俗','恶意骚扰、不文明语言'],
				submitData: {},				//提交数据
			}
		},
		onLoad(option) {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			this.submitData['bereportrdId'] = option.bereportrdId
		},
		methods:{
			// 选中内容
			checkboxChange(e){
				console.log(e.detail.value)
				this.submitData['reason'] = e.detail.value
			},
			// 提交图片
			getUploadImg(res){
				this.images=res
			},
			// 举报内容
			onInputCon(e){
				this.submitData['des'] = e.detail.value
			},
			onSubmit(){
				if(this.submitData['reason'] === '' && this.submitData['des'] === ''){
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
				  let promiseArr = []
				  let fileIds = []
				  // 上传图片到云存储
				  if(this.images > 0){
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
				  }
				  Promise.all(promiseArr).then((res) => {
						this.submitData['openId'] = getApp().globalData.uid
						this.submitData["screenshot"]=fileIds
						console.log(this.submitData)
						uni.request({
							url:'https://user.job2020.cn/details/addReport',
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
										uni.navigateBack({
											delta:1
										})
									},1000)
									
								})
							}
						})
				    })
				},
		},
		components:{
			uploadImg,
			bottomBtn
		}
	}
</script>

<style scoped>
	.index{
		width: 670rpx;
		margin: 0 auto;
	}
	.h_title{
		height: 100rpx;
		line-height: 100rpx;
		color: #303133;
	}
	.h_item{
		height: 80rpx;
		line-height: 80rpx;
		color: #606266;
	}
	.h_item:last-child{
		padding-bottom: 30rpx;
		border-bottom: 2rpx solid #F2F6FC;
	}
	.m_textarea{
		background-color: #f3f3f3;
		margin-top: 20rpx;
		padding: 20rpx 0 0 20rpx;
		width: 100%;
		
	}
	.main{
		margin-bottom: 110rpx;
	}
</style>
