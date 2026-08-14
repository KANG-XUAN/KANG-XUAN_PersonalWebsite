<template>

	<div class="portfolio">

		<!-- Header -->
		<header class="portfolio-header">

			<div class="header-label">
				<span>PROJECT ARCHIVE</span>
				<span>2025 — 2026</span>
			</div>

			<div class="header-main">

				<div>
					<h1>作品集</h1>

					<p>
						記錄開發過程、技術實驗與完成的作品。
					</p>
				</div>

				<div class="project-count">

					<strong>
						{{ filteredProjects.length }}
					</strong>

					<span>PROJECTS</span>

				</div>

			</div>

		</header>

		<!-- Toolbar -->
		<section class="portfolio-toolbar">

			<div class="filters">

				<button :class="{ active: selectedTag === '全部' }" @click="selectedTag = '全部'">
					全部
				</button>

				<button v-for="tag in tags" :key="tag" :class="{ active: selectedTag === tag }"
					@click="selectedTag = tag">
					{{ tag }}
				</button>

			</div>

			<div class="view-switch">

				<button :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'">
					▦
				</button>

				<button :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'">
					☷
				</button>

			</div>

		</section>

		<!-- Card View -->
		<section v-if="viewMode === 'grid'" class="project-grid">

			<article v-for="project in filteredProjects" :key="project.title" class="project-card"
				@click="openModal(project)">

				<!-- 圖片 -->
				<div class="project-image">

					<img :src="project.image" :alt="project.title" />

					<!-- Hover -->
					<div class="project-overlay">

						<span>
							VIEW PROJECT →
						</span>

					</div>

				</div>


				<!-- 資訊 -->
				<div class="project-info">

					<!-- 年份 / 狀態 -->
					<div class="project-top">

						<span class="project-year">
							{{ project.year }}
						</span>

						<span class="project-status">
							{{ project.status }}
						</span>

					</div>


					<!-- 標題 -->
					<h2>
						{{ project.title }}
					</h2>


					<!-- 簡介 -->
					<p>
						{{ project.summary }}
					</p>


					<!-- 技術 -->
					<div class="tech-list">

						<span v-for="tech in project.tech" :key="tech">
							{{ tech }}
						</span>

					</div>

				</div>

			</article>

		</section>

		<!-- List -->
		<section v-else class="project-list">

			<article v-for="(project, index) in filteredProjects" :key="project.title" class="project-list-item"
				@click="openModal(project)">

				<div class="list-number">

					{{ String(index + 1).padStart(2, '0') }}

				</div>

				<div class="list-title">

					<h2>
						{{ project.title }}
					</h2>

					<p>
						{{ project.summary }}
					</p>

				</div>

				<div class="list-tags">

					<span v-for="tag in project.tags" :key="tag">
						{{ tag }}
					</span>

				</div>

				<div class="list-year">

					{{ project.year }}

				</div>

				<div class="list-arrow">

					→

				</div>

			</article>

		</section>

		<!-- Modal -->
		<div v-if="selectedProject" class="project-modal" @click.self="closeModal">

			<div class="modal-inner">

				<button class="modal-close" @click="closeModal">
					×
				</button>

				<div class="modal-header">

					<span>
						PROJECT {{ selectedProject.year }}
					</span>

					<span>
						{{ selectedProject.status }}
					</span>

				</div>

				<h2>
					{{ selectedProject.title }}
				</h2>

				<p class="modal-description">
					{{ selectedProject.description }}
				</p>

				<div class="modal-columns">

					<div>

						<span class="section-label">
							ROLE
						</span>

						<p>
							{{ selectedProject.role }}
						</p>

					</div>

					<div>

						<span class="section-label">
							TECHNOLOGY
						</span>

						<div class="tech-list">

							<span v-for="tech in selectedProject.tech" :key="tech">
								{{ tech }}
							</span>

						</div>

					</div>

					<div>

						<span class="section-label">
							HIGHLIGHTS
						</span>

						<ul>

							<li v-for="item in selectedProject.highlights" :key="item">
								{{ item }}
							</li>

						</ul>

					</div>

				</div>

				<div class="modal-links">

					<a v-if="selectedProject.github" :href="selectedProject.github" target="_blank">
						GitHub ↗
					</a>

					<a v-if="selectedProject.demo" :href="selectedProject.demo" target="_blank">
						Live Demo ↗
					</a>

				</div>

			</div>

		</div>

	</div>

</template>

<script setup>

import {
	computed,
	ref
} from 'vue'

import data
	from '@/assets/json/portfolio.json'

import demoImage
	from '@/assets/images/background.jpg'

import retreatbookroomImage
	from '@/assets/images/area/portfolio/retreatbookroom1.webp'

import ghostKeysImage
	from '@/assets/images/area/portfolio/ghostKeys.webp'

const imageMap = {

	demo: demoImage,

	retreatbookroom:
		retreatbookroomImage,

	ghostKeys:
		ghostKeysImage

}

const projects = computed(() => {

	return data.projects.map(project => ({

		...project,

		image:
			imageMap[project.image]

	}))

})

const selectedTag = ref('全部')

