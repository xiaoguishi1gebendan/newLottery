import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = (resolve) => {
  import ('components/home/home').then((module) => {
    resolve(module)
  })
}

const Mine = (resolve) => {
  import ('components/mine/mine').then((module) => {
    resolve(module)
  })
}

const Bulletin = (resolve) => {
  import ('components/mine/child/information/bulletin').then((module) => {
    resolve(module)
  })
}

const PMsg = (resolve) => {
  import ('components/mine/child/information/pMsg').then((module) => {
    resolve(module)
  })
}
const ProfitLoss = (resolve) => {
  import ('components/mine/child/profitLoss/profitLoss').then((module) => {
    resolve(module)
  })
}

const ShareMoney = (resolve) => {
  import ('components/mine/child/ShareMoney/ShareMoney').then((module) => {
    resolve(module)
  })
}
const SMoney = (resolve) => {
  import ('components/mine/child/ShareMoney/sMoney').then((module) => {
    resolve(module)
  })
}
const MyCommission = (resolve) => {
  import ('components/mine/child/ShareMoney/myCommission').then((module) => {
    resolve(module)
  })
}
const howmoney = (resolve) => {
  import ('components/mine/child/ShareMoney/howmoney').then((module) => {
    resolve(module)
  })
}
const commissionDtl = (resolve) => {
  import ('components/mine/child/ShareMoney/commissionDtl').then((module) => {
    resolve(module)
  })
}
const Online = (resolve) => {
  import ('components/mine/child/online/online').then((module) => {
    resolve(module)
  })
}

const BuyLettery1 = (resolve) => {
  import ('components/BuyLettery/BuyLettery1').then((module) => {
    resolve(module)
  })
}

const BuyLettery6 = (resolve) => {
  import ('components/BuyLettery/BuyLettery6').then((module) => {
    resolve(module)
  })
}

const Discover = (resolve) => {
  import ('components/discover/Discover').then((module) => {
    resolve(module)
  })
}

const LogIn = (resolve) => {
  import ('components/logIn/logIn').then((module) => {
    resolve(module)
  })
}
const Withdraw = (resolve) => {
  import ('components/mine/child/Withdraw/Withdraw').then((module) => {
    resolve(module)
  })
}

const record = (resolve) => {
  import ('components/mine/child/record/record').then((module) => {
    resolve(module)
  })
}
const recodeDetal = (resolve) => {
  import ('components/mine/child/record/recodeDetal').then((module) => {
    resolve(module)
  })
}
const SafeSetting = (resolve) => {
  import ('components/mine/child/safeSetting/safeSetting').then((module) => {
    resolve(module)
  })
}

const Agent = (resolve) => {
  import ('components/mine/child/agent/agent').then((module) => {
    resolve(module)
  })
}
const AgentExplain = (resolve) => {
  import ('components/mine/child/agent/agentExplain').then((module) => {
    resolve(module)
  })
}
const Recharge = (resolve) => {
  import ('components/mine/child/chongzhi/Recharge').then((module) => {
    resolve(module)
  })
}
const rechargedetal = (resolve) => {
  import ('components/mine/child/chongzhi/rechargedetal').then((module) => {
    resolve(module)
  })
}

const Banking = (resolve) => {
  import ('components/mine/child/chongzhi/Banking').then((module) => {
    resolve(module)
  })
}
const bankdetal = (resolve) => {
  import ('components/mine/child/chongzhi/bankdetal').then((module) => {
    resolve(module)
  })
}

const rechargedetaling = (resolve) => {
  import ('components/mine/child/chongzhi/rechargedetaling').then((module) => {
    resolve(module)
  })
}

