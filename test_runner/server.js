const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.headers);
  req.on("data", d => {
    console.log(d);
  });
  req.on("end", () => {
    console.log("end");
  });
});
server.listen(8080);
