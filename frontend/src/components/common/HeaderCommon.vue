<template>
	<div class="sticky-top header-bar">
		<div class="container-fluid">
			<div class="row align-items-center">
				<!-- 左側 3 -->
				<div class="col-3 ps-3">
					<router-link to="/">
						<img src="@/assets/images/logo.png" alt="我的網站 Logo" class="logo-img" />
					</router-link>
				</div>


				<!-- 中間 7 導覽列 -->
				<div class="col-7">
					<!-- 放功能相關{{}} -->
				</div>

				<!-- 右側 2 -->
				<div class="col-2 text-end pe-3 text-white">
					<nav class="navbar nav-links">
						<router-link class="nav-link text-white" to="/interest">興趣</router-link>
						<router-link class="nav-link text-white" to="/professional">專業</router-link>
						<router-link class="nav-link text-white" to="/about">關於我</router-link>
					</nav>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// 無邏輯
</script>

<style scoped>
.header-bar {
	position: relative;
	backdrop-filter: blur(4px);
	z-index: 10;

	padding: 5px 0;
}

.header-bar::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
	opacity: 0;
	transition: opacity 0.5s ease;
	pointer-events: none;
	/* 確保 hover 不被遮擋，滑鼠事件不會卡在背景層。 */
	z-index: -1;
}

.header-bar:hover::before {
	opacity: 1;
}

.logo-img {
	height: 40px; /* 根據你的設計調整大小 */
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
