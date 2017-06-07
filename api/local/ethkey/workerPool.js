'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var hasWebWorkers = typeof Worker !== 'undefined';
var KeyWorker = hasWebWorkers ? require('worker-loader!./worker' // eslint-disable-line
) : require('./worker').KeyWorker;var

WorkerContainer = function () {function WorkerContainer() {_classCallCheck(this, WorkerContainer);this.
    busy = false;this.
    _worker = new KeyWorker();}_createClass(WorkerContainer, [{ key: 'action', value: function action(

    _action, payload) {var _this = this;
      if (this.busy) {
        throw new Error('Cannot issue an action on a busy worker!');
      }

      this.busy = true;

      return new Promise(function (resolve, reject) {
        _this._worker.postMessage({ action: _action, payload: payload });
        _this._worker.onmessage = function (_ref) {var data = _ref.data;var _data = _slicedToArray(
          data, 2),err = _data[0],result = _data[1];

          _this.busy = false;

          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        };
      });
    } }]);return WorkerContainer;}();var


WorkerPool = function () {function WorkerPool() {_classCallCheck(this, WorkerPool);this.
    pool = [];}_createClass(WorkerPool, [{ key: 'getWorker', value: function getWorker()

    {
      var container = this.pool.find(function (container) {return !container.busy;});

      if (container) {
        return container;
      }

      container = new WorkerContainer();

      this.pool.push(container);

      return container;
    } }]);return WorkerPool;}();exports.default =


new WorkerPool();module.exports = exports['default'];