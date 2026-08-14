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

		<!-- Grid -->
		<section v-if="viewMode === 'grid'" class="project-grid">

			<article v-for="(project, index) in filteredProjects" :key="project.id" class="project-card"
				@click="openModal(project)">

				<div class="project-number">

					{{ String(index + 1).padStart(2, '0') }}

				</div>

				<div class="project-image">

					<img :src="project.image" :alt="project.title" />

					<div class="image-overlay">

						<span>VIEW PROJECT →</span>

					</div>

				</div>

				<div class="project-info">

					<div class="project-meta">

						<span>{{ project.year }}</span>

						<span>{{ project.status }}</span>

					</div>

					<h2>
						{{ project.title }}
					</h2>

					<p>
						{{ project.summary }}
					</p>

					<div class="project-tags">

						<span v-for="tag in project.tags" :key="tag">
							{{ tag }}
						</span>

					</div>

				</div>

			</article>

		</section>

		<!-- List -->
		<section v-else class="project-list">

			<article v-for="(project, index) in filteredProjects" :key="project.id" class="project-list-item"
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
	--accent: #b45f32;

	color: var(--ink);

	width: 100%;
	min-height: 100%;

	padding:
		clamp(30px, 5vw, 80px);

	box-sizing: border-box;

}

/* Header */

.portfolio-header {

	border-bottom:
		1px solid var(--line);

	padding-bottom: 35px;

}

.header-label {

	display: flex;

	justify-content:
		space-between;

	font-size: 11px;

	letter-spacing:
		0.2em;

	color:
		var(--muted);

	margin-bottom:
		30px;

}

.header-main {

	display: flex;

	align-items:
		flex-end;

	justify-content:
		space-between;

}

.header-main h1 {

	margin: 0;

	font-size:
		clamp(45px, 7vw, 90px);

	font-weight: 500;

	letter-spacing:
		-0.04em;

}

.header-main p {

	margin:
		12px 0 0;

	color:
		var(--muted);

}

.project-count {

	display: flex;

	flex-direction:
		column;

	align-items:
		flex-end;

}

.project-count strong {

	font-size:
		42px;

	font-weight:
		400;

	line-height:
		1;

}

.project-count span {

	font-size:
		10px;

	letter-spacing:
		0.2em;

	color:
		var(--muted);

	margin-top:
		6px;

}

/* Toolbar */

.portfolio-toolbar {

	display: flex;

	justify-content:
		space-between;

	align-items:
		center;

	padding:
		20px 0;

	border-bottom:
		1px solid var(--line);

}

.filters {

	display: flex;

	flex-wrap:
		wrap;

	gap:
		8px;

}

.filters button {

	background:
		transparent;

	border:
		1px solid var(--line);

	color:
		var(--ink);

	padding:
		7px 14px;

	cursor:
		pointer;

	font-size:
		13px;

	transition:
		0.25s;

}

.filters button:hover,
.filters button.active {

	background:
		var(--ink);

	color:
		var(--paper);

}

.view-switch {

	display:
		flex;

	border:
		1px solid var(--line);

}

.view-switch button {

	width:
		38px;

	height:
		32px;

	border:
		0;

	background:
		transparent;

	cursor:
		pointer;

	color:
		var(--muted);

}

.view-switch button.active {

	background:
		var(--ink);

	color:
		var(--paper);

}

/* Grid */

.project-grid {

	display:
		grid;

	grid-template-columns:
		repeat(2, 1fr);

	gap:
		50px 30px;

	padding-top:
		45px;

}

.project-card {

	position:
		relative;

	cursor:
		pointer;

}

.project-number {

	position:
		absolute;

	left:
		-5px;

	top:
		-22px;

	font-size:
		11px;

	color:
		var(--muted);

}

.project-image {

	position:
		relative;

	aspect-ratio:
		16 / 10;

	overflow:
		hidden;

	background:
		#ddd;

}

.project-image img {

	width:
		100%;

	height:
		100%;

	object-fit:
		cover;

	display:
		block;

	filter:
		saturate(0.85);

	transition:
		transform 0.5s ease,
		filter 0.5s ease;

}

.project-card:hover .project-image img {

	transform:
		scale(1.04);

	filter:
		saturate(1);

}

.image-overlay {

	position:
		absolute;

	inset:
		0;

	display:
		flex;

	align-items:
		center;

	justify-content:
		center;

	background:
		rgba(41, 37, 31, 0.7);

	color:
		white;

	opacity:
		0;

	transition:
		0.3s;

}

.project-card:hover .image-overlay {

	opacity:
		1;

}

/* Card info */

.project-info {

	padding-top:
		18px;

}

.project-meta {

	display:
		flex;

	justify-content:
		space-between;

	font-size:
		11px;

	color:
		var(--muted);

}

