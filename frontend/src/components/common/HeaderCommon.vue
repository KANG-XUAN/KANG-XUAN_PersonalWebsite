<template>
	<header class="sticky-top px-0 header-bar" :class="{
		'with-scrollbar-padding': route.path === '/',
		'is-header-hovered': isHeaderHovered
	}" @mouseenter="handleHeaderMouseEnter" @mouseleave="handleHeaderMouseLeave">

		<div class="container-fluid">

			<div class="row align-items-center h-100">

				<div class="col-3 h-100">

					<router-link to="/">
						<img src="@/assets/images/logo.png" alt="康亘翔的網站 Logo" class="logo-img" />
					</router-link>

				</div>

				<div class="col-5 h-100">
					<p></p>
				</div>

				<div class="col-4 h-100 text-white">

					<nav class="navbar nav-links h-100">

						<router-link class="nav-link text-white" to="/professional"
							@mouseenter="handleOtherNavMouseEnter">
							專業技能
						</router-link>

						<div class="portfolio-menu" :class="{ 'is-active': showPortfolioMenu }"
							@mouseenter="openPortfolioMenu" @mouseleave="handlePortfolioMouseLeave">

							<router-link class="nav-link text-white" to="/portfolio">

								<span>作品集</span>

								<span class="portfolio-arrow"></span>

							</router-link>

						</div>

						<router-link class="nav-link text-white" to="/about" @mouseenter="handleOtherNavMouseEnter">
							關於我
						</router-link>

					</nav>

				</div>

			</div>

		</div>

		<div class="portfolio-submenu" :class="{ 'is-open': showPortfolioMenu }" @mouseenter="handleSubmenuMouseEnter"
			@mouseleave="handleSubmenuMouseLeave">

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

import {
	ref,
	watch,
	onBeforeUnmount
} from 'vue'

import {
	useRoute
} from 'vue-router'

const route = useRoute()

const isHeaderHovered = ref(false)

const showPortfolioMenu = ref(false)

let closeTimer = null

let headerCloseTimer = null

// Route 改變時關閉選單
watch(
	() => route.path,
	() => {
		closePortfolioMenu()
	}
)

// Header 進入
function handleHeaderMouseEnter() {

	isHeaderHovered.value = true

	cancelCloseTimer()

	cancelHeaderCloseTimer()

}

// Header 離開
function handleHeaderMouseLeave() {

	isHeaderHovered.value = false

	scheduleHeaderClose()

}

// 作品集進入
function openPortfolioMenu() {

	cancelCloseTimer()

	cancelHeaderCloseTimer()

	showPortfolioMenu.value = true

}

// 作品集離開
function handlePortfolioMouseLeave() {

	if (isHeaderHovered.value) {

		scheduleClosePortfolioMenu()

	} else {

		scheduleHeaderClose()

	}

}

// 其他第一層導覽進入
function handleOtherNavMouseEnter() {

	if (isHeaderHovered.value) {

		scheduleClosePortfolioMenu()

	} else {

		scheduleHeaderClose()

	}

}

// 二級選單進入
function handleSubmenuMouseEnter() {

	cancelCloseTimer()

	cancelHeaderCloseTimer()

	showPortfolioMenu.value = true

}

// 二級選單離開
function handleSubmenuMouseLeave() {

	if (isHeaderHovered.value) {

		scheduleClosePortfolioMenu()

	} else {

		scheduleHeaderClose()

	}

}

// 200ms 後關閉作品集
function scheduleClosePortfolioMenu() {

	cancelCloseTimer()

	closeTimer = setTimeout(() => {

		showPortfolioMenu.value = false

		closeTimer = null

	}, 200)

}

// 300ms 後關閉作品集
function scheduleHeaderClose() {

	cancelHeaderCloseTimer()

	headerCloseTimer = setTimeout(() => {

		showPortfolioMenu.value = false

		headerCloseTimer = null

	}, 300)

}

// 立即關閉
function closePortfolioMenu() {

	cancelCloseTimer()

	cancelHeaderCloseTimer()

	showPortfolioMenu.value = false

}

