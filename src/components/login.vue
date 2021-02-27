<template>
  <div>
    <el-input placeholder="请输入用户名" v-model="loginForm.username" size="large">
      <template slot="prepend" style="width:200px">用户名</template>
    </el-input>
    <el-input placeholder="请输密入密码" v-model="loginForm.password" show-password>
      <template slot="prepend" style="width:200px">密码</template>
    </el-input>
    <el-button type="info" plain @click="login" style="width:200px">登录</el-button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // ...mapMutations['save_admin'],
    login: function() {
      let _this = this;
      if (this.loginForm.username === "" || this.loginForm.password === "") {
        alert("账号或密码不能为空");
      } else {
        this.$axios
          .get("/backstage/login", {
            params: {
              username: this.loginForm.username,
              password: this.loginForm.password
            }
          })
          .then(response => {
            let msg = response.data;
            console.log(response);
            console.log(_this.loginForm.username);
            if (msg.code == 0) {
              _this.$store.commit("save_admin", _this.loginForm.username);
              _this.$message({
                message: "登录成功",
                type: "success"
              });
              // this.$router.replace({ path: "index" });
              _this.$router.push(" ");
            } else {
              alert("登录失败！");
            }
          });
      }
    }
  }
};
</script>
<style>
</style>
