<template>

	<section class="portfolio">

		<!-- Header -->
		<header class="portfolio-header">

			<div>

				<div class="eyebrow">
					PROJECT ARCHIVE
				</div>

				<h1>
					PORTFOLIO
				</h1>

				<p>
					Selected works, experiments and things I've built.
				</p>

			</div>

			<div class="project-stats">

				<div class="stat">
					<span class="stat-value">
						{{ filteredProjects.length }}
					</span>

					<span class="stat-label">
						PROJECTS
					</span>
				</div>

				<div class="stat">
					<span class="stat-value">
						{{ projects.length }}
					</span>

					<span class="stat-label">
						TOTAL
					</span>
				</div>

			</div>

		</header>


		<!-- Filter -->
		<div class="portfolio-toolbar">

			<div class="filter">

				<button v-for="tag in tags" :key="tag" class="filter-item" :class="{ active: activeTag === tag }"
					@click="activeTag = tag">

					{{ tag }}

				</button>

			</div>


			<!-- View Mode -->
			<div class="view-switch">

				<button :class="{ active: viewMode === 'card' }" @click="viewMode = 'card'" title="Card View">
					▦
				</button>

				<button :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'" title="List View">
					☷
				</button>

			</div>

		</div>


		<!-- Divider -->
		<div class="divider"></div>


		<!-- Card View -->
		<div v-if="viewMode === 'card'" class="project-grid">

			<article v-for="project in filteredProjects" :key="project.title" class="project-card"
				@click="openModal(project)">

				<div class="project-image">

					<img :src="project.image" :alt="project.title" />

					<div class="project-overlay">

						<span>
							VIEW PROJECT →
						</span>

					</div>

				</div>


				<div class="project-info">

					<div class="project-top">

						<span class="project-year">
							{{ project.year }}
						</span>

						<span class="project-status">
							{{ project.status }}
						</span>

					</div>


					<h2>
						{{ project.title }}
					</h2>


					<p>
						{{ project.summary }}
					</p>


					<div class="tech-list">

						<span v-for="tech in project.tech" :key="tech">
							{{ tech }}
						</span>

					</div>

				</div>

			</article>

		</div>


		<!-- List View -->
		<div v-else class="project-list">

			<article v-for="(project, index) in filteredProjects" :key="project.title" class="project-list-item"
				@mouseenter="hoveredProject = project" @mouseleave="hoveredProject = null" @click="openModal(project)">

				<div class="list-number">

					{{ String(index + 1).padStart(2, '0') }}

				</div>


				<div class="list-main">

					<h2>
						{{ project.title }}
					</h2>

					<div class="list-tech">

						<span v-for="tech in project.tech" :key="tech">
							{{ tech }}
						</span>

					</div>

				</div>


				<div class="list-description">

					{{ project.summary }}

				</div>


				<div class="list-year">

					{{ project.year }}

				</div>


				<div class="list-arrow">

					→

				</div>


				<!-- Hover Preview -->
				<Transition name="preview">

					<div v-if="hoveredProject === project" class="list-preview">

						<img :src="project.image" :alt="project.title" />

					</div>

				</Transition>

			</article>

		</div>


		<!-- Empty -->
		<div v-if="filteredProjects.length === 0" class="empty">

			NO PROJECT FOUND.

		</div>


		<!-- Modal -->
		<Transition name="modal">

			<div v-if="selectedProject" class="modal" @click.self="closeModal">

				<div class="modal-panel">

					<button class="modal-close" @click="closeModal">
						×
					</button>


					<div class="modal-image">

						<img :src="selectedProject.image" :alt="selectedProject.title" />

					</div>


					<div class="modal-content">

						<div class="modal-meta">

							<span>
								{{ selectedProject.year }}
							</span>

							<span>
								{{ selectedProject.status }}
							</span>

						</div>


						<h2>
							{{ selectedProject.title }}
						</h2>


						<div class="modal-tags">

							<span v-for="tag in selectedProject.tags" :key="tag">
								{{ tag }}
							</span>

						</div>


						<p class="modal-summary">
							{{ selectedProject.summary }}
						</p>


						<p class="modal-description">
							{{ selectedProject.description }}
						</p>


						<div class="modal-tech">

							<span v-for="tech in selectedProject.tech" :key="tech">
								{{ tech }}
							</span>

						</div>


						<div class="modal-links">

							<a v-if="selectedProject.github" :href="selectedProject.github" target="_blank">
								GITHUB →
							</a>

							<a v-if="selectedProject.demo" :href="selectedProject.demo" target="_blank">
								LIVE DEMO →
							</a>

						</div>

					</div>

				</div>

			</div>

		</Transition>

	</section>

</template>


<script setup>

