<template>
	<div class="interest-page my-5">
		<!-- 分頁選單 -->
		<div class="btn-group d-flex mb-4" role="group" id="tab-menu">
			<button type="button" class="btn btn-outline-primary flex-fill" :class="{ active: activeTab === 'music' }"
				@click="setActiveTab('music')">
				音樂
			</button>
			<button type="button" class="btn btn-outline-primary flex-fill" :class="{ active: activeTab === 'anime' }"
				@click="setActiveTab('anime')">
				影片
			</button>
			<!-- <button type="button" class="btn btn-outline-primary flex-fill" :class="{ active: activeTab === 'game' }"
				@click="setActiveTab('game')">
				遊戲
			</button> -->
		</div>

		<!-- 分頁內容區 -->
		<div id="tab-content">
			<div v-show="activeTab === 'music'">
				<MusicArea />
			</div>
			<div v-show="activeTab === 'anime'">
				<AnimeArea />
			</div>
			<div v-show="activeTab === 'game'">
				<h2>興趣3</h2>
				<p>這裡可以放你的興趣3列表或介紹。</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import MusicArea from '../areas/interest/MusicArea.vue';
import AnimeArea from '../areas/interest/AnimeArea.vue';

const activeTab = ref('music');

function setActiveTab(tab) {
	activeTab.value = tab;
}
</script>

<style scoped>
.interest-page {
	/* 你可以這裡放興趣頁面的樣式 */
}
</style>