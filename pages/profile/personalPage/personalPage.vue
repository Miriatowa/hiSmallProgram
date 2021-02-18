<template>
	<!-- <scroll-view @scroll="onScrollY" scroll-top="10"scroll-y="true" class="scroll-Y" style="height: 110vh"> -->
		<view>
		<!-- 背景图 -->
		<div class="headBack">
			<image src="https://pic.job2020.cn/backgroundImg_01.jpg" mode="aspectFill" style="width: 100%;height: 400rpx;"></image>
			<icon class="iconfont icon-xiangzuo" @click="onBack"></icon>
		</div>
		
		<div class='content'>
			
		
		<!-- 头部信息部分 -->
		<div class="headMes">
			<div>
				<image :src="showData.head" class="avatarImg"></image>
			</div>
			<div class='headMes_r'>
				<div class="headMes_r_t">
					<div  class="nickname">{{showData.nickName}}<vipIcon :state='showData.memberstate'></vipIcon></div>
					<div class="headMes_r_t_like" @click='onGiveLike'>
						<i :class="isLike ?  'iconfont icon-dianzan_ isLike' : 'iconfont icon-dianzan_ '"></i>
						<div>{{showData.praise}}</div>
					</div>
				</div>
				<div class="headMes_r_b">
					<div class="other">
						<span><i :class="showData.sex == '男' ? 'iconfont icon-nan' : 'iconfont icon-nv'" >{{showData.age}}</i></span>
						<!-- <span><i class="iconfont icon-_xingzuoyuncheng" style="color: #fff;font-size: 22rpx;">狮子座</i></span> -->
						<span><i class="iconfont icon-tianchongxing-" style="color: #fff;font-size: 22rpx;">学生</i></span>
					</div>
					<div class='school'>{{showData.school}} · {{showData.major}}</div>
				</div>
				
			</div>
			
		</div>
		
		<!-- 个人相册部分 -->
		<div class="album">
			<div ><image class=".smallIcon" src="https://pic.job2020.cn/%E7%9B%B8%E5%86%8C.png"></image>个人相册</div>
			<div class="albumImage">
				<scroll-view class="scroll-view"  scroll-x="true" @scroll="onScroll" scroll-left="10" show-scrollbar  >
					<div style='width: 2000rpx;display: flex;'>
						<block v-for="item in showData.album" :key="item">
							<image :src="item" class="imageItem" @tap="onPreviewImage" :data-imgsrc="item"></image>
						</block>
					</div>
						
					              
				</scroll-view>
				
			</div>
		</div>
		
		<div class="tags">
			<div class="tagsTitle">社交账号</div>
			<div class="flexBox">
				<image src="https://pic.job2020.cn/wx.png"></image>
				<div >{{showData.weChat}}</div>
			</div>
			<div class="flexBox">
				<image src="https://pic.job2020.cn/qq.png"></image>
				<div>{{showData.qq}}</div>
			</div>
			<div class="tips">
				注：社交账号默认隐藏，打招呼同意后可查看。
			</div>
			<div class="tips">
				注：VIP用户打招呼，系统以短信通知对方，更快获得同意。
			</div>
		
		</div>
		<!-- 个人标签部分 -->
		<div class="tags">
			<div class="tagsTitle">个人标签</div>
			<div class='tagsFlexBox'>
				<i class="iconfont icon-biaoqian"></i>
				<div class="tagsItem">
					<block v-for="(item,index) in showData.label" :key='item'>
						<span>{{item}}</span>
					</block>
				</div>
			</div>
		</div>
		<div class="tips" >
			<slidingNotice :url='url'>
				<div slot='marquee_right'>
					<image src='https://pic.job2020.cn/%E6%8A%BD%E5%A5%96_13.png' class="slide_img" @click='toDraw'></image>
				</div>
			</slidingNotice>
		</div>
		<div style='height: 150rpx;'></div>
	</div>
	<timer v-if='btnShow'></timer>
	<div class="editBtn" v-if='!btnShow'  @click='toEditData'><i class="iconfont icon-bianji"></i>编辑资料</div>
	<div class="editBtn" v-if='btnShow & !isSayHi' @click='onSayHi' ><i class="iconfont icon-liuyan" ></i>打招呼</div>
	</view>
	<!-- </scroll-view> -->
