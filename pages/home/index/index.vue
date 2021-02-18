<template>
	<view >
	<!-- 登录后展示 -->
	<div class="main">
		<!-- 通告栏begin -->
		<slidingNotice :url="url">
			<div slot='marquee_right'>
				<image src='https://pic.job2020.cn/%E9%9B%86%E5%8D%A1_1.png' class="slide_img" @click='toDraw' mode="aspectFit"></image>
			</div>
		</slidingNotice>
		<!-- 通告栏end -->
		
		
		<!-- 导航栏begin -->
		<div class="navagitorBar">
			<navigator url="./loveWall/loveWall" hover-class="none">
				<image src="https://pic.job2020.cn/%E8%A1%A8%E7%99%BD%E5%A2%99_1.png" ></image>
				<div>表白墙</div>
			</navigator>
			<navigator url="./interestCircle/interestCircle" hover-class="none">
				<image src="https://pic.job2020.cn/%E5%85%B4%E8%B6%A3%E5%9C%88_1.png" ></image>
				<div>兴趣圈</div>
			</navigator>
			<navigator url="../../profile/mySocial/mySocial" hover-class="none">
				<image src="https://pic.job2020.cn/%E5%85%AC%E5%91%8A_1.png" ></image>
				<div>我的招呼</div>
			</navigator>
			
			<navigator url="" hover-class="none" @click="toMore">
				<image src="https://pic.job2020.cn/%E6%9B%B4%E5%A4%9A_1.png" ></image>
				<div>更多</div>
			</navigator>
		</div>
		<!-- 导航栏end -->
		
		<!-- 中间卡片begin -->
			<div :class="flag ? 'mesCardAni' : 'mesCard'" @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend" >
				<div class="cardTop">
					<image  class="cardImg" :src="vipMember[i].head"  @click="toUserDetail(vipMember[i])"></image>
					<div class="imageNum">
						<div class="imgIcon">
							<div><i class="iconfont icon-tupian">{{vipMember[i].imagenumber}}</i></div>
							<div @click='toReport(vipMember[i].detId)'><i class="iconfont icon-jubao" ></i>举报</div>
						</div>
						<div>
							
							<i class="iconfont icon-icon-" @click="onScreening"></i>
						</div>
					</div>
				</div>
				<div class="cardBottom">
					<!-- <image src='https://pic.job2020.cn/%E8%B5%84%E6%BA%90%2015.png' class="giveLikeIcon" @click="onGiveLike(vipMember[i].did)"></image> -->
					<div class="giveLikeIcon"> 
					<div :class="isLike ? 'likeBox_1' : 'likeBox_2'"  @click='onGiveLike(vipMember[i].detId)'>
						<icon :class="isLike ? 'iconfont icon-xuanzhong' : 'iconfont icon-xihuanlike'" ></icon>
					</div>
					</div>
					<div class="name">
					<div>{{vipMember[i].nickName}}</div>
					<vipIcon :state='vipMember[i].memberstate'></vipIcon>
					</div>
					<div class="other">
						<span><i :class="vipMember[i].sex == '女' ? 'iconfont icon-nv' : 'iconfont icon-nan' ">{{vipMember[i].age}}</i></span>
						<!-- <span><i class="iconfont icon-_xingzuoyuncheng" style="color: #fff;font-size: 22rpx;">狮子座</i></span> -->
						<span><i class="iconfont icon-tianchongxing-" style="color: #fff;font-size: 22rpx;">学生</i></span>
					</div>
					<div class='school'>{{vipMember[i].school}}</div>
				</div>
			</div>
		<!-- 中间卡片end -->
		
		<!-- 弹出层begin -->
		<mask :maskShow='maskShow'>
			<div class="maskBox">
			<div class="head">
				<span>● 基础筛选</span>
				<div class="sureBtn" @click="onSureBtn">确定</div>
			</div>
			<div>
				<div class="screeningItem">
					学校： <picker :range="school" :value="index" range-key="name" @change="onSelectSchool" >{{school[index].name}}</picker>
				</div>
				<div class="screeningItem">
					性别： <picker :range="sex" :value="index" @change="onSelectSex">{{sex[sexIndex]}}</picker>
				</div>
				<div class="screeningItem">
					年龄：  <slider value="20" @change="sliderChange" min="18" max="27" show-value block-size=15 block-color='#44a1ff' activeColor='#44a1ff' />
				</div>
			</div>
			</div>
		</mask>
		<!-- 弹出层end -->
	</div>
	
    
	</view>
</template>

