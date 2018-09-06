import {
  deal
} from './config'

localStorage.setItem("time-version", "2182-9.6.8");
//以下为接口调用
window.baseApi = {
  loadTimestamp: function () {
    var data = {};
    deal('mobile/05/001', data).then((result) => {
      localStorage.setItem("time-version", Math.abs(new Date().getTime() - result.data) + "-" + result.version);
      // console.log(Math.abs(new Date().getTime() - result.data));
      // console.log(result.version)
    });
  },
  lottery: function (addData) {
    let oldData = {
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0]
    };
    return deal('mobile/05/018', oldData);
  },

  /**
   * 根据彩种ID获取彩种整个规则,一级玩法--二级玩法--三级玩法--玩法明细值列表
   */
  getLotteryDetail: function (lotteryId) {
    let oldData = {
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      lotteryId: lotteryId
    };
    return deal('common/getLotteryDetail', oldData);
  },

  homeqmList: function (type) {
    let oldData = {
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      type: type
    };
    return deal('common/getPopUpInfo', oldData);
  },

  /**
   * 根据彩票ID获取彩票开奖结果的列表
   * @param lotteryId
   * @returns
   */
  getLotteryDraw: function (lotteryId) {
    var data = {
      lotteryId: lotteryId,
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
    };
    return deal('mobile/05/020', data);
  },

  /**
   * 登陆
   * @param account
   * @param password
   * @returns
   */
  login: function (account, password) {
    var data = {
      account: account,
      password: password,
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0]
    }
    return deal('mobile/05/008', data);
  },

  //获取生肖详情 
  getAnimalsCollections: function (lottera) {
    var data = {
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      type: lottera
    };
    return deal('mobile/05/050', data);
  },

  /**
   * 代理说明
   * @param userId
   * @returns
   */
  ploxyContent: function (userId) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId
    };
    return deal('mobile/01/014', data);
  },

  /**
   * 代理返点列表
   */
  rebateList: function (userId) {
    let data = {
      userId: userId,
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0]
    }
    return deal('mobile/01/001', data)
  },

  /**
   * 获取随机邀请码
   * @param userId
   * @returns
   */
  randomCode: function (userId) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId
    };
    return deal('mobile/01/004', data);
  },
  bettingList: function (pageSize, pageNumber, userId, type) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      pageSize: pageSize,
      pageNumber: pageNumber,
      userId: userId,
      type: type
    };
    return deal('mobile/02/021', data);
  },


  /**
   * 消息记录
   * @param pageSize
   * @param pageNumber
   * @param userId
   * @param type
   * @returns
   */
  messageList: function (pageSize, pageNumber, userId, type) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      pageSize: pageSize,
      pageNumber: pageNumber,
      userId: userId,
      type: type
    };
    return deal('mobile/02/013', data);
  },

  /**
   * 读取消息
   * @param userId
   * @param id
   * @returns
   */
  viewMessage: function (userId, id) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId,
      id: id
    };
    return deal('mobile/02/014', data);
  },
  /**
   * 代理佣金
   * @param pageNumber	页数
   * @param pageSize		每页多少条数据
   * @param userId
   * @param startTime		格式 2015-05-05
   * @param endTime
   * @returns
   */
  ploxyStatistics: function (pageNumber, pageSize, userId, startTime, endTime) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      pageNumber: pageNumber,
      pageSize: pageSize
    };
    return deal('mobile/01/010', data);
  },

  /**
   * 消息记录
   * @param pageSize
   * @param pageNumber
   * @param userId
   * @param type
   * @returns
   */
  messageList: function (pageSize, pageNumber, userId, type) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      pageSize: pageSize,
      pageNumber: pageNumber,
      userId: userId,
      type: type
    };
    return deal('mobile/02/013', data);
  },

  /**
   * 读取消息
   * @param userId
   * @param id
   * @returns
   */
  viewMessage: function (userId, id) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId,
      id: id
    };
    return deal('mobile/02/014', data);
  },

  /**
   * 生成邀请码并返回列表
   * @param userId
   * @param code
   * @param type
   * @param rebate
   * @returns
   */
  buildCode: function (userId, code, type, rebate) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId,
      code: code,
      type: type,
      rebate: rebate
    };
    return deal('mobile/01/005', data);
  },

  /**
   * 代理佣金详情	
   * @param userId
   * @param time		格式 2017-05-05
   * @returns
   */
  ploxyStatisticsDetail: function (userId, time) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId,
      time: time
    };

    return deal('mobile/01/011', data);
  },




  /**
   * 用户绑卡
   * @param userId
   * @param bankName
   * @param name
   * @param bankAccount
   * @param bankBranch
   * @param tradePwd
   * @returns
   */
  tiedCard: function (userId, bankName, name, bankAccount, bankBranch, tradePwd) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId,
      bankName: bankName,
      name: name,
      bankAccount: bankAccount,
      bankBranch: bankBranch,
      'user.traderPassword': tradePwd
    };
    return deal('mobile/02/006', data);
  },


  // 用户信息
  userInfo: function (userId) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId
    };
    return deal('mobile/02/001', data);
  },

  /**
   * 用户投注列表
   * @param pageSize
   * @param pageNumber
   * @param userId
   * @param type
   * @returns
   */
  bettingList: function (pageSize, pageNumber, userId, type) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      pageSize: pageSize,
      pageNumber: pageNumber,
      userId: userId,
      type: type
    };
    return deal('mobile/02/021', data);
  },

  /**
   * 账户明细列表
   * @param pageSize
   * @param pageNumber
   * @param userId
   * @param type
   * @returns
   */
  accountDetailList: function (pageSize, pageNumber, userId, type) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      pageSize: pageSize,
      pageNumber: pageNumber,
      userId: userId,
      type: type
    };
    return deal('mobile/02/015', data);
  },

  /**
   * 充值列表
   * @param pageSize
   * @param pageNumber
   * @param userId
   * @param status
   * @returns
   */
  rechargeList: function (pageSize, pageNumber, userId, status) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      pageSize: pageSize,
      pageNumber: pageNumber,
      userId: userId,
      status: status
    };
    return deal('mobile/02/007', data);
  },

  /**
   * 提款列表
   * @param pageSize
   * @param pageNumber
   * @param userId
   * @param status
   * @returns
   */
  drawList: function (pageSize, pageNumber, userId, status) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      pageSize: pageSize,
      pageNumber: pageNumber,
      userId: userId,
      status: status
    };
    return deal('mobile/02/010', data);
  },
  newRechargeList: function (userId) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId
    };
    return deal('mobile/09/009', data);
  },

  /**
   * 消息记录
   * @param pageSize
   * @param pageNumber
   * @param userId
   * @param type
   * @returns
   */
  messageList: function (pageSize, pageNumber, userId, type) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      pageSize: pageSize,
      pageNumber: pageNumber,
      userId: userId,
      type: type
    };
    return deal('mobile/02/013', data);
  },

  /**
   * 读取消息
   * @param userId
   * @param id
   * @returns
   */
  viewMessage: function (userId, id) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId,
      id: id
    };
    return deal('mobile/02/014', data);
  },

  /**
   * 代理-团队报表
   * @param userId		用户id
   * @param uid			下级id
   * @param beginTime		格式:2016-01-01
   * @param endTime		格式:2016-01-01
   * @returns
   */
  teamReport: function (userId, uid, beginTime, endTime) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId,
      beginTime: beginTime,
      endTime: endTime,
      uid: uid
    };
    return deal('mobile/01/013', data);
  },
  /**
   * 订单详情
   * userId 用户ID ， bettingId 订单id
   */
  bettingDetai: function (userId, bettingId) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId,
      bettingId: bettingId
    };
    //	var result = deal('user/betting/detail', data);
    return deal('mobile/02/023', data);

  },

  /**
   * 邀请码列表
   * @param pageNumber
   * @param pageSize
   * @param userId
   * @returns
   */
  codeList: function (pageNumber, pageSize, userId) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId,
      pageNumber: pageNumber,
      pageSize: pageSize
    };
    return deal('mobile/01/006', data);
  },

  /**
   * 新充值-银行转账列表
   */
  rechargeBankList: function (userId, bankId) {
    var data = {
      token: localStorage.getItem("token"),
      timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
      userId: userId,
      bankId: bankId
    };
    return deal('mobile/09/010', data);
  },
}
