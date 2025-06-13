<template>
	<div>

		<div class="container-fluid">
			<div class="row">
				<HeaderCommon />
			</div>
		</div>

		<div class="container">
			<div class="row">
				<IndexPage />
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
import IndexPage from '@/components/pages/IndexPage.vue';
import HeaderCommon from '@/components/common/HeaderCommon.vue';
import FooterCommon from '@/components/common/FooterCommon.vue';

export default {
	components: {
		IndexPage,
		HeaderCommon,
		FooterCommon,
	}
};
</script>

<style scoped>
</style>