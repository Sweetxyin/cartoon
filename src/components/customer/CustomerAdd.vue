<template>
  <el-dialog title="客户创建" :visible.sync="dialogFormVisible" width="500px">
    <el-form :model="customerForm" :rules="rules" ref="customerForm" label-width="80px">
      <el-form-item label="账户名" prop="username">
        <el-input v-model="customerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="customerForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="customerForm.sex" placeholder="请选择">
          <el-option value="1" label="男"></el-option>
          <el-option value="2" label="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话号码" prop="tel">
        <el-input v-model="customerForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="邮编" prop="zip">
        <el-input v-model="customerForm.zip"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button @click="submitForm('customerForm')">创建客户</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
    data(){
        return{
            dialogFormVisible:false,
            customerForm:{
                username:'',
                name:'',
                sex:'',
                tel:'',
                zip:''
            },
            rules:{
                username:[
                    {required:true,message:'不允许为空',trigger:'blur'},
                    {min:3,max:10,message:'长度在3-10之间',trigger:'blur'}
                ],
                    name: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                        { max: 8, message: '长度不能超过8个字符', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    
                 tel: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度在11个字符', trigger: 'blur' },
                        { pattern: /\S$/, message: '不能出现空格', trigger: 'blur' }
                    ],
                    zip:[
                         { required: true, message: '不能为空', trigger: 'blur' },
                    ]
            },
        }
    },
    methods:{
        openDialog(){
            this.dialogFormVisible=true;
        },
        closeDialog(){
            this.dialogFormVisible=false;
        },
         submitForm(formName) {//提交表单事件
                this.$refs[formName].validate((valid) => {
                    if (valid) {//如果验证通过
                        this.$axios//将更新后的值传到服务端保存
                            .post("/backstage/customermanage",JSON.stringify(this.customerForm))
                            .then(response => {//获取返回数据
                                let msg=response.data;
                                console.log(response)
                                if (msg.code === 0) {//如果修改成功
                                    this.$message({
                                        type: "success",
                                        message: msg.msg
                                    });
                                    this.$refs[formName].resetFields();//重置表单
                                    this.$emit("customerTableRefresh");//刷新父组件的表格
                                }else{//如果修改失败
                                    this.$message.error(msg.msg);
                                }
                            })
                            .catch(error => {

                            });
                    } else {//如果验证不通过
                        return false;
                    }
                });
            },
    }
}
</script>