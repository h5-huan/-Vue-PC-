<template>
  <div class="home-main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'Echart' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>反馈列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-button type="primary" @click="reload">刷新数据</el-button>
    </el-row>
    <el-table ref="filterTable" :data="tableData" style="width: 100%;text-align:center;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="反馈图片：">
              <div class="imgbox">
                <img v-if="props.row.photos[0]" :src="props.row.photos[0]" alt />
                <img v-if="props.row.photos[1]" :src="props.row.photos[1]" alt />
                <img v-if="props.row.photos[2]" :src="props.row.photos[2]" alt />
              </div>
            </el-form-item>
            <el-form-item label="用户id：">
              <span>{{ props.row.user_id }}</span>
            </el-form-item>
            <el-form-item label="创建时间：">
              <span>{{ props.row.created_at }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="photos" label="头像" width="130">
        <template slot-scope="scope">
          <img :src="scope.row.photos" alt />
        </template>
      </el-table-column>-->
      <el-table-column prop="user_name" label="昵称"></el-table-column>
      <!-- <el-table-column prop="phone" label="手机号"></el-table-column> -->
      <el-table-column prop="content" label="反馈内容"></el-table-column>
      <el-table-column prop="type" label="反馈类型"></el-table-column>
      <el-table-column prop="updated_at" label="更新时间"></el-table-column>
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
  </div>
</template>

<script>
import { feedback } from "../../api/user";
import { getBeforeDate, timestampToTime } from "../../utils/utils.js";
export default {
  data() {
    return {
      page: 1,
      tableData: [],
      datas: {},
      currentPage: 10,
      totalpage: "",
      total: ""
    };
  },
  beforeCreate() {},
  created() {
    this.datalist();
  },
  methods: {
    //反馈列表
    datalist() {
      feedback(this.page).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].type == 1) {
            res.data[i].type = "产品建议 ";
          } else if (res.data[i].type == 2) {
            res.data[i].type = "BUG反馈";
          } else if (res.data[i].type == 3) {
            res.data[i].type = "其他";
          }
          if (res.data[i].user_name == "") {
            res.data[i].user_name = res.data[i].user_id;
          }
          this.tableData = res.data;
        }
        this.totalpage = res.total;
        this.currentPage = res.per_page;
        this.total = parseInt(res.total);
        console.log("数据");
        console.log(res);
      });
    },
    //刷新
    reload() {
      this.page = 1;
      this.datalist();
    },
    //编辑
    edit(row) {
      console.log(row);
    },
    //脚步按钮
    handleCurrentChange(val) {
      console.log(val);
      this.page = val;
      this.datalist();
    }
  }
};
</script>

<style scoped>
.el-pagination {
  margin: 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
<style scoped>
.imgbox{
  width: 100%;
  height: 130px;
}
.imgbox img{
  width:130px;
  height: 130px;
  float: left;
  margin: 0 20px 0 0;
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