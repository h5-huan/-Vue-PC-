<template>
  <el-dialog :title="types==1 ? '编辑轮播图' : '创建轮播图'" :visible.sync="dialogFlag">
    <!-- <el-dialog :title="types==1 ? '编辑轮播图' : '创建轮播图'"> -->
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-form :model="form">
    <el-form-item label="跳转地址" :label-width="formLabelWidth">
      <el-input v-model="form.imgurl" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="排序" :label-width="formLabelWidth">
      <el-input-number v-model="num" @change="handleChange" :min="0" :max="10" label="描述文字"></el-input-number>
    </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeCurrentDia">关 闭</el-button>
      <el-button type="primary" @click="nextProcessSure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { logout } from "../../api/user";
export default {
  data() {
    return {
      dialogFlag: true,
      types: "",
      imageUrl: '',
      num: 0,
      datas:{},
      form: {
        imgurl: "",
      },
      formLabelWidth: "90px"
    };
  },
  props:["dialogFlag","types","datas"],
  // props: {
  //   nextProcessFlag:{
  //     type:String,
  //     required:true
  //   },
  //   types:{
  //     type:String,
  //     required:true
  //   }
  // },
  created() {
    console.log("得到的数据");
    console.log(this.types);
    if(this.types==1){
      //编辑
      this.form.imgurl=this.datas.jump_url;
      this.imageUrl=this.datas.cover;
      this.num=this.datas.sort;


    }else{
      //添加

    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //排序
    handleChange(value) {
      console.log(value);
    },
    closeCurrentDia() {
      this.dialogFlag = false;
      console.log("关闭了");
    },
    nextProcessSure() {
      // this.$router.push({path:'/'+this.currentPath, query: {currentChargingId: this.nextProcessParam.currentChargingId}});
      this.dialogFlag = false;
  
    }
  }
};
</script>
<style>
.el-dialog__body {
    padding: 32px 24px;
}
.el-dialog{
  width: 500px;
}
.el-form{
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
    border-color: #409EFF;
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
    height:100%;
    display: block;
  }
  .el-form-item__label {
    text-align: left;
}
.el-input input {
    height: 40px;
}
</style>
