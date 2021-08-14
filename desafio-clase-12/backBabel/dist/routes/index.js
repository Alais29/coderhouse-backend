"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _producto = require("../services/producto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var routes = _express["default"].Router();

var _Productos = new _producto.Productos(),
    getProductos = _Productos.getProductos,
    getProducto = _Productos.getProducto,
    saveProducto = _Productos.saveProducto,
    updateProducto = _Productos.updateProducto,
    deleteProducto = _Productos.deleteProducto;

routes.get('/productos/listar', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var productos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return getProductos();

          case 3:
            productos = _context.sent;

            if (!(productos.length !== 0)) {
              _context.next = 8;
              break;
            }

            res.json({
              data: productos
            });
            _context.next = 9;
            break;

          case 8:
            throw new Error('No hay productos');

          case 9:
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            res.status(400).json({
              error: _context.t0.error,
              message: _context.t0.message
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
routes.get('/productos/listar/:id', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var producto;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return getProducto(req.params.id);

          case 3:
            producto = _context2.sent;

            if (!producto) {
              _context2.next = 8;
              break;
            }

            res.json({
              data: producto
            });
            _context2.next = 9;
            break;

          case 8:
            throw new Error('Producto no encontrado');

          case 9:
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            res.status(400).json({
              error: _context2.t0.error,
              message: _context2.t0.message
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
routes.post('/productos/guardar', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var producto, newProducto;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            producto = req.body;
            _context3.next = 4;
            return saveProducto(producto);

          case 4:
            newProducto = _context3.sent;
            res.json({
              data: newProducto
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            res.status(400).json({
              error: _context3.t0.error,
              message: _context3.t0.message
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
routes.put('/productos/actualizar/:id', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var producto;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return updateProducto(req.params.id, req.body);

          case 3:
            producto = _context4.sent;
            res.json({
              data: producto
            });
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.status(404).json({
              error: _context4.t0.error,
              message: _context4.t0.message
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
routes["delete"]('/productos/borrar/:id', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var productos;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return deleteProducto(req.params.id);

          case 3:
            _context5.next = 5;
            return getProductos();

          case 5:
            productos = _context5.sent;
            res.json({
              data: productos
            });
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            res.status(404).json({
              error: _context5.t0.error,
              message: _context5.t0.message
            });

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 9]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = routes;
exports["default"] = _default;