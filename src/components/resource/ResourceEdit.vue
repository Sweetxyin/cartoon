<template>
  <el-dialog title="编辑资源" :visible.sync="dialogFormVisible"  v-loading="loading" width="500px" @opened="openDialogChecked" @closed="closeDailogClean">
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
      <el-button type="primary" @click="submitForm('resourceForm')">确认修改</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        name: "resourceEdit",
        // 接受父组件的值

        data() {
            return {
                id:'',//接收传递过来的id的值
                dialogFormVisible: false,
                loading:false,//对应Loadding组件
                resourceForm:{
                    roleIds:[]//必须要先初始化，否则界面打开时虽然会正常显示但控制台会打印错误信息。原因是该组件打开时会首先根据roleIds初始化复选框已勾选的值，如果该属性不存在会打印错误；但随后通过远程访问会重新创建该属性并赋值，因此依旧能正常显示。
                },
                rules: {
                    username: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' },
                        { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }
                    ],
                    name: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                        { max: 8, message: '长度不能超过8个字符', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ]

                },
            }

        },
        methods: {
            openDialog(id) {//打开对话框
                this.dialogFormVisible = true;
                this.id=id;
            },
            closeDialog() {//关闭对话框
                this.dialogFormVisible = false;
            },
            openDialogChecked(){//Dialog 打开的回调，检查父组件是否传递了id过来
                if(this.id==''){//如果没有接收到父窗口传递过来的值
                    this.closeDialog();//关闭窗口
                    this.$message.error("没有接收到要编辑的账户信息");
                }else{//如果有id,读取账户信息
                    this.loading=true;
                    this.$axios
                        .get("/backstage/resourcemanage/"+this.id)
                        .then(response => {//获取返回数据/
                            let msg=response.data;
                            if (msg.code === 0) {
                                this.resourceForm = msg.data;
                                //本处Ljy被坑了：然后将服务端传递过来的性别的值改为字符串类型，只有这样才能正确初始化下拉框—。至于原因是初始化时只能识别字符串
                                this.resourceForm.sex=String(this.resourceForm.sex);
                                this.loading=false;
                            }else{
                                this.$message.error(msg.msg);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            closeDailogClean() {//Dialog 关闭动画结束时的回调。这里是在关闭窗口时清空窗口的编辑信息
                this.$refs["resourceForm"].resetFields();//重置表单，以免下次打开时还存在，导致让客户看到值变化的过程
            },
            submitForm(formName) {//提交表单事件
                this.$refs[formName].validate((valid) => {
                    if (valid) {//如果验证通过
                        this.$axios//将更新后的值传到服务端保存
                            .put("/backstage/resourcemanage",JSON.stringify(this.resourceForm))
                            .then(response => {//获取返回数据
                                let msg=response.data;
                                if (msg.code === 0) {//如果修改成功
                                    this.$message({
                                        type: "success",
                                        message: msg.msg
                                    });
                                    this.$emit("resourceTableRefresh");//刷新父组件的表格
                                    this.closeDialog();//关闭对话框
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

<style scoped>

</style>
