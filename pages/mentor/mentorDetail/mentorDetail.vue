<template>
	<view>
		<!-- 背景图片 -->
		<image :src="allData.image" class="backImg"></image>
		<div class='backBox'></div>
		<div class="mentorTop">
			<div>
				<image :src="allData.image" class="avaratImg"></image>
			</div>
			<div>
				<div class="mentorName">
					{{allData.name}}
				</div>
				<div class='mentorTags'>
					<span @click='onReduceFa' :hidden="!isCollection"><icon class="iconfont icon-xihuanlike" style="margin-right: 6rpx;color:#F56C6C ;"></icon>{{allData.collect}}</span>
					<span @click='onAddFa' :hidden="isCollection"><icon class="iconfont icon-xihuan" style="margin-right: 6rpx;color:#F56C6C ;"></icon>{{allData.collect}}</span>
					<span ><i class="iconfont icon-zhuanyerenzheng" ></i>{{allData.workYear}}年经验</span>
					<span ><i class="iconfont icon-didian" ></i>{{allData.addr}}</span></div>
			</div>
		</div>
		<div class="mentorMid">
			<div class="midTitle">基本信息</div>
			<div>
				<div class="midSubtitle">教育背景<image src='https://pic.job2020.cn/%E8%AF%81%E4%B9%A6.png' mode='widthFix'></image></div>
				<div class="midContent"><i class="iconfont icon-tianchongxing-" style="display: inline; color: #44A1FF;margin-right: 10rpx;"></i>{{allData.school}}<span style='margin-left: 15rpx;'>{{allData.major}}</span> </div>
			</div>
			<div>
				<div class="midSubtitle">企业</div>
				<div class="midContent"><i class="iconfont icon-qiye" style="display: inline; color: #44A1FF;margin-right: 10rpx;"></i>{{allData.company}}<span style='margin-left: 15rpx;'>{{allData.position}}</span></div>
			</div>
			<div>
				<div  class="midSubtitle">老师简介</div>
				<div class="midContent">{{allData.myself}}</div>
			</div>
		</div>
		
		<div class="mentorBottom">
			<div class='bottomContent'>
				<div class="midTitle">他的服务</div>
				<div class="funImg">
					<image src="https://pic.job2020.cn/%E5%B0%B1%E4%B8%9A%E8%A1%8C%E6%83%85.png" mode="widthFix" ></image>
					<image src="https://pic.job2020.cn/%E6%B1%82%E8%81%8C%E6%96%B9%E5%90%91.png" mode="widthFix"></image>
					<image src="https://pic.job2020.cn/%E6%B1%82%E8%81%8C%E5%8A%A9%E5%8A%9B.png" mode="widthFix"></image>
				</div>
			</div>
			
		</div>
		<div class="mentorBottom">
			<div class='bottomContent'>
				<div class="midTitle">服务流程</div>
				<div class="bottomImg">
					<image src="https://pic.job2020.cn/%E6%B5%81%E7%A8%8B.png" mode="widthFix"></image>
				</div>
			</div>
			
		</div>
		<div v-if='!isConsult' class='teachBtn' @click='onConsult'><icon class="iconfont icon-liuyan" style="font-size: 40rpx;margin-right: 10rpx;"></icon>预约指导</div>
		<div v-if='isConsult' class='noteachBtn'><icon class="iconfont icon-liuyan" style="font-size: 40rpx;margin-right: 10rpx;"></icon>已预约</div>
		<!-- 倒计时组件 -->
		<timer ></timer>
	</view>
</template>

