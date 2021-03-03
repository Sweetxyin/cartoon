<template>
  <div>
    <template>
      <div class="item">
        <el-form
          :model="userQuery"
          :inline="true"
          style="text-align:left;"
          class="demo-form-inline"
        >
          <el-form-item label="账户名">
            <el-input size="mini" v-model="userQuery.username" placeholder="账户名"></el-input>
          </el-form-item>
          <el-form-item label="网名">
            <el-input size="mini" v-model="userQuery.name" placeholder="网名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="item" align="left" style="margin-bottom: 5px">
        <el-button
          @click="$refs.userAddForm.openDialog()"
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
        <!-- <el-button @click="batchOpratorRoles" type="primary" plain size="mini" :disabled="disabled">角色批量分配</el-button> -->
      </div>
      <!-- :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" -->
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        border
        stripe
        height="540"
        style="width:100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="name" label="网名"></el-table-column>
        <el-table-column prop="tel" label="电话号码"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="edituser(scope.row.id)"
              type="primary"
              plain
              size="mini"
              icon="el-icon-edit"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :hide-on-single-page="hideOnSinglePage"
        :current-page="page"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="limit"
        layout=" prev, pager, next, total, sizes,jumper"
        :total="total"
        :page-count="11"
      ></el-pagination>
      <div>
        <!-- 管理员添加表单 -->
        <!-- 自定义方法（刷新表格数据）:@userTableRefresh="getMangerList"，用于将userTableRefresh方法提供给予子组件调用，
        子组件调用方法：this.$emit("userTableRefresh")-->
        <!-- ref="userAddForm"，通过这个可以调用组件相应的方法或属性 -->
        <userAdd ref="userAddForm" @userTableRefresh="getMangerList" />
        <userEdit ref="userEditForm" @userTableRefresh="getMangerList" />
      </div>
    </template>
  </div>
</template>
<script>
export default {
  components: {
    userAdd: () => import("@/components/user/userAdd.vue"), //引入管理员添加表单
    userEdit: () => import("@/components/user/userEdit.vue") //引入管理员修改表单

  },
  data() {
    return {
      disabled: true, //用于批量删除分配按钮的可用性属性，只有当选择了复选框才可以操作
      //分页-传递到服务端的数值
      limit: 5, //每页的最大记录数
      page: 1, //当前页
      //分页-服务端返回的数值
      total: 0, //总记录数
      hideOnSinglePage: false, //如果只有一页，则隐藏分页栏，隐藏后无法再选择恢复，false为不隐藏，如果不隐藏可以选择不使用
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
      userQuery: {
        //查询条件
        usernmae: null, //账户名
        name: null //网名
      },
      multpleSelection: [] //复选框选择的记录row
    };
  },
  created() {
    this.getMangerList();
  },
  methods: {


    // 初始页currentPage、初始每页数据数pagesize和数据data
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
        .get("/backstage/usermanage", {
          params: {
            page: this.page,
            limit: this.limit,
            username: this.userQuery.username,
            name: this.userQuery.name
          }
        })
        .then(response => {
          let msg = response.data;
          this.tableData = msg.data;
          this.total = msg.count;
        });
    },

    edituser(id) {
      //点击编辑按钮时出发，编辑相应的账户信息，id为账户的id
      this.$refs.userEditForm.openDialog(id); //打开账户编辑窗口
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
              .delete("/backstage/usermanage/deletes/" + ids.toString())
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
