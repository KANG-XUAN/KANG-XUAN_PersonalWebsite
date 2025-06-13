<template>
	<div>

		<div class="container-fluid">
			<div class="row">
				<HeaderCommon />
			</div>
		</div>

		<div class="container">
			<div class="row">
				<AboutPage />
			</div>
		</div>

		<div class="container-fluid">
			<div class="row">
				<FooterCommon />
			</div>
		</div>
	</div>
</template>

<script>
import AboutPage from '@/components/pages/AboutPage.vue';
import HeaderCommon from '@/components/common/HeaderCommon.vue';
import FooterCommon from '@/components/common/FooterCommon.vue';

export default {
	components: {
		AboutPage,
		HeaderCommon,
		FooterCommon,
	}
};
</script>

<style scoped></style>