"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Messages = void 0;

var _fs = _interopRequireWildcard(require("fs"));

var _moment = _interopRequireDefault(require("moment"));

var _path = _interopRequireDefault(require("path"));

var _strings = require("../utils/strings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var messagesPath = _path["default"].resolve(__dirname, '../../mensajes.json');

var Messages = /*#__PURE__*/function () {
  function Messages() {
    _classCallCheck(this, Messages);
  }

  _createClass(Messages, [{
    key: "getMessages",
    value: function () {
      var _getMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var messages;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _fs.promises.readFile(messagesPath, 'utf-8');

              case 3:
                messages = _context.sent;
                return _context.abrupt("return", JSON.parse(messages));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                throw {
                  error: _context.t0,
                  message: 'Hubo un problema al cargar los mensajes'
                };

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function getMessages() {
        return _getMessages.apply(this, arguments);
      }

      return getMessages;
    }()
  }, {
    key: "saveMessage",
    value: function () {
      var _saveMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(message) {
        var messages, messagesJSON;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _fs.promises.readFile(messagesPath, 'utf-8');

              case 3:
                messages = _context2.sent;
                messagesJSON = JSON.parse(messages);
                message.date = (0, _moment["default"])().format('DD/MM/YYYY, h:mm:ss a');

                if ((0, _strings.isEmail)(message.email)) {
                  _context2.next = 8;
                  break;
                }

                throw new Error('Ingresa un email válido');

              case 8:
                if (!_fs["default"].existsSync(messagesPath)) {
                  _context2.next = 15;
                  break;
                }

                messagesJSON.push(message);
                _context2.next = 12;
                return _fs.promises.writeFile(messagesPath, JSON.stringify(messagesJSON, null, '\t'));

              case 12:
                return _context2.abrupt("return", message);

              case 15:
                throw new Error('No se pudo guardar el mensaje');

              case 16:
                _context2.next = 25;
                break;

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](0);

                if (!_context2.t0.code) {
                  _context2.next = 24;
                  break;
                }

                throw {
                  error: _context2.t0,
                  message: 'No se pudo guardar el mensaje'
                };

              case 24:
                throw Error(_context2.t0.message);

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 18]]);
      }));

      function saveMessage(_x) {
        return _saveMessage.apply(this, arguments);
      }

      return saveMessage;
    }()
  }]);

  return Messages;
}();

exports.Messages = Messages;