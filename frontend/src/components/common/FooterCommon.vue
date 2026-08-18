<template>
	<footer class="footer-bar text-light text-center">
		<small>
			<span class="copyright-symbol">©</span>
			2025–{{ currentYear }} 亘的拾光誌｜康亘翔 版權所有。
		</small>
	</footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
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

/* 版權符號調整 */
.copyright-symbol {
	display: inline-block;

	font-size: 1.4em;

	vertical-align: -0.2em;
}
</style>