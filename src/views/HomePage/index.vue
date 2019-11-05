<template>
  <div class="home-main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'Echart' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-button type="primary" @click="reload">刷新数据</el-button>
      <el-button type="success" icon="el-icon-edit" @click="createbanner">创建轮播图</el-button>
    </el-row>
    <el-table ref="filterTable" :data="tableData" style="width: 100%;text-align:center;">
      <el-table-column prop="cover" label="轮播图" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.cover" alt />
        </template>
      </el-table-column>
      <el-table-column prop="type" label="跳转类型" width="130"></el-table-column>
      <el-table-column prop="jump_url" label="跳转地址" width="180"></el-table-column>
      <el-table-column prop="sort" label="排序" sortable :formatter="formatter">
        <template slot-scope="scope">{{scope.row.sort}}</template>
      </el-table-column>
      <el-table-column prop="updated_at" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="tag" label="操作" width="180">
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
    <!-- 弹窗 -->
    <el-dialog :title="types==1 ? '编辑轮播图' : '创建轮播图'" :visible.sync="dialogFlag">
      <el-upload
        class="avatar-uploader"
        :action="host+'banner/upload'"
        name="cover"
        :headers="gettoken"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="datas.cover" :src="datas.cover" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form :model="datas">
        <el-form-item label="跳转类型" :label-width="formLabelWidth">
          <el-select v-model="datas.type" placeholder="请选择跳转类型">
            <el-option label="小程序页面" value="小程序页面"></el-option>
            <el-option label="外部页面" value="外部页面"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转地址" :label-width="formLabelWidth">
          <el-input v-model="datas.jump_url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input-number
            v-model="datas.sort"
            @change="handleChange"
            :min="0"
            :max="10"
            label="描述文字"
          ></el-input-number>
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
import {
  banner,
  editbanner,
  addbanner,
  delbanner
} from "../../api/user";
import { open } from "../../api/axiosFun";
import { loginUrl } from "../../utils/global";
export default {
  name: "HomePage",
  data() {
    return {
      page: 1,
      tableData: [],
      dialogFlag: false,
      datas: {},
      // imageUrl:'',
      types: "",
      formLabelWidth: "90px",
      value: "",
      gettoken:{
        "Authorization":localStorage.getItem('logintoken')
      },
      host:loginUrl
    };
  },
  created() {
    this.bannerlist();
    console.log('获取的token');
    console.log(localStorage.getItem('logintoken'));
    // this.gettoken={
		// 	"Authorization":localStorage.getItem('logintoken')
    // }
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    //轮播图列表
    bannerlist() {
      banner({ page: this.page }).then(res => {
        console.log("列表为");
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].type == 0) {
            res.data[i].type = "小程序页面";
          } else {
            res.data[i].type = " 外部页面";
          }
          this.tableData = res.data;
        }

        console.log(res);
      });
    },
    //刷新
    reload() {
      this.page = 1;
      this.bannerlist();
    },
    //编辑
    edit(row) {
      this.dialogFlag = true;
      this.types = 1;
      var _tableData=this.tableData;
      // this.datas = row;
      for(var i=0;i<_tableData.length;i++){
        if(row.id==_tableData[i].id){
           this.datas = _tableData[i];
        }
      }
      console.log("点击编辑的数据");
      console.log(this.datas);
    },
    //创建轮播图
    createbanner() {
      this.datas = {
        cover: "",
        jump_url: "",
        sort: 0,
        typename: ""
      };
      this.dialogFlag = true;
      this.types = 2;
    },
    //删除
    handdelete(row) {
      console.log(row);
      this.$confirm("是否删除此教师?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delbanner(row.id, {}).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.bannerlist();
            }
          });
        })
        .catch(() => {});
    },
    //弹窗
    handleAvatarSuccess(res, file) {
      var imgurl = res.url;
      console.log('获取到的轮播图');
      console.log(imgurl);
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
    //排序
    handleChange(value) {
      console.log(value);
    },
    //关闭
    closeCurrentDia() {
      this.dialogFlag = false;
    },
    //确定
    nextProcessSure() {
      var types = this.types;
      var _datas=this.datas;
      var img = _datas.cover;
      var link = _datas.jump_url;
      var sort = _datas.sort;
      var ways = _datas.type;
      var send = {
        cover: img,
        jump_url: link,
        sort: sort
      };
      if (ways == "外部页面") {
        send.type = 1;
      } else {
        send.type = 0;
      }
      if (!img) {
        this.$message.error("请选择图片！");
      } else if (!ways) {
        this.$message.error("请选择跳转类型！");
      } else if (!link) {
        this.$message.error("请填写跳转地址！");
      } else {
        if (types == 1) {
          editbanner(_datas.id, send).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.dialogFlag = false;
              this.$message({
                message: "轮播图修改成功",
                type: "success"
              });
            }
          });
        } else {
          addbanner(send).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.dialogFlag = false;
              this.$message({
                message: "轮播图添加成功",
                type: "success"
              });
              this.bannerlist();
            }
          });
        }
      }
    }
  },
  mounted() {}
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
  width: 180px;
  height: 100px;
}
/* 弹窗 */
.el-dialog__body {
  padding: 32px 24px !important;
}
.el-dialog {
  width: 550px;
}
.el-form {
  margin: 20px 0;
}
.avatar-uploader .el-upload {
  width: 100%;
  height: 100%;
  border: 1px dashed #d9d9d9;
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
