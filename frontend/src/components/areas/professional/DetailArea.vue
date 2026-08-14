<template>

	<div :key="animationKey" class="detail-content" :class="{
		'content-hidden': isHoveringOther,
		'can-scroll-up': canScrollUp,
		'can-scroll-down': canScrollDown
	}">

		<div ref="detailScrollRef" class="detail-scroll" @scroll="updateScrollState" @wheel="handleWheel">

			<div class="details">

				{{ selectedData.details }}

			</div>

		</div>

		<div class="detail-wipe-light"></div>

	</div>

</template>


<script setup>

import {
	computed,
	ref,
	watch,
	nextTick,
	onMounted,
	onBeforeUnmount
} from 'vue'

import data
	from '../../../assets/json/professional.json'

/* Props */
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

/* 資料 */
const selectedData = computed(() => {

	return data.skills[props.currentIndex]

})

/* Hover 狀態 */
const isHoveringOther = computed(() => {

	return (
		props.hoverIndex !== null &&
		props.hoverIndex !== props.currentIndex
	)

})

/* Detail Scroll */
const detailScrollRef = ref(null)

const canScrollUp = ref(false)

const canScrollDown = ref(false)

/* 更新滾動狀態 */
const updateScrollState = () => {

	const scroll = detailScrollRef.value

	if (!scroll) {

		canScrollUp.value = false
		canScrollDown.value = false

		return

	}

	const maxScroll =
		Math.max(
			0,
			scroll.scrollHeight - scroll.clientHeight
		)

	canScrollUp.value =
		scroll.scrollTop > 2

	canScrollDown.value =
		scroll.scrollTop < maxScroll - 2

}

/* 滑鼠滾輪轉換成垂直滾動 */
const handleWheel = (event) => {

	const scroll = event.currentTarget

	const maxScroll =
		scroll.scrollHeight - scroll.clientHeight

	if (maxScroll <= 0) {

		return

	}

	event.preventDefault()

	event.stopPropagation()

	scroll.scrollTop += event.deltaY

	updateScrollState()

}

/* 重設滾動位置 */
const resetScrollPosition = () => {

	nextTick(() => {

		const scroll = detailScrollRef.value

		if (scroll) {

			scroll.scrollTop = 0

		}

		updateScrollState()

	})

}

/* 正式切換時重設滾動位置 */
watch(
	() => props.animationKey,
	() => {

		resetScrollPosition()

	}
)

/* 正式選取項目改變時重設滾動位置 */
watch(
	() => props.currentIndex,
	() => {

		nextTick(() => {

			resetScrollPosition()

		})

	}
)

/* 元件建立時初始化 */
onMounted(() => {

	nextTick(() => {

		updateScrollState()

	})

	window.addEventListener(
		'resize',
		updateScrollState
	)

})

/* 元件移除時清除事件 */
onBeforeUnmount(() => {

	window.removeEventListener(
		'resize',
		updateScrollState
	)

})

</script>


<style scoped>
/* Detail */
.detail-content {
	--detail-padding-x: 5.4vh;


	position: relative;

	width: 100%;
	height: 100%;

	min-width: 0;
	min-height: 0;

	padding:
		0 var(--detail-padding-x);

	box-sizing: border-box;

	overflow: hidden;
}

/* Detail 滾動區 */
.detail-scroll {
	width: 100%;
	height: 100%;

	min-width: 0;
	min-height: 0;

	overflow-x: hidden;
	overflow-y: auto;

	scrollbar-width: none;
	-ms-overflow-style: none;

	box-sizing: border-box;

	clip-path:
		inset(0 100% 0 0);

	animation:
		detailsWipe 0.55s cubic-bezier(0.77, 0, 0.18, 1) forwards;
}

.detail-scroll::-webkit-scrollbar {

	display: none;

}

/* Hover 隱藏 */
.content-hidden {

	visibility: hidden;

	opacity: 0;

}

/* 詳細文字 */
.details {

	position: relative;

	width: 100%;

	box-sizing: border-box;

	font-size:
		clamp(16px, 2.7vh, 36px);

	line-height: 1.8;

}

/* Detail 擦除動畫 */
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

/* 擦除光線 */
.detail-wipe-light {
	position: absolute;

	top: -6px;
	bottom: -6px;

	left: var(--detail-padding-x);

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

	z-index: 10;
}

/* 光線動畫 */
@keyframes wipeLight {

	0% {
		left: var(--detail-padding-x);

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
		left: calc(100% - var(--detail-padding-x));

		opacity: 0;

		transform:
			translateX(0) scaleX(0.35);
	}
}

/* 上下滾動提示光暈 */
.detail-content::before,
.detail-content::after {

	content: "";

	position: absolute;

	left: 0;
	right: 0;

	height: 45px;

	z-index: 5;

	pointer-events: none;

	opacity: 0;

	transition:
		opacity 0.3s ease;

	filter:
		blur(4px);

}

/* 上方光暈 */
.detail-content::before {

	top: 0;

	background:
		linear-gradient(to bottom,
			rgba(255, 255, 255, 0.14),
			rgba(255, 255, 255, 0));

}

/* 下方光暈 */
.detail-content::after {

	bottom: 0;

	background:
		linear-gradient(to top,
			rgba(255, 255, 255, 0.18),
			rgba(255, 255, 255, 0));

}

/* 可以往上 */
.detail-content.can-scroll-up::before {

	opacity: 1;

}

/* 可以往下 */
.detail-content.can-scroll-down::after {

	opacity: 1;

}
</style>