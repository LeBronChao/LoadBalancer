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
*   @return string
*   @description:
*   根据权重轮询算法返回一个url
*   权重轮询：权重代表在一轮访问中预期  该服务器被访问的次数 / 服务被访问总次数  不可连续访问。
* }
* */

const WeiRoundRobin = (urlDesc) => {
    // TODO
    return () => {
        // TODO
    };
};

module.exports = WeiRoundRobin;
