<template>
  <el-dialog
    title="客户编辑"
    :visible.sync="dialogFormVisible"
    v-loading="loading"
    @opened="openDialogChecked"
    @closed="closeDialogClean"
  >
    <el-form :model="customerForm" :rules="rules" ref="customerForm" label-width="80px">
      <el-form-item label="账户名" prop="username">
        <el-input v-model="customerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="customerForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" style="text-align:left" prop="sex">
        <el-select v-model="customerForm.sex" placeholder="请选择">
          <el-option key="1" value="1" label="男"></el-option>
          <el-option key="2" value="2" label="女"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible=false">取消</el-button>
      <el-button @click="submitForm('customerForm')" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      loading: false,
      dialogFormVisible: false,
      customerForm: {},
      rules: {
        username: [
          { required: true, message: "不能为空", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3-10个字符", trigger: "blur" }
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
      openDialog(id){
          this.dialogFormVisible=true;
          this.id=id;
      },
      closeDialog(){
          this.dialogFormVisible=false;
      },
      openDialogChecked(){
        if(this.id==''){
          this.closeDialog();
          this.$message.error("没有接收到要编辑的信息");
        }else{
          this.loading=true;
          this.$axios.get("/backstage/customermanage/"+this.id)
          .then(response=>{
            let msg=response.data;
            if(msg.code===0){
              this.customerForm=msg.data;
              this.customerForm.sex=String(this.customerForm.sex);
              this.loading=false;
            }else{
              this.$message.error(msg.msg);
            }
          })
          .catch(error=>{
            console.log(error);
          });
        }
      },
      closeDialogClean(){
        this.$refs["customerForm"].resetFields();
      },
      submitForm(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            this.$axios.put("/backstage/customermanage",JSON.stringify(this.customerForm))
            .then(response=>{
              let msg=response.data;
              console.log(response.data)
              if(msg.code===0){
                this.$message({
                  type:"success",
                  message:msg.msg
                });
                this.$emit("customerTableRefresh");
                this.closeDialog();
              }else{
                this.$message.error(msg.msg);
              }
            })
            .catch(error=>{
              
            })
          }else{
            return false;
          }
        });
      }
  }
};
</script>