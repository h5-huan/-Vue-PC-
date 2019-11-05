<template>
  <div class="top-main header_T">
    <div class="top-nav ow fr">
      <div class="grid-content bg-purple">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-submenu index="1">
            <template slot="title">
              <img
                src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
                class="user-avatar"
              />
            </template>
            <el-menu-item index="14">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from "../../api/user";
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(keyPath);
      if (key == 14) {
        this.$confirm("是否退出登录？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            logout({}).then(res => {
              console.log(res);
              if(res.code==0){
                this.$router.push({
                  path: '/'
                })
                this.$message({
                  type: "success",
                  message: "退出!"
                });
                localStorage.removeItem('logintoken');
              }
			    	});
            
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消"
            });
          });
      }
    }
  }
};
</script>
<style>
.el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 50px;
    line-height: 50px;
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border: none;
}
.el-menu--popup-bottom-start {
  background: #ffffff;
}
.el-submenu__title {
  padding: 0 12px;
}
.el-menu.el-menu--horizontal {
  margin-left: 14px;
}
.top-main {
  height: 100%;
  background: #fff;
}
.user-avatar {
  width: 24px;
}
.user-item {
  width: 36px;
}
.el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
  display: none !important;
}
.cz-btn {
  border: none;
  width: 60px;
  line-height: 22px;
  background-color: #1890ff;
  border-radius: 2px;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
}
.top-nav div {
  float: left;
}
.top-box {
  height: 100%;
  line-height: 60px;
  cursor: pointer;
  margin-left: 26px;
}
.top-box > i {
  font-size: 20px;
  line-height: 62px;
  color: #595959;
}
.grid-content {
  margin-right: 32px;
}
.el-dialog__header span {
  font-size: 16px;
}
.inptF {
  margin-top: 24px;
}
.inptF1 {
  margin-top: 0;
}
.inptF > span {
  width: 96px;
  min-width: 96px;
  text-align: right;
  line-height: 32px;
  margin-right: 15px;
}
.el-dialog__wrapper .el-button span {
  font-size: 14px;
  margin-right: 0;
  padding: 0 10px;
}
.header_T .el-button {
  /* padding: 0 ; */
  margin-left: 15px;
}
.inptF .el-input {
  flex: 3;
  /* height: 32px; */
}
.inptF .el-button {
  height: 32px;
  line-height: 32px;
  padding: 0;
  text-align: center;
}
.el-input input {
  height: 32px;
}
.el-dialog__body {
  padding: 32px 47px 32px 0;
}
</style>
