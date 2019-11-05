<template>
  <div class="home-main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'Echart' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-button type="primary" @click="reload">刷新数据</el-button>
      <el-button type="success" icon="el-icon-edit" @click="createlesson">添加课程</el-button>
    </el-row>
    <el-table ref="filterTable" :data="tableData" style="width: 100%;text-align:center;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="讲师昵称：">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="是否推荐：">
              <span>{{ props.row.is_recommend }}</span>
            </el-form-item>
            <el-form-item label="课程详情：">
              <span v-html="props.row.introduction"></span>
            </el-form-item>
            <el-form-item label="课程节数：">
              <span>{{ props.row.lesson_num }}</span>
            </el-form-item>
            <el-form-item label="创建时间：">
              <span>{{ props.row.created_at }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="cover" label="封面" width="130">
        <template slot-scope="scope">
          <img :src="scope.row.cover" alt />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="status" label="状态" width="70"></el-table-column>
      <el-table-column prop="bespeak_num" label="预约人数"></el-table-column>
      <el-table-column prop="start_time" label="开播时间"></el-table-column>
      <el-table-column prop="updated_at" label="更新时间"></el-table-column>
      <el-table-column prop="tag" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-edit" @click="addcourselist(scope.row)" size="small" >添加课程节数</el-button>
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
    <!-- 添加课程弹窗 -->
    <el-dialog :title="types==1 ? '编辑课程' : '添加课程'" :visible.sync="dialogFlag">
      <el-form :model="datas">
        <el-form-item label="封面" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="host+'lesson/upload'"
            name="cover"
            :headers="gettoken"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="datas.cover" :src="datas.cover" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="datas.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="datas.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio-group v-model="datas.status">
            <el-radio label="未开播">未开播</el-radio>
            <el-radio label="开播中">开播中</el-radio>
            <el-radio label="完结">完结</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否推荐" :label-width="formLabelWidth">
          <el-radio-group v-model="datas.is_recommend">
            <el-radio label="否">否</el-radio>
            <el-radio label="是">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开播时间" :label-width="formLabelWidth">
          <el-date-picker v-model="datas.start_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="选择教师" :label-width="formLabelWidth">
          <el-select v-model="teacherid" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程详情" :label-width="formLabelWidth">
          <div class="edit_container">
            <quill-editor
              v-model="datas.introduction"
              ref="myQuillEditor"
              class="editer"
              :options="editorOption"
              @ready="onEditorReady($event)"
            ></quill-editor>
          </div>
          <!-- <el-input type="textarea" v-model="datas.introduction" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="课程节数" :label-width="formLabelWidth">
          <el-input-number v-model="datas.lesson_num" @change="handleChange" :min="0" label="描述文字"></el-input-number>
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
import { lesson, editlesson, addlesson, dellesson,teacherselect} from "../../api/user";
import { loginUrl } from "../../utils/global";
import { timestampToTime } from "../../utils/utils";
import { quillEditor } from "vue-quill-editor";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import '../../assets/font.css';
export default {
  data() {
    return {
      page: 1,
      tableData: [],
      datas: {},
      value1: "",
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
      options:[],
      teacherid:"",
      editorOption: {}
    };
  },
  components: {
    quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  beforeCreate() {},
  created() {
    this.datalist();
    this.teacherlist();
  },
  beforeUpdate() {},
  methods: {
    //课程列表
    datalist() {
      lesson(this.page ).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].status == 0) {
            res.data[i].status = "未开播";
          } else if (res.data[i].status == 1) {
            res.data[i].status = "开播中";
          } else if (res.data[i].status == 2) {
            res.data[i].status = "完结";
          }
          if (res.data[i].is_recommend == 0) {
            res.data[i].is_recommend = "否";
          } else {
            res.data[i].is_recommend = "是";
          }
          this.tableData = res.data;
        }
        this.totalpage = res.total;
        this.currentPage = res.per_page;
        this.total = parseInt(res.total);
        console.log("课程数据");
        console.log(res);
      });
    },
    //教师列表
    teacherlist(){
      teacherselect({}).then(res => {
        this.options=res;
         console.log('教师啊啊啊');
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
    //添加课程
    createlesson() {
      this.datas = {
        cover: "",
        title: "",
        price: "",
        status: "未开播",
        is_recommend: "否",
        start_time: "",
        introduction: "",
        lesson_num: 0
      };
      this.dialogFlag = true;
      this.teacherid="";
      this.types = 2;
    },
    //添加课程节数
    addcourselist(row) {
      this.$router.push({
        path: "/views/CampusManagemen"
      });
    },
    //编辑课程
    edit(row) {
      this.dialogFlag = true;
      this.types = 1;
      this.datas = row;
      this.teacherid = row.teacher_id;
      console.log(row);
      
    },
    //删除课程
    handdelete(row) {
      console.log(row);
      this.$confirm("是否删除此课程?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          dellesson(row.id, {}).then(res => {
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
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    //确定
    nextProcessSure() {
      var types = this.types;
      var cover = this.datas.cover;
      var title = this.datas.title;
      var price = this.datas.price;
      var status = this.datas.status; ///
      var is_recommend = this.datas.is_recommend; ///
      var start_time = timestampToTime(this.datas.start_time);
      var introduction = this.datas.introduction;
      var lesson_num = this.datas.lesson_num;
      var teacherid=this.teacherid;
      var send = {
        cover: cover,
        title: title,
        price: price,
        start_time: start_time,
        introduction: introduction,
        lesson_num: lesson_num,
        teacher_id:teacherid
      };
      if (status == "未开播") {
        send.status = 0;
      } else if (status == "开播中") {
        send.status = 1;
      } else if (status == "完结") {
        send.status = 2;
      }
      if (is_recommend == "否") {
        send.is_recommend = 0;
      } else if (is_recommend == "是") {
        send.is_recommend = 1;
      }
      console.log("添加课程");
      console.log(JSON.stringify(send));
      if (!cover) {
        this.$message.error("请上传封面！");
      } else if (!title) {
        this.$message.error("请填写标题！");
      } else if (!price) {
        this.$message.error("请填写价格！");
      } else if (!status) {
        this.$message.error("请选择状态！");
      } else if (!is_recommend) {
        this.$message.error("请选择是否推荐！");
      } else if (!start_time || start_time == "NaN-NaN-NaN NaN:NaN:NaN") {
        this.$message.error("请选择开播时间！");
      } else if (!teacherid) {
        this.$message.error("请选择教师！");
      } else if (!introduction) {
        this.$message.error("请填写课程详情！");
      } else {
        console.log(JSON.stringify(send));
        if (types == 1) {
          editlesson(this.datas.id, send).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.dialogFlag = false;
              this.$message({
                message: "修改课程成功",
                type: "success"
              });
              this.datalist();
            }
          });
        } else {
          send.teacher_id=teacherid;
          addlesson(send).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.dialogFlag = false;
              this.$message({
                message: "课程添加成功",
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
      var imgurl = res.url;
      this.datas.cover = imgurl;
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
    //文本框
    onEditorReady(editor) {
      console.log(editor);
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
.el-textarea__inner{
  height: 80px;
}
.el-input input {
  height: 40px;
}
</style>