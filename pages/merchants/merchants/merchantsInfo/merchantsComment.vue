<template>
	<view class="index">
		<form  @submit="formSubmit">
		<view class="head">
			<div class='h_title'>投票主题</div>
			<textarea name='title' class="content"  placeholder="输入投票主题(20字以内)" maxlength="20" auto-focus @focus="onFocus" @blur="onBlur"></textarea>
			<div class='h_img'>
				<div>上传图片</div>
				<uploadImg @uploadImg="getUploadImg"></uploadImg>
			</div>
			<div class='h_title'>投票选项</div>
			<div class='h_select'>
				
					<div class='h_select_item'>
						<div></div> <input placeholder="选项一" name='selectionOne' />
					</div>
					<div class='h_select_item'>
						<div></div> <input placeholder="选项二" name='selectionTwo' />
					</div>
					<div class='h_select_item' v-if='indexArr.length > 2' >
						<div @click='reduceItem(2)'><i class="iconfont icon-jianhao"></i></div> <input placeholder="选项三" name='selectionThree' />
					</div>
					<div class='h_select_item' v-if='indexArr.length > 3'  >
						<div @click='reduceItem(3)'><i class="iconfont icon-jianhao"></i></div> <input placeholder="选项四" name='selectionFour' />
					</div>
					<div class='h_select_addItem' @click='addItem' v-if='indexArr.length < 4' >
						<div ><i class="iconfont icon-jiahao"></i></div> <span style='color: #44A1FF;'>添加选项</span>
					</div>
			</div>
			<div class='h_title'>投票设置</div>
			<div class='h_select'>
				<div class='h_set_item' ><div>截止日期</div><picker name='deadline' mode="date" :value="date" :start="startDate"  @change="bindDateChange">{{date}}</picker></div>
				<div class='h_set_item'><div>匿名发起</div><switch color='#44A1FF' name='anonymity' /></div>
			</div>
			<button form-type="submit" class="submitBtn">发起投票</button>
			<div class='h_title'></div>
		</view>
		
		</form>
	</view>
</template>

<script>
	import uploadImg from '../../../../components/uploadImg.vue'
	// 评论内容
	let content = ''
	// 商家id
	let merchantsId=''
	let i = 2
	export default {
		
		data() {
			return {
				// 输入字数
				wordsNum: 0,
				// 键盘高度
				footerBottom: 0,
				// 当前图片数量
				images: [],
				submitData: {} ,//提交数据
				date: '请选择截止日期',
				indexArr: [1 , 2]
			}
		},
		onLoad(option){
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			merchantsId =  option.merchantsId
			
		},
		computed: {
		        startDate() {
					const date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();
					month = month > 9 ? month : '0' + month;;
					day = day > 9 ? day : '0' + day;
					return `${year}-${month}-${day}`;           
		        },
		    },
		components:{
			uploadImg
		},
		methods: {
			// 添加选项
			addItem(){
				if(i< 4 ){
					i += 1
					this.indexArr.push(i)
				}
				console.log(this.indexArr)
			},
			// 删除选项
			reduceItem(idx){
				console.log(idx)
				this.indexArr.splice(idx,1)
				i -= 1
				console.log(this.indexArr)
			},
			// 选择时间
			bindDateChange(e){
				this.date = e.detail.value
			},
			onFocus(e) {
				this.footerBottom = e.detail.height
			},
			onBlur() {
				this.footerBottom = 0
			},
			// 选择图片
			getUploadImg(res){
				this.images=res
			},
			// 提交数据
			formSubmit(e){
				console.log(e.detail.value)
				let tempArr = []
				if(!e.detail.value.selectionThree){
					e.detail.value.selectionThree=''
				}
				if(!e.detail.value.selectionFour){
					e.detail.value.selectionFour=''
				}
				tempArr.push(e.detail.value.selectionOne)
				tempArr.push(e.detail.value.selectionTwo)
				tempArr.push(e.detail.value.selectionThree)
				tempArr.push(e.detail.value.selectionFour)
				delete e.detail.value.selectionOne
				delete e.detail.value.selectionTwo
				delete e.detail.value.selectionThree
				delete e.detail.value.selectionFour
				this.submitData = e.detail.value
			  if(this.submitData['title'] === '' && this.submitData['deadline']=== ''){
			    uni.showModal({
			      title: '信息不足',
			      content: '',
			    })
			    return
			  }
			  uni.showLoading({
			    title: '发布中...',
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
			       	'ident': 7
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
					this.submitData["openId"]=getApp().globalData.uid
					this.submitData['options'] = tempArr
					this.submitData['image'] = fileIds
					this.submitData['merId'] = merchantsId
					console.log(this.submitData)
					uni.request({
						url:'https://user.job2020.cn/details/addMvot',
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
		}
	}
</script>

<style scoped>
	@keyframes turnReverse{
	      0%{-webkit-transform: scale(0)}
	      125%{-webkit-transform: scale(0.25)}
	      50%{-webkit-transform: scale(0.5)}
	      175%{-webkit-transform: scale(0.75)}
	      100%{-webkit-transform: scale(1)}
	    }
	.index{
		background-color: #EEEEEE;
	}
	.h_title{
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #606266;
		margin-left: 40rpx;
	}
	.content {
		width: 100%;
		height: 70rpx;
		line-height: 7rpx;
		background-color: #FFFFFF;
		box-sizing: content-box;
		padding: 35rpx 0rpx 0rpx 40rpx;
		font-size: 30rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.h_img{
		/* display: flex; */
		padding-left: 40rpx;
		align-items: center;
		background-color: #FFFFFF;
	}
	.h_img div{
		padding-top: 20rpx;
		font-size: 28rpx;
		color: #606266;
	}
	.h_select{
		background-color: #FFFFFF;
	}
	.h_select_item,.h_set_item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 670rpx;
		margin: 0 auto;
		height: 100rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.h_select_addItem{
		display: flex;
		align-items: center;
		width: 670rpx;
		margin: 0 auto;
		height: 100rpx;
	}
	.h_set_item{
		color: #606266;
	}
	.h_select_item input{
		flex: 1;
	}
	.h_select_item div{
		width: 50rpx;
		font-size: 28rpx;
	}
	.icon-jianhao{
		font-size: 36rpx;
		color: #f1736f;
	}
	.icon-jiahao{
		font-size: 36rpx;
		color: #44a1ff;
		margin-right: 20rpx;
	}
	switch{
		transform: scale(0.6);
	}
	.submitBtn{
		width: 670rpx;
		background-color: #44A1FF;
		color: #FFFFFF;
		margin-top: 50rpx;
	}
	button:after {
	    border: none;  
	}
</style>
