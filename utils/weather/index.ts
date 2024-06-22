import { load } from 'cheerio';
import { Weather } from './type';


const todayStr = (useHour ?: boolean) => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	return `${year}-${month}-${day}-${useHour ? hour : '0'}`;
};


export enum DownloadType {
	'weather' = 'weather',
	'playAddr' = 'playAddr',
}

// export const downloadPath = {
//   [DownloadType.weather]: (addr: string) =>
//     `${RNFetchBlob.CachesDirectoryPath}/${DownloadType.weather}_${todayStr(
//       true,
//     )}${addr}.html`,
//   [DownloadType.playAddr]: () =>
//     `${RNFetchBlob.CachesDirectoryPath}/${
//       DownloadType.playAddr
//     }/${todayStr()}}.html`,
// };



export const defaultCfg = {
	playAddr: 'https://盒子迷.top/禁止贩卖',
	weatherAddr: '北京',
};
const downloadUrl = {
	[DownloadType.weather]: (name : string) =>
		// `http://www.baidu.com/s?wd=${name}天气`,
		`https://www.so.com/s?q=${name}天气&src=360portal&_re=0`,
};

/** 读取天气信息 */
const readWeather = (res : string) => {
	return Promise.resolve(res).then(res => {
		const $ = load(res);
		let list7Day : Weather[] = [];
		// 移动端页面是这个
		const weatherCard = $('#mohe-m-entity--weather_city .mh-weather-weeks');
		// 安卓返回的是手机版的数据
		if (weatherCard.length > 0) {
			const children = weatherCard
				.find('div.mh-week-head')
				?.children('.mh-week-day');
			list7Day = new Array(children?.length || 0).fill(1).map((_, idx) => {
				const weekAndWeather = children?.eq(idx);
				const headEl = weekAndWeather.children('p');
				const tmperHighEls = weatherCard.find(
					'.mh-line-wrap .mh-text-wrap .mh-text.mh-high',
				);
				const tmperLowEls = weatherCard.find(
					'.mh-line-wrap .mh-text-wrap .mh-text.mh-low',
				);
				const nightWeather = weatherCard.find('.mh-week-foot .mh-week-night');
				// console.log();
				return {
					week: headEl.eq(0).text(),
					weather: `早：${headEl.last().text()}
晚：${nightWeather.eq(idx).find('p').eq(1).text()}`,
					image: '',
					temperature: `${tmperLowEls.eq(idx).text()} ~ ${tmperHighEls
						.eq(idx)
						.text()}`,
					airQuality: nightWeather
						.eq(idx)
						.find('div.mh-weather-pollution')
						.text(),
					date: '',
					weatherAlert: '',
				} as Weather;
			});
		} else {
			const weatherItems = [
				...$(
					'#mohe-weather .mh-tab-cont.js-mh-tab-cont .g-slider-item.js-mh-item',
				),
			];
			let todayWeatherItemIndex = weatherItems?.findIndex(item => {
				return $(item).find('.mh-week').text().includes('今天');
			});
			if (!weatherItems?.length || todayWeatherItemIndex <= 0) return;
			list7Day = new Array(7).fill(1).map((_, idx) => {
				const todayItem = load(weatherItems[todayWeatherItemIndex + idx]);
				const airQuality =
					$('#mohe-weather .mh-pm25 span.mh-desc-item-txt').text() || '';
				const weatherAlert =
					$('#mohe-weather .mh-alert span.mh-desc-item-txt').text() || '';
				return {
					date: todayItem('.mh-des-date').text() || '',
					image: todayItem('.mh-bg-weather').attr('src') || '',
					temperature: todayItem('.mh-des-temperature-num').text() || '',
					weather: todayItem('.mh-des-temperature').text() || '',
					week: todayItem('.mh-week').text() || '',
					airQuality,
					weatherAlert,
				};
			});
		}
		return list7Day;
	})
		.catch(err =>
			console.log(err, '------read weather HTML error -----------'),
		);
};

/** 获取天气信息 */
export const getWeather = (name ?: string) => {
	console.log('getweather', name)
	const addr = name || defaultCfg.weatherAddr;
	return uni.request({
		url: downloadUrl[DownloadType.weather](addr),
		header: {
			'Cache-Control': 'no-cache',
			DNT: '1',
			Accept:
				'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
			'Accept-Language': 'zh,en;q=0.9,zh-CN;q=0.8',
			'sec-ch-ua-platform': 'macOS',
			'Sec-Fetch-Mode': 'navigate',
			Host: 'www.so.com',
			'sec-ch-ua': `${Date.now()}Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24`,
			'User-Agent': `${Date.now()}}Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36`,
		}
	}).then(res => {
		return readWeather((res.data || '') as string)
	})
};