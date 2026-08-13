<template>

	<div class="describe">
		{{ previewData.describe }}
	</div>

</template>


<script setup>
import { computed } from 'vue'

import data from '../../../assets/json/professional.json'


const props = defineProps({

	currentIndex: {
		type: Number,
		default: 0
	},

	hoverIndex: {
		type: Number,
		default: null
	}

})


const previewData = computed(() => {

	const index =
		props.hoverIndex !== null
			? props.hoverIndex
			: props.currentIndex

	return data.skills[index]

})
</script>


<style scoped>
.describe {
	flex-shrink: 0;

	font-size: 24px;

	line-height: 1.5;
}
</style>