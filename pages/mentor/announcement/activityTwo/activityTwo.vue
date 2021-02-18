<template>
	<view class="main">
		<image src='https://pic.job2020.cn/%E6%8A%BD%E7%AD%BE_4.png' class="slide_img" @click='onOpenDraw'></image>
		<div  v-if="maskShow" class="modal">
			<image :src='img' class="mask_img" @click="flag ? onReqDraw() : onOpenDraw()" @longpress="onSaveImg"></image>
		</div>
		<icon class="iconfont icon-xiangzuo" @click="onBack"></icon>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maskShow: false,
				img: 'https://pic.job2020.cn/%E6%8A%BD%E7%AD%BE_5.png',
				flag: true
			}
		},
		onLoad() {
			getApp().globalData.uid = getApp().globalData.uid || uni.getStorageSync('uid')
			uni.request({
				url:'https://user.job2020.cn/card/mylottery',
				data:'GET',
				data:{
					openId: getApp().globalData.uid
				},
				success: (res) => {
					console.log(res)
					if(res.data.data.code == 1){
						this.maskShow = true
						this.img = res.data.data.lottery
						this.flag = false
					}
				}
			})
		},
		methods: {
			// 返回上一页
			onBack(){
				uni.navigateBack({
					delta:1
				})
			},
			onOpenDraw(){
				this.maskShow = !this.maskShow
			},
			onSaveImg(){
				if(!this.flag){
					// 预览图片
					uni.previewImage({
					    urls: [this.img],
					    longPressActions: {
					        itemList: ['发送给朋友', '保存图片', '收藏'],
					        success: function(data) {
					            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					        },
					        fail: function(err) {
					            console.log(err.errMsg);
					        }
					    }
					});      
				}
			},
			onReqDraw(){
				uni.showToast({
					title:'解签中...',
					icon:'loading',
					duration:500,
					success: () => {
						
					}
				})
				uni.request({
					url:'https://user.job2020.cn/card/lottery',
					
					method:'GET',
					data:{
						openId: getApp().globalData.uid
					},
					success: (res) => {
						console.log(res)
						uni.hideLoading()
						if(!res.data.data.code){
							this.flag = false
							this.img = res.data.data.lottery
							
						}else{ 
							uni.showModal({
								title: '温馨提示',
								content: '亲,今天没有机会了哦，下次再来吧',
								success: (res) => {
									if(res.confirm){
										this.maskShow = !this.maskShow
									}
								}
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
		position: relative;
		height: 100vh;
		background-image: url('https://pic.job2020.cn/%E6%8A%BD%E7%AD%BE_3.png');
		background-repeat: no-repeat;
		background-origin: left top;
		background-size: 100% 100%;
	}
	.icon-xiangzuo{
		color: #000000;
		font-size: 40rpx;
		font-weight: 600;
		position: fixed;
		left: 40rpx;
		top: var(--status-bar-height);
	}
	.slide_img{
		position: absolute;
		left: 125rpx;
		top: 250rpx;
		width: 500rpx;
		height: 1000rpx;
		animation: shake 3s linear infinite;
	}
	.modal {
	  position: fixed;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  z-index: 99;
	  background: rgba(0, 0, 0, 0.6);
	}
	.mask_img{
		width: 100vw;
		height: 100vh;
	}
	@keyframes shake {
	 
	  70%, 80% {
	    transform: rotate(7deg);
	  }
	  75% {
	    transform: rotate(-7deg);
	  }
	 
	  65%,
	  85% {
	    transform: rotate(0);
	  }
	}
</style>
