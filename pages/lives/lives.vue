<template>
	<view class="wrapper">
		<video src="" class="video">
		</video>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted } from 'vue';

	const cover = uni.getSubNVueById('cover')

	onMounted(() => {
		cover.setStyle({
			width: '750rpx',
			background: 'rgba(0,0,0,.5)'//'#adf' //transparent'
		})
	})
</script>

<style scoped lang="less">
	.wrapper {
		height: 100%;
		background-color: #000;
		position: relative;

		text {
			color: #fff;
		}

		.video {
			height: 100%;
			width: 100%;
			position: relative;
			z-index: 1;
		}


	}
</style>