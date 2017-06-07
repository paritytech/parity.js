'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _ethereumjsTx = require('ethereumjs-tx');var _ethereumjsTx2 = _interopRequireDefault(_ethereumjsTx);
var _accounts = require('./accounts');var _accounts2 = _interopRequireDefault(_accounts);
var _transactions = require('./transactions');var _transactions2 = _interopRequireDefault(_transactions);
var _transport = require('../transport');
var _input = require('../format/input');
var _ethkey = require('./ethkey');
var _wordlist = require('../../wordlist');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var

LocalAccountsMiddleware = function (_Middleware) {_inherits(LocalAccountsMiddleware, _Middleware);
  function LocalAccountsMiddleware(transport) {_classCallCheck(this, LocalAccountsMiddleware);var _this = _possibleConstructorReturn(this, (LocalAccountsMiddleware.__proto__ || Object.getPrototypeOf(LocalAccountsMiddleware)).call(this,
    transport));

    var register = _this.register.bind(_this);

    register('eth_accounts', function () {
      return _accounts2.default.mapArray(function (account) {return account.address;});
    });

    register('eth_coinbase', function () {
      return _accounts2.default.lastAddress;
    });

    register('parity_accountsInfo', function () {
      return _accounts2.default.mapObject(function (_ref) {var name = _ref.name;
        return { name: name };
      });
    });

    register('parity_allAccountsInfo', function () {
      return _accounts2.default.mapObject(function (_ref2) {var name = _ref2.name,meta = _ref2.meta,uuid = _ref2.uuid;
        return { name: name, meta: meta, uuid: uuid };
      });
    });

    register('parity_changePassword', function (_ref3) {var _ref4 = _slicedToArray(_ref3, 3),address = _ref4[0],oldPassword = _ref4[1],newPassword = _ref4[2];
      var account = _accounts2.default.get(address);

      return account.
      decryptPrivateKey(oldPassword).
      then(function (privateKey) {
        if (!privateKey) {
          return false;
        }

        account.changePassword(privateKey, newPassword);

        return true;
      });
    });

    register('parity_checkRequest', function (_ref5) {var _ref6 = _slicedToArray(_ref5, 1),id = _ref6[0];
      return _transactions2.default.hash(id) || Promise.resolve(null);
    });

    register('parity_defaultAccount', function () {
      return _accounts2.default.lastAddress;
    });

    register('parity_generateSecretPhrase', function () {
      return (0, _wordlist.randomPhrase)(12);
    });

    register('parity_getNewDappsAddresses', function () {
      return [];
    });

    register('parity_hardwareAccountsInfo', function () {
      return {};
    });

    register('parity_newAccountFromPhrase', function (_ref7) {var _ref8 = _slicedToArray(_ref7, 2),phrase = _ref8[0],password = _ref8[1];
      return (0, _ethkey.phraseToWallet)(phrase).
      then(function (wallet) {
        return _accounts2.default.create(wallet.secret, password);
      });
    });

    register('parity_newAccountFromSecret', function (_ref9) {var _ref10 = _slicedToArray(_ref9, 2),secret = _ref10[0],password = _ref10[1];
      return (0, _ethkey.verifySecret)(secret).
      then(function (isValid) {
        if (!isValid) {
          throw new Error('Invalid secret key');
        }

        return _accounts2.default.create(secret, password);
      });
    });

    register('parity_setAccountMeta', function (_ref11) {var _ref12 = _slicedToArray(_ref11, 2),address = _ref12[0],meta = _ref12[1];
      _accounts2.default.get(address).meta = meta;

      return true;
    });

    register('parity_setAccountName', function (_ref13) {var _ref14 = _slicedToArray(_ref13, 2),address = _ref14[0],name = _ref14[1];
      _accounts2.default.get(address).name = name;

      return true;
    });

    register('parity_postTransaction', function (_ref15) {var _ref16 = _slicedToArray(_ref15, 1),tx = _ref16[0];
      if (!tx.from) {
        tx.from = _accounts2.default.lastAddress;
      }

      tx.nonce = null;
      tx.condition = null;

      return _transactions2.default.add(tx);
    });

    register('parity_phraseToAddress', function (_ref17) {var _ref18 = _slicedToArray(_ref17, 1),phrase = _ref18[0];
      return (0, _ethkey.phraseToAddress)(phrase);
    });

    register('parity_useLocalAccounts', function () {
      return true;
    });

    register('parity_listGethAccounts', function () {
      return [];
    });

    register('parity_listRecentDapps', function () {
      return {};
    });

    register('parity_killAccount', function (_ref19) {var _ref20 = _slicedToArray(_ref19, 2),address = _ref20[0],password = _ref20[1];
      return _accounts2.default.remove(address, password);
    });

    register('parity_testPassword', function (_ref21) {var _ref22 = _slicedToArray(_ref21, 2),address = _ref22[0],password = _ref22[1];
      var account = _accounts2.default.get(address);

      return account.isValidPassword(password);
    });

    register('signer_confirmRequest', function (_ref23) {var _ref24 = _slicedToArray(_ref23, 3),id = _ref24[0],modify = _ref24[1],password = _ref24[2];var _Object$assign =







      Object.assign(_transactions2.default.get(id), modify),gasPrice = _Object$assign.gasPrice,gasLimit = _Object$assign.gas,from = _Object$assign.from,to = _Object$assign.to,value = _Object$assign.value,data = _Object$assign.data;

      _transactions2.default.lock(id);

      var account = _accounts2.default.get(from);

      return Promise.all([
      _this.rpcRequest('parity_nextNonce', [from]),
      account.decryptPrivateKey(password)]).

      catch(function (err) {
        _transactions2.default.unlock(id);

        // transaction got unlocked, can propagate rejection further
        throw err;
      }).
      then(function (_ref25) {var _ref26 = _slicedToArray(_ref25, 2),nonce = _ref26[0],privateKey = _ref26[1];
        if (!privateKey) {
          _transactions2.default.unlock(id);

          throw new Error('Invalid password');
        }

        var tx = new _ethereumjsTx2.default({
          nonce: nonce,
          to: to,
          data: data,
          gasLimit: (0, _input.inNumber16)(gasLimit),
          gasPrice: (0, _input.inNumber16)(gasPrice),
          value: (0, _input.inNumber16)(value) });


        tx.sign(privateKey);

        var serializedTx = '0x' + tx.serialize().toString('hex');

        return _this.rpcRequest('eth_sendRawTransaction', [serializedTx]);
      }).
      then(function (hash) {
        _transactions2.default.confirm(id, hash);

        return {};
      });
    });

    register('signer_rejectRequest', function (_ref27) {var _ref28 = _slicedToArray(_ref27, 1),id = _ref28[0];
      return _transactions2.default.reject(id);
    });

    register('signer_requestsToConfirm', function () {
      return _transactions2.default.requestsToConfirm();
    });return _this;
  }return LocalAccountsMiddleware;}(_transport.Middleware);exports.default = LocalAccountsMiddleware;module.exports = exports['default'];