<script>
	let tid = ''
	import timer from '../../../components/timer.vue'
	export default {
		data() {
			return {
				allData: null, //服务器数据
				isCollection: false,
				isConsult: false,
				excuteOnce: true,  //倒计时只执行一次
			}
		},
		components:{
			timer,
		},
		onLoad(option) {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			tid = option.tid
			console.log(getApp().globalData.uid)
			uni.request({
				url:'https://teacher.job2020.cn/teacher/doSelectBy',
				method:'GET',
				data:{
					tId:option.tid,
					openId:getApp().globalData.uid
				},
				success:(res)=> {
					this.isCollection = res.data.data.collected
					this.isConsult = res.data.data.appointment
					this.allData = res.data.data.teacher
					this.excuteOnce = res.data.data.taskstate
					if(!this.excuteOnce){
						this.$children[0].yeaId = 3
						this.$children[0].onStart()
						this.excuteOnce = true	
					}
				}
			})
		},
		onUnload() {
			console.log('我销毁了')
			this.$children[0].onEnd()
		},
		methods: {
			onSureGet(){
				this.cardShow = false
			},
			// 咨询
			onConsult(){
				uni.showModal({
					title:'温馨提示',
					content:'本次咨询需要支付50积分，是否确认?',
					success: (res)=> {
					        if (res.confirm) {
					           uni.request({
					           	url:'https://user.job2020.cn/conslut/addTeaconslut',
					           	method:'GET',
					           	data:{
					           		tId: tid,
					           		openId:getApp().globalData.uid
					           	},
					           	success: (res) => {
					           		console.log(res)
					           		if(res.data.code){
					           			uni.showToast({
					           				title:'预约成功',
					           				icon:'success'
					           			})
					           			this.isConsult = true
					           		}else{
					           			uni.showModal({
					           				 title: '温馨提示',
					           				 content: '积分不足，请充值',
					           				success: function (res) {
					           				        if (res.confirm) {
					           				            uni.navigateTo({
					           				            	url:'../../profile/buyCredits/buyCredits'
					           				            })
					           				        } else if (res.cancel) {
					           				            console.log('用户点击取消');
					           				        }
					           				    }
					           			})
					           		}
					           		
					           	}
					           })
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
				})
				
			},
			// 添加收藏
			onAddFa(){
				console.log('11111111111111111')
				uni.request({
					url:'https://user.job2020.cn/favorite/addTeafavorite',
					method:'GET',
					data:{
						tId: tid,
						openId:getApp().globalData.uid
					},
					success: (res) => {
						console.log(res)
						if(res.data.code){
							this.isCollection = true
							this.allData.collect += 1 
							uni.showToast({
								title:'收藏成功',
								icon:'success'
							})
						}
						
					}
				})
			},
			// 取消收藏
			onReduceFa(){
				uni.request({
					url:'https://user.job2020.cn/favorite/updatet',
					method:'GET',
					data:{
						tId: tid,
						openId:getApp().globalData.uid
					},
					success: (res) => {
						console.log(res)
						if(res.data.code){
							this.isCollection = false
							this.allData.collect -= 1 
							uni.showToast({
								title:'取消成功',
								icon:'success'
							})
						}
					}
				})
			},
			
		}
	}
</script>

<style scoped>
	.backImg{
		width: 100%;
		height: 370rpx;
		filter: blur(8px);
		background-color: #000000;
		position: relative;
		
	}
	.backBox{
		width: 100%;
		height: 370rpx;
		filter: blur(10px);
		background-color: #000000;
		opacity: 0.1;
		position: absolute;
		left: 0;
		top: 0;
	}
	.mentorTop{
		display: flex;
		/* width: 670rpx;
		margin: 0 auto; */
		position: absolute;
		left: 10%;
		top: 10%;
	}
	.avaratImg{
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.mentorName{
		font-size: 40rpx;
		color: #FFFFFF;
		font-weight: 600;
		margin-bottom: 30rpx;
	}
	.icon-didian{
		display: inline;
		font-size: 26rpx;
		margin-right: 5rpx;
		color: #44A1FF;
	}
	.icon-zhuanyerenzheng{
		display: inline;
		font-size: 26rpx;
		margin-right: 5rpx;
		color: #ffb530;
	}
	.mentorTags span{
		padding: 8rpx 20rpx;
		margin-right: 8rpx;
		text-align: center;
		border-radius: 40rpx;
		border: 2rpx solid #FFFFFF;
		color: #FFFFFF;
		font-weight: 100;
		font-size: 26rpx;
	}
	.mentorTags span:first-child{
		padding: 8rpx 30rpx;
		margin-right: 10rpx;
		text-align: center;
		border-radius: 40rpx;
		color: #FFFFFF;
		background-color: #927f79;
		font-weight: 100;
	}
	.mentorMid{
		width: 670rpx;
		margin: 50rpx auto 0;
	}
	.midTitle{
		font-size: 36rpx;
		font-weight: 600;
	}
	.midSubtitle{
		font-size: 30rpx;
		font-weight: 400;
		margin: 30rpx 0rpx 15rpx 0rpx;
		display: flex;
		align-items: center;
		color: #606266;
	}
	.midSubtitle image{
		width: 72rpx;
		height: 32rpx;
		margin-left: 10rpx;
	}
	.midContent{
		font-size: 26rpx;
		color: #909399;
		height: 50rpx;
		line-height: 50rpx;
	}
	.mentorBottom{
		margin-top: 50rpx;
		padding-top: 30rpx;
		border-top: 14rpx solid #EEEEEE;
	}
	.bottomContent{
		width: 670rpx;
		margin: 0 auto;
	}
	.funImg{
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}
	.funImg image{
		margin-right: 10rpx;
	}
	.bottomImg image{
		margin-bottom: 100rpx;
	}
	.teachBtn{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #44a1ff;
		color: #fff;
		text-align: center;
		border-radius: 4px;
	}
	.noteachBtn{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #a6a9ad;
		color: #fff;
		text-align: center;
		border-radius: 4px;
	}
	
</style>
