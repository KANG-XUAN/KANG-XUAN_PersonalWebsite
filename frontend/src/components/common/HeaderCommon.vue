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
						<router-link class="nav-link text-white" to="/interest">興趣</router-link>
						<router-link class="nav-link text-white" to="/professional">專業</router-link>
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
.header-bar {
	position: sticky;
	top: 0;
	z-index: 10;
	backdrop-filter: blur(4px);
	padding: 5px 0;
	width: 100%;
}

.with-scrollbar-padding {
	width: calc(100% - 15px);
	/* 只在首頁保留 scrollbar 空間 */
}

/* 背景層 1：常駐的漸層 */
.header-bar::before {
	content: "";
	position: absolute;
	inset: 0;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
	z-index: -2;
}

/* 背景層 2：hover 時疊加的黑底 */
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


.logo-img {
	height: 40px;
	/* 根據你的設計調整大小 */
	object-fit: contain;
}

.nav-links {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 20px;
	/* 每個 router-link 間隔 20px */
	padding: 0;
}

.nav-link {
	flex: 1;
	text-align: center;
	font-size: 14px;
}

.nav-link:hover {}
</style>
