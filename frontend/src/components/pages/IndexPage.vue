<template>
	<div class="fullpage-wrapper">
		<step3 class="step" />

		<step2 class="step" />
		<SongArea class="step" />
		<NovelArea class="step" />
	</div>
</template>

<script setup>
import SongArea from '@/components/areas/index/SongArea.vue'
import NovelArea from '@/components/areas/index/NovelArea.vue'
import Step2 from '@/components/areas/index/Step2.vue'
import Step3 from '@/components/areas/index/Step3.vue'
</script>

<style scoped>
.fullpage-wrapper {
	scroll-snap-type: y mandatory;
	overflow-y: scroll;
	scroll-behavior: smooth;
	/* 平滑滾動 */
	height: 100vh;
}

.step {
	scroll-snap-align: start;
	height: 100vh;
	width: 100%;
	padding-top: 60px;
	border: red solid 1px;
}
</style>
