<template>
  <div class="home-main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'Echart' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-button type="primary" @click="reload">刷新数据</el-button>
      <el-button type="success" icon="el-icon-edit" @click="createadmin">添加管理</el-button>
    </el-row>
    <el-table ref="filterTable" :data="tableData" style="width: 100%;text-align:center;">
      <el-table-column prop="avatar" label="头像" width="130">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt />
        </template>
      </el-table-column>
      <el-table-column prop="username" label="名称"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="created_at" label="创建时间"></el-table-column>
      <el-table-column prop="updated_at" label="更新时间"></el-table-column>
      <el-table-column prop="tag" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row)" size="small">编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handdelete(scope.row)"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 弹窗 -->
    <el-dialog :title="types==1 ? '修改管理' : '添加管理'" :visible.sync="dialogFlag">
      <el-form :model="datas">
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="host+'admin/upload'"
            name="avatar"
            :headers="gettoken"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="datas.avatar" :src="datas.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="datas.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="types==2" label="密码" :label-width="formLabelWidth">
          <el-input v-model="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="datas.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeCurrentDia">关 闭</el-button>
        <el-button type="primary" @click="nextProcessSure()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { admin, editadmin ,addadmin,deladmin } from "../../api/user";
import { loginUrl } from "../../utils/global";
export default {
  data() {
    return {
      page: 1,
      tableData: [],
      datas: {},
      password: "",
      ormLabelWidth: "90px",
      currentPage: 10,
      totalpage: "",
      total: "",
      dialogFlag: false,
      types: "",
      formLabelWidth: "90px",
      gettoken:{
        "Authorization":localStorage.getItem('logintoken')
      },
      host:loginUrl
    };
  },
  beforeCreate() {},
  created() {
    this.datalist();
  },
  beforeUpdate() {},
  methods: {
    //课程列表
    datalist() {
      admin(this.page).then(res => {
        this.tableData = res.data;
        this.totalpage = res.total;
        this.currentPage = res.per_page;
        this.total = parseInt(res.total);
        console.log("管理列表数据");
        console.log(res);
      });
    },
    //排序
    handleChange(value) {
      console.log(value);
    },
    //刷新
    reload() {
      this.page = 1;
      this.datalist();
    },
    //编辑课程
    edit(row) {
      this.dialogFlag = true;
      this.types = 1;
      this.datas = row;
      console.log(row);
    },
    //添加课程
    createadmin() {
      this.datas = {
        avatar: "",
        username: "",
        email: ""
      };
      this.password = "";
      this.dialogFlag = true;
      this.types = 2;
    },
    //删除课程
    handdelete(row) {
      console.log(row);
      this.$confirm("是否删除此管理?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deladmin(row.id, {}).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.datalist();
            }
          });
        })
        .catch(() => {});
    },
    //关闭
    closeCurrentDia() {
      this.dialogFlag = false;
    },
    //确定
    nextProcessSure() {
      var types = this.types;
      var avatar = this.datas.avatar;
      var username = this.datas.username;
      var email = this.datas.email;
      var password = this.password;
      var send = {
        avatar: avatar,
        username: username,
        email: email
      };
      if (types == 1) {
        if (!avatar) {
          this.$message.error("请上传头像！");
        } else if (!username) {
          this.$message.error("请填写名称！");
        } else if (!email) {
          this.$message.error("请填写邮箱！");
        } else {
          editadmin(this.datas.id, send).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.dialogFlag = false;
              this.$message({
                message: "修改管理成功",
                type: "success"
              });
              this.datalist();
            }
          });
        }
      } else {
        if (!avatar) {
          this.$message.error("请上传头像！");
        } else if (!username) {
          this.$message.error("请填写名称！");
        } else if (!password) {
          this.$message.error("请填写密码！");
        } else if (!email) {
          this.$message.error("请填写邮箱！");
        } else {
          send.password=password;
          addadmin(send).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.dialogFlag = false;
              this.$message({
                message: "添加管理成功",
                type: "success"
              });
              this.datalist();
            }
          });
        }
      }
    },
    //脚步按钮
    handleCurrentChange(val) {
      this.page = val;
      this.datalist();
    },
    handleAvatarSuccess(res, file) {
      console.log('图片上传成功的返回');
      console.log(res);
      console.log(file);
      var imgurl = res.url;
      this.datas.avatar = imgurl;
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped>
.home-main {
  padding: 24px;
}
.el-row {
  margin: 20px 0;
}
.el-row .el-button {
  padding: 10px 15px;
}
.el-button--text {
  padding: 10px;
}
.el-table td,
.el-table th {
  text-align: center;
}
.el-table .cell img {
  width: 100px;
  height: 100px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.el-form[data-v-7ca46e02] {
  margin: 0;
}
.el-form--label-left .el-form-item__label {
  width: 130px !important;
}
.el-dialog__body {
  padding: 32px 24px;
}
.el-dialog {
  width: 500px;
}
.el-form {
  margin: 20px 0;
}
.el-form-item__label {
  text-align: left;
}

.el-button + .el-button {
  margin-left: 0;
  margin-top: 15px;
}
.el-form--inline .el-form-item__content {
  width: 80% !important;
}
.el-pagination {
  margin: 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.el-input-number .el-input__inner {
  height: 40px;
}
/* 弹窗 */
.el-dialog__body {
  padding: 32px 24px;
}
.el-dialog {
  width: 500px;
}
.el-form {
  margin: 20px 0;
}
.avatar-uploader {
  width: 180px;
  height: 180px;
  overflow: hidden;
}
.avatar-uploader .el-upload {
  width: 100%;
  height: 100%;
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  width: 100%;
  height: 100%;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
.el-form-item__label {
  text-align: left;
}
.el-input input {
  height: 40px;
}
.line {
  text-align: center;
}
</style>
<style>
.el-dialog__body {
  padding: 32px 24px !important;
}
.el-upload{
  border: 1px dashed #e7e7e7;
}
.el-input input {
    height: 40px;
}
</style>