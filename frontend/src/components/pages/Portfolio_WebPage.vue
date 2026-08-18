<template>
	<div class="portfolio-page">

		<!-- DEMO 切換器 -->
		<div class="demo-switcher">

			<span style="color: white;">測試樣式</span>
			<button :class="{ active: currentDemo === 'default' }" @click="currentDemo = 'default'">
				Editing
			</button>

			<button :class="{ active: currentDemo === 'demo1' }" @click="currentDemo = 'demo1'">
				DEMO 1
			</button>

			<button :class="{ active: currentDemo === 'demo2' }" @click="currentDemo = 'demo2'">
				DEMO 2
			</button>

			<button :class="{ active: currentDemo === 'old' }" @click="currentDemo = 'old'">
				舊版
			</button>

		</div>


		<!-- 分頁內容 -->
		<div class="tab-content container mb-5">

			<component :is="currentComponent" />

		</div>

	</div>
</template>


<script setup>
import { computed, ref } from 'vue'

import Portfolio_WebArea from '../areas/portfolio/web/Portfolio_WebArea.vue'
import PortfolioListOLD from '../areas/portfolio/web/PortfolioList_OLD.vue'
import PortfolioListDemo1 from '../areas/portfolio/web/PortfolioList_DEMO1.vue'
import PortfolioListDemo2 from '../areas/portfolio/web/PortfolioList_DEMO2.vue'


const currentDemo = ref('default')


const currentComponent = computed(() => {

	switch (currentDemo.value) {

		case 'demo1':
			return PortfolioListDemo1

		case 'demo2':
			return PortfolioListDemo2

		case 'old':
			return PortfolioListOLD

		default:
			return Portfolio_WebArea

	}

})
</script>


<style scoped>
.demo-switcher {

	position: fixed;

	right: 0;
	bottom: 0;

	display: flex;

	padding: 5px;

	gap: 4px;

	background:
		rgba(30, 30, 30, 0.9);

	border:
		1px solid rgba(255, 255, 255, 0.15);

	border-radius: 8px;

	box-shadow:
		0 5px 20px rgba(0, 0, 0, 0.25);

	z-index: 9999;

	backdrop-filter:
		blur(8px);

}


.demo-switcher button {

	border: none;

	background:
		transparent;

	color:
		#aaa;

	padding:
		8px 12px;

	border-radius: 5px;

	font-size:
		12px;

	cursor:
		pointer;

	transition:
		0.2s;

}


.demo-switcher button:hover {

	color:
		#fff;

	background:
		rgba(255, 255, 255, 0.1);

}


.demo-switcher button.active {

	background:
		#fff;

	color:
		#222;

}
</style>