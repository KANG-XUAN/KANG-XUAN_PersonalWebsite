<template>
	<div class="about-page">
		<h2>關於我</h2>
		<div class="about-text">
			<p>
				大家好，我是康亘翔，一名熱愛程式設計與創作的開發者。擁有豐富的前端與後端開發經驗，
				喜歡挑戰新技術並持續學習成長。
			</p>
			<p>
				除了技術外，我也重視團隊合作與溝通，認為好的產品來自大家共同努力的結晶。
				在空閒時，我喜歡閱讀、攝影和旅遊，這些興趣讓我在工作之餘保持靈感與熱情。
			</p>
			<p>
				希望你能透過這個網站更了解我，也期待未來有機會一起合作，共創美好作品。
			</p>
		</div>

		<!-- 按鈕群組 -->
		<div class="button-group">
			<button class="btn" @click="activeTab = 'external'">外部網站</button>
			<button class="btn" @click="activeTab = 'test'">測驗</button>
		</div>

		<!-- 動態元件 -->
		<component :is="activeTabComponent" />
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ExternalSite from '../areas/about/ExternalSite.vue'
import TestSection from '../areas/about/TestSection.vue'

const activeTab = ref('test')

const activeTabComponent = computed(() => {
	return activeTab.value === 'external' ? ExternalSite : TestSection
})
</script>

<style scoped>
.about-page {
	max-width: 1200px;
	margin: 60px auto;
	padding: 0 20px;
	font-family: '標楷體';
	color: #333;
}

.about-page h2 {
	font-size: 36px;
	margin-bottom: 24px;
	border-bottom: 2px solid #333;
	padding-bottom: 8px;
}

.about-text {
	font-size: 18px;
	line-height: 1.8;
	text-align: justify;
	margin-bottom: 30px;
}

.about-text p {
	margin-bottom: 16px;
}

.button-group {
	display: flex;
	gap: 12px;
	margin-bottom: 20px;
}

.btn {
	flex: 1;
	padding: 10px 20px;
	font-size: 16px;
	cursor: pointer;
	border: 2px solid #333;
	background: white;
	color: #333;
	border-radius: 5px;
	transition: background-color 0.3s;
	user-select: none;
}

.btn:hover {
	background-color: #333;
	color: white;
}
</style>
