<style scoped>
  .el-row{
    height: 100%;

  }
  .el-menu{
    border-right:none;
  }
  .el-menu-item{
    color: #ffffff;
    background-color:#0f0f0f;
  }

  .el-aside{
    border-right: 0px solid #f5f1f1;
  }
  span{
    color: #ffffff;
  }
</style>

<template>
  <div >

  <el-aside width="200px">
    <el-row class="tac">
      <el-col>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#393d49"
          active-text-color="#ffd04b"
          active-background-color="#009688"
          text-color="#fff"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>管理员管理</span>
            </template>
            <el-menu-item-group >
              <el-menu-item index="1-1" @click="goPage('adminmanage')">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>资源管理</span>
            </template>
            <el-menu-item-group >
              <el-menu-item index="2-1" @click="goPage('resource')">资源管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>


          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group >
              <el-menu-item index="3-1" @click="goPage('user')">用户管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
  </div>
</template>

<script>
    var $this = {};
    export default {
        data() {
            return {};
        },
        beforeCreate() {
            $this = this;
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },

            goPage(link) {
                if (link === "adminmanage") {
                    $this.$router.push("/adminmanage").catch(error => error);
                } else if ((link == "resource")) {
                    $this.$router.push("/resource").catch(error => error);
                } else if ((link == "user")) {
                    $this.$router.push("/user").catch(error => error);
                }
            }
        }
    };
</script>
