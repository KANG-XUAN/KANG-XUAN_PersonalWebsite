<template>
	<div class="fullpage-wrapper">
		<step3 class="step" />

		<step2 class="step" />
		<step1 class="step" />
	</div>
</template>

<script setup>
import Step1 from '@/components/areas/index/Step1.vue'
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
