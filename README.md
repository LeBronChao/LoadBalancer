> 本项目为基于Node.js的负载均衡器，你可以选择
>
> 1. 通过README.md学习并实现这个负载均衡器
> 2. 直接跳转至快速开始模块使用 / standard文件夹查看源码

# 学习资料

[【深入浅出LB】手把手带你实现一个负载均衡器](https://juejin.cn/post/6987196608161005581/)





# 目录概览

1. base 基础目录

   - src 源代码
     - constant 常量
     - util 工具
     - config 配置
   - request 请求脚本

2. FE 前端（观看效果）

3. standard 参考实现

4. user 需要实现的代吗

   - algorithm 算法
     - ConsistentHash 一致性哈希
     - Fair 最小响应时间
     - index 导出
     - ipHash IP哈希
     - LeastConnections 最小连接数
     - Random 随机数
     - UrlHash  原地址哈希
     - WeightRoundRobin 权重轮询

   - balancer 均衡器
   - main  主流程
   - worker  后端服务
   - workerThread 多线程执行文件





# 快速开始

- 安装依赖

```bash
# 根目录下安装均衡器依赖
npm install
# FE目录下安装前端依赖
npm install
```



- config.js

  - urlDesc：后端服务节点配置对象数组，有url属性和weight属性，weight仅在WeightRoundRobin算法时起作用
  - port：均衡器监听端口
  - algorithm：算法名称

  - workerNum：后端服务端口开启进程数，提供并发能力。

  - balancerNum：均衡器端口开启进程数，提供并发能力。

  - workerFilePath：后端服务节点执行文件，推荐使用绝对路径。

  - 支持的算法名称：

  - ```js
    const ALGORITHM = {
        WEIGHT_ROUND_ROBIN: "weightRoundRobin",
        IP_HASH: "ipHash",
        URL_HASH: "urlHash",
        CONSISTENT_HASH: "consistentHash",
        FAIR: "fair",
        RANDOM: "random",
        LEAST_CONNECTIONS: "leastConnections",
    };
    ```





>  注：user和standard选择一个启动
>
> 查看均衡器参考实现效果启动standard
>
> 验证自行实现效果启动user，如需更换算法，修改base/config文件。

- 启动参考实现

```bash
# 根目录
npm run standard
```



- 启动User实现

```bash
# 根目录
npm run user
```



- 启动前端

```bash
# FE目录
npm run start
```



- 多进程并发请求脚本(如有需要)

```bash
# standard or base目录
node request
```



# 主流程概览

1. 多进程启动均衡器，使其具有并发能力
2. 多线程启动workerThread，启动多个端口服务
   - workerThread多进程启动后端服务，使单个端口有并发能力。

![img](https://bloginfo.lebronchao.com/doc-image/b0c41cb8eb2f495fb09565fa1c86ae19~tplv-8vc7tlzf3c-raw.png) 





# 架构设计图

> 多个handler表示有并发处理能力

![img](https://bloginfo.lebronchao.com/doc-image/ec26da0a165f46689e3e38f9c577beae~tplv-8vc7tlzf3c-raw.png) 





# TodoList

TODO1：算法实现

1. algorithm文件夹下除了index以外的算法实现
2. 详情见文件注释和高亮TODO



TODO2：main.js 主流程

1. 实现多进程运行均衡器，通过进程间通信做好事件代理
2. 实现多线程运行执行文件，通过线程间通信做好事件代理
3. 详情见文件注释和高亮TODO



TODO3：balancer.js 均衡器

1. 实现从主进程获取url统计对象
2. 实现更新主进程中的响应时间数据
3. 处理好事件代理（父进程（main） <-> 子进程（balancer））
4. 详情见文件注释和高亮TODO



TODO4：workerThread.js  多线程执行文件

1. 实现多进程启动后端服务，使其具有并发能力
2. 处理好事件代理（父线程（main） <-> 子线程（workerThread） <-> 子线程的子进程（worker））
3. 详情见注释和高亮TODO




# 最终效果

> 以下为Random算法效果
>
> 上图为连接分布统计
>
> 下图为响应时间统计

![img](https://bloginfo.lebronchao.com/doc-image/2dd4afb109264c7c8d7b8dfe311c8b3c~tplv-8vc7tlzf3c-raw.png)

