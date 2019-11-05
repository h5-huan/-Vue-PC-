<template>
  <div class="login-wrap">
    <div id="canvascontainer" ref="can"></div>
    <el-form
      label-position="left"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">用户登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox class="remember" v-model="rememberpwd">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          @click="submitForm('ruleForm')"
          :loading="logining"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//<script type="text/ecmascript-6">
import { login, userinfo } from "../api/user";
import { getCookie, delCookie, setStore, setCookie } from "../utils/utils";
import md5 from "js-md5";

export default {
  name: "login",
  data() {
    return {
      //定义loading默认为false
      logining: false,
      // 记住密码
      rememberpwd: false,
      ruleForm: { username: "admin", password: "password" },
      //rules前端验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  // 创建完毕状态
  created() {
    // 获取存在本地的用户名密码
    this.getuserpwd();
  },
  // 调用才执行
  methods: {
    // 获取用户名密码
    getuserpwd() {
      if (getCookie("user") != "" && getCookie("pwd") != "") {
        this.ruleForm.username = getCookie("user");
        this.ruleForm.password = getCookie("pwd");
        this.rememberpwd = true;
      }
    },
    //获取info
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.logining = true;
          login(this.ruleForm).then(res => {
            console.log(res);
            if (res.code == 0) {
              if (this.rememberpwd) {
                //保存帐号到cookie，有效期7天
                setCookie("acc", this.ruleForm.username, 7);
              } else {
                delCookie("acc");
                delCookie("pw");
              }
              //如果请求成功就让他1秒跳转路由
              setTimeout(() => {
                this.logining = false;
                // 缓存token
				setStore("logintoken", res.token);
				 userinfo({}).then(res => {
					 console.log('个人信息');
					 console.log(res);
					 if(res.code==0){
              // 缓存用户个人信息
						  setStore('userData', JSON.stringify(res.user_info));
					  	this.$router.push({
                path: '/views/Echart'
              })
					}
				});
              }, 1000);
            } else {
              this.$message.error(res.message);
              this.logining = false;
              return false;
            }
          });
        } else {
          this.$message.error("请输入用户名密码！");
          this.logining = false;
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  background-color: #112346;
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;
}

.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.remember {
  margin: 0px 0px 35px 0px;
}

.code-box {
  text-align: right;
}

.codeimg {
  height: 40px;
}
</style>
