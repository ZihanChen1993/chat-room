import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import Room from '@/view/Room'
import Info from '@/view/Info'
import Login from '@/view/Login'
// import Avatar from '@/view/Avatar'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path:'/',
      name:'Home',
      component: Home
    },
    {
      path:'/room/:id',
      name:'Room',
      component: Room
    },
    {
      path:'/info',
      name: 'Info',
      component:Info
    },
    {
      path:'/login',
      name: 'Login',
      component:Login
    },
    // {
    //   path:'/avatar',
    //   name: 'Avatar',
    //   component:Avatar
    // }
  ]
})

export default router;

router.beforeEach((to, from, next) => {
  //console.log(to);
  //console.log(from);
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const isLogin = window.sessionStorage.getItem('token');
  if (isLogin){
    next();
  }else{
    if (to.fullPath == "/login") {
      next();
    }else{
      next({path: '/login'})
    }
  }
})

