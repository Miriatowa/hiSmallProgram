<!-- @name: 头部选择组件 -->
<!-- @author: Miraitowa -->
<!-- @version: 1.0 -->
<template>
	<div class="main">
		<div class="flexBox">
			<block v-for="(item,index) in  content" :key='item'>
				<div :class="idx == index ? 'selectItem' : 'noSelectItem'" @click="selectItem(index)" :style="{width:item_width}">{{item}}</div>
			</block>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				idx: 0,
			};
		},
		methods:{
			selectItem(idx){
				this.idx = idx
				this.$emit('getItem', this.idx)
			}
		},
		mounted() {
			this.length = this.content.length
			console.log(this.content)
		},
		computed: {
					// 每个item宽度
					item_width() {
						let length = 670 / this.content.length
						return uni.upx2px(length * 30 + 20) + 'px';
					}
			},
		props:['content']
	}
</script>

<style scoped>
	.main{
		width: 670rpx;
		margin: 0 auto;
	}
	.flexBox{
		display: flex;
		justify-content: space-around;
		height: 80rpx;
		line-height: 80rpx;
	}
	.selectItem{
		border-bottom: 4rpx solid #44a1ff;
		text-align: center;
		color: #44A1FF;
	}
	.noSelectItem{
		text-align: center;
	}
</style>