// 清除作品集 Timer
function cancelCloseTimer() {

	if (closeTimer) {

		clearTimeout(closeTimer)

		closeTimer = null

	}

}

// 清除 Header Timer
function cancelHeaderCloseTimer() {

	if (headerCloseTimer) {

		clearTimeout(headerCloseTimer)

		headerCloseTimer = null

	}

}

// 元件卸載
onBeforeUnmount(() => {

	cancelCloseTimer()

	cancelHeaderCloseTimer()

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

/* Header 背景 */
.header-bar::before {

	content: "";

	position: absolute;
	inset: 0;

	background:
		linear-gradient(to bottom,
			rgba(0, 0, 0, 0.6),
			rgba(0, 0, 0, 0));

	z-index: -2;

}

.header-bar::after {

	content: "";

	position: absolute;
	inset: 0;

	background-color: #000000;

	background-image:
		url("https://www.transparenttextures.com/patterns/black-scales.png");

	opacity: 0;

	transition:
		opacity 0.3s ease;

	z-index: -1;

}

.header-bar.is-header-hovered::after {
	opacity: 1;
}

/* Logo */
.logo-img {

	height: clamp(40px, 2.4vw, 90px);
	width: auto;
	object-fit: contain;

}

/* 第一層導覽 */
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

.nav-links>.nav-link:hover {

	color: #ffffff;
	background-color: rgba(255, 255, 255, 0.12);

}

/* 作品集 */
.portfolio-menu {

	/* 定位 */
	position: relative;
	z-index: 2;

	/* 排版 */
	display: flex;
	align-items: stretch;

	/* 尺寸 */
	flex: 1 1 0;
	min-width: 0;
	height: 100%;

}

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
	transition:
		transform 0.2s ease;

}

.portfolio-menu.is-active .portfolio-arrow,
.portfolio-menu:hover .portfolio-arrow {

	transform: rotate(90deg);

}

/* 第二層選單 */
.portfolio-submenu {

	/* 容錯區 */
	--submenu-top-buffer: 20px;
	--submenu-bottom-buffer: 10px;

	/* 定位 */
	position: absolute;
	top: 100%;
	left: 0;

	/* 排版 */
	display: flex;
	align-items: stretch;

	/* 尺寸 */
	width: 100%;
	min-height: clamp(45px, 2.8vw, 80px);

	/* 背景 */
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

	background-blend-mode:
		soft-light,
		normal;

	/* 邊框 */
	border-block: 1px solid rgba(255, 255, 255, 0.3);

	/* 陰影 */
	box-shadow:
		0 8px 24px rgba(0, 0, 0, 0.4);

	/* 初始狀態 */
	opacity: 0;
	visibility: hidden;
	pointer-events: none;

	/* 動畫 */
	transform: translateY(-100%);

	transition:
		transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
		opacity 0.25s ease,
		visibility 0.25s ease;

	z-index: -1;

}

/* 上方透明緩衝區 */
/* .portfolio-submenu::before {

	content: "";

	position: absolute;

	left: 0;
	right: 0;

	top: calc(-1 * var(--submenu-top-buffer));
	height: var(--submenu-top-buffer);

	background: transparent;

	pointer-events: auto;

	z-index: 101;

} */

/* 下方透明緩衝區 */
.portfolio-submenu::after {

	content: "";

	position: absolute;

	left: 0;
	right: 0;

	bottom: calc(-1 * var(--submenu-bottom-buffer));
	height: var(--submenu-bottom-buffer);

	background: transparent;

	pointer-events: auto;

	z-index: 101;

}

/* 第二層選單開啟 */
.portfolio-submenu.is-open {

	opacity: 1;
	visibility: visible;
	pointer-events: auto;

	transform: translateY(0);

	z-index: 100;

}

/* 第二層選單文字 */
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
	white-space: nowrap;
	text-decoration: none;

	/* 動畫 */
	transition:
		background-color 0.2s ease,
		color 0.2s ease;

}

.submenu-link:hover {

	color: #ffffff;
	background-color: rgba(255, 255, 255, 0.12);

}
</style>
