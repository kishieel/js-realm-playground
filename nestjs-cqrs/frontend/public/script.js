/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/engines/engine.ts":
/*!*******************************!*\
  !*** ./src/engines/engine.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Engine = void 0;
var color_to_hex_map_1 = __webpack_require__(/*! ../maps/color-to-hex.map */ "./src/maps/color-to-hex.map.ts");
var key_to_direction_map_1 = __webpack_require__(/*! ../maps/key-to-direction.map */ "./src/maps/key-to-direction.map.ts");
var Engine = /*#__PURE__*/function () {
  function Engine(ws) {
    _classCallCheck(this, Engine);
    this.snakes = new Map();
    this.fruits = new Map();
    this.ws = ws;
    var canvas = document.querySelector('#canvas');
    if (!canvas) throw new Error('No canvas found!');
    this.canvas = canvas;
    var ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No ctx found!');
    this.ctx = ctx;
  }
  _createClass(Engine, [{
    key: "init",
    value: function init() {
      this.ws.send(JSON.stringify({
        event: 'snakesRequested'
      }));
      this.ws.send(JSON.stringify({
        event: 'fruitsRequested'
      }));
    }
  }, {
    key: "process",
    value: function process(payload) {
      switch (payload.event) {
        case 'snakeConfirmed':
          return this.handleSnakeConfirmed(payload.data);
        case 'snakeSpawned':
          return this.handleSnakeSpawned(payload.data);
        case 'snakeMoved':
          return this.handleSnakeMoved(payload.data);
        case 'snakeDeleted':
          return this.handleSnakeDeleted(payload.data);
        case 'snakesFetched':
          return this.handleSnakesFetched(payload.data);
        case 'fruitsFetched':
          return this.handleFruitsFetched(payload.data);
      }
    }
  }, {
    key: "handleSnakeConfirmed",
    value: function handleSnakeConfirmed(data) {}
  }, {
    key: "handleSnakeSpawned",
    value: function handleSnakeSpawned(data) {
      var snakeId = data.snakeId,
        snake = __rest(data, ["snakeId"]);
      this.snakes.set(snakeId, Object.assign({
        id: snakeId
      }, snake));
    }
  }, {
    key: "handleSnakeMoved",
    value: function handleSnakeMoved(data) {
      var snakeId = data.snakeId,
        tail = data.tail;
      var snake = this.snakes.get(snakeId);
      if (!snake) return;
      this.snakes.set(snakeId, Object.assign(Object.assign({}, snake), {
        tail: tail
      }));
    }
  }, {
    key: "handleSnakeDeleted",
    value: function handleSnakeDeleted(data) {
      var snakeId = data.snakeId;
      this.snakes["delete"](snakeId);
    }
  }, {
    key: "handleSnakesFetched",
    value: function handleSnakesFetched(data) {
      var _this = this;
      data.snakes.forEach(function (snake) {
        return _this.snakes.set(snake.id, snake);
      });
    }
  }, {
    key: "handleFruitsFetched",
    value: function handleFruitsFetched(data) {
      var _this2 = this;
      data.fruits.forEach(function (fruit) {
        return _this2.fruits.set(fruit.id, fruit);
      });
    }
  }, {
    key: "changeDirection",
    value: function changeDirection(key) {
      var direction = key_to_direction_map_1.keyToDirectionMap.get(key);
      if (!direction) return;
      this.ws.send(JSON.stringify({
        event: 'directionChanged',
        data: {
          direction: direction
        }
      }));
    }
  }, {
    key: "update",
    value: function update() {
      this.redraw();
      this.checkCollisions();
    }
  }, {
    key: "redraw",
    value: function redraw() {
      var _this3 = this;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      var _iterator = _createForOfIteratorHelper(this.fruits.values()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var fruit = _step.value;
          this.ctx.fillStyle = 'gold';
          this.ctx.fillRect(fruit.coords.x * 20, fruit.coords.y * 20, 20, 20);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var _iterator2 = _createForOfIteratorHelper(this.snakes.values()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var snake = _step2.value;
          this.ctx.fillStyle = color_to_hex_map_1.colorToHexMap[snake.color];
          snake.tail.forEach(function (part) {
            _this3.ctx.fillRect(part.x * 20, part.y * 20, 20, 20);
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "checkCollisions",
    value: function checkCollisions() {}
  }]);
  return Engine;
}();
exports.Engine = Engine;

/***/ }),

/***/ "./src/enums/color.enum.ts":
/*!*********************************!*\
  !*** ./src/enums/color.enum.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Color = void 0;
var Color;
(function (Color) {
  Color["BLUE"] = "BLUE";
  Color["GREEN"] = "GREEN";
  Color["ORANGE"] = "ORANGE";
  Color["PURPLE"] = "PURPLE";
  Color["RED"] = "RED";
})(Color || (exports.Color = Color = {}));

/***/ }),

/***/ "./src/enums/direction.enum.ts":
/*!*************************************!*\
  !*** ./src/enums/direction.enum.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Direction = void 0;
var Direction;
(function (Direction) {
  Direction["UP"] = "UP";
  Direction["DOWN"] = "DOWN";
  Direction["LEFT"] = "LEFT";
  Direction["RIGHT"] = "RIGHT";
})(Direction || (exports.Direction = Direction = {}));

/***/ }),

/***/ "./src/maps/color-to-hex.map.ts":
/*!**************************************!*\
  !*** ./src/maps/color-to-hex.map.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _exports$colorToHexMa;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.colorToHexMap = void 0;
var color_enum_1 = __webpack_require__(/*! ../enums/color.enum */ "./src/enums/color.enum.ts");
exports.colorToHexMap = (_exports$colorToHexMa = {}, _defineProperty(_exports$colorToHexMa, color_enum_1.Color.BLUE, '#0000ff'), _defineProperty(_exports$colorToHexMa, color_enum_1.Color.GREEN, '#00ff00'), _defineProperty(_exports$colorToHexMa, color_enum_1.Color.ORANGE, '#ff8000'), _defineProperty(_exports$colorToHexMa, color_enum_1.Color.PURPLE, '#ff00ff'), _defineProperty(_exports$colorToHexMa, color_enum_1.Color.RED, '#ff0000'), _exports$colorToHexMa);

/***/ }),

/***/ "./src/maps/key-to-direction.map.ts":
/*!******************************************!*\
  !*** ./src/maps/key-to-direction.map.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.keyToDirectionMap = void 0;
var direction_enum_1 = __webpack_require__(/*! ../enums/direction.enum */ "./src/enums/direction.enum.ts");
exports.keyToDirectionMap = new Map([['ArrowUp', direction_enum_1.Direction.UP], ['ArrowDown', direction_enum_1.Direction.DOWN], ['ArrowLeft', direction_enum_1.Direction.LEFT], ['ArrowRight', direction_enum_1.Direction.RIGHT]]);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var engine_1 = __webpack_require__(/*! ./engines/engine */ "./src/engines/engine.ts");
var bootstrap = function bootstrap() {
  var ws = new WebSocket('ws://localhost:3000');
  var en = new engine_1.Engine(ws);
  ws.onopen = function () {
    console.log('Connected');
    en.init();
  };
  ws.onclose = function () {
    console.log('Disconnected');
  };
  ws.onerror = function (ev) {
    console.error(ev);
  };
  ws.onmessage = function (ev) {
    en.process(JSON.parse(ev.data));
  };
  document.addEventListener('keydown', function (ev) {
    return en.changeDirection(ev.key);
  });
  setInterval(function () {
    return en.update();
  }, 20);
};
window.onload = bootstrap;
})();

/******/ })()
;