var express = require("express");
var app = express();
let port = null;

app.get("/", (req, res) => {
    // 触发连接事件
    process.send({type: "connect", port});
    // 打印信息
    console.log("HTTP Version: " + req.httpVersion);
    console.log("Connection PORT Is " + port);

    const msg = "Hello My PORT is " + port;

    // 返回响应
    res.send({msg});
    // 触发断开连接事件
    process.send({type: "disconnect", port});
});

// 接收主进通信消息中的端口口并监听
process.on("message", (msg) => {
    if (msg.type === "port") {
        port = msg.port;
        app.listen(port, () => {
            console.log("Worker Listening " + port);
        });
    }
});