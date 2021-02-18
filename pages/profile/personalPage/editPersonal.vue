<template>
	<view>
		<div class="main">
			<div class="mainTop">
				<div class="mesItemAva">
					<span>头像</span>
					<div class="avaBox">
						<image @click="onChangeAva" :src="showData.head" mode="widthFix"></image>
						<icon class="iconfont icon-xiangyou1"></icon>
					</div>
				</div>
				<div class="mesItem">
					<span>昵称：</span>
					<div>
						<input :value="showData.nickName" @input="inputNickname" maxlength="12" />
					</div>
				</div>
				<div class="mesItem">
					<span>性别：</span>
					<div>
						<picker :range="sex" :value="sexIndex" @change="onSelectSex">
							<view>{{sex[sexIndex]}}</view>
						</picker>
					</div>
				</div>
				<div class="mesItem">
					<span>年龄：</span>
					<div>
						<input :value="showData.age" @input="inputAge" type="number" maxlength="2" />
					</div>
				</div>
				<div class="mesItem">
					<span>学校：</span>
					<div><input placeholder="请输入学校" @input="onIputSchool" :value="showData.school" /></div>
				</div>
				<div class="mesItem">
					<span>专业：</span>
					<div><input placeholder="请输入专业" @input="onIputMajor" :value="showData.major" /></div>
				</div>

			</div>
			<div class="mainBottom">
				<div class="mainTop">
					<div class="bottomTitle">社交账号</div>
					<div class="flexBox">
						<image src="https://pic.job2020.cn/wx.png"></image>
						<input class='inputSocial'  v-if="editWx" @input="inputWx" @blur="blurWx" />
						<div  v-if="!editWx" @click='toEditWx'>{{showData.weChat}}<i class="iconfont icon-bianji" ></i></div>
					</div>
					<div class="flexBox">
						<image src="https://pic.job2020.cn/qq.png"></image>
						<input class='inputSocial'  v-if="editQQ"  @input="inputQq" @blur="blurQq" />
						<div  @click='toEditQq' v-if="!editQQ">{{showData.qq}}<i class="iconfont icon-bianji" ></i></div>
					</div>
					<div class="tips">
						注：社交账号默认隐藏，打招呼同意后可查看。
					</div>

				</div>
				<div class="mainBottomAlbum">
					<div class="bottomTitle">个人相册</div>
					<div>
						<scroll-view class="scroll-view" scroll-x="true" @scroll="onScroll" scroll-left="10" show-scrollbar>
							<div style='width: 2000rpx;display: flex;'>
								<block v-for="item in showData.album" :key="item">
									<image :src="item" class="imageItem"></image>
									<!-- <i class="iconfont icon-shanchu" @tap="onDelImage" :data-index="index"></i> -->
								</block>
								<div class="addMoreItem" @click='onLoadImg' :hidden="!selectPhoto"><i class="iconfont icon-21"></i></div>
							</div>
						</scroll-view>
					</div>
				</div>
				<div class="mainTop">
					<div class="bottomTitle">个人标签</div>
					<div class="tagBox">
						<block v-for="item in showData.label" :key='item'>
							<span class="tagItem">{{item}}</span>
						</block>
						<span class="tagItem" @click='toAddTags'><i class="iconfont icon-21 " style="display: inline"></i></span>
					</div>
				</div>
				<div style='height: 100rpx;'></div>
				<!-- <div class="myHobbies">
					<div class="bottomTitle">我的兴趣</div>
					<div class='hobbyFlexBox'>
						<i class="iconfont icon-lanqiu"></i>
						<div class="tagsItem_2">
							<span>篮球</span>
							<span>跑步</span>
							<span>游戏</span>
							<span><i class="iconfont icon-21 " style="display: inline"></i></span>
						</div>
					</div>
					<div class='movieFlexBox'>
						<i class="iconfont icon-dianying"></i>
						<div class="tagsItem_3">
							<span>肖申克的救赎</span>
							<span>泰坦尼克号</span>
							<span>我不是药神</span>
							<span><i class="iconfont icon-21 " style="display: inline"></i></span>
						</div>
					</div>

				</div> -->
			</div>
		</div>
		<div class="editBtn" @click='onEditData' @>保存编辑</div>
	</view>
