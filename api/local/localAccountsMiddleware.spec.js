'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _2 = require('./');var _3 = _interopRequireDefault(_2);
var _chai = require('chai');
var _jsonRpcBase = require('../transport/jsonRpcBase');var _jsonRpcBase2 = _interopRequireDefault(_jsonRpcBase);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

var RPC_RESPONSE = Symbol('RPC response');
var ADDRESS = '0x00a329c0648769a73afac7f9381e08fb43dbea72';
var SECRET = '0x4d5db4107d237df6a3d58ee5f70ae63d73d7658d4026f2eefd2f204c81682cb7';
var PASSWORD = 'password';

var FOO_PHRASE = 'foobar';
var FOO_PASSWORD = 'foopass';
var FOO_ADDRESS = '0x007ef7ac1058e5955e366ab9d6b6c4ebcc937e7e';var

MockedTransport = function (_JsonRpcBase) {_inherits(MockedTransport, _JsonRpcBase);function MockedTransport() {_classCallCheck(this, MockedTransport);return _possibleConstructorReturn(this, (MockedTransport.__proto__ || Object.getPrototypeOf(MockedTransport)).apply(this, arguments));}_createClass(MockedTransport, [{ key: '_execute', value: function _execute(
    method, params) {
      return RPC_RESPONSE;
    } }]);return MockedTransport;}(_jsonRpcBase2.default);


describe('api/local/LocalAccountsMiddleware', function () {
  this.timeout(30000);

  var transport = void 0;

  beforeEach(function () {
    transport = new MockedTransport();
    transport.addMiddleware(_3.default);

    // Same as `parity_newAccountFromPhrase` with empty phrase
    return transport.
    execute('parity_newAccountFromSecret', [SECRET, PASSWORD]).
    catch(function (_err) {
      // Ignore the error - all instances of LocalAccountsMiddleware
      // share account storage
    });
  });

  it('registers all necessary methods', function () {
    return Promise.
    all([
    'eth_accounts',
    'eth_coinbase',
    'parity_accountsInfo',
    'parity_allAccountsInfo',
    'parity_changePassword',
    'parity_checkRequest',
    'parity_defaultAccount',
    'parity_generateSecretPhrase',
    'parity_getNewDappsAddresses',
    'parity_hardwareAccountsInfo',
    'parity_newAccountFromPhrase',
    'parity_newAccountFromSecret',
    'parity_setAccountMeta',
    'parity_setAccountName',
    'parity_postTransaction',
    'parity_phraseToAddress',
    'parity_useLocalAccounts',
    'parity_listGethAccounts',
    'parity_listRecentDapps',
    'parity_killAccount',
    'parity_testPassword',
    'signer_confirmRequest',
    'signer_rejectRequest',
    'signer_requestsToConfirm'].
    map(function (method) {
      return transport.
      execute(method).
      then(function (result) {
        (0, _chai.expect)(result).not.to.be.equal(RPC_RESPONSE);
      }
      // Some errors are expected here since we are calling methods
      // without parameters.
      ).catch(function (_) {});
    }));
  });

  it('allows non-registered methods through', function () {
    return transport.
    execute('eth_getBalance', ['0x407d73d8a49eeb85d32cf465507dd71d507100c1']).
    then(function (result) {
      (0, _chai.expect)(result).to.be.equal(RPC_RESPONSE);
    });
  });

  it('can handle `eth_accounts`', function () {
    return transport.
    execute('eth_accounts').
    then(function (accounts) {
      (0, _chai.expect)(accounts.length).to.be.equal(1);
      (0, _chai.expect)(accounts[0]).to.be.equal(ADDRESS);
    });
  });

  it('can handle `parity_defaultAccount`', function () {
    return transport.
    execute('parity_defaultAccount').
    then(function (address) {
      (0, _chai.expect)(address).to.be.equal(ADDRESS);
    });
  });

  it('can handle `parity_phraseToAddress`', function () {
    return transport.
    execute('parity_phraseToAddress', ['']).
    then(function (address) {
      (0, _chai.expect)(address).to.be.equal(ADDRESS);

      return transport.execute('parity_phraseToAddress', [FOO_PHRASE]);
    }).
    then(function (address) {
      (0, _chai.expect)(address).to.be.equal(FOO_ADDRESS);
    });
  });

  it('can create and kill an account', function () {
    return transport.
    execute('parity_newAccountFromPhrase', [FOO_PHRASE, FOO_PASSWORD]).
    then(function (address) {
      (0, _chai.expect)(address).to.be.equal(FOO_ADDRESS);

      return transport.execute('eth_accounts');
    }).
    then(function (accounts) {
      (0, _chai.expect)(accounts.length).to.be.equal(2);
      (0, _chai.expect)(accounts.includes(FOO_ADDRESS)).to.be.true;

      return transport.execute('parity_killAccount', [FOO_ADDRESS, FOO_PASSWORD]);
    }).
    then(function (result) {
      (0, _chai.expect)(result).to.be.true;

      return transport.execute('eth_accounts');
    }).
    then(function (accounts) {
      (0, _chai.expect)(accounts.length).to.be.equal(1);
      (0, _chai.expect)(accounts.includes(FOO_ADDRESS)).to.be.false;
    });
  });
});