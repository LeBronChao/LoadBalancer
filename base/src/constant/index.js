const ALGORITHM = {
    WEIGHT_ROUND_ROBIN: "weightRoundRobin",
    IP_HASH: "ipHash",
    URL_HASH: "urlHash",
    CONSISTENT_HASH: "consistentHash",
    FAIR: "fair",
    RANDOM: "random",
    LEAST_CONNECTIONS: "leastConnections",
};
const BASE_URL = "http://127.0.0.1";

module.exports = {
    ALGORITHM,
    BASE_URL,
};
