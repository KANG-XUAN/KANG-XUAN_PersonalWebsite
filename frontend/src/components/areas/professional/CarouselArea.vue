<template>
	<!-- 左側輪盤 -->
	<div class="carousel-container" @wheel.prevent="handleWheel">
		<div class="carousel-wrapper">

			<div class="carousel">

				<div class="carousel-decoration top">
					<svg viewBox="0 0 100 60" aria-hidden="true">
						<path d="M5 5 L50 55 L95 5 L50 20 Z" />
					</svg>
				</div>

				<div v-for="(skill, i) in displayedIcons" :key="i" class="carousel-item"
					:class="{ active: i === middleIndex }" :style="getCarouselStyle(i)">
					<img :src="skill.icon" class="carousel-img" :alt="skill.title" />
				</div>

				<div class="carousel-decoration bottom">
					<svg viewBox="0 0 100 60" aria-hidden="true">
						<path d="M5 5 L50 55 L95 5 L50 20 Z" />
					</svg>
				</div>

			</div>

		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue'

import data from '../../../assets/json/professional.json'

import WordIcon from '@/assets/images/icon/Word.png'
import ExcelIcon from '@/assets/images/icon/Excel.png'
import PowerPointIcon from '@/assets/images/icon/PowerPoint.png'
import IllustratorIcon from '@/assets/images/icon/Illustrator.png'
import HtmlIcon from '@/assets/images/icon/HTML.png'
import JavaIcon from '@/assets/images/icon/Java.png'
import Vue2Icon from '@/assets/images/icon/Vue2.png'
import NodeJSIcon from '@/assets/images/icon/NodeJS.png'
import CloudIcon from '@/assets/images/icon/Cloud.png'

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

const emit = defineEmits([
	'update:currentIndex',
	'update:hoverIndex',
	'select'
])

const iconMap = {
	'HTML.png': HtmlIcon,
	'Vue2.png': Vue2Icon,
	'Node.png': NodeJSIcon,
	'Java.png': JavaIcon,
	'Cloud.png': CloudIcon,
	'Word.png': WordIcon,
	'Excel.png': ExcelIcon,
	'PowerPoint.png': PowerPointIcon,
	'Illustrator.png': IllustratorIcon
}

const skills = computed(() => {
	return data.skills.map(skill => ({
		...skill,
		icon: iconMap[skill.icon]
	}))
})

const isScrolling = ref(false)

const activeIndex = computed(() => {
	return props.hoverIndex !== null
		? props.hoverIndex
		: props.currentIndex
})

const VISIBLE_COUNT = 9
const middleIndex = Math.floor(VISIBLE_COUNT / 2)

const displayedIcons = computed(() => {
	const result = []
	const total = skills.value.length
	const center = activeIndex.value

	for (
		let offset = -middleIndex;
		offset <= middleIndex;
		offset++
	) {
		const index =
			(center + offset + total) % total

		result.push(skills.value[index])
	}

	return result
})

function setHoverIndex(index) {
	emit('update:hoverIndex', index)
}

function clearHoverIndex() {
	emit('update:hoverIndex', null)
}

function selectIcon(index) {
	emit('update:currentIndex', index)
	emit('select', index)
}

function handleWheel(event) {
	if (isScrolling.value) return

	isScrolling.value = true

	let newIndex

	if (event.deltaY > 0) {
		newIndex =
			(props.currentIndex + 1) % skills.value.length
	} else {
		newIndex =
			(props.currentIndex - 1 + skills.value.length)
			% skills.value.length
	}

	emit('update:currentIndex', newIndex)
	emit('select', newIndex)

	setTimeout(() => {
		isScrolling.value = false
	}, 60)
}

function getCarouselStyle(index) {
	const distance = Math.abs(index - middleIndex)

	const opacityMap = [
		1.0,
		0.7,
		0.45,
		0.25,
		0.1
	]

	const scaleMap = [
		1.2,
		0.95,
		0.75,
		0.6,
		0.5
	]

	const offsetMap = [
		0,
		1.05,
		1.9,
		2.7,
		3.3
	]

	const direction = index - middleIndex

	return {
		'--carousel-distance': `${direction > 0 ? offsetMap[distance] : -offsetMap[distance]}`,
		'--carousel-scale': scaleMap[distance] ?? 0.5,
		opacity: opacityMap[distance] ?? 0.1
	}
}
</script>

<style scoped>
/* 輪盤容器 */
.carousel-container {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

/* 輪盤外框 */
.carousel-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

/* 輪盤本體 */
.carousel {
	position: relative;

	width: clamp(60px, 8.5vh, 180px);
	height: 100%;

	flex-shrink: 0;
}


/* 輪盤 Icon */
.carousel-item {
	position: absolute;

	left: 0;
	top: 45%;

	width: 100%;
	aspect-ratio: 1;

	display: flex;
	align-items: center;
	justify-content: center;

	transform:
		translateY(calc(var(--carousel-distance) * clamp(45px, 9vh, 135px))) scale(var(--carousel-scale));

	transform-origin: center;

	transition:
		opacity 0.3s ease,
		transform 0.3s ease;
}

/* Icon 圖片 */
.carousel-item img {
	width: 90%;
	height: 90%;
	object-fit: contain;
}

/* 中央選取 Icon */
.carousel-item.active {
	/* display: flex; 絕對不能移除，不然圖標會錯位 */
	display: flex;
	filter:
		drop-shadow(0 0 8px rgba(250, 171, 0, 0.85));
}

/* 上下裝飾箭頭 */
.carousel-decoration {
	position: absolute;

	left: 50%;
	top: 50%;

	z-index: 20;

	width: clamp(24px, 4vh, 45px);
	height: auto;

	opacity: 0.65;

	pointer-events: none;

	filter:
		drop-shadow(0 0 3px rgba(250, 171, 0, 0.8)) drop-shadow(0 0 8px rgba(85, 65, 21, 0.45));
}

/* SVG */
.carousel-decoration svg {
	display: block;

	width: 100%;
	height: auto;

	overflow: visible;
}

.carousel-decoration path {
	fill: none;

	stroke: #756033;

	stroke-width: 5;

	stroke-linecap: round;
	stroke-linejoin: round;
}

/* 上方裝飾 */
.carousel-decoration.top {
	margin-top:
		calc(clamp(45px, 8vh, 135px) * 4.35);

	animation:
		arrowFloatUp 2s ease-in-out infinite;
}

/* 下方裝飾 */
.carousel-decoration.bottom {
	margin-top:
		calc(clamp(45px, 8vh, 135px) * -4.35);

	animation:
		arrowFloatDown 2s ease-in-out infinite;
}


/* 上方箭頭動畫 */
@keyframes arrowFloatUp {

	0%,
	100% {
		transform:
			translate(-50%, -50%) scaleX(1.8) scaleY(1);
	}

	50% {
		transform:
			translate(-50%, calc(-50% - 0.6vh)) scaleX(1.6) scaleY(0.85);
	}
}


/* 下方箭頭動畫 */
@keyframes arrowFloatDown {

	0%,
	100% {
		transform:
			translate(-50%, -50%) scaleX(1.8) scaleY(1) rotate(180deg);
	}

	50% {
		transform:
			translate(-50%, calc(-50% + 0.6vh)) scaleX(1.6) scaleY(0.85) rotate(180deg);
	}
}
</style>