</template>

<script>
	import vipIcon from '../../../components/vipIcon.vue'
	import timer from '../../../components/timer.vue'
	import slidingNotice from '../../../components/slidingNotice.vue'
	let identity = ''
	export default {
		data() {
			return {
				btnShow: true,
				imgScroll: 0,
				showData: null, //展示数据
				isLike: false,  //是否点赞
				isSayHi: false, //是否打招呼
				excuteOnce: 0,
				url: 'https://user.job2020.cn/details/greetscrollbar'
			}
		},
		components:{vipIcon,timer,slidingNotice},
		onLoad(option) {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			identity = option.identity
			console.log(option)
			if(identity == 0){
				uni.request({
					url:'https://user.job2020.cn/details/select',
					method:'GET',
					data:{
						dId:option.userId,
						pasId: getApp().globalData.uid
					},
					success:(res)=>{
						if(res.data.code !==0){
							this.isSayHi = true
						}
						if(res.data.code !== 1){
							let str = '*'
							res.data.userDetails.weChat=str.repeat(11)
							res.data.userDetails.qq=str.repeat(11)
						}
						console.log(res.data.taskstate)
						this.showData = res.data.userDetails
						this.excuteOnce = res.data.taskstate
						if(identity == 0 && this.excuteOnce === 0 ){
							console.log('我执行了')
									this.$children[2].yeaId = 2
									this.$children[2].onStart()
									this.excuteOnce = false
						}
					}
				})
				
				this.btnShow= true
			}else{
				uni.request({
					url:'https://user.job2020.cn/details/myself',
					method:'GET',
					data:{
						openId: getApp().globalData.uid
					},
					success:(res)=>{
						console.log(res)
						// this.isSayHi = res.data.code
						this.showData = res.data.data
						
					}
				})
				this.btnShow= false
				this.isSayHi = false
			}
		},
		
		onUnload() {
			if(identity == 0){
				console.log('我销毁了')
				this.$children[2].onEnd()
			}
			
		},
		methods: {
			toDraw(){
				uni.navigateTo({
					url: '../../mentor/questionnaire/luckDraw'
				})
			},
			// 点赞
			onGiveLike(){
				console.log(getApp().globalData.uid)
				console.log(this.showData.detId)
				if(this.isLike){
					return
				}else{
					uni.request({
						url: 'https://user.job2020.cn/details/doPraise',
						method:'GET',
						data:{
							dId: this.showData.detId,
							openId: getApp().globalData.uid
						},
						success: (res) => {
							console.log(res)
							this.isLike = true
							this.showData.praise += 1
						}
					})
				}
				
			},
			onScroll(e) {
			            console.log(e)
			            this.imgScroll = e.detail.scrollLeft
			        },
			onBack(){
				let url = identity == 0 ? '/pages/home/index/index' : '/pages/profile/index/index'
				uni.switchTab({
					url,
				})
			},
			// 编辑资料
			toEditData(){
				uni.redirectTo({
					url: './editPersonal'
				})
			},
			// 打招呼
			onSayHi(){
				uni.request({
					url: 'https://user.job2020.cn/details/addCall',
					method:'GET',
					data:{
						driId: this.showData.detId,
						pasId: getApp().globalData.uid
					},
					success: (res) => {
						console.log(res)
						if(res.data.data.code === 0){
							uni.showModal({
								title:'温馨提示',
								content: '积分不足，请前往充值',
								success: (res) => {
									if(res.confirm){
										uni.navigateTo({
											url: '../buyCredits/buyCredits'
										})
									}
								}
							})
						}else{
							console.log('我执行了')
							this.isSayHi = true
							uni.showToast({
								title:'发送成功',
								icon:'success',
								duration:1000
							})
						}
						
					}
				})
			},
			// 预览图片
			onPreviewImage(e) {
				uni.previewImage({
					urls: this.showData.album,
					current: e.target.dataset.imgsrc
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
	.icon-xiangzuo{
		color: #FFFFFF;
		font-size: 40rpx;
		font-weight: 600;
		position: fixed;
		left: 40rpx;
		top: var(--status-bar-height);
	}
	.content{
		width: 670rpx;
		margin: 0 auto;
	}
	.headMes{
		display: flex;
		margin: -75rpx 0 0 0;
	}
	.avatarImg{
		display: block;
		overflow: hidden;
		height: 150rpx;
		width: 150rpx;
		border-radius: 50%;
		margin-left: 20rpx;
		border: 2rpx solid #F8F8F8;
		padding: 0;
	}
	.headMes_r{
		flex: 1;
		margin-left: 10rpx;
	}
	.headMes_r_t{
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
		height: 75rpx;
	}
	.headMes_r_t_like{
		margin-bottom: 14rpx;
	}
	.headMes_r_t_like i{
		font-size: 40rpx;
	}
	.headMes_r_t_like{
		font-size: 24rpx;
	}
	.nickname{
		display: flex;
		align-items: center;
		font-weight: 600;
	}
	.headMes_r_b{
		height: 75rpx;
	}
	.school{
		font-size: 22rpx;
		color: #909399;
		margin-top: 10rpx;
	}
	.other span{
		background-color: #99bffe;
		padding: 5rpx 15rpx;
		border-radius: 20rpx;
		margin-right: 20rpx;
		font-size: 20rpx;
	}
	.other span i{
		display: inline;
	}
	
	.album{
		margin-top: 40rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.smallIcon{
		width: 32rpx;
		height: 32rpx;
		margin-right: 10rpx;
	}
	.albumImage{
		/* display: flex;
		justify-content: space-between; */
		margin-top: 30rpx;
	}
	.imageItem{
		height: 120rpx;
		width: 160rpx;
		margin-top: 20rpx;
		border-radius: 20rpx;
		margin-left: 20rpx;
	}
	.imageItem:last-child{
		margin-right: 20rpx;
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
	}
	.isLike{
		animation: turnReverse 1s ease;
		transform: rotateY(-30deg);
		color: #ffb530;
	}
	
	
	
	
	.tags{
		margin-top: 20rpx;
		
		padding: 20rpx 0 40rpx 0;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.hobbies{
		margin-top: 20rpx;
		margin-bottom: 100rpx;
		padding: 20rpx 0 40rpx 0;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.tags:last-child{
		border: none;
		margin-bottom: 100rpx;
	}
	.tagsTitle{
		color: #85a7ca;
		font-size: 28rpx;
	}
	.tagsFlexBox,.hobbyFlexBox,.movieFlexBox{
		display: flex;
		align-items: center;
		margin-top: 35rpx;
	}
	.tagsFlexBox i{
		display: inline-block;
		padding: 5rpx;
		border-radius: 15rpx;
		background-color: #84bcf7;
		color: #FFFFFF;
		margin-right: 20rpx;
		font-size: 24rpx;
	}
	.hobbyFlexBox i{
		display: inline-block;
		padding: 5rpx;
		border-radius: 15rpx;
		background-color: #cabef0;
		color: #FFFFFF;
		margin-right: 20rpx;
		font-size: 24rpx;
	}
	.movieFlexBox i{
		display: inline-block;
		padding: 5rpx;
		border-radius: 15rpx;
		background-color: #fed378;
		color: #FFFFFF;
		margin-right: 20rpx;
		font-size: 24rpx;
	}
	.tagsItem{
		display: flex;
		flex-wrap: wrap;
	}
	.tagsItem span{
		background-color: #e4ebfe;
		color: #84bcf7;
		padding: 9rpx 18rpx;
		margin-right: 10rpx;
		border-radius: 15rpx;
		font-size: 24rpx;
		margin-top: 20rpx;
	}
	.tagsItem_2 span{
		background-color: #cabef0;
		color: #8771c1;
		padding: 9rpx 18rpx;
		margin-right: 10rpx;
		border-radius: 15rpx;
		font-size: 24rpx;
	}
	.tagsItem_3 span{
		background-color: #fed378;
		color: #daa02b;
		padding: 9rpx 18rpx;
		margin-right: 10rpx;
		border-radius: 15rpx;
		font-size: 24rpx;
	}
	.editBtn{
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
	.editBtn i{
		display: inline;
		margin-right: 10rpx;
	}
	.icon-nv{
		color: pink;
		font-size: 22rpx;
	}
	.icon-nan{
		color: #FFFFFF;
		font-size: 22rpx;
	}
	.slide_img{
		width: 100rpx;
		height: 100rpx;
	}
</style>
