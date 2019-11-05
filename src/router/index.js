import Vue from 'vue'
import Router from 'vue-router'
import {getStore} from '../utils/utils'

import Login from '@/views/Login' //登录
import Home from '@/views/Home' //首页
import Echart from '@/views/Echart' //统计图
import HomePage from '@/views/HomePage' //轮播图别表

import VoucherCenter from '@/views/RechargeS/VoucherCenter' //充值中心
import ConsumptionAll from '@/views/RechargeS/ConsumptionAll' //消费总览
import Invoice from '@/views/RechargeS/Invoice' //发票管理

import WorkRecord from '@/views/WorkRecord' //考勤管理
import TSManagemen from '@/views/TSManagemen' //师生管理
import ClassManagemen from '@/views/ClassManagemen' //班级管理
import CampusManagemen from '@/views/CampusManagemen' //校区管理

import TextbookS from '@/views/TextbookS' //教材库

Vue.use(Router);

// 导出路由 
export default new Router({
	routes: [{
			path: '/',
			name: '',
			component: Login,
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
		},
		{
			path: '/Home',
			name: 'Home',
			component: Home,
			children:[{
					path: '/views/HomePage',
					name: 'HomePage',
					component: HomePage,
					meta: {
						requireAuth: true
					}
				},{
					path: '/views/Echart',
					name: 'Echart',
					component: Echart,
					meta: {
						requireAuth: true
					}
				},{
					path: '/RechargeS/VoucherCenter',
					name: 'VoucherCenter',
					component: VoucherCenter,
					meta: {
						requireAuth: true
					}
				},{
					path: '/RechargeS/ConsumptionAll',
					name: 'ConsumptionAll',
					component: ConsumptionAll,
					meta: {
						requireAuth: true
					}					
				},{
					path: '/RechargeS/Invoice',
					name: 'Invoice',
					component: Invoice,
					meta: {
						requireAuth: true
					}
				},{
					path: '/views/WorkRecord',
					name: 'WorkRecord',
					component: WorkRecord,
					meta: {
						requireAuth: true
					}
				},{
					path: '/views/TSManagemen',
					name: 'TSManagemen',
					component: TSManagemen,
					meta: {
						requireAuth: true
					}
				},{
					path: '/views/ClassManagemen',
					name: 'ClassManagemen',
					component: ClassManagemen,
					meta: {
						requireAuth: true
					}
				},{
					path: '/views/CampusManagemen',
					name: 'CampusManagemen',
					component: CampusManagemen,
					meta: {
						requireAuth: true
					}
				},{
					path: '/views/TextbookS',
					name: 'TextbookS',
					component: TextbookS,
					meta: {
						requireAuth: true
					}
				}]
		},
	]
})