const viewMode = ref('grid')

const selectedProject = ref(null)

const tags = computed(() => {

	const allTags = projects.value.flatMap(
		project => project.tags
	)

	return [
		...new Set(allTags)
	]

})

const filteredProjects = computed(() => {

	if (selectedTag.value === '全部') {

		return projects.value

	}

	return projects.value.filter(
		project =>
			project.tags.includes(
				selectedTag.value
			)
	)

})

const openModal = project => {

	selectedProject.value =
		project

}

const closeModal = () => {

	selectedProject.value =
		null

}

</script>

<style scoped>
.portfolio {
	--ink: #29251f;
	--muted: #81786b;
	--line: rgba(41, 37, 31, 0.2);
	--paper: #fdf6e3;
	--card: #29251f;
	--card-muted: #9c9386;
	--accent: #c49a45;
	width: 100%;
	min-height: 100%;
	box-sizing: border-box;
	padding: clamp(30px, 5vw, 80px);
	color: var(--ink);
}

.portfolio-header {
	border-bottom: 1px solid var(--line);
	padding-bottom: 35px;
}

.header-label {
	display: flex;
	justify-content: space-between;
	font-size: 11px;
	letter-spacing: 0.2em;
	color: var(--muted);
	margin-bottom: 30px;
}

.header-main {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 30px;
}

.header-main h1 {
	margin: 0;
	font-size: clamp(45px, 7vw, 90px);
	font-weight: 500;
	letter-spacing: -0.04em;
}

.header-main p {
	margin: 12px 0 0;
	color: var(--muted);
	line-height: 1.6;
}

.project-count {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	flex-shrink: 0;
}

.project-count strong {
	font-size: 42px;
	font-weight: 400;
	line-height: 1;
}

.project-count span {
	margin-top: 6px;
	font-size: 10px;
	letter-spacing: 0.2em;
	color: var(--muted);
}

.portfolio-toolbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
	padding: 20px 0;
	border-bottom: 1px solid var(--line);
}

.filters {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.filters button {
	padding: 7px 14px;
	border: 1px solid var(--line);
	background: transparent;
	color: var(--ink);
	cursor: pointer;
	font-size: 13px;
	transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}

.filters button:hover {
	background: rgba(41, 37, 31, 0.08);
}

.filters button.active {
	background: var(--ink);
	color: var(--paper);
	border-color: var(--ink);
}

.view-switch {
	display: flex;
	flex-shrink: 0;
	border: 1px solid var(--line);
}

.view-switch button {
	width: 38px;
	height: 32px;
	padding: 0;
	border: 0;
	background: transparent;
	color: var(--muted);
	cursor: pointer;
	font-size: 16px;
	transition: background 0.25s ease, color 0.25s ease;
}

.view-switch button:hover {
	background: rgba(41, 37, 31, 0.08);
}

.view-switch button.active {
	background: var(--ink);
	color: var(--paper);
}

.project-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 30px;
	padding-top: 30px;
}

.project-card {
	cursor: pointer;
	background: var(--card);
	border: 1px solid rgba(41, 37, 31, 0.15);
	overflow: hidden;
	transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.project-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 12px 30px rgba(41, 37, 31, 0.18);
	border-color: rgba(196, 154, 69, 0.5);
}

.project-image {
	position: relative;
	aspect-ratio: 16 / 9;
	overflow: hidden;
	background: #ddd;
}

.project-image img {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
	transform: scale(1.05);
}

.project-overlay {
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(41, 37, 31, 0.7);
	color: #fff;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
	opacity: 1;
}

.project-overlay span {
	font-size: 12px;
	letter-spacing: 0.15em;
}

.project-info {
	padding: 22px;
	color: #fdf6e3;
}

.project-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 15px;
	font-size: 11px;
	color: var(--card-muted);
}

.project-status {
	color: var(--accent);
}

.project-info h2 {
	margin: 12px 0 8px;
	font-size: 26px;
	font-weight: 400;
	line-height: 1.3;
	letter-spacing: 0.02em;
}

.project-info p {
	margin: 0;
	color: var(--card-muted);
	font-size: 13px;
	line-height: 1.7;
}

.tech-list {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-top: 18px;
}

.tech-list span {
	padding: 4px 8px;
	border: 1px solid rgba(253, 246, 227, 0.15);
	color: #c5bdb1;
	font-size: 11px;
	line-height: 1.4;
}

.project-list {
	width: 100%;
	padding-top: 20px;
}

.project-list-item {
	display: grid;
	grid-template-columns: 60px minmax(180px, 1fr) 250px 90px 40px;
	align-items: center;
	gap: 20px;
	min-height: 110px;
	border-bottom: 1px solid var(--line);
	cursor: pointer;
	transition: background 0.25s ease, color 0.25s ease;
}

.project-list-item:hover {
	background: rgba(41, 37, 31, 0.05);
}

.list-number {
	color: var(--muted);
	font-size: 12px;
}

.list-title h2 {
	margin: 0 0 5px;
	font-size: 24px;
	font-weight: 500;
	line-height: 1.3;
}

