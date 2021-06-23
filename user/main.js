const {urlDesc, balancerNum} = require("../base/src/config")
const cpusLen = require("os").cpus().length;
const {DataBase} = require("../base/src/util");


const runWorker = () => {
    // 防止监听端口数 > CPU核数
    const urlObjArr = urlDesc.slice(0, cpusLen);
    // 初始化创建子线程
    for (let i = 0; i < urlObjArr.length; i++) {
        createWorkerThread(urlObjArr[i].url);
    }
}

const runBalancer = () => {
    // TODO  设置子进程执行文件  （ 文件./balancer.js）

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
    /*
    * TODO
    *  1. 创建线程 (文件：./workerThread.js)
    *  2. 给子线程发送需要监听的端口号
    *  3. 监听子线程的连接事件和断开连接事件并做响应处理（DataBase -> add、sub）
    *  4. 监听异常并做相应处理
    * */
}

const createBalancer = () => {
    /*
    * TODO
    *  1. 创建均衡器进程
    *  2. 监听子进程的更新响应时间事件、获取urlCollect事件并做相应处理(DataBase -> updateCostTime)
    *  3. 监听异常并做相应处理
    * */
}
// 初始化负载均衡数据统计对象
const balanceDataBase = new DataBase(urlDesc);
// 运行均衡器
runBalancer();
// 运行后端服务节点
runWorker();




