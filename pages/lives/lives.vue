<template>
	<view class="wrapper">
		<video :src="sources" autoplay class="video" controls="false">
		</video>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import { LiveMsgKey } from '../../utils/const';

	const cover = uni.getSubNVueById('cover')

	const sources = ref(
		// 'http://ottrrs.hl.chinamobile.com/PLTV/88888888/224/3221226016/index.m3u8',
		'http://ottrrs.hl.chinamobile.com/PLTV/88888888/224/3221225765/index.m3u8',
		// 'http://txmov2.a.kwimgs.com/upic/2022/01/31/16/BMjAyMjAxMzExNjAwMTVfNDAzMDAxOTlfNjYyNzMyNzQ2OTlfMF8z_b_Be477b27b9ce655d2372df56a5a3d96ef.mp4',
	)

	uni.$on(LiveMsgKey.changeChannel, ({ value }) => {
		console.log('change source', value)
		sources.value = value
	})

	const hideCover = () => {
		uni.$emit(LiveMsgKey.hideCover)
	}


	onMounted(() => {
		cover.setStyle({
			width: '100%',
			background: 'transparent'
		})
		hideCover()
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