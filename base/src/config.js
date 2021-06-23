const {ALGORITHM, BASE_URL} = require("./constant");
const path = require("path")

module.exports = {
    urlDesc: [
        {
            url: `${BASE_URL}:${16666}`,
            weight: 6,
        },
        {
            url: `${BASE_URL}:${16667}`,
            weight: 1,
        },
        {
            url: `${BASE_URL}:${16668}`,
            weight: 1,
        },
        {
            url: `${BASE_URL}:${16669}`,
            weight: 1,
        },
        {
            url: `${BASE_URL}:${16670}`,
            weight: 2,
        },
        {
            url: `${BASE_URL}:${16671}`,
            weight: 1,
        },
        {
            url: `${BASE_URL}:${16672}`,
            weight: 4,
        },
    ],
    port: 8080,
    algorithm: ALGORITHM.WEIGHT_ROUND_ROBIN,
    workerNum: 5,
    balancerNum:5,
    workerFilePath:path.resolve(__dirname, "./worker.js")
}