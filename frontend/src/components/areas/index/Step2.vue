<template>
	<section id="step2" class="step-section">
		<div class="back-img"></div>
	</section>
</template>

<script setup>
</script>

<style scoped>
.step-section {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
	font-size: 2rem;
}

.back-img {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url('@/assets/images/background.webp'), url('@/assets/images/background.jpg');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	z-index: -1;
}
</style>
