<template>
	<header class="sticky-top px-0 header-bar" :class="{ 'with-scrollbar-padding': route.path === '/' }">
		<div class="container-fluid">

			<div class="row align-items-center h-100">

				<!-- Logo -->
				<div class="col-3 h-100">
					<router-link to="/">
						<img src="@/assets/images/logo.png" alt="我的網站 Logo" class="logo-img" />
					</router-link>
				</div>

				<!-- 中間 -->
				<div class="col-5 h-100">
					<p></p>
				</div>

				<!-- 導覽 -->
				<div class="col-4 h-100 text-white">

					<nav class="navbar nav-links h-100">

						<!-- 作品集 -->
						<div class="portfolio-menu" :class="{ 'is-active': showPortfolioMenu }"
							@mouseenter="openPortfolioMenu" @mouseleave="scheduleClosePortfolioMenu">
							<router-link class="nav-link text-white" to="/portfolio">
								<span>作品集</span>
								<span class="portfolio-arrow"></span>
							</router-link>

						</div>

						<!-- 專業技能 -->
						<router-link class="nav-link text-white" to="/professional" @mouseenter="closePortfolioMenu">
							專業技能
						</router-link>

						<!-- 關於我 -->
						<router-link class="nav-link text-white" to="/about" @mouseenter="closePortfolioMenu">
							關於我
						</router-link>

					</nav>

				</div>

			</div>

		</div>

		<!-- =========================
		     第二層 Header
		========================= -->

		<div class="portfolio-submenu" :class="{ 'is-open': showPortfolioMenu }" @mouseenter="openPortfolioMenu"
			@mouseleave="handlePortfolioMouseLeave">

			<router-link class="submenu-link" to="/portfolio/web">
				網頁作品
			</router-link>

			<router-link class="submenu-link" to="/portfolio/writing">
				文字創作
			</router-link>

			<router-link class="submenu-link" to="/portfolio/tools">
				小工具
			</router-link>

		</div>

	</header>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const showPortfolioMenu = ref(false)

let closeTimer = null

watch(
	// 只要路由發生變化，就自動關閉二級選單。
	() => route.path,
	() => {
		closePortfolioMenu()
	}
)

/* =========================
 * 開啟二級選單
 * ========================= */

function openPortfolioMenu() {

	if (closeTimer) {
		clearTimeout(closeTimer)
		closeTimer = null
	}

	showPortfolioMenu.value = true
}

/* =========================
 * 延遲關閉
 *
 * 給滑鼠一點時間
 * 從作品集移動到二級選單
 * ========================= */

function scheduleClosePortfolioMenu() {

	if (closeTimer) {
		clearTimeout(closeTimer)
	}

	closeTimer = setTimeout(() => {
		showPortfolioMenu.value = false
		closeTimer = null
	}, 400)
}

function handlePortfolioMouseLeave(event) {

	const submenu = event.currentTarget
	const rect = submenu.getBoundingClientRect()

	// 滑鼠在二級選單上方
	if (event.clientY < rect.top) {

		scheduleClosePortfolioMenu()

		return
	}

	// 滑鼠在二級選單下方
	if (event.clientY > rect.bottom) {

		closePortfolioMenu()

		return
	}

	// 左右離開
	closePortfolioMenu()
}

/* =========================
 * 立即關閉
 *
 * Hover 到其他 Header 項目
 * 直接關掉
 * ========================= */

function closePortfolioMenu() {

	if (closeTimer) {
		clearTimeout(closeTimer)
		closeTimer = null
	}

	showPortfolioMenu.value = false
}

/* 元件離開時清除 timer */
onBeforeUnmount(() => {

	if (closeTimer) {
		clearTimeout(closeTimer)
	}

})
</script>

<style scoped>
/* Header */
.header-bar {
	/* 定位 */
	position: sticky;
	top: 0;
	z-index: 100;

	/* 尺寸 */
	width: 100%;
	min-height: clamp(50px, 3.2vw, 100px);

	/* 視覺 */
	backdrop-filter: blur(clamp(4px, 0.4vw, 10px));

	overflow: visible;
}

.header-bar>.container-fluid {
	height: 100%;
}

.header-bar>.container-fluid>.row {
	height: 100%;
	min-height: clamp(50px, 3.2vw, 100px);
}

/* 首頁保留 scrollbar 空間 */
.with-scrollbar-padding {
	width: calc(100% - 15px);
}

/********************************
 * Header 背景
 ********************************/

/* 常駐漸層 */
.header-bar::before {
	content: "";

	position: absolute;
	inset: 0;

	background: linear-gradient(to bottom,
			rgba(0, 0, 0, 0.6),
			rgba(0, 0, 0, 0));

	z-index: -2;
}

/* Hover 黑底 */
.header-bar::after {
	content: "";

	position: absolute;
	inset: 0;

	background-color: #000000;
	background-image: url("https://www.transparenttextures.com/patterns/black-scales.png");
	/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
	opacity: 0;

	transition: opacity 0.3s ease;

	z-index: -1;
}

.header-bar:hover::after {
	opacity: 1;
}

/********************************
 * Logo
 ********************************/

.logo-img {
	/* 尺寸 */
	height: clamp(40px, 2.4vw, 90px);
	width: auto;

	/* 圖片 */
	object-fit: contain;
}

