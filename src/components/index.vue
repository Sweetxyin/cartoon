<template>
  <div>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <div class="fine">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        imgSrc:require('../assets/bj1.jpg')
    };
  },
  methods: {}
};
</script>


 <style>
   .background{
     width:100%;
     height:100%;  /**宽高100%是为了图片铺满屏幕 */
     z-index:-1;
     position: absolute;
   }
   .fine{
     z-index:1;
     position: absolute;
   }
</style>
