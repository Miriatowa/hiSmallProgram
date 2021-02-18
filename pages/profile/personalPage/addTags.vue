<template>
	<view>
		<div class='main'>
			<div class='title'>添加标签</div>
			<div class='tips'>已添加{{myTags.length}}个标签，还可以添加{{8- myTags.length}}个。</div>
			<div class='tagsBox'>
				<block v-for="(item,index) in  defaultTags " :key='tags'>
					<div :class="['every-sign-item',`signstyle-${index%6}`]" @click='onSelectTags' :data-tag='item'>{{item}}</div>
				</block>
				<div class='defaultTag' @click='onAddDeauftTag'><i class='iconfont icon-21'></i>自定义标签</div>
			</div>
			<div class='mytags'>我的标签</div>
			<div class='tagsBox'>
				<block v-for="(item,index) in  myTags " :key='tags'>
					<div :class="['every-sign-item',`signstyle-${index%6}`]" >{{item}}<i class='iconfont icon-jianhao' @click='onReducetTags' :data-index='index'></i></div>
				</block>
			</div>
			
		</div>
		<!-- 弹出层 -->
		<div class="maskBox">
			<mask :maskShow="isShow">
				<div class="addTagBox" ref="tagBox">
					<input placeholder="标签内容" class="tagsContent" @input="onInputTags" :value="value" maxlength="8" ref='input' />
					<div class="addTagsBtn">
						<div class="btn" @click="onCancel">取消</div>
						<div class="btn" @click="onSure">添加</div>
						
					</div>
				</div>
			</mask>
		</div>
		<!-- 提交按钮 -->
		<bottomBtn message='保存标签' @onClick='onSubmit'></bottomBtn>
	</view>
</template>

<script>
	import mask from '../../../components/mask.vue'
	import bottomBtn from '../../../components/bottomBtn.vue'
	export default{
		data(){
			return {
				defaultTags: ['打工人','共享单车人' ,'干饭王' ,'王者荣耀','小清新','可爱','摄影','狼人杀','逗比','我这么美我不能死','背包客',],
				myTags:[],
				isShow: false,
				value:'',
				showData: {}
			}
		},
		components:{mask,bottomBtn},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.request({
				// url: 'https://user.job2020.cn/details/myself',
				url:'https://user.job2020.cn/details/myself',
				method: 'GET',
				data: {
					openId: getApp().globalData.uid
				},
				success: (res) => {
					this.showData =res.data.data
					this.myTags = this.showData.label
				}
			})
		},
		methods:{
			// 选择标签
			onSelectTags(e){
				if(this.myTags.length > 7){
					return
				}
				if(this.myTags.includes(e.currentTarget.dataset.tag)){
					return
				}
				this.myTags.push(e.currentTarget.dataset.tag)
				console.log(this.myTags)
				
			},
			// 减少标签
			onReducetTags(e){
				this.myTags.splice(e.currentTarget.dataset.index,1)
				console.log(this.myTags)
			},
			onInputTags(e){
				console.log(this.$refs)
				this.value = e.detail.value
			},
			onSure(){
				this.defaultTags.push(this.value)
				this.value=''
				this.isShow = false
			},
			onCancel(){
				this.isShow = false
			},
			onAddDeauftTag(){
				
				
				this.isShow = true
			},
			// 保存标签
			onSubmit(){
				this.showData['label'] = this.myTags
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
							
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.main{
		width: 670rpx;
		margin: 0 auto;
	}
	.title{
		font-size: 50rpx;
		font-weight: 500;
	}
	.mytags{
		font-size: 50rpx;
		font-weight: 500;
		margin-top: 100rpx;
		margin-bottom: 30rpx;
	}
	.tips{
		margin-top: 10rpx;
		margin-bottom: 30rpx;
		color: #909399;
		font-size: 26rpx;
	}
	.tagsBox{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.defaultTag{
		padding: 4rpx 16rpx;
		border-radius: 24rpx;
		font-size: 24rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		color: #606266;
		border: 1px dashed #606266;
	}
	.icon-21{
		display: inline;
		font-size: 24rpx;
	}
	.icon-jianhao{
		display: inline;
	}
	.every-sign-item{
		padding: 4rpx 16rpx;
		border-radius: 24rpx;
		font-size: 24rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
	.signstyle-0{
		color: #3ac9e3;
		border: 1px solid #3ac9e3;
	}
	.signstyle-1{
		color: #fd8888;
		border: 1px solid #fd8888;
	}
	.signstyle-2{
		color: #a9d5e6;
		border: 1px solid #a9d5e6;
	}
	.signstyle-3{
		color: #bab4cc;
		border: 1px solid #bab4cc;
	}
	.signstyle-4{
		color: #92b0ea;
		border: 1px solid #92b0ea;
	}
	.signstyle-5{
		color: #b5ac98;
		border: 1px solid #b5ac98;
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
</style>
