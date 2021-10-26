const {Hash} = require("../util");

const ConsistentHash = (urlDesc) => {
    let urlHashMap = {},
        hashCollect = [];

    for (const key in urlDesc) {
        // 收集urlHash进数组和生成HashMap
        const {url} = urlDesc[key];
        const hash = Hash(url);
        urlHashMap[hash] = url;
        hashCollect.push(hash);
    }
    // 将hash数组从小到大排序
    hashCollect = hashCollect.sort((a, b) => a - b);

    return (sourceInfo) => {
        // 生成Hash十进制数值
        const hashInfo = Hash(sourceInfo);
        // 遍历hash数组找到第一个比源信息hash值大的，并通过hashMap返回url
        for(const key in hashCollect){
            const val = hashCollect[key];
            if (val >= hashInfo) {
                return urlHashMap[val];
            }
        }
        // 没找大则返回最大的
        return urlHashMap[hashCollect[hashCollect.length - 1]];
    };
};

module.exports = ConsistentHash;
