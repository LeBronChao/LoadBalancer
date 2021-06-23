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
*   @param sourceIP:string
*   @return string
*   @description:
*   根据IP_Hash算法返回一个URL
*   IP_Hash：根据源IP生成Hash，根据Hash返回相应URL（可以是生成url数组并对长度取余为下标 / 其他）
*   Hash工具函数已准备好
* }
* */

const IpHash = (urlDesc) => {
    // TODO
    return (sourceIP) => {
        // TODO
    };
};

module.exports = IpHash;
