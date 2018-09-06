import Vue from 'vue'
import Router from 'vue-router'
/*所有页面*/ 
import Home from '@/pages/home'
import User from '@/pages/user'
import TongChengBian from '@/pages/tcb'
import TcbMain from '@/pages/tcbmain'
import Activities from '@/pages/act'
import News from '@/pages/news'
import ActMain from '@/pages/actmain'
import NewsMain from '@/pages/newsmain'
import Rank from '@/pages/rank'
import PushInfo from '@/pages/push'
import GoToUser from '@/pages/toUser'
import Mine from '@/pages/mine'
import Suggest from '@/pages/suggest'
//push下子路由
import Info from '@/components/pushgroup/info'
import Reinfo from '@/components/pushgroup/reinfo'
/*user下子路由*/ 
import Login from '@/components/usergroup/login'
import Register from '@/components/usergroup/register'
import GetLose from '@/components/usergroup/getlose'
/*mine下子路由*/ 
import SetPwd from '@/components/minegroup/setpwd'
import SetInfo from '@/components/minegroup/setinfo'
import MyInfo from '@/components/minegroup/myinfo'
import Yfbd from '@/components/minegroup/yfbd'
import Bjsd from '@/components/minegroup/bjsd'
import Yjsd from '@/components/minegroup/yjsd'
import VipUp from '@/components/minegroup/vipup'
import ChongZhi from '@/components/minegroup/chongzhi'
import TiXian from '@/components/minegroup/tixian'
import MineHome from '@/components/minegroup/minehome'
import CheckName from '@/components/minegroup/checkname'
import ChangeTel from '@/components/minegroup/changetel'
//rank下子路由
import RankRec from '@/components/rankgroup/rankRec'
import RankSend from '@/components/rankgroup/rankSend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/suggest',
      component: Suggest
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      children:[
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        },
        {
          path: 'getlose',
          name: 'getlose',
          component: GetLose
        },
      ]
    },
    {
      path: '/tcb',
      name: 'tongchengbian',
      component: TongChengBian
    },
    {
      path: '/tcbmain',
      name: 'tcbmain',
      component: TcbMain
    },
    {
      path: '/act',
      name: 'act',
      component: Activities,
    },
    {
      path: '/actmain',
      name: 'actmain',
      component: ActMain,
    },
    {
      path: '/news',
      component: News,
    },
    {
      path: '/newsmain',
      component: NewsMain,
    },
    {
      path: '/rank',
      component: Rank,
      children:[
        {
          path: 'send',
          component: RankSend
        },
        {
          path: 'rec',
          component: RankRec
        }
      ]
    },
    {
      path: '/push',
      component: PushInfo,
      children:[
        {
          path:'info',
          component: Info,
        },
        {
          path:'reinfo',
          component: Reinfo,
        }
      ]
    },
    {
      path: '/gtu',
      name: 'gotouser',
      component: GoToUser,
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
      children:[
        {
          path: 'home',
          component: MineHome,
        },
        {
          path: 'check',
          component: CheckName,
        },
        {
          path: 'setpwd',
          component: SetPwd,
        },
        {
          path: 'myinfo',
          component: MyInfo,
        },
        {
          path: 'yfbd',
          component: Yfbd,
        },
        {
          path: 'bjsd',
          component: Bjsd,
        },
        {
          path: 'yjsd',
          component: Yjsd,
        },
        {
          path: 'setinfo',
          component: SetInfo,
        },
        {
          path: 'vipup',
          component: VipUp,
        },
        {
          path:'cz',
          component:ChongZhi
        },
        {
          path:'tx',
          component:TiXian
        },
        {
          path:'change',
          component:ChangeTel
        },
      ]
    },
  ]
})
