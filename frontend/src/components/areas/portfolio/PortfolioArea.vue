<template>

	<div class="portfolio-home">

		<!-- =========================
		     Header
		========================= -->

		<header class="portfolio-header">

			<Breadcrumb />

			<div class="header-main">

				<div class="header-title">
					<h1>
						作品集
					</h1>

					<p>
						探索不同類型的作品、創作與技術實驗。
					</p>

				</div>

				<div class="header-index">

					<span>
						ARCHIVE
					</span>

					<strong>
						03
					</strong>

				</div>

			</div>

		</header>


		<!-- =========================
		     Category
		========================= -->

		<main class="portfolio-categories">

			<!-- 01 -->
			<router-link to="/portfolio/web" class="category-card">

				<div class="category-number">
					01
				</div>

				<div class="category-content">

					<div class="category-image">

						<img src="@/assets/images/background.jpg" alt="" />

					</div>

					<div class="category-info">

						<span class="category-label">
							CATEGORY 01
						</span>

						<h2>
							網頁作品
						</h2>

						<p>
							這裡放置主題一的簡短介紹。
						</p>

					</div>

				</div>

				<div class="category-arrow">
					→
				</div>

			</router-link>


			<!-- 02 -->
			<router-link to="/portfolio/writing" class="category-card">

				<div class="category-number">
					02
				</div>

				<div class="category-content">

					<div class="category-image">

						<img src="@/assets/images/background.jpg" alt="" />

					</div>

					<div class="category-info">

						<span class="category-label">
							CATEGORY 02
						</span>

						<h2>
							文字創作
						</h2>

						<p>
							這裡放置主題二的簡短介紹。
						</p>

					</div>

				</div>

				<div class="category-arrow">
					→
				</div>

			</router-link>


			<!-- 03 -->
			<router-link to="/portfolio/tools" class="category-card">

				<div class="category-number">
					03
				</div>

				<div class="category-content">

					<div class="category-image">

						<img src="@/assets/images/background.jpg" alt="" />

					</div>

					<div class="category-info">

						<span class="category-label">
							CATEGORY 03
						</span>

						<h2>
							小工具
						</h2>

						<p>
							這裡放置主題三的簡短介紹。
						</p>

					</div>

				</div>

				<div class="category-arrow">
					→
				</div>

			</router-link>

		</main>


		<!-- Footer -->

		<footer class="portfolio-footer">

			<span>
				THREE CATEGORIES
			</span>

			<span>
				SELECT TO EXPLORE
			</span>

		</footer>

	</div>

</template>


<script setup>
import { computed, ref } from 'vue'

import Breadcrumb from '@/components/areas/portfolio/Breadcrumb.vue'
</script>

<style scoped>
/* Portfolio Home */
.portfolio-home {
	--ink: #29251f;
	--muted: #81786b;
	--line: rgba(41, 37, 31, 0.2);
	--paper: #fdf6e3;
	--accent: #c49a45;
	width: 100%;
	min-height: 100%;
	box-sizing: border-box;
	padding:
		clamp(35px, 5vw, 80px) clamp(25px, 5vw, 80px);
	color: var(--ink);
}

/* Header */
.portfolio-header {
	border-bottom:
		1px solid var(--line);
	padding-bottom:
		clamp(30px, 4vw, 55px);
}

.header-label {
	display: flex;
	justify-content:
		space-between;
	align-items: center;
	margin-bottom:
		clamp(35px, 5vw, 70px);
	color: var(--muted);
	font-size:
		clamp(9px, 0.7vw, 12px);
	letter-spacing:
		0.2em;
}

.header-main {
	display: flex;
	align-items: flex-end;
	justify-content:
		space-between;
	gap: 40px;
}

.header-title {
	flex: 1;
}

.header-title h1 {
	margin: 0;
	font-size:
		clamp(55px, 8vw, 120px);
	font-weight: 400;
	line-height: 0.95;
	letter-spacing:
		-0.05em;
}

.header-title p {
	margin:
		25px 0 0;
	max-width: 500px;
	color: var(--muted);
	font-size:
		clamp(13px, 1vw, 16px);
	line-height: 1.8;
}

.header-index {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	flex-shrink: 0;
}

.header-index span {
	margin-bottom: 8px;
	color: var(--muted);
	font-size: 10px;
	letter-spacing:
		0.2em;
}

.header-index strong {
	font-size:
		clamp(40px, 5vw, 70px);
	font-weight: 400;
	line-height: 1;
}

/* Categories */
.portfolio-categories {
	margin-top:
		clamp(25px, 4vw, 50px);
}

/* Category Card */
.category-card {
	position: relative;
	display: grid;
	grid-template-columns:
		80px minmax(0, 1fr) 50px;
	align-items: center;
	min-height:
		clamp(180px, 18vw, 280px);
	padding:
		20px 0;
	border-bottom:
		1px solid var(--line);
	color: var(--ink);
	text-decoration: none;
	overflow: hidden;
	transition:
		padding 0.4s ease,
		background-color 0.4s ease;
}

