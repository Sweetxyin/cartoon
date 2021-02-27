<template>
  <div>
    <div>
      <el-form
        :model="customerQuery"
        :inline="true"
        style="text-align:left"
        class="demo-form-inline"
      >
        <el-form-item label="账户名">
          <el-input v-model="customerQuery.username" placeholder="账户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="customerQuery.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="item" align="left" style="margin-bottom:5px">
      <el-button
        @click="$refs.customerAddForm.openDialog()"
        type="primary"
        plain
        size="medium"
        icon="el-icon-circle-plus-outline"
      >添加</el-button>
      <el-button
        type="danger"
        size="medium"
        icon="el-icon-delete"
        plain
        @click="handleDelete"
        :disabled="disabled"
      >删除</el-button>
    </div>
    <template>
      <el-table
        :data="tableData"
        border
        height="600"
        style="width:100%"
        @selection-change="handelSeletion"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="picUrl" label="头像"></el-table-column>
        <el-table-column prop="username" label="账户名"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60" :formatter="formatSex"></el-table-column>
        <el-table-column prop="tel" label="电话号码"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="zip" label="邮编"></el-table-column>
        <el-table-column prop="email" label="电子邮箱"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.row.id)"
              type="primary"
              plain
              size="medium"
              icon="el-icon-edit"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :hide-on-sigle-page="hideOnSinglePage"
        :total="total"
        :page-count="11"
      ></el-pagination>
      <div>
        <CustomerAdd ref="customerAddForm" @customerTableRefresh="getMangerList" />
        <CustomerEdit ref="customerEditForm" @customerTableRefresh="getMangerList" />
      </div>
    </template>
  </div>
</template>
<script>
export default {
  components: {
    CustomerAdd: () => import("@/components/customer/CustomerAdd.vue"), //引入管理员添加表单
    CustomerEdit: () => import("@/components/customer/CustomerEdit.vue")
  },
  data() {
    return {
      disabled: true,
      page: 1, //初始页
      limit: 10, //    每页的数据
      total: 0,
      hideOnSinglePage: false,
      tableData: [],
      operatorOptions: [
        {
          value: "add",
          label: "添加客户"
        },
        {
          value: "remove",
          label: "批量删除客户"
        }
      ],
      customerQuery: {
        username: null,
        name: null
      },
      muSelection: [] //复选框选择的记录row
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
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(value) {
      this.limit = value;
      this.getMangerList();
    },
    handleCurrentChange(value) {
      this.page = value;
      this.getMangerList(); //点击第几页
    },
    getMangerList() {
      //获取customer列表数据
      this.$axios
        .get("/backstage/customermanage", {
          params: {
            page: this.page,
            limit: this.limit,
            username: this.customerQuery.username,
            name: this.customerQuery.name
          }
        })
        .then(response => {
          let msg = response.data;
          if (msg.code === 0) {
            this.tableData = msg.data;
            this.total = msg.count;
          } else {
            this.$message.error(msg.msg);
          }
        });
    },
    search() {
      //搜索
      this.getMangerList();
    },
    handleEdit(id) {
      this.$refs.customerEditForm.openDialog(id);
    },
    handelSeletion(value) {
      this.muSelection = value;
      if (this.muSelection.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    checkSeletion() {
      if (this.muSelection && this.muSelection.length) {
        return true;
      } else {
        this.$message.error("请先选择数据");
      }
    },
    handleDelete() {
      if (this.checkSeletion()) {
        let count = this.muSelection.length;
        this.$confirm("确定要批量删除这" + count + "个账户吗？", "系统提示", {
          $confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "waring"
        }).then(() => {
          var ids = [];
          for (let i = 0; i < this.muSelection.length; i++) {
            ids.push(this.muSelection[i].id);
          }
          this.$axios
            .delete("/backstage/customermanage/" + ids.toString())
            .then(response => {
              let msg = response.data;
              if (msg.code === 0) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.getMangerList();
              } else {
                this.$message.error(msg.msg);
              }
            })
            .catch(error => {
              console.log(error);
            })
            .catch(error => {});
        });
      }
    }
  }
};
</script>