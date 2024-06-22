import { StorageKey } from "./const";
import { defaultCfg } from "./weather";

const configKey = StorageKey.LiveConfig

export type LiveConfig = {
	playAddr : string;
	weatherAddr : string;
}

/** 获取 Storage */
export const getStorage = <T,>(key : StorageKey) : Promise<T | null> => new Promise(resolve => {
	const result = uni.getStorageSync(
		key,
	);
	resolve(result)
}).catch(err => {
	console.log('get storage error', err)
	return null
})

/** 设置 storage */
export const setStorage = <T extends Record<string, any>,>(key : StorageKey, data : T) => {
	uni.setStorage({
		key, data
	})
}

export const getConfig = () : Promise<null | LiveConfig> => {
	return getStorage<LiveConfig>(configKey).then((cfg) => ({ ...defaultCfg, ...cfg }))
}

export const setConfig = (val : Partial<LiveConfig>) => {
	// 这里总是莫名的不好使
	console.log('set cfg', val)
	getConfig().then((cfg) => {
		setStorage(
			configKey,
			{ ...(cfg || {}), ...val }
		)
	})
}