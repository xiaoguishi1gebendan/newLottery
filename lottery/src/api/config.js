import md5 from 'js-md5'
import axios from "axios";
import Qs from 'qs'
let divisor = "lottery@alpha";

export const config = {
  zipLoading: false,
  domain: "http://lottery-test-bucket2.oss-cn-hongkong.aliyuncs.com/",
  // hostUrl: "http://47.91.168.10/", //http://47.91.168.10/
  hostUrl: "http://47.91.215.153/", //http://47.91.168.10/
  socketType: "ws",
  zipUrl: 'common/loadBaseDataZip',
  local: ":///47.91.168.10/common/socket?timestamp=",

  skip: "http://172.16.10.191:8080/view/home/caipiaoxiangqin.html?vue=vue",
  oldurlone: ['mobile/05/007', 'mobile/05/015', 'computer/05/027', 'mobile/06/001', 'mobile/03/001', 'mobile/03/002', 'mobile/05/028', 'computer/05/032', 'computer/05/033', 'computer/05/034',
    'mobile/02/001', 'mobile/02/013', 'mobile/02/014', 'mobile/02/017', 'mobile/02/018', 'mobile/02/019', 'mobile/01/014', 'mobile/05/049', 'mobile/07/001', 'mobile/07/002',
    'mobile/07/003', 'mobile/07/004', 'common/getPopUpInfo'
  ],
  oldurltwo: ['common/loadBaseDataZip', 'common/home', 'common/aboutUs', 'common/notice/list', 'common/activity/list', 'common/activity/detail', 'common/getSystemContent', 'common/getInfoList',
    'common/getInfoPage', 'common/getHelpList', 'user/userInfo', 'user/message/list', 'user/message/view', 'user/feedback/add', 'user/feedback/list', 'user/feedback/detail',
    'user/ploxy/content', 'common/getBaseConfig', 'common/project/detail', 'common/project/downloadAnroid', 'common/project/download', 'common/project/list', 'common/getPopUpInfo'
  ],
  newurl: ['common/ploadBaseDataZip', 'common/phome', 'common/paboutUs', 'common/pnotice/list', 'common/pactivity/list', 'common/pactivity/detail', 'common/pgetSystemContent',
    'common/pgetInfoList', 'common/pgetInfoPage', 'common/pgetHelpList', 'user/puserInfo', 'user/pmessage/list', 'user/pmessage/view', 'user/pfeedback/add', 'user/pfeedback/list',
    'user/pfeedback/detail', 'user/ploxy/pcontent', 'common/pgetBaseCon', 'common/pproject/detail', 'common/pproject/downloadAnroid', 'common/pproject/download', 'common/pproject/list', 'common/pgetPopUpInfo'
  ],
}

function loadTimestamp() {
  var data = {}
  deal('mobile/05/001', data).then((result) => {
    localStorage.setItem("time-version", Math.abs(new Date().getTime() - result.data) + "-" + result.version);
    // console.log(Math.abs(new Date().getTime() - result.data));
    // console.log(result.version)
  });
}
// 设置版本号
loadTimestamp()


function loadTimestamp2() {
  var data = {
    timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0],
    code: ""
  };
  deal('common/getBaseConfig', data).then(
    (result) => {
      window.homedatasedk = result.data;
      window.SpecialAgentIp = result.SpecialAgentIp;
      window.onlineURL = result.data.onlineCustomService.cvalue;

      console.log(result.data)
      console.log(result)
      if (result.code == 200) {
        localStorage.setItem("sysConfigMap", JSON.stringify(result.data));
      }
      if (result.data.domains.cvalue) {
        window.kehucval = result.data.domains.cvalue.split(",");
      } else {
        window.kehucval = [];
      }
      var domain = document.domain;
      //    特殊域名判断
      for (var i = 0; i < window.kehucval.length; i++) {
        if (window.kehucval[i] == domain) {
          // if (1) {
          zipUrl = base.newurl[0];
          getPTimestamp();
          break;
        }
      }
    }
  )


}
loadTimestamp2()

/**
 * 获取基础数据
 */
function getDict() {
  var data = {
    timestamp: new Date().getTime() - localStorage.getItem("time-version").split("-")[0]
  };
  	return deal('common/getDict', data)
}
getDict().then(
  (res)=>{
    localStorage.setItem('dictList',JSON.stringify(res.data.dictMap))
  }
);;


function getPTimestamp() {
  var data = {};
  deal('common/getPTimestamp', data).then(
    (result) => {
      window.ifcvalue = true;
      localStorage.setItem("time-version2", Math.abs(new Date().getTime() - result.data) + "-" + result.version);
    }
  );

}
export function deal(url, data) {
  data = deal1(data);
  data = Qs.stringify(data);
  return axios.post(config.hostUrl + url, data).then((res) => {
    if (res.data && res.data.code === 401) {
      alert("登陆状态过期")
      localStorage.removeItem("token")
      localStorage.setItem("currentUser", null)
    }
    return Promise.resolve(res.data)
  }).catch(function (error) {
    //跳转到登录页面
  })
}


//签名加密
export function deal1(data) {
  var tmp = [];
  each(data, function (key, val) {
    tmp[tmp.length] = key;
  })
  tmp.sort();
  var allParameters = "";
  each(tmp, function (i, key) {
    allParameters += key + data[key];
  });
  var sign = md5(divisor + allParameters).toLocaleUpperCase();
  data.sign = sign;
  return data;
}

//封装$.each方法
function each(object, callback) {
  var type = (function () {
    switch (object.constructor) {
      case Object:
        return 'Object';
        break;
      case Array:
        return 'Array';
        break;
      case NodeList:
        return 'NodeList';
        break;
      default:
        return 'null';
        break;
    }
  })();
  // 为数组或类数组时, 返回: index, value
  if (type === 'Array' || type === 'NodeList') {
    // 由于存在类数组NodeList, 所以不能直接调用every方法
    [].every.call(object, function (v, i) {
      return callback.call(v, i, v) === false ? false : true;
    });
  }
  // 为对象格式时,返回:key, value
  else if (type === 'Object') {
    for (var i in object) {
      if (callback.call(object[i], i, object[i]) === false) {
        break;
      }
    }
  }
}
