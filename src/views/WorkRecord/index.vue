<template>
  <div class="home-main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'Echart' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教师列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-button type="primary" @click="reload">刷新数据</el-button>
      <el-button type="success" icon="el-icon-edit" @click="createteacher">添加教师</el-button>
    </el-row>
    <el-table ref="filterTable" :data="tableData" style="width: 100%;text-align:center;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="身份：">
              <span>{{ props.row.identity }}</span>
            </el-form-item>
            <el-form-item label="副标题：">
              <span>{{ props.row.subtitle }}</span>
            </el-form-item>
            <el-form-item label="简介：">
              <span v-html="props.row.introduction"></span>
            </el-form-item>
            <el-form-item label="性别：">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="用户open_id：">
              <span>{{ props.row.open_id }}</span>
            </el-form-item>
            <el-form-item label="创建时间：">
              <span>{{ props.row.created_at }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="avatar" label="头像" width="130">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt />
        </template>
      </el-table-column>-->
      <el-table-column prop="name" label="教师名称"></el-table-column>
      <!-- <el-table-column prop="phone" label="手机号"></el-table-column> -->
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="updated_at" label="更新时间"></el-table-column>
      <el-table-column prop="tag" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-edit" @click="addcourse(scope.row)" size="small" >添加课程</el-button>
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
    <!-- 添加教师弹窗 -->
    <el-dialog :title="types==1 ? '编辑教师' : '添加教师'" :visible.sync="dialogFlag">
      <el-form :model="datas">
        <!-- <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="host+'teacher/upload'"
            name="avatar"
            :headers="gettoken"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="datas.avatar" :src="datas.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>-->
        <el-form-item label="教师名称" :label-width="formLabelWidth">
          <el-input v-model="datas.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份" :label-width="formLabelWidth">
          <el-input v-model="datas.identity" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="副标题" :label-width="formLabelWidth">
          <el-input v-model="datas.subtitle" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="简介" :label-width="formLabelWidth">
          <div class="edit_container">
            <quill-editor
              v-model="datas.introduction"
              ref="myQuillEditor"
              class="editer"
              :options="editorOption"
              @ready="onEditorReady($event)"
            ></quill-editor>
          </div>
        </el-form-item>
        <!-- <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="datas.phone" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="datas.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
          <!-- <el-input v-model="datas.sex" autocomplete="off"></el-input> -->
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
import { teacher, editteacher, addteacher, delteacher } from "../../api/user";
import { timestampToTimes } from "../../utils/utils.js";
import { loginUrl } from "../../utils/global";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "../../assets/font.css";
export default {
  data() {
    return {
      page: 1,
      tableData: [],
      datas: {},
      ormLabelWidth: "90px",
      currentPage: 10,
      totalpage: "",
      total: "",
      dialogFlag: false,
      types: "",
      formLabelWidth: "90px",
      gettoken: {
        Authorization: localStorage.getItem("logintoken")
      },
      host: loginUrl,
      editorOption: {}
    };
  },
  components: {
    quillEditor
  },
  created() {
    this.datalist();
  },
  beforeCreate() {},
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    //轮播图列表
    datalist() {
      teacher(this.page).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].sex == 1) {
            res.data[i].sex = "男";
          } else {
            res.data[i].sex = "女";
          }
          this.tableData = res.data;
        }
        this.totalpage = res.total;
        this.currentPage = res.per_page;
        this.total = parseInt(res.total);
        console.log("教师数据");
        console.log(res);
      });
    },
    handleAvatarSuccess(res, file) {
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
    },
    //脚步按钮
    handleCurrentChange(val) {
      this.page = val;
      this.datalist();
    },
    //刷新
    reload() {
      this.page = 1;
      this.datalist();
    },
    //删除教师
    handdelete(row) {
      console.log(row);
      this.$confirm("是否删除此教师?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delteacher(row.id, {}).then(res => {
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
    //编辑教师
    edit(row) {
      this.dialogFlag = true;
      this.types = 1;
      this.datas = row;
      console.log("点击编辑的数据");
      console.log(this.datas);
    },
    //添加课程
    addcourse(row) {
      this.$router.push({
        path: "/views/TSManagemen"
      });
    },
    //添加教师
    createteacher() {
      this.datas = {
        avatar: "",
        name: "",
        identity: "",
        subtitle: "",
        introduction: "",
        phone: "",
        sex: "男"
      };
      this.dialogFlag = true;
      this.types = 2;
    },
    //关闭
    closeCurrentDia() {
      this.dialogFlag = false;
    },
    //添加教师确定
    nextProcessSure() {
      var types = this.types;
      // var avatar = this.datas.avatar;
      var name = this.datas.name;
      var identity = this.datas.identity;
      // var subtitle = this.datas.subtitle;
      var introduction = this.datas.introduction;
      // var phone = this.datas.phone;
      var sex = this.datas.sex;
      var send = {
        name: name,
        identity: identity,
        introduction: introduction
      };
      if (sex == "男") {
        send.sex = 1;
      } else {
        send.sex = 2;
      }
      if (!name) {
        this.$message.error("请填写您的姓名！");
      } else if (!identity) {
        this.$message.error("请填写您的身份！");
      } else if (!introduction) {
        this.$message.error("请填写您的简介！");
      } else {
        console.log(JSON.stringify(send));
        if (types == 1) {
          editteacher(this.datas.id, send).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.dialogFlag = false;
              this.$message({
                message: "修改教师成功",
                type: "success"
              });
            }
          });
        } else {
          addteacher(send).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.dialogFlag = false;
              this.$message({
                message: "教师添加成功",
                type: "success"
              });
              this.datalist();
            }
          });
        }
      }
    },
    //文本框
    onEditorReady(editor) {
      console.log(editor);
    }
  }
};
</script>
<style>
.el-textarea__inner {
  height: 80px;
}
.el-upload{
  border: 1px dashed #e7e7e7;
}
.el-input input {
    height: 40px;
}
</style>
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
.el-input input {
  height: 40px;
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
</style>
