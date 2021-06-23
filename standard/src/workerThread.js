const cluster = require("cluster");
const cpusLen = require("os").cpus().length;
const {parentPort} = require('worker_threads');
const {workerNum, workerFilePath} = require("./config")



if (cluster.isMaster) {
    // 创建工作进程函数
    const createWorker = () => {
        // 创建进程
        const worker = cluster.fork();
        // 监听父线程消息，并转发给子进程。
        parentPort.on("message", msg => {
            if (msg.type === "port") {
                worker.send({type: "port", port: msg.port})
            }
        })
        // 监听子进程消息并转发给父线程
        worker.on("message", msg => {
            parentPort.postMessage(msg);
        })
        // 监听进程异常退出并重新创建
        worker.on("exit", () => {
            createWorker();
        })
    }
    // 按配置创建进程，但不可大于CPU核数
    let max
    if (workerNum) {
        max = workerNum > cpusLen ? cpusLen : workerNum
    } else {
        max = 1
    }
    for (let i = 0; i < max; i++) {
        createWorker();
    }
} else {
    // 后端服务执行文件
    require(workerFilePath)
}