const bet = (resolve) => {
  import ('components/mine/child/touZhu/bet').then((module) => {
    resolve(module)
  })
}
const AgentReport = (resolve) => {
  import ('components/mine/child/agent/agentReport').then((module) => {
    resolve(module)
  })
}
const LowerReport = (resolve) => {
  import ('components/mine/child/agent/LowerReport').then((module) => {
    resolve(module)
  })
}
const LowerOpenAccount = (resolve) => {
  import ('components/mine/child/agent/LowerOpenAccount').then((module) => {
    resolve(module)
  })
}
const MemberManage = (resolve) => {
  import ('components/mine/child/agent/MemberManage').then((module) => {
    resolve(module)
  })
}
const BetDetail = (resolve) => {
  import ('components/mine/child/agent/BetDetail').then((module) => {
    resolve(module)
  })
}
const ExchangeDetail = (resolve) => {
  import ('components/mine/child/agent/ExchangeDetail').then((module) => {
    resolve(module)
  })
}
const changePsd = (resolve) => {
  import('components/mine/child/safeSetting/changePsd').then((module) => {
    resolve(module)
  })
}
export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Recharge',
      name: 'Recharge',
      component: Recharge,
      // children:[{
      //   path: ':id', 
      //   component: rechargedetal,
      // }]
    },
    {
      path: '/Recharge/:id', 
      
      component: rechargedetal,
    },
    {
      path: '/banking',
      name: 'Banking',
      component: Banking
    },
    {
      path: '/bankdetal',
      name: 'bankdetal',
      component: bankdetal
    },
    {
      path: '/rechargedetaling',
      name: 'rechargedetaling',
      component: rechargedetaling
    },
    
    {
      path: '/Mine',
      name: 'Mine',
      component: Mine,
      children: [
        {
          path: '/changePsd',
          name: 'changePsd',
          component: changePsd
        },
        {
          path: '/Withdraw',
          name: 'Withdraw',
          component: Withdraw
        },
        {
          path: '/bet',
          name: 'bet',
          component: bet,
          children: [{
            path: '/recodeDetal',
            name: 'recodeDetal',
            component: recodeDetal
          }, ]
        },
        {
          path: '/record',
          name: 'record',
          component: record,

        },
        {
          path: '/safeSetting',
          name: 'safeSetting',
          component: SafeSetting
        },
        {
          path: '/ProfitLoss',
          name: 'ProfitLoss',
          component: ProfitLoss
        },
        {
          path: '/agent',
          name: 'agent',
          component: Agent,
          children: [{
              path: '/agentExplain',
              name: 'agentExplain',
              component: AgentExplain
            },
            {
              path: '/agentReport',
              name: 'agentReport',
              component: AgentReport
            },
            {
              path: '/lowerReport',
              name: 'lowerReport',
              component: LowerReport
            },
            {
              path: '/lowerOpenAccount',
              name: 'lowerOpenAccount',
              component: LowerOpenAccount
            },
            {
              path: '/memberManage',
              name: 'memberManage',
              component: MemberManage
            },
            {
              path: '/betDetail',
              name: 'betDetail',
              component: BetDetail
            },
            {
              path: '/exchangeDetail',
              name: 'exchangeDetail',
              component: ExchangeDetail
            }
          ]
        },
        {
          path: '/Online',
          name: 'Online',
          component: Online
        },
        {
          path: '/Bulletin',
          name: 'Bulletin',
          component: Bulletin,
          children:[
            {
              path: '/PMsg/:id',
              name: 'PMsg',
              component: PMsg
            },
          ]
        },
        {
          path: '/ShareMoney',
          name: 'ShareMoney',
          component: ShareMoney,
          children: [{
              path: '/SMoney',
              name: 'SMoney',
              redirect: '/ShareMoney',
              component: SMoney
            },
            {
              path: '/MyCommission',
              name: 'MyCommission',
              redirect: '/ShareMoney',
              component: MyCommission
            },
          ]
        },
        {
          path: '/howmoney',
          name: 'howmoney',
          component: howmoney
        },
      ]
    },
    {
      path: '/commissionDtl',
      name: 'commissionDtl',
      component: commissionDtl
    },
    
    {
      path: '/Discover',
      name: 'Discover',
      component: Discover
    },
    {
      path: "/BuyLettery/1",
      component: BuyLettery1,

    },
    {
      path: "/BuyLettery/6",
      component: BuyLettery6,
    },
    {
      path: "/logIn",
      component: LogIn
    }
  ]
})


