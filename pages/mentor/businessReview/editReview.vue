<template>
	<view>
		<div class='head'>
			<div class='h_name'>
				{{showData.IntroduseVo.name}}
			</div>
			<div class='h_info'>
				<div class='h_info_logo'>
					<image :src='showData.IntroduseVo.image'></image>
				</div>
				<div class='h_info_desc'>
					<div>{{showData.IntroduseVo.scale}} | {{showData.IntroduseVo.industry}}</div>
					<div>
						{{showData.IntroduseVo.type}}
					</div>
				</div>
			</div>
			<div class='h_cre'>
				<div class='h_cre_t'>
					<div class='h_cre_t_l'>
						<div>{{showData.IntroduseVo.grade}}</div>
						<div>{{showData.IntroduseVo.sum}}人点评</div>
						<div><image src='https://pic.job2020.cn/%E4%BA%94%E6%98%9F.png' mode="widthFix"></image></div>
					</div >
					<div class='h_cre_t_r'>
						<block v-for="item in showData.IntroduseVo.cor" :key='item.corporate'>
							<div><span>{{item.corporate}}</span><progress :percent="item.score" activeColor="#ffaf16" stroke-width="10" border-radius='4'></progress></div>
						</block>
					</div>
				</div>
				<div class='h_cre_b'>
						<div>
							公司简介
							<div>
								{{showData.IntroduseVo.introduce}}
							</div>
						</div>
				</div>
			</div>
			<div class="comment">
				<div class="commentTitle">
					<span>企业评价 (<span style="font-size: 26rpx;color: #666666;">{{showData.IntroduseVo.sum}}</span>)</span>
					<icon class="iconfont icon-xiangyou1"></icon>
				</div>
				<!-- 评论卡片 -->
				<div class='commentCard'>
					<block v-for="(item,index) in showData.optionsDetailsVo" :key="item.comId">
						<div class='voteCard'>
							<info-card :info="item">
									<span slot="lb_content" class='card_school'>{{item.school}}</span>
							</info-card>
							<div class='card_title'>{{item.title}}</div>
							<div >
								<block v-for="(item2,index) in item.or" :key='item'>
								<div class='card_progress'>{{item2.options}}<progress :percent="item2.percent" active stroke-width="6" border-radius='4' backgroundColor="#999"  activeColor='#44A1FF' show-info  /></div>
								</block>
								
							</div>
							<div><button class="voteBtn" @click="toVote" :data-id= 'item.cvoId' v-if='item.sta == 0'>参与投票</button></div>
						</div>
						
					</block>
					<div style='height: 100rpx;'></div>
					
				</div>
			</div>
		</div>
			</div>
	</view>
</template>

<script>
	import infoCard from '../../../components/infoCard.vue'
	let cId = ''
	export default{
		data(){
			return {
				showData:[],
			}
		},
		onLoad(options) {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			cId = options.cId
			uni.request({
				url: 'https://company.job2020.cn/company/doSelect',
				method:'GET',
				data:{
					cId,
					openId: getApp().globalData.uid
				},
				
				success: (res) => {
					console.log(res)
					this.showData = res.data.data
					this.showData.optionsDetailsVo.forEach((item) =>{
									item.show = true
					})
				}
			})
			console.log(options)
		},
		components:{infoCard},
		onShow() {
					
				},
	methods:{
		toVote(e){
			let mvoId = e.currentTarget.dataset.id
			uni.redirectTo({
				url: `../../merchants/merchants/merchantsInfo/voteDetail?mvoId=${mvoId}&cId=${cId}&type=1`
			})
			
		},
	}
	}
</script>

<style scoped>
	.head{
		width: 670rpx;
		margin: 0 auto;
	}
	.h_name{
		font-size: 40rpx;
		font-weight: 600;
		margin: 20rpx 0rpx;
	}
	.h_info{
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.h_info_logo{
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 10rpx;
		border: 2rpx solid #eeeeee;
	}
	.h_info_logo image{
		width: 100%;
		height: 120rpx;
	}
	.h_info_desc{
		font-size: 24rpx;
		color: #909399;
	}
	.h_cre{
		background-color: #f8f8fa;
		padding: 20rpx;
		border-radius: 10rpx;
	}
	.h_cre_t{
		display: flex;
		
	}
	.h_cre_t_l{
		width: 150rpx;
		margin-right: 50rpx;
	}
	.h_cre_t_l div:first-child{
		font-size: 50rpx;
		font-weight: 500;
		text-align: center;
	}
	.h_cre_t_l div:nth-child(2){
		font-size: 22rpx;
		color: #909399;
		text-align: center;
		margin: 6rpx 0rpx;
	}
	.h_cre_t_l div:nth-child(3){
		width: 150rpx;
		height: 22rpx;
	}
	.h_cre_t_l div:nth-child(3) image{
		width: 100%;
	}
	.h_cre_t_r{
		flex: 1;
		margin: 20rpx;
	}
	.h_cre_t_r div{
		display: flex;
		font-size: 22rpx;
		color: #909399;
	}
	.h_cre_t_r div progress{
		flex: 1;
		padding-top: 4rpx;
		margin-left: 30rpx;
		margin-right: 50rpx;
		margin-bottom: 25rpx;
	}
	.h_cre_b{
		margin-top: -20rpx;
	}
	.h_cre_b div{
		font-size: 28rpx;
		margin: 10rpx 0rpx;
	}
	.h_cre_b div div{
		font-size: 24rpx;
		color: #909399;
	}
	
	
	
	
	.comment{
		/* border-top: 20rpx solid #eeeeee; */
		width: 670rpx;
		margin: 50rpx auto 0rpx;
	}
	.commentTitle{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10rpx;
	}
	.commentTags{
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}
	.commentTags div{
		font-size: 24rpx;
		color: #9e9e9e;
		background-color: #f4f4f4;
		padding: 8rpx 16rpx;
		text-align: center;
		margin-right: 15rpx;
		border-radius: 20rpx;
	}
	.voteCard{
		background-color: #fafafa;
		margin-top: 20rpx;
		padding-left: 15rpx;
		border-radius: 4px;
		padding: 20rpx 15rpx;
	}
	.card_title{
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		padding-left: 10rpx;
	}
	.card_school{
		font-size: 24rpx;
		color: #C0C4CC;
	}
	.card_selItem{
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 2rpx solid #EEEEEE;
		padding-left: 10rpx;
	}
	.card_progress{
		font-size: 26rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		color: #909399;
	}
	.voteBtn{
		width: 470rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		margin: 0 auto;
		background-color: #44A1FF;
		color: #FFFFFF;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
	}
	button:after {
	    border: none;  
	}
	
	
	
	
	
	.commentComponment{
		display: flex;
		width: 100%;
		background-color: #FFFFFF;
		height: 100rpx;
		line-height: 100prx;
		/* justify-content: space-between; */
		align-items: center;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.commentComponment div{
		flex: 1;
		text-align: center;
		font-size: 26rpx;
	}
	.commentComponment div icon{
		font-size: 45rpx;
	}
	.shareBtn{
		width: 250rpx;
		height: 120rpx;
		position: absolute;
		right: 0;
		bottom: 0;
		opacity: 0;
	}
	.icon-guanzhu{
		color: #ffa800;
		font-size: 60rpx;
	}
</style>
