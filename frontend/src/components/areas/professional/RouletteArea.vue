<template>
	<!-- 輪盤 Carousel：左側，100% 高 -->
	<div class="carousel-container">
		<div class="carousel-wrapper">
			<div class="carousel">
				<div v-for="(icon, i) in displayedIcons" :key="i" class="carousel-item"
					:class="{ active: i === middleIndex }">
					<img :src="icon" class="carousel-img" alt="skill icon" />
				</div>
			</div>
		</div>
	</div>

	<!-- 橫列 Icon Grid：右上 -->
	<div class="icon-grid-container">
		<div v-for="(icon, i) in icons" :key="i" class="icon-item" :class="{ active: i === currentIndex }"
			@click="selectIcon(i)" @mouseover="hoverIndex = i" @mouseleave="hoverIndex = null">
			<img :src="icon" alt="skill icon" />
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

import WordIcon from '@/assets/images/icon/Word.png'
import ExcelIcon from '@/assets/images/icon/Excel.png'
import PowerPointIcon from '@/assets/images/icon/PowerPoint.png'
import IllustratorIcon from '@/assets/images/icon/Illustrator.png'
import HtmlIcon from '@/assets/images/icon/HTML.png'
import JavaIcon from '@/assets/images/icon/Java.png'
import Vue2Icon from '@/assets/images/icon/Vue2.png'
import NodeJSIcon from '@/assets/images/icon/NodeJS.png'
import CloudIcon from '@/assets/images/icon/Cloud.png'

const icons = [
	HtmlIcon,
	Vue2Icon,
	NodeJSIcon,
	JavaIcon,
	CloudIcon,
	WordIcon,
	ExcelIcon,
	PowerPointIcon,
	IllustratorIcon,
]

const currentIndex = ref(0)
const hoverIndex = ref(null)

const activeIndex = computed(() => {
	return hoverIndex.value !== null ? hoverIndex.value : currentIndex.value
})

const VISIBLE_COUNT = 9 // or 7
const middleIndex = Math.floor(VISIBLE_COUNT / 2)

const displayedIcons = computed(() => {
	const result = []
	const total = icons.length
	const center = activeIndex.value

	for (let offset = -middleIndex; offset <= middleIndex; offset++) {
		const index = (center + offset + total) % total
		result.push(icons[index])
	}
	return result
})

function selectIcon(index) {
	currentIndex.value = index
}
</script>


<style scoped>
/* ✅ 左側輪盤 */
.carousel-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 90px;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	/* background: rgba(255, 255, 255, 0.95); */
	box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
	z-index: 0;
}

.carousel-wrapper {
	width: 100px;
	height: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}

.carousel {
	display: flex;
	flex-direction: column;
	align-items: right;
	justify-content: center;
	gap: 0;
}

.carousel-item {
	width: 70px;
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.3;
	transition: opacity 0.3s, transform 0.3s;
}

.carousel-item.active {
	display: flex;
	justify-content: center;
	opacity: 1;
	transform: scale(1.2);
}

.carousel-item img {
	width: 50px;
	height: 50px;
	object-fit: contain;
}


/* ✅ 右上 ICON GRID：無 gap，靠 item 撐開空間，避免 hover bug */
.icon-grid-container {
	position: fixed;
	top: 55px;
	right: 0;
	display: flex;
	flex-wrap: wrap;
	/* background: rgba(255, 255, 255, 0.95); */
	padding: 16px;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	z-index: 1000;
	width: calc(100% - 90px);
}

.icon-item {
	width: 80px;
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	/* opacity: 0.6; */
	transition: opacity 0.2s, transform 0.2s;
	border-radius: 8px;
}

.icon-item:hover {
	opacity: 0.9;
	transform: scale(1.05);
}

.icon-item.active {
	opacity: 1;
	box-shadow: 0 0 0 2px #409eff;
	background: #f0f7ff;
}

.icon-item img {
	width: 60px;
	height: 60px;
	object-fit: contain;
}
</style>
