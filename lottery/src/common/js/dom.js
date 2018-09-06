import Vue from 'vue'
import moment from 'moment';
// 时间过滤器
Vue.filter('dateFmt', (input, dateFmtString) => {
    const lastFmtString = dateFmtString || 'YYYY-MM-DD HH:mm:ss'
    return moment(input).format(lastFmtString)
})


export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}
  
export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }

    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

export function removeClass( elements,cName ){ 
    if( hasClass( elements,cName ) ){ 
        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );
    }; 
};
  
export function getData(el, name, val) {
    const prefix = 'data-'
    if (val) {
        return el.setAttribute(prefix + name, val)
    }
    return el.getAttribute(prefix + name)
}
  
let elementStyle = document.createElement('div').style

let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }

    return false
})()

export function prefixStyle(style) {
    if (vendor === false) {
        return false
    }
    if (vendor === 'standard') {
        return style
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

export function MillisecondToDate(mss) {
    if (mss<1000) {
        return "00:00:00"
    }
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((mss % (1000 * 60)) / 1000);
    hours = hours < 10 ? ('0' + hours) : hours;
    minutes = minutes < 10 ? ('0' + minutes) : minutes;
    seconds = seconds < 10 ? ('0' + seconds) : seconds;
    return  hours + " :" + minutes + " :" +seconds;
}
export function add8Hour(time) {
    return parseInt(time+1000*60*60*8)
}

export function debounce (func, delay) {
    let timer
    return function (...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }

  //随机生成8位数
export function MathRand6()
{
    var Num="";
    for(var i=0;i<6;i++)
    {
        Num+=Math.floor(Math.random()*10);
    }
    return Num;
}

