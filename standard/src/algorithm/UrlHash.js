const {Hash} = require("../util");

const URLHash = (urlDesc) => {
    let urlCollect = [];

    for (const key in urlDesc) {
        // 收集url
        urlCollect.push(urlDesc[key].url);
    }

    return (sourceUrl) => {
        // 生成Hash十进制数值
        const hashInfo = Hash(sourceUrl);
        // 取余为下标
        const urlPos = Math.abs(hashInfo) % urlCollect.length;
        // 返回
        return urlCollect[urlPos];
    };
};

module.exports = URLHash;
