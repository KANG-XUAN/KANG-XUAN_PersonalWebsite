<template>
	<header class="sticky-top header-bar" :class="{ 'with-scrollbar-padding': route.path === '/' }">
		<div class="container-fluid">
			<div class="row align-items-center">
				<!-- 左側 3 -->
				<div class="col-3 ps-0">
					<router-link to="/">
						<img src="@/assets/images/logo.png" alt="我的網站 Logo" class="logo-img" />
					</router-link>
				</div>


				<!-- 中間 6 導覽列 -->
				<div class="col-5">
					<!-- 放功能相關{{}} -->
				</div>

				<!-- 右側 3 -->
				<div class="col-4 text-end pe-3 text-white">
					<nav class="navbar nav-links">
						<router-link class="nav-link text-white" to="/professional">專業技能</router-link>
						<router-link class="nav-link text-white" to="/portfolio">作品集</router-link>
						<router-link class="nav-link text-white" to="/about">關於我</router-link>
					</nav>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
/* Header */
.header-bar {
	position: sticky;
	top: 0;
	z-index: 10;
	width: 100%;
	padding: clamp(5px, 0.36vw, 30px) 0;
	backdrop-filter: blur(clamp(4px, 0.4vw, 10px));
}

/* 首頁保留 scrollbar 空間 */
.with-scrollbar-padding {
	width: calc(100% - 15px);
}

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
	background-color: rgba(0, 0, 0, 0.8);
	opacity: 0;
	transition: opacity 0.3s ease;
	z-index: -1;
}

.header-bar:hover::after {
	opacity: 1;
}

/* Logo */
.logo-img {
	height: clamp(40px, 2.4vw, 90px);
	width: auto;
	object-fit: contain;
}

/* 導覽列 */
.nav-links {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: clamp(20px, 1.8vw, 45px);
	padding: 0;
}

/* 導覽文字 */
.nav-link {
	flex: 1;
	text-align: center;
	font-size: clamp(14px, 1.2vw, 36px);
	white-space: nowrap;
}

/* 導覽 Hover */
.nav-link:hover {}
</style>
