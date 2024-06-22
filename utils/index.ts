export enum RoutePath {
	'Home' = '/pages/index/index',
	'Settings' = '/pages/settings/settings',
	'Lives' = '/pages/lives/lives',
	'Yangshi' = 'Yangshi',
}

export const Navs = [
	// {
	//   title: '观看记录',
	//   path: RoutePath.Lives,
	// },
	{
		title: '直播',
		path: RoutePath.Lives,
	},
	// web-view uniapp 组件不合适，暂时不做了
	// {
	// 	title: '央视频',
	// 	path: RoutePath.Yangshi,
	// },
	{
		title: '设置',
		path: RoutePath.Settings,
	},
];