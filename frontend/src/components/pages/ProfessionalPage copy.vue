<template>
	<div>
		<!-- 分頁選單 -->
		<div class="container my-4">
			<div class="btn-group d-flex w-100" role="group" id="tab-menu">
				<button v-for="tab in tabs" :key="tab.id"
					:class="['btn', 'btn-outline-primary', { active: activeTab === tab.id }, 'flex-fill']"
					@click="activeTab = tab.id" type="button">
					{{ tab.label }}
				</button>
			</div>
		</div>

		<!-- 分頁內容區塊 -->
		<div class="container mb-5" id="tab-content">
			<NoteArea v-if="activeTab === 'learning'" />
			<!-- <GitHubArea v-if="activeTab === 'github'" /> -->
			<SkillArea v-if="activeTab === 'portfolio'" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import NoteArea from '../areas/professional/NoteArea.vue'
// import GitHubArea from '../areas/professional/GitHubArea.vue'
import SkillArea from '../areas/professional/SkillArea.vue'

const tabs = [
	{ id: 'learning', label: '學習筆記' },
	// { id: 'github', label: 'GitHub 連結' },
	{ id: 'portfolio', label: '專業能力' },
]

const activeTab = ref('learning')
</script>

<style scoped>
.btn-group .btn.active {
	background-color: #007bff;
	color: white;
}
</style>
