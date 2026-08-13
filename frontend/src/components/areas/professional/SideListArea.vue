<template>

	<div v-if="selectedData.list?.length" class="side-list-wrapper" :class="{
		'content-hidden': isHoveringOther,
		'can-scroll-up': listCanScrollUp,
		'can-scroll-down': listCanScrollDown,
		'list-animation-ready': listAnimationReady
	}">

		<div ref="sideListRef" class="side-list" @wheel="handleListWheel" @scroll="updateListScrollState">

			<div v-for="(item, index) in selectedData.list" :key="`${animationKey}-${index}`" class="side-list-item"
				:style="{
					'--list-delay': `${index * 0.05}s`
				}">

				<span class="side-list-number">
					{{ String(index + 1).padStart(2, '0') }}
				</span>

				<span class="side-list-text">
					{{ item }}
				</span>

			</div>

		</div>

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

import data from '../../../assets/json/professional.json'

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

/* 是否正在 Hover 其他項目 */
const isHoveringOther = computed(() => {

	return (
		props.hoverIndex !== null &&
		props.hoverIndex !== props.currentIndex
	)

})

/* 列表 DOM */
const sideListRef = ref(null)

/* 滾動狀態 */
const listCanScrollUp = ref(false)
const listCanScrollDown = ref(false)

/* 列表進場動畫是否完成 */
const listAnimationReady = ref(false)

let listAnimationTimer = null

/* 更新滾動狀態 */
const updateListScrollState = () => {

	const list = sideListRef.value

	if (!list) {

		listCanScrollUp.value = false
		listCanScrollDown.value = false

		return

	}

	const maxScroll = Math.max(
		0,
		list.scrollHeight - list.clientHeight
	)

	listCanScrollUp.value =
		list.scrollTop > 2

	listCanScrollDown.value =
		list.scrollTop < maxScroll - 2

}

/* 滑鼠滾輪轉換成垂直滾動 */
const handleListWheel = (event) => {

	const list = event.currentTarget

	const maxScroll =
		list.scrollHeight - list.clientHeight

	if (maxScroll <= 0) {
		return
	}

	event.preventDefault()
	event.stopPropagation()

	list.scrollTop += event.deltaY

	updateListScrollState()

}

/* 清除列表動畫計時器 */
const clearListAnimationTimer = () => {

	if (listAnimationTimer) {

		clearTimeout(listAnimationTimer)

		listAnimationTimer = null

	}

}

/* 等待列表進場動畫完成 */
const waitForListAnimation = () => {

	clearListAnimationTimer()

	listAnimationReady.value = false

	nextTick(() => {

		const list = sideListRef.value

		if (!list) {
			listAnimationReady.value = true
			return
		}

		const itemCount =
			selectedData.value?.list?.length || 0

		if (!itemCount) {
			listAnimationReady.value = true
			return
		}

		const lastItemDelay =
			(itemCount - 1) * 50

		// 下方初次光暈出現時間細調
		const glowStartOffset = -150

		const totalDelay =
			Math.max(
				0,
				lastItemDelay + glowStartOffset
			)

		listAnimationTimer = setTimeout(() => {

			listAnimationReady.value = true

			listAnimationTimer = null

		}, totalDelay)

	})

}

/* 重設列表滾動位置 */
const resetScrollPosition = () => {

	nextTick(() => {

		if (sideListRef.value) {
			sideListRef.value.scrollTop = 0
		}

		updateListScrollState()
		waitForListAnimation()

	})

}

/* 正式切換時重新播放列表動畫 */
watch(
	() => props.animationKey,
	() => {
		resetScrollPosition()
	}
)

/* 正式選取項目改變時更新列表 */
watch(
	() => props.currentIndex,
	() => {

		nextTick(() => {

			updateListScrollState()
			waitForListAnimation()

		})

	}
)

/* 元件建立時初始化 */
onMounted(() => {

	updateListScrollState()
	waitForListAnimation()

	window.addEventListener(
		'resize',
		updateListScrollState
	)

})

/* 元件移除時清除事件 */
onBeforeUnmount(() => {

	clearListAnimationTimer()

	window.removeEventListener(
		'resize',
		updateListScrollState
	)

})

</script>

<style scoped>
/* 列表區域 */
.side-list-wrapper {

	position: relative;

	align-self: start;

	width: 220px;
	height: 470px;

	overflow: hidden;

}

/* 列表 */
.side-list {

	display: flex;
	flex-direction: column;

	width: 100%;
	height: 100%;

	border-left:
		1px solid rgba(255, 255, 255, 0.2);

	padding-left: 20px;

	overflow-x: hidden;
	overflow-y: auto;

	scrollbar-width: none;
	-ms-overflow-style: none;

}

.side-list::-webkit-scrollbar {
	display: none;
}

/* 上下滾動提示光暈 */
.side-list-wrapper::before,
.side-list-wrapper::after {

	content: "";

	position: absolute;

	left: 0;
	right: 0;

	height: 40px;

	z-index: 5;

	pointer-events: none;

	opacity: 0;

	transition:
		opacity 0.3s ease;

	filter: blur(4px);

}

.side-list-wrapper::before {

	top: 0;

	background:
		linear-gradient(to bottom,
			rgba(255, 255, 255, 0.12),
			rgba(255, 255, 255, 0));

}

.side-list-wrapper::after {

	bottom: 0;

	background:
		linear-gradient(to top,
			rgba(255, 255, 255, 0.18),
			rgba(255, 255, 255, 0));

}

/* 可以向上 */
.side-list-wrapper.can-scroll-up::before {
	opacity: 1;
}

/* 可以向下 */
.side-list-wrapper.can-scroll-down.list-animation-ready::after {
	opacity: 1;
}

/* Hover 其他項目時隱藏列表 */
.content-hidden {

	visibility: hidden;

	opacity: 0;

}

/* 列表項目進場 */
.side-list-item {

	display: flex;

	align-items: flex-start;

	flex-shrink: 0;

	gap: 12px;

	padding: 10px 0;

	color:
		rgba(255, 255, 255, 0.75);

	font-size: 16px;

	line-height: 1.5;

	opacity: 0;

	transform:
		translateX(-15px);

	filter:
		blur(3px);

	animation:
		listItemEnter 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;

	animation-delay:
		var(--list-delay);

	transition:
		color 0.2s ease,
		transform 0.2s ease;

}

@keyframes listItemEnter {

	from {

		opacity: 0;

		transform:
			translateX(-15px);

		filter:
			blur(3px);

	}

	to {

		opacity: 1;

		transform:
			translateX(0);

		filter:
			blur(0);

	}

}

/* 列表項目 Hover */
.side-list-item:hover {

	color: white;

	transform:
		translateX(4px);

}

/* 列表編號 */
.side-list-number {

	flex-shrink: 0;

	color:
		rgba(255, 255, 255, 0.35);

	font-family:
		monospace;

	font-size: 13px;

}

/* 列表文字 */
.side-list-text {
	flex: 1;
}

/* 使用者偏好減少動畫時關閉動畫 */
@media (prefers-reduced-motion: reduce) {

	.side-list-item {

		opacity: 1;

		transform: none;

		filter: none;

		animation: none;

	}

}
</style>