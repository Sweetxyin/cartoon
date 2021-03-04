import Vue from 'vue'     //这里的导入和python不太一样需要注意。
import Router from 'vue-router'
import login from '@/components/login'  //导入两个组件，@代表从根目录下找。
import adminmanage from '@/components/admin/adminmanage'
const layout = () =>import("@/components/page/layout")
const resource = () =>import("@/components/resource/ResourceManage")
const user = () =>import("@/components/user/UserManage")


Vue.use(Router)

export default new Router({
  // 在创建的 router 对象中，如果不配置 mode，就会使用默认的 hash 模式，该模式下会将路径格式化为 #! 开头。
  mode: 'history',
  //路由除了创建项目的时候安装，也可以单独安装
  // base:'/dist/',
  routes: [

    {
      path: '/login',    //路径需要和App.vue中一致，不然找不到。/目录建议默认一个，不然首页会为空。
      name: 'login',   //这个名字不是很重要，可写可不写，主要是区分组件功能。
      component: login   //写组件文件名字。
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      children: [

        {
        path: '/adminmanage',
        name: 'adminmanage',
        component: adminmanage
      }, {
          path: '/resource',
          name: 'resource',
          component: resource
        }
        ,{
          path: '/user',
          name: 'user',
          component: user
        }]
    }
  ]
})
