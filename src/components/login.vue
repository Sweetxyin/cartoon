<template>
    <div class="login_wrapper">
      <div class="background">
        <img :src="imgSrc" width="100%" height="100%" alt="" />
      </div>
        <div class="login">
            <el-form :model="loginForm">
                <el-form-item>
                    <h2 class="title">动画管理系统</h2>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="loginForm.username" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="loginForm.password" placeholder="密码" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"   @click="login">登陆</el-button>

<!--                    <span v-show="this.errorInfo.isShowError" class='error'>-->
<!--                        {{this.errorInfo.text}}-->
<!--                    </span>-->
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<style >
/*$input_width:300px;*/


.background{
  width:100%;
  height:100%;  /**宽高100%是为了图片铺满屏幕 */
  z-index:-1;
  position: absolute;
}
.login_wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    }
.login {
  width: 460px;
  height: 296px;
  /*margin-top: -10px;*/
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  z-index:1;
  position: absolute;
}

.title {
  text-align: center;
  color: #505458;
}
.el-form-item__content {
  width: 300px;
}
.recover{
    position:absolute;
    bottom:0px;
    cursor:pointer;
    color:#E6A23C;
    // display: none;
}
.bei{
    position:absolute;
    bottom:20px;
    cursor:pointer;
    color:#505458;
}
.el-button {
  width: 300px;

}
.el-form {
  margin: 30px 80px auto 80px;
}
.error {
  display: block;
  text-align: center;
  color: red;
}
.el-menu-item-group__title {
  padding: 0 0 0 20px;
}
</style>

<script>
// import apis from '../apis/apis';
export default {
    name: 'loginn',
    data() {
        return {
            imgSrc:require('../assets/bj3.jpg'),
            loginForm: {   //表单对象
                username: '',
                password: ''
            },
            errorInfo: {
                text: '登陆失败,请重试',
                isShowError: false //显示错误提示
            }

        }
    },
    methods: {
        // ...mapMutations['save_admin'],
        login: function() {
            let _this = this;
            if (this.loginForm.username === "" || this.loginForm.password === "") {
                alert("账号或密码不能为空！");
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
                            _this.$router.push("layout");
                        } else {
                            alert("登录失败！请重新输入账号密码！");
                        }
                    });
            }
        }
    }

}
</script>
