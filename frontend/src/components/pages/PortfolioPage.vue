<template>
	<div class="portfolio-page">
		<!-- 分頁內容 -->
		<div class="tab-content container mb-5">
			<PortfolioList />
		</div>
	</div>
</template>

<script setup>
// 各區塊元件
import PortfolioList from '../areas/portfolio/PortfolioList.vue'
</script>

<style scoped>
.btn-group .btn.active {
	background-color: #343a40;
	color: #fff;
}
</style>