.list-title p {
	margin: 0;
	color: var(--muted);
	font-size: 13px;
	line-height: 1.5;
}

.list-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
}

.list-tags span {
	padding: 4px 7px;
	border: 1px solid var(--line);
	font-size: 10px;
}

.list-year {
	color: var(--muted);
	font-size: 12px;
	text-align: right;
}

.list-arrow {
	color: var(--ink);
	font-size: 22px;
	transition: transform 0.25s ease, color 0.25s ease;
}

.project-list-item:hover .list-arrow {
	color: var(--accent);
	transform: translateX(5px);
}

.project-modal {
	position: fixed;
	inset: 0;
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 30px;
	box-sizing: border-box;
	background: rgba(41, 37, 31, 0.65);
	backdrop-filter: blur(3px);
}

.modal-inner {
	position: relative;
	width: min(900px, 100%);
	max-height: 90vh;
	overflow-y: auto;
	box-sizing: border-box;
	padding: clamp(30px, 5vw, 70px);
	background: var(--paper);
	background-image: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.02) 1px, transparent 1px, transparent 24px);
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}

.modal-close {
	position: absolute;
	top: 20px;
	right: 20px;
	width: 35px;
	height: 35px;
	padding: 0;
	border: 0;
	background: transparent;
	color: var(--ink);
	font-size: 30px;
	line-height: 1;
	cursor: pointer;
	transition: transform 0.2s ease, color 0.2s ease;
}

.modal-close:hover {
	color: var(--accent);
	transform: rotate(90deg);
}

.modal-header {
	display: flex;
	justify-content: space-between;
	gap: 20px;
	padding-bottom: 15px;
	border-bottom: 1px solid var(--line);
	color: var(--muted);
	font-size: 11px;
	letter-spacing: 0.15em;
}

.modal-inner h2 {
	margin: 35px 0 20px;
	font-size: clamp(40px, 6vw, 72px);
	font-weight: 500;
	line-height: 1.1;
	letter-spacing: -0.03em;
}

.modal-description {
	max-width: 700px;
	margin: 0;
	color: var(--muted);
	font-size: 15px;
	line-height: 1.8;
}

.modal-columns {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 30px;
	margin-top: 50px;
	padding-top: 25px;
	border-top: 1px solid var(--line);
}

.section-label {
	display: block;
	margin-bottom: 12px;
	color: var(--muted);
	font-size: 10px;
	letter-spacing: 0.15em;
}

.modal-columns p {
	margin: 0;
	line-height: 1.7;
}

.modal-columns .tech-list {
	margin-top: 0;
}

.modal-columns ul {
	margin: 0;
	padding-left: 18px;
	line-height: 1.8;
}

.modal-links {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin-top: 45px;
}

.modal-links a {
	display: inline-block;
	padding: 10px 18px;
	border: 1px solid var(--ink);
	color: var(--ink);
	text-decoration: none;
	font-size: 12px;
	transition: background 0.25s ease, color 0.25s ease;
}

.modal-links a:hover {
	background: var(--ink);
	color: var(--paper);
}

.modal-inner::-webkit-scrollbar {
	width: 6px;
}

.modal-inner::-webkit-scrollbar-track {
	background: transparent;
}

.modal-inner::-webkit-scrollbar-thumb {
	background: rgba(41, 37, 31, 0.25);
}

@media (max-width: 900px) {
	.project-list-item {
		grid-template-columns: 45px 1fr 70px 30px;
	}

	.list-tags {
		display: none;
	}
}

@media (max-width: 768px) {
	.portfolio {
		padding: 30px 20px;
	}

	.header-main {
		align-items: flex-start;
		flex-direction: column;
		gap: 25px;
	}

	.project-count {
		align-items: flex-start;
	}

	.portfolio-toolbar {
		align-items: flex-start;
		flex-direction: column;
	}

	.view-switch {
		align-self: flex-end;
	}

	.project-grid {
		grid-template-columns: 1fr;
		gap: 25px;
	}

	.project-list-item {
		grid-template-columns: 35px 1fr 30px;
		gap: 10px;
		min-height: 90px;
	}

	.list-title h2 {
		font-size: 20px;
	}

	.list-title p {
		font-size: 12px;
	}

	.list-tags,
	.list-year {
		display: none;
	}

	.project-modal {
		padding: 15px;
	}

	.modal-inner {
		max-height: 92vh;
		padding: 30px 25px;
	}

	.modal-header {
		padding-right: 30px;
	}

	.modal-inner h2 {
		margin-top: 30px;
		font-size: 42px;
	}

	.modal-columns {
		grid-template-columns: 1fr;
		gap: 25px;
		margin-top: 35px;
	}

	.modal-links {
		margin-top: 35px;
	}
}

@media (max-width: 480px) {
	.header-label {
		font-size: 9px;
	}

	.header-main h1 {
		font-size: 48px;
	}

	.project-info {
		padding: 18px;
	}

	.project-info h2 {
		font-size: 23px;
	}

	.project-top {
		font-size: 10px;
	}

	.modal-inner h2 {
		font-size: 36px;
	}
}
</style>