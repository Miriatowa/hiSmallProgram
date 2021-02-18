<!-- @name: 滑动通告栏组件 -->
<!-- @author: Miraitowa -->
<!-- @version: 1.0 -->
<template>
	<div class="marquee">
		<image src='https://pic.job2020.cn/Hi%E6%8A%A5.png'  class="marquee_title"></image>
		<div class="marquee_box">
			<div  :class="{marquee_divst: true,marquee_top:animate}">
				<div v-for="(item,index) in marqueedivst" :key='item.name'><span>●</span>{{item.scroll}}</div>
			</div>
		</div>
		<div>
			<slot name="marquee_right"></slot>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				animate: false,
				marqueedivst: [],
			};
		},
		props:{
			url:{
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: 'color: #909399'
			}
		},
		mounted() {
			uni.request({
				url: this.url,
				method:'GET',
				success: (res) => {
					console.log(res.data)
					this.marqueedivst = res.data
					setInterval(this.showMarquee, 2000);
				}
			})
		},
		methods: {
			showMarquee() {
				this.animate = true;
				setTimeout(() => {
					this.marqueedivst.push(this.marqueedivst[0]);
					this.marqueedivst.shift();
					this.animate = false;
				}, 1000);
			}
		}
	};
</script>
<style scoped>
	.marquee {
		width: 670rpx;
		margin: 30rpx auto 0;
		height: 80rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		overflow: hidden;
	}

	.marquee_title {
		width: 100rpx;
		height: 100rpx
	}
	.icon-gonggao{
		margin-right: 4rpx;
	}
	.marquee_box {
		position: relative;
		flex: 1;
	}

	.marquee_divst {
		position: absolute;
		top: -40rpx;
		left: 0;
	}

	.marquee_top {
		transition: all .5s;
		margin-top: -40rpx;
	}

	.marquee_divst div {
		display: flex;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 22rpx;
		padding-left: 40rpx;
		color: #909399;
	}
	.marquee_divst div span{
		font-size: 20rpx;
		color: #C0C4CC;
		margin-right: 10rpx;
	}
</style >