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
*   @param sourceUrl:string
*   @return string
*   @description:
*   根据URL_Hash算法返回一个URL
*   URL_Hash：根据源URL生成Hash，根据Hash返回相应URL
*   tips:（可以是生成url数组并对长度取余为下标 / 其他）
*   Hash工具函数已准备好
* }
* */

const URLHash = (urlDesc) => {
    // TODO

    return (sourceUrl) => {
        // TODO
    };
};

module.exports = URLHash;
