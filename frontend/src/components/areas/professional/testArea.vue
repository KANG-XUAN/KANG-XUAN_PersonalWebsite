<template>
	<div class="test">

		<!-- 標題區域 -->
		<div class="title title-container">

			<!-- 正式切換時的特殊動畫 -->
			<div v-if="isTitleMoving" class="title-track title-track-moving" :style="{
				'--push-distance': `${titlePushDistance}px`
			}">
				<!-- 舊標題 -->
				<div class="title-base">
					{{ transitionFromTitle }}
					<span class="title-arrow">
						=>
					</span>
				</div>

				<!-- 新標題 -->
				<div class="title-next">
					{{ transitionToTitle }}
				</div>
			</div>

			<!-- Hover 預覽 -->
			<div v-else-if="showPreviewTitle" class="title-preview">
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

			<!-- 一般正式選取狀態 -->
			<div v-else class="title-single">
				{{ selectedData.title }}
			</div>
		</div>

		<hr>

		<!-- 下方左右區域 -->
		<div class="content-layout">

			<!-- 左側 -->
			<div class="content-main">

				<!-- 簡介
			 Hover 時也會跟著 previewData 改變 -->
				<div class="describe">
					{{ previewData.describe }}
				</div>


				<!-- 正式選取後的詳細內容 -->
				<div :key="props.animationKey" class="detail-content" :class="{
					'content-hidden': isHoveringOther
				}">

					<div class="details">
						{{ selectedData.details }}
					</div>


					<!-- 圖片卡 -->
					<div v-if="selectedData.cards?.length" class="cards-wrapper" :class="{
						'can-scroll-left': cardsCanScrollLeft,
						'can-scroll-right': cardsCanScrollRight
					}">

						<div ref="cardsRef" class="cards" @wheel="handleCardsWheel" @scroll="updateCardsScrollState">

							<div v-for="(card, index) in selectedData.cards" :key="index" class="image-card">

								<div class="image-card-image">
									<img :src="card.image" :alt="card.title">
								</div>

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

			</div>


			<!-- 右側列表 -->
			<div v-if="selectedData.list?.length" class="side-list-wrapper" :class="{
				'content-hidden': isHoveringOther,
				'can-scroll-up': listCanScrollUp,
				'can-scroll-down': listCanScrollDown
			}">

				<div ref="sideListRef" class="side-list" @wheel="handleListWheel" @scroll="updateListScrollState">

					<div v-for="(item, index) in selectedData.list" :key="index" class="side-list-item">

						<span class="side-list-number">
							{{ String(index + 1).padStart(2, '0') }}
						</span>

						<span class="side-list-text">
							{{ item }}
						</span>

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

// JSON 資料
import data from '../../../assets/json/professional.json'


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

/* 是否正在 Hover 其他項目 */
const isHoveringOther = computed(() => {

	return (
		props.hoverIndex !== null &&
		props.hoverIndex !== props.currentIndex
	)
})


/* =========================
 * Hover / 正式選取狀態
 * ========================= */

const isTitleMoving = ref(false)

const hasSelectedAfterHover = ref(false)


watch(
	() => props.hoverIndex,
	(newValue) => {

		/* Hover 自己目前 active
		   不做任何事情 */
		if (
			newValue !== null &&
			newValue === props.currentIndex
		) {
			return
		}

		/* Hover 其他項目
		   只隱藏詳細內容 */
		if (newValue !== null) {
			hasSelectedAfterHover.value = false
		}
	}
)


watch(
	() => props.animationKey,
	() => {

		/* 正式選取後顯示詳細內容 */
		hasSelectedAfterHover.value = true

		/* 新項目從最前面開始 */
		resetScrollPosition()
	}
)


/* =========================
 * 標題動畫
 * ========================= */

const transitionFromTitle = ref('')

const transitionToTitle = ref('')

const titlePushDistance = ref(0)


/* =========================
 * 圖片卡滾動
 * ========================= */

const cardsRef = ref(null)

const cardsCanScrollLeft = ref(false)

const cardsCanScrollRight = ref(false)


const updateCardsScrollState = () => {

	const cards = cardsRef.value

	if (!cards) {
		cardsCanScrollLeft.value = false
		cardsCanScrollRight.value = false
		return
	}

	const maxScroll =
		Math.max(
			0,
			cards.scrollWidth - cards.clientWidth
		)

	cardsCanScrollLeft.value =
		cards.scrollLeft > 2

	cardsCanScrollRight.value =
		cards.scrollLeft < maxScroll - 2
}


/* 滑鼠滾輪 → 橫向 */

const handleCardsWheel = (event) => {

	const cards = event.currentTarget

	const maxScroll =
		cards.scrollWidth - cards.clientWidth


	/* 沒有超出 */
	if (maxScroll <= 0) {
		return
	}


	/*
	 * 有橫向內容時，
	 * 阻止頁面本身上下滾動
	 */
	event.preventDefault()

	event.stopPropagation()


	cards.scrollLeft += event.deltaY

	updateCardsScrollState()
}


