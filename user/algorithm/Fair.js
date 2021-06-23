
/*
* interface urlObj{
*   count:number,  总连接数
*   costTime:number, 响应时间
*   connection:number 实时连接数
* }
*
* @description:返回一个函数
* @return function{
*   @param urlCollect:Array<urlObj>
*   @return string
*   @description:
*   根据Fair算法返回一个URL
*   Fair：返回响应时间最小的url
* }
* */

const Fair = () => {
    return (urlCollect) => {
        // TODO
    };
};

module.exports = Fair;
