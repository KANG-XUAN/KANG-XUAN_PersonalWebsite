<template>
	<div id="professional">
		<div class="container-fluid">
			<div class="row">
				<HeaderCommon />
			</div>
		</div>

		<div class="container-fluid">
			<div class="row">
				<ProfessionalPage />
			</div>
		</div>

		<div class="container-fluid">
			<div class="row">
				<FooterCommon />
			</div>
		</div>
	</div>
</template>

<script setup>
import ProfessionalPage from '@/components/pages/ProfessionalPage.vue'
import HeaderCommon from '@/components/common/HeaderCommon.vue'
import FooterCommon from '@/components/common/FooterCommon.vue'
</script>

<style scoped>
#professional {
	background-color: #472500;
	background-image: url("https://www.transparenttextures.com/patterns/dark-wood.png");
	/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
}
</style>
