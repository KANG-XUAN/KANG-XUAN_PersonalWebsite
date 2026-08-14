<template>

	<div v-if="selectedData.cards?.length" class="cards-wrapper" :class="{
		'can-scroll-left': cardsCanScrollLeft,
		'can-scroll-right': cardsCanScrollRight,
		'content-hidden': isHoveringOther,
		'initial-scroll-ready': initialScrollReady
	}">

		<div ref="cardsRef" class="cards" @wheel="handleCardsWheel" @scroll="updateCardsScrollState">

			<div v-for="(card, index) in selectedData.cards" :key="`${animationKey}-${index}`" class="image-card-enter"
				:style="{
					'--card-delay': `${index * 0.06}s`,
					'--card-aspect-ratio': (card.aspectRatio || '1:1').replace(':', ' / ')
				}">

				<div class="image-card">

					<!-- 圖片 -->
					<div class="image-card-image">
						<img :src="card.image" :alt="card.title">
					</div>

					<!-- 文字 -->
					<div class="image-card-content">

						<div class="image-card-title">
							{{ card.title }}
						</div>

						<div v-if="card.describe" class="image-card-describe">
							{{ card.describe }}
						</div>

					</div>

				</div>

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

/* 是否正在 Hover 其他項目 */
const isHoveringOther = computed(() => {
	return (
		props.hoverIndex !== null &&
		props.hoverIndex !== props.currentIndex
	)
})

/* Cards DOM */
const cardsRef = ref(null)

/* 滾動狀態 */
const cardsCanScrollLeft = ref(false)
const cardsCanScrollRight = ref(false)

/* 初次進場時右光暈是否已準備顯示 */
const initialScrollReady = ref(false)

let initialScrollTimer = null

/* 清除右光暈延遲計時 */
const clearInitialScrollTimer = () => {

	if (initialScrollTimer) {

		clearTimeout(initialScrollTimer)

		initialScrollTimer = null

	}

}

/* 等待卡片進場動畫後顯示右光暈 */
const waitForInitialScroll = () => {

	clearInitialScrollTimer()

	initialScrollReady.value = false

	nextTick(() => {

		const cards = cardsRef.value

		if (!cards) {
			initialScrollReady.value = true
			return
		}

		const itemCount =
			selectedData.value?.cards?.length || 0

		if (!itemCount) {
			initialScrollReady.value = true
			return
		}

		const maxScroll =
			cards.scrollWidth - cards.clientWidth

		if (maxScroll <= 0) {
			initialScrollReady.value = true
			return
		}

		const lastCardDelay =
			(itemCount - 1) * 60

		const cardAnimationDuration = 500

		// 右側初次光暈出現時間細調
		const glowStartOffset = -450

		const totalDelay =
			Math.max(
				0,
				lastCardDelay +
				cardAnimationDuration +
				glowStartOffset
			)

		initialScrollTimer = setTimeout(() => {

			initialScrollReady.value = true

			initialScrollTimer = null

		}, totalDelay)

	})

}

/* 更新滾動狀態 */
const updateCardsScrollState = () => {

	const cards = cardsRef.value

	if (!cards) {

		cardsCanScrollLeft.value = false
		cardsCanScrollRight.value = false

		return

	}

	const maxScroll = Math.max(
		0,
		cards.scrollWidth - cards.clientWidth
	)

	cardsCanScrollLeft.value =
		cards.scrollLeft > 2

	cardsCanScrollRight.value =
		cards.scrollLeft < maxScroll - 2

}

/* 滑鼠滾輪轉換成水平滾動 */
const handleCardsWheel = (event) => {

	const cards = event.currentTarget

	const maxScroll =
		cards.scrollWidth - cards.clientWidth

	/* 沒有橫向內容時不攔截 */
	if (maxScroll <= 0) {
		return
	}

	event.preventDefault()
	event.stopPropagation()

	cards.scrollLeft += event.deltaY

	updateCardsScrollState()

}

/* 重設卡片滾動位置 */
const resetScrollPosition = () => {

	nextTick(() => {

		const cards = cardsRef.value

		if (cards) {
			cards.scrollLeft = 0
		}

		updateCardsScrollState()
		waitForInitialScroll()

	})

}

/* 正式切換時重新播放卡片動畫 */
watch(
	() => props.animationKey,
	() => {
		resetScrollPosition()
	}
)

/* 正式選取項目改變時更新滾動狀態 */
watch(
	() => props.currentIndex,
	() => {

		nextTick(() => {

			updateCardsScrollState()
			waitForInitialScroll()

		})

	}
)

/* 元件建立時初始化 */
onMounted(() => {

	updateCardsScrollState()
	waitForInitialScroll()

	window.addEventListener(
		'resize',
		updateCardsScrollState
	)

})

/* 元件移除時清除事件 */
onBeforeUnmount(() => {

	clearInitialScrollTimer()

	window.removeEventListener(
		'resize',
		updateCardsScrollState
	)

})

</script>

