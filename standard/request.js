const axios = require("axios");
const cluster = require("cluster");
const cpusLen = require("os").cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < cpusLen; i++) {
        cluster.fork()
    }
} else {
    function request () {
        axios.get("http://127.0.0.1:8080").then((res) => {
            console.log(res.data);
        });
    }

    setInterval(() => {
        request();
    }, 100);
}


