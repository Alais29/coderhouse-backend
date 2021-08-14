"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Productos = void 0;

var _fs = _interopRequireWildcard(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _uuid = require("uuid");

var _strings = require("../utils/strings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProductosPath = _path["default"].resolve(__dirname, '../../productos.json');

var Productos = /*#__PURE__*/function () {
  function Productos() {
    _classCallCheck(this, Productos);
  }

  _createClass(Productos, [{
    key: "getProductos",
    value: function () {
      var _getProductos = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var products;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _fs.promises.readFile(ProductosPath, 'utf-8');

              case 3:
                products = _context.sent;
                return _context.abrupt("return", JSON.parse(products));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                throw {
                  error: _context.t0,
                  message: 'Hubo un problema al cargar los productos'
                };

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function getProductos() {
        return _getProductos.apply(this, arguments);
      }

      return getProductos;
    }()
  }, {
    key: "getProducto",
    value: function () {
      var _getProducto = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var productos, productosJSON, producto;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _fs.promises.readFile(ProductosPath, 'utf-8');

              case 3:
                productos = _context2.sent;
                productosJSON = JSON.parse(productos);
                producto = productosJSON.filter(function (item) {
                  return item.id === id;
                })[0];
                return _context2.abrupt("return", producto);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                throw {
                  error: _context2.t0,
                  message: 'Hubo un problema al cargar el producto'
                };

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function getProducto(_x) {
        return _getProducto.apply(this, arguments);
      }

      return getProducto;
    }()
  }, {
    key: "saveProducto",
    value: function () {
      var _saveProducto = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(producto) {
        var productos, productosJSON;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _fs.promises.readFile(ProductosPath, 'utf-8');

              case 3:
                productos = _context3.sent;
                productosJSON = JSON.parse(productos);
                producto.id = (0, _uuid.v4)();
                producto.price = Number(producto.price);

                if (!(isNaN(producto.price) || !(0, _strings.isUrl)(producto.thumbnail))) {
                  _context3.next = 9;
                  break;
                }

                throw new Error('Verifica los datos, el precio debe ser un número y la url debe ser válida');

              case 9:
                if (!_fs["default"].existsSync(ProductosPath)) {
                  _context3.next = 16;
                  break;
                }

                productosJSON.push(producto);
                _context3.next = 13;
                return _fs.promises.writeFile(ProductosPath, JSON.stringify(productosJSON, null, '\t'));

              case 13:
                return _context3.abrupt("return", producto);

              case 16:
                throw new Error('No se pudo guardar el producto');

              case 17:
                _context3.next = 26;
                break;

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3["catch"](0);

                if (!_context3.t0.code) {
                  _context3.next = 25;
                  break;
                }

                throw {
                  error: _context3.t0,
                  message: 'No se pudo guardar el producto'
                };

              case 25:
                throw Error(_context3.t0.message);

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 19]]);
      }));

      function saveProducto(_x2) {
        return _saveProducto.apply(this, arguments);
      }

      return saveProducto;
    }()
  }, {
    key: "updateProducto",
    value: function () {
      var _updateProducto = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, producto) {
        var productos, productosJSON, productToUpdate, newProductList;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _fs.promises.readFile(ProductosPath, 'utf-8');

              case 3:
                productos = _context4.sent;
                productosJSON = JSON.parse(productos);
                producto.price = Number(producto.price);

                if (!(isNaN(producto.price) || !(0, _strings.isUrl)(producto.thumbnail))) {
                  _context4.next = 8;
                  break;
                }

                throw new Error('Verifica los datos, el precio debe ser un número y la url debe ser válida');

              case 8:
                productToUpdate = productosJSON.find(function (item) {
                  return item.id === id;
                });
                productToUpdate = _objectSpread(_objectSpread({}, productToUpdate), producto);
                newProductList = productosJSON.filter(function (item) {
                  return item.id !== id;
                });
                newProductList.push(productToUpdate);

                if (!_fs["default"].existsSync(ProductosPath)) {
                  _context4.next = 18;
                  break;
                }

                _context4.next = 15;
                return _fs.promises.writeFile(ProductosPath, JSON.stringify(newProductList, null, '\t'));

              case 15:
                return _context4.abrupt("return", productToUpdate);

              case 18:
                throw new Error('No se pudo actualizar el producto');

              case 19:
                _context4.next = 28;
                break;

              case 21:
                _context4.prev = 21;
                _context4.t0 = _context4["catch"](0);

                if (!_context4.t0.code) {
                  _context4.next = 27;
                  break;
                }

                throw {
                  error: _context4.t0,
                  message: 'No se pudo actualizar el producto'
                };

              case 27:
                throw Error(_context4.t0.message);

              case 28:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 21]]);
      }));

      function updateProducto(_x3, _x4) {
        return _updateProducto.apply(this, arguments);
      }

      return updateProducto;
    }()
  }, {
    key: "deleteProducto",
    value: function () {
      var _deleteProducto = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
        var productos, productosJSON, newProductList;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _fs.promises.readFile(ProductosPath, 'utf-8');

              case 3:
                productos = _context5.sent;
                productosJSON = JSON.parse(productos);
                newProductList = productosJSON.filter(function (item) {
                  return item.id !== id;
                });

                if (!_fs["default"].existsSync(ProductosPath)) {
                  _context5.next = 12;
                  break;
                }

                _context5.next = 9;
                return _fs.promises.writeFile(ProductosPath, JSON.stringify(newProductList, null, '\t'));

              case 9:
                return _context5.abrupt("return", newProductList);

              case 12:
                throw new Error('No se pudo borrar el producto');

              case 13:
                _context5.next = 22;
                break;

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](0);

                if (!_context5.t0.code) {
                  _context5.next = 21;
                  break;
                }

                throw {
                  error: _context5.t0,
                  message: 'No se pudo borrar el producto'
                };

              case 21:
                throw Error(_context5.t0.message);

              case 22:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 15]]);
      }));

      function deleteProducto(_x5) {
        return _deleteProducto.apply(this, arguments);
      }

      return deleteProducto;
    }()
  }]);

  return Productos;
}();

exports.Productos = Productos;