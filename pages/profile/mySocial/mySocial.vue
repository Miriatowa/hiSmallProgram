<template>
	<view>
		<!-- 选择组件begin -->
		<headSelect :content='selectContent' @getItem="getCurrentIndex"></headSelect>
		<!-- 招呼列表 -->
		<block v-for="(item,index) in infoCard" :key='item.nickname'>
			<div  class='infoCardBox'>
				<div class="flexBox">
					<div class='flexBox'>
						<div @click='toPersonal' :data-userId='item.detId'><image class="avatarImg" :src="item.head"></image></div>
						<div>
							<div class='nickNameBox'>
							<div>{{item.nickName}}</div>
							<i :class="item.sex == '男' ? 'iconfont icon-nan' : 'iconfont icon-nv'"></i>
							<vipIcon :state='item.memberstate'></vipIcon>
							</div>
							<span slot="lb_content" class='applyContent'>{{item.content}}</span>
						</div>
					</div>
					<div>
						<div slot="r_content" >
							<div  class='r_btn'>
								<div class="delBtn" slot="r_content" @click='onDelete' :data-id='item.callId'>删除</div>
								<div class="hasSureBtn" v-if='!(delIndex === index) & selectIndex ===  0'>{{item.state ? '已同意' : '已发送' }}</div>
								<div class="sureBtn"  v-if='!(delIndex === index) && selectIndex ===  1 && item.state == 0' @click='onAgree' :data-id='item.callId'>同意</div>
								<div class="hasSureBtn"  v-if='!(delIndex === index) && selectIndex ===  1 && item.state == 1'  >
									已同意
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
				
			
		</block>
		
		
	</view>
</template>

<script>
	import headSelect from '../../../components/headSelect.vue'
	import search     from '../../../components/uni-search-bar/uni-search-bar.vue'
	import vipIcon   from '../../../components/vipIcon.vue'
	export default {
		data() {
			return {
				selectContent:['打招呼','收到的招呼'],    //选择框数据
				infoCard:[],	  //服务器卡片
				flag: 0,
				lastX: 0,
				lastY: 0,
				delIndex: '',
				selectIndex: 0,
			}
		},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.request({
				url:'https://user.job2020.cn/details/findGreet',
				method:'GET',
				data:{
					openId: getApp().globalData.uid,
					conntection: this.selectContent[0]
				},
				success:(res)=>{
					console.log(res)
					this.infoCard = res.data
				}
			})
		},
		components:{headSelect,search,vipIcon},
		methods: {
			
			// 选择的条目
			getCurrentIndex(res){
				this.infoCard = null
				this.selectIndex = res
				uni.request({
					url:'https://user.job2020.cn/details/findGreet',
					method:'GET',
					data:{
						openId: getApp().globalData.uid,
						conntection: this.selectContent[res]
					},
					success:(res)=>{
						console.log(res)
						this.infoCard = res.data
						this.delIndex = ''
					}
				})
			},
			onDelete(e){
				console.log(e.currentTarget.dataset.id)
				let callId =  e.currentTarget.dataset.id
				uni.request({
					url:'https://user.job2020.cn/details/deleteGree',
					method:'GET',
					data:{
						openId: getApp().globalData.uid,
						callId,
					},
					success:(res)=>{
						uni.redirectTo({
							url:'/pages/profile/mySocial/mySocial'
						})
					}
				})
			},
			onAgree(e){
				let callId =  e.currentTarget.dataset.id
				uni.request({
					url:'https://user.job2020.cn/details/agreeGree',
					method:'GET',
					data:{
						openId: getApp().globalData.uid,
						callId,
					},
					success:(res)=>{
						uni.redirectTo({
							url:'/pages/profile/mySocial/mySocial'
						})
					}
				})
			},
			toPersonal(e){
				let userId = e.currentTarget.dataset.userid
				uni.navigateTo({
					url:`../personalPage/personalPage?identity=0&userId=${userId}`
				})
			},
		}
	}
</script>

<style scoped>
	.sureBtn{
		height: 80rpx;
		width: 100rpx;
		text-align: center;
		line-height: 80rpx;
		background-color: #44a1ff;
		color: #ffffff;
		border-top: 10rpx;
		border-radius: 4px;
		border-top-left-radius: 0rpx;
		border-bottom-left-radius: 0rpx;
		font-size: 22rpx;
	}
	.hasSureBtn{
		height: 80rpx;
		width: 100rpx;
		text-align: center;
		line-height: 80rpx;
		background-color: #EEEEEE;
		color: #ffffff;
		border-top: 10rpx;
		border-radius: 4px;
		border-top-left-radius: 0rpx;
		border-bottom-left-radius: 0rpx;
		font-size: 22rpx;
	}
	.delBtn{
		height: 80rpx;
		width: 100rpx;
		text-align: center;
		line-height: 80rpx;
		background-color: #F56C6C;
		color: #ffffff;
		border-top: 10rpx;
		border-radius: 4px;
		border-top-right-radius: 0rpx;
		border-bottom-right-radius: 0rpx;
		font-size: 22rpx;
	}
	.applyContent{
		font-size: 22rpx;
		color: #909399;
	}
	.r_btn{
		display: flex;
	}
	
	
	
	.infoCardBox{
		width: 670rpx;
		margin: 0 auto;
	}
	.flexBox{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 150rpx;
	}
	.avatarImg{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.nickNameBox{
		display: flex;
		align-items: center;
	}
	.nickNameBox div{
		font-size: 28rpx;
	}
	.icon-nan{
		color: #44a1ff;
		display: inline;
		margin-left: 10rpx;
		font-size: 26rpx;
	}
	.icon-nv{
		display: inline;
		color: #f56df0;
		margin-left: 10rpx;
		font-size: 26rpx;
	}
</style>
