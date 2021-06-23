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
*   根据随机数返回一个url
*   tips:（数组随机下标 / 其他）
* }
* */


const Random = (urlDesc) => {
    // TODO
    return () => {
        // TODO
    };
};

module.exports = Random;
