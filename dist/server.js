"use strict";

var _http = require("http");
var _app = _interopRequireDefault(require("./app"));
require("dotenv/config");
var _socketio = require("./socketio");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PORT = process.env.PORT || 4400;
const server = (0, _http.createServer)(_app.default);
(0, _socketio.setupSocket)(server);
server.listen(PORT, () => console.log(" SERVER RUNNING ON PORT ", PORT));
["uncaughtException", "unhandledRejection"].forEach(event => {
  process.on(event, err => {
    console.error(`something bad happened! event: ${event}, msg:${err.stak || err}`);
  });
});