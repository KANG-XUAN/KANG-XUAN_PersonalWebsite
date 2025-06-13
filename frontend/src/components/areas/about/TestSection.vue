<template>
	<div class="accordion-section">
		<div v-for="(item, index) in testItems" :key="index" class="accordion-item">
			<div class="accordion-header" @click="toggleItem(index)">
				<h3>
					{{ item.title }}
					<a :href="item.pdfUrl.split('#')[0]" download class="download-btn" @click.stop>下載</a>
				</h3>
				<span>{{ activeIndex === index ? '▲' : '▼' }}</span>
			</div>
			<transition name="accordion">
				<div v-show="activeIndex === index" class="accordion-body">
					<iframe :src="item.pdfUrl" frameborder="0" width="100%" height="600px"></iframe>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	name: "TestSection",
	data() {
		return {
			activeIndex: 0,
			testItems: [
				{
					title: '九大職能星測驗報告',
					pdfUrl: '/pdf/九大職能星報告_20250611.pdf#navpanes=0&toolbar=0&view=FitH'
				}
			]
		};
	},
	methods: {
		toggleItem(index) {
			this.activeIndex = this.activeIndex === index ? null : index;
		}
	}
};
</script>

<style scoped>
.accordion-section {
	border: 2px solid #333;
	border-radius: 6px;
	padding: 10px;
}

.accordion-item+.accordion-item {
	margin-top: 10px;
}

.accordion-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	padding: 10px;
	background-color: #f8f8f8;
	border: 1px solid #ccc;
}

.accordion-header h3 {
	display: flex;
	align-items: center;
	gap: 10px;
	margin: 0;
	font-size: 20px;
}

.accordion-body {
	padding: 10px;
}

.accordion-enter-active,
.accordion-leave-active {
	transition: all 0.3s ease;
}

.accordion-enter,
.accordion-leave-to {
	opacity: 0;
	transform: scaleY(0.95);
}

.download-btn {
	margin-left: 12px;
	padding: 6px 12px;
	background-color: #333;
	color: white;
	text-decoration: none;
	border-radius: 4px;
	font-size: 14px;
	transition: background-color 0.3s ease, transform 0.2s ease;
	border: none;
	cursor: pointer;
}

.download-btn:hover {
	background-color: #555;
	transform: scale(1.05);
}
</style>
