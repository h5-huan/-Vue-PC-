/**
* 左边菜单
*/ 
<template>
  <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened 
		  class="el-menu-vertical-demo" 
	
		  text-color="#fff" 
		  active-text-color="#ffd04b">
	<div class="logobox">
		直播后台
    </div>
	<template  v-for="menu in allmenu" >
		<el-menu-item :index="'/'+menu.url" :key="menu.menuid" v-if="!menu.menus">
		  <i class="iconfont" :class="menu.icon"></i>
		  <span>{{menu.menuname}}</span>
		</el-menu-item>
		
		<el-submenu :key="menu.menuid" :index="menu.menuname" v-if="menu.menus">
		  <template slot="title">
			<i class="iconfont" :class="menu.icon"></i>
			<span>{{menu.menuname}}</span>
		  </template>
		  <el-menu-item-group>
			<el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid"> 
			  <i class="iconfont" :class="chmenu.icon"></i>
			  <span>{{chmenu.menuname}}</span>
			</el-menu-item>
		  </el-menu-item-group>
		</el-submenu>
	</template>
	
  </el-menu>
</template>
<script>
import { menu } from '@/api/user'
export default {
  name: 'leftnav',
  data() {
    return {
      collapsed: false,
      allmenu: []
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    // 获取图形验证码
    let res = {
      success: true,
      data: [
		{
          menuid:8,
          icon: 'el-icon-s-marketing',
          menuname: '统计图',
          hasThird: null,
          url: 'views/Echart',
		  menus: null
        },
		{
			menuid:1,
			icon: 'el-icon-menu',
			menuname: '轮播图列表',
			hasThird: null, 
			url: 'views/HomePage',
			menus: null
		},
		{
          menuid:6,
          icon: 'el-icon-s-custom',
          menuname: '教师管理',
          hasThird: null,
          url: 'views/WorkRecord',
		  menus: null
        },
		{
		  menuid:7,
		  icon: 'el-icon-document',
		  menuname: '课程管理',
		  hasThird: null,
		  url: 'views/TSManagemen',
		  menus: null
		},
		{
			menuid: 2,
			icon: 'el-icon-user-solid',
			menuname: '用户管理',
			hasThird: null,
			url: '',
			menus: [
				{
				  menuid: 3,
				  icon: '',
				  menuname: '用户列表',
				  hasThird: 'N',
				  url: 'RechargeS/VoucherCenter',
				  menus: null
				},
				 {
				  menuid: 4,
				  icon: '',
				  menuname: '反馈列表',
				  hasThird: 'N',
				  url: 'RechargeS/ConsumptionAll',
				  menus: null
				},
				 {
				  menuid: 5,
				  icon: '',
				  menuname: '搜索关键词列表',
				  hasThird: 'N',
				  url: 'RechargeS/Invoice',
				  menus: null
				},
			]
        },
		{
		  menuid:9,
		  icon: 'el-icon-s-order',
		  menuname: '课程节数管理',
		  hasThird: null,
		  url: 'views/CampusManagemen',
		  menus: null
		},
		{
		  menuid:10,
		  icon: 'el-icon-s-platform',
		  menuname: '后台管理',
		  hasThird: null,
		  url: 'views/TextbookS',
		  menus: null
		}
      ],
      msg: 'success'
    }
		this.allmenu = res.data
    
    // menu(localStorage.getItem('logintoken'))
    //   .then(res => {
    //     console.log(JSON.stringify(res))
    //     if (res.success) {
    //       this.allmenu = res.data
    //     } else {
    //       this.$message.error(res.msg)
    //       return false
    //     }
    //   })
    //   .catch(err => {
    //     this.$message.error('菜单加载失败，请稍后再试！')
    //   })
    // 监听
//     this.$root.Bus.$on('toggle', value => {
//       this.collapsed = !value
//     })
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
} 
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu {
  background-color: #304156 !important;
  border: none;
}
.logobox {
    height: 60px;
    line-height: 60px;
    background: #304156;
    font-size: 20px;
	text-align: center;
	color: #fff;
}
.el-menu-item.is-active {
   background-color: rgba(24,144,255,.3) !important;
   color:#FFFFFF !important;
}
.el-menu-item-group{
	background: #304156;
}
.el-menu-vertical-demo{
	background: #304156;
}
.el-submenu__title:hover{
  background-color: rgba(24,144,255,.3) !important;
}
.el-menu-item:hover{
  background-color: rgba(24,144,255,.3) !important;
}
.el-menu-item i,.el-submenu__title i{
	color:#FFFFFF;
}
</style>