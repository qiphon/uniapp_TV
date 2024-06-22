<template name='weather'>
	<view class="wrapper">
		<view class="title">
			<text class="titleText">{{props.addr}}今日</text>
			<text class="titleSmall">空气质量：{{weathers?.[0]?.airQuality || '无数据'}}</text>
			<text class="titleSmall"> 天气预警：{{weathers?.[0]?.weatherAlert || '无数据'}}</text>
		</view>

		<view class="WeatherWrapper">
			<view class="WeatherItem" v-for="(item) in weathers" key="item.week + item.date">
				<text class="titleSmall">{{item.week}}</text>
				<text class="titleSmall" v-if="item.date">{{item.date}}</text>
				<text class="titleSmall" v-if="item.date">{{item.temperature}}</text>
				<text class="titleSmall" v-if="item.date">{{item.weather}}</text>
				<image class="Image" :src="item.image" v-if="item.image"></image>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { useRequest } from 'ahooks-vue'
	import { defaultCfg, getWeather } from '../../utils/weather';
	import { ref, defineProps, watchEffect } from 'vue';
	import { Weather } from '../../utils/weather/type';

	const props = defineProps({
		addr: String
	})

	const weathers = ref<Weather[]>([])

	watchEffect(function () {
		if (props.addr)
			getWeather(props.addr).then(res => {
				weathers.value = res || []
			})
	}, { flush: 'post' })
</script>


<style lang="less" scoped>
	.wrapper {
		margin-top: 30px;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		gap: 16px;

		text {
			color: #fff;

			&.textSmall {
				font-size: 12px;
				margin-bottom: 8px;
			}
		}

		.Image {
			width: 60px;
			height: 60px;
		}

		.WeatherWrapper {
			display: flex;
			flex-flow: row wrap;
			gap: 8px;


			.WeatherItem {
				display: flex;
				flex-flow: column;
				justify-content: center;
				align-items: center;
			}
		}

		.title {
			flex: 1;
			width: 100%;
			display: flex;
			flex-flow: row;
			justify-content: center;
			align-items: flex-end;
			gap: 8px;

			.titleText {
				font-size: 24px;
			}
		}
	}
</style>