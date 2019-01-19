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
vueRouter.beforeEach(function(to, from, next){
  console.log(to);
  /*if(to.path ==){

  }*/

  next();
})
export default vueRouter;
