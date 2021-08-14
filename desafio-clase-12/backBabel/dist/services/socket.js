"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initWsServer = void 0;

var socketio = _interopRequireWildcard(require("socket.io"));

var _producto = require("./producto");

var _messages = require("./messages");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _Productos = new _producto.Productos(),
    getProductos = _Productos.getProductos,
    saveProducto = _Productos.saveProducto;

var _Messages = new _messages.Messages(),
    getMessages = _Messages.getMessages,
    saveMessage = _Messages.saveMessage;

var initWsServer = function initWsServer(server) {
  var io = new socketio.Server();
  io.attach(server);
  io.on('connection', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(socket) {
      var productos, messages;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('Nueva conexión');
              _context.prev = 1;
              _context.next = 4;
              return getProductos();

            case 4:
              productos = _context.sent;
              socket.emit('productos', productos);
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              socket.emit('productos error', {
                error: _context.t0.error,
                message: _context.t0.message
              });

            case 11:
              _context.prev = 11;
              _context.next = 14;
              return getMessages();

            case 14:
              messages = _context.sent;
              socket.emit('messages', messages);
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t1 = _context["catch"](11);
              socket.emit('messages error', {
                error: _context.t1.error,
                message: _context.t1.message
              });

            case 21:
              socket.on('new product', function (newProduct) {
                saveProducto(newProduct).then(function () {
                  socket.emit('save product success', null);
                  getProductos().then(function (productos) {
                    io.emit('productos', productos);
                  })["catch"](function (e) {
                    socket.emit('productos error', {
                      error: e.error,
                      message: e.message
                    });
                  });
                })["catch"](function (e) {
                  socket.emit('save producto error', {
                    error: e.error,
                    message: e.message
                  });
                });
              });
              socket.on('new message', function (newMessage) {
                saveMessage(newMessage).then(function () {
                  socket.emit('save message success', null);
                  getMessages().then(function (messages) {
                    io.emit('messages', messages);
                  })["catch"](function (e) {
                    socket.emit('messages error', {
                      error: e.error,
                      message: e.message
                    });
                  });
                })["catch"](function (e) {
                  socket.emit('save message error', {
                    error: e.error,
                    message: e.message
                  });
                });
              });

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8], [11, 18]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.initWsServer = initWsServer;