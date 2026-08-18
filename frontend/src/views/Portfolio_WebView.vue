<template>
	<div id="portfolio">
		<!-- margin-right來讓Header不要遮住右方滾動條 -->
		<div class="container-fluid">
			<div class="row">
				<HeaderCommon />
			</div>
		</div>

		<div class="container p-0">
			<!-- <div class="row"> -->
			<PortfolioWebPage />
			<!-- </div> -->
		</div>

		<div class="container-fluid">
			<div class="row">
				<FooterCommon />
			</div>
		</div>
	</div>
</template>

<script setup>
import PortfolioWebPage from '@/components/pages/Portfolio_WebPage.vue'
import HeaderCommon from '@/components/common/HeaderCommon.vue'
import FooterCommon from '@/components/common/FooterCommon.vue'
</script>

<style scoped>
#portfolio {
	background-color: #fdf6e3;
	background-image: url("https://www.transparenttextures.com/patterns/elegant-grid.png");
	/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
}
</style>
