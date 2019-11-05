<template>
  <el-container class="index-con">
    <el-aside :class="showclass">
      <!--左侧菜单组件-->
      <LeftNav></LeftNav>
    </el-aside>
    <el-container class="main-con">
      <el-header class="index-header">
        <TopNav></TopNav>
      </el-header>
      <el-main class="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 导入组件/数据
import MenuData from "../components/MenuData.js";
import LeftNav from "../components/LeftNav";
import TopNav from "../components/TopNav";
export default {
  name: "Home",
  data() {
    return {
      showclass: "asideshow"
    };
  },
  // 注册组件
  components: {
    TopNav,
    LeftNav
  },
  methods: {},
  created() {},
  beforeUpdate() {},
  // 挂载前状态(里面是操作)
  beforeMount() {},
  beforeRouteEnter(to, from, next) {
    console.log("我从==哪里来", to);
    var self = this;
    var token = localStorage.getItem("logintoken");
    if (token) {
      console.log(token);
      next(vm => {
        console.log(to);
        vm.isId = to.path.replace("/views/HomePage", "");
      });
    } else {
      console.log(token);
      next({
        path: "/",
        query: { redirect: to.fullPath } //登录成功后重定向到当前页面
      });
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log("=======", key, keyPath);
    },
    handleOpen() {},
    handleClose() {}
  },
  watch: {
    $route(to, from) {
      this.isId = to.path.replace("/", "");
    }
  },
  created() {
    this.totalList = MenuData.childs;
  }
};
</script>
<style >
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.asideshow {
  width: 240px !important;
  height: 100%;
  background-color: #304156;
  border: none;
  margin: 0px;
}
.index-header {
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  z-index: 1;
  height: 50px !important;
}
.index-header,
.index-main {
  padding: 0px;
}
.index-main {
  background-color: rgb(246, 248, 251);
}
</style>
