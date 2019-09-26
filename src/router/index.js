import Vue from 'vue'
import Router from 'vue-router'
import BotNav from '@/components/tabs'
import Login from '@/pages/login' //登录页
import ForgetPwd from '@/pages/forgetPwd' //忘记密码
import Register from '@/pages/register' //注册
import Home from '@/pages/home' //首页
import Contract from '@/pages/contract' //c2c
import Mine from '@/pages/mine' //我的
import Withdraw from '@/pages/homepage/withdraw' //提现
import Shift from '@/pages/homepage/shift' //转出现金钱包
import Recharge from '@/pages/homepage/recharge' //充值
import Safety from '@/pages/homepage/safety' //安全中心
import Chat from '@/pages/homepage/chat' //客服
import AboutAs  from '@/pages/homepage/aboutAs' //关于我们
import RechWay  from '@/pages/homepage/rechWay' //充值方法
import BuyPlan  from '@/pages/homepage/buyPlan' //购买计划
import BuyRecord  from '@/pages/homepage/buyRecord' //购买计划记录
import ProductIn  from '@/pages/homepage/productIn' //产品介绍
import WithRecord  from '@/pages/homepage/withRecord' //提现记录
import Transfer  from '@/pages/homepage/transfer' //转账
import AccountAuth  from '@/pages/homepage/accountAuth' //账户认证
import Organization  from '@/pages/homepage/organization' //组织架构
import AwardProgram  from '@/pages/homepage/awardProgram' //奖励计划
import Generalize  from '@/pages/homepage/generalize' //推广链接
import WithAddress  from '@/pages/homepage/withAddress' //提现地址
Vue.use(Router)
export default new Router({
	// mode: "history",
  // scrollBehavior(to, from, savedPosition) {
	// 	//判断如果滚动条的位置存在直接返回到当前位置，否者返回到起点
	// 	console.log(to);
	// 	console.log(from);
	// 	console.log(savedPosition);
  //   if (to.hash) {
  //     return {
  //       selector: to.hash
  //     }
  //   }
  //   // if (savedPosition) {
	// 	// 	console.log("111");
  //   //   return {x: 500, y: 500}
  //   // } else {
	// 	// 	console.log("222");
  //   //   if (to.hash) {
  //   //     return {
  //   //       selector: to.hash
  //   //     }
  //   //   }
  //   // }
  // },
  routes: [{ //默认路由
     path: '/',
      name: 'login',
      components: {
        main: Login,
      },
      meta: {
        index: 1,
      }
    },
        {
      path: '/forgetpwd',
      name: 'forgetpwd',
      components: {
        main: ForgetPwd
      },
      meta: {
        index: 2
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        main: Register
      },
      meta: {
        index: 2
      }
    },
    {
      path: '/home',
      name: 'home',
      components: {
        main: Home,
        footer: BotNav,
      },
      meta: {
        index: 2,
        // none: "true",
        // keepAlive:true,
      }
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      components: {
        main: Withdraw,
      },
      meta: {
        index: 3,
        // keepAlive:true,
      }
    },
    {
      path: '/chat',
      name: 'chat',
      components: {
        main: Chat,
      },
      meta: {
        index: 3,
        keepAlive:true,
      }
    },
      {
      path: '/recharge',
      name: 'recharge',
      components: {
        main: Recharge,
      },
      meta: {
        index: 3,
        // keepAlive:true,
      }
    },
    {
      path: '/shift',
      name: 'shift',
      components: {
        main: Shift,
      },
      meta: {
        index: 3,
        // keepAlive:true,
      }
    },
     {
      path: '/safety',
      name: 'safety',
      components: {
        main: Safety,
      },
      meta: {
        index: 3,
        // keepAlive:true,
      }
    },
     {
      path: '/aboutAs',
      name: 'aboutAs',
      components: {
        main: AboutAs,
      },
      meta: {
        index: 4,
        // keepAlive:true,
      }
    },


    {
      path: '/rechWay',
      name: 'rechWay',
      components: {
        main: RechWay,
      },
      meta: {
        index: 4,
        // keepAlive:true,
      }
    },
     {
      path: '/buyPlan',
      name: 'buyPlan',
      components: {
        main: BuyPlan,
      },
      meta: {
        index: 3,
        // keepAlive:true,
      }
    },
    {
      path: '/productIn',
      name: 'productIn',
      components: {
        main: ProductIn,
      },
      meta: {
        index: 4,
        // keepAlive:true,
      }
    },
     {
      path: '/buyRecord',
      name: 'buyRecord',
      components: {
        main: BuyRecord,
      },
      meta: {
        index: 5,
        keepAlive:true,
      }
    },
      {
      path: '/withRecord',
      name: 'withRecord',
      components: {
        main: WithRecord,
      },
      meta: {
        index: 3,
        keepAlive:true,
      }
    },
       {
      path: '/transfer',
      name: 'transfer',
      components: {
        main: Transfer,
      },
      meta: {
        index: 4,
        keepAlive:true,
      }
    },

     {
      path: '/contract',
      name: 'contract',
      components: {
        main: Contract,
        footer: BotNav,
      },
      meta: {
        index: 2,
        none: "true",
        // keepAlive:true,
      }
    },
     {
      path: '/mine',
      name: 'mine',
      components: {
        main: Mine,
        footer: BotNav,
      },
      meta: {
        index: 2,
        none: "true",
        // keepAlive:true
      }
    },
     {
      path: '/accountAuth',
      name: 'accountAuth',
      components: {
        main: AccountAuth,
      },
      meta: {
        index: 3,
        // keepAlive:true
      }
    },
     {
      path: '/organization',
      name: 'organization',
      components: {
        main: Organization,
      },
      meta: {
        index: 3,
        keepAlive:true
      }
    },
     {
      path: '/awardProgram',
      name: 'awardProgram',
      components: {
        main: AwardProgram,
      },
      meta: {
        index: 3,
        // keepAlive:true
      }
    },
    {
      path: '/generalize',
      name: 'generalize',
      components: {
        main: Generalize,
      },
      meta: {
        index: 3,
        keepAlive:true
      }
    },
    {
      path: '/withAddress',
      name: 'withAddress',
      components: {
        main: WithAddress,
      },
      meta: {
        index: 3,
        // keepAlive:true
      }
    },
    ],
    });
