<template>
	<div class="breadcrumb">

		<template v-if="current">

			<router-link to="/portfolio" class="breadcrumb-link">
				PROJECT ARCHIVE
			</router-link>

			<span class="breadcrumb-separator">
				›
			</span>

			<span class="breadcrumb-current">
				{{ current }}
			</span>

		</template>

		<template v-else>

			<span class="breadcrumb-home">
				PROJECT ARCHIVE
			</span>

		</template>

	</div>
</template>

<script setup>
defineProps({
	current: {
		type: String,
		default: ''
	}
})
</script>

<style scoped>
.breadcrumb {
	display: flex;
	align-items: center;
	gap: 10px;
	color: var(--muted);
	font-size: clamp(9px, 0.7vw, 18px);
	letter-spacing: 0.2em;
}

/* 內頁：可以點 */
.breadcrumb-link {
	color: var(--ink);
	text-decoration: none;
	border-bottom: 1px solid transparent;
	transition:
		color 0.25s ease,
		border-color 0.25s ease;
}

.breadcrumb-link:hover {
	color: var(--accent);
	border-color: var(--accent);
}

/* 首頁：只是目前位置 */
.breadcrumb-home {
	color: var(--ink);
}

/* 分隔箭頭 */
.breadcrumb-separator {
	color: var(--ink);
	font-size: clamp(15px, 1.1vw, 21px);
	font-weight: bold;
	line-height: 1;
	user-select: none;
	opacity: 0.55;

	transform: translateY(-2px);
}

/* 當前頁 */
.breadcrumb-current {
	color: var(--ink);
}
</style>
