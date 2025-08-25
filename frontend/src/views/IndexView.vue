<template>
	<div>
		<!-- margin-right來讓Header不要遮住右方滾動條 -->
		<div class="container-fluid fixed-top">
			<div class="row">
				<HeaderCommon />
			</div>
		</div>

		<div class="container-fluid full-height">
			<!-- <div class="row"> -->
			<IndexPage />
			<!-- </div> -->
		</div>

		<!-- <div class="container-fluid">
			<div class="row">
				<FooterCommon />
			</div>
		</div> -->

		<DotNav />
	</div>
</template>

<script setup>
import IndexPage from '@/components/pages/IndexPage.vue'
import HeaderCommon from '@/components/common/HeaderCommon.vue'
// import FooterCommon from '@/components/common/FooterCommon.vue'
import DotNav from '@/components/areas/index/Dot-nav.vue'
</script>

<style scoped>
/* 如有自訂樣式可寫這裡 */
.full-height {
	padding: 0;
}
</style>
