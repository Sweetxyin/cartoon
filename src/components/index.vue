<template>
  <div>
    <el-container>
      <el-container>
        <el-header>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">后台管理页面</el-menu-item>
            <el-dropdown @command="handleCommand" szie="mini" style="line-height:60px;float:right">
               <el-button icon="el-icon-user-solid" size="samall">{{$store.getters.admin}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
               <el-dropdown-menu>
                 <el-dropdown-item>个人资料</el-dropdown-item>
                 <el-dropdown-item>基本信息编辑</el-dropdown-item>
                 <el-dropdown-item>密码修改</el-dropdown-item>
                 <el-dropdown-item command="admin_logout" divided>退出</el-dropdown-item>
               </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-submenu index="2" class="fr">
              <template slot="title" >{{$stroe.getters.admin}}</template>
              <el-menu-item index="2-1">基本资料编辑</el-menu-item>
              <el-menu-item index="2-2">修改密码</el-menu-item>
            </el-submenu> -->
            <!-- <el-menu-item index="3" class="fr">注销</el-menu-item> -->
          </el-menu>
        </el-header>
      </el-container>
      <el-container>
        <el-aside width="200px">
          <el-menu
            router
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>管理账户管理
              </template>
              <el-menu-item-group>
            <el-menu-item index="/adminmanage">管理修改账户</el-menu-item>
            <el-menu-item index="/register">管理角色列表</el-menu-item>
            <el-menu-item index="/Hello">管理账户列表</el-menu-item>
          </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>客户管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="/customerList">客户管理列表</el-menu-item>
                <el-menu-item index="/duanzi">管理角色列表</el-menu-item>
                <el-menu-item index="/Hello">管理账户列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>产品管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="/ProductTypeManage">产品类别管理</el-menu-item>
                <el-menu-item index="/duanzi">产品管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command){
      if(command== "admin_detail"){
        if(this.$router.path!="/admin"){
          this.$router.push("/admin");
        }
        else if(command == "admin_logout"){
          console.log(1)
          this.$store.commit("logout_admin");
          this.$router.push("/login")
        }
      }
    }
  }
};
</script>


 <style>
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  z-index: 1001;
  margin-top: 60px;
  background: #545c64;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding-top: 60px;
  padding-left: 200px;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-container {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0;
  bottom: 0;
}
.el-header {
  padding: 0;
  z-index: 1000;
}

/* // header菜单需要靠右的添加.fr即可(如：<el-menu-item class="fr" index="3">消息中心</el-menu-item>) */
/* .el-header .fr{
  float: right;
}
.el-header .el-menu{
  border-bottom: none;
}
.el-aside, .el-main{
  padding-top: 60px;
}
.el-aside{
  background: #545c64;
}
.el-aside .el-menu{
  border-right: none;
} */
</style>
