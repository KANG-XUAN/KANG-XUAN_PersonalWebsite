<template>
	<nav class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center pt-0 pb-0">
		<router-link class="nav-link text-white" to="/">首頁</router-link>
		<router-link class="nav-link text-white" to="/interest">興趣</router-link>
		<router-link class="nav-link text-white" to="/professional">專業</router-link>
		<router-link class="nav-link text-white" to="/about">關於我</router-link>
	</nav>
</template>

<script setup>
// 無需定義 data，無邏輯
</script>

<style scoped>
.nav-link {
	display: block;
	padding: 10px 40px;
	transition: background-color 0.8s ease;
	text-decoration: none;
}

.nav-link:hover {
	background-color: #f0ad4e;
	color: white !important;
}
</style>
