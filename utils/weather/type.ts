export type Weather = {
	date : string;
	weather : string;
	week : string;
	/** 天气图标  */
	image : string;
	temperature : string;
	/** 空气质量 */
	airQuality ?: string;
	/** 天气预警 */
	weatherAlert ?: string;
};