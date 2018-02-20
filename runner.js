const { createServer } = require("./http");

const server = createServer();

server.on("request", (req, res) => {});

server.listen(3000, () => {
  console.log("server started");
});
