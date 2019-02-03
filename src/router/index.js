import Vue from 'vue'
import Router from 'vue-router'
/* 网易云主页 */
import NetCloudMusicIndex from '@/components/NetCloudMusicIndex'
/* 网易云导航 */
import FindMusic from '@/components/IndexComponents/IndexContent/IndexContentFindMusic'
import MyMusic from '@/components/IndexComponents/IndexContent/IndexContentMyMusic'
import DownloadClient from '@/components/IndexComponents/IndexContent/IndexContentDownloadClient'
import Musician from '@/components/AppOutputComponent/AppOutputMusician'
/* 网易云发现音乐导航 */
import SongSheet from '@/components/IndexComponents/IndexContent/FindMusic/FindMusicSongSheet'
import MusicSinger from '@/components/IndexComponents/IndexContent/FindMusic/FindMusicSinger'
/*登录页面*/
import MyLogin from '@/components/MyLogin'
Vue.use(Router)


var vueRouter = new Router({
  mode: 'hash',// 模式不能修改为history,因为有用到hash处理逻辑。
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {path: '/netCloudMusic', redirect: '/myMusicIndex'},
    {path: '/findMusic', redirect: '/songSheet'},
    {path: '/login', name: 'MyLogin', component:MyLogin },
    {
      path: '/',
      name: 'NetCloudMusicIndex',
      component: NetCloudMusicIndex,
      redirect: '/login',
      children: [
        {
          path: 'myMusicIndex',
          name: 'myMusicIndex',
          component: resolve => require(['@/components/IndexComponents/IndexContent/MyMusicIndex'], resolve),
          meta: {
            auth:true
          }
        },
        {
          path: '/findMusic',
          name: 'IndexContentFindMusic',
          component: FindMusic,
          children: [
            {path: '/songSheet', name: 'FindMusicSongSheet', component: SongSheet, meta: {auth: true}},
            {path: '/singer', name: 'FindMusicSinger', component: MusicSinger, meta: {auth: true}},
          ],
          meta: {
            keepAlive: false // 需要被缓存
          },
        },
        {
          path: '/myMusic',
          name: 'IndexContentMyMusic',
          component: MyMusic,
          meta: {auth: true, keepAlive: true}
        },
        {
          path: '/downloadClient',
          name: 'IndexContentDownloadClient',
          component: DownloadClient,
          meta: {auth: true,keepAlive: false}
        }
      ]
    },
    {
      path: '/musician',
      name: 'AppOutputMusician',
      component: Musician
    }
  ]
})

//处理当前页面没有登录过本网站时的登录处理。
// 每次切换路由时, 都要使用beforeEach()进行验证防护的一种。
vueRouter.beforeEach(function(to, from, next){
  // to.matched => 得到一个数组
  // to.matched.some some(callback) 回调函数中的参数为数组中的值, 表示数组中的值是否通过了回调函数的检测。
  if(to.matched.some(item => item.meta.auth)){ // 表示通过了验证, 每次在切换时都要进行
    if(!Number(sessionStorage.isLogin)){ // 处理的是否登录过。
      next({path: '/login'});//表示重定向
    }else {
      next();
    }
  }else {
    next();// 必须使用next()函数解析钩子
  }
  /*if(to.path ==){

  }*/
  next();
})
export default vueRouter;
