<template>
	<div class="title title-container">

		<!-- 正式切換動畫 -->
		<div
			v-if="isTitleMoving"
			class="title-track title-track-moving"
			:style="{
				'--push-distance': `${titlePushDistance}px`
			}"
		>

			<div class="title-base">
				{{ transitionFromTitle }}

				<span class="title-arrow">
					=>
				</span>
			</div>

			<div class="title-next">
				{{ transitionToTitle }}
			</div>

		</div>


		<!-- Hover 預覽 -->
		<div
			v-else-if="showPreviewTitle"
			class="title-preview"
		>

			<div class="title-base">
				{{ selectedData.title }}

				<span class="title-arrow">
					=>
				</span>
			</div>

			<div class="title-next">
				{{ previewData.title }}
			</div>

		</div>


		<!-- 一般狀態 -->
		<div
			v-else
			class="title-single"
		>
			{{ selectedData.title }}
		</div>

	</div>

	<hr>
</template>


<script setup>
import {
	computed,
	ref,
	watch,
	nextTick
} from 'vue'

import data from '../../../assets/json/professional.json'


const props = defineProps({

	currentIndex: {
		type: Number,
		default: 0
	},

	hoverIndex: {
		type: Number,
		default: null
	},

	animationKey: {
		type: Number,
		default: 0
	}

})


const selectedData = computed(() => {
	return data.skills[props.currentIndex]
})


const previewData = computed(() => {

	const index =
		props.hoverIndex !== null
			? props.hoverIndex
			: props.currentIndex

	return data.skills[index]

})


const showPreviewTitle = computed(() => {

	return (
		props.hoverIndex !== null &&
		props.hoverIndex !== props.currentIndex
	)

})


const isTitleMoving = ref(false)

const transitionFromTitle = ref('')

const transitionToTitle = ref('')

const titlePushDistance = ref(0)


watch(
	() => props.currentIndex,
	async (newIndex, oldIndex) => {

		if (
			oldIndex === undefined ||
			newIndex === oldIndex
		) {
			return
		}


		transitionFromTitle.value =
			data.skills[oldIndex]?.title ?? ''


		transitionToTitle.value =
			data.skills[newIndex]?.title ?? ''


		isTitleMoving.value = true


		await nextTick()


		const baseElement =
			document.querySelector(
				'.title-track-moving .title-base'
			)


		if (baseElement) {

			titlePushDistance.value =
				baseElement.getBoundingClientRect().width

		}


		setTimeout(() => {

			isTitleMoving.value = false

		}, 450)

	}
)
</script>


<style scoped>
.title {
	font-size: 32px;
	width: 100%;
}

.title-container {
	position: relative;

	width: 100%;
	max-width: 100%;

	height: 48px;

	overflow: hidden;
}

.title-single {
	display: flex;

	align-items: center;

	height: 100%;

	white-space: nowrap;
}

.title-preview {
	display: flex;

	align-items: center;

	height: 100%;

	white-space: nowrap;
}

.title-track {
	display: flex;

	align-items: center;

	width: max-content;

	height: 100%;

	white-space: nowrap;
}

.title-base {
	display: flex;

	align-items: center;

	white-space: nowrap;
}

.title-arrow {
	margin: 0 8px;

	opacity: 0.6;

	font-size: 0.85em;

	font-weight: bold;
}

.title-next {
	white-space: nowrap;
}

.title-track-moving {
	animation:
		titlePush 0.45s cubic-bezier(0.77, 0, 0.18, 1) forwards;
}

@keyframes titlePush {

	from {
		transform: translateX(0);
	}

	to {
		transform:
			translateX(calc(-1 * var(--push-distance)));
	}

}
</style>