<script lang="ts" setup>
	import { onMounted } from 'vue';
	import { onLaunch } from '@dcloudio/uni-app'

	onLaunch(() => {
		uni.setKeepScreenOn({
			keepScreenOn: true
		})
	})
</script>

<style>
	/*每个页面公共css */
</style>