<template>
	<div class="carousel-container">
		<div class="carousel-wrapper">
			<div class="carousel">
				<div v-for="(icon, i) in displayedIcons" :key="i" class="carousel-item" :class="{ active: i === 1 }"
					@click="selectIcon(i)">
					<img :src="icon" alt="skill icon" />
				</div>
			</div>
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
	WordIcon, ExcelIcon, PowerPointIcon, IllustratorIcon,
	HtmlIcon, JavaIcon, Vue2Icon, NodeJSIcon, CloudIcon
]

const currentIndex = ref(0)

// 顯示圖標：前一個 + 當前 + 剩下的
const displayedIcons = computed(() => {
	const prevIndex = (currentIndex.value - 1 + icons.length) % icons.length
	const nextIcons = []
	for (let i = 1; i < icons.length; i++) {
		nextIcons.push(icons[(currentIndex.value + i) % icons.length])
	}
	return [icons[prevIndex], icons[currentIndex.value], ...nextIcons]
})

function selectIcon(i) {
	if (i === 0) {
		// 點前一個
		currentIndex.value = (currentIndex.value - 1 + icons.length) % icons.length
	} else {
		// 點中間或下方剩下的
		currentIndex.value = (currentIndex.value + i - 1) % icons.length
	}
}
</script>

<style scoped>
.carousel-container {
	width: 120px;
	height: 100%;
	display: flex;
	align-items: center;
}

.carousel-wrapper {
	width: 100px;
	height: 100%;
	overflow: hidden;
	border: 1px solid #ccc;
}

.carousel {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	/* 改掉會靠右 */
}


.carousel-item {
	width: 100px;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.4;
	cursor: pointer;
	transition: opacity 0.25s;
}

.carousel-item.active {
	/* 勿刪，flex相關的不能省略，不然會偏移 */
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 1;
}

.carousel-item img {
	width: 80px;
	height: 80px;
	object-fit: contain;
}
</style>