/********************************
 * 第一層導覽列
 ********************************/

.nav-links {
	/* 排版 */
	display: flex;
	align-items: stretch;

	/* 尺寸 */
	width: 100%;
	height: 100%;

	/* 間距 */
	padding: 0;
	margin: 0;
	gap: 0;
}

/* 所有第一層選項平均分配 */
.nav-links>.nav-link,
.nav-links>.portfolio-menu {
	flex: 1 1 0;
	min-width: 0;
}

/* 導覽文字 */
.nav-link {
	/* 排版 */
	display: flex;
	align-items: center;
	justify-content: center;

	/* 尺寸 */
	flex: 1 1 0;
	width: 100%;
	height: 100%;

	/* 間距 */
	margin: 0;
	padding: 0;

	/* 文字 */
	text-align: center;
	font-size: clamp(14px, 1.2vw, 36px);
	white-space: nowrap;
	text-decoration: none;

	/* 動畫 */
	transition:
		background-color 0.2s ease,
		color 0.2s ease;
}

/* 作品集選單容器 */
.portfolio-menu {
	--portfolio-side-buffer: 20px;

	/* 定位 */
	position: relative;

	/* 排版 */
	display: flex;
	align-items: stretch;

	/* 尺寸 */
	flex: 1 1 0;
	min-width: 0;
	height: 100%;
}

/* 一般導覽 Hover */
.nav-links>.nav-link:hover {
	color: #ffffff;
	background-color: rgba(255, 255, 255, 0.12);
}

/* 作品集 Hover / 二級選單開啟時 */
.portfolio-menu.is-active .nav-link,
.portfolio-menu:hover .nav-link {
	color: #ffffff;
	background-color: rgba(255, 255, 255, 0.12);
}

/* 作品集箭頭 */
.portfolio-arrow {
	/* 尺寸 */
	display: inline-block;
	width: 0;
	height: 0;

	/* 間距 */
	margin-left: clamp(6px, 0.4vw, 12px);

	/* 三角形 */
	border-top: 7px solid transparent;
	border-bottom: 7px solid transparent;
	border-left: 10px solid currentColor;

	/* 動畫 */
	transition: transform 0.2s ease;
}

.portfolio-menu.is-active .portfolio-arrow,
.portfolio-menu:hover .portfolio-arrow {
	transform: rotate(90deg);
}

/********************************
 * 二級選單
 ********************************/

.portfolio-submenu {
	/* 滑鼠緩衝區設定 */
	--submenu-top-buffer: 20px;
	--submenu-bottom-buffer: 10px;

	/* 定位 */
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;

	/* 排版 */
	display: flex;
	align-items: stretch;

	/* 尺寸 */
	min-height: clamp(45px, 2.8vw, 80px);

	/* 背景設計 */
	background-color: #686b6e;
	background-image:
		url("https://www.transparenttextures.com/patterns/light-aluminum.png"),
		linear-gradient(to bottom,
			#686b6e,
			#55585b);
	background-repeat:
		repeat,
		no-repeat;
	background-size:
		auto,
		100% 100%;
	background-blend-mode: soft-light, normal;

	/* 邊框與陰影 */
	border-block: 1px solid rgba(255, 255, 255, 0.3);
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);

	/* 顯示控制 */
	opacity: 0;
	visibility: hidden;
	pointer-events: none;

	transform: translateY(-100%);

	/* 動畫 */
	transition:
		transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
		opacity 0.25s ease,
		visibility 0.25s ease;

	z-index: -1;
}

/* 二級選單上下方的透明滑鼠緩衝區 */
.portfolio-submenu::before,
.portfolio-submenu::after {
	content: "";

	/* 定位 */
	position: absolute;
	left: 0;
	right: 0;

	/* 滑鼠互動 */
	background: transparent;
	pointer-events: auto;

	z-index: 101;
}

/* 上方 */
.portfolio-submenu::before {
	top: calc(-1 * var(--submenu-top-buffer));
	height: var(--submenu-top-buffer);
}

/* 下方 */
.portfolio-submenu::after {
	bottom: calc(-1 * var(--submenu-bottom-buffer));
	height: var(--submenu-bottom-buffer);
}

/* 開啟 */
.portfolio-submenu.is-open {
	opacity: 1;
	visibility: visible;
	pointer-events: auto;

	transform: translateY(0);

	z-index: 100;
}

/********************************
 * 二級選單項目
 ********************************/

.submenu-link {
	/* 排版 */
	display: flex;
	align-items: center;
	justify-content: center;

	/* 尺寸 */
	flex: 1 1 0;
	min-width: 0;
	height: 100%;
	min-height: clamp(45px, 2.8vw, 80px);

	/* 間距 */
	margin: 0;
	padding: 0;

	/* 文字 */
	color: white;
	font-size: clamp(13px, 1vw, 28px);
	text-decoration: none;
	white-space: nowrap;

	/* 動畫 */
	transition:
		background-color 0.2s ease,
		color 0.2s ease;
}

/* 二級選單 Hover */
.submenu-link:hover {
	color: #ffffff;
	background-color: rgba(255, 255, 255, 0.12);
}
</style>
