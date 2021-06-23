const {Hash} = require("../util");

const IpHash = (urlDesc) => {
    let urlCollect = [];

    for (const key in urlDesc) {
        // 收集url
        urlCollect.push(urlDesc[key].url);
    }

    return (sourceIP) => {
        // 生成Hash十进制数值
        const hashInfo = Hash(sourceIP);
        // 取余为下标
        const urlPos = Math.abs(hashInfo) % urlCollect.length;
        // 返回
        return urlCollect[urlPos];
    };
};

module.exports = IpHash;