</template>

<script>
	const MAX_IMG_NUM = 3
	export default {
		data() {
			return {
				sexIndex: 0,
				sex: ["男", "女"],
				tags: [],
				submitData: {}, //提交到数据库
				showData: {},
				editWx: false,
				editQQ: false,
				selectPhoto:true,
				tempImg:[],
			}
		},
		onShow() {
				getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
				uni.request({
					url: 'https://user.job2020.cn/details/myself',
					method: 'GET',
					data: {
						openId: getApp().globalData.uid
					},
					success: (res) => {
						console.log(res.data)
						this.showData = res.data.data
						if (this.showData.sex == '女'){
							this.sexIndex = 1
						}
						this.selectPhoto = this.showData.album.length > 9 ? false : true
					}
				})
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
						       		this.showData.head = res.data
						           }
						       });
					}
				});
			},
			inputNickname(e){
				console.log(e)
				this.showData['nickName'] = e.detail.value
			},
			// 性别
			onSelectSex(e) {
				this.sexIndex = e.detail.value
				this.showData['sex'] = this.sex[this.sexIndex]
			},
			// 年龄
			inputAge(e) {
				this.showData['age'] = e.detail.value
			},

			// 学校
			onIputSchool(e) {
				this.showData['school'] = e.detail.value
			},
			// 专业
			onIputMajor(e) {
				this.showData['major'] = e.detail.value
			},
			// 编辑微信
			toEditWx(){
				this.editWx = true
			},
			inputWx(e){
				console.log( e.detail.value)
				this.showData['weChat'] = e.detail.value
			},
			blurWx(){
				this.editWx = false
			},
			// 编辑QQ
			toEditQq(){
				this.editQQ = true
			},
			inputQq(e){
				console.log( e.detail.value)
				this.showData['qq'] = e.detail.value
			},
			blurQq(){
				this.editQQ = false
			},
			// 上传图片
			onLoadImg(){
				let max = MAX_IMG_NUM - this.tempImg.length
				uni.chooseImage({
					count: max,
					sizeType: [ 'compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						console.log(res.tempFilePaths,'1')
						const tempFilePaths = res.tempFilePaths;
						tempFilePaths.forEach(item =>{
							uni.uploadFile({
							    url: 'https://company.job2020.cn/picture/image',
							    filePath: item,
							    name: 'file',
							    formData: {
							        'ident': 1
							    },
							    success: (res) => {
									this.showData.album.push(res.data)
							    }
							});
						})
						this.selectPhoto = this.showData.album.length > 9 ? false : true
					},
				})
			},
			toAddTags(){
				uni.navigateTo({
					url:`./addTags`
				})
			},
			
			
			onScroll(e) {
				console.log(e)
				this.imgScroll = e.detail.scrollLeft
			},
			onBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 编辑资料
			onEditData() {
				console.log(this.showData)
				uni.request({
					url: 'https://user.job2020.cn/details/updateMyself',
					method: 'POST',
					data:this.showData,
					success: (res) => {
						if(res.data.status == 200){
							uni.showToast({
							    title: '修改成功',
							    duration: 2000
							});
							uni.redirectTo({
								url: './personalPage?identity = 0'
							})
						}
					}
				})
			},

		},
	}
</script>

