<template>
	<div class="portfolio-page">

		<!-- 分頁內容 -->
		<div class="tab-content container mb-5">

			<Portfolio_WritingArea />
			
		</div>
	</div>
</template>


<script setup>
import { computed, ref } from 'vue'

import Portfolio_WritingArea from "@/components/areas/portfolio/writing/Portfolio_WritingArea.vue"
</script>


<style scoped>
.portfolio-page {
	height: 100vh;
}
</style>