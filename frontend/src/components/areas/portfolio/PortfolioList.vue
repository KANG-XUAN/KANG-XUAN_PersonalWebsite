<template>
	<div class="card mb-5 mt-5">
		<a href="https://github.com/KANG-XUAN?tab=repositories" target="_blank">
			<img src="@/assets/images/github_home.png" class="card-img-top w-100" alt="GitHub 圖片" />
		</a>
	</div>


	<div class="row g-4">
		<div v-for="project in projects" :key="project.title" class="col-sm-12 col-md-6">
			<!-- 卡片容器 -->
			<div class="card-flip" @click="openModal(project)">
				<div class="card-stack" @mouseenter="hoveredProject = project.title"
					@mouseleave="hoveredProject = null">
					<!-- 圖片層 -->
					<div class="card card-image" :class="{ 'hide-card': hoveredProject === project.title }">
						<img :src="project.image" class="card-img-top" :alt="project.title" />
					</div>

					<!-- 資訊層（背景使用圖片） -->
					<div class="card card-info" :class="{ 'show-card': hoveredProject === project.title }"
						:style="{ backgroundImage: `url(${project.image})` }">
						<div class="overlay">
							<h5>{{ project.title }}</h5>
							<p class="text-center small">{{ project.summary }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 浮窗 -->
		<div v-if="selectedProject" class="modal-overlay" @click.self="closeModal">
			<div class="modal-content" :style="{ backgroundImage: `url(${selectedProject.image})` }">
				<div class="modal-overlay-bg">
					<div class="mt-3">
						<h1 class="mb-4">
							{{ selectedProject.title }}
							<a :href="selectedProject.github" target="_blank"
								class="btn btn-outline-dark btn-sm me-4">GitHub</a>
							<a v-if="selectedProject.demo" :href="selectedProject.demo" target="_blank"
								class="btn btn-outline-primary btn-sm">Demo</a>
						</h1>

					</div>

					<p>{{ selectedProject.summary }}</p>
					<p>{{ selectedProject.description }}</p>
					<div class="mb-2">
						<span class="badge bg-secondary me-1" v-for="tech in selectedProject.tech" :key="tech">
							{{ tech }}
						</span>
					</div>

					<button class="btn-close position-absolute top-0 end-0 m-3" @click="closeModal"></button>
				</div>
			</div>
		</div>
	</div>
</template>


<script setup>
import { ref } from 'vue'

import demoImage from '@/assets/images/background.jpg'
import retreatbookroomImage from '@/assets/images/area/portfolio/retreatbookroom1.webp'
import ghostKeysImage from '@/assets/images/area/portfolio/ghostKeys.webp'

const projects = [
	{
		title: '棲遲書屋',
		summary: '使用 Vue 2 + Node.js + MySQL 打造的線上書店。',
		description: '使用 Vue 2 + Node.js + MySQL 打造的線上書店。',
		tech: ['Vue 2', 'Node.js', 'MySQL'],
		image: retreatbookroomImage,
		github: 'https://github.com/retreatbookroom/retreatbookroom',
		demo: 'https://retreatbookroom.vercel.app',
	},
	{
		title: '鬼鍵識',
		summary: '使用 Vue 3 + Node.js 。',
		description: '使用 Vue 3 + Node.js 。',
		tech: ['Vue 3', 'Node.js', 'Pinia'],
		image: ghostKeysImage,
		github: 'https://github.com/KANG-XUAN/GhostKeys',
		demo: 'https://kang-xuan.github.io/GhostKeys',
	},
	{
		title: 'API 資料視覺化平台(版面測試)',
		summary: '串接外部 API，並使用 Chart.js 呈現圖表。',
		description: '串接外部 API，並使用 Chart.js 呈現圖表。',
		tech: ['Vue', 'Chart.js', 'REST API'],
		image: demoImage,
		github: 'https://github.com/yourname/project-2',
		demo: '',
	},
	{
		title: '標題',
		summary: '簡述',
		description: '點開詳細資訊',
		tech: ['Vue', 'Chart.js', 'REST API'],
		image: demoImage,
		github: 'https://github.com/yourname/project-2',
		demo: '',
	},
]

const hoveredProject = ref(null)
const selectedProject = ref(null)

const openModal = (project) => {
	selectedProject.value = project
}
const closeModal = () => {
	selectedProject.value = null
}
</script>


<style scoped>
.card-flip {
	cursor: pointer;
	position: relative;
	height: 250px;
}

.card-stack {
	position: relative;
	width: 100%;
	height: 100%;
}

.card-image,
.card-info {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: opacity 0.4s ease, transform 0.4s ease;
	border-radius: 0.5rem;
	overflow: hidden;
	z-index: 1;
}

/* 預設狀態 */
.card-image {
	opacity: 1;
	transform: translateY(0);
	z-index: 2;
}

.card-info {
	opacity: 0;
	transform: translateY(20px);
	background-size: cover;
	background-position: center;
	z-index: 1;
}

/* Hover 切換動畫 */
.card-image.hide-card {
	opacity: 0;
	transform: translateY(-20px);
}

.card-info.show-card {
	opacity: 1;
	transform: translateY(0);
	z-index: 3;
}

/* 確保圖片填滿 */
.card-img-top {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 0.5rem;
}

/* 資訊卡內的遮罩與文字 */
.card-info .overlay {
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	padding: 1rem;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	border-radius: 0.5rem;
}

/* 浮窗 */
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	margin-top: 0;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.modal-content {
	background-size: cover;
	background-position: center;
	position: relative;
	border-radius: 8px;
	width: 80%;
	height: 80vh;
	max-height: 90vh;
	overflow-y: auto;
}

/* 浮窗內的遮罩與文字區塊 */
.modal-overlay-bg {
	background: rgba(255, 255, 255, 0.9);
	width: 100%;
	height: 100%;
	padding: 2rem;
	border-radius: 8px;
	position: relative;
	z-index: 2;
}
</style>
