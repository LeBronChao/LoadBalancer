const cluster = require("cluster");
const cpusLen = require("os").cpus().length;
const {workerNum, workerFilePath} = require("../base/src/config")

if (cluster.isMaster) {
    const createWorker = () => {
        /*
         * TODO
         *  1. 创建工作进程
         *  2. 从父线程获取需监听的端口并转发个子进程
         *  3. 监听子进程的消息并转发给父线程
         *  4. 监听异常并做处理
         * */
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


