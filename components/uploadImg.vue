<!-- @name: 上传图片组件 -->
<!-- @author: Miraitowa -->
<!-- @version: 1.0 -->
<template>
	<div>
		<view class="image-list">
			<!-- 显示图片 -->
			<block v-for="item in images" :key="item">
				<view class="image-wrap">
					<image class="image" :src="item" mode="aspectFill" @tap="onPreviewImage" :data-imgsrc="item"></image>
					<i class="iconfont icon-shanchu" @tap="onDelImage" :data-index="index"></i>
				</view>
			</block>
		
			<!-- 选择图片 -->
			<view class="image-wrap selectphoto" :hidden="!selectPhoto" @tap="onChooseImage">
				<i class="iconfont icon-21"></i>
			</view>
		
		</view>
	</div>
</template>
<script>
	// 输入文字最大的个数
	const MAX_WORDS_NUM = 140
	// 最大上传图片数量
	const MAX_IMG_NUM = 3
	export default {
		data() {
			return {
				// 当前图片数量
				images: [],
				selectPhoto: true,
				summitData: {} //提交数据
			}
		},
		methods: {
			// 选择图片
			onChooseImage() {
				let max = MAX_IMG_NUM - this.images.length
				uni.chooseImage({
					count: max,
					sizeType: [ 'compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						this.images = this.images.concat(res.tempFilePaths)
						// 还能再选几张图片
						max = MAX_IMG_NUM - this.images.length
						this.selectPhoto = max <= 0 ? false : true
						this.$emit('uploadImg', this.images)
					},
				})
			},
			// 删除图片
			onDelImage(e) {
				console.log(this.images)
				var index = e.target.dataset.index
				var array = this.images.splice(index, 1)
				this.images = this.images
				this.$emit('uploadImg', this.images)
				if (this.images.length < MAX_IMG_NUM) {
					this.selectPhoto = true
				}
			},
			// 预览图片
			onPreviewImage(e) {
				uni.previewImage({
					urls: this.images,
					current: e.target.dataset.imgsrc
				})
			},
			
			}
		}
</script>

<style scoped>
	/* 图片样式 */
	
	.image-list {
		display: flex;
		flex-wrap: wrap;
		margin-top: 20rpx;
	}
	
	.image-wrap {
		width: 210rpx;
		height: 210rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
		position: relative;
		overflow: hidden;
		text-align: center;
	}
	
	.image {
		width: 100%;
		height: 100%;
	}
	
	.icon-shanchu {
		position: absolute;
		top: 0;
		right: 0;
		width: 40rpx;
		height: 40rpx;
		background-color: #000;
		opacity: 0.4;
		color: #fff;
		text-align: center;
		line-height: 40rpx;
		font-size: 38rpx;
		font-weight: bolder;
	}
	
	.selectphoto {
		border: 2rpx dashed #cbd1d7;
		position: relative;
	}
	
	.icon-21 {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #cbd1d7;
		font-size: 60rpx;
	}
</style>
