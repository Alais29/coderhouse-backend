"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _http = _interopRequireDefault(require("http"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("./routes"));

var _socket = require("./services/socket");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = 8080;

var server = _http["default"].createServer(app);

(0, _socket.initWsServer)(server);
server.listen(PORT, function () {
  console.log("Servidor inicializado en http://localhost:".concat(PORT));
});
server.on('error', function (error) {
  return console.log("Error en el servidor: ".concat(error));
});
app.use(_express["default"]["static"](_path["default"].resolve(__dirname, '../', 'public')));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.use('/api', _routes["default"]);