<template>
	<view class="index">
		<form  @submit="formSubmit">
		<view class="head">
			<div class='h_title'>圈子名称</div>
			<textarea name='title' class="content"  placeholder="输入圈子名称" maxlength="20"  @blur="onBlur"></textarea>
			<div class='h_title'>圈子描述</div>
			<textarea name='title' class="content"  placeholder="输入圈子描述" maxlength="50"  @blur="onBlur"></textarea>
			<div class='h_title'>圈子标签</div>
			<div class='h_select'>
				
					<div class='h_select_item'>
						<div></div> <input placeholder="标签一" name='selectionOne' />
					</div>
					<div class='h_select_item'>
						<div></div> <input placeholder="标签二" name='selectionTwo' />
					</div>
					<div class='h_select_item' v-if='indexArr.length > 2' >
						<div @click='reduceItem(2)'><i class="iconfont icon-jianhao"></i></div> <input placeholder="标签三" name='selectionThree' />
					</div>
					<div class='h_select_item' v-if='indexArr.length > 3'  >
						<div @click='reduceItem(3)'><i class="iconfont icon-jianhao"></i></div> <input placeholder="标签四" name='selectionFour' />
					</div>
					<div class='h_select_addItem' @click='addItem' v-if='indexArr.length < 4' >
						<div ><i class="iconfont icon-jiahao"></i></div> <span style='color: #44A1FF;'>添加标签</span>
					</div>
			</div>
			<div class='h_title'>圈子设置</div>
			<div class='h_select'>
				<div class='h_set_item' ><div>日期</div><picker name='deadline' mode="date" :value="date" :start="startDate"  @change="bindDateChange">{{date}}</picker></div>
				<div class='h_set_item'><div>权限密码</div><switch color='#44A1FF' name='anonymous' @change='onPermission' /></div>
				<div class='h_set_item' v-if='isPermission'><div>设置密码</div><input placeholder="设置密码" /></div>
				
			</div>
			<button form-type="submit" class="submitBtn">发起投票</button>
			<div class='h_title'></div>
		</view>
		
		</form>
	</view>
</template>

<script>
	let i =2
	export default{
		data(){
			return {
				type: ['圈子类型','游戏','明星','动漫','宠物','星座','其它'], //圈子类别数据
				typeIdex: 0,  //选择学校索引
				images: [], //图片临时路径
				submitData: {},  //提交数据
				date: '请选择截止日期',
				indexArr: [1 , 2],
				isPermission:false
			}
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
		methods:{
			onPermission(e){
				this.isPermission = e.detail.value
			},
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
										this.submitData['type'] = this.type[Number(this.submitData.type)]
										this.submitData['openId'] = getApp().globalData.uid
										 console.log(this.submitData)
										 uni.request({
										 	url:'http://192.168.31.7:8090/details/addWall',
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
				
			}
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
