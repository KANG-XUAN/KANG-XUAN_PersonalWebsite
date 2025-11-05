<template>
	<div class="icon-grid-container">
		<div v-for="(icon, i) in icons" :key="i" class="icon-item" :class="{ active: i === currentIndex }"
			@click="currentIndex = i">
			<img :src="icon" alt="skill icon" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

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
</script>

<style scoped>
/* 整個區塊固定在畫面右上角 */
.icon-grid-container {
	position: fixed;
	top: 60px;
	right: 0;

	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	background: rgba(255, 255, 255, 0.85);
	padding: 12px;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	z-index: 1000;
	width: 95%;
	/* 限制寬度以免太長 */
}

.icon-item {
	width: 80px;
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	opacity: 0.6;
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
