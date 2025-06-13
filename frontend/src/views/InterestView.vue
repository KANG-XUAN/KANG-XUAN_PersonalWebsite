<template>
	<div>

		<div class="container-fluid">
			<div class="row">
				<HeaderCommon />
			</div>
		</div>

		<div class="container">
			<div class="row">
				<InterestPage />
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
import InterestPage from '@/components/pages/InterestPage.vue';
import HeaderCommon from '@/components/common/HeaderCommon.vue';
import FooterCommon from '@/components/common/FooterCommon.vue';

export default {
	components: {
		InterestPage,
		HeaderCommon,
		FooterCommon,
	}
};
</script>

<style scoped></style>