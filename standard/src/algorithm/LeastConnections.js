const leastConnections = () => {
    return (urlCollect) => {
        let min = Number.POSITIVE_INFINITY,
            url = "";

        // 遍历对象找到最少连接数的地址
        for (let key in urlCollect) {
            const val = urlCollect[key].connection;
            if (val < min) {
                min = val;
                url = key;
            }
        }
        // 返回
        return url;
    };
};

module.exports = leastConnections;
