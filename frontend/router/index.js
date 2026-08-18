// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'

import IndexView from '@/views/IndexView.vue'
import ProfessionalView from '@/views/ProfessionalView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import PortfolioToolsView from '@/views/Portfolio_ToolsView.vue'
import PortfolioWebView from '@/views/Portfolio_WebView.vue'
import PortfolioWritingView from '@/views/Portfolio_WritingView.vue'
import AboutView from '@/views/AboutView.vue'
import AdminView from '@/views/AdminView.vue'

const routes = [
	{
		path: '/',
		name: 'Index',
		component: IndexView,
		meta: {
			title: '亘的拾光誌',
			description: '康亘翔的個人網站，展示網頁開發、程式設計、文字創作與個人作品集。',
		},
	},

	{
		// 專業
		path: '/professional',
		name: 'Professional',
		component: ProfessionalView,
		meta: {
			title: '專業技能｜亘的拾光誌',
			description: '康亘翔的專業技能與網頁開發相關經驗。',
		},
	},
	{
		// 作品集
		path: '/portfolio',
		name: 'Portfolio',
		component: PortfolioView,
		meta: {
			title: '作品集｜亘的拾光誌',
			description: '康亘翔的個人作品集，包含網頁作品、文字創作與小工具。',
		},
	},
	{
		// 作品集 - Tools
		path: '/portfolio/tools',
		name: 'PortfolioTools',
		component: PortfolioToolsView,
		meta: {
			title: '小工具｜亘的作品集',
			description: '康亘翔製作的實用小工具與程式作品。',
		},
	},
	{
		// 作品集 - Web
		path: '/portfolio/web',
		name: 'PortfolioWeb',
		component: PortfolioWebView,
		meta: {
			title: '網頁作品｜亘的作品集',
			description: '康亘翔製作的網站與網頁開發作品。',
		},
	},
	{
		// 作品集 - Writing
		path: '/portfolio/writing',
		name: 'PortfolioWriting',
		component: PortfolioWritingView,
		meta: {
			title: '文字創作｜亘的作品集',
			description: '康亘翔的小說、文章與其他文字創作。',
		},
	},
	{
		// 關於我
		path: '/about',
		name: 'About',
		component: AboutView,
		meta: {
			title: '關於我｜亘的拾光誌',
			description: '關於康亘翔的個人介紹、經歷與相關資訊。',
		},
	},

	{
		// 管理頁
		path: '/admin',
		name: 'Admin',
		component: AdminView,
		meta: {
			title: '管理頁｜亘的拾光誌',
			description: '網站管理頁面。',
			robots: 'noindex, nofollow',
		},
	},

	{
		// 作品集底下不存在的頁面 → 回作品集
		path: '/portfolio/:pathMatch(.*)*',
		redirect: '/portfolio',
	},
	{
		// 其他錯誤頁 → 回首頁
		path: '/:pathMatch(.*)*',
		redirect: '/',
	},
]


const router = createRouter({
	history: createWebHashHistory(),
	routes,
	// 網址跳轉都到最上面
	scrollBehavior() {
		return {
			top: 0
		}
	}
})

/* =========================
 * SEO
 * ========================= */
router.afterEach((to) => {

	// 更新網頁標題
	document.title = to.meta.title || '亘的拾光誌'

	// 更新 description
	const description = document.querySelector(
		'meta[name="description"]'
	)

	if (description && to.meta.description) {
		description.setAttribute(
			'content',
			to.meta.description
		)
	}

	// 更新 robots
	const robots = document.querySelector(
		'meta[name="robots"]'
	)

	if (robots) {
		robots.setAttribute(
			'content',
			to.meta.robots || 'index, follow'
		)
	}
})

export default router
