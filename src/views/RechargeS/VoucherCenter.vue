<template>
  <div class="home-main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'Echart' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-button type="primary" @click="reload">刷新数据</el-button>
    </el-row>
    <el-table ref="filterTable" :data="tableData" style="width: 100%;text-align:center;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="国家：">
              <span>{{ props.row.country }}</span>
            </el-form-item>
            <el-form-item label="省份：">
              <span>{{ props.row.province }}</span>
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
      <el-table-column prop="avatar" label="头像" width="130">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别" width="70"></el-table-column>
      <el-table-column prop="city" label="城市" width="70"></el-table-column>
      <el-table-column prop="balance" label="余额" width="70"></el-table-column>
      <el-table-column prop="updated_at" label="更新时间"></el-table-column>
      <el-table-column prop="tag" label="操作">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-edit" @click="edit(scope.row)" size="small">关联</el-button>
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
    <el-dialog title="关联课程" :visible.sync="dialogFlag">
       <div class="prompt" @click="addcourse">请到课程节数管理添加课程</div>
        <!-- <el-breadcrumb-item :to="{ path: '/views/CampusManagemen' }" style="color: #F56C;">请到课程节数管理添加课程</el-breadcrumb-item> -->
      <el-transfer
        filterable
        :filter-method="filterMethod"
        :titles="['所有课程', '可看课程']"
        filter-placeholder="请输入课程"
        v-model="value"
        :data="data"
      ></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeCurrentDia">关 闭</el-button>
        <el-button type="primary" @click="nextProcessSure()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  user,
  getlessonall,
  binduserlesson,
  getuserlesson
} from "../../api/user";
import { timestampToTimes } from "../../utils/utils.js";

export default {
  data() {
    return {
      page: 1,
      tableData: [],
      datas: {},
      currentPage: 10,
      total: "",
      dialogFlag: false,
      data: [],
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
    };
  },
  components: {
    // eleCalendar
  },
  created() {
    this.datalist();
    this.getalllesson();
  },
  beforeCreate() {},
  methods: {
    //课程列表
    datalist() {
      user(this.page).then(res => {
        console.log("用户数据");
        console.log(res);
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].sex == 1) {
            res.data[i].sex = "男";
          } else {
            res.data[i].sex = "女";
          }
          this.tableData = res.data;
        }
        this.currentPage = res.per_page;
        this.total = parseInt(res.total);
        
      });
    },
    //获取全部课程
    getalllesson() {
      getlessonall({}).then(res => {
        console.log("得到的全部课程");
        console.log(res);
        var listall = res;
        const data = [];
        listall.forEach((city, index) => {
          data.push({
            label: city.title,
            key: city.lesson_list,
            pinyin: city.title
          });
        });
        // if(){

        // }
        this.data = data;
      });
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
    //关联
    edit(row) {
      this.dialogFlag = true;
      this.datas = row;
      getuserlesson(row.id).then(res => {
        console.log("课程》》》》》》》》》》》》");
        console.log(res);
        if (res.lesson_list.length > 0) {
          this.value = res.lesson_list;
        } else {
          this.value = [];
        }
      });
    },
    //关闭
    closeCurrentDia() {
      this.dialogFlag = false;
    },
    //确定
    nextProcessSure() {
      console.log(this.value);
      var parid = []; //父id
      for (var i = 0; i < this.value.length; i++) {
        var id = this.value[i];
        var data = id.split("_");
        if (parid.indexOf(data[0]) == -1) {
          parid.push(data[0]);
        }
      }
      var data = {
        user_id: this.datas.id,
        lesson_list: this.value.toString(),
        lesson_id: parid.toString()
      };
      console.log(JSON.stringify(data));
      binduserlesson({
        user_id: this.datas.id,
        lesson_list: this.value.toString(),
        lesson_id: parid.toString()
      }).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.dialogFlag = false;
          this.$message({
            message: "关联课程成功",
            type: "success"
          });
        }
      });
    },
    //添加课程
    addcourse(){
      this.$router.push({
        path: "/views/CampusManagemen"
      });
    }
  }
};
</script>
<style>
.el-breadcrumb{
  margin:0 0 2rem 0;
  font-size: 1rem;
}
.el-pagination {
  margin: 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.el-dialog__body {
  padding: 32px 24px !important;
}
</style>
<style scoped>
.prompt{
  color: #F56C;
  margin: 0 0 2rem 0;
  cursor: pointer;
}
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
  padding: 32px 24px !important;
}

.el-transfer__button.is-disabled,
.el-transfer__button.is-disabled:hover {
  width: 40px;
  height: 40px;
}
.el-dialog__wrapper .el-button span {
  padding: 0;
}
.el-transfer__buttons {
  display: inline-block;
  vertical-align: middle;
  padding: 0 20px;
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
</style>
