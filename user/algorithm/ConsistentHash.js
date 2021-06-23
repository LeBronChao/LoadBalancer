const {Hash} = require("../../base/src/util");

/*
* interface urlObj{
*   url:string,  服务器地址
*   weight:number  权重（仅在权重轮询算法使用）
* }
*
* @param urlDesc:Array<urlObj>
* @description:返回一个函数
*
* @return function{
*   @param sourceInfo:string
*   @return string
*   @description:
*   根据一致性哈希算法返回一个URL
*   一致性哈希：根据源信息生成hash，返回 服务器信息hash中 第一个比源信息hash大的url
*   tips:信息可以是 IP / URL / Other
*   Hash工具函数已准备好
* }
* */

const ConsistentHash = (urlDesc) => {
    // TODO
    return (sourceInfo) => {
        // TODO
    };
};

module.exports = ConsistentHash;
