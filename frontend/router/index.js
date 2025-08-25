// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'

import IndexView from '@/views/IndexView.vue'
import InterestView from '@/views/InterestView.vue'
import ProfessionalView from '@/views/ProfessionalView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
	{
		path: '/',
		name: 'Index',
		component: IndexView,
	},
	{	// 興趣
		path: '/interest',
		name: 'Interest',
		component: InterestView,
	},
	{	// 專業
		path: '/professional',
		name: 'Professional',
		component: ProfessionalView,
	},
	{	// 作品集
		path: '/portfolio',
		name: 'Portfolio',
		component: PortfolioView,
	},
	{	// 關於我
		path: '/about',
		name: 'About',
		component: AboutView,
	},
	{
		path: '/:pathMatch(.*)*', // 錯誤頁導回首頁
		redirect: '/',
	},
]

const router = createRouter({
	history: createWebHashHistory(), // 用 hash 模式，適合 GitHub Pages
	routes,
})

export default router
