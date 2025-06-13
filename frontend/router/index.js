import Vue from 'vue';
import Router from 'vue-router';

import IndexView from '@/views/IndexView.vue';
import InterestView from '@/views/InterestView.vue';
import ProfessionalView from '@/views/ProfessionalView.vue';
import AboutView from '@/views/AboutView.vue';


Vue.use(Router);

const router = new Router({
	mode: 'history',  // 或用 'hash'，看你需求
	routes: [
		{	// 錯誤導向
			path: '*',	
			redirect: '/',
		},
		{	// 根目錄(開啟位置)
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
	],
});

export default router;