/* Number */
.category-number {
	align-self:
		flex-start;
	padding-top: 8px;
	color: var(--muted);
	font-size:
		clamp(11px, 0.8vw, 14px);
	letter-spacing:
		0.1em;
	transition:
		color 0.3s ease;
}

/* Content */
.category-content {
	display: grid;
	grid-template-columns:
		minmax(180px, 32%) minmax(0, 1fr);
	align-items: center;
	gap:
		clamp(25px, 4vw, 70px);
	min-width: 0;
}

/* Image */
.category-image {
	position: relative;
	width: 100%;
	aspect-ratio:
		16 / 9;
	overflow: hidden;
	background: #ddd;
}

.category-image::after {
	content: "";
	position: absolute;
	inset: 0;
	background:
		rgba(41, 37, 31, 0.2);
	transition:
		background-color 0.4s ease;
}

.category-image img {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
	filter:
		grayscale(20%);
	transform:
		scale(1);
	transition:
		transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
		filter 0.4s ease;
}

/* Info */
.category-info {
	min-width: 0;
}

.category-label {
	display: block;
	margin-bottom: 15px;
	color: var(--muted);
	font-size: 10px;
	letter-spacing:
		0.18em;
	transition:
		color 0.3s ease;
}

.category-info h2 {
	margin: 0;
	font-size:
		clamp(30px, 4vw, 58px);
	font-weight: 400;
	line-height: 1;
	letter-spacing:
		-0.03em;
	transition:
		transform 0.4s ease,
		color 0.3s ease;
}

.category-info p {
	max-width: 500px;
	margin:
		18px 0 0;
	color: var(--muted);
	font-size:
		clamp(12px, 0.9vw, 14px);
	line-height: 1.7;
}

/* Arrow */
.category-arrow {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 42px;
	height: 42px;
	border:
		1px solid var(--line);
	border-radius: 50%;
	color: var(--ink);
	font-size: 20px;
	transition:
		background-color 0.35s ease,
		color 0.35s ease,
		border-color 0.35s ease,
		transform 0.4s ease;
}

/* Hover */
.category-card:hover {
	padding-left:
		clamp(10px, 1.5vw, 25px);
	padding-right:
		clamp(10px, 1.5vw, 25px);
	background:
		rgba(41, 37, 31, 0.035);
}

.category-card:hover .category-number {
	color:
		var(--accent);
}

.category-card:hover .category-image img {
	transform:
		scale(1.08);
	filter:
		grayscale(0%);
}

.category-card:hover .category-image::after {
	background:
		rgba(41, 37, 31, 0);
}

.category-card:hover .category-info h2 {
	transform:
		translateX(8px);
}

.category-card:hover .category-label {
	color:
		var(--accent);
}

.category-card:hover .category-arrow {
	color:
		var(--paper);
	background:
		var(--ink);
	border-color:
		var(--ink);
	transform:
		translateX(5px);
}

/* Footer */
.portfolio-footer {
	display: flex;
	justify-content:
		space-between;
	padding-top:
		20px;
	color:
		var(--muted);
	font-size:
		9px;
	letter-spacing:
		0.18em;
}

/* Tablet */
@media (max-width: 768px) {
	.portfolio-home {
		padding:
			30px 20px;
	}

	.header-main {
		align-items:
			flex-start;
		flex-direction:
			column;
		gap:
			35px;
	}

	.header-index {
		align-items:
			flex-start;
	}

	.category-card {
		grid-template-columns:
			45px minmax(0, 1fr) 40px;
		min-height:
			160px;
	}

	.category-content {
		grid-template-columns:
			140px minmax(0, 1fr);
		gap:
			25px;
	}

	.category-info h2 {
		font-size:
			30px;
	}

	.category-info p {
		font-size:
			12px;
	}
}

/* Mobile */
@media (max-width: 560px) {
	.header-label {
		margin-bottom:
			40px;
	}

	.header-title h1 {
		font-size:
			58px;
	}

	.category-card {
		grid-template-columns:
			30px minmax(0, 1fr) 35px;
		padding:
			20px 0;
	}

	.category-content {
		grid-template-columns:
			1fr;
		gap:
			18px;
	}

	.category-image {
		width: 100%;
	}

	.category-info h2 {
		font-size:
			32px;
	}

	.category-info p {
		margin-top:
			12px;
	}

	.category-arrow {
		width: 32px;
		height: 32px;
		font-size:
			16px;
	}

	.portfolio-footer {
		font-size:
			8px;
	}
}

/* Very Small */
@media (max-width: 380px) {
	.portfolio-home {
		padding:
			25px 15px;
	}

	.header-title h1 {
		font-size:
			50px;
	}

	.category-number {
		font-size:
			9px;
	}

	.category-info h2 {
		font-size:
			28px;
	}

	.category-info p {
		font-size:
			11px;
	}
}
</style>
