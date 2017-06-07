'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _abi = require('../../abi');var _abi2 = _interopRequireDefault(_abi);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

var nextSubscriptionId = 0;var

Contract = function () {
  function Contract(api, abi) {var _this = this;_classCallCheck(this, Contract);this.




















































































































































































    _pollCheckRequest = function (requestId) {
      return _this._api.pollMethod('parity_checkRequest', requestId);
    };this.

    _pollTransactionReceipt = function (txhash, gas) {
      return _this.api.pollMethod('eth_getTransactionReceipt', txhash, function (receipt) {
        if (!receipt || !receipt.blockNumber || receipt.blockNumber.eq(0)) {
          return false;
        }

        return true;
      });
    };this.

    getCallData = function (func, options, values) {
      var data = options.data;

      var tokens = func ? _abi2.default.encodeTokens(func.inputParamTypes(), values) : null;
      var call = tokens ? func.encodeCall(tokens) : null;

      if (data && data.substr(0, 2) === '0x') {
        data = data.substr(2);
      }

      return '0x' + (data || '') + (call || '');
    };this.

















    _bindFunction = function (func) {
      func.contract = _this;

      func.call = function () {var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var rawTokens = !!_options.rawTokens;
        var options = _extends({},
        _options);


        delete options.rawTokens;

        var callParams = void 0;

        try {
          callParams = _this._encodeOptions(func, _this._addOptionsTo(options), values);
        } catch (error) {
          return Promise.reject(error);
        }

        return _this._api.eth.
        call(callParams).
        then(function (encoded) {return func.decodeOutput(encoded);}).
        then(function (tokens) {
          if (rawTokens) {
            return tokens;
          }

          return tokens.map(function (token) {return token.value;});
        }).
        then(function (returns) {return returns.length === 1 ? returns[0] : returns;}).
        catch(function (error) {
          console.warn(func.name + '.call', values, error);
          throw error;
        });
      };

      if (!func.constant) {
        func.postTransaction = function (options) {var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          var _options = void 0;

          try {
            _options = _this._encodeOptions(func, _this._addOptionsTo(options), values);
          } catch (error) {
            return Promise.reject(error);
          }

          return _this._api.parity.
          postTransaction(_options).
          catch(function (error) {
            console.warn(func.name + '.postTransaction', values, error);
            throw error;
          });
        };

        func.estimateGas = function (options) {var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          var _options = _this._encodeOptions(func, _this._addOptionsTo(options), values);

          return _this._api.eth.
          estimateGas(_options).
          catch(function (error) {
            console.warn(func.name + '.estimateGas', values, error);
            throw error;
          });
        };
      }

      return func;
    };this.

    _bindEvent = function (event) {
      event.subscribe = function () {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var callback = arguments[1];var autoRemove = arguments[2];
        return _this._subscribe(event, options, callback, autoRemove);
      };

      event.unsubscribe = function (subscriptionId) {
        return _this.unsubscribe(subscriptionId);
      };

      event.getAllLogs = function () {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _this.getAllLogs(event);
      };

      return event;
    };this.
































































































































    _subscribeToChanges = function () {
      var subscriptions = Object.values(_this._subscriptions);

      var pendingSubscriptions = subscriptions.
      filter(function (s) {return s.options.toBlock && s.options.toBlock === 'pending';});

      var otherSubscriptions = subscriptions.
      filter(function (s) {return !(s.options.toBlock && s.options.toBlock === 'pending');});

      if (pendingSubscriptions.length > 0 && !_this._subscribedToPendings) {
        _this._subscribedToPendings = true;
        _this._subscribeToPendings();
      }

      if (otherSubscriptions.length > 0 && !_this._subscribedToBlock) {
        _this._subscribedToBlock = true;
        _this._subscribeToBlock();
      }
    };this.

    _unsubscribeFromChanges = function () {
      var subscriptions = Object.values(_this._subscriptions);

      var pendingSubscriptions = subscriptions.
      filter(function (s) {return s.options.toBlock && s.options.toBlock === 'pending';});

      var otherSubscriptions = subscriptions.
      filter(function (s) {return !(s.options.toBlock && s.options.toBlock === 'pending');});

      if (pendingSubscriptions.length === 0 && _this._subscribedToPendings) {
        _this._subscribedToPendings = false;
        clearTimeout(_this._pendingsSubscriptionId);
      }

      if (otherSubscriptions.length === 0 && _this._subscribedToBlock) {
        _this._subscribedToBlock = false;
        _this._api.unsubscribe(_this._blockSubscriptionId);
      }
    };this.

    _subscribeToBlock = function () {
      _this._api.
      subscribe('eth_blockNumber', function (error) {
        if (error) {
          console.error('::_subscribeToBlock', error, error && error.stack);
        }

        var subscriptions = Object.values(_this._subscriptions).
        filter(function (s) {return !(s.options.toBlock && s.options.toBlock === 'pending');});

        _this._sendSubscriptionChanges(subscriptions);
      }).
      then(function (blockSubId) {
        _this._blockSubscriptionId = blockSubId;
      }).
      catch(function (e) {
        console.error('::_subscribeToBlock', e, e && e.stack);
      });
    };this.

    _subscribeToPendings = function () {
      var subscriptions = Object.values(_this._subscriptions).
      filter(function (s) {return s.options.toBlock && s.options.toBlock === 'pending';});

      var timeout = function timeout() {return setTimeout(function () {return _this._subscribeToPendings();}, 1000);};

      _this._sendSubscriptionChanges(subscriptions).
      then(function () {
        _this._pendingsSubscriptionId = timeout();
      });
    };this.

    _sendSubscriptionChanges = function (subscriptions) {
      return Promise.
      all(
      subscriptions.map(function (subscription) {
        return _this._api.eth.getFilterChanges(subscription.filterId);
      })).

      then(function (logsArray) {
        logsArray.forEach(function (logs, index) {
          if (!logs || !logs.length) {
            return;
          }

          try {
            _this._sendData(subscriptions[index].id, null, _this.parseEventLogs(logs));
          } catch (error) {
            console.error('_sendSubscriptionChanges', error);
          }
        });
      }).
      catch(function (error) {
        console.error('_sendSubscriptionChanges', error);
      });
    };if (!api) {throw new Error('API instance needs to be provided to Contract');}if (!abi) {throw new Error('ABI needs to be provided to Contract instance');}this._api = api;this._abi = new _abi2.default(abi);this._subscriptions = {};this._constructors = this._abi.constructors.map(this._bindFunction);this._functions = this._abi.functions.map(this._bindFunction);this._events = this._abi.events.map(this._bindEvent);this._instance = {};this._events.forEach(function (evt) {_this._instance[evt.name] = evt;_this._instance[evt.signature] = evt;});this._functions.forEach(function (fn) {_this._instance[fn.name] = fn;_this._instance[fn.signature] = fn;});this._subscribedToPendings = false;this._pendingsSubscriptionId = null;this._subscribedToBlock = false;this._blockSubscriptionId = null;if (api && api.patch && api.patch.contract) {api.patch.contract(this);}}_createClass(Contract, [{ key: 'at', value: function at(address) {this._address = address;return this;} }, { key: 'deployEstimateGas', value: function deployEstimateGas(options, values) {var _options = this._encodeOptions(this.constructors[0], options, values);return this._api.eth.estimateGas(_options).then(function (gasEst) {return [gasEst, gasEst.mul(1.2)];});} }, { key: 'deploy', value: function deploy(options, values) {var _this2 = this;var statecb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};var skipGasEstimate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;var gasEstPromise = void 0;if (skipGasEstimate) {gasEstPromise = Promise.resolve(null);} else {statecb(null, { state: 'estimateGas' });gasEstPromise = this.deployEstimateGas(options, values).then(function (_ref) {var _ref2 = _slicedToArray(_ref, 2),gasEst = _ref2[0],gas = _ref2[1];return gas;});}return gasEstPromise.then(function (_gas) {if (_gas) {options.gas = _gas.toFixed(0);}var gas = _gas || options.gas;statecb(null, { state: 'postTransaction', gas: gas });var encodedOptions = _this2._encodeOptions(_this2.constructors[0], options, values);return _this2._api.parity.postTransaction(encodedOptions).then(function (requestId) {statecb(null, { state: 'checkRequest', requestId: requestId });return _this2._pollCheckRequest(requestId);}).then(function (txhash) {statecb(null, { state: 'getTransactionReceipt', txhash: txhash });return _this2._pollTransactionReceipt(txhash, gas);}).then(function (receipt) {if (receipt.gasUsed.eq(gas)) {throw new Error('Contract not deployed, gasUsed == ' + gas.toFixed(0));}statecb(null, { state: 'hasReceipt', receipt: receipt });_this2._receipt = receipt;_this2._address = receipt.contractAddress;return _this2._address;}).then(function (address) {statecb(null, { state: 'getCode' });return _this2._api.eth.getCode(_this2._address);}).then(function (code) {if (code === '0x') {throw new Error('Contract not deployed, getCode returned 0x');}statecb(null, { state: 'completed' });return _this2._address;});});} }, { key: 'parseEventLogs', value: function parseEventLogs(logs) {var _this3 = this;return logs.map(function (log) {var signature = log.topics[0].substr(2);var event = _this3.events.find(function (evt) {return evt.signature === signature;});if (!event) {console.warn('Unable to find event matching signature ' + signature);return null;}var decoded = event.decodeLog(log.topics, log.data);log.params = {};log.event = event.name;decoded.params.forEach(function (param, index) {var _param$token = param.token,type = _param$token.type,value = _param$token.value;var key = param.name || index;log.params[key] = { type: type, value: value };});return log;}).filter(function (log) {return log;});} }, { key: 'parseTransactionEvents', value: function parseTransactionEvents(receipt) {receipt.logs = this.parseEventLogs(receipt.logs);return receipt;} }, { key: '_encodeOptions', value: function _encodeOptions(func, options, values) {var data = this.getCallData(func, options, values);return _extends({}, options, { data: data });} }, { key: '_addOptionsTo', value: function _addOptionsTo() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return _extends({ to: this._address }, options);} }, { key: 'getAllLogs', value: function getAllLogs(event, _options) {var _this4 = this; // Options as first parameter
      if (!_options && event && event.topics) {return this.getAllLogs(null, event);}var options = this._getFilterOptions(event, _options);options.fromBlock = 0;options.toBlock = 'latest';return this._api.eth.getLogs(options).then(function (logs) {return _this4.parseEventLogs(logs);});} }, { key: '_findEvent', value: function _findEvent() {var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var event = eventName ? this._events.find(function (evt) {return evt.name === eventName;}) : null;if (eventName && !event) {var events = this._events.map(function (evt) {return evt.name;}).join(', ');throw new Error(eventName + ' is not a valid eventName, subscribe using one of ' + events + ' (or null to include all)');}return event;} }, { key: '_getFilterOptions', value: function _getFilterOptions() {var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var optionTopics = _options.topics || [];var signature = event && event.signature || null; // If event provided, remove the potential event signature
      // as the first element of the topics
      var topics = signature ? [signature].concat(optionTopics.filter(function (t, idx) {return idx > 0 || t !== signature;})) : optionTopics;var options = Object.assign({}, _options, { address: this._address, topics: topics });return options;} }, { key: '_createEthFilter', value: function _createEthFilter() {var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var _options = arguments[1];var options = this._getFilterOptions(event, _options);return this._api.eth.newFilter(options);} }, { key: 'subscribe', value: function subscribe() {var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var callback = arguments[2];var autoRemove = arguments[3];try {var event = this._findEvent(eventName);return this._subscribe(event, options, callback, autoRemove);} catch (e) {return Promise.reject(e);}} }, { key: '_sendData', value: function _sendData(subscriptionId, error, logs) {var _subscriptions$subscr = this._subscriptions[subscriptionId],autoRemove = _subscriptions$subscr.autoRemove,callback = _subscriptions$subscr.callback;var result = true;try {result = callback(error, logs);} catch (error) {console.warn('_sendData', subscriptionId, error);}if (autoRemove && result && typeof result === 'boolean') {this.unsubscribe(subscriptionId);}} }, { key: '_subscribe', value: function _subscribe() {var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var _options = arguments[1];var _this5 = this;var callback = arguments[2];var autoRemove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;var subscriptionId = nextSubscriptionId++;var skipInitFetch = _options.skipInitFetch;delete _options['skipInitFetch'];return this._createEthFilter(event, _options).then(function (filterId) {_this5._subscriptions[subscriptionId] = { options: _options, autoRemove: autoRemove, callback: callback, filterId: filterId, id: subscriptionId };if (skipInitFetch) {_this5._subscribeToChanges();return subscriptionId;}return _this5._api.eth.getFilterLogs(filterId).then(function (logs) {_this5._sendData(subscriptionId, null, _this5.parseEventLogs(logs));_this5._subscribeToChanges();return subscriptionId;});}).catch(function (error) {console.warn('subscribe', event, _options, error);throw error;});} }, { key: 'unsubscribe', value: function unsubscribe(subscriptionId) {var _this6 = this;return this._api.eth.uninstallFilter(this._subscriptions[subscriptionId].filterId).catch(function (error) {console.error('unsubscribe', error);}).then(function () {delete _this6._subscriptions[subscriptionId];_this6._unsubscribeFromChanges();});} }, { key: 'address', get: function get() {return this._address;} }, { key: 'constructors', get: function get() {return this._constructors;} }, { key: 'events', get: function get() {return this._events;} }, { key: 'functions', get: function get() {return this._functions;} }, { key: 'receipt', get: function get() {return this._receipt;} }, { key: 'instance', get: function get() {this._instance.address = this._address;return this._instance;} }, { key: 'api', get: function get() {return this._api;} }, { key: 'abi', get: function get() {return this._abi;} }]);return Contract;}();exports.default = Contract;module.exports = exports['default'];