/* =========================
 * 右側列表滾動
 * ========================= */

const sideListRef = ref(null)

const listCanScrollUp = ref(false)

const listCanScrollDown = ref(false)


const updateListScrollState = () => {

	const list = sideListRef.value

	if (!list) {
		listCanScrollUp.value = false
		listCanScrollDown.value = false
		return
	}

	const maxScroll =
		Math.max(
			0,
			list.scrollHeight - list.clientHeight
		)

	listCanScrollUp.value =
		list.scrollTop > 2

	listCanScrollDown.value =
		list.scrollTop < maxScroll - 2
}


/* 列表滾輪 */

const handleListWheel = (event) => {

	const list = event.currentTarget

	const maxScroll =
		list.scrollHeight - list.clientHeight


	/* 沒有超出 */
	if (maxScroll <= 0) {
		return
	}


	event.preventDefault()

	event.stopPropagation()


	list.scrollTop += event.deltaY

	updateListScrollState()
}


/* =========================
 * 重設滾動位置
 * ========================= */

const resetScrollPosition = () => {

	nextTick(() => {

		if (cardsRef.value) {
			cardsRef.value.scrollLeft = 0
		}

		if (sideListRef.value) {
			sideListRef.value.scrollTop = 0
		}

		updateCardsScrollState()
		updateListScrollState()
	})
}


/* =========================
 * 更新全部狀態
 * ========================= */

const updateAllScrollStates = () => {

	nextTick(() => {

		updateCardsScrollState()

		updateListScrollState()

	})
}


/* =========================
 * 正式選取變更
 * ========================= */

watch(
	() => props.currentIndex,
	async (newIndex, oldIndex) => {

		/* 初始狀態 */
		if (
			oldIndex === undefined ||
			newIndex === oldIndex
		) {
			return
		}


		/* 記住動畫前後標題 */

		transitionFromTitle.value =
			data.skills[oldIndex]?.title ?? ''

		transitionToTitle.value =
			data.skills[newIndex]?.title ?? ''


		/* 開始標題動畫 */

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


		/* 新項目從最前面開始 */

		resetScrollPosition()


		/* 動畫結束 */

		setTimeout(() => {

			isTitleMoving.value = false

			updateAllScrollStates()

		}, 450)

	}
)


/* =========================
 * Resize
 * ========================= */

onMounted(() => {

	updateAllScrollStates()

	window.addEventListener(
		'resize',
		updateAllScrollStates
	)

})


onBeforeUnmount(() => {

	window.removeEventListener(
		'resize',
		updateAllScrollStates
	)

})
</script>

<style scoped>
/* 外層 */
.test {
	position: absolute;

	left: 150px;
	top: 75px;

	z-index: 10;

	width: calc(100vw - 250px);

	color: white;
	font-size: 32px;
}

/* 標題 */
.title {
	font-size: 32px;

	width: 100%;
}

/* 標題容器 */
.title-container {
	position: relative;

	width: 100%;
	max-width: 100%;

	height: 48px;

	/* 讓被推出去的 HTML => 不會跑到畫面外繼續出現。 */
	overflow: hidden;
}

/* 一般標題 */
.title-single {
	display: flex;

	align-items: center;

	height: 100%;

	white-space: nowrap;
}

/* Hover 標題 */
.title-preview {
	display: flex;

	align-items: center;

	height: 100%;

	white-space: nowrap;
}

/* 正式切換動畫 Track */
.title-track {
	display: flex;

	align-items: center;

	width: max-content;

	height: 100%;

	white-space: nowrap;
}

/* 舊標題 + 箭頭 */
.title-base {
	display: flex;

	align-items: center;

	white-space: nowrap;
}

/* 箭頭 */
.title-arrow {
	margin: 0 8px;

	opacity: 0.6;

	font-size: 0.85em;

	font-weight: bold;
}

/* 新標題 */
.title-next {
	white-space: nowrap;
}

/* 動畫 */
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

/* 下方左右區域 */
.content-layout {
	position: relative;

	display: grid;

	grid-template-columns:
		minmax(0, 1fr) 220px;

	column-gap: 50px;

	margin-top: 30px;

	width: 100%;
}

/* 左側主要內容 */
.content-main {
	display: flex;

	flex-direction: column;

	min-width: 0;
}

/* 簡介 */
.describe {
	flex-shrink: 0;

	font-size: 24px;

	line-height: 1.5;
}

/* 詳細內容 + 圖片卡 */
.detail-content {
	position: relative;

	margin-top: 20px;

	width: 100%;

	/*
	 * 擦除動畫
	 */
	clip-path:
		inset(0 100% 0 0);

	animation:
		detailsWipe 0.55s cubic-bezier(0.77, 0, 0.18, 1) forwards;
}

