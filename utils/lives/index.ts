/**
 * @file 直播信息读取
 */

import { getStorage, setStorage } from '../config';
import { StorageKey } from '../const';

const getConfigSources = () : Promise<string[]> => {
	return getStorage(StorageKey.liveConfigSource)
}

const setConfigSource = (url : string) => {
	getConfigSources().then(urls => {
		setStorage(StorageKey.liveConfigSource, [...urls, url])
	})
}

export const getLiveChannels = () : Promise<LiveChannel> => {
	return getStorage(StorageKey.liveChannels)
}

export type ChannelValue = { name : string, url : string, category : string }

export type LiveChannel = {
	[cate : string] : ChannelValue[]
}

const setLiveChannels = (datas : LiveChannel) => {
	setStorage(StorageKey.liveChannels, datas)
}


const exists = (url : string) => {
	return getConfigSources().then(urls => urls.includes(url))
}


const downloadAndCache = async (url : string, loadingTip ?: string) => {
	return exists(url).then(res => {
		if (true || !res) {
			if (loadingTip) {
				uni.showToast({
					icon: 'none',
					title: loadingTip
				})
			}
			return uni.request({
				url
			}).then((res) => {
				setConfigSource(url)
				return res;

			})
		}
	});
};

export const getLives = async (source ?: string) => {

	if (!source) return;

	return downloadAndCache(source, '正在读取直播信息')
		.then(res => {
			if (res) {
				const jsonConfig = (res.data) as any;
				const livesAddr = jsonConfig.lives?.find(
					// 目前只支持 m3u8 直播流
					(item : any) => item?.type === 0 || item.name === 'live',
				)?.url;

				if (livesAddr) {
					const defaultCategoryType = '其他'
					let dictCategorys = { [defaultCategoryType]: [] } as LiveChannel
					return downloadAndCache(livesAddr).then(res => {
						const livesRow = res?.data?.split('\n').filter(row => !!row.trim());
						let currentCategory = defaultCategoryType;

						livesRow?.forEach(item => {
							const rowDatas = item.split(',').filter(Boolean);
							const isChannel = rowDatas.length >= 2 && item.includes('http');
							if (isChannel) {
								const [channel, url] = rowDatas as string[];
								const trimUrl = url?.trim();
								if (trimUrl && channel && dictCategorys[currentCategory]) {
									dictCategorys[currentCategory].push({
										name: channel, url: trimUrl, category: currentCategory
									})

								} else {
									dictCategorys = {
										...dictCategorys,
										[currentCategory]: [{
											name: channel, url: trimUrl, category: currentCategory
										}]
									}
								}
							} else {
								const [category] = rowDatas as string[];
								const categoryName = category?.trim().replace(/#.*#$/, '');
								if (categoryName) {
									currentCategory = categoryName;
									if (!dictCategorys?.[(categoryName)]) {
										dictCategorys[categoryName] = []
									}
								}
							}
						});
						setLiveChannels(dictCategorys)
					});
				}
			}
		})
		.finally(() => {
			uni.showToast({
				icon: 'none', title: '读取直播信息成功'
			})
		});
};