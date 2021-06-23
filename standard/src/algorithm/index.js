const WeiRoundRobin = require("./WeightRoundRobin");
const IpHash = require("./IpHash");
const URLHash = require("./UrlHash");
const ConsistentHash = require("./ConsistentHash");
const Random = require("./Random");
const leastConnections = require("./LeastConnections");
const Fair = require("./Fair");
const {ALGORITHM} = require("../constant");

const LoadBalance = (urlDesc, algorithm) => {
    switch (algorithm) {
        case ALGORITHM.WEIGHT_ROUND_ROBIN:
            return WeiRoundRobin(urlDesc);
        case ALGORITHM.IP_HASH:
            return IpHash(urlDesc);
        case ALGORITHM.URL_HASH:
            return URLHash(urlDesc);
        case ALGORITHM.CONSISTENT_HASH:
            return ConsistentHash(urlDesc);
        case ALGORITHM.RANDOM:
            return Random(urlDesc);
        case ALGORITHM.LEAST_CONNECTIONS:
            return leastConnections();
        case ALGORITHM.FAIR:
            return Fair();
        default:
            break;
    }
};

module.exports = LoadBalance;
