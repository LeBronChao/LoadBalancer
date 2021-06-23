const fnv = require("fnv-plus");
const {BASE_URL} = require("../constant");

const urlFormat = (req) => {
    return req.protocol + "://" + req.get("host") + req.originalUrl;
};

const ipFormat = (req) => {
    return req.ip.replace(/::ffff:/, "");
};

const Hash = (info) => {
    return fnv.hash(info).dec();
};

class DataBase {
    urlCollect = {};

    // 初始化
    constructor (urlObj) {
        urlObj.forEach((val) => {
            this.urlCollect[val.url] = {
                count: 0,
                costTime: 0,
                connection: 0,
            };
        });
    }

    //增加连接数和实时连接数
    add (port) {
        const url = `${BASE_URL}:${port}`;
        this.urlCollect[url].count++;
        this.urlCollect[url].connection++;
    }

    // 减少实时连接数
    sub (port) {
        const url = `${BASE_URL}:${port}`;
        this.urlCollect[url].connection--;
    }

    // 更新响应时间
    updateCostTime (url, time) {
        this.urlCollect[url].costTime = time;
    }
}

module.exports = {
    urlFormat,
    ipFormat,
    Hash,
    DataBase,
}
