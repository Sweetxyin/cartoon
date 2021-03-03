<template>
  <el-dialog title="新增资源" :visible.sync="dialogFormVisible" width="500px">
    <el-form :model="resourceForm" :rules="rules" ref="resourceForm" label-width="80px">
      <el-form-item label="名称" prop="username">
        <el-input v-model="resourceForm.username"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="resourceForm.type"></el-input>
      </el-form-item>
      <el-form-item label="更新状态" prop="update_status">
        <el-input v-model="resourceForm.update_status"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="synopsis">
        <el-input v-model="resourceForm.synopsis"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('resourceForm')">创建管理员</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "resourceAdd",
  data() {
    return {
      dialogFormVisible: false,
      resourceForm: {
        username: "",
          type: "",
          update_status: "",
          synopsis: ""
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
          { min: 6, max: 12, message: "长度在6到 12个字符", trigger: "blur" },
          { pattern: /\S$/, message: "不能出现空格", trigger: "blur" }
        ],
        name: [
          { required: true, message: "不能为空", trigger: "blur" },
          { max: 8, message: "长度不能超过8个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }]
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
            .post("/backstage/resourcemanage", JSON.stringify(this.resourceForm))
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
                this.$emit("resourceTableRefresh"); //刷新父组件的表格
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
