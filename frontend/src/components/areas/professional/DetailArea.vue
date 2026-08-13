<template>

	<div :key="animationKey" class="detail-content" :class="{
		'content-hidden': isHoveringOther
	}">

		<div class="details">

			{{ selectedData.details }}

		</div>

	</div>

</template>


<script setup>

import {
	computed
} from 'vue'


import data
	from '../../../assets/json/professional.json'


/* =========================
 * Props
 * ========================= */

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


/* =========================
 * 資料
 * ========================= */

const selectedData = computed(() => {

	return data.skills[props.currentIndex]

})


/* =========================
 * Hover 狀態
 * ========================= */

const isHoveringOther = computed(() => {

	return (

		props.hoverIndex !== null &&

		props.hoverIndex !== props.currentIndex

	)

})

</script>


<style scoped>
/* =========================
 * Detail
 * ========================= */

.detail-content {

	position: relative;

	margin-top: 20px;

	width: 100%;

	clip-path:
		inset(0 100% 0 0);

	animation:
		detailsWipe 0.55s cubic-bezier(0.77, 0, 0.18, 1) forwards;

}


/* =========================
 * Hover 隱藏
 * ========================= */

.content-hidden {

	visibility: hidden;

	opacity: 0;

}


/* =========================
 * 詳細文字
 * ========================= */

.details {

	position: relative;

	width: 100%;

	font-size: 20px;

	line-height: 1.8;

}


/* =========================
 * Detail 擦除動畫
 * ========================= */

@keyframes detailsWipe {

	from {

		clip-path:
			inset(0 100% 0 0);

	}

	to {

		clip-path:
			inset(0 0 0 0);

	}

}


/* =========================
 * 擦除光線
 * ========================= */

.detail-content::after {

	content: "";

	position: absolute;

	top: -6px;

	bottom: -6px;

	left: 0;

	width: 2px;

	background:
		rgba(255, 255, 255, 1);

	box-shadow:

		0 0 4px rgba(255, 255, 255, 1),

		0 0 9px rgba(255, 255, 255, 0.95),

		0 0 18px rgba(255, 255, 255, 0.75),

		0 0 32px rgba(255, 255, 255, 0.45);

	animation:

		wipeLight 0.55s cubic-bezier(0.77, 0, 0.18, 1) forwards;

	pointer-events: none;

	z-index: 2;

}


/* =========================
 * 光線動畫
 * ========================= */

@keyframes wipeLight {

	0% {

		left: 0;

		opacity: 1;

		transform:
			translateX(0) scaleX(1);

	}

	80% {

		opacity: 1;

		transform:
			translateX(0) scaleX(1);

	}

	92% {

		opacity: 0.55;

		transform:
			translateX(0) scaleX(0.7);

	}

	100% {

		left: 100%;

		opacity: 0;

		transform:
			translateX(0) scaleX(0.35);

	}

}
</style>