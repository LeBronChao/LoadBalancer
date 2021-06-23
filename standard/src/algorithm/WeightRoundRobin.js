const WeiRoundRobin = (urlDesc) => {
    let pos = 0,
        urlCollect = [],
        copyUrlDesc = JSON.parse(JSON.stringify(urlDesc));

    // 根据权重收集url
    while (copyUrlDesc.length > 0) {
        for (let i = 0; i < copyUrlDesc.length; i++) {
            urlCollect.push(copyUrlDesc[i].url);
            copyUrlDesc[i].weight--;
            if (copyUrlDesc[i].weight === 0) {
                copyUrlDesc.splice(i, 1);
                i--;
            }
        }
    }
    // 轮询获取URL函数
    return () => {
        const res = urlCollect[pos++];
        if (pos === urlCollect.length) {
            pos = 0;
        }
        return res;
    };
};

module.exports = WeiRoundRobin;
