<template>
  <div>
    <el-form :model="regiterForm" :rules="rules" label-width="500px">
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="regiterForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="yzm">
        <el-input></el-input>
      </el-form-item>
       <el-form-item label="密码" prop="password">
        <el-input v-model="regiterForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      regiterForm: {
          phone:'',
          password:''
      },
      rules:{
           phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "请输入正确的手机号码"
          }
        ],
        password:[
            {required:true,message:"请输入密码",trigger:"blur"},
            {min:6,max:12,message:"请输入6-12位字符的密码",trigger:"blur"}
        ]
      }
    };
  }
};
</script>