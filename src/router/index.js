import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import SearchGo from '@/views/SearchGo'
import Detail from '@/views/Detail'
import Addshopcart from '@/views/Addshopcart'
import Shopcart from '@/views/Shopcart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import Paysuccess from '@/views/Paysuccess'
import Center from '@/views/Center'
import Myorder from '@/views/Center/Myorder'
import Group from '@/views/Center/Group'


import store from "@/store";
//先把VueRouter原型对象的push，先保存一份
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.push;

//重写push||replace(路由跳转为当前路由时，控制台会报错，所以需要重写push,replace)
//第一个参数：告诉push往哪里跳转（传递那些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call 改变originPush()的上下文为VueRouter实例对象
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    //call originReplace()的上下文为VueRouter实例对象
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}
const router = new VueRouter({
  mode: 'hash',//默认路由工作模式为hash模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        isShow: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isShow: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        isShow: false
      }
    },
    {
      path: '/searchGo/:keyword?',//params路由传参(可选参数需要加?)，需要在路由path后面添加参数名，否则路由跳转没有内容
      name: 'searchGo',
      component: SearchGo,
      meta: {
        isShow: false
      }
    },
    {
      path: '/detail/:skuId',//params路由传参
      name: 'detail',
      component: Detail,
      meta: {
        isShow: false
      },
    },
    {
      path: '/addshopcart',
      name: 'addshopcart',
      component: Addshopcart,
      meta: {
        isShow: true
      },
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: Shopcart,
      meta: {
        isShow: true
      }
    },
    {
      path: '/trade',
      name: 'trade',
      component: Trade,
      meta: {
        isShow: true
      },
      //路由独享守卫
      beforeEnter: (to, from, next) => {
        if (from.path == '/shopcart') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/pay:totalNum',
      name: 'pay',
      component: Pay,
      meta: {
        isShow: true
      },
      //路由独享守卫
      beforeEnter: (to, from, next) => {
        if (from.path == '/trade') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/paysuccess',
      name: 'paysuccess',
      component: Paysuccess,
      meta: {
        isShow: true
      },
    },
    {
      path: '/center',
      name: 'center',
      component: Center,

      //子路由
      children: [
        {
          path: 'myorder',
          name: 'myorder',
          component: Myorder,
          meta: {
            isShow: true
          },
        },
        {
          path: 'group',
          name: 'group',
          component: Group,
          meta: {
            isShow: true
          },
        },
        {
          path: '/center',
          redirect: '/center/myorder'
        }
      ]
    },

  ]
})

//全局前置路由守卫
router.beforeEach(async (to, from, next) => {
  //to:获取到要跳转到的路由信息
  //from：获取到从哪个路由跳转过来来的信息
  //next: next() 放行  next('path') 放行
  next();
  const token = store.state.user.token;
  const name = store.state.user.userInfo.name;
  if (token) {
    //登录且有用户信息访问的路由
    if (name) {
      if (to.path == '/login' || to.path == '/register') {
        next('/');
      } else {
        next();
      }
    } else {
      try {
        // 登录了但没有用户信息
        await store.dispatch('getUserInfo');
        next();
      } catch (error) {
        //token失效了需要重新登录
        await store.dispatch('userLoginOut');
        next('/login')
      }
    }

  } else {
    //未登录
    //不能访问订单，购物车,支付页面
    if (to.path == '/addshopcart'||to.path == '/shopcart' || to.path == '/trade' || to.path.includes('/pay') || to.path.includes('/center')) {
      alert('请您确认登录')
      //把未登录要去的路由，存储在地址栏中
      next('/login?redirect=' + to.path)
    }
    next()
  }
})
export default router;