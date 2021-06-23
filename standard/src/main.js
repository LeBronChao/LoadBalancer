const {urlDesc, balancerNum} = require("./config")
const cluster = require("cluster");
const path = require("path");
const cpusLen = require("os").cpus().length;
const {DataBase} = require("./util");
const {Worker} = require('worker_threads');


// 设置线程池大小
// process.env.UV_THREADPOOL_SIZE = 64


const runWorker = () => {
    // 防止监听端口数 > CPU核数
    const urlObjArr = urlDesc.slice(0, cpusLen);
    // 初始化创建子线程
    for (let i = 0; i < urlObjArr.length; i++) {
        createWorkerThread(urlObjArr[i].url);
    }
}

const runBalancer = () => {
    // 设置子进程执行文件
    cluster.setupMaster({exec: path.resolve(__dirname, "./balancer.js")});
    // 初始化创建子进程
    let max
    if (balancerNum) {
        max = balancerNum > cpusLen ? cpusLen : balancerNum
    } else {
        max = 1
    }
    for (let i = 0; i < max; i++) {
        createBalancer();
    }
}


const createWorkerThread = (listenUrl) => {
    // 创建线程
    const worker = new Worker(path.resolve(__dirname, "./workerThread.js"));
    // 获取监听端口
    const listenPort = listenUrl.split(":")[2];
    // 向子线程发送要监听的端口号
    worker.postMessage({type: "port", port: listenPort});

    // 接收子线程消息统计进程被访问次数
    worker.on("message", (msg) => {
        // 监听连接事件并触发计数事件
        if (msg.type === "connect") {
            balanceDataBase.add(msg.port);
        }
        // 监听断开连接事件并触发计数事件
        else if (msg.type === "disconnect") {
            balanceDataBase.sub(msg.port);
        }
    });
    // 监听异常退出事件并重新创建进程
    worker.on("exit", () => {
        createWorkerThread(listenUrl);
    });
}

const createBalancer = () => {
    // 创建进程
    const worker = cluster.fork();
    worker.on("message", (msg) => {
        // 监听更新响应时间事件
        if (msg.type === "updateCostTime") {
            balanceDataBase.updateCostTime(msg.URL, msg.costTime)
        }
        // 监听获取url统计对象事件并返回
        if (msg.type === "getUrlCollect") {
            worker.send({type: "getUrlCollect", urlCollect: balanceDataBase.urlCollect})
        }
    });
    // 监听异常退出事件并重新创建进程
    worker.on("exit", () => {
        createBalancer();
    });
}
// 初始化负载均衡数据统计对象
const balanceDataBase = new DataBase(urlDesc);
// 运行均衡器
runBalancer();
// 运行后端服务节点
runWorker();




