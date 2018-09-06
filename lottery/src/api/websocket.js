
import { config } from './config'
import { deal1 } from './config'


export function openWebSocket() {
    let baseSokectQueue = [];
     var divisor = "lottery@alpha";
    // var domain = "https://lottery-test-bucket2.oss-cn-hongkong.aliyuncs.com/";
    var domain = config.domain;
    var hostUrl = config.hostUrl;//http://47.91.168.10/
    var socketType = config.socketType;
    if ("WebSocket" in window) {
        var ddd = { timestamp: "" + new Date().getTime() - localStorage.getItem("time-version").split("-")[0] };
        ddd = deal1(ddd);
        // 打开一个 web socket
        // var ws = new WebSocket(socketType+"://"+window.location.host+"/common/socket?timestamp="+ddd.timestamp+"&sign="+ddd.sign);
        var ws = new WebSocket(socketType + config.local + ddd.timestamp + "&sign=" + ddd.sign);
        ws.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            ws.send("发送数据");
            console.log("数据发送中...");
            //baseSokectQueue = new SokectQueue();
        };
        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            if (received_msg) {
                baseSokectQueue.unshift(JSON.parse(received_msg));
                var baseSokectQueued=baseSokectQueue[0];
                for (var i = 0; i < window.vm.$store.state.lotteryList.length;i++){
                    if (window.vm.$store.state.lotteryList[i].id == baseSokectQueued.lotteryId){
                            if (window.vm.$store.state.histortList.length && window.vm.$store.state.histortList[0].lotteryId == baseSokectQueued.lotteryId){
                                window.vm.$store.state.histortList.unshift({
                                    lotteryId: baseSokectQueued.lotteryId,
                                    lotteryNo : baseSokectQueued.lotteryNo,
                                    result : baseSokectQueued.result,
                                    nextNo : baseSokectQueued.nextNo,
                                    remainTime : baseSokectQueued.remainTime,
                                    shortNextNo : baseSokectQueued.shortNextNo,
                                    shortNo : baseSokectQueued.shortNo,
                                    addTime : baseSokectQueued.addTime
                               })
                                window.vm.$store.state.histortList.splice(20, window.vm.$store.state.histortList.length - 20)
                        }
                        window.vm.$store.state.lotteryList[i].lotteryDraw.lotteryNo = baseSokectQueued.lotteryNo;
                        window.vm.$store.state.lotteryList[i].lotteryDraw.nextNo = baseSokectQueued.nextNo;
                        window.vm.$store.state.lotteryList[i].lotteryDraw.remainTime = baseSokectQueued.remainTime;
                        window.vm.$store.state.lotteryList[i].lotteryDraw.result = baseSokectQueued.result;
                        window.vm.$store.state.lotteryList[i].lotteryDraw.shortNextNo = baseSokectQueued.shortNextNo;
                        window.vm.$store.state.lotteryList[i].lotteryDraw.shortNo = baseSokectQueued.shortNo;
                    }
                }
               
            }
        };
        ws.onclose = function () {
            // 关闭 websocket
            setTimeout(function(){
                openWebSocket();
            },1000);
            console.log("连接已关闭...正在重新链接");

        };
        ws.error = function () {
            // 关闭 websocket
            console.log("连接异常...");
        };
    } else {
        // 浏览器不支持 WebSocket
        console.log("您的浏览器不支持 WebSocket!");
    }
}

openWebSocket()