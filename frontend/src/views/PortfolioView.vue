<template>
	<div>
		<!-- margin-right來讓Header不要遮住右方滾動條 -->
		<div class="container-fluid">
			<div class="row">
				<HeaderCommon />
			</div>
		</div>

		<div class="container p-0">
			<!-- <div class="row"> -->
				<PortfolioPage />
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
import PortfolioPage from '@/components/pages/PortfolioPage.vue'
import HeaderCommon from '@/components/common/HeaderCommon.vue'
import FooterCommon from '@/components/common/FooterCommon.vue'
</script>

<style scoped>
/* 可放自訂樣式 */
</style>
