<template>
	<nav class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center pt-0 pb-0">
		<a class="nav-link text-white" href="/">首頁</a>
		<a class="nav-link text-white" href="/interest">興趣</a>
		<a class="nav-link text-white" href="/professional">專業</a>
		<a class="nav-link text-white" href="/about">關於我</a>
	</nav>
</template>

<script>
export default {
	name: 'HeaderCommon',
	data() {
		return {};
	}
}
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