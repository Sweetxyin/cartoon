<style>
  .el-main {
    background-color: #f5f7f9;
  }
.lef{
  background-color:#393d49;
}
  .el-header,
  .el-footer {
    background-color:#23262E;
    box-sizing: border-box;
    border-bottom: 0px solid #f5f1f1;
  }

  .el-container {
    height: 100%;
    /*background-color:#1b6d85;*/
  }
</style>

<template>
  <el-container>
    <!-- header部分 -->
    <el-header>
      <navtop></navtop>
    </el-header>
    <el-container>
      <div class="lef">
      <!-- aside部分 -->
      <leftNav></leftNav>
      </div>
      <el-main>
        <!-- main部分 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
    import navtop from "@/components/buju/nav-top.vue";
    import leftNav from "@/components/buju/nav.vue";
    export default {
        components: {
            navtop,
            leftNav
        },
        data() {
            return {};
        },
        methods: {

        }
    };
</script>
