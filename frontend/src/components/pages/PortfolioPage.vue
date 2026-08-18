<template>
	<div class="portfolio-page">

		<!-- 分頁內容 -->
		<div class="tab-content container mb-5">

			<PortfolioArea />

		</div>

	</div>
</template>


<script setup>
import { computed, ref } from 'vue'

import PortfolioArea from '../areas/portfolio/PortfolioArea.vue'
</script>


<style scoped>
</style>