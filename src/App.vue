<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
	widows: 100%;
	height: 100%;
}
button{outline:none;}
*{padding: 0;margin: 0;}
.fl{float: left;}
.fr{float: right;}
.ow{overflow: hidden;}
.dispF{display: flex;}
/* 页面content */
.content{
	margin: 24px 19px 0 19px;
	border-radius: 4px;
	background: #fff;
	padding-bottom: 24px;
	min-height: 668px;
}
/* 头部导航 */
	.navCrumbs{
		background: #fff;
		font-size: 18px;
		color: #000;
		opacity: .85;
		font-weight: bold;
		padding: 15px 20px;
		opacity: 0.85;
	}
	.navCrumbsChilen{
		background: #fff;
		font-size: 14px;
		color: #909399;
		padding: 16px 32px;
	}
	.nowNav{
		color: #2C3E50;
	}
/* 弹窗样式 */
.el-dialog__header span{
	font-size: 16px;
}
.el-dialog__header{
	height: 57px;
	line-height: 57px;
	padding: 0 0 0 24px;
	border-bottom: 1px solid #e8e8e8;
}
.el-dialog{
	border-radius: 4px;
}
.el-dialog__footer{
	padding: 20px;
	border-top: 1px solid #e8e8e8;
}
.el-dialog__footer span .el-button{
	padding: 9px 16px;
}
/*列表头部样式*/
.el-table th{
	padding: 7px 0;
	
}
.el-table thead{
	color:#000000;
	opacity: 0.85;
}
.has-gutter .is-leaf{
	background: #fafafa;
}
/* 弹窗样式 */
/* 分页字体颜色 */
.el-tabs__item{
	color: #808080;
}
/*分页标题会挡住弹窗*/
.el-tabs__nav{
	z-index: 0;
}
.el-table::before{
	z-index: 0;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
 
input[type="number"] {
    -moz-appearance: textfield;
}
</style>
