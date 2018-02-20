const { Server } = require("net");

const EOT = Buffer.from("\r\n\r\n");

class Http extends Server {
  constructor() {
    super();
    this.on("connection", this.connectionListener);
  }
  connectionListener(s) {
    let buf = Buffer.alloc(0);
    s.on("data", handlerOnData);
    s.on("end", () => console.log("end socket"));

    function handlerOnData(chunk) {
      buf = Buffer.concat([buf, chunk], buf.length + chunk.length);
      // console.log(buf.toString());
      if (buf.includes(EOT)) {
        let rest = buf.slice(buf.indexOf(EOT) + EOT.length);
        console.log("rest data", rest.toString());
        s.removeListener("data", handlerOnData);
        s.unshift(rest);
      }
    }
  }
}

module.exports = {
  createServer: function() {
    return new Http();
  }
};
