const Random = (urlDesc) => {
    let urlCollect = [];

    //  收集url
    urlDesc.forEach((val) => {
        urlCollect.push(val.url);
    });

    return () => {
        //  生成随机数下标返回相应URL
        const pos = parseInt(Math.random() * urlCollect.length);
        return urlCollect[pos];
    };
};

module.exports = Random;
