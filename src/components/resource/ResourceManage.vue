<template>
  <div>
    <template>
      <div class="item" align="left" style="margin-bottom: 5px">
        <el-button
          @click="$refs.resourceAddForm.openDialog()"
          type="primary"
          plain
          size="mini"
          icon="el-icon-circle-plus-outline"
        >新增</el-button>
        <el-button
          @click="handleDelete"
          type="danger"
          plain
          size="mini"
          icon="el-icon-delete"
          :disabled="disabled"
        >删除</el-button>
      </div>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        border
        stripe
        height="540"
        style="width:100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="名称"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="update_status" label="更新状态"></el-table-column>
        <el-table-column prop="synopsis" label="简介"></el-table-column>
        <el-table-column prop="createTime"  :formatter="formatDate" label="添加时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="editresource(scope.row.id)"
              type="primary"
              plain
              size="mini"
              icon="el-icon-edit"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <resourceAdd ref="resourceAddForm" @resourceTableRefresh="getMangerList" />
        <resourceEdit ref="resourceEditForm" @resourceTableRefresh="getMangerList" />
      </div>
    </template>
  </div>
</template>
<script>
export default {
  components: {
    resourceAdd: () => import("@/components/resource/resourceAdd.vue"), //引入管理员添加表单
    resourceEdit: () => import("@/components/resource/resourceEdit.vue") //引入管理员修改表单

  },
  data() {
    return {
      disabled: true, //用于批量删除分配按钮的可用性属性，只有当选择了复选框才可以操作
      tableData: [], //表格数据
      operatorOptions: [
        {
          value: "add",
          label: "添加管理账户"
        },
        {
          value: "remove",
          label: "批量删除管理账户"
        }
      ],

      multpleSelection: [] //复选框选择的记录row
    };
  },
  created() {
    this.getMangerList();
  },
  methods: {
    formatSex(row, column) {
      if (row.sex == 1) {
        return "男";
      } else {
        return "女";
      }
    },
    handleSizeChange(value) {
      this.limit = value;
      this.getMangerList();
    },
    handleCurrentChange(value) {
      this.page = value;
      this.getMangerList();
    },
    getMangerList() {
      this.$axios
        .get("/backstage/resourcemanage")
        .then(response => {
          let msg = response.data;
          this.tableData = msg.data;
          this.total = msg.count;
        });
    },

    editresource(id) {
      //点击编辑按钮时出发，编辑相应的账户信息，id为账户的id
      this.$refs.resourceEditForm.openDialog(id); //打开账户编辑窗口
    },
    search() {
      this.getMangerList();
    },
    handleSelectionChange(value) {
      //当选择项发生改变时会触发该事件，这里用获取的记录（多选）.value可以获取所有选择了的行的记录row
      this.multpleSelection = value;
      if (this.multpleSelection.length > 0) {
        //如果选择了记录
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    checkSelection() {
      //判断是否选择了数据
      if (this.multpleSelection && this.multpleSelection.length) {
        return true
      } else {
        this.$message.error("请先选择数据！")
      }
    },
    handleDelete() {
      //批量删除管理账户
      if (this.checkSelection()) {
        let count = this.multpleSelection.length;
        this.$confirm("确定要删除这" + count + "个账户吗？", "系统提示", {
          confirmButtonText: "确定", //确定按钮的文本内容
          cancelButtonText: "取消", //取消按钮的文本内容
          type: "warning"
        })
          .then(() => {
            //选择确认按钮后执行
            var ids = []; //定义要批量删除的主键
            for (let i = 0; i < this.multpleSelection.length; i++) {
              ids.push(this.multpleSelection[i].id);
            }
            this.$axios
              .delete("/backstage/resourcemanage/deletes/" + ids.toString())
              .then(response => {
                //获取返回数据
                  console.log(response.data);
                let msg = response.data;
                if (msg.code == 0) {
                  this.$message({
                    type:'success',
                    message:'删除成功'
                  })
                  this.getMangerList(); //刷新表格数据
                } else {
                  this.$message.error(msg.msg);
                }
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            //选择取消按钮后执行
            // console.log(error);
          });
      }
    },
      formatDate:function(row, column){
          let data = row[column.property]
          if(data == null) {
              return null
          }
          let date = new Date(data);
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        // "s+" : date.getSeconds(),                 //秒
        // "q+" : Math.floor((date.getMonth()+3)/3), //季度
        // "S"  : date.getMilliseconds()             //毫秒
    };
          var fmt = "yyyy-MM-dd ";
          if(/(y+)/.test(fmt)) {
              fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
          }
          for(var k in o) {
              if(new RegExp("("+ k +")").test(fmt)){
                  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
              }
          }
          return fmt ;
      }
  }
};
</script>
