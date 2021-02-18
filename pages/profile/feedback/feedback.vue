<template>
	<view class="back">
		<div class="item"><icon class="iconfont icon-liuyan"></icon>请关注我们官方账号(公众号、微博、抖音)进行反馈哦~</div>
		
		<div class='qCode'>
			<block v-for="(item,index) in qCode" :key='item.name'>
				<div v-if="currentIndex == index"  :data-index='index' @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend">
					<div >{{item.name}}</div>
					<div class='pointBox'>
						<block v-for="(item,index) in qCode" :key='item.name'>
							<div :class="currentIndex == index ? 'quare' : 'point'"></div>
						</block>
					</div>
					<image :src='item.image' class="qCodeImg"></image>
					<div class="tips">
						<p>{{item.name}}扫一扫上面的二维码，或者{{item.name}}搜索</p>
						<p>@Hi情报局，关注官方账号更多惊喜等着你哦~</p>
					</div>
				</div>
			</block>
			
		</div>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				qCode:[
					{name:'公众号',image:'https://pic.job2020.cn/%E5%85%AC%E4%BC%97%E5%8F%B7.png'},
					{name:'微博',image:'https://pic.job2020.cn/%E5%BE%AE%E5%8D%9A.png'},
					{name:'抖音',image:'https://pic.job2020.cn/%E6%8A%96%E9%9F%B3.png'}
				],
				lastX: "",
				lastY: '',
				flag: 0
			}
		},
		methods: {
			handletouchmove: function(event) {
						let index = event.currentTarget.dataset.index
						if (this.flag !== 0) {
							return;
						}
						let currentX = event.touches[0].pageX;
						let currentY = event.touches[0].pageY;
						let tx = currentX - this.lastX;
						let ty = currentY - this.lastY;
						//左右方向滑动
						if (Math.abs(tx) > Math.abs(ty)) {
							if (tx < 0) {
								console.log('左')
								this.flag = 1;
								if(index <= 0  ){
									this.currentIndex = 2
									console.log(this.currentIndex)
								}else{
									this.currentIndex -= 1
								}
							} 
							if (tx > 0) {
								this.flag = 1;
								if(index >= 2  ){
									this.currentIndex = 0
								}else{
									this.currentIndex += 1
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
	.back{
		width: 670rpx;
		margin: 0 auto;
	}
	.item{
		font-size: 24rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	.icon-liuyan{
		margin-right: 20rpx;
	}
	.qCode{
		width: 670rpx;
		margin: 0 auto;
		text-align: center;
		margin-top: 50rpx;
	}
	.pointBox{
		display: flex;
		justify-content: center;
		margin-top: 50rpx;
	}
	.point{
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		background-color: #909399;
		margin-right: 10rpx;
	}
	.quare{
		width: 30rpx;
		height: 10rpx;
		border-radius: 5rpx;
		background-color: #44A1FF;
		margin-right: 10rpx;
	}
	.qCodeImg{
		width: 400rpx;
		height: 400rpx;
		margin-top: 50rpx;
	}
	.tips{
		font-size: 24rpx;
		color: #909399;
		margin-top: 50rpx;
	}
</style>
