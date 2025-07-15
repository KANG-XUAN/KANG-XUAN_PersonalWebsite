// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'

import IndexView from '@/views/IndexView.vue'
import InterestView from '@/views/InterestView.vue'
import ProfessionalView from '@/views/ProfessionalView.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
	{
		path: '/',
		name: 'Index',
		component: IndexView,
	},
	{
		path: '/interest',
		name: 'Interest',
		component: InterestView,
	},
	{
		path: '/professional',
		name: 'Professional',
		component: ProfessionalView,
	},
	{
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
