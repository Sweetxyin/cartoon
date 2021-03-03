<template>
  <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="500px">
    <el-form :model="userForm" :rules="rules" ref="userForm" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item label="网名" prop="name">
        <el-input v-model="userForm.name"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="tel">
        <el-input v-model="userForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('userForm')">创建管理员</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "userAdd",
  data() {
    return {
      dialogFormVisible: false,
      userForm: {
        username: "",
          password:"",
          name:"",
         tel: "",
          email: ""

      },
      rules: {
        username: [
          { required: true, message: "不能为空", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
            message: "不允许输入空格等特殊符号"
          }
        ],
          password: [
              { required: true, message: "不能为空", trigger: "blur" },
              { min: 6, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" },
              {
                  pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
                  message: "不允许输入空格等特殊符号"
              }
          ],
          name: [
              { required: true, message: "不能为空", trigger: "blur" },
              { pattern: /\S$/, message: "不能出现空格", trigger: "blur" }
          ],
          tel: [
          { required: true, message: "不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "长度在11个字符", trigger: "blur" },
          { pattern: /\S$/, message: "不能出现空格", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    openDialog() {
      //打开对话框
      this.dialogFormVisible = true;
    },
    closeDialog() {
      //关闭对话框
      this.dialogFormVisible = false;
    },

    submitForm(formName) {
      //提交表单事件
      this.$refs[formName].validate(valid => {
        console.log(valid)
        if (valid) {
          //如果验证通过
          this.$axios //将更新后的值传到服务端保存
            .post("/backstage/usermanage", JSON.stringify(this.userForm))
            .then(response => {
              //获取返回数据
              let msg = response.data;
              console.log(response);
              if (msg.code === 0) {
                //如果添加成功
                this.$message({
                  type: "success",
                  message: msg.msg
                });
                this.closeDialog();//关闭对话框
                this.$refs[formName].resetFields(); //重置表单
                this.$emit("userTableRefresh"); //刷新父组件的表格
              } else {

                this.$message.error(msg.msg);
              }
            })
            .catch(error => {});
        } else {
          //如果验证不通过
          return false;
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
