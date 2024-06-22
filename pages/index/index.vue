<template>
	<view class="content">
		<view class="menu">
			<text class="nav" v-for="item in Navs" :key="item.path" @tap="jump"
				:data-path="item.path">{{item.title}}</text>
		</view>
		<cus-weather-position :addr="addr"></cus-weather-position>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { Navs } from '@/utils/index'
	import { getConfig } from '../../utils/config';
	import { onShow } from '@dcloudio/uni-app'
	import { getLives } from '../../utils/lives';

	const addr = ref('')


	onShow(() => {
		getConfig().then(res => {
			if (res.weatherAddr) {
				addr.value = res.weatherAddr
			}
			if (res.playAddr) {
				getLives(res.playAddr)
			}
		})
	})


	const jump = (ev) => {
		const path = ev.target.dataset.path
		uni.navigateTo({
			url: path
		})
	}
</script>

<style lang="less" scoped>
	.content {
		background-color: #000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;

		text {
			color: #fff;
		}

		.menu {
			display: flex;
			flex: 0 0 auto;
			flex-flow: row;
			gap: 10px;

			.nav {
				width: 120px;
				height: 80px;
				border-radius: 8px;
				border: 1px solid #fff;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>