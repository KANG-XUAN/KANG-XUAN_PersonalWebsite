<template>
	<div>
		<h2>專業能力</h2>
		<p>這裡是我擅長的技能與專業領域，涵蓋我在不同領域中的經驗與知識。</p>

		<div class="accordion" id="skillsAccordion">
			<skill-item v-for="skill in skills" :key="skill.id" :id="skill.id" :title="skill.title"
				:img-src="skill.imgSrc" :description="skill.description" />
		</div>
	</div>
</template>

<script>
import SkillItem from './SkillItemArea.vue'

export default {
	name: 'SkillArea',
	components: {
		SkillItem
	},
	data() {
		return {
			skills: [
				{
					id: 'collapseWord',
					title: 'Word',
					imgSrc: require('@/assets/images/icon/Word.png'),
					description: '我精通 Word 文書處理，能夠有效編排文檔、建立模板，並熟悉各種格式設置及自動化工具。',
				},
				{
					id: 'collapseExcel',
					title: 'Excel',
					imgSrc: require('@/assets/images/icon/Excel.png'),
					description: '我精通 Excel，能夠熟練使用各種公式、數據分析、VBA 編程等功能，有效處理各種數據報表與分析工作。',
				},
				{
					id: 'collapsePowerPoint',
					title: 'PowerPoint',
					imgSrc: require('@/assets/images/icon/PowerPoint.png'),
					description: '我擅長使用 PowerPoint 設計專業的簡報，並且熟悉各種視覺效果和動畫的應用，提升簡報效果。',
				},
				{
					id: 'collapseIllustrator',
					title: 'Adobe Illustrator',
					imgSrc: require('@/assets/images/icon/Illustrator.png'),
					description: '我擅長使用 Adobe Illustrator 進行矢量設計，從標誌設計到插圖創作都能駕輕就熟，能夠創建高品質的視覺效果。',
				},
				{
					id: 'collapseHtml',
					title: 'HTML',
					imgSrc: require('@/assets/images/icon/HTML.png'),
					description: '我精通 HTML 5，能夠根據需求設計語義清晰、結構合理的頁面，並且熟悉各種 HTML 元素和屬性，能在多平台上保持良好的兼容性。對響應式設計和 SEO 有深入了解。',
				},
				{
					id: 'collapseJava',
					title: 'Java',
					imgSrc: require('@/assets/images/icon/Java.png'),
					description: '我擅長 Java 編程，能開發各種應用程式，並掌握面向對象的設計與編程。熟悉使用 Java 進行桌面應用和後端開發。',
				},
				{
					id: 'collapseVue',
					title: 'VUE2',
					imgSrc: require('@/assets/images/icon/Vue2.png'),
					description: '我擅長使用 Vue2 開發單頁應用程式，並且熟悉其數據綁定、組件化開發和路由管理等功能，能有效提升應用的可維護性和擴展性。',
				},
				{
					id: 'collapseNodeJS',
					title: 'Node.js',
					imgSrc: require('@/assets/images/icon/NodeJS.png'),
					description: '我熟悉 Node.js，能夠使用它來構建高效能的後端服務，並且有豐富的經驗處理 API 開發、數據庫連接與非同步處理等。',
				},
				{
					id: 'collapseCloudDeployment',
					title: '雲端部署',
					imgSrc: require('@/assets/images/icon/Cloud.png'),
					description: '熟悉各大雲端平台（如 AWS、Azure、GCP）的部署與管理，能夠高效配置雲端環境，實現應用程式的無縫部署與可擴展性。',
				},
			]
		}
	}
}
</script>