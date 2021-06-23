const Fair = () => {
    return (urlCollect) => {
        let min = Number.POSITIVE_INFINITY,
            url = "";

        // 找到耗时最少的url
        for (const key in urlCollect) {
            const urlObj = urlCollect[key];
            if (urlObj.costTime < min) {
                min = urlObj.costTime;
                url = key;
            }
        }
        // 返回
        return url;
    };
};

module.exports = Fair;