.project-info h2 {

	font-size:
		clamp(24px, 3vw, 38px);

	font-weight:
		500;

	margin:
		10px 0;

}

.project-info p {

	color:
		var(--muted);

	margin:
		0 0 15px;

	line-height:
		1.6;

}

.project-tags {

	display:
		flex;

	gap:
		6px;

	flex-wrap:
		wrap;

}

.project-tags span {

	font-size:
		10px;

	border:
		1px solid var(--line);

	padding:
		4px 8px;

}

/* List */

.project-list {

	padding-top:
		20px;

}

.project-list-item {

	display:
		grid;

	grid-template-columns:
		60px 1fr 250px 90px 40px;

	align-items:
		center;

	min-height:
		110px;

	border-bottom:
		1px solid var(--line);

	cursor:
		pointer;

	transition:
		background 0.25s;

}

.project-list-item:hover {

	background:
		rgba(41, 37, 31, 0.05);

}

.list-number {

	color:
		var(--muted);

	font-size:
		12px;

}

.list-title h2 {

	margin:
		0 0 5px;

	font-size:
		24px;

	font-weight:
		500;

}

.list-title p {

	margin:
		0;

	color:
		var(--muted);

	font-size:
		13px;

}

.list-tags {

	display:
		flex;

	gap:
		5px;

	flex-wrap:
		wrap;

}

.list-tags span {

	font-size:
		10px;

	border:
		1px solid var(--line);

	padding:
		4px 7px;

}

.list-year {

	color:
		var(--muted);

	font-size:
		12px;

}

.list-arrow {

	font-size:
		22px;

}

/* Modal */

.project-modal {

	position:
		fixed;

	inset:
		0;

	background:
		rgba(41, 37, 31, 0.65);

	z-index:
		1000;

	display:
		flex;

	align-items:
		center;

	justify-content:
		center;

	padding:
		30px;

}

.modal-inner {

	position:
		relative;

	width:
		min(900px, 100%);

	max-height:
		90vh;

	overflow-y:
		auto;

	background:
		var(--paper);
	background-image: repeating-linear-gradient(0deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .02) 1px, transparent 1px, transparent 24px), url(https://www.transparenttextures.com/patterns/paper-fibers.png);

	padding:
		clamp(30px, 5vw, 70px);

	box-sizing:
		border-box;

}

.modal-close {

	position:
		absolute;

	top:
		20px;

	right:
		20px;

	border:
		0;

	background:
		transparent;

	font-size:
		30px;

	cursor:
		pointer;

	color:
		var(--ink);

}

.modal-header {

	display:
		flex;

	justify-content:
		space-between;

	font-size:
		11px;

	letter-spacing:
		0.15em;

	color:
		var(--muted);

	border-bottom:
		1px solid var(--line);

	padding-bottom:
		15px;

}

.modal-inner h2 {

	font-size:
		clamp(40px, 6vw, 72px);

	font-weight:
		500;

	margin:
		35px 0 20px;

}

.modal-description {

	max-width:
		700px;

	line-height:
		1.8;

	color:
		var(--muted);

}

.modal-columns {

	display:
		grid;

	grid-template-columns:
		repeat(3, 1fr);

	gap:
		30px;

	margin-top:
		50px;

	padding-top:
		25px;

	border-top:
		1px solid var(--line);

}

.section-label {

	display:
		block;

	font-size:
		10px;

	letter-spacing:
		0.15em;

	color:
		var(--muted);

	margin-bottom:
		12px;

}

.tech-list {

	display:
		flex;

	flex-wrap:
		wrap;

	gap:
		5px;

}

.tech-list span {

	border:
		1px solid var(--line);

	padding:
		5px 8px;

	font-size:
		11px;

}

.modal-columns ul {

	margin:
		0;

	padding-left:
		18px;

	line-height:
		1.8;

}

.modal-links {

	display:
		flex;

	gap:
		10px;

	margin-top:
		45px;

}

.modal-links a {

	display:
		inline-block;

	border:
		1px solid var(--ink);

	color:
		var(--ink);

	text-decoration:
		none;

	padding:
		10px 18px;

	font-size:
		12px;

	transition:
		0.25s;

}

.modal-links a:hover {

	background:
		var(--ink);

	color:
		var(--paper);

}

/* Mobile */

@media (max-width: 768px) {

	.header-main {

		align-items:
			flex-start;

		flex-direction:
			column;

		gap:
			25px;

	}

	.project-count {

		align-items:
			flex-start;

	}

	.portfolio-toolbar {

		align-items:
			flex-start;

		gap:
			20px;

		flex-direction:
			column;

	}

	.project-grid {

		grid-template-columns:
			1fr;

	}

	.project-list-item {

		grid-template-columns:
			35px 1fr 30px;

	}

	.list-tags,
	.list-year {

		display:
			none;

	}

	.modal-columns {

		grid-template-columns:
			1fr;

	}

}
</style>