<style scoped>
/* 卡片區域 */
.cards-wrapper {
	position: relative;

	width: 100%;
	height: 100%;

	min-width: 0;
	min-height: 0;

	overflow: hidden;
}

/* 卡片水平列表 */
.cards {
	display: flex;
	flex-wrap: nowrap;
	align-items: stretch;

	gap: 16px;

	width: 100%;
	height: 100%;

	min-width: 0;
	min-height: 0;

	overflow-x: auto;
	overflow-y: hidden;
}

.cards::-webkit-scrollbar {
	display: none;
}

/* 左右滾動提示光暈 */
.cards-wrapper::before,
.cards-wrapper::after {
	content: "";

	position: absolute;

	top: 0;
	bottom: 0;

	width: 45px;

	z-index: 5;

	pointer-events: none;

	opacity: 0;

	transition:
		opacity 0.3s ease;

	filter:
		blur(4px);
}

/* 左側光暈 */
.cards-wrapper::before {
	left: 0;

	background:
		linear-gradient(to right,
			rgba(255, 255, 255, 0.12),
			rgba(255, 255, 255, 0));
}

/* 右側光暈 */
.cards-wrapper::after {
	right: 0;

	background:
		linear-gradient(to left,
			rgba(255, 255, 255, 0.18),
			rgba(255, 255, 255, 0));
}

.cards-wrapper.can-scroll-left::before {
	opacity: 1;
}

.cards-wrapper.can-scroll-right::after {
	opacity: 1;
}

/* 初次進場時延遲右側光暈 */
.cards-wrapper.can-scroll-right:not(.initial-scroll-ready)::after {
	opacity: 0;
}

/* Hover 其他項目時隱藏卡片 */
.content-hidden {

	visibility: hidden;
	opacity: 0;

	transition:
		opacity 0.2s ease;

}

/* 卡片進場動畫 */
.image-card-enter {
	flex:
		0 0 auto;

	height: 100%;
	min-height: 0;

	aspect-ratio:
		var(--card-aspect-ratio, 1 / 1);

	box-sizing: border-box;

	opacity: 0;

	transform:
		translateY(20px) scale(0.97);

	animation:
		cardEnter 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;

	animation-delay:
		var(--card-delay);
}

@keyframes cardEnter {

	from {

		opacity: 0;

		transform:
			translateY(20px) scale(0.97);

	}

	to {

		opacity: 1;

		transform:
			translateY(0) scale(1);

	}

}

/* 卡片本體 */
.image-card {
	position: relative;

	width: 100%;
	height: 100%;

	min-height: 0;

	display: flex;
	flex-direction: column;

	overflow: hidden;

	border:
		1px solid rgba(255, 255, 255, 0.15);

	background:
		rgba(255, 255, 255, 0.05);

	backdrop-filter:
		blur(8px);

	transition:
		transform 0.25s ease,
		border-color 0.25s ease,
		background 0.25s ease;

	container-type: size;
}

.image-card:hover {

	transform:
		translateY(-4px);

	border-color:
		rgba(255, 255, 255, 0.45);

	background:
		rgba(255, 255, 255, 0.1);

}

/* 卡片圖片 */
.image-card-image {
	flex: 1 1 auto;

	width: 100%;
	min-height: 0;

	overflow: hidden;
}

.image-card-image img {

	display: block;

	width: 100%;
	height: 100%;

	object-fit: cover;

	transition:
		transform 0.4s ease;

}

.image-card:hover .image-card-image img {

	transform:
		scale(1.05);

}

/* 卡片文字標題 */
.image-card-title {
    font-size:
        clamp(12px, 3cqh, 22px);

    line-height: 1.2;

    font-weight: bold;
}

.image-card-content {
    flex: 0 0 auto;

    padding:
        clamp(6px, 2cqh, 14px);

    box-sizing: border-box;
}

/* 卡片文字內容 */
.image-card-describe {
    margin-top:
        clamp(3px, 0.8cqh, 6px);

    color:
        rgba(255, 255, 255, 0.65);

    font-size:
        clamp(10px, 2.2cqh, 16px);

    line-height: 1.4;
}

/* 卡片進場掃光 */
.image-card::after {

	content: "";

	position: absolute;

	top: 0;
	left: -100%;

	width: 35%;
	height: 100%;

	background:
		linear-gradient(90deg,
			transparent,
			rgba(255, 255, 255, 0.16),
			transparent);

	transform:
		skewX(-15deg);

	pointer-events: none;

	z-index: 2;

	animation:
		cardShine 0.7s ease forwards;

	animation-delay:
		calc(var(--card-delay) + 0.15s);

}

@keyframes cardShine {

	from {
		left: -100%;
	}

	to {
		left: 150%;
	}

}

/* 使用者偏好減少動畫時關閉動畫 */
@media (prefers-reduced-motion: reduce) {

	.image-card-enter {

		opacity: 1;

		transform: none;

		animation: none;

	}

	.image-card::after {
		display: none;
	}

}
</style>