<template>
	<div>

		<div class="container-fluid">
			<div class="row">
				<HeaderCommon />
			</div>
		</div>

		<div class="container">
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

<script>
import ProfessionalPage from '@/components/pages/ProfessionalPage.vue';
import HeaderCommon from '@/components/common/HeaderCommon.vue';
import FooterCommon from '@/components/common/FooterCommon.vue';

export default {
	components: {
		ProfessionalPage,
		HeaderCommon,
		FooterCommon,
	}
};
</script>

<style scoped></style>