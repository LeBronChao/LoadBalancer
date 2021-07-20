const cpusLen = require("os").cpus().length;
const LoadBalance = require("./algorithm");
const express = require("express");
const axios = require("axios");
const app = express();
const {urlFormat, ipFormat} = require("./util");
const {ALGORITHM, BASE_URL} = require("./constant");
const {urlDesc, algorithm, port} = require("./config");

const getSource = async (req) => {
    switch (algorithm) {
        case ALGORITHM.IP_HASH:
            return ipFormat(req);
        case ALGORITHM.URL_HASH:
            return urlFormat(req);
        case ALGORITHM.CONSISTENT_HASH:
            return urlFormat(req);
        case ALGORITHM.LEAST_CONNECTIONS:
            return await getUrlCollect();
        case ALGORITHM.FAIR:
            return await getUrlCollect();
        default:
            return null;
    }
};

// 获取负载均衡统计对象
const getUrlCollect = () => {
    return new Promise((resolve, reject) => {
        try {
            process.send({type: "getUrlCollect"})
            process.on("message", msg => {
                if (msg.type === "getUrlCollect") {
                    resolve(msg.urlCollect)
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

const run = () => {
    // 获取转发URL工具函数
    const getURL = LoadBalance(urlDesc.slice(0, cpusLen), algorithm);
    // 监听请求并均衡代理
    app.get("/", async (req, res) => {
        // 获取需要传入的参数
        const source = await getSource(req);
        // 获取URL
        const URL = getURL(source);
        // res.redirect(302, URL) 重定向负载均衡
        // 记录请求开始时间
        const start = Date.now();
        // 代理请求
        axios.get(URL).then(async (response) => {
            // 获取负载均衡统计对象并返回
            const urlCollect = await getUrlCollect();
            // 处理跨域
            res.setHeader("Access-Control-Allow-Origin", "*");
            response.data.urlCollect = urlCollect;
            // 返回数据
            res.send(response.data);
            // 记录相应时间并更新
            const costTime = Date.now() - start;
            process.send({type: "updateCostTime", costTime, URL})
        });
    });
    // 负载均衡服务器开始监听请求
    app.listen(port, () => {
        console.log(`Load Balance Server Running at ${BASE_URL}:${port}`);
    });
};

run();







