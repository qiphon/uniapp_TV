import { defaultCfg } from "./weather";

const configKey = 'LiveConfig'

export type LiveConfig = {
	playAddr : string;
	weatherAddr : string;
}

export const getConfig = () : Promise<null | LiveConfig> => {
	return new Promise(function (resolve) {
		const cfg = (uni.getStorageSync(
			configKey,
		));
		resolve({ ...defaultCfg, ...cfg })
	}).catch(e => {
		return null
	})
}

export const setConfig = (val : Partial<LiveConfig>) => {
	getConfig().then((cfg) => {
		uni.setStorage({
			key: configKey,
			data: { ...(cfg || {}), ...val }
		})
	})
}