<style scoped>
	.mainTop {
		width: 670rpx;
		margin: 0 auto;
	}

	.mesItemAva {
		font-weight: 200;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 150rpx;
		width: 100%;
		border-bottom: 2rpx solid #eee;
	}

	.mesItem {
		font-weight: 200;
		display: flex;
		align-items: center;
		height: 100rpx;
		width: 100%;
		border-bottom: 2rpx solid #eee;
	}
	.mesItem div{
		flex: 1;
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

	.mainBottom {
		border-top: 16rpx solid #EEEEEE;
	}

	.bottomTitle {
		font-size: 32rpx;
		margin-top: 50rpx;
		font-weight: 600;
	}

	.flexBox {
		display: flex;
		margin-top: 30rpx;
	}

	.flexBox image {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.flexBox div {
		background-color: #dbfada;
		color: #51c486;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 26rpx;
		padding: 0rpx 20rpx;
		border-radius: 10rpx;
	}

	.flexBox:nth-child(3) div {
		background-color: #d3e5fc;
		color: #7badd4;
	}

	.tips {
		margin-top: 20rpx;
		font-size: 20rpx;
		color: #C0C4CC;
		padding-bottom: 30rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.inputSocial{
		background-color: #FFF;
		border-radius: 4px;
		border: 1px solid #DCDFE6;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		color: #606266;
		height: 50rpx;
		line-height: 50rpx;
		outline: 0;
		padding: 0 15px;
		width: 50%;
	}
	.mainBottomAlbum {
		width: 670rpx;
		margin: 0 auto;
		border-bottom: 2rpx solid #EEEEEE;
		padding-bottom: 30rpx;
	}

	.imageItem {
		height: 120rpx;
		width: 160rpx;
		margin-top: 20rpx;
		border-radius: 20rpx;
		margin-left: 20rpx;
	}

	.addMoreItem {
		height: 120rpx;
		width: 160rpx;
		margin-top: 20rpx;
		border-radius: 20rpx;
		margin-left: 20rpx;
		background-color: #f3f3f3;
		text-align: center;
		color: #C0C4CC;
		line-height: 120rpx;
	}

	.imageItem:last-child {
		margin-right: 20rpx;
	}

	.tagItem {
		padding: 10rpx 15rpx;
		font-size: 24rpx;
		background-color: #fde2e2;
		color: #fe9999;
		margin-right: 20rpx;
		border-radius: 10rpx;
		margin-top: 20rpx;
	}

	.tagBox {
		margin-top: 30rpx;
		padding-bottom: 30rpx;
		border-bottom: 2rpx solid #EEEEEE;
		display: flex;
		flex-wrap: wrap;
	}



	.tagsFlexBox,
	.hobbyFlexBox,
	.movieFlexBox {
		display: flex;
		align-items: center;
		margin-top: 35rpx;
	}

	.hobbyFlexBox i {
		display: inline-block;
		padding: 5rpx;
		border-radius: 15rpx;
		background-color: #cabef0;
		color: #FFFFFF;
		margin-right: 20rpx;
		font-size: 24rpx;
	}

	.movieFlexBox i {
		display: inline-block;
		padding: 5rpx;
		border-radius: 15rpx;
		background-color: #fed378;
		color: #FFFFFF;
		margin-right: 20rpx;
		font-size: 24rpx;
	}

	.tagsItem span {
		background-color: #e4ebfe;
		color: #84bcf7;
		padding: 9rpx 18rpx;
		margin-right: 10rpx;
		margin-top: 30rpx;
		border-radius: 15rpx;
		font-size: 24rpx;
	}

	.tagsItem_2 span {
		background-color: #cabef0;
		color: #8771c1;
		padding: 9rpx 18rpx;
		margin-right: 10rpx;
		border-radius: 15rpx;
		font-size: 24rpx;
	}

	.tagsItem_3 span {
		background-color: #fed378;
		color: #daa02b;
		padding: 9rpx 18rpx;
		margin-right: 10rpx;
		border-radius: 15rpx;
		font-size: 24rpx;
	}

	.myHobbies {
		width: 670rpx;
		margin: 0 auto;
		padding-bottom: 120rpx;
	}

	.editBtn {
		position: fixed;
		left: 0;
		bottom: 0;
		height: 100rpx;
		width: 100%;
		background-color: #44a1ff;
		color: #FFFFFF;
		text-align: center;
		line-height: 100rpx;
	}
	.icon-bianji{
		display: inline;
		margin-left: 6rpx;
	}
	
</style>
