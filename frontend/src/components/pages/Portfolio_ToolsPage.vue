<template>
	<div class="portfolio-page">

		<!-- 分頁內容 -->
		<div class="tab-content container mb-5">

			<Portfolio_ToolsArea />
			
		</div>
	</div>
</template>


<script setup>
import { computed, ref } from 'vue'

import Portfolio_ToolsArea from "@/components/areas/portfolio/tools/Portfolio_ToolsArea.vue"
</script>


<style scoped>
.portfolio-page {
	height: 100vh;
}
</style>