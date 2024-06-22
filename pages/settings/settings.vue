<template>
	<view class="wrapper">
		<view class="header">
			<text class="settingText">设置</text>
		</view>
		<view class="row">
			<text class="rowKey">天气地址</text>
			<input type="text" class="input" v-model="config.weatherAddr">
		</view>
		<view class="row">
			<text class="rowKey">配置地址</text>
			<input type="text" class="input" v-model="config.playAddr">
		</view>
		<view class="row">
			<text class="rowKey">反馈</text>
			<input type="text" class="input">
			<text class="confirmBtn">确定</text>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, reactive } from 'vue';
	import { defaultCfg } from '../../utils/weather';
	import { getConfig, setConfig } from '../../utils/config';
	import { watchPostEffect } from 'vue';

	const config = reactive({ ...defaultCfg })

	watchPostEffect(function () {
		setConfig(config)
	})

	onMounted(() => {
		getConfig().then(cfg => {

			config.playAddr = cfg.playAddr
			config.weatherAddr = cfg.weatherAddr
		})
	})
</script>

<style lang="less" scoped>
	.wrapper {
		display: flex;
		height: 100%;
		background-color: #000;
		flex-flow: column;
		padding: 0 20px;

		text {
			color: #fff;
		}
	}

	.header {
		display: flex;
		justify-content: center;
		align-items: center;

		.settingText {
			font-size: 20px;
		}
	}

	.row {
		gap: 8px;
		margin-top: 16px;
		display: flex;
		flex-flow: row wrap;
		align-items: center;

		.rowKey {
			color: #fff;
			font-size: 16px;
			min-width: 70px;
			text-align: right;
		}

		.input {
			color: #fff;
			flex: 1 1 auto;
			border: 1px solid #fff;
			font-size: 16px;
			padding: 4px;
			border-radius: 4px;
		}

		.confirmBtn {
			color: #fff;
			font-size: 16px;
			display: inline-block;
		}
	}
</style>