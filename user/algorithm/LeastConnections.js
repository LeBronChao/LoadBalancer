/*
* interface urlObj{
*   count:number,  总连接数
*   costTime:number, 响应时间
*   connection:number 实时连接数
* }
*
* @description:返回一个函数
*
* @return function{
*   @param urlCollect:Array<urlObj>
*   @return string
*   @description:
*   返回实时连接数最少的url
* }
* */

const leastConnections = () => {
    return (urlCollect) => {
        // TODO
    };
};

module.exports = leastConnections;
