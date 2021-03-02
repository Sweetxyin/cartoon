<style scoped>
  .el-aside {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /*.el-container{*/
  /*  background-color:#444444;*/
  /*}*/
.boo{

}
  section{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*padding: 0 20px;*/

    width: 100%;
  }

  .logo {
    width: 200px;
  }

  .headerLogo,.logo{
    cursor: pointer;
  }


</style>

<template>
<!--  <div class="boo">-->
  <el-container >
    <el-aside width="auto" class="header-logo tap" >
      <img class="logo" src="@/assets/logo2.png" alt="Logo" />
    </el-aside>
<!--    <el-aside width="auto" class="header-logo tap" >-->
<!--      <el-avatar icon="el-icon-user-solid" class="headerLogo"></el-avatar>-->
<!--    </el-aside>-->
    <el-dropdown @command="handleCommand" szie="mini" style="line-height:60px;float:right">
<!--      <el-avatar icon="el-icon-user-solid" class="headerLogo"></el-avatar>-->
      <el-button icon="el-icon-user-solid" circle type="info" size="samall">{{$store.getters.admin}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      <el-dropdown-menu>
        <el-dropdown-item>个人资料</el-dropdown-item>
        <el-dropdown-item>基本信息编辑</el-dropdown-item>
        <el-dropdown-item>密码修改</el-dropdown-item>
        <el-dropdown-item command="admin_logout" divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </el-container>
<!--  </div>-->
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: "1",
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleCommand(command){
               if(command == "admin_logout"){
                        // console.log(1)
                        this.$store.commit("logout_admin");
                        this.$router.push("/login")
                    }
                }
            }

    };
</script>