/* Hover 隱藏 */
.content-hidden {
	visibility: hidden;

	opacity: 0;
}

/* 詳細內容 */
.details {
	position: relative;

	width: 100%;

	font-size: 20px;

	line-height: 1.8;
}

.cards-wrapper {
	position: relative;

	width: 100%;

	height: 280px;

	margin-top: 30px;

	overflow: hidden;
}

/* 圖片卡區 */
.cards {
	display: flex;

	flex-wrap: nowrap;

	gap: 16px;

	width: 100%;
	height: 100%;

	overflow-x: auto;
	overflow-y: hidden;

	scrollbar-width: none;
	-ms-overflow-style: none;
}

/* Chrome / Edge / Safari */
.cards::-webkit-scrollbar {
	display: none;
}

/* =========================
 * 左右邊緣淡光提示
 * ========================= */

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
}

/* 左邊 */
.cards-wrapper::before {

	left: 0;

	background:
		linear-gradient(to right,
			rgba(255, 255, 255, 0.12),
			rgba(255, 255, 255, 0));

	filter:
		blur(4px);
}


/* 右邊 */
.cards-wrapper::after {

	right: 0;

	background:
		linear-gradient(to left,
			rgba(255, 255, 255, 0.18),
			rgba(255, 255, 255, 0));

	filter:
		blur(4px);
}


/* 只有真的可以往左時才出現 */
.cards-wrapper.can-scroll-left::before {
	opacity: 1;
}


/* 只有真的可以往右時才出現 */
.cards-wrapper.can-scroll-right::after {
	opacity: 1;
}

.cards:hover::after {
	opacity: 0.9;
}

/* 圖片卡 */
.image-card {
	flex:
		0 0 260px;

	height: fit-content;

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
	width: 100%;

	aspect-ratio: 16 / 10;

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

/* 卡片文字 */
.image-card-content {
	padding: 14px;
}

.image-card-title {
	font-size: 18px;

	font-weight: bold;
}

.image-card-describe {
	margin-top: 6px;

	color:
		rgba(255, 255, 255, 0.65);

	font-size: 14px;

	line-height: 1.5;
}

/* =========================
 * 右側列表外框
 * ========================= */

.side-list-wrapper {

	position: relative;

	align-self: start;

	width: 220px;

	height: 470px;

	overflow: hidden;
}


/* 真正滾動的列表 */
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


/* Chrome / Edge / Safari */
.side-list::-webkit-scrollbar {
	display: none;
}


/* =========================
 * 上下淡光提示
 * ========================= */

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

	filter:
		blur(4px);
}


/* 上方 */
.side-list-wrapper::before {

	top: 0;

	background:
		linear-gradient(to bottom,
			rgba(255, 255, 255, 0.12),
			rgba(255, 255, 255, 0));
}


/* 下方 */
.side-list-wrapper::after {

	bottom: 0;

	background:
		linear-gradient(to top,
			rgba(255, 255, 255, 0.18),
			rgba(255, 255, 255, 0));
}


/* 可以往上 */
.side-list-wrapper.can-scroll-up::before {
	opacity: 1;
}


/* 可以往下 */
.side-list-wrapper.can-scroll-down::after {
	opacity: 1;
}

.side-list:hover::after {
	opacity: 0.9;
}

/* 清單項目 */
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

	transition:
		color 0.2s ease,
		transform 0.2s ease;
}

.side-list-item:hover {
	color: white;

	transform:
		translateX(4px);
}

/* 清單編號 */
.side-list-number {
	flex-shrink: 0;

	color:
		rgba(255, 255, 255, 0.35);

	font-family:
		monospace;

	font-size: 13px;
}

/* 清單文字 */
.side-list-text {
	flex: 1;
}

/* 詳細內容擦出 */
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

	opacity: 1;

	transform:
		translateX(0) scaleX(1);

	transform-origin:
		center;

	animation:
		wipeLight 0.55s cubic-bezier(0.77, 0, 0.18, 1) forwards;

	pointer-events: none;

	z-index: 2;
}

/* 光線移動 + 縮小 + 淡出 */
@keyframes wipeLight {

	/* 開始 */
	0% {
		left: 0;

		opacity: 1;

		transform:
			translateX(0) scaleX(1);
	}

	/* 大部分時間保持完整光線 */
	80% {
		opacity: 1;

		transform:
			translateX(0) scaleX(1);
	}

	/* 開始縮小 + 淡出 */
	92% {
		opacity: 0.55;

		transform:
			translateX(0) scaleX(0.7);
	}

	/* 完成 */
	100% {
		left: 100%;

		opacity: 0;

		transform:
			translateX(0) scaleX(0.35);
	}
}
</style>