<script>
	import mask from '../../../components/mask.vue'
	import vipIcon from '../../../components/vipIcon.vue'
	import slidingNotice from '../../../components/slidingNotice.vue'
	export default {
		data() {
			return {
				index: 0,
				school:[],
				sexIndex: 0,
				sex:['请选择','男','女'],
				age: '',
				submitData:{},   //筛选数据
				vipMember:[] ,//会员信息
				i:0,
				flag: 0,
				lastX: 0,
				lastY: 0,
				maskShow: false,  //控制弹出层
				currentId: '',
				isLike: false,
				url: 'https://user.job2020.cn/details/banscrollbar'
			}
		},
		components:{
			mask,
			vipIcon,
			slidingNotice
		},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			if(getApp().globalData.uid){
				uni.request({
					url:"https://user.job2020.cn/details/doSelect",
					method:"GET",
					data:{
						openId: getApp().globalData.uid
					},
					success:(res)=>{
						console.log(res)
						if(res.data.code !== 0){
							this.vipMember=res.data.list
							console.log(res)
						}else{
							uni.showModal({
								title:"温馨提示",
								content:"积分不足，请充值",
								success:(res)=>{
								 if (res.confirm) {
									 console.log('确定')
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
				uni.request({
					url:'https://company.job2020.cn/school/findHeat',
					method:'GET',
					success: (res) => {
						res.data.unshift({name: '高校'})
						this.school = res.data
					}
				})
			}else{
				uni.showModal({
				    title: '温馨提示',
				    content: '亲，本产品需登录方可使用...',
					showCancel: false,
					confirmText: '前往登录',
					confirmColor:'#44a1ff',
				    success: (res) => {
				        if (res.confirm) {
				           uni.navigateTo({
				           	url:'/pages/home/registered/identityChoice/identityChoice'
				           })
				        } 
				    }
				})
			}
			
		},
		methods: {
			toDraw(){
				uni.navigateTo({
					url:'../../mentor/announcement/activityOne/activityOne'
				})
			},
			// 跳转到更多
			toMore(){
				uni.showModal({
					
						 title: '温馨提示',
						 content: '此模块尚在测试，敬请期待...',
						 success: function (res) {
						        if (res.confirm) {
						            console.log('用户点击确定');
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
				})
			},
			// 学生
			onStudent(){
				uni.navigateTo({
					url:"../registered/perfectInformationOne/perfectInformationOne?identity=student"
				})
			},
			// 举报
			toReport(id){
				console.log(id)
				uni.navigateTo({
					url: `./toReport?bereportrdId=${id}`
				})
			},
			// 点赞
			onGiveLike(did){
				console.log(getApp().globalData.uid)
				console.log(did)
				this.isLike = true
				console.log(this.isLike)
				if(this.currentId == did){
					console.log('重复点赞')
				}else{
					this.currentId = did
					uni.request({
						url: 'https://user.job2020.cn/details/doPraise',
						// url: 'http://192.168.31.7:8090/details/doPraise',
						method:'GET',
						data:{
							dId: did,
							openId: getApp().globalData.uid
						},
						success: (res) => {
							console.log(res)
							
						}
					})
				}
				
			},
			
			// 刷新数据
			onRefresh(){
			  this.submitData['openId'] = getApp().globalData.uid
			  uni.request({
			  	url:"https://user.job2020.cn/details/doSelect",
			  	method:"GET",
				data:this.submitData,
			  	success:(res)=>{
					console.log(res)
			  		if(res.data.code !== 0){
			  			this.vipMember=res.data.list
			  			console.log(res)
			  		}else{
			  			uni.showModal({
			  				title:"温馨提示",
			  				content:"积分不足，请充值",
							success:(res)=>{
							 if (res.confirm) {
								 console.log('确定')
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
			},
			// 筛选
			onScreening(){
				this.maskShow=true
			},
			// 筛选学校
			onSelectSchool(e){
				this.index = e.detail.value
				this.submitData['school'] = this.school[this.index].name
			},
			// 筛选性别
			onSelectSex(e){
				this.sexIndex = e.detail.value
				this.submitData['sex'] = this.sex[this.sexIndex]
			},
			// 筛选年龄
			sliderChange(e){
				 this.submitData['age']=e.detail.value
			},
			// 确认筛选
			onSureBtn(){
				this.submitData['openId']= getApp().globalData.uid
				console.log(this.submitData)
				uni.request({
					url: 'https://user.job2020.cn/details/doSelect',
					method:'GET',
					data:this.submitData,
					success: (res) => {
						this.vipMember=res.data.list
						
					}
				})
				this.maskShow=false
			},
			// 跳转到详情
			toUserDetail(item){
				console.log(item)
				uni.navigateTo({
					url:`../../profile/personalPage/personalPage?userId=${item.detId}&identity=0`
				})
			},
			handletouchmove: function(event) {
						// console.log(event)
						if (this.flag !== 0) {
							return;
						}
						let currentX = event.touches[0].pageX;
						let currentY = event.touches[0].pageY;
						let tx = currentX - this.lastX;
						let ty = currentY - this.lastY;
						this.mindex = -1;
						//左右方向滑动
						if (Math.abs(tx) > Math.abs(ty)) {
							if (tx < 0) {
								this.flag = 1;
								if(this.i < this.vipMember.length-1){
									this.vipMember.shift(0)
									this.isLike =false
									console.log(this.vipMember)
								}else{
									this.onRefresh()
									this.i=0
								}
							} 
						}
						//将当前坐标进行保存以进行下一次计算
						this.lastX = currentX;
						this.lastY = currentY;
					},
					handletouchstart: function(event) {
						this.lastX = event.touches[0].pageX;
						this.lastY = event.touches[0].pageY;
					},
					handletouchend: function(event) {
						this.flag = 0;
					},
		}
	}
</script>

<style scoped>
	.navagitorBar {
		height: 110rpx;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin: 60rpx 0;
	}
	.navagitorBar navigator image{
		width: 90rpx;
		height: 90rpx;
	}
	.navagitorBar navigator div {
		text-align: center;
		font-size: 24rpx;
		color: #808080;
	}
	
	
	
	.main{
		width: 670rpx;
		margin: 0 auto;
		/* position: fixed;
		left: 50%;
		top:50%;
		transform: translate(-50%,-50%) */
		
	}
	.headIcon{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx 0;
	}
	.headIcon icon{
		font-size: 40rpx;
	}
	.headIcon icon:first-child{
		color: #b4d9ff;
		
	}
	@keyframes turn{
	      0%{-webkit-transform:rotate(0deg) scale(0) }
	      25%{-webkit-transform:rotate(90deg) scale(0.25) }
	      50%{-webkit-transform:rotate(180deg) scale(0.5) }
	      75%{-webkit-transform:rotate(270deg) scale(0.75) }
	      100%{-webkit-transform:rotate(360deg) scale(1) }
	    }
	@keyframes turnReverse{
	      0%{-webkit-transform: scale(0)}
	      25%{-webkit-transform: scale(0.25)}
	      50%{-webkit-transform: scale(0.5)}
	      75%{-webkit-transform: scale(0.75)}
	      100%{-webkit-transform: scale(1)}
	    }
	.mesCard{
		border: 2rpx solid #E5E5E5;
		border-radius: 20rpx;
		box-shadow: 0 0 10rpx rgba(0,0,0, .3);
		margin-top: 30rpx;
		position: relative;
		background-color: #FFFFFF;
	}
	.mesCardAni{
		border: 2rpx solid #E5E5E5;
		border-radius: 20rpx;
		box-shadow: 0 0 10rpx rgba(0,0,0, .3);
		margin-top: 6vh;
		position: relative;
		background-color: #FFFFFF;
		animation:turnReverse 1s ease-in-out
	}
	.mesCard:before{
		content: '';
		width: 660rpx;
		height: 902rpx;
		border: 2rpx solid #E5E5E5;
		border-radius: 20rpx;
		z-index: -1;
		position: absolute;
		background-color: #fafafa;
		box-shadow: 0 0 8rpx rgba(0,0,0, .2);
		left:  -5xp;
		top: 4rpx;
		transform: rotate(-1.5deg);
	}
	.mesCard:after{
		content: '';
		width: 650rpx;
		height: 912rpx;
		border: 2rpx solid #E5E5E5;
		border-radius: 20rpx;
		z-index: -2;
		position: absolute;
		background-color: #f6f6f6;
		box-shadow: 0 0 3rpx rgba(0,0,0, .2);
		left:  -3xp;
		top: 1rpx;
		transform: rotate(-3deg);
	}
	.cardTop{
		position: relative;
	}
	.cardImg{
		width: 100%;
		height: 700rpx;
		margin: 0;
		padding: 0;
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
		animation:turn 0.5s ease-in;
		position:relative
	}
	.imageNum{
		position: absolute;
		left: 5%;
		right: 5%;
		top: 5%;
		color: #fff;
		display: flex;
		justify-content: space-between;
		width: 90%;
	}
	.imageNum .imgIcon {
		display: flex;
	}
	.imageNum .imgIcon div:first-child {
		width: 85rpx;
		height: 50rpx;
		line-height: 50rpx;
		background-color: #6b5b5b;
		margin-right: 10rpx;
		border-radius: 10rpx;
		text-align: center;
	}
	.imageNum .imgIcon:nth-child(2){
		width: 85rpx;
		height: 50rpx;
		line-height: 50rpx;
		background-color: #6b5b5b;
		margin-right: 10rpx;
		border-radius: 10rpx;
		text-align: center;
	}
	.imageNum div:nth-child(2){
		/* width: 50rpx; */
		height: 50rpx;
		line-height: 50rpx;
		background-color: #6b5b5b;
		border-radius: 10rpx;
		text-align: center;
		padding: 0rpx 10rpx;
		font-size: 24rpx;
	}
	.icon-jubao{
		font-size: 28rpx;
		margin-right: 10rpx;
		display: inline;
	}
	.cardBottom{
		height: 190rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 20rpx;
		
	}
	.giveLikeIcon{
		width: 120rpx;
		height: 120rpx;
		position: absolute;
		right: 20rpx;
		z-index: 99;
	}
	.likeBox_1{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: #F1F8FF;
		text-align: center;
		line-height: 100rpx;
		transition: all linear .5s;
		animation: line1 .5s ease-in-out forwards;
	}
	.likeBox_2{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color:  #68cefa;
		text-align: center;
		line-height: 100rpx;
	}
	
	/* @keyframes定义动画 */
	@keyframes line1 {
	    50% {
	       font-size:20rpx;
	       left: 20px;
	       top: 52px;
	       border-radius: 8px;
	    }
	    100% {
			font-size: 50rpx;
	        width: 100rpx;
	        height: 100rpx;
	        left: 20px;
	        top: 52px;
	    }
	}
	@keyframes font-size {
	    0%{-webkit-transform:rotate(0deg) scale(0) }
	    25%{-webkit-transform:rotate(30deg) scale(0.2) }
	    50%{-webkit-transform:rotate(-20deg) scale(0.5) }
	    75%{-webkit-transform:rotate(20deg) scale(0.8) }
	    100%{-webkit-transform:rotate(5deg) scale(1) }
	}
	.icon-xihuanlike{
		font-size: 50rpx;
		color: #F1F1F1;
	}
	.icon-xuanzhong:hover{
		animation: font-size .5s ease-in-out forwards;
	}
	.icon-xuanzhong{
		font-size: 50rpx;
		color: #68cefa;
	}
	
	.name{
		color: #6fb6ff;
		font-size: 36rpx;
		display: flex;
		align-items: center;
	}
	.yearVip{
		width: 106rpx;
		height: 30rpx;
		line-height: 30rpx;
		font-size: 22rpx;
		background-color: #ed4747;
		color: #ffffff;
		border-radius: 15rpx;
		text-align: center;
		margin-left: 20rpx;
	}
	.monthVip{
		width: 106rpx;
		height: 30rpx;
		line-height: 30rpx;
		font-size: 22rpx;
		background-color: #44a1ff;
		color: #ffffff;
		border-radius: 15rpx;
		text-align: center;
		margin-left: 20rpx;
	}
	.icon-vip{
		display: inline;
		margin-right: 6rpx;
	}
	.school{
		font-size: 22rpx;
		color: #b8b8b8;
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
	
	.school{
		font-size: 26rpx;
		color: #808080;
	}
	
	.maskBox{
		width: 620rpx;
		margin: 0 auto;
	}
	.head{
		font-size: 28rpx;
		color: #44a1ff;
		margin: 20rpx 0rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.screeningItem{
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		height: 100rpx;
	}
	.screeningItem picker{
		font-weight: 200;
		color: #808080;
	}
	.screeningItem slider{
		flex: 1;
	}
	.sureBtn{
		width: 100rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 10rpx;
		background-color: #44A1FF;
		color: #FFFFFF;
	}
	.icon-wodebaobeiye_genghuan{
		font-size: 38rpx;
		font-weight: 600;
	}
	.icon-icon-{
		font-size: 40rpx;
		font-weight: 600;
	}
	.icon-nv{
		color: pink;
		font-size: 22rpx;
	}
	.icon-nan{
		color: #FFFFFF;
		font-size: 22rpx;
	}
	
	/* 注册样式 */
	.identityBox{
		width: 670rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-around
	}
	.title{
		font-size: 36rpx;
		font-weight: 600;
		text-align: center;
		margin-top: 60rpx;
		margin-bottom: 60rpx;
	}
	.idenyityBtn{
		width: 220rpx;
		height: 80rpx;
		background-color: #e4f0fc;
		color: #44a1ff;
		border-radius: 10rpx;
		text-align: center;
		line-height: 80rpx;
		margin-top: 50rpx;
	}
	.slide_img{
		width: 100rpx;
		height: 100rpx;
		animation: shake 3s linear infinite;
	}
</style>
