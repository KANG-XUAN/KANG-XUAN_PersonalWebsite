<template>
	<footer class="footer-bar text-light text-center">
		<small>© 2025 康亘翔個人網站版權所有。</small>
	</footer>
</template>

<script setup>
// 沒有特別邏輯，不用寫內容
</script>

<style scoped>
/* Footer */
.footer-bar {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: clamp(40px, 4vw, 180px);
	padding: clamp(8px, 0.6vw, 16px) clamp(15px, 1.5vw, 35px);
	background-color: #000000;
	background-image: url("https://www.transparenttextures.com/patterns/shattered.png");
	z-index: 100;
}

/* Footer 文字 */
.footer-bar small {
	font-size: clamp(11px, 1vw, 30px);
	line-height: 1.5;
	white-space: nowrap;
}
</style>