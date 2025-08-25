<template>
	<div class="row g-4">
		<div
			v-for="project in projects"
			:key="project.title"
			class="col-md-6 col-lg-4"
		>
			<!-- 卡片容器 -->
			<div class="card-flip" @click="openModal(project)">
				<div
					class="card-stack"
					@mouseenter="hoveredProject = project.title"
					@mouseleave="hoveredProject = null"
				>
					<!-- 圖片層 -->
					<div class="card card-image" :class="{ 'hide-card': hoveredProject === project.title }">
						<img :src="project.image" class="card-img-top" :alt="project.title" />
					</div>

					<!-- 資訊層 -->
					<div class="card card-info" :class="{ 'show-card': hoveredProject === project.title }">
						<div class="d-flex flex-column justify-content-center align-items-center p-3 h-100">
							<h5>{{ project.title }}</h5>
							<p class="text-center small">{{ project.description }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 浮窗 -->
		<div v-if="selectedProject" class="modal-overlay" @click.self="closeModal">
			<div class="modal-content">
				<h3>{{ selectedProject.title }}</h3>
				<img :src="selectedProject.image" class="img-fluid mb-3" :alt="selectedProject.title" />
				<p>{{ selectedProject.description }}</p>
				<div class="mb-2">
					<span
						class="badge bg-secondary me-1"
						v-for="tech in selectedProject.tech"
						:key="tech"
					>
						{{ tech }}
					</span>
				</div>
				<div class="d-flex justify-content-between mt-3">
					<a :href="selectedProject.github" target="_blank" class="btn btn-outline-dark btn-sm">GitHub</a>
					<a v-if="selectedProject.demo" :href="selectedProject.demo" target="_blank" class="btn btn-outline-primary btn-sm">Demo</a>
				</div>
				<button class="btn-close position-absolute top-0 end-0 m-3" @click="closeModal"></button>
			</div>
		</div>
	</div>
</template>


<script setup>
import { ref } from 'vue'

import demoImage from '@/assets/images/background.jpg'

const projects = [
	{
		title: '棲遲書屋',
		description: '使用 Vue 2 + Node.js + MySQL 打造的線上書店。',
		tech: ['Vue 2', 'Node.js', 'MySQL'],
		image: demoImage,
		github: 'https://github.com/retreatbookroom/retreatbookroom',
		demo: 'https://retreatbookroom.vercel.app',
	},
	{
		title: '鬼鍵識',
		description: '使用 Vue 3 + Node.js 。',
		tech: ['Vue 3', 'Node.js', 'Pinia'],
		image: demoImage,
		github: 'https://github.com/KANG-XUAN/GhostKeys',
		demo: 'https://kang-xuan.github.io/GhostKeys',
	},
	{
		title: 'API 資料視覺化平台',
		description: '串接外部 API，並使用 Chart.js 呈現圖表。',
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
	background-color: #f8f9fa;
	padding: 1rem;
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

/* Modal 樣式 */
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}
.modal-content {
	background: #fff;
	padding: 2rem;
	border-radius: 8px;
	width: 80%;
	max-height: 90vh;
	overflow-y: auto;
	position: relative;
}

</style>
