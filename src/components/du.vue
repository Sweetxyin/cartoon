<template>
  <div id="nr">
    <el-container style="border: 1px solid #eee;margin-top:-60px; ">
       
      <el-aside width="200px" style="tbackground-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message "></i>管理账户管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="/adminmanage">管理修改账户</el-menu-item>
              <el-menu-item index="/duanzi">管理角色列表</el-menu-item>
              <el-menu-item index="/Hello">管理账户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>客户管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">创建客户</el-menu-item>
              <el-menu-item index="2-2">客户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>产品管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">产品类别管理</el-menu-item>
              <el-menu-item index="3-2">管理产品列表</el-menu-item>
            </el-menu-item-group> 
          </el-submenu>
        </el-menu>
      </el-aside>
<el-container>
      <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        <el-main style="float:rigth;">
          
           <router-view/>
        </el-main>
</el-container>
    </el-container>

  </div>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  
}

.el-aside {
  color: #333;
}
/* #nr{
  display: flex;
  flex-direction: column;
  height: 100vh;
} */


</style>

<script>
export default {
  data() {
    return {
      
    };
  },
  
    methods:{
 
      
    }
};
</script>