import {
	ref,
	computed
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


const tags = computed(() => {

	const allTags = projects.value.flatMap(
		project => project.tags
	)

	return [
		'ALL',
		...new Set(allTags)
	]

})


const activeTag = ref('ALL')

const viewMode = ref('card')

const hoveredProject = ref(null)

const selectedProject = ref(null)


const filteredProjects = computed(() => {

	if (activeTag.value === 'ALL') {

		return projects.value

	}

	return projects.value.filter(project =>
		project.tags.includes(activeTag.value)
	)

})


const openModal = (project) => {

	selectedProject.value = project

}


const closeModal = () => {

	selectedProject.value = null

}

</script>


<style scoped>
/* Portfolio */

.portfolio {

	width: 100%;

	color: #eee;

}


/* Header */

.portfolio-header {

	display: flex;

	justify-content: space-between;

	align-items: flex-end;

	gap: 40px;

	margin-bottom: 50px;

}


.eyebrow {

	margin-bottom: 12px;

	font-size: 12px;

	letter-spacing: 0.3em;

	color: #c49a45;

}


.portfolio-header h1 {

	margin: 0;

	font-size: clamp(40px, 6vh, 80px);

	font-weight: 500;

	letter-spacing: 0.08em;

}


.portfolio-header p {

	margin-top: 14px;

	color: #888;

}


/* Stats */

.project-stats {

	display: flex;

	gap: 40px;

}


.stat {

	display: flex;

	flex-direction: column;

	text-align: right;

}


.stat-value {

	font-size: 28px;

	color: #c49a45;

}


.stat-label {

	font-size: 10px;

	letter-spacing: 0.2em;

	color: #666;

}


/* Toolbar */

.portfolio-toolbar {

	display: flex;

	justify-content: space-between;

	align-items: center;

	gap: 20px;

}


.filter {

	display: flex;

	flex-wrap: wrap;

	gap: 8px;

}


.filter-item {

	padding: 8px 14px;

	border: 1px solid rgba(255, 255, 255, 0.12);

	background: transparent;

	color: #777;

	cursor: pointer;

	transition: 0.25s;

}


.filter-item:hover {

	color: #fff;

	border-color: rgba(196, 154, 69, 0.6);

}


.filter-item.active {

	color: #c49a45;

	border-color: #c49a45;

}


/* View Switch */

.view-switch {

	display: flex;

	gap: 4px;

}


.view-switch button {

	width: 36px;

	height: 36px;

	border: 1px solid rgba(255, 255, 255, 0.12);

	background: transparent;

	color: #666;

	cursor: pointer;

}


.view-switch button.active {

	color: #c49a45;

	border-color: #c49a45;

}


/* Divider */

.divider {

	width: 100%;

	height: 1px;

	margin: 20px 0 30px;

	background:
		rgba(255, 255, 255, 0.1);

}


/* Card */

.project-grid {

	display: grid;

	grid-template-columns:
		repeat(2, minmax(0, 1fr));

	gap: 30px;

}


.project-card {

	cursor: pointer;

	border: 1px solid rgba(255, 255, 255, 0.08);

	background: #111;

	transition:
		transform 0.3s ease,
		border-color 0.3s ease;

}


.project-card:hover {

	transform:
		translateY(-5px);

	border-color:
		rgba(196, 154, 69, 0.5);

}


.project-image {

	position: relative;

	aspect-ratio: 16 / 9;

	overflow: hidden;

}


.project-image img {

	width: 100%;

	height: 100%;

	object-fit: cover;

	transition:
		transform 0.5s ease;

}


.project-card:hover .project-image img {

	transform:
		scale(1.05);

}


.project-overlay {

	position: absolute;

	inset: 0;

	display: flex;

	align-items: center;

	justify-content: center;

	background:
		rgba(0, 0, 0, 0.55);

	color: #fff;

	opacity: 0;

	transition: 0.3s;

}


.project-card:hover .project-overlay {

	opacity: 1;

}


.project-info {

	padding: 22px;

}


.project-top {

	display: flex;

	justify-content: space-between;

	font-size: 11px;

	color: #666;

}


.project-status {

	color: #c49a45;

}


.project-info h2 {

	margin:
		12px 0 8px;

	font-size: 24px;

	font-weight: 400;

}


.project-info p {

	margin: 0;

	color: #777;

	line-height: 1.6;

}


.tech-list {

	display: flex;

	flex-wrap: wrap;

	gap: 8px;

	margin-top: 18px;

}


.tech-list span {

	font-size: 11px;

	color: #aaa;

}


/* List */

.project-list {

	width: 100%;

}


.project-list-item {

	position: relative;

	display: grid;

	grid-template-columns:
		60px 1.5fr 2fr 80px 30px;

	align-items: center;

	gap: 20px;

	min-height: 100px;

	border-bottom:
		1px solid rgba(255, 255, 255, 0.1);

	cursor: pointer;

	transition:
		color 0.25s,
		background 0.25s;

}


.project-list-item:hover {

	color: #c49a45;

	background:
		rgba(196, 154, 69, 0.03);

}


.list-number {

	color: #555;

	font-size: 12px;

}


.list-main h2 {

	margin: 0 0 8px;

	font-size: 22px;

	font-weight: 400;

}


.list-tech {

	display: flex;

	gap: 10px;

	color: #666;

	font-size: 11px;

}


.list-description {

	color: #777;

	font-size: 13px;

}


.list-year {

	color: #555;

	font-size: 12px;

	text-align: right;

}


.list-arrow {

	color: #c49a45;

	font-size: 20px;

}


/* List Preview */

.list-preview {

	position: fixed;

	right: 8%;

	top: 50%;

	width: 320px;

	aspect-ratio: 16 / 10;

	transform:
		translateY(-50%);

	pointer-events: none;

	z-index: 100;

	border:
		1px solid rgba(196, 154, 69, 0.5);

	background: #111;

	overflow: hidden;

}


.list-preview img {

	width: 100%;

	height: 100%;

	object-fit: cover;

}


/* Preview Animation */

.preview-enter-active,
.preview-leave-active {

	transition:
		opacity 0.25s ease,
		transform 0.25s ease;

}


.preview-enter-from,
.preview-leave-to {

	opacity: 0;

	transform:
		translateY(-50%) translateX(20px);

}


/* Empty */

.empty {

	padding: 100px 0;

	text-align: center;

	color: #555;

	letter-spacing: 0.2em;

}


/* Modal */

.modal {

	position: fixed;

	inset: 0;

	display: flex;

	align-items: center;

	justify-content: center;

	padding: 40px;

	background:
		rgba(0, 0, 0, 0.8);

	z-index: 1000;

}


.modal-panel {

	position: relative;

	display: grid;

	grid-template-columns:
		1.2fr 1fr;

	width: min(1100px, 100%);

	max-height: 85vh;

	overflow: hidden;

	background: #111;

	border:
		1px solid rgba(255, 255, 255, 0.12);

}


.modal-image {

	min-height: 400px;

}


.modal-image img {

	width: 100%;

	height: 100%;

	object-fit: cover;

}


.modal-content {

	padding: 50px;

	overflow-y: auto;

}


.modal-close {

	position: absolute;

	top: 15px;

	right: 15px;

	width: 35px;

	height: 35px;

	border: 0;

	background: transparent;

	color: #fff;

	font-size: 28px;

	cursor: pointer;

	z-index: 2;

}


.modal-meta {

	display: flex;

	gap: 20px;

	margin-bottom: 15px;

	color: #c49a45;

	font-size: 11px;

	letter-spacing: 0.1em;

}


.modal-content h2 {

	margin: 0 0 20px;

	font-size: 38px;

	font-weight: 400;

}


.modal-tags,
.modal-tech {

	display: flex;

	flex-wrap: wrap;

	gap: 8px;

	margin-bottom: 25px;

}


.modal-tags span {

	padding: 5px 9px;

	border: 1px solid rgba(196, 154, 69, 0.4);

	color: #c49a45;

	font-size: 11px;

}


.modal-tech span {

	color: #888;

	font-size: 12px;

}


.modal-summary {

	font-size: 17px;

	line-height: 1.7;

}


.modal-description {

	margin-top: 20px;

	color: #777;

	line-height: 1.8;

}


.modal-links {

	display: flex;

	gap: 20px;

	margin-top: 40px;

}


.modal-links a {

	color: #c49a45;

	text-decoration: none;

	letter-spacing: 0.1em;

	font-size: 12px;

}


/* Modal Animation */

.modal-enter-active,
.modal-leave-active {

	transition:
		opacity 0.3s ease;

}


.modal-enter-from,
.modal-leave-to {

	opacity: 0;

}


/* Mobile */

@media (max-width: 768px) {

	.portfolio-header {

		align-items: flex-start;

		flex-direction: column;

	}


	.project-stats {

		display: none;

	}


	.project-grid {

		grid-template-columns: 1fr;

	}


	.portfolio-toolbar {

		align-items: flex-start;

		flex-direction: column;

	}


	.project-list-item {

		grid-template-columns:
			35px 1fr 30px;

	}


	.list-description,
	.list-year {

		display: none;

	}


	.list-preview {

		display: none;

	}


	.modal {

		padding: 15px;

	}


	.modal-panel {

		grid-template-columns: 1fr;

		max-height: 90vh;

	}


	.modal-image {

		min-height: 200px;

		max-height: 250px;

	}


	.modal-content {

		padding: 30px;

	}

}
</style>