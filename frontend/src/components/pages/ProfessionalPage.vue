<template>
	<div class="page p-0">
		<div class="flex min-h-screen h-100">
			<!-- 左側直列輪盤 -->
			<RouletteArea />
		</div>
	</div>

</template>

<script setup>
import RouletteArea from '../areas/professional/RouletteArea.vue'
</script>

<style scoped>
.page{
	height: 84vh;
}
</style>
