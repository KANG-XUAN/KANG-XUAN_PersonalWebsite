<template>

	<div class="portfolio">

		<!-- Header -->
		<header class="portfolio-header">

			<Breadcrumb current="Writing" />

			<div class="header-main">

				<div>
					<h1>作品集 - 文字創作</h1>

					<p>
						記錄開發過程、技術實驗與完成的作品。
					</p>
				</div>

				<div class="project-count">

					<strong>
						0
						<!-- {{ filteredProjects.length }} -->
					</strong>

					<span>PROJECTS</span>

				</div>

			</div>

		</header>

		<!-- Toolbar -->
		這是 文字創作 的作品集位置

	</div>

</template>

<script setup>
import { computed, ref } from 'vue'

import Breadcrumb from '@/components/areas/portfolio/Breadcrumb.vue'
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
</style>