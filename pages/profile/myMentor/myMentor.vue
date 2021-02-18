<template>
	<view>
		<!-- 选择组件begin -->
		<headSelect :content='selectContent' @getItem="getCurrentIndex"></headSelect>
		<!-- 招呼列表 -->
		<block v-for="(item,index) in infoCard" :key='item.nickname'>
			<div  class='infoCardBox'>
				<div class="flexBox">
					<div class='flexBox'>
						<div @click='toMentor' :data-tid='item.tid'><image class="avatarImg" :src="item.head"></image></div>
						<div>
							<div class='nickNameBox'>
							<div>{{item.nickName}}</div>
							<i :class="item.sex == '男' ? 'iconfont icon-nan' : 'iconfont icon-nv'"></i>
							<vipIcon :state='item.memberstate'></vipIcon>
							</div>
							<span slot="lb_content" class='applyContent'>{{item.company}}</span>
						</div>
					</div>
					<div>
						
					<!-- <button class="sureBtn" slot="r_content" type="warn">已预约</button> -->
					<div  class='r_btn' slot="r_content">
						<!-- <div class="delBtn"  @click='onDelete' :data-id='item.callId'>取消</div> -->
						<div class="hasSureBtn" v-if='currentSelect ===  0'>已收藏</div>
						<div class="hasSureBtn"  v-if='currentSelect ===   1'  >
							已预约
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
	import infoCard   from '../../../components/infoCard.vue'
	export default {
		data() {
			return {
				selectContent:['关注导师','预约导师'],    //选择框数据
				infoCard:[],	  //服务器卡片
				currentSelect: 0
			}
		},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.request({
				url:'https://user.job2020.cn/favorite/selectFavorite',
				method:'GET',
				data:{
					openId:getApp().globalData.uid,
				},
				success:(res)=>{
					res.data.map(item =>{
						item['nickName'] = item.name 
						item['head'] = item.image
					})
					this.infoCard = res.data
				}
			})
		},
		components:{headSelect,search,infoCard},
		methods: {
			// 选择的条目
			getCurrentIndex(res){
				this.currentSelect = res
				if(res == 0){
					uni.request({
						url:'https://user.job2020.cn/favorite/selectFavorite',
						method:'GET',
						data:{
							openId:getApp().globalData.uid,
						},
						success:(res)=>{
							res.data.map(item =>{
								item['nickName'] = item.name 
								item['head'] = item.image
							})
							this.infoCard = res.data
						}
					})
				}else if(res == 1){
					uni.request({
						url:'https://user.job2020.cn/favorite/selectConsult',
						method:'GET',
						data:{
							openId:getApp().globalData.uid,
						},
						success:(res)=>{
							console.log(res)
							res.data.map(item =>{
								item['nickName'] = item.name 
								item['head'] = item.image
							})
							this.infoCard = res.data
						}
					})
				}
			},
			// 跳到导师
			toMentor(e){
				let tid = e.currentTarget.dataset.tid
				uni.navigateTo({
					url:`../../mentor/mentorDetail/mentorDetail?tid=${tid}`
				})
			},
		}
	}
</script>

<style scoped>
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
	.r_btn{
		display: flex;
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
</style>
