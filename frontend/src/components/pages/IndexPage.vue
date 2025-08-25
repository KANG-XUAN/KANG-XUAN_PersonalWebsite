<template>
	<div class="fullpage-wrapper">
		<HomeArea class="step" />

		<step2 class="step" />
		<SongArea class="step" />
		<NovelArea class="step" />
	</div>
</template>

<script setup>
import SongArea from '@/components/areas/index/SongArea.vue'
import NovelArea from '@/components/areas/index/NovelArea.vue'
import Step2 from '@/components/areas/index/Step2.vue'
import HomeArea from '@/components/areas/index/HomeArea.vue'
</script>

<style scoped>
.fullpage-wrapper {
	height: 100vh;
	overflow-y: scroll;
	scroll-snap-type: y mandatory;
	scroll-behavior: smooth;
	scroll-padding-right: 60px;
}

.step {
	scroll-snap-align: start;
	height: 100vh;
	width: 100%;
	padding-top: 60px;
	/* border: red solid 1px; */